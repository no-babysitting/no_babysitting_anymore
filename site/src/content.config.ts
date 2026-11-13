/* Content collections for the Articles section (issue #44, docs/24).
   `articles` holds only published pieces; drafts live in editorial/, outside the build (D59). `article-fixtures` holds the
   test page behind /articles/sample/ and shares the schema, so the template is exercised by the same rules a real article meets. */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Dates are quoted strings written as "YYYY-MM-DD". An unquoted YAML date is not accepted: the parser turns it into a Date first, and an
   impossible day such as 2026-02-31 then rolls over to 2026-03-03 without a trace. A day that does not exist fails the build. */
const isoDay = z.string({ invalid_type_error: 'write the date as a quoted string, e.g. "2026-11-13" (an unquoted YAML date is rewritten by the parser)' })
  .refine((s) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    return !!m && new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).toISOString().slice(0, 10) === s;
  }, (s) => ({ message: `"${s}" is not a real day written as YYYY-MM-DD` }));

export const articleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: isoDay,
  /* same name and meaning as SourceRef.verifiedAt in docs/06: the day the claims were last checked against their sources */
  verifiedAt: isoDay,
  /* the position inside `series`; meaningless (but required) for a standalone article */
  order: z.number().int().nonnegative(),
  /* id of the article's ASCII piece; checked against the registry in src/lib/articles.ts */
  art: z.string().min(1),
  series: z.string().min(1).optional(),
  /* ids of main-path parts ("00") or Advanced pages ("c02"); checked in src/lib/articles.ts */
  related: z.array(z.string({ invalid_type_error: 'related ids are strings: quote part ids such as "00" in YAML (an unquoted 00 is the number 0)' })).default([]),
  tags: z.array(z.string().min(1)).default([]),
  updatedAt: z.object({ date: isoDay, changelog: z.array(z.string().min(1)).min(1) }).strict().optional(),
}).strict();

/* The id is the file name as written, not a slugified copy: a name that is not lower-case kebab-case fails in src/lib/articles.ts
   instead of being silently rewritten (two files that slugify to the same id would otherwise overwrite each other). */
const generateId = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');

export const collections = {
  articles: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/articles', generateId }), schema: articleSchema }),
  articleFixtures: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/article-fixtures', generateId }), schema: articleSchema }),
};
