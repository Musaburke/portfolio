import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.string(),
      role: z.string(),
      stack: z.array(z.string()),
      order: z.number(),
      live: z.url().optional(),
      repo: z.url().optional(),
      host: z.string(),
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
