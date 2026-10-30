# Design pass: build or change a page or section

## Steps
1. Load `design-taste-frontend`. Re-read "Design system" in AGENTS.md and the direction sheet (`draw.mjs --show`). Build inside it.
2. Write the copy first (claims, then proof). Every headline two lines or fewer at 390px and 1440px.
3. Build with tokens only. Start the dev server once: `npx astro dev --background`.
4. Look: `node tools/screenshot.mjs <path> --full`, read `.tmp/shots/<label>-desktop.png` and `-mobile.png`. Note concrete problems ("map crop shows empty ground", "link has no space"), fix, repeat. Two rounds minimum.
5. Gate: `node ~/.claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:4321<path>`. Fix every FAIL. Defend or fix every WARN. For the final run use `npm run build && npm run preview` (port 4321).
6. Second pass: `impeccable`, then `web-design-guidelines`. Apply what fits the direction.

## Known quirks
- Full-page screenshots need `--full`; it scrolls first so lazy images load and `data-reveal` sections appear, then waits for every image (the dev server transforms images on first request).
- The starfield canvas is fixed, so full-page shots only show stars in the top screen. Check it live or with a viewport shot.
- If the dev server returns 500 after a content-schema change, restart it: `npx astro dev stop`, then `npx astro dev --background`.
- The Astro dev toolbar is disabled in `astro.config.mjs` so it doesn't show in screenshots.
