import { defineConfig } from 'astro/config';
import rehypeArticle from './src/lib/rehype-article.mjs';
/* NB_BASE / NB_SITE are set by the GitHub Pages workflow; local builds and the artifact use / */
const base = process.env.NB_BASE || '/';
export default defineConfig({
  output: 'static',
  site: process.env.NB_SITE || 'https://no-babysitting.github.io',
  base,
  markdown: {
    rehypePlugins: [[rehypeArticle, { base }]],
    /* footnotes: the default labels are English */
    remarkRehype: { footnoteLabel: 'Chú thích', footnoteBackLabel: 'Quay lại đoạn văn' },
  },
});
