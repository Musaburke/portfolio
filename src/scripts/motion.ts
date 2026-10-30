// Shared scroll motion: section reveals, word-split headings, and the typed rotator.
// Content is always in the DOM and visible without JS; this only adds the travel.

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Wrap each word of [data-split] elements so they can rise in one after another.
function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = '1';
  let i = 0;
  const walk = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const part of parts) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { frag.append(part); continue; }
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('span');
          inner.style.setProperty('--i', String(i++));
          inner.textContent = part;
          w.append(inner);
          frag.append(w);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as HTMLElement).matches('br')) {
        walk(child);
      }
    }
  };
  walk(el);
}

export function initReveals(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-split]').forEach(splitWords);
  const targets = root.querySelectorAll<HTMLElement>('[data-reveal], [data-split], .wipe, [data-pyramid], [data-inview]');
  if (reduce) { targets.forEach((t) => t.classList.add('in')); return; }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px' }
  );
  targets.forEach((t) => {
    if (t.dataset.waitIntro !== undefined) return; // started by the intro instead
    io.observe(t);
  });
}

// Types a phrase, holds, deletes, types the next. Words come from data-words (JSON array).
export function initRotator(el: HTMLElement) {
  const words: string[] = JSON.parse(el.dataset.words ?? '[]');
  if (!words.length || reduce) return;
  let w = 0, c = words[0].length, deleting = false;
  const tick = () => {
    const word = words[w];
    if (!deleting) {
      c++;
      el.textContent = word.slice(0, c);
      if (c >= word.length) { deleting = true; return setTimeout(tick, 2200); }
      return setTimeout(tick, 55 + Math.random() * 45);
    }
    c--;
    el.textContent = word.slice(0, c);
    if (c <= 0) { deleting = false; w = (w + 1) % words.length; return setTimeout(tick, 350); }
    setTimeout(tick, 28);
  };
  // Start by deleting the first phrase after a pause, so the page loads with a full sentence.
  setTimeout(() => { deleting = true; tick(); }, 2600);
}
