// Art lock: the ASCII art the owner has signed off must not drift while other work goes on (docs/19 §2, D55).
// For each locked piece it renders the built site, reads the canvas back as a coarse fingerprint (a 24×14 grid of mean
// colours plus the share of lit pixels) and compares it with design-system/art-lock.json. Coarse on purpose: the random
// noise glyphs of a converged frame and font anti-aliasing stay under the tolerance; a new palette, a moved composition,
// a missing scene or a different burst do not. The art's source images and the mascot's faces are compared by hash.
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
const TOL = { colour: 0.08, ink: 0.12 };   // colour change relative to how far the locked art stands out from its background · relative change of the lit share

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
    const GX = 24, GY = 14, d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, w = c.width, h = c.height;
    const sum = Array.from({ length: GX * GY }, () => [0, 0, 0, 0]);
    let lit = 0, n = 0;
    /* background = the darkest common colour: sample the corners */
    const bg = [0, 1, 2].map((k) => Math.min(d[k], d[(w - 1) * 4 + k], d[((h - 1) * w) * 4 + k], d[((h - 1) * w + w - 1) * 4 + k]));
    for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
      const o = (y * w + x) * 4, a = d[o + 3] / 255, r = d[o] * a, g = d[o + 1] * a, b = d[o + 2] * a;
      const cell = sum[Math.min(GY - 1, (y * GY / h) | 0) * GX + Math.min(GX - 1, (x * GX / w) | 0)];
      cell[0] += r; cell[1] += g; cell[2] += b; cell[3]++;
      if (Math.max(r - bg[0], g - bg[1], b - bg[2]) > 24) lit++;
      n++;
    }
    return { size: [w, h], bg, ink: +(lit / n).toFixed(4), grid: sum.map((s) => [0, 1, 2].map((k) => Math.round(s[k] / Math.max(1, s[3])))) };
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
  /* relative: a sparse logo on a dark stage counts as much as a full-screen city */
  let diff = 0, stand = 0;
  for (let i = 0; i < a.grid.length; i++) for (let k = 0; k < 3; k++) { diff += Math.abs(a.grid[i][k] - b.grid[i][k]); stand += Math.abs(b.grid[i][k] - b.bg[k]); }
  diff /= Math.max(1, stand);
  const inkRel = Math.abs(a.ink - b.ink) / Math.max(0.01, b.ink);
  const ok = diff <= TOL.colour && inkRel <= TOL.ink;
  return { ok, why: `colour Δ ${(diff * 100).toFixed(1)}% (≤ ${TOL.colour * 100}%) · lit ${(a.ink * 100).toFixed(1)}% vs ${(b.ink * 100).toFixed(1)}% (±${TOL.ink * 100}%)` };
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
