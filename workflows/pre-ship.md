# Pre-ship checklist

1. `bash tools/check.sh`: 0 errors, and read the TODO(musa) list. Anything visitor-facing that still says TODO blocks launch.
2. `astro.config.mjs` `site` is the real domain.
3. `npm run preview`, then screenshot every route (`/`, `/projects`, each case study, `/about`, `/blog`, `/404`) with `--full`. Read them all.
4. Keyboard only: Tab from the top. Skip link appears, every control is reachable, focus ring visible, toolkit rows open with Enter.
5. Lighthouse (Chrome DevTools) on the preview: aim for 95+ in all four.
6. `seo-audit` skill on the home page. Check `/sitemap-index.xml` exists in `dist/`.
7. Deploy (Vercel or Cloudflare Pages: build `npm run build`, output `dist`, `NODE_VERSION=22`).
