/* sitemap.xml: the home page, the Library and every chapter. Built from the same list the pages use, so a new
   chapter appears here without anyone remembering to add it. */
import type { APIRoute } from 'astro';
import { chapters } from '../lib/chapters';
import { url } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  const paths = ['', 'library/', ...chapters.map((c) => `${c.id}/`)];
  const locs = paths.map((p) => `  <url><loc>${new URL(url(p), site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
