// Design lint for the built site: what an eye catches and a unit test does not (docs/09 §6 "taste rules").
// Every rule below is a comment the owner made on a real phone, turned into a measurement, so it cannot come back unnoticed.
//
//   overlap  two pieces of visible text print over each other (the hero's disclaimer and its cue at 320px; the next scene over the last)
//   clip     text cut off by the box that holds it (a pinned panel with overflow hidden; "03" cut in half)
//   gap      a band of the screen with nothing in it, more than 62% of the visible height (a question page that was 100svh of air)
//   tap      a control smaller than 40px on a phone (the checkpoints were not tappable at all)
//            (viewports: phone 390×844, se 375×667, tiny 320×640, desktop 1440×900)
//   align    the two columns of "hai lần tung đồng xu" must sit on the same rows
//   hold     a question or statement must hold still while it is read, not scroll past in one flick
//   demo     a simulation must wait until it is seen, start when it is, and take long enough to read
//   cta      the next-chapter button carries its block sweep and the current chapter's marker blinks, both only while motion is on
//
// Two passes: the page with motion off (deterministic layout, every viewport) and the pinned scenes with motion on, stopped in the
// middle of each step. usage (from site/): NB_BASE=/no_babysitting_anymore/ node scripts/design-check.cjs [--shots dir] [--only phone|se|tiny|desktop] [--sections 1,2,3]
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const { BASE, DIST, serve, htmlFiles } = require('./serve-dist.cjs');

const args = process.argv.slice(2), opt = (k) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : null; };
const SHOTS = opt('shots'), ONLY = opt('only'), SEC = (opt('sections') || '1,2,3').split(',');
if (SHOTS) { fs.rmSync(SHOTS, { recursive: true, force: true }); fs.mkdirSync(SHOTS, { recursive: true }); }

