import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      // Title, summary, date, stack, links and host live in src/data/work.ts (same id as the filename).
      role: z.string(), // the longer "what I did" line shown on the case study
      order: z.number(), // position among case studies: on the home page and in the "next" loop
      featured: z.boolean().default(false), // true puts it in Featured work on the home page (keep it to 3 or 4)
      slab: z.string().default('#262626'), // flat colour block behind the home-page stack, from the product's own palette
      cover: image(),
      coverAlt: z.string(),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
