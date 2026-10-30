# Write a blog post

## Inputs
- Topic and the one thing a reader should take away. Musa writes or approves every claim.

## Steps
1. Create `src/content/blog/<slug>.mdx` with `title`, `description` (under 155 characters), `pubDate`, `draft: true`.
2. Draft with the `copywriting` skill, then run `humanizer` if installed. Keep Musa's voice: plain, first person, short sentences.
3. Code samples go in fenced blocks. Security posts: no live exploit payloads against real targets; lab or CTF context only.
4. Screenshot `/blog/<slug>` (`node tools/screenshot.mjs /blog/<slug> --full`) and read it.
5. When Musa approves, set `draft: false`. `npm run check`.

## Notes
- Drafts are filtered out of the index and of route generation; a draft URL 404s by design.
- The `BlogPosting` JSON-LD is generated in `src/pages/blog/[slug].astro`.
