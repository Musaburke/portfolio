# TODO (Musa)

Everything the site still needs from you. Search the code for `TODO(musa)` for the same list with exact lines.

## 1. Facts about you (`src/data/site.ts`)
- [x] Location: "London, UK" confirmed 13 Nov 2026
- [x] Open to: "Internships and placements" confirmed 13 Nov 2026
- [ ] CV (line 16): put `cv.pdf` in `public/` and set it to `'/cv.pdf'`

## 2. Education and experience (`src/data/experience.ts`)
- [ ] Education entry: add dates and relevant modules if you want them shown

## 2b. Google Cybersecurity Certificate (`src/data/experience.ts`, `certifications`)
- [x] Description paragraph approved
- [x] Verification link and certificate image added (credential 4DNGSYGO1PEL, 5 Nov 2026)

## 3. Case studies
- [ ] `src/content/projects/dsb-cleaning.mdx`: how the client found you, and what they had before
- [ ] `src/content/projects/ai-field-guide.mdx`: who is it for first, and what made you start it?
- [ ] `src/content/projects/break-the-ai.mdx`: check the last two sections read like you
- [ ] `src/data/work.ts`: check the one-line `summary` on News Flux, Islamic Tools Hub, the Prof Hussein site and the Design gallery (shown on the All work page; the Design gallery line is a draft from your Brain note)
- [ ] `src/content/projects/the-lure.mdx`: check it reads like you, and confirm the "about 75 brands" and "UK figures" lines

## 5. Your own screenshots (replaces the ones I captured)
- [ ] Size: 1440x900, JPEG or PNG. Name `<project>-<page>.jpg`, put in `src/assets/projects/`.
- [x] DSB: areas, reviews, carpet section, contact captured from the live site
- [x] Renewly: dashboard, renewals, spend analytics, members, settings captured on sample data
- [ ] Then update `cover` and `gallery` in each project's `.mdx` (see `workflows/add-project.md`)
- [ ] Square portrait photo for About (`src/components/About.astro`, line 28). Optional: the 3D orb stands in until then.
- [x] Social share image `public/og.jpg` (captured from the hero, tags in `Base.astro`). Replace it if you want a custom one.

## 6. Deploy
- [ ] Real domain in `astro.config.mjs` (line 10) and `public/robots.txt` (the Sitemap line)
- [x] Cloudflare Pages: live at https://musa-portfolio-ef2.pages.dev since 9 Nov 2026 (project `musa-portfolio`, deploys from `master`).
- [x] CSP enforced on 10 Nov 2026, after every page showed no violations at desktop and phone width. Inline scripts are allowed by hash only since 13 Nov 2026 (`npm run check` fails if one is missing).

## 7. Journey (`src/data/work.ts`)
- [ ] Check the timeline paragraphs (`short`, beside each card on /journey). Each joins your own story and learned text into one paragraph with nothing added; reword any that don't sound like you
- [ ] Read the "what I learned" lines: they are condensed from your notes, so the "story" text too (`src/data/work.ts`), and fix any that don't sound like you
- [ ] Check the new The Lure Journey text (`learned` and the three `story` paragraphs in `src/data/work.ts`). It shows on /journey.

## 8. Content
- [ ] `src/content/blog/hello-world.mdx`: write it (description + post, then `draft: false`) or delete it
