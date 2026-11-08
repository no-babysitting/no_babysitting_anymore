// Filmstrips of the built site, so a layout can be LOOKED at, not only measured.
// It scrolls a page (or one pinned scene) the way a reader does, takes a frame at every stop, and builds contact
// sheets (scripts/sheet.py) that show 8 frames side by side with the scroll position under each.
//
//   NB_BASE=/no_babysitting_anymore/ node scripts/shots.cjs --page c00/ --vp phone
//   node scripts/shots.cjs --page "" --vp phone --scene "#run" --steps 10     the 10 stops inside the pinned Run scene
//   node scripts/shots.cjs --page "" --vp phone --scene "#journey" --steps 12
//   node scripts/shots.cjs --page "" --vp phone --scene "#run" --steps 7 --mid 1    one frame in the middle of each of 7 steps
//   node scripts/shots.cjs --page c02/ --vp desktop --motion off              the static reading state
//
// options: --vp phone (390x844 @2x) | small (360x640) | tiny (320x640) | desktop (1440x900)
//          --step <screens between frames, default 0.8>   --max <frames, default 24>   --steps <stops inside --scene>
//          --mid 1 (with --scene: sample the middle of each of --steps equal parts instead of the borders, where two steps cross-fade)
//          --wait <ms to let the scrub settle, default 1000>   --toolbar <px: shrink the viewport after load, like iOS Safari's bars>
//          --out <dir, default type-report/shots>   --motion on|off (default on)
'use strict';
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process');
const { chromium } = require('playwright');
const { BASE, serve } = require('./serve-dist.cjs');

const VP = {
  phone: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  small: { viewport: { width: 360, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  tiny: { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
};
const a = { page: '', vp: 'phone', scene: null, step: 0.8, max: 24, steps: 8, mid: 0, wait: 1000, toolbar: 0, out: path.join(__dirname, '..', 'type-report', 'shots'), motion: 'on' };
for (let i = 2; i < process.argv.length; i++) {
  const k = process.argv[i].replace(/^--/, ''), v = process.argv[++i];
  if (!(k in a)) { console.error('unknown option --' + k); process.exit(2); }
  a[k] = typeof a[k] === 'number' ? +v : v;
}

(async () => {
  fs.rmSync(a.out, { recursive: true, force: true }); fs.mkdirSync(a.out, { recursive: true });
  const server = await serve(), origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const opt = { ...VP[a.vp] };
  const ctx = await browser.newContext({ ...opt, reducedMotion: a.motion === 'off' ? 'reduce' : 'no-preference' });
  await ctx.route(/goatcounter|gc\.zgo\.at/, (r) => r.abort());
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(origin + BASE + a.page, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  if (a.toolbar) await p.setViewportSize({ width: opt.viewport.width, height: opt.viewport.height - a.toolbar });
  const H = opt.viewport.height - a.toolbar;
  const go = (y) => p.evaluate((y) => (window.lenis ? window.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y)), y);

  let stops = [];
  if (a.scene) {
    const r = await p.evaluate((sel) => {
      const el = document.querySelector(sel); if (!el || !window.ScrollTrigger) return null;
      const t = window.ScrollTrigger.getAll().filter((s) => s.trigger === el || s.pin === el || (s.pin && s.pin.contains(el)) || (s.trigger && el.contains(s.trigger))).sort((a, b) => (b.end - b.start) - (a.end - a.start))[0];
      return t ? { start: t.start, end: t.end } : { start: el.getBoundingClientRect().top + scrollY, end: el.getBoundingClientRect().bottom + scrollY - innerHeight };
    }, a.scene);
    if (!r) { console.error('scene not found: ' + a.scene); process.exit(2); }
    stops.push(Math.max(0, r.start - H * 0.5));
    for (let i = 0; i < a.steps; i++) stops.push(a.mid ? r.start + ((r.end - r.start) * (i + 0.5)) / a.steps : r.start + ((r.end - r.start) * i) / Math.max(1, a.steps - 1));
    stops.push(r.end + H * 0.6);
  } else {
    const total = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total - H * 0.4 && stops.length < a.max; y += H * a.step) stops.push(y);
    stops.push(Math.max(0, total - H));
  }
  const frames = [];
  for (const y of stops) {
    await go(y); await p.waitForTimeout(a.wait);
    const real = await p.evaluate(() => Math.round(scrollY)), total = await p.evaluate(() => document.documentElement.scrollHeight);
    const f = `f-${String(frames.length).padStart(2, '0')}.png`;
    await p.screenshot({ path: path.join(a.out, f) });
    frames.push({ file: f, y: real, pct: Math.round((real / Math.max(1, total - H)) * 100) });
  }
  fs.writeFileSync(path.join(a.out, 'frames.json'), JSON.stringify({ page: '/' + a.page, vp: a.vp, scene: a.scene, motion: a.motion, frames, errors: errs }, null, 1));
  await browser.close(); server.close();
  const py = spawnSync('python3', [path.join(__dirname, 'sheet.py'), a.out], { stdio: 'inherit' });
  if (py.status) process.exit(py.status);
  console.log(`${frames.length} frames in ${path.relative(process.cwd(), a.out)}${errs.length ? ' · page errors: ' + errs.join(' | ') : ''}`);
})().catch((e) => { console.error(e); process.exit(1); });
