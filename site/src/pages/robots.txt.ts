/* robots.txt: everything may be crawled, and the sitemap is named (issue #30, F-011).
   Note: crawlers read robots.txt only at the root of a host. On GitHub Pages this site lives under /no_babysitting_anymore/,
   so this file is served at <host>/no_babysitting_anymore/robots.txt; the host-level file belongs to the organisation's own
   Pages repository, not to this one. */
import type { APIRoute } from 'astro';
import { url } from '../lib/url';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(url('sitemap.xml'), site).href}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
