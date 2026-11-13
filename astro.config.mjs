// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO(musa): switch to the real domain once bought (here and in public/robots.txt). Sitemap and canonical URLs use it.
  site: 'https://musa-portfolio-ef2.pages.dev',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    // Never inline small scripts: the CSP in public/_headers allows only same-origin scripts plus one hash.
    build: { assetsInlineLimit: 0 }
  },

  // /blog stays out of the sitemap until the first post is published.
  integrations: [mdx(), sitemap({ filter: (page) => !page.endsWith('/blog/') })]
});
