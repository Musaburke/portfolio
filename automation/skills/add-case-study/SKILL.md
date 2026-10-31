---
name: add-case-study
description: Add or update a project case study on Musa's portfolio, from capture to passing check. Use when a project needs a page, new screenshots or a refreshed write-up.
---

# Add a case study

Evidence this repeats: `workflows/add-project.md` was written from the DSB cleaning and Renewly case studies, and `src/content/projects/` holds one file per project. The SOC console and AI field guide are the next likely uses.

Follow `workflows/add-project.md`; it is the source of truth. This skill adds the checks that are easy to skip.

1. Gather title, summary, year, role, stack, links, the problem, what was built, one real decision, and what Musa would change. Anything unknown is `TODO(musa)`. Never invent metrics, clients, quotes or usage.
2. Capture at 1440x900 with `tools/screenshot.mjs --hd --png`, then convert with `sips` into `src/assets/projects/`.
3. Every image goes through `Shot.astro`, with alt text written for that picture. Sample data says so in the host label and alt text.
4. For an app behind a login, clone it into `.tmp/`, stub auth and data in that copy only, and never commit or push the copy.
5. Link only the live site for a private repo.
6. Slab colour comes from the product's own palette. Do not spread approved effects elsewhere.
7. Run the design pass on `/`, `/projects` and the new page. Read the screenshots. `npm run check` must show 0 errors.
