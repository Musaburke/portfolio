// One switch for "hold everything still": the OS reduced-motion setting, or the
// "Pause motion" button in the drawer (html.still, remembered in localStorage).
// Effects check isStill() and listen for 'motionchange' to stop or restart.
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;

export const isStill = () => reduce.matches || root.classList.contains('still');

const announce = () => window.dispatchEvent(new Event('motionchange'));
reduce.addEventListener('change', announce);

export function setStill(on: boolean) {
  root.classList.toggle('still', on);
  try { localStorage.setItem('still', on ? '1' : '0'); } catch {}
  announce();
}
