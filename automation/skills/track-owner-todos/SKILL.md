---
name: track-owner-todos
description: Record facts only the owner can supply as tracked TODOs instead of guessing them, and keep them out of what visitors see. Use when writing content with unknown facts, or when asked what is left to do.
---

# Track owner TODOs

Evidence: all four projects do this: `portfolio/TODO.md` and `TODO(musa)` in `src/data/site.ts`, `soc-simulation/TODO.md`, `ai-field-guide/TODO.md`, `DBS-cleaning/OWNER-NOTES.md`.

1. Unknown means `TODO(musa)` for Musa, or a tagged line in the owner notes for a client. Never a plausible guess.
2. Keep one list per repo, plus a marker where the fact belongs in code.
3. No TODO text may reach a visitor. Before saying a site is done, search the build output for `TODO`.
4. Say what is needed and where it goes: "put cv.pdf in /public and set this to '/cv.pdf'".
5. Remove an item when done, and delete notes that have gone stale. `ai-field-guide/TODO.md` and `soc-simulation/TODO.md` still hold lines that the redesign run made out of date.
6. When a claim is unverified, keep the hedge and state what was not read, as `ai-field-guide/src/data/guide.ts` does.
