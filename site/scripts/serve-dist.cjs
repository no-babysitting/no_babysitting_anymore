// Serves dist/ under the base path, the way GitHub Pages does. Shared by check.cjs and type-check.cjs.
const http = require('http'), fs = require('fs'), path = require('path');

const BASE = (process.env.NB_BASE || '/').replace(/\/?$/, '/');
const DIST = path.join(__dirname, '..', 'dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.txt': 'text/plain' };

function file(u) {
  let f = path.join(DIST, decodeURIComponent(u).slice(BASE.length));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  return fs.existsSync(f) ? f : null;
}
function serve() {
  return new Promise((ok) => {
    const s = http.createServer((req, res) => {
      const u = req.url.split('?')[0].split('#')[0], f = u.startsWith(BASE) ? file(u) : null;
      if (!f) { res.writeHead(404); return res.end('404'); }
      res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
    }).listen(0, '127.0.0.1', () => ok(s));
  });
}
function htmlFiles(dir = DIST) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => d.isDirectory() ? htmlFiles(path.join(dir, d.name)) : d.name.endsWith('.html') ? [path.join(dir, d.name)] : []);
}

module.exports = { BASE, DIST, file, serve, htmlFiles };
