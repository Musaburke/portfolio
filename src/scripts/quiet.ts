// Run a heavy job (building a Three.js scene) in idle time once the page has stopped
// scrolling for a moment, so it never freezes a scroll in progress.
export function whenQuiet(job: () => void, quietMs = 500) {
  let timer = 0;
  const go = () => {
    removeEventListener('scroll', onScroll);
    if ('requestIdleCallback' in window) requestIdleCallback(job, { timeout: 1000 });
    else setTimeout(job, 0);
  };
  const onScroll = () => { clearTimeout(timer); timer = window.setTimeout(go, quietMs); };
  addEventListener('scroll', onScroll, { passive: true });
  timer = window.setTimeout(go, quietMs);
}