const VP = {
  phone: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  tiny: { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  se: { viewport: { width: 375, height: 667 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },   /* iPhone SE: the shortest common screen */
  desktop: { viewport: { width: 1440, height: 900 } },
};
const PAGES = { phone: ['', '00/', '01/', '04/', 'thuc-hanh/', 'c02/', 'library/'], tiny: ['', '01/', 'thuc-hanh/', 'library/'], se: ['', '00/'], desktop: ['', '00/', '01/'] };
const PARTS = ['00/', '01/', '02/', '03/', '04/']; /* the main path (docs/14): rules gold and hold-count of docs/15 §9 */
/* [selector, stops, where]: 'mid' = the middle of each step; the journey snaps to its panels, so it is read at the snap points (k/4) */
const SCENES = [['#run', 7, 'mid'], ['#journey', 5, 'snap'], ['#finale', 3, 'mid']];

const fails = [], notes = [];
const fail = (m) => { fails.push(m); console.log('  ✕ ' + m); }, note = (m) => { notes.push(m); console.log('  · ' + m); };

/* ---- runs inside the page: every finding is {rule, msg, level} ---- */
function lint(o) {
  const out = [], vw = innerWidth, vh = innerHeight, hud = o.hud, clean = (t) => t.replace(/\s+/g, ' ').trim().slice(0, 28);
  const eff = (el) => { let v = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return 0; v *= +cs.opacity; if (v < 0.05) return 0; } return v; };
  const SKIP = '.nb-ghost, .nb-sr, script, style, noscript, [hidden], [inert], svg, canvas, .nb-sweep';
  const boxes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = walker.nextNode());) {
    const t = clean(n.nodeValue); if (t.length < 2) continue;
    const el = n.parentElement; if (!el || el.closest(SKIP)) continue;
    const dt = el.closest('details'); if (dt && !dt.open && !el.closest('summary')) continue;              /* the folded part of a <details> has no box on screen */
    if (el.checkVisibility && !el.checkVisibility({ checkVisibilityCSS: true, contentVisibilityAuto: true })) continue;
    const op = eff(el); if (op < 0.3) continue;
    const rg = document.createRange(); rg.selectNodeContents(n);
    const lh = parseFloat(getComputedStyle(el).lineHeight);
    for (const q of rg.getClientRects()) {
      /* a display numeral set with line-height < 1 has a font box taller than its line: measure the line, which is where the ink is */
      const d = isFinite(lh) && lh < q.height ? (q.height - lh) / 2 : 0, r = { left: q.left, right: q.right, top: q.top + d, bottom: q.bottom - d, width: q.width, height: q.height - 2 * d };
      if (r.width < 2 || r.height < 4 || r.right <= 0 || r.left >= vw || r.bottom <= 0 || r.top >= vh) continue;
      boxes.push({ el, r, t, op, deco: !!el.closest('[aria-hidden="true"]'), split: !!el.closest('.nb-split'), hud: !!el.closest('.hud') });
    }
  }
  /* overlap: settled, meaningful text only (a decorative numeral under a title is meant to overlap; a cross-fade is not a finding) */
  if (o.rules.includes('overlap')) {
    const live = boxes.filter((b) => !b.deco && !b.split && b.op >= 0.9 && (b.hud || b.r.top >= hud - 1));
    const seen = new Set();
    for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) {
      const a = live[i], b = live[j];
      if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el) || a.hud !== b.hud) continue;
      const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left), h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (w > 3 && h > 4) { const k = a.t + '|' + b.t; if (!seen.has(k)) { seen.add(k); out.push({ rule: 'overlap', msg: `"${a.t}" prints over "${b.t}" (${Math.round(w)}×${Math.round(h)}px)` }); } }
    }
  }
  /* clip: part of the text is inside a box that hides overflow and part is outside it */
  if (o.rules.includes('clip')) {
    const seen = new Set();
    for (const b of boxes) {
      if (b.deco || b.split || b.el.closest('.panel:not(.is-active)')) continue;       /* the next panel of the journey peeks in dimmed, on purpose */
      for (let e = b.el; e && e !== document.body && e !== document.documentElement; e = e.parentElement) {
        const cs = getComputedStyle(e), ov = cs.overflowX + ' ' + cs.overflowY;
        if (/(auto|scroll)/.test(ov)) break;                      /* a scroller (the chip row) shows a peek of what is beyond on purpose */
        if (!/(hidden|clip)/.test(ov) || cs.textOverflow === 'ellipsis' || e.matches('.nb-sr')) continue;
        if (o.within && !e.closest(o.within)) continue;
        const er = e.getBoundingClientRect(), r = b.r, tol = 2, cx = /(hidden|clip)/.test(cs.overflowX), cy = /(hidden|clip)/.test(cs.overflowY);   /* only the axis that is clipped */
        const inter = Math.min(r.right, er.right) - Math.max(r.left, er.left) > 1 && Math.min(r.bottom, er.bottom) - Math.max(r.top, er.top) > 1;
        const out_ = (cx && (r.right > er.right + tol || r.left < er.left - tol)) || (cy && (r.bottom > er.bottom + tol || r.top < er.top - tol));
        if (inter && out_) { const k = b.t; if (!seen.has(k)) { seen.add(k); out.push({ rule: 'clip', msg: `"${b.t}" is cut by <${e.tagName.toLowerCase()}${e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : ''}>` }); } break; }
      }
    }
  }
  /* gap: the largest band between the header and the bottom of the screen that has nothing in it */
  if (o.rules.includes('gap')) {
    const iv = boxes.map((b) => [Math.max(hud, b.r.top), Math.min(vh, b.r.bottom)]);
    document.querySelectorAll('canvas, img, video, iframe, button, input:not([type=radio]):not([type=checkbox]), textarea').forEach((e) => {
      if (e.closest('[hidden], [inert], .hud, .menu') || eff(e) < 0.3) return;
      const r = e.getBoundingClientRect(); if (r.width < 24 || r.height < 12 || r.bottom <= hud || r.top >= vh) return; iv.push([Math.max(hud, r.top), Math.min(vh, r.bottom)]);
    });
    iv.sort((a, b) => a[0] - b[0]);
    let cur = hud, best = 0; for (const [a, b] of iv) { if (a > cur) best = Math.max(best, a - cur); cur = Math.max(cur, b); } best = Math.max(best, vh - cur);
    const share = best / (vh - hud);
    if (share > 0.45) out.push({ rule: 'gap', msg: `${Math.round(share * 100)}% of the screen height is empty`, level: share > 0.62 ? 'fail' : 'note' });
  }
  /* tap: controls on a phone */
  if (o.rules.includes('tap')) {
    const seen = new Set();
    document.querySelectorAll('button, summary, .nb-btn, [role=button], [role=tab], label.chip, a').forEach((e) => {
      if (e.closest('[hidden], [inert], .skip, .nb-sr') || e.matches('.skip, .nb-sr')) return;
      if (e.tagName === 'A' && getComputedStyle(e).display === 'inline') return;      /* a link inside a sentence */
      if (eff(e) < 0.3) return;
      const r = e.getBoundingClientRect(); if (r.width < 1 || r.bottom <= 0 || r.top >= vh) return;
      if (r.width < 40 || r.height < 40) { const k = clean(e.textContent || e.getAttribute('aria-label') || e.className); if (!seen.has(k)) { seen.add(k); out.push({ rule: 'tap', msg: `"${k}" is ${Math.round(r.width)}×${Math.round(r.height)}px` }); } }
    });
  }
  return out;
}

