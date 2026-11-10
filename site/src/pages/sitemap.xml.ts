/* sitemap.xml: the home page, the five parts of the main path, the practice page, A1 (c02) and the Library.
   The old v3 skeleton pages are left out on purpose: they are noindex stubs (docs/14 §9). */
import type { APIRoute } from 'astro';
import { PARTS } from '../content/parts';
import { url } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  const paths = ['', ...PARTS.map((p) => `${p.id}/`), 'thuc-hanh/', 'c02/', 'library/'];
  const locs = paths.map((p) => `  <url><loc>${new URL(url(p), site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
