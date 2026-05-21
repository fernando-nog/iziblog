import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*/**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('IziBlog Author'),
    tags: z.array(z.string()).default([]),
    category: z.string().default('general'),
    language: z.string().default('en'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    tldr: z.array(z.string()).optional(),
    canonicalUrl: z.string().url().optional(),
    cover: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
  }),
});

export const collections = { blog };
