# Pre-ship checklist

1. `bash tools/check.sh`: 0 errors, the CSP hash check passes, and read the TODO(musa) list. If the hash check fails, put the hash it prints into `script-src` in `public/_headers`, then rebuild `tools/captures/portfolio-security-headers.html` (see `workflows/add-project.md`). Anything visitor-facing that still says TODO blocks launch.
2. `astro.config.mjs` `site` is the real domain.
3. `npx astro preview status` first: only one preview runs at a time, and `astro preview --port N` quietly refuses while one is up, so port N may be another project's preview. Use the port `status` reports, or `npm run preview` if none is running. Check the page title before trusting any measurement. Then screenshot every route (`/`, `/projects`, each case study, `/journey`, `/about`, `/blog`, `/404`) with `--full`. Read them all.
4. Keyboard only: Tab from the top. Skip link appears, every control is reachable, focus ring visible, toolkit rows open with Enter.
5. Lighthouse (Chrome DevTools) on the preview: aim for 95+ in all four.
6. `seo-audit` skill on the home page. Check `/sitemap-index.xml` exists in `dist/`.
7. Deploy (Vercel or Cloudflare Pages: build `npm run build`, output `dist`, `NODE_VERSION=22`).
