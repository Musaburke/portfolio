#!/usr/bin/env node
// Measure how smooth a page scrolls: frame times, long tasks and the JS that costs the most.
// Usage:
//   node tools/scroll-perf.mjs [path-or-url] [--throttle <n>] [--mobile] [--headed] [--wait <ms>] [--css '<rules>'] [--profile]
//   node tools/scroll-perf.mjs /                 -> http://localhost:4321/
//   BASE_URL=http://localhost:4325 node tools/scroll-perf.mjs /
// --throttle 4 slows the CPU 4x (a rough mid-range phone). It models a slow CPU, not a weak GPU,
// so a clean result here still needs a check on a real phone.
// --wait is how long the visitor reads the first screen before scrolling (default 1500 ms).
// --css injects extra CSS, for A/B tests that switch one suspect off (e.g. '.iso img{display:none}').
// --profile adds a JS sampling profile (top self time). The profiler itself causes the odd long frame,
// so read frame times from a run without it.
// --headed opens a real window, so WebGL and compositing run on the GPU. Headless Chrome draws WebGL in software.
// Measure a production build (`npm run preview`), not the dev server: dev serves unbundled modules.
// Needs Google Chrome installed (uses playwright-core with channel "chrome", no browser download).
import { chromium } from 'playwright-core';

const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i > -1 ? args[i + 1] : undefined; };
const throttle = Number(flag('--throttle') ?? 1);
const wait = Number(flag('--wait') ?? 1500);
const css = flag('--css');
const profiling = args.includes('--profile');
const mobile = args.includes('--mobile');
const headed = args.includes('--headed');
const positional = args.filter((a, i) => !a.startsWith('--') && !['--throttle', '--wait', '--css'].includes(args[i - 1]));
const target = positional[0] ?? '/';
const base = process.env.BASE_URL ?? 'http://localhost:4321';
const url = /^https?:\/\//.test(target) ? target : base + (target.startsWith('/') ? target : '/' + target);
const vp = mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 };

const browser = await chromium.launch({ channel: 'chrome', headless: !headed });
try {
  const page = await browser.newPage({ viewport: vp });
  const cdp = await page.context().newCDPSession(page);
  // Lines the page logs with a [perf] prefix are printed, for timing a step while debugging.
  page.on('console', (m) => { if (m.text().startsWith('[perf]')) console.log(m.text()); });
  // Skip the once-per-session preloader so the scroll starts on the real page.
  await page.addInitScript(() => { try { sessionStorage.setItem('intro-seen', '1'); } catch {} });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  if (css) await page.addStyleTag({ content: css });
  await page.waitForTimeout(wait);
  if (throttle > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle });

  await page.evaluate(() => {
    const w = window;
    w.__perf = { frames: [], long: [], slow: [] };
    new PerformanceObserver((l) => { for (const e of l.getEntries()) w.__perf.long.push({ d: e.duration, at: e.startTime, y: scrollY }); })
      .observe({ type: 'longtask', buffered: false });
    let last = performance.now();
    const tick = (t) => { const d = t - last; w.__perf.frames.push(d); if (d > 50) w.__perf.slow.push({ d, y: scrollY }); last = t; if (!w.__perf.stop) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });

  if (profiling) {
    await cdp.send('Profiler.enable');
    await cdp.send('Profiler.setSamplingInterval', { interval: 200 });
    await cdp.send('Profiler.start');
  }

  // Wheel down the whole page in steady steps, like a trackpad.
  const height = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  await page.mouse.move(vp.width / 2, vp.height / 2);
  for (let y = 0; y < height; y += 120) {
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(16);
  }
  await page.waitForTimeout(500);

  const profile = profiling ? (await cdp.send('Profiler.stop')).profile : null;
  const perf = await page.evaluate(() => { window.__perf.stop = true; return window.__perf; });

  const frames = perf.frames.slice(2).sort((a, b) => a - b);
  const pct = (p) => frames[Math.min(frames.length - 1, Math.floor(frames.length * p))] ?? 0;
  const over = (ms) => frames.filter((f) => f > ms).length;
  const fmt = (n) => n.toFixed(1).padStart(6);
  console.log(`${url}  ${vp.width}x${vp.height}  CPU x${throttle}  scrolled ${height}px`);
  console.log(`frames ${frames.length}  median ${fmt(pct(0.5))}ms  p95 ${fmt(pct(0.95))}ms  p99 ${fmt(pct(0.99))}ms  worst ${fmt(frames.at(-1) ?? 0)}ms`);
  console.log(`over 16.7ms: ${over(16.7)}  over 33ms: ${over(33)}  long tasks: ${perf.long.length} (${perf.long.reduce((a, b) => a + b.d, 0).toFixed(0)}ms)`);
  for (const s of perf.slow.slice(1)) console.log(`  slow frame ${s.d.toFixed(0)}ms at scrollY ${Math.round(s.y)}`);
  for (const l of perf.long) console.log(`  long task ${l.d.toFixed(0)}ms at ${(l.at / 1000).toFixed(1)}s after load, scrollY ${Math.round(l.y)}`);

  // Self time per function, from the sampling profile.
  if (profile) {
    const byId = new Map(profile.nodes.map((n) => [n.id, n]));
    const self = new Map();
    const dt = profile.timeDeltas;
    profile.samples.forEach((id, i) => {
      const n = byId.get(id);
      const f = n.callFrame;
      const file = f.url ? f.url.replace(/^.*\//, '').replace(/\?.*$/, '') : '';
      const key = f.functionName === '(idle)' || f.functionName === '(program)' ? f.functionName : `${f.functionName || '(anonymous)'}  ${file}:${f.lineNumber + 1}`;
      self.set(key, (self.get(key) ?? 0) + (dt[i] ?? 0) / 1000);
    });
    const total = [...self.values()].reduce((a, b) => a + b, 0);
    console.log('\nTop self time (ms, % of profile):');
    [...self.entries()].filter(([k]) => k !== '(idle)').sort((a, b) => b[1] - a[1]).slice(0, 12)
      .forEach(([k, v]) => console.log(`${fmt(v)}  ${((v / total) * 100).toFixed(1).padStart(5)}%  ${k}`));
  }
} finally {
  await browser.close();
}
