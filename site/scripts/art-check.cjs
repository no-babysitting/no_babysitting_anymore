// Art lock: the ASCII art the owner has signed off must not drift while other work goes on (docs/19 §2, D55).
// For each locked piece it renders the built site, reads the canvas back as a fingerprint in three parts and compares it
// with design-system/art-lock.json:
//   layout   share of lit pixels in each cell of a 12×7 grid, compared by correlation (a moved or missing composition)
//   palette  mean colour of the lit pixels in 3×2 regions (a new palette, a dimmer or greyer picture)
//   lit      share of lit pixels over the whole canvas (more or less art)
// Measured on purpose so that what differs between two machines (font anti-aliasing, browser build, random noise glyphs)
// stays well under the tolerance: across this machine and CI the worst case was layout 0.94, palette Δ 3.9, lit ±3%. The art's source images and the mascot's faces are compared by hash.
//
// usage (from site/, after npm run build):
//   NB_BASE=/no_babysitting_anymore/ node scripts/art-check.cjs            compare with the lock, exit 1 on drift
//   NB_BASE=/no_babysitting_anymore/ node scripts/art-check.cjs --update   rewrite the lock (a PR that does this needs the owner's approval)
//   add --shots dir to save each piece as a PNG for the PR
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const { chromium } = require('playwright');
const { BASE, serve } = require('./serve-dist.cjs');

const ROOT = path.join(__dirname, '..', '..'), LOCK = path.join(ROOT, 'design-system', 'art-lock.json');
const args = process.argv.slice(2), UPDATE = args.includes('--update'), SHOTS = args.includes('--shots') ? args[args.indexOf('--shots') + 1] : null;
const TOL = { layout: 0.88, palette: 6, lit: 0.15 };   // min correlation · max mean |Δ| per channel (0–255) · max relative change

const VIEWS = { desktop: { viewport: { width: 1440, height: 900 } }, phone: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } };
/* what is locked. still = reduced motion (every scene shows its last frame); at = scroll the Spark pin to that progress, motion on */
const PIECES = [
  { id: 'hero-logo', page: '', sel: '#intro-cv', still: true },
  { id: 'water', page: '', sel: '#man-cv', still: true },
  { id: 'finale-city', page: '', sel: '#finale-cv', still: true },
  { id: 'menu-art', page: '', sel: '#nb-menu .mcv', still: true, menu: true },
  { id: 'spark-still', page: '', sel: '#spark-cv', still: true },
  { id: 'spark-fresco', page: '', sel: '#spark-cv', at: 0.2 },
  { id: 'spark-hands', page: '', sel: '#spark-cv', at: 0.8 },
  { id: 'spark-light', page: '', sel: '#spark-cv', at: 0.92 },
];
const FILES = ['site/public/art/fresco.jpg', 'site/public/art/hand-left.png', 'site/public/art/hand-right.png'];
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex').slice(0, 16);

function faces() {   // the mascot's faces: NB.FACES in the design-system bundle
  const src = fs.readFileSync(path.join(ROOT, 'design-system/components/bundle.js'), 'utf8'), m = src.match(/NB\.FACES = [^\n]+/);
  return m ? sha(m[0]) : 'missing';
}

async function fingerprint(page, sel) {
  return page.evaluate((sel) => {
    const c = document.querySelector(sel);
    if (!c || !c.width || !c.height) return null;
    const GX = 12, GY = 7, RX = 3, RY = 2, w = c.width, h = c.height, d = c.getContext('2d').getImageData(0, 0, w, h).data;
    const px = (x, y, k) => d[(y * w + x) * 4 + k] * d[(y * w + x) * 4 + 3] / 255;
    const bg = [0, 1, 2].map((k) => Math.min(px(0, 0, k), px(w - 1, 0, k), px(0, h - 1, k), px(w - 1, h - 1, k)));
    const cells = new Array(GX * GY).fill(0), count = new Array(GX * GY).fill(0), reg = Array.from({ length: RX * RY }, () => [0, 0, 0, 0]), all = [0, 0, 0, 0];
    let n = 0;
    for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
      const r = px(x, y, 0), g = px(x, y, 1), b = px(x, y, 2), ci = Math.min(GY - 1, (y * GY / h) | 0) * GX + Math.min(GX - 1, (x * GX / w) | 0);
      count[ci]++; n++;
      if (Math.max(r - bg[0], g - bg[1], b - bg[2]) <= 24) continue;
      cells[ci]++;
      const q = reg[Math.min(RY - 1, (y * RY / h) | 0) * RX + Math.min(RX - 1, (x * RX / w) | 0)];
      q[0] += r; q[1] += g; q[2] += b; q[3]++; all[0] += r; all[1] += g; all[2] += b; all[3]++;
    }
    const mean = (q) => [0, 1, 2].map((k) => Math.round(q[k] / Math.max(1, q[3])));
    return {
      size: [w, h], lit: +(all[3] / n).toFixed(4),
      layout: cells.map((v, i) => +(v / Math.max(1, count[i])).toFixed(4)),
      palette: reg.map((q) => (q[3] > 50 ? mean(q) : mean(all))),
    };
  }, sel);
}

