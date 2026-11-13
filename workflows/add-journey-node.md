# Add a project to the Journey

## Inputs (ask Musa)
- Title, month and year (use the GitHub creation date if unsure: `gh api repos/<owner>/<repo> --jq .created_at`), role, stack, one "what I learned" line in their words, link.
- A screenshot: a live URL, a repo that runs locally, or an image from Musa.

## Steps
1. Screenshot at 1440x900: `node tools/screenshot.mjs <url> <name> --hd --png --out .tmp/j`, then
   `sips -s format jpeg -s formatOptions 82 .tmp/j/<name>-desktop.png --out src/assets/journey/<name>.jpg`.
   App needs a server? Clone into `.tmp/<name>` (gitignored), run it there, capture, stop the servers. Use absolute paths: the shell's working directory can change between commands.
   No screenshot possible? Use `missingShot` from `src/data/journey.ts` and say so in `alt`.
2. Add an entry to `nodes` in `src/data/journey.ts`, in date order. `polish` sets how rough the screenshot looks (0 roughest, 3 full colour), so older work reads as older.
   Every node shows on `/journey`. Add `home: true` to put it on the home page too: at most six, so the pinned timeline never traps anyone (drop `home` from an older one if needed).
   Words not ready yet? Add `draft: true`: the node stays hidden everywhere until it's removed. `learned` and `story` are always Musa's own words, never invented.
3. New stack items become chips automatically. On the home page a skill lights up at the first shown node at or after the one that earned it.
4. Section height grows by itself (`--m`, about 55% of a screen per node). Check `/` at 1440 and 390, and with reduced motion.
5. `npx astro check` and `npx astro build`.
