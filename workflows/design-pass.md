# Design pass: build or change a page or section

## Steps
1. Load `design-memory`. Re-read "Design system" in AGENTS.md: it is this site's layer and wins over design-memory's core. Build inside it.
2. Write the copy first (claims, then proof). Every headline two lines or fewer at 390px and 1440px.
3. Build with tokens only. Start the dev server once: `npx astro dev --background`.
4. Look: `node tools/screenshot.mjs <path> --full`, read `.tmp/shots/<label>-desktop.png` and `-mobile.png`. Note concrete problems ("map crop shows empty ground", "link has no space"), fix, repeat. Two rounds minimum.
5. Gate: design-memory's gates (`node ~/.claude/skills/design-memory/scripts/motion-check.mjs <path> --headed` and its `checks/not-basic.md` against the screenshots). For the final run use `npm run build && npm run preview` (port 4321).
6. Second pass: design-memory's judge at its milestones, then `web-design-guidelines`. Apply what fits the direction.

## Known quirks
- Full-page screenshots need `--full`; it scrolls first so lazy images load and `data-reveal` sections appear, then waits for every image (the dev server transforms images on first request).
- The starfield canvas is fixed, so full-page shots only show stars in the top screen. Check it live or with a viewport shot.
- If the dev server returns 500 after a content-schema change, restart it: `npx astro dev stop`, then `npx astro dev --background`.
- The Astro dev toolbar is disabled in `astro.config.mjs` so it doesn't show in screenshots.
- The Journey (`/journey`) pins on screens 800px+ tall: check `node tools/screenshot.mjs /journey label --size 1280x810 --scroll "#journey+2500"` at 810, 864 and 900 tall (card, short story, heading row and skills rows must not touch), plus 390 wide. The dev server may not be on 4321: run `npx astro dev status` and pass `BASE_URL=http://localhost:<port>`.
- Tailwind's base layer hides `[hidden]` with `!important`, and a layered `!important` beats anything you write. To show something without JS, leave `hidden` out of the markup and set it from the script.
