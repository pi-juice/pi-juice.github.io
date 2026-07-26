import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Projects live as Markdown files in src/content/projects/.
// Each file's frontmatter must match the schema below; the body is the
// blog-style write-up rendered on the project's own page.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Path to a banner image in public/, e.g. "/banners/my-project.jpg".
    // Shown on the project card and at the top of the project page.
    banner: z.string().optional(),
    featured: z.boolean().default(false),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

// Resources live as entries in a single YAML file, src/content/resources.yaml.
// Each entry is one curated link (a video, paper, forum thread, etc.) plus a
// short note explaining why it's worth your time. Add a link by appending an
// entry to that file — no new file per link.
const resources = defineCollection({
  loader: file('src/content/resources.yaml'),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    // Groups the resource under a section on the page.
    type: z.enum(['video', 'paper', 'article', 'forum', 'tool', 'other']),
    // A sentence or two on what this is and why it's here.
    note: z.string(),
    tags: z.array(z.string()).default([]),
    // Optional; entries are sorted newest-first within each section when set.
    added: z.coerce.date().optional(),
  }),
});

export const collections = { projects, resources };
