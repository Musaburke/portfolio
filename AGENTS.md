# AGENTS.md

Musa Burke's portfolio. Static site: Astro 7, TypeScript (strict), Tailwind CSS 4, MDX. Node 22+.

## Commands

| Command | What it does |
| --- | --- |
| `npx astro dev --background` | Dev server on http://localhost:4321. Manage with `astro dev stop` / `status` / `logs`. One instance only. |
| `npm run check` | `astro check` then `astro build`. Must show 0 errors before you call work done. |
| `npm run preview` | Serve the built `dist/`. |
| `node tools/screenshot.mjs <path> [label] [--full]` | Desktop 1440 + mobile 390 screenshots to `.tmp/shots/`. |
| `bash tools/check.sh` | check + build + list every `TODO(musa)` left. |

## Where things live

- `TODO.md`: everything Musa still has to supply (facts, screenshots, domain). Check it before saying the site is finished.
- `public/_headers`: Cloudflare Pages security headers. The CSP is `Report-Only` until checked on the live site (preview servers ignore `_headers`).

- `src/data/site.ts`: name, links, email, study, location. Every personal fact. Never hard-code these in components.
- `src/data/experience.ts`: timeline on /about. `src/data/toolkit.ts`: the toolkit list on the home page.
- `src/content/projects/*.mdx`: one case study per file. Schema in `src/content.config.ts`. `order` sets position.
- `src/content/blog/*.mdx`: posts. `draft: true` hides a post everywhere.
- `src/assets/projects/`: real screenshots, all captured at 1440x900 (optimised by `astro:assets`).
- `src/components/`: one component per home section, in page order: `Hero`, `Work` (uses `IsoStack`), `About`, `Toolkit`, `Contact` (ends with `Pyramid`).
  Site-wide, mounted in `Base.astro`: `Starfield` (background canvas), `Preloader` (home only, `intro` prop), `Header` (MB monogram, hamburger, side drawer), `BackToTop`, `Footer` (not on home).
  `Shot.astro` is the browser-window frame every project image goes through. `Icon.astro` holds the few inline icons.
- `src/scripts/motion.ts`: reveals (`data-reveal`, `data-split` word rise, `.wipe` heading bar, `data-inview`) and the hero's typed rotator.
- `src/scripts/three/`: `stage.ts` (shared renderer, pauses offscreen/hidden, one still frame on reduced motion), `globe.ts` (hero wireframe network), `orb.ts` (About liquid orb). Loaded with dynamic `import()` so Three.js never blocks first paint.
- `tools/captures/`: HTML sources for images that are rendered rather than screenshotted (e.g. `security-headers.html`).
- `src/styles/global.css`: all design tokens, buttons, links, the reveal animation, `.prose`.
- `workflows/`: step-by-step SOPs. `tools/`: scripts the SOPs call. `.tmp/`: disposable output.

## Design system: "The dark room", v3

v3 flow (from Musa's references: cheryllao.me intro + drawer, benscott.dev hero + full-screen sections, perryolsson.com pyramid + back-to-top):
preloader (name + gooey liquid blob, once per session) -> hero "Hello, I'm Musa." with typed rotator over the wireframe globe -> Work (one full screen per project: colour slab + isometric stack that flattens on scroll) -> About (liquid orb) -> Toolkit -> Contact (glass card + link pyramid with back-to-top). Free scroll, no snap.
Journey (`Journey.astro`, data in `src/data/journey.ts`): between Work and About. On wide screens the stage pins and scroll moves the nodes past a fixed centre ring; the active node expands, the skills row grows, and it sets `window.__warp` (0..1) so the starfield streaks before the last node, then `window.__kick` makes the field pulse as the final star ignites. Phones, reduced motion and no-JS get a plain vertical timeline. Add nodes with `workflows/add-journey-node.md`.
Section order and ids: `top`, `work`, `journey`, `about`, `toolkit`, `contact`. The drawer in `Header.astro` lists pages only (Home, Case studies, My journey, About me) plus Contact; visitors scroll the home flow rather than jump around it. Add Writing back with the first published post.

Original v1 notes:

Dealt by the `design-taste-frontend` skill (seed 1513686349, saved in `.taste-skill/direction.json`; reprint with `node ~/.claude/skills/design-taste-frontend/scripts/draw.mjs --show`).

- One charcoal field top to bottom under a living starfield; the work is shown as lit exhibits. No section bands, no light theme (the darkness is the concept, not a theme switch).
- Starfield (`Starfield.astro`): canvas behind everything. Twinkling stars in three depth layers, a lub-dub heartbeat pulse that ripples out from the top centre every 4.8 s (stronger while `#contact` is on screen), cursor brightens and parts nearby stars, a shooting star every 18-40 s, scroll and pointer parallax. Reduced motion draws one still frame. Tune via the constants at the top of its script.
- Images: every project image is a `Shot` (16/10, the exact ratio of a 1440x900 capture, so nothing is cropped). Images in a row share top edges and widths; no offset or scattered placement.
- Idea: the two shipped projects are the two doors on the dark wall in the hero.
- Colour tokens: `--bg #1c1c1c`, `--surface #262626`, `--ink #f1f1ef`, `--muted #a3a49f`, `--accent #8fa68e` (sage, only on the primary action and active states).
- Type: Clash Grotesk 400/500 from Fontshare, one family. Steps: `--step-small`, `--step-body`, `--step-lead`, `--step-head`, `--step-hero`. No sixth size.
- Buttons are pills (`.btn`). Margins come from `--margin`; section gaps from `--section`; home sections use `.section-screen` (min 100svh, content centred).
- Glass (`.glass`, header once scrolled) only on: scrolled header, side drawer, contact card.
- Project slab colours come from each product's own palette (`slab` in the project frontmatter).
- Tailwind v4 generates utilities from any class name it finds. Never name a class after a utility that sets visuals (`ring`, `shadow`, `border`, `outline`, `blur`...): `.ring` once drew a square box-shadow around the back-to-top button.
- Motion: stillness plus feedback. Section parts rise in once (`data-reveal` on a parent; children stagger). Transform and opacity only. Everything respects `prefers-reduced-motion`.
