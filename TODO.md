# TODO (Musa)

Everything the site still needs from you. Search the code for `TODO(musa)` for the same list with exact lines.

## 1. Facts about you (`src/data/site.ts`)
- [ ] Location: confirm "London, UK" (inferred from your university)
- [ ] Open to: confirm "Internships and placements"
- [ ] CV (line 15): put `cv.pdf` in `public/` and set it to `'/cv.pdf'`

## 2. Education and experience (`src/data/experience.ts`)
- [ ] Education entry: add dates and relevant modules if you want them shown

## 3. Case studies
- [ ] `src/content/projects/dsb-cleaning.mdx`: how the client found you, and what they had before

## 5. Your own screenshots (replaces the ones I captured)
- [ ] Size: 1440x900, JPEG or PNG. Name `<project>-<page>.jpg`, put in `src/assets/projects/`.
- [x] DSB: areas, reviews, carpet section, contact captured from the live site
- [x] Renewly: dashboard, renewals, spend analytics, members, settings captured on sample data
- [ ] Then update `cover` and `gallery` in each project's `.mdx` (see `workflows/add-project.md`)
- [ ] Square portrait photo for About (`src/components/About.astro`, line 25). Optional: the 3D orb stands in until then.
- [x] Social share image `public/og.jpg` (captured from the hero, tags in `Base.astro`). Replace it if you want a custom one.

## 6. Deploy
- [ ] Real domain in `astro.config.mjs` (line 10) and `public/robots.txt` (the Sitemap line)
- [ ] Cloudflare Pages: build `npm run build`, output `dist`, env `NODE_VERSION=22`
- [ ] The CSP in `public/_headers` is report-only. After deploying, open the live site with the console open. If there are no violations, rename the header to `Content-Security-Policy` to enforce it. Preview servers do not apply `_headers`, so this can only be checked live.

## 7. Journey (`src/data/journey.ts`)
- [ ] Read the "what I learned" lines: they are condensed from your notes, so the "story" text too (`src/data/journey.ts`), and fix any that don't sound like you

## 8. Content
- [ ] `src/content/blog/hello-world.mdx`: write it (description + post, then `draft: false`) or delete it
