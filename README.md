# Musa Burke: portfolio

My portfolio: case studies of the sites I've built, and a scroll-driven timeline of how my work has evolved.

**Live:** https://musa-portfolio-ef2.pages.dev

![Portfolio home page: "Hello, I'm Musa" over a wireframe globe](public/og.jpg)

## What's on it

- **Home:** a hero over a Three.js wireframe globe, each project as a full screen with an isometric stack of screenshots, a pinned journey through my projects, an About section with a liquid orb, my toolkit and a contact card.
- **Case studies:** DSB Commercial Cleaning (a live client site), Renewly (a team dashboard) and the AI field guide.
- **Journey:** what each project taught me, oldest first.

## Built with

Astro 7, TypeScript, Tailwind CSS 4, MDX and Three.js. Hosted free on Cloudflare Pages, with security headers and an enforced Content Security Policy.

Every heavy effect has a reduced-motion version, pauses when it's off screen or the tab is hidden, and leaves the content readable without JavaScript. The Three.js scenes load after the page and build in idle time, so they never block a scroll.

## Run it locally

Needs Node 22 or newer.

```bash
npm install
npx astro dev --background   # http://localhost:4321
npm run check                # type check, then build
```

## Where things live

- `src/data/site.ts`: every personal fact (name, links, study).
- `src/content/projects/*.mdx`: one case study per file.
- `src/data/journey.ts`: the journey timeline. `home: true` puts a project on the home page (five at most).
- `src/components/`: one component per home section, in page order.
- `AGENTS.md`: commands, structure and the design system. `workflows/`: step-by-step guides for adding a project or a journey node.
- `tools/`: screenshots (`screenshot.mjs`) and scroll frame timing (`scroll-perf.mjs`).

## Checks and deploys

Every push and pull request runs `npm run check` on GitHub Actions, and a weekly job checks the built site for broken links. Merging into `master` deploys to Cloudflare Pages; every other branch gets its own preview address.
