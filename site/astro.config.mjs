import { defineConfig } from 'astro/config';
/* NB_BASE / NB_SITE are set by the GitHub Pages workflow; local builds and the artifact use / */
export default defineConfig({
  output: 'static',
  site: process.env.NB_SITE || 'https://no-babysitting.github.io',
  base: process.env.NB_BASE || '/',
});