async function openPage(browser, name, ctxOpt, page, extra = {}) {
  const ctx = await browser.newContext({ ...VP[name], ...ctxOpt });
  await ctx.route(/goatcounter|gc\.zgo\.at/, (r) => r.abort());
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(extra.origin + BASE + page, { waitUntil: 'networkidle' }); await p.waitForTimeout(extra.settle || 1200);
  return { ctx, p, errs };
}
const scrollTo = (p, y) => p.evaluate((y) => (window.lenis ? window.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y)), y);
const hudOf = (p) => p.evaluate(() => { const h = document.querySelector('.hud'); return h ? h.getBoundingClientRect().height : 56; });
async function report(p, tag, found, snap) {
  let shot = false;
  for (const f of found) {
    const msg = `${tag}: ${f.rule} · ${f.msg}`;
    if (f.level === 'note') note(msg); else fail(msg);
    if (SHOTS && !shot && f.level !== 'note') { shot = true; await p.screenshot({ path: path.join(SHOTS, snap.replace(/[^\w.-]+/g, '_') + '.png') }); }
  }
}

(async () => {
  if (!fs.existsSync(DIST)) { console.error('no dist/: run the build first'); process.exit(1); }
  const server = await serve(), origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  const names = Object.keys(VP).filter((n) => !ONLY || n === ONLY);

  console.log('1 · pages with motion off: overlap, clip, gap, tap (phones), align');
  if (SEC.includes('1')) for (const name of names) {
    for (const pg of PAGES[name]) {
      const { ctx, p, errs } = await openPage(browser, name, { reducedMotion: 'reduce' }, pg, { origin });
      const hud = await hudOf(p), H = VP[name].viewport.height, total = await p.evaluate(() => document.documentElement.scrollHeight);
      const rules = ['overlap', 'clip', 'gap'].concat(name === 'desktop' ? [] : ['tap']);
      let stops = 0;
      for (let y = 0; y < total - H * 0.2; y += H * 0.9) {
        await scrollTo(p, y); await p.waitForTimeout(120); stops++;
        await report(p, `${name} /${pg} y=${Math.round(y)}`, await p.evaluate(lint, { hud, rules }), `static-${name}-${pg || 'home'}-${Math.round(y)}`);
      }
      if (pg === '' && name === 'desktop') {
        /* the three branches of the pyramid share their rows: label, sentence and links line up across the columns (docs/15 §8) */
        const bad = await p.evaluate(() => {
          const cols = [...document.querySelectorAll('#pyramid .three > div')]; if (cols.length !== 3) return ['no #pyramid .three with three branches'];
          const out = [];
          for (let k = 0; k < cols[0].children.length; k++) {
            const tops = cols.map((c) => c.children[k].getBoundingClientRect().top);
            if (Math.max(...tops) - Math.min(...tops) > 1.5) out.push(`row ${k + 1} differs by ${Math.round(Math.max(...tops) - Math.min(...tops))}px`);
          }
          return out;
        });
        bad.forEach((m) => fail(`${name} /: align · the three branches: ${m}`));
      }
      if (errs.length) fail(`${name} /${pg}: page errors ${errs.join(' | ')}`);
      await ctx.close();
      note(`${name} /${pg}: ${stops} stops`);
    }
  }

  console.log('2 · pinned scenes with motion on, stopped in the middle of each step: overlap, clip');
  if (SEC.includes('2')) for (const name of names) {
    const { ctx, p, errs } = await openPage(browser, name, {}, '', { origin, settle: 2000 });
    const hud = await hudOf(p), H = VP[name].viewport.height;
    for (const [sel, n, where] of SCENES) {
      const r = await p.evaluate((sel) => {
        const el = document.querySelector(sel), ST = window.ScrollTrigger; if (!el || !ST) return null;
        /* the scene's own trigger is the longest one that belongs to it (small reveals inside it start at its top too) */
        const mine = ST.getAll().filter((s) => s.trigger === el || s.pin === el || (s.pin && s.pin.contains(el)) || (s.trigger && el.contains(s.trigger)));
        const t = mine.sort((a, b) => (b.end - b.start) - (a.end - a.start))[0];
        return t ? { start: t.start, end: t.end } : null;
      }, sel);
      if (!r) { fail(`${name} ${sel}: no pinned scene found`); continue; }
      for (let i = 0; i < n; i++) {
        const y = r.start + (r.end - r.start) * (where === 'snap' ? i / (n - 1) : (i + 0.5) / n);
        await scrollTo(p, y); await p.waitForTimeout(1500);
        await report(p, `${name} ${sel} step ${i + 1}/${n}`, await p.evaluate(lint, { hud, rules: ['overlap', 'clip'], within: sel === '#journey' ? '#journey' : null }), `scene-${name}-${sel.slice(1)}-${i + 1}`);
      }
    }
    if (errs.length) fail(`${name} scenes: page errors ${errs.join(' | ')}`);
    await ctx.close(); note(`${name}: ${SCENES.map(([s, n]) => `${s} ×${n}`).join(', ')}`);
  }

  console.log('3 · holds, demos and the call to action (motion on, phone)');
  if (SEC.includes('3') && names.includes('phone')) {
    for (const pg of ['', '00/', '01/', 'c02/']) {
      const { ctx, p } = await openPage(browser, 'phone', {}, pg, { origin });
      const bad = await p.evaluate(() => [...document.querySelectorAll('[data-ask], [data-reveal="fill"]')].filter((e) => !e.closest('[data-held]')).map((e) => (e.textContent || '').trim().slice(0, 30)));
      bad.forEach((t) => fail(`phone /${pg}: hold · "${t}" is not held while it is read (data-hold missing, or the block is taller than the screen)`));
      await ctx.close();
    }
    for (const pg of PARTS) {
      const { ctx, p } = await openPage(browser, 'phone', { reducedMotion: 'reduce' }, pg, { origin });
      const r = await p.evaluate(() => ({ gold: document.querySelectorAll('[data-gold]').length, hold: document.querySelectorAll('[data-hold]').length }));
      if (r.gold > 5) fail(`phone /${pg}: gold · ${r.gold} golden words, at most 5 per part`);
      if (r.hold !== 3) fail(`phone /${pg}: hold-count · ${r.hold} holds, a part has exactly 3 (hook, main Then → Now, closing line)`);
      await ctx.close();
    }
    /* the design-system demos lived on the v3 skeleton pages (c00, c10), which are now short stubs (docs/14 §9); the demo rule returns with the page that shows one */
    for (const [pg, sel] of []) {
      const { ctx, p } = await openPage(browser, 'phone', {}, pg, { origin });
      const dom = (s) => p.evaluate((s) => { const e = document.querySelector(s + ' [data-demo]'); return e ? e.dataset.demo : null; }, sel);
      const before = await dom(sel);
      if (before !== 'idle') fail(`phone /${pg} ${sel}: demo · has already started before anyone saw it (state "${before}")`);
      const y = await p.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY, sel);
      await scrollTo(p, Math.max(0, y - 140));
      let t0 = null, t1 = null; const t = Date.now();
      while (Date.now() - t < 40000) {
        const st = await dom(sel);
        if (st === 'playing' && t0 === null) t0 = Date.now();
        if (st === 'done') { t1 = Date.now(); break; }
        await p.waitForTimeout(100);
      }
      if (t0 === null) fail(`phone /${pg} ${sel}: demo · did not start when it came on screen`);
      else if (t1 === null) fail(`phone /${pg} ${sel}: demo · did not finish within 40 s`);
      else { const s = (t1 - t0) / 1000; if (s < 4) fail(`phone /${pg} ${sel}: demo · plays in ${s.toFixed(1)}s, too fast to read (min 4 s)`); else note(`${sel}: starts when seen, plays ${s.toFixed(1)}s`); }
      await ctx.close();
    }
    {
      const { ctx, p } = await openPage(browser, 'phone', {}, '01/', { origin });
      const r = await p.evaluate(() => ({ sweep: !!document.querySelector('.cn .nx canvas.nb-sweep'), blink: getComputedStyle(document.querySelector('.cn .rail a[aria-current="step"] .g')).animationName }));
      if (!r.sweep) fail('phone /01/: cta · the next-part button has no block sweep');
      if (r.blink !== 'nb-blink') fail('phone /01/: cta · the current part marker does not blink');
      await ctx.close();
      const q = await openPage(browser, 'phone', { reducedMotion: 'reduce' }, '01/', { origin });
      const r2 = await q.p.evaluate(() => ({ sweep: !!document.querySelector('.cn .nx canvas.nb-sweep'), blink: getComputedStyle(document.querySelector('.cn .rail a[aria-current="step"] .g')).animationName }));
      if (r2.sweep || r2.blink !== 'none') fail('phone /01/ (motion off): cta · the sweep or the blink still runs');
      await q.ctx.close();
    }
  }

  await browser.close(); server.close();
  console.log(fails.length ? `\n✕ ${fails.length} design finding(s)` : `\n✓ design lint passed${notes.length ? '' : ''}`);
  process.exit(fails.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
