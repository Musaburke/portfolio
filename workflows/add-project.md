# Add or update a project case study

## Inputs (ask Musa for any that are missing)
- Title, one-sentence summary, year, Musa's role, stack.
- Live URL and/or repo URL.
- What the problem was, what Musa built, one decision worth explaining, what he'd change.
- Screenshots: a live URL to capture, a repo that runs locally, or image files.

## Steps
1. Capture at 1440x900 so the image fits `Shot` (16/10) with no crop:
   `node tools/screenshot.mjs https://example.com/ proj-home --out .tmp/proj` (repeat per page).
   Convert: `sips -s format jpeg -s formatOptions 82 .tmp/proj/proj-home-desktop.png --out src/assets/projects/proj-home.jpg`
2. Create `src/content/projects/<slug>.mdx`. Copy the frontmatter shape from `dsb-cleaning.mdx`:
   `host` (label in the window bar), `cover` + `coverAlt`, and `gallery` (first two show on the home page).
3. Body sections: `## The brief`, `## What I built`, one section on a real decision (security, performance, data), `## What I'd do next`.
   MDX comments are `{/* ... */}`, never `<!-- -->` (the build fails).
4. If relevant, add a row in `src/data/toolkit.ts` and its picture in the `shots` map in `Toolkit.astro`.
5. Run `workflows/design-pass.md` steps 3 to 5 on `/`, `/projects` and `/projects/<slug>`.
6. `npm run check` must pass.

## App needs a login or database (how Renewly was captured)
Clone it into `.tmp/<name>` (gitignored, throwaway). Stub auth and data services with sample fixtures in that copy only,
start it with dummy env vars, turn off framework dev badges (Next: `devIndicators: false`), then capture as above.
Label the shots "sample data". Never commit the stubbed copy or push it anywhere.

## Images rendered from HTML
Write the HTML in `tools/captures/<name>.html`, then
`node tools/screenshot.mjs "file://$PWD/tools/captures/<name>.html" <name> --out .tmp/captures`.

## Notes
- Private repos: link the live site only.
- Do not claim usage numbers or results unless Musa gives them.
