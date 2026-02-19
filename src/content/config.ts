import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Cash Me Up Team'),
    category: z.string().default('News'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    readTime: z.string().default('5 min read'),
  }),
});

export const collections = { blog };
