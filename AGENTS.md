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
- `public/_headers`: Cloudflare Pages security headers, including an enforced CSP. Local dev and preview servers ignore `_headers`; Cloudflare preview deploys apply it, so check a change there with the console open before merging.

- `src/data/site.ts`: name, links, email, study, location. Every personal fact. Never hard-code these in components.
- `src/data/experience.ts`: timeline on /about. `src/data/toolkit.ts`: the toolkit list on the home page (each skill lights a different picture; no repeats, no site names).
- `src/data/work.ts`: every project, one entry each, the only list of work. Every entry shows on All work (`/projects`, newest first); one with a `journey` block is a stop on `/journey`; one whose id matches an MDX file is a case study. `src/lib/work.ts` joins the two and gives every project one address (`href`: case study, else live site, else code). The build fails if an MDX has no `work.ts` entry. Add projects with `workflows/add-project.md`.
- `src/content/projects/*.mdx`: one case study per file, named after its `work.ts` id. Frontmatter holds only case-study fields (`order`, `featured`, `role`, `slab`, `cover`, `gallery`); title, summary, date, stack and links come from `work.ts`. `featured: true` puts it in Featured work on the home page (keep it to 3 or 4).
- `src/content/blog/*.mdx`: posts. `draft: true` hides a post everywhere.
- `src/assets/projects/`: real screenshots, all captured at 1440x900 (optimised by `astro:assets`).
- `src/components/`: one component per home section, in page order: `Hero`, `Work` (Featured work, uses `IsoStack`), `HowIGotHere` (the way into `/journey` and All work), `About`, `Toolkit`, `Contact` (ends with `Pyramid`). `Journey` is the pinned timeline at the top of `/journey`.
  Site-wide, mounted in `Base.astro`: `Starfield` (background canvas), `Preloader` (home only, `intro` prop), `Header` (MB monogram, hamburger, side drawer), `BackToTop`, `Footer` (not on home).
  `Shot.astro` is the browser-window frame every project image goes through. `Icon.astro` holds the few inline icons.
- `src/scripts/motion.ts`: reveals (`data-reveal`, `data-split` word rise, `.wipe` heading bar, `data-inview`) and the hero's typed rotator.
- `src/scripts/still.ts`: one switch for holding motion still: the OS reduced-motion setting or the drawer's "Pause motion" button (`html.still`, saved in localStorage). Heavy effects check `isStill()` and listen for `motionchange`.
- `src/scripts/three/`: `stage.ts` (shared renderer, pauses offscreen/hidden, one still frame on reduced motion), `globe.ts` (hero wireframe network), `orb.ts` (About liquid orb). Loaded with dynamic `import()` so Three.js never blocks first paint.
- `tools/captures/`: HTML sources for images that are rendered rather than screenshotted (`dsb-security-headers.html`, `portfolio-security-headers.html`; rebuild the second whenever `public/_headers` changes).
- `src/styles/global.css`: all design tokens, buttons, links, the reveal animation, `.prose`.
- `workflows/`: step-by-step SOPs. `tools/`: scripts the SOPs call. `.tmp/`: disposable output.

## Design system: "The dark room", v3

