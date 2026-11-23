# Pre-ship checklist

1. `bash tools/check.sh`: 0 errors, the CSP hash check passes, and read the TODO(musa) list. If the hash check fails, put the hash it prints into `script-src` in `public/_headers`, then rebuild `tools/captures/portfolio-security-headers.html` (see `workflows/add-project.md`). Anything visitor-facing that still says TODO blocks launch.
2. `npm audit`: no critical or high left. Run `npm audit fix` (never `--force` without asking Musa), then re-run step 1. Also check the repo's open Dependabot PRs.
3. `astro.config.mjs` `site` is the real domain.
4. `npx astro preview status` first: only one preview runs at a time, and `astro preview --port N` quietly refuses while one is up, so port N may be another project's preview. Use the port `status` reports, or `npm run preview` if none is running. Check the page title before trusting any measurement. Then screenshot every route (`/`, `/projects`, each case study, `/journey`, `/about`, `/blog`, `/404`) with `--full`. Read them all.
5. Keyboard only: Tab from the top. Skip link appears, every control is reachable, focus ring visible, toolkit rows open with Enter.
6. Lighthouse (Chrome DevTools) on the preview: aim for 95+ in all four. Run it alone: with other builds or agents running, home read 82 (TBT 750 ms) and then 100 (TBT 0 ms) on the same build. Repeat 3 times and trust the median. `tools/scroll-perf.mjs` (add `--mobile --throttle 4`) shows the real long tasks.
7. `seo-audit` skill on the home page. Check `/sitemap-index.xml` exists in `dist/`.
8. Deploy (Vercel or Cloudflare Pages: build `npm run build`, output `dist`, `NODE_VERSION=22`).
