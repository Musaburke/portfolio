@AGENTS.md

# How to work in this repo

## Workflows, agents, tools
- Before a multi-step task, read the matching file in `workflows/` and follow it. Use the scripts in `tools/`; do not improvise screenshots or checks.
- When a step fails: read the error, fix the tool, re-run, then note what you learned in the workflow. Ask Musa before rewriting a workflow wholesale.
- Scratch output goes in `.tmp/`. It is disposable and gitignored.

| Task | Workflow |
| --- | --- |
| Add or update a project case study | `workflows/add-project.md` |
| Write a blog post | `workflows/new-post.md` |
| Build or change any page or section | `workflows/design-pass.md` |
| Before deploying | `workflows/pre-ship.md` |

## Skills (use without being asked)
- Before writing or changing UI: `design-taste-frontend`. Stay inside the dealt direction in AGENTS.md; do not redraw it.
- Motion or component feel: `emil-design-eng`.
- After finishing a page or section: `impeccable` as a second pass, then `web-design-guidelines`.
- Before building something new (not small edits): `grill-me`. Ask questions first.
- Page copy: `copywriting`, then `humanizer` if installed. SEO: `seo-audit`; structured data: `schema`.
- Anything with forms, user input, third-party scripts or keys: `vibesec-skill`.
- Library questions (Astro, Tailwind, MDX): `find-docs` / ctx7. Astro 7 changed things; check before guessing.
- Only when Musa asks by name: `prototype`, `pick-ui-library`, `break-ui`, `review-animations`.
- Small tweaks (a typo, a colour, one line): skip the skills.

## Content rules
- Never invent facts: no made-up metrics, employers, grades, clients, quotes or "used by X". Unknown means `TODO(musa): ...`.
- Personal facts live in `src/data/site.ts` only.
- Screenshots with sample data say so in the `Shot` host label ("Renewly · sample data") and in alt text.
- Every image gets alt text written for that picture. Decorative duplicates get `alt=""` and `aria-hidden`.

## Design guardrails (the taste house rules, short form)
- Headlines two lines or fewer at every width. One `h1` per page; every section has a heading (visually hidden is fine).
- No eyebrow labels, no 01/02/03 numbering, no tiny uppercase tracked labels, no monospace outside real code.
- No gradients, no glows, no glass/backdrop blur, no shadows on things at rest, no hairline dividers or 1px boxes (real tables and `data-ui` frames like `Shot` excepted).
- Approved exceptions (Musa asked for each): the starfield glow and constellation lines; the home preloader; glass on the scrolled header, drawer and contact card only; the Three.js globe and orb; isometric project stacks; colour slabs. Do not spread these to new places without asking.
- Every heavy effect needs: a reduced-motion path, a pause when offscreen or the tab is hidden, and a no-JS state where the content is still visible.
- Every project image goes through `Shot.astro`. Never place raw screenshots at mixed sizes or offsets.
- No default Tailwind palette colours, no violet/indigo. Tokens only.
- Never `transition: all`. Animate transform and opacity. Every clickable thing has hover, focus-visible and active states.
- Running text at 16px+ in `--ink`; `--muted` only for secondary notes.

## Look at what you made
After any visual change: dev server running (one instance), then
`node tools/screenshot.mjs <path> --full`, read both PNGs in `.tmp/shots/`, fix, repeat. At least two rounds per page.
Judge the screenshots, not the code.
