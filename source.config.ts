import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()).optional(),
    lastModified: z.string().date().or(z.date()).optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
  }),
});

export const guide = defineCollections({
  type: 'doc',
  dir: 'content/guide',
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()).optional(),
    lastModified: z.string().date().or(z.date()).optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
  }),
});

export const product = defineCollections({
  type: 'doc',
  dir: 'content/products',
  schema: frontmatterSchema.extend({
    date: z.string().date().or(z.date()).optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),
    guide: z.string().optional(),
    providers: z
      .array(
        z.object({
          name: z.string(),
          price: z.number(),
          currency: z.string(),
          link: z.string().url(),
        }),
      )
      .optional(),
  }),
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
