// Pre-merge checks for the built site (docs/08-kaizen-go-live.md §3). Same script locally and in CI.
//   1. every internal link and asset in dist/ resolves (and respects the base path)
//   2. key pages, desktop 1440 and phone 390: no JS errors, no horizontal scroll
//   3. reduced motion: no readable text left hidden
//   4. idle cost: with nobody scrolling, the home page barely paints (docs/09-motion-script.md §5)
// usage (from site/): NB_BASE=/no_babysitting_anymore/ node scripts/check.cjs
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const BASE = (process.env.NB_BASE || '/').replace(/\/?$/, '/');
const DIST = path.join(__dirname, '..', 'dist');
const PAGES = ['', 'c00/', 'c02/', 'c03/', 'c10/', 'library/'];
const IDLE_DRAWS_PER_S = 600; /* breathing hero: tens per second; the old renderer: ~80k */
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.txt': 'text/plain' };
const fails = [], note = (m) => console.log('  ' + m), fail = (m) => { fails.push(m); console.log('  ✕ ' + m); };

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
function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => d.isDirectory() ? htmlFiles(path.join(dir, d.name)) : d.name.endsWith('.html') ? [path.join(dir, d.name)] : []);
}

(async () => {
  if (!fs.existsSync(DIST)) { console.error('no dist/: run the build first'); process.exit(1); }

  console.log(`1 · links and assets (base ${BASE})`);
  let n = 0;
  for (const f of htmlFiles(DIST)) {
    const html = fs.readFileSync(f, 'utf8');
    for (const m of html.matchAll(/\s(?:href|src)="([^"#?]*)/g)) {
      const u = m[1];
      if (!u || /^(https?:|mailto:|data:|\/\/)/.test(u) || !u.startsWith('/')) continue;
      n++;
      if (!u.startsWith(BASE)) fail(`${path.relative(DIST, f)}: "${u}" ignores the base path`);
      else if (!file(u)) fail(`${path.relative(DIST, f)}: "${u}" does not exist`);
    }
  }
  note(`${n} internal references checked`);

  const server = await serve(), origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const sizes = { desktop: { viewport: { width: 1440, height: 900 } }, phone: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } };

  console.log('2 · pages: errors and horizontal scroll');
  for (const [kind, opt] of Object.entries(sizes)) {
    const ctx = await browser.newContext(opt);
    for (const pg of PAGES) {
      const p = await ctx.newPage(), errs = [];
      p.on('pageerror', (e) => errs.push(e.message));
      p.on('console', (m) => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.text())) errs.push(m.text()); });
      await p.goto(origin + BASE + pg, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
      const h = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      if (errs.length) fail(`${kind} /${pg}: ${errs.join(' | ')}`);
      if (h) fail(`${kind} /${pg}: horizontal scroll`);
      await p.close();
    }
    note(`${kind}: ${PAGES.length} pages`);
    await ctx.close();
  }

  console.log('3 · reduced motion: nothing readable stays hidden');
  {
    const ctx = await browser.newContext({ ...sizes.desktop, reducedMotion: 'reduce' }), p = await ctx.newPage();
    await p.goto(origin + BASE, { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
    const hidden = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3,p,li,a,button')]
      .filter((e) => { const s = getComputedStyle(e); return e.textContent.trim() && (s.visibility === 'hidden' || +s.opacity < 0.05); })
      .map((e) => e.textContent.trim().slice(0, 40)));
    if (hidden.length) fail(`reduced motion hides: ${hidden.slice(0, 5).join(' | ')}`); else note('home: all text visible');
    await ctx.close();
  }

  console.log('4 · idle cost on the home page (nobody scrolling)');
  {
    const ctx = await browser.newContext(sizes.desktop);
    await ctx.addInitScript(() => {
      window.__d = 0; const P = CanvasRenderingContext2D.prototype, di = P.drawImage, ft = P.fillText;
      P.drawImage = function () { window.__d++; return di.apply(this, arguments); };
      P.fillText = function () { window.__d++; return ft.apply(this, arguments); };
    });
    const p = await ctx.newPage(); await p.goto(origin + BASE, { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
    const cdp = await ctx.newCDPSession(p); await cdp.send('Performance.enable');
    const busy = async () => (await cdp.send('Performance.getMetrics')).metrics.find((m) => m.name === 'TaskDuration').value;
    for (const spot of ['top', 'finale']) {
      if (spot === 'finale') {
        await p.evaluate(() => { const e = document.getElementById('finale'); const y = e.getBoundingClientRect().top + scrollY + innerHeight * 2; window.lenis ? window.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y); });
        await p.waitForTimeout(2500);
      }
      const t0 = await busy(), d0 = await p.evaluate(() => window.__d);
      await p.waitForTimeout(3000);
      const t1 = await busy(), d1 = await p.evaluate(() => window.__d);
      const draws = Math.round((d1 - d0) / 3), cpu = ((t1 - t0) / 3 * 100).toFixed(1);
      note(`${spot}: ${draws} glyph draws/s, main thread busy ${cpu}%`);
      if (draws > IDLE_DRAWS_PER_S) fail(`${spot}: ${draws} glyph draws/s while idle (budget ${IDLE_DRAWS_PER_S})`);
    }
    await ctx.close();
  }

  await browser.close(); server.close();
  console.log(fails.length ? `\n✕ ${fails.length} check(s) failed` : '\n✓ all checks passed');
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