v3 flow (from Musa's references: cheryllao.me intro + drawer, benscott.dev hero + full-screen sections, perryolsson.com pyramid + back-to-top):
preloader (name + gooey liquid blob, once per session) -> hero "Hello, I'm Musa." with typed rotator over the wireframe globe -> Featured work (one full screen per featured case study: colour slab + isometric stack that flattens on scroll) -> How I got here (links to `/journey` and `/projects`) -> About (liquid orb) -> Toolkit -> Contact (glass card + link pyramid with back-to-top). Free scroll, no snap.
One job per page, one address per project (Musa, 14 Nov 2026: the old site showed each project in five versions and felt like a maze). Home shows Featured work; `/journey` tells the story; `/projects` (All work) lists everything; case studies are the only deep pages. Every link to a project goes to its `href`. Copy never states how many projects there are, so it stays true as the list grows.
Journey (`Journey.astro`, at the top of `/journey`): Musa's original pinned timeline, every stop oldest first, then Next. Don't redesign its mechanics (round 2's free-scroll version lost the intensity and he asked for this back). A visible "Skip the timeline" pill (to `#after-journey`) and "See all work" stay on screen while it's pinned. On screens at least 901px wide and 800px tall the stage pins and scroll moves the nodes past a fixed centre ring; the active card (a large screenshot and its title) swings in straight away, and the other side of the line holds its words: one paragraph (`journey.short`: what happened, ending on what it taught him, joined from his own `story` and `learned`), its skills and one action ("Read the full case study", else Visit site or Code). The card and words follow the scroll through `translate` with no transition, so they never trail. The starfield rushes while you scroll between stops and settles when you stop on one; the full skills list wraps with each chip lighting up as it's earned, `window.__warp` also peaks before the last node, then `window.__kick` fires as the final star ignites. Phones, shorter screens, reduced motion and no-JS get a plain vertical timeline with the short story under each card. The full story (`journey.story`) is the "How it changed me" section on each case study.
Ways on: no page ends in a dead stop. Home's How I got here band leads to My journey and All work, each case study ends with the next one (order by `order`, the last loops to the first), All work ends with My journey, and `/journey` ends with See all work. Secondary buttons use `.btn-quiet`; the sage `.btn` stays on the main action. No "built with" or name credits in footers unless Musa asks.
Section order and ids: `top`, `work`, `journey`, `about`, `toolkit`, `contact`. The drawer in `Header.astro` lists pages only (Home, All work, My journey, About me) plus Contact; visitors scroll the home flow rather than jump around it. Add Writing back with the first published post.

Original v1 notes:

Dealt by the `design-taste-frontend` skill (seed 1513686349, saved in `.taste-skill/direction.json`; reprint with `node ~/.claude/skills/design-taste-frontend/scripts/draw.mjs --show`).

- One charcoal field top to bottom under a living starfield; the work is shown as lit exhibits. No section bands, no light theme (the darkness is the concept, not a theme switch).
- Starfield (`Starfield.astro`): canvas behind everything. Twinkling stars in three depth layers, a lub-dub heartbeat pulse that ripples out from the top centre every 4.8 s (stronger while `#contact` is on screen), cursor brightens and parts nearby stars, a shooting star every 18-40 s, scroll and pointer parallax. Reduced motion draws one still frame. Tune via the constants at the top of its script.
- Images: every project image is a `Shot` (16/10, the exact ratio of a 1440x900 capture, so nothing is cropped). Images in a row share top edges and widths; no offset or scattered placement.
- Idea: the two shipped projects are the two doors on the dark wall in the hero.
- Colour tokens: `--bg #1c1c1c`, `--surface #262626`, `--ink #f1f1ef`, `--muted #b4b5af`, `--accent #9fd09c` (sage-mint, hover `--accent-hover #b6dcb3`, only on the primary action and active states).
- Type: Clash Grotesk 400/500 from Fontshare, one family. Steps: `--step-small`, `--step-body`, `--step-lead`, `--step-head`, `--step-hero`. No sixth size.
- Buttons are pills (`.btn`). Margins come from `--margin`; section gaps from `--section`; home sections use `.section-screen` (min 100svh, content centred).
- Glass (`.glass`, header once scrolled) only on: scrolled header, side drawer, contact card.
- Project slab colours come from each product's own palette (`slab` in the project frontmatter).
- Tailwind v4 generates utilities from any class name it finds. Never name a class after a utility that sets visuals (`ring`, `shadow`, `border`, `outline`, `blur`...): `.ring` once drew a square box-shadow around the back-to-top button.
- Motion: stillness plus feedback. Section parts rise in once (`data-reveal` on a parent; children stagger). Transform and opacity only. Everything respects `prefers-reduced-motion`.
