/* hast transforms for article markdown (issue #44, slice 2):
   - tables: explicit ARIA roles (a phone layout turns cells into stacked cards with display: block, which would otherwise make
     browsers drop the table semantics), data-label on each cell from its column header, and a scroll wrapper for wide tables;
   - links that start with "/" get the site base path (the site is served from a sub-path on GitHub Pages);
   - external links open in a new tab, as the source links of the main path do. */
const isEl = (n, tag) => n.type === 'element' && (!tag || n.tagName === tag);
const text = (n) => (n.type === 'text' ? n.value : (n.children || []).map(text).join(''));
function walk(n, f) { f(n); for (const c of n.children || []) walk(c, f); }
const role = (n, r) => { n.properties = { ...n.properties, role: r }; };

function wrapTables(node) {
  if (!node.children) return;
  node.children = node.children.map((c) => {
    wrapTables(c);
    return isEl(c, 'table') ? { type: 'element', tagName: 'div', properties: { className: ['table-wrap'] }, children: [c] } : c;
  });
}

export default function rehypeArticle({ base = '/' } = {}) {
  const prefix = base.replace(/\/?$/, '/');
  return (tree) => {
    walk(tree, (n) => {
      if (isEl(n, 'table')) {
        role(n, 'table');
        const heads = [];
        walk(n, (m) => {
          if (isEl(m, 'thead')) { role(m, 'rowgroup'); walk(m, (x) => { if (isEl(x, 'tr')) role(x, 'row'); if (isEl(x, 'th')) { role(x, 'columnheader'); heads.push(text(x).trim()); } }); }
          if (isEl(m, 'tbody')) {
            role(m, 'rowgroup');
            for (const tr of m.children.filter((c) => isEl(c, 'tr'))) {
              role(tr, 'row');
              tr.children.filter((c) => isEl(c, 'td') || isEl(c, 'th')).forEach((cell, i) => {
                role(cell, isEl(cell, 'th') ? 'rowheader' : 'cell');
                if (heads[i]) cell.properties = { ...cell.properties, dataLabel: heads[i] };
              });
            }
          }
        });
      }
      if (isEl(n, 'a') && typeof n.properties?.href === 'string') {
        const href = n.properties.href;
        if (/^\/(?!\/)/.test(href)) n.properties.href = prefix + href.slice(1);
        else if (/^https?:\/\//.test(href)) n.properties = { ...n.properties, target: '_blank', rel: ['noopener'] };
      }
    });
    wrapTables(tree);
  };
}
