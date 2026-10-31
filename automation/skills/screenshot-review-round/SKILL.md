---
name: screenshot-review-round
description: Judge a web page from real screenshots and browser checks, then send concrete fixes. Use after any visual change, or when directing a builder through review rounds.
---

# Screenshot review round

Evidence: required by `portfolio/CLAUDE.md` ("Look at what you made") and `workflows/design-pass.md`. It was the main loop of the 31 October 2026 redesign of the SOC console and AI field guide, and it caught faults a passing build did not.

1. One dev server per site. Check for an existing one first; Astro refuses a second.
2. `node tools/screenshot.mjs <url> <label> --full --out .tmp/shots/<site>` gives desktop and mobile. Read both.
3. Full-page captures start at scroll 0, so scroll-linked rows can look faded. Take viewport shots after scrolling before judging them.
4. Give findings as location, fault, wanted result. Check figures shown twice for agreement: the SOC graph said 7 entities while the report said 6.
5. Check phone tables for clipped columns, and controls for clipped labels.
6. Drive core flows with Playwright: clicks, keys, reload, no-JS, reduced motion. Dev-only 504 "Outdated Optimize Dep" errors are not site faults; confirm on the build.
7. Passing a build proves nothing about the look. State plainly which screenshots were not re-read after the last change.

Subagent note: subagent shells do not keep `cd`. Use `npm --prefix <dir>` and absolute paths, and have the main session commit.