async function shoot(browser, origin, view, p) {
  const ctx = await browser.newContext({ ...VIEWS[view], reducedMotion: p.still ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage(), errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route(/goatcounter|gc\.zgo\.at/, (r) => r.abort());
  await page.goto(origin + BASE + p.page, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);
  if (p.menu) { await page.click('[data-menu]'); await page.waitForTimeout(900); }
  else if (p.at != null) {
    const y = await page.evaluate((at) => {
      const t = window.ScrollTrigger && ScrollTrigger.getAll().find((t) => t.trigger && t.trigger.id === 'spark' && t.pin);
      return t ? t.start + (t.end - t.start) * at : null;
    }, p.at);
    if (y == null) throw new Error('Spark pin not found');
    await page.evaluate((y) => (window.lenis ? window.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y)), y);
    await page.waitForTimeout(1400);
  } else {
    await page.locator(p.sel).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1600);
  }
  const fp = await fingerprint(page, p.sel);
  if (SHOTS && fp) { fs.mkdirSync(SHOTS, { recursive: true }); await page.locator(p.sel).screenshot({ path: path.join(SHOTS, `${p.id}-${view}.png`) }); }
  await ctx.close();
  if (errors.length) throw new Error(`${p.id} (${view}): ${errors.join(' | ')}`);
  return fp;
}

function compare(a, b) {
  if (!a || !b) return { ok: false, why: !a ? 'canvas missing or empty' : 'not in the lock' };
  if (a.size[0] !== b.size[0] || a.size[1] !== b.size[1]) return { ok: false, why: `canvas size ${a.size.join('×')} ≠ locked ${b.size.join('×')}` };
  const corr = (u, v) => {
    const mu = u.reduce((s, x) => s + x, 0) / u.length, mv = v.reduce((s, x) => s + x, 0) / v.length;
    let num = 0, du = 0, dv = 0;
    for (let i = 0; i < u.length; i++) { num += (u[i] - mu) * (v[i] - mv); du += (u[i] - mu) ** 2; dv += (v[i] - mv) ** 2; }
    return du && dv ? num / Math.sqrt(du * dv) : du === dv ? 1 : 0;
  };
  const layout = corr(a.layout, b.layout);
  let pal = 0; for (let i = 0; i < a.palette.length; i++) for (let k = 0; k < 3; k++) pal += Math.abs(a.palette[i][k] - b.palette[i][k]);
  pal /= a.palette.length * 3;
  const lit = Math.abs(a.lit - b.lit) / Math.max(0.005, b.lit);
  const ok = layout >= TOL.layout && pal <= TOL.palette && lit <= TOL.lit;
  return { ok, why: `layout ${layout.toFixed(3)} (≥ ${TOL.layout}) · palette Δ ${pal.toFixed(1)} (≤ ${TOL.palette}) · lit ${(a.lit * 100).toFixed(1)}% vs ${(b.lit * 100).toFixed(1)}% (±${TOL.lit * 100}%)` };
}

(async () => {
  const server = await serve(), origin = `http://127.0.0.1:${server.address().port}`, browser = await chromium.launch();
  const now = { pieces: {}, files: Object.fromEntries(FILES.map((f) => [f, sha(fs.readFileSync(path.join(ROOT, f)))])), faces: faces() };
  for (const p of PIECES) for (const view of Object.keys(VIEWS)) now.pieces[`${p.id}@${view}`] = await shoot(browser, origin, view, p);
  await browser.close(); server.close();

  if (UPDATE) {
    fs.writeFileSync(LOCK, JSON.stringify({
      note: 'Khoá ASCII art (D55). Đổi file này nghĩa là đổi art đã duyệt: PR cần chủ dự án duyệt, kèm ảnh trước và sau (art-check.cjs --shots).',
      updated: new Date().toISOString().slice(0, 10), tolerance: TOL, ...now,
    }, null, 1) + '\n');
    console.log(`lock written: ${Object.keys(now.pieces).length} pieces, ${FILES.length} files, faces`);
    return;
  }
  const lock = JSON.parse(fs.readFileSync(LOCK, 'utf8'));
  let bad = 0;
  console.log('Art lock (docs/19 §2 · D55)');
  for (const [k, fp] of Object.entries(now.pieces)) { const r = compare(fp, lock.pieces[k]); if (!r.ok) bad++; console.log(`  ${r.ok ? '✓' : '✕'} ${k.padEnd(22)} ${r.why}`); }
  for (const f of FILES) { const ok = lock.files[f] === now.files[f]; if (!ok) bad++; console.log(`  ${ok ? '✓' : '✕'} ${f}`); }
  { const ok = lock.faces === now.faces; if (!ok) bad++; console.log(`  ${ok ? '✓' : '✕'} mascot faces (NB.FACES)`); }
  if (bad) {
    console.log(`\n✕ ${bad} locked piece(s) changed. If the change is wanted, run with --update --shots art-report and ask the owner to approve the PR.`);
    process.exit(1);
  }
  console.log('\n✓ art unchanged');
})().catch((e) => { console.error(e); process.exit(1); });
