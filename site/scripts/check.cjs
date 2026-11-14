// Pre-merge checks for the built site (docs/08-kaizen-go-live.md §3). Same script locally and in CI.
//   1. every internal link and asset in dist/ resolves (and respects the base path)
//   2. key pages, desktop 1440, phone 390 and the narrowest phone 320: no JS errors, no horizontal scroll
//   3. reduced motion: no readable text left hidden
//   4. idle cost: with nobody scrolling, the home page barely paints, except the water behind the manifesto, which must move but stay cheap (docs/09-motion-script.md §5)
//   5. accessibility with the motion ON, every page: axe-core, text that is hidden until scrolled must still be in the
//      accessibility tree (a split paragraph once exposed nothing), and no link without a destination (href="#")
// usage (from site/): NB_BASE=/no_babysitting_anymore/ node scripts/check.cjs
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const { BASE, DIST, file, serve, htmlFiles } = require('./serve-dist.cjs');

const PAGES = ['', '00/', '01/', '04/', 'thuc-hanh/', 'c02/', 'articles/', 'articles/sample/'];
/* every page that was built: index.html of each folder, plus loose files such as 404.html */
const ALL = [...new Set(htmlFiles().map((f) => { const r = path.relative(DIST, f).split(path.sep).join('/'); return path.basename(r) === 'index.html' ? r.slice(0, -'index.html'.length) : r; }))].filter((d) => !/^ds\//.test(d)).sort();
const IDLE_DRAWS_PER_S = 600; /* breathing hero: tens per second; the old renderer: ~80k */
const FLOW_DRAWS_PER_S = [300, 6000]; /* the water behind the manifesto must move (min) and stay far below the old renderer (max); measured ~3k */
const fails = [], note = (m) => console.log('  ' + m), fail = (m) => { fails.push(m); console.log('  ✕ ' + m); };

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
  const sizes = { desktop: { viewport: { width: 1440, height: 900 } }, phone: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, tiny: { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } };

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
    const p = await ctx.newPage(); await p.goto(origin + BASE, { waitUntil: 'networkidle' }); await p.waitForTimeout(9000);   /* the hero plays itself once after load (nbAuto); idle is measured after that */
    const cdp = await ctx.newCDPSession(p); await cdp.send('Performance.enable');
    const busy = async () => (await cdp.send('Performance.getMetrics')).metrics.find((m) => m.name === 'TaskDuration').value;
    for (const spot of ['top', 'manifesto', 'finale']) {
      if (spot === 'manifesto') {
        await p.evaluate(() => { const e = document.querySelector('.manifesto-wrap'), r = e.getBoundingClientRect(); const y = r.top + scrollY + r.height - innerHeight * 0.85; window.lenis ? window.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y); });
        await p.waitForTimeout(2500);
      }
      if (spot === 'finale') {
        await p.evaluate(() => { const e = document.getElementById('finale'); const y = e.getBoundingClientRect().top + scrollY + innerHeight * 2; window.lenis ? window.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y); });
        await p.waitForTimeout(2500);
      }
      const t0 = await busy(), d0 = await p.evaluate(() => window.__d);
      await p.waitForTimeout(3000);
      const t1 = await busy(), d1 = await p.evaluate(() => window.__d);
      const draws = Math.round((d1 - d0) / 3), cpu = ((t1 - t0) / 3 * 100).toFixed(1);
      note(`${spot}: ${draws} glyph draws/s, main thread busy ${cpu}%`);
      if (spot === 'manifesto') {
        if (draws < FLOW_DRAWS_PER_S[0]) fail(`manifesto: the field is not moving (${draws} glyph draws/s, expected at least ${FLOW_DRAWS_PER_S[0]})`);
        if (draws > FLOW_DRAWS_PER_S[1]) fail(`manifesto: ${draws} glyph draws/s while moving (budget ${FLOW_DRAWS_PER_S[1]})`);
      } else if (draws > IDLE_DRAWS_PER_S) fail(`${spot}: ${draws} glyph draws/s while idle (budget ${IDLE_DRAWS_PER_S})`);
    }
    await ctx.close();
  }

  console.log('4b · article art (docs/15 §5): cells, live canvases, idle cost, reduced motion, nothing drawn off screen');
  {
    const ART_PAGE = 'articles/sample/', MAX_CELLS = { desktop: 12000, phone: 4000 }, MAX_CPU = 8, CELL = [9, 16];
    for (const kind of ['desktop', 'phone']) {
      const ctx = await browser.newContext(sizes[kind]);
      await ctx.addInitScript(() => {
        window.__d = 0; const P = CanvasRenderingContext2D.prototype, di = P.drawImage, ft = P.fillText;
        P.drawImage = function () { window.__d++; return di.apply(this, arguments); };
        P.fillText = function () { window.__d++; return ft.apply(this, arguments); };
      });
      const p = await ctx.newPage(); await p.goto(origin + BASE + ART_PAGE, { waitUntil: 'networkidle' }); await p.waitForTimeout(6500);   /* it converges in 2.4 s, then breathes */
      const geo = await p.evaluate(([cw, ch]) => {
        const c = document.querySelector('[data-art-banner] canvas'), r = c.getBoundingClientRect();
        const live = [...document.querySelectorAll('canvas')].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && e.offsetParent !== null; }).length;
        return { cells: Math.floor(r.width / cw) * Math.floor(r.height / ch), live, aria: !!c.closest('[aria-hidden="true"]') };
      }, CELL);
      const cdp = await ctx.newCDPSession(p); await cdp.send('Performance.enable');
      const busy = async () => (await cdp.send('Performance.getMetrics')).metrics.find((m) => m.name === 'TaskDuration').value;
      const t0 = await busy(), d0 = await p.evaluate(() => window.__d); await p.waitForTimeout(3000);
      const t1 = await busy(), d1 = await p.evaluate(() => window.__d);
      const draws = Math.round((d1 - d0) / 3), cpu = ((t1 - t0) / 3 * 100).toFixed(1);
      await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(1500);   /* the banner is off screen now */
      const o0 = await p.evaluate(() => window.__d); await p.waitForTimeout(3000); const o1 = await p.evaluate(() => window.__d);
      const off = Math.round((o1 - o0) / 3);
      note(`${kind} banner: ${geo.cells} cells, ${geo.live} live canvas(es), ${draws} glyph draws/s idle, main thread busy ${cpu}%, ${off} draws/s off screen`);
      if (geo.cells > MAX_CELLS[kind]) fail(`${kind} banner: ${geo.cells} cells (budget ${MAX_CELLS[kind]})`);
      if (geo.live > 2) fail(`${kind}: ${geo.live} live canvases on an article page (budget 2)`);
      if (!geo.aria) fail(`${kind} banner: the canvas is not aria-hidden`);
      if (draws > IDLE_DRAWS_PER_S) fail(`${kind} banner: ${draws} glyph draws/s while idle (budget ${IDLE_DRAWS_PER_S})`);
      if (Number(cpu) > MAX_CPU) fail(`${kind} banner: main thread busy ${cpu}% while idle (budget ${MAX_CPU}%)`);
      if (off > 5) fail(`${kind} banner: still drawing off screen (${off} glyph draws/s)`);
      await ctx.close();
    }
    {
      const ctx = await browser.newContext({ ...sizes.desktop, reducedMotion: 'reduce' }), p = await ctx.newPage();
      await p.goto(origin + BASE + ART_PAGE, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
      const painted = await p.evaluate(() => { const c = document.querySelector('[data-art-banner] canvas'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++; return n; });
      note(`reduced motion: ${painted} painted pixels 0.8 s after load`);
      if (painted < 500) fail(`reduced motion: the banner is not drawn straight away (${painted} painted pixels)`);
      await ctx.close();
    }
  }

  console.log('5 · accessibility with the motion on (axe-core, accessibility tree, dead links)');
  {
    const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
    const norm = (s) => s.replace(/[\s"'\\]/g, '');
    const ctx = await browser.newContext(sizes.desktop);
    let nTree = 0;
    for (const pg of ALL) {
      const p = await ctx.newPage();
      await p.goto(origin + BASE + pg, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
      /* (a) axe. Colour contrast is measured on the settled text by type-check.cjs; mid-animation opacity would only add noise here */
      await p.addScriptTag({ content: axeSrc });
      const v = await p.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }, rules: { 'color-contrast': { enabled: false } } })
        .then((r) => r.violations.map((x) => ({ id: x.id, impact: x.impact, n: x.nodes.length, at: x.nodes[0].target.join(' ').slice(0, 70) }))));
      for (const x of v) {
        const msg = `/${pg}: axe ${x.id} (${x.impact}) ×${x.n}, e.g. ${x.at}`;
        if (x.impact === 'serious' || x.impact === 'critical') fail(msg); else note(msg);
      }
      /* (b) every text that a reveal hides until it is scrolled to must already be in the accessibility tree */
      const items = await p.evaluate(() => {
        const out = [];
        document.querySelectorAll('[data-reveal]').forEach((e, i) => {
          if (!/^(P|H[1-6]|SPAN|B)$/.test(e.tagName) || e.closest('details, [hidden], [aria-hidden="true"], .nb-sr')) return;
          const t = ((e.querySelector(':scope > .nb-sr') || e).textContent || '').replace(/\s+/g, ' ').trim(); if (t.replace(/\s/g, '').length < 12) return;
          e.setAttribute('data-axchk', String(i)); out.push([i, t.slice(0, 40)]);
        });
        return out;
      });
      for (const [i, t] of items) {
        nTree++;
        const snap = norm(await p.locator(`[data-axchk="${i}"]`).ariaSnapshot());
        if (!snap.includes(norm(t).slice(0, 14))) fail(`/${pg}: "${t.slice(0, 40)}" is not in the accessibility tree (hidden, or a label on a paragraph)`);
      }
      /* (c) a link must go somewhere */
      const dead = await p.evaluate(() => [...document.querySelectorAll('a')].filter((a) => !a.getAttribute('href') || a.getAttribute('href') === '#').map((a) => a.textContent.trim().slice(0, 30)));
      if (dead.length) fail(`/${pg}: ${dead.length} link(s) with no destination: ${dead.slice(0, 3).join(' | ')}`);
      await p.close();
    }
    note(`${ALL.length} pages · ${nTree} revealed texts checked against the accessibility tree`);
    await ctx.close();
  }

  await browser.close(); server.close();
  console.log(fails.length ? `\n✕ ${fails.length} check(s) failed` : '\n✓ all checks passed');
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
