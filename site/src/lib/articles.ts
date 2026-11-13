/* Loading and cross-checking the Articles collection (issue #44, docs/24).
   The schema in src/content.config.ts checks one file at a time; the rules that need the rest of the site live here.
   Missing sources and dead external links never fail the build (docs/06 §1 item 8). */
import { getCollection, type CollectionEntry } from 'astro:content';
import { PARTS } from '../content/parts';

export type Article = CollectionEntry<'articles'>;

/* /articles/sample/ is the fixture route; a real article cannot take that slug */
export const RESERVED_SLUGS = ['sample'];
/* lower-case ASCII kebab-case, no leading digit: the slug names the topic, not the position */
const SLUG = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

/* ids an article may use in `art`. The drawing mechanism arrives in the third slice of #44; until then there is only the default piece. */
export const ART_IDS: readonly string[] = ['default'];

/* ids an article may use in `related`: the five parts of the main path and the Advanced pages that exist (the Library is hidden, #21) */
export const RELATED: Record<string, { href: string; title: string }> = {
  ...Object.fromEntries(PARTS.map((p) => [p.id, { href: `${p.id}/`, title: p.vi }])),
  c02: { href: 'c02/', title: 'Ngân sách ngữ cảnh' },
};

/* Images and SVG need a text alternative (issue #44). This runs here and not as a markdown plugin because Astro logs an error
   thrown by a plugin and carries on: the build would exit 0. Code spans and fenced blocks are skipped, so an article may show the syntax. */
function altProblems(body: string): string[] {
  const text = body.replace(/^(```|~~~)[\s\S]*?^\1/gm, '').replace(/`[^`\n]*`/g, '');
  const out: string[] = [];
  for (const m of text.matchAll(/!\[([^\]]*)\]\(([^)\s]*)/g)) if (!m[1].trim()) out.push(`image "${m[2]}" has no alt text`);
  for (const m of text.matchAll(/<img\b[^>]*>/gi)) if (!/\balt\s*=\s*(["'])[^"']*\S[^"']*\1/i.test(m[0])) out.push(`<img> without alt text: ${m[0].slice(0, 60)}`);
  for (const m of text.matchAll(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi)) if (!/\baria-label\s*=\s*(["'])[^"']*\S[^"']*\1/i.test(m[0]) && !/<title>[^<]*\S[^<]*<\/title>/i.test(m[0])) out.push('inline <svg> without aria-label or <title>');
  return out;
}

function check(kind: string, entries: CollectionEntry<'articles'>[], reserved: boolean): void {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const e of entries) {
    const where = `${kind} "${e.id}"`;
    if (!SLUG.test(e.id)) errors.push(`${where}: the file name must be lower-case ASCII kebab-case with no leading digit (a-z, 0-9, "-"), e.g. one-writer-many-readers.md`);
    if (reserved && RESERVED_SLUGS.includes(e.id)) errors.push(`${where}: "${e.id}" is reserved for the fixture route /articles/${e.id}/`);
    if (seen.has(e.id)) errors.push(`${where}: duplicate slug`);
    seen.add(e.id);
    if (!ART_IDS.includes(e.data.art)) errors.push(`${where}: unknown art id "${e.data.art}" (known: ${ART_IDS.join(', ')})`);
    for (const r of e.data.related) if (!RELATED[r]) errors.push(`${where}: unresolved related id "${r}" (known: ${Object.keys(RELATED).join(', ')})`);
    for (const p of altProblems(e.body ?? '')) errors.push(`${where}: ${p}`);
  }
  if (errors.length) throw new Error(`Articles: ${errors.length} problem(s)\n - ${errors.join('\n - ')}`);
}

/* Published articles: by series, then `order` inside a series; standalone pieces after the series, newest first. Throws on any problem above. */
let cached: Promise<Article[]> | undefined;
/* cached in a build (every page's header asks whether anything is published); in dev the content can change under it */
export function loadArticles(): Promise<Article[]> { return import.meta.env.PROD ? (cached ??= load()) : load(); }

async function load(): Promise<Article[]> {
  const all = await getCollection('articles');
  check('article', all, true);
  const date = (a: Article) => a.data.publishedAt;
  return all.sort((a, b) => {
    if (a.data.series && b.data.series) return a.data.series.localeCompare(b.data.series) || a.data.order - b.data.order;
    if (a.data.series) return -1;
    if (b.data.series) return 1;
    return date(b).localeCompare(date(a));
  });
}

/* The test page for the template, checked by the same rules */
export async function loadFixtures(): Promise<CollectionEntry<'articleFixtures'>[]> {
  const all = await getCollection('articleFixtures');
  check('fixture', all as unknown as CollectionEntry<'articles'>[], false);
  return all;
}

/* Paths for the sitemap: the index (once something is published) and each published article. The fixture is never listed. */
export async function articlePaths(): Promise<string[]> {
  const list = await loadArticles();
  return list.length ? ['articles/', ...list.map((a) => `articles/${a.id}/`)] : [];
}

/* "13/11/2026" from "2026-11-13" */
export const formatDay = (iso: string) => iso.split('-').reverse().join('/');

/* Reading time for an index card: words of the body at 220 a minute, at least one. 220 is a convention, not a measurement. */
export const readingMinutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));
