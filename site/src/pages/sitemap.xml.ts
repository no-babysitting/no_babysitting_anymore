/* sitemap.xml: the home page, the five parts of the main path, the practice page, and A1 (c02).
   The old v3 skeleton pages are left out on purpose: they are noindex stubs (docs/14 §9). The Library is hidden until it has real
   content (13/11/2026, issue #21): /library/ redirects to the home page. */
import type { APIRoute } from 'astro';
import { PARTS } from '../content/parts';
import { url } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  const paths = ['', ...PARTS.map((p) => `${p.id}/`), 'thuc-hanh/', 'c02/'];
  const locs = paths.map((p) => `  <url><loc>${new URL(url(p), site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
