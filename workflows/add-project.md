# Add a project

Every project is one entry in `src/data/work.ts`. That entry alone puts it on All work. Two optional extras:
a `journey` block makes it a stop on `/journey`, and an MDX file with the same id makes it a case study.
Never write counts ("five projects") in copy; the pages must stay true as the list grows.

## Inputs (ask Musa for any that are missing)
- Title, month and year (use the GitHub creation date if unsure: `gh api repos/<owner>/<repo> --jq .created_at`), role, one-line summary, stack.
- Live URL and/or repo URL. Private repos: link the live site only. No link at all? Wait until there is one.
- A screenshot: a live URL to capture, a repo that runs locally, or image files.
- For a Journey stop: one "what I learned" line and the longer story, in Musa's own words. Never invent them.
- For a case study: what the problem was, what Musa built, one decision worth explaining, what he'd change.

## Steps
1. Capture at 1440x900 so the image fits `Shot` (16/10) with no crop:
   `node tools/screenshot.mjs https://example.com/ proj-home --hd --png --out .tmp/proj` (repeat per page).
   Convert: `sips -s format jpeg -s formatOptions 82 .tmp/proj/proj-home-desktop.png --out src/assets/projects/proj-home.jpg`
   App needs a server? Clone into `.tmp/<name>` (gitignored), run it there, capture, stop the servers. Use absolute paths.
   No screenshot possible? Use `missingShot` from `src/data/work.ts` and say so in `alt`.
2. Add the entry to `work` in `src/data/work.ts`, in date order (`date: 'YYYY-MM'`; entries in the same month keep their list order).
   That's enough for All work. Its link goes to the case study if there is one, else `live`, else `repo`.
   A case study shows `live` and `repo` at its top and end, so give it at least one. A repo that must stay private gets `repoNote` instead (DSB: "Private (client site)").
3. Journey stop (optional): add a `journey` block with `learned`, `short` (one paragraph beside the card on the timeline: what happened, ending on the lesson, joined from Musa's own `story` and `learned`; never two separate paragraphs), `story` (the full version, shown on the case study if there is one) and `polish` (how rough the screenshot looks, 0 roughest to 3 full colour, so older work reads as older).
   Add `skills` only if the chips it earned differ from `stack`. Words not ready? Leave the block out, or set `draft: true` on the entry to hide it everywhere.
4. Case study (optional): create `src/content/projects/<id>.mdx`, the same id as the `work.ts` entry (the build fails if they don't match).
   Copy the frontmatter shape from `dsb-cleaning.mdx`: `order` (position among case studies), `role` (the longer "what I did" line), `slab`, `cover` + `coverAlt`, and `gallery` (the first two show in the home stack).
   Add `featured: true` to put it in Featured work on the home page. Keep that to 3 or 4; unflag an older one if needed.
   Body sections: `## The brief`, `## What I built`, one section on a real decision (security, performance, data), `## What I'd do next`.
   MDX comments are `{/* ... */}`, never `<!-- -->` (the build fails).
5. If relevant, add a row in `src/data/toolkit.ts` and its picture in the `shots` map in `Toolkit.astro`.
6. Run `workflows/design-pass.md` steps 3 to 5 on `/projects`, plus `/journey` for a Journey stop, plus `/` and `/projects/<id>` for a case study.
   The Journey grows by itself, one row per stop; check it at 1440 and 390, and with reduced motion.
7. `npm run check` must pass.

## App needs a login or database (how Renewly was captured)
Clone it into `.tmp/<name>` (gitignored, throwaway). Stub auth and data services with sample fixtures in that copy only,
start it with dummy env vars, turn off framework dev badges (Next: `devIndicators: false`), then capture as above.
Label the shots "sample data" in `host` and in `alt`. Never commit the stubbed copy or push it anywhere.

## Images rendered from HTML
Write the HTML in `tools/captures/<name>.html`, then
`node tools/screenshot.mjs "file://$PWD/tools/captures/<name>.html" <name> --out .tmp/captures`.

## Notes
- Do not claim usage numbers or results unless Musa gives them.
