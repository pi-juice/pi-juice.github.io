import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Projects live as Markdown files in src/content/projects/.
// Each file's frontmatter must match the schema below; the body is the
// blog-style write-up rendered on the project's own page.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      featured: z.boolean().default(false),
      repoUrl: z.string().url().optional(),
      liveUrl: z.string().url().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
