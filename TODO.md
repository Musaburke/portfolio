# TODO (Musa)

Everything the site still needs from you. Search the code for `TODO(musa)` for the same list with exact lines.

## 1. Facts about you (`src/data/site.ts`)
- [ ] Display name (line 5): confirm "Musa Burke"
- [ ] Location (line 9): city, UK
- [ ] Studying (line 10): course, university, year
- [ ] Open to (line 11): confirm "Internships and placements"
- [ ] Public email (line 12): currently `hello@example.com`
- [ ] LinkedIn URL (line 14): currently a placeholder
- [ ] CV (line 15): put `cv.pdf` in `public/` and set it to `'/cv.pdf'`

## 2. Education and experience (`src/data/experience.ts`)
- [ ] Renewly entry (line 17): one line on what you built, and with whom
- [ ] Education entry (lines 24-27): dates, course, university, relevant modules

## 3. Case studies
- [ ] `src/content/projects/renewly.mdx`: your role (line 5) and the "My part" paragraph (line 37)
- [ ] `src/content/projects/dsb-cleaning.mdx`: confirm role (line 5), how the client found you (line 24), "what I'd do next" (line 43)
- [ ] Ask the DSB owner and the Renewly team if you can show their sites publicly

## 4. Cyber security (`src/data/toolkit.ts`, line 40)
- [ ] What you are studying right now (e.g. TryHackMe paths, a certificate). Only real things.

## 5. Your own screenshots (replaces the ones I captured)
- [ ] Size: 1440x900, JPEG or PNG. Name `<project>-<page>.jpg`, put in `src/assets/projects/`.
- [ ] DSB: home, services, areas, gallery, contact
- [ ] Renewly: dashboard, renewals, spend analytics, landing (a real account if you can; otherwise keep the "sample data" label)
- [ ] Then update `cover` and `gallery` in each project's `.mdx` (see `workflows/add-project.md`)
- [ ] Square portrait photo for About (`src/components/About.astro`, line 25). Optional: the 3D orb stands in until then.
- [ ] Social share image, 1200x630 (`public/og.jpg`). Needs a `og:image` meta tag in `src/layouts/Base.astro` once it exists.

## 6. Deploy
- [ ] Real domain in `astro.config.mjs` (line 10) and `public/robots.txt` (the Sitemap line)
- [ ] Cloudflare Pages: build `npm run build`, output `dist`, env `NODE_VERSION=22`
- [ ] The CSP in `public/_headers` is report-only. After deploying, open the live site with the console open. If there are no violations, rename the header to `Content-Security-Policy` to enforce it. Preview servers do not apply `_headers`, so this can only be checked live.

## 7. Journey (`src/data/journey.ts`)
- [ ] One honest "what I learned" line per project (5 lines) and the future text (what you are studying, what you want to build next)
- [ ] Confirm roles: Islamic Tools Hub ("My own"?), News Flux (team: what was your part?), Hussein site ("My own"?), Renewly (your part)
- [ ] Screenshots there were captured by me: Islamic Tools Hub (ran it locally), News Flux (live site), Hussein site (live). Replace with your own if you prefer: 1440x900, same file names in `src/assets/journey/`

## 8. Content
- [ ] `src/content/blog/hello-world.mdx`: write it (description + post, then `draft: false`) or delete it
