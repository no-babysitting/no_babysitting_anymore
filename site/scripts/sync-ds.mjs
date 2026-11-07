// Copy the design system's shared runtime into public/ds so the site and the previews use the same files.
import { cpSync, mkdirSync } from 'node:fs';
const ds = new URL('../../design-system/', import.meta.url), out = new URL('../public/ds/', import.meta.url);
mkdirSync(out, { recursive: true });
for (const f of ['tokens.css', 'components/bundle.css', 'components/bundle.js']) cpSync(new URL(f, ds), new URL(f.split('/').pop(), out));
console.log('ds synced');
