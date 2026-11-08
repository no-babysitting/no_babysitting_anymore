// Typography check of the rendered site. Rules and thresholds: design-system/type-rules.json.
// What each rule means and where it comes from: docs/11-typography.md. Same script locally and in CI.
//
// It opens every page the way a reader does (web fonts loaded, reduced motion so each text sits in its final
// state), at desktop 1440 and phone 390, and measures what the browser actually drew:
//   pixels  · contrast of each line against the pixels behind it (text made transparent, then screenshotted)
//   glyphs  · Vietnamese stacked marks colliding between lines or cut off by overflow; glyphs missing from the
//             brand font (the DevTools protocol reports which platform font drew each text node)
//   WCAG    · 1.4.12 text-spacing override (nothing clipped or overlapping) · 1.4.4 zoom to 200% (F94)
//   craft   · leading, measure, caps tracking, fake italic/bold, orphans, justify, light weights, headings,
//             the design system's type roles, font loading
// A rule whose severity is "error" fails the run (exit 1). "warn" only reports.
//
// usage (from site/):
//   NB_BASE=/no_babysitting_anymore/ node scripts/type-check.cjs     every page in dist/ (build first)
//   node scripts/type-check.cjs --url https://example.com/           any live page, repeatable; DS rules off
//   --pages ,c02/   --only desktop|phone   --out <dir>   --rules <file>   --ds (keep DS rules with --url)
//   node scripts/type-check.cjs --selftest    runs the checker on scripts/fixtures: the bad page must trip every
//                                             rule listed in EXPECT_BAD, the good page must trip none
'use strict';
const fs = require('fs'), path = require('path'), zlib = require('zlib'), http = require('http');
const { chromium } = require('playwright');
const { BASE, DIST, serve, htmlFiles } = require('./serve-dist.cjs');

/* id → [what it checks, where the rule comes from]; thresholds live in the rules file */
const RULES = {
  contrast: ['Tương phản chữ/nền, đo trên điểm ảnh', 'WCAG 2.2 · 1.4.3'],
  'min-size': ['Cỡ chữ tối thiểu', 'DS · SOURCE-OF-TRUTH §2 · Apple HIG'],
  collision: ['Dấu chồng chạm chữ ở dòng kề', 'DS · Chữ/Tiếng Việt'],
  'ink-clip': ['Dấu bị overflow cắt', 'DS · Chữ/Tiếng Việt'],
  'glyph-fallback': ['Chữ cái rơi về font khác', 'web.dev · font best practices'],
  'text-spacing': ['Giãn chữ theo WCAG không làm mất/chồng chữ', 'WCAG 2.2 · 1.4.12 (F104)'],
  zoom: ['Phóng to đạt 200%', 'WCAG 2.2 · 1.4.4 (F94)'],
  'symbol-fallback': ['Ký hiệu không có trong font', 'DS · Chữ'],
  'text-size-setting': ['Theo cỡ chữ người đọc đặt trong trình duyệt', 'WCAG 1.4.4 · Apple HIG (Dynamic Type)'],
  leading: ['Khoảng dòng của đoạn ≥ 3 dòng', 'WCAG 1.4.8 · Apple HIG'],
  'display-leading': ['Khoảng dòng của chữ lớn có dấu', 'DS · Chữ/Tiếng Việt'],
  measure: ['Độ dài dòng', 'WCAG 1.4.8 · Bringhurst · Butterick'],
  'caps-tracking': ['Chữ hoa cỡ nhỏ cần giãn', 'DS · Butterick'],
  'caps-vi': ['Tiếng Việt viết hoa bằng CSS', 'DS · Chữ'],
  'faux-style': ['Nghiêng/đậm giả', 'MDN · font-synthesis'],
  orphan: ['Tiêu đề có chữ mồ côi ở dòng cuối', 'MDN · text-wrap'],
  justify: ['Căn đều hai bên', 'WCAG 1.4.8 · Butterick'],
  'light-weight': ['Nét mảnh ở cỡ nhỏ', 'Apple HIG'],
  headings: ['Cấu trúc heading', 'WAI Tutorials · Headings'],
  role: ['Cỡ/độ đậm ngoài vai chữ của DS', 'DS · SOURCE-OF-TRUTH §2'],
  'font-family': ['Họ font ngoài DS', 'DS · Apple HIG'],
  'font-load': ['Nạp font', 'web.dev · font best practices'],
  'stray-markup': ['Dấu markdown lộ ra chữ', 'Dự án (lỗi hiển thị)'],
  punctuation: ['Dấu nháy thẳng, ba dấu chấm, hai gạch nối', 'Butterick · curly quotes, ellipses'],
};
const SPACING_CSS = '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}';

const args = { url: [], pages: null, only: null, ds: false, selftest: false, out: path.join(__dirname, '..', 'type-report'), rules: path.join(__dirname, '..', '..', 'design-system', 'type-rules.json') };
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i], v = () => process.argv[++i];
  if (a === '--url') args.url.push(v()); else if (a === '--pages') args.pages = v().split(',');
  else if (a === '--only') args.only = v(); else if (a === '--out') args.out = path.resolve(v());
  else if (a === '--rules') args.rules = path.resolve(v()); else if (a === '--ds') args.ds = true; else if (a === '--selftest') args.selftest = true;
  else { console.error(`unknown option ${a}`); process.exit(2); }
}

/* ───────────── in the page: collect every text run, check what needs layout or fonts ───────────── */

function analyze(cfg) {
  const T = cfg.t, F = [];
  const VI = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i, LET = /\p{L}/gu;
  const f2 = (x, d = 2) => String(+x.toFixed(d)).replace('.', ',');
  const push = (rule, r, msg, fix) => F.push({ rule, sel: r.sel, text: r.text, msg, fix, except: r.except || [] });
  const cv = document.createElement('canvas').getContext('2d');
  const ST = [[50, 'ultra-condensed'], [62.5, 'extra-condensed'], [75, 'condensed'], [87.5, 'semi-condensed'], [100, 'normal'], [112.5, 'semi-expanded'], [125, 'expanded'], [150, 'extra-expanded'], [200, 'ultra-expanded']];
  const fontOf = (cs) => `${/^(italic|oblique)/.test(cs.fontStyle) ? 'italic' : 'normal'} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  const cache = new Map();
  const ink = (cs, s) => { /* [ink ascent, ink descent, font ascent] in px; the text box's top + font ascent = baseline */
    const st = parseFloat(cs.fontStretch) || 100, k = `${fontOf(cs)}|${st}|${s}`;
    let m = cache.get(k);
    if (!m) {
      cv.font = fontOf(cs); cv.fontStretch = ST.reduce((a, b) => (Math.abs(b[0] - st) < Math.abs(a[0] - st) ? b : a))[1];
      const t = cv.measureText(s); m = [t.actualBoundingBoxAscent, t.actualBoundingBoxDescent, t.fontBoundingBoxAscent]; cache.set(k, m);
    }
    return m;
  };
  const xform = (s, cs, lang) => cs.textTransform === 'uppercase' ? s.toLocaleUpperCase(lang) : cs.textTransform === 'lowercase' ? s.toLocaleLowerCase(lang)
    : cs.textTransform === 'capitalize' ? s.replace(/(^|\s)(\p{L})/gu, (m, a, b) => a + b.toLocaleUpperCase(lang)) : s;
  const selOf = (e) => {
    const parts = [];
    for (let a = e; a && a !== document.body && parts.length < 3; a = a.parentElement) {
      if (a.id) { parts.unshift(`${a.tagName.toLowerCase()}#${a.id}`); break; }
      const cl = [...a.classList].filter((c) => !/^astro-/.test(c)).slice(0, 2);
      parts.unshift(a.tagName.toLowerCase() + (cl.length ? '.' + cl.join('.') : ''));
    }
    return parts.join(' > ');
  };
  const rectsOf = (nodes) => nodes.flatMap((n) => { const g = document.createRange(); g.selectNodeContents(n); return [...g.getClientRects()].filter((q) => q.width > 0.5 && q.height > 0.5); });
  const hidden = (e) => { /* not drawn, or visually hidden for screen readers (.nb-sr) */
    if (getComputedStyle(e).visibility !== 'visible' || (e.checkVisibility && !e.checkVisibility())) return true;
    for (let a = e; a && a !== document.documentElement; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.display === 'none') return true;
      if (/inset\(\s*50%/.test(cs.clipPath) || /rect\(\s*0(px)?[\s,]+0(px)?[\s,]+0(px)?[\s,]+0(px)?\s*\)/.test(cs.clip)) return true;
      if (cs.overflow !== 'visible' && a.offsetWidth <= 2 && a.offsetHeight <= 2) return true;
    }
    return false;
  };

  /* a reader can open every disclosure, so its text is measured open */
  for (const d of document.querySelectorAll('details:not([open])')) d.open = true;

  /* runs: an element and its own text nodes (one font, one color) */
  const own = new Map(), tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = tw.nextNode(); n; n = tw.nextNode()) {
    const e = n.parentElement;
    if (!/\S/.test(n.textContent) || !e || e.closest('script,style,noscript,template,svg,canvas,textarea,select,[hidden]')) continue;
    if (!own.has(e)) own.set(e, []);
    own.get(e).push(n);
  }
  const decorSel = (cfg.decor || []).join(','), runs = [], css = new Map();
  for (const e of document.body.querySelectorAll('*')) {
    const nodes = own.get(e);
    if (!nodes || hidden(e) || !rectsOf(nodes).length) continue;
    const cs = getComputedStyle(e), text = nodes.map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim();
    const lang = ((e.closest('[lang]') || document.documentElement).getAttribute('lang') || 'vi').split('-')[0] || 'vi';
    const shown = xform(text, cs, lang), letters = (shown.match(LET) || []).join(''), size = parseFloat(cs.fontSize);
    let pos = '';
    for (let a = e; a && !pos; a = a.parentElement) { const p = getComputedStyle(a).position; if (p === 'fixed' || p === 'sticky') pos = p; }
    const r = {
      id: runs.length, el: e, nodes, sel: selOf(e), text: text.slice(0, 72), shown, lang, letters, size, pos, inert: !!e.closest('[inert]'),
      decor: !!(decorSel && e.closest(decorSel)) || (!!e.closest('[aria-hidden="true"]') && !letters),
      fam: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(), weight: +cs.fontWeight || 400,
      italic: /^(italic|oblique)/.test(cs.fontStyle), stretch: parseFloat(cs.fontStretch) || 100,
      ls: cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing) / size,
      except: (cfg.exceptions || []).filter((x) => { try { return !!e.closest(x.selector); } catch (er) { return false; } }).map((x) => x.rule),
    };
    e.setAttribute('data-tc', r.id);
    css.set(e, cs);
    runs.push(r);
  }

  /* blocks: runs that share one flow of line boxes (the nearest non-inline ancestor) */
  const blockOf = (e) => { for (let a = e; a; a = a.parentElement) { const d = getComputedStyle(a).display; if (d !== 'inline' && d !== 'contents') return a; } return document.body; };
  const byBlock = new Map();
  for (const r of runs) { r.block = blockOf(r.el); if (!byBlock.has(r.block)) byBlock.set(r.block, []); byBlock.get(r.block).push(r); }

  /* run rules: size, weight, caps (caps tracking only for labels set in caps, not an acronym inside a sentence) */
  for (const r of runs) {
    if (r.decor) continue;
    const L = r.letters.length, isCaps = (s) => s === s.toLocaleUpperCase(r.lang) && s !== s.toLocaleLowerCase(r.lang);
    if (L && r.size < T.minSize - 0.01) push('min-size', r, `${f2(r.size)}px, dưới ${T.minSize}px`, `tăng lên ≥ ${T.minSize}px`);
    if (L && r.weight < T.lightWeight && r.size < 24) push('light-weight', r, `độ đậm ${r.weight} ở ${f2(r.size)}px`, `dùng ≥ ${T.lightWeight} cho chữ dưới 24px`);
    const label = isCaps(byBlock.get(r.block).map((x) => x.letters).join(''));
    if (L >= 3 && label && isCaps(r.letters) && r.size <= T.caps.maxPx && r.ls < T.caps.tracking - 0.001) push('caps-tracking', r, `chữ hoa ${f2(r.size)}px, giãn ${f2(r.ls, 3)}em`, `giãn ≥ ${T.caps.tracking}em`);
    if (css.get(r.el).textTransform === 'uppercase' && VI.test(r.text)) push('caps-vi', r, 'tiếng Việt có dấu viết hoa bằng text-transform', 'viết thường; chữ hoa để cho tiếng Anh, mã và số');
    if (L && !r.el.closest('code,pre,kbd,samp') && /(^|[\s(])\*{1,2}[^*\s][^*]*\*{1,2}($|[\s).,;:?!])|`[^`]+`|^#{1,6}\s|\]\(/.test(r.shown)) push('stray-markup', r, 'dấu markdown (* ` # ]() hiện nguyên ra chữ', 'render markdown trước khi in (site/src/lib/matrix.ts: inline()) hoặc bỏ dấu');
  }
  /* prose punctuation, counted once per page; code and mono runs are left alone */
  const pun = { q: 0, d: 0, qx: '', dx: '' };
  for (const r of runs) {
    if (r.decor || !r.letters || r.el.closest('code,pre,kbd,samp') || /mono|consolas|menlo|courier/i.test(r.fam)) continue;
    const t = r.nodes.map((n) => n.textContent).join(''), q = (t.match(/["']/g) || []).length, d = (t.match(/\.\.\.|\s--\s|\w--\w/g) || []).length; /* a CLI flag (--model) is not a typed dash */
    if (q) { pun.q += q; pun.qx = pun.qx || r.text; }
    if (d) { pun.d += d; pun.dx = pun.dx || r.text; }
  }
  if (pun.q) push('punctuation', { sel: 'body', text: pun.qx, except: [] }, 'dấu nháy thẳng " \' trong văn xuôi', 'dùng “ ” và ‘ ’ (render kiểu SmartyPants cho nội dung)');
  if (pun.d) push('punctuation', { sel: 'body', text: pun.dx, except: [] }, 'ba dấu chấm hoặc hai gạch nối trong văn xuôi', 'dùng … và –');

  /* fonts: DS families and roles, faces actually loaded (fake italic/bold) */
  const faces = [...document.fonts].map((f) => ({ family: f.family.replace(/["']/g, ''), style: f.style, weight: String(f.weight), status: f.status, display: f.display }));
  const inW = (w, f) => { const [a, b = a] = f.weight.split(/\s+/).map(Number); return w >= a && w <= b; };
  const agg = (m, k, r) => { const g = m.get(k); if (g) g.n++; else m.set(k, { r, n: 1 }); };
  const famMiss = new Map(), roleMiss = new Map(), faux = new Map();
  for (const r of runs) {
    if (r.decor || !r.letters) continue;
    if (cfg.allowed && !cfg.allowed.includes(r.fam)) agg(famMiss, r.fam, r);
    const roles = (cfg.roles || []).filter((x) => x.family === r.fam);
    if (roles.length && !roles.some((x) => r.size >= x.min - 0.5 && r.size <= x.max + 0.5 && (!x.weights || x.weights.includes(r.weight)) && (!x.stretch || Math.abs(r.stretch - x.stretch) < 1)))
      agg(roleMiss, `${r.fam}${r.stretch !== 100 ? ` ${r.stretch}%` : ''} ${f2(r.size)}px/${r.weight}`, r);
    const fs = faces.filter((f) => f.family === r.fam);
    if (!fs.length) continue;
    if (r.italic && !fs.some((f) => f.style !== 'normal')) agg(faux, `${r.fam} nghiêng: không nạp mặt chữ nghiêng nào, trình duyệt tự xiên chữ đứng`, r);
    else if (!fs.some((f) => inW(r.weight, f))) agg(faux, `${r.fam} ${r.weight}: chỉ nạp ${[...new Set(fs.map((f) => f.weight))].join(', ')}, trình duyệt thay bằng mặt gần nhất hoặc tự làm đậm`, r);
  }
  for (const [k, g] of famMiss) push('font-family', g.r, `${k} không thuộc DS (${g.n} chỗ)`, `dùng một trong: ${cfg.allowed.join(', ')}`);
  for (const [k, g] of roleMiss) push('role', g.r, `${k} không thuộc vai chữ nào của DS (${g.n} chỗ)`, 'đưa về một vai trong SOURCE-OF-TRUTH §2, hoặc thêm vai đó vào DS');
  for (const [k, g] of faux) push('faux-style', g.r, `${k} (${g.n} chỗ)`, 'nạp đúng mặt chữ (Google Fonts: ital,wght@…) hoặc bỏ kiểu đó');
  const head = { sel: 'head', text: '', except: [] };
  if (document.querySelector('link[href*="fonts.googleapis.com"]') && !document.querySelector('link[rel~="preconnect"][href*="fonts.gstatic.com"]'))
    push('font-load', head, 'dùng Google Fonts nhưng chưa preconnect tới fonts.gstatic.com', '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
  const blocking = [...new Set(faces.filter((f) => !['swap', 'optional', 'fallback'].includes(f.display)).map((f) => `${f.family} (${f.display})`))];
  if (blocking.length) push('font-load', head, `font-display có thể giấu chữ khi font chậm: ${blocking.join(', ')}`, 'font-display: swap hoặc optional');

  /* headings: one h1, no skipped level, none empty (screen-reader-only headings count) */
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]')].map((h) => ({ level: +(h.getAttribute('aria-level') || h.tagName[1]) || 2, sel: selOf(h), text: h.textContent.replace(/\s+/g, ' ').trim().slice(0, 72), except: [] }));
  const h1 = hs.filter((h) => h.level === 1);
  if (h1.length !== 1) push('headings', { sel: 'h1', text: h1.map((h) => h.text).join(' | '), except: [] }, `trang có ${h1.length} h1`, 'mỗi trang đúng một h1');
  hs.forEach((h, i) => {
    if (!h.text) push('headings', h, 'heading rỗng', 'thêm chữ hoặc bỏ thẻ heading');
    if (i && h.level > hs[i - 1].level + 1) push('headings', h, `nhảy từ h${hs[i - 1].level} xuống h${h.level}`, `dùng h${hs[i - 1].level + 1}`);
  });

  /* block rules: lines found from each word's baseline */
  const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' }), blocks = [];
  const box = (x) => ({ left: x.left, right: x.right, top: x.top, bottom: x.bottom });
  const pieces = (n, start, str) => {
    const g = document.createRange(); g.setStart(n, start); g.setEnd(n, start + str.length);
    const q = [...g.getClientRects()].filter((x) => x.width > 0.5 && x.height > 0.5);
    if (q.length <= 1) return q.length ? [{ i: start, s: str, q: box(q[0]) }] : [];
    const out = []; let cur = null;
    for (const { segment, index } of seg.segment(str)) {
      const c = document.createRange(); c.setStart(n, start + index); c.setEnd(n, start + index + segment.length);
      const r = c.getClientRects()[0];
      if (!r || r.width < 0.5) { if (cur) cur.s += segment; continue; }
      if (cur && Math.abs(r.top - cur.q.top) < 2) { cur.s += segment; cur.q.right = r.right; }
      else { cur = { i: start + index, s: segment, q: box(r) }; out.push(cur); }
    }
    return out;
  };
  for (const [b, rs] of byBlock) {
    const decor = rs.every((r) => r.decor);
    blocks.push({ el: b, runs: rs.map((r) => r.id), decor });
    if (decor) continue;
    const bcs = getComputedStyle(b), bsize = parseFloat(bcs.fontSize), words = [];
    for (const r of rs) for (const n of r.nodes) {
      const cs = css.get(r.el), re = /\S+/g;
      for (let m = re.exec(n.textContent); m; m = re.exec(n.textContent)) {
        for (const p of pieces(n, m.index, m[0])) { /* a long word can wrap at "-" or "/": one piece per line */
          const [asc, desc, fa] = ink(cs, xform(p.s, cs, r.lang));
          words.push({ r, n, i: p.i, s: p.s, cs, x0: p.q.left, x1: p.q.right, top: p.q.top, bottom: p.q.bottom, base: p.q.top + fa, asc, desc });
        }
      }
    }
    if (!words.length) continue;
    words.sort((a, c) => a.base - c.base || a.x0 - c.x0);
    const lines = [];
    for (const w of words) { const L = lines[lines.length - 1]; if (L && w.base - L.base < bsize * 0.45) L.ws.push(w); else lines.push({ base: w.base, ws: [w] }); }
    for (const L of lines) {
      L.ws.sort((a, c) => a.x0 - c.x0);
      L.chars = L.ws.reduce((a, w) => a + [...seg.segment(w.s)].length, 0) + L.ws.length - 1;
      L.asc = Math.max(...L.ws.map((w) => w.asc)); L.desc = Math.max(...L.ws.map((w) => w.desc));
    }
    const nl = lines.length, rec = { sel: selOf(b), text: rs.filter((r) => !r.decor).map((r) => r.text).join(' ').slice(0, 72), except: [...new Set(rs.flatMap((r) => r.except))] };
    const pitch = lines.slice(1).map((L, i) => L.base - lines[i].base).sort((a, c) => a - c);
    const lh = bcs.lineHeight === 'normal' ? (pitch.length ? pitch[pitch.length >> 1] / bsize : null) : parseFloat(bcs.lineHeight) / bsize;
    if (bsize <= T.body.maxPx && nl >= T.body.minLines) {
      if (lh && lh < T.body.leading - 0.005) push('leading', rec, `${nl} dòng, line-height ${f2(lh)}`, `đặt ≥ ${T.body.leading} cho đoạn văn`);
      const longest = Math.max(...lines.slice(0, -1).map((L) => L.chars));
      if (longest > T.body.measureMax) push('measure', rec, `dòng dài ${longest} ký tự`, `giới hạn bề rộng ≤ ${T.body.measureMax} ký tự (DS: var(--measure) = 66ch)`);
    }
    if (bsize > T.body.maxPx && rs.some((r) => VI.test(r.text)) && lh && lh < T.displayLeadingVi - 0.005) push('display-leading', rec, `chữ ${f2(bsize)}px có dấu, line-height ${f2(lh)}`, `đặt ≥ ${T.displayLeadingVi} để chừa chỗ cho dấu chồng`);
    if (bcs.textAlign === 'justify' && nl >= 2) push('justify', rec, 'căn đều hai bên', 'căn trái: trình duyệt không ngắt âm tiết tiếng Việt, căn đều sẽ tạo khoảng trắng loang');
    const heading = /^H[1-6]$/.test(b.tagName) || b.getAttribute('role') === 'heading' || bsize >= 20;
    if (heading && nl >= 2 && nl <= 6 && words.length >= 4 && lines[nl - 1].ws.length === 1)
      push('orphan', rec, `dòng cuối chỉ còn "${lines[nl - 1].ws[0].s}"`, bcs.textWrapStyle === 'balance' ? 'đã balance: chỉnh bề rộng hoặc câu chữ' : 'text-wrap: balance (trừ phần tử dùng SplitText)');

    /* stacked marks: the ink of a glyph on one line must not reach a glyph on the next */
    const glyphs = (L) => L.ws.flatMap((w) => [...seg.segment(w.s)].map(({ segment, index }) => {
      const g = document.createRange(); g.setStart(w.n, w.i + index); g.setEnd(w.n, w.i + index + segment.length);
      const q = g.getClientRects()[0];
      if (!q || q.width < 0.5) return null;
      const c = xform(segment, w.cs, w.r.lang), [a, d, fa] = ink(w.cs, c);
      return { c, x0: q.left, x1: q.right, a, d, base: q.top + fa };
    })).filter(Boolean);
    for (let i = 0; i + 1 < nl; i++) {
      const A = lines[i], B = lines[i + 1];
      if (A.desc + B.asc <= B.base - A.base + T.collisionTolerance) continue;
      let worst = null;
      const gb = glyphs(B);
      for (const p of glyphs(A)) for (const q of gb) {
        if (Math.min(p.x1, q.x1) - Math.max(p.x0, q.x0) < 0.5) continue;
        const ov = p.base + p.d - (q.base - q.a);
        if (ov > T.collisionTolerance && (!worst || ov > worst.ov)) worst = { ov, p, q };
      }
      if (worst) push('collision', rec, `"${worst.p.c}" ở dòng ${i + 1} chạm "${worst.q.c}" ở dòng ${i + 2}, chồng ${f2(worst.ov, 1)}px (line-height ${f2(lh || 0)})`, 'tăng line-height, bỏ viết hoa tiếng Việt, hoặc dùng font có dấu thấp hơn');
    }

    /* stacked marks cut off by an overflow: hidden/clip box */
    const clips = new Map();
    for (const w of words) {
      if (!clips.has(w.r)) {
        const list = [];
        for (let a = w.r.el; a && a !== document.body; a = a.parentElement) {
          const cs = getComputedStyle(a);
          if (/hidden|clip/.test(cs.overflowY)) { const bb = a.getBoundingClientRect(); list.push([a, bb.top + a.clientTop, bb.top + a.clientTop + a.clientHeight, bb.left, bb.right]); }
        }
        clips.set(w.r, list);
      }
      for (const [a, top, bottom, left, right] of clips.get(w.r)) {
        if (w.x1 <= left || w.x0 >= right || w.bottom <= top || w.top >= bottom) continue;
        const cut = Math.max(top - (w.base - w.asc), w.base + w.desc - bottom);
        if (cut > T.collisionTolerance) { push('ink-clip', { ...rec, text: w.r.text }, `"${w.s}" bị ${selOf(a)} cắt ${f2(cut, 1)}px`, 'thêm padding dọc cho khung overflow (DS: 0.12em) hoặc tăng line-height'); w.r.inkCut = true; break; }
      }
      if (w.r.inkCut) break;
    }
  }

  window.__tc = { runs, blocks, selOf, rectsOf };
  return { findings: F, failed: [...new Set(faces.filter((f) => f.status === 'error').map((f) => f.family))], runs: runs.length };
}

/* in the page: which glyphs did not come from the run's own web font (platform fonts come from CDP) */
function fallbackEval(used) {
  const { runs } = window.__tc, F = [], cv = document.createElement('canvas').getContext('2d');
  const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const webFonts = new Set([...document.fonts].map((f) => norm(f.family)));
  for (const r of runs) {
    const fam = norm(r.fam), fonts = used[r.id] || [];
    if (!webFonts.has(fam)) continue;
    const other = fonts.filter((f) => f.glyphCount > 0 && !norm(f.familyName).startsWith(fam) && !norm(f.postScriptName).startsWith(fam));
    if (!other.length) continue;
    const st = r.italic ? 'italic' : 'normal', miss = [];
    for (const ch of new Set([...r.shown].filter((c) => /\S/.test(c) && !/\p{M}/u.test(c)))) {
      cv.font = `${st} ${r.weight} 40px "${r.fam}", monospace`; const a = cv.measureText(ch).width;
      cv.font = `${st} ${r.weight} 40px "${r.fam}", serif`; const b = cv.measureText(ch).width;
      if (Math.abs(a - b) > 0.01) miss.push(ch);
    }
    const via = [...new Set(other.map((f) => f.familyName))].join(', ');
    const letters = miss.filter((c) => /[\p{L}\p{N}]/u.test(c)), syms = miss.filter((c) => !/[\p{L}\p{N}]/u.test(c));
    if (letters.length) F.push({ rule: 'glyph-fallback', sel: r.sel, text: r.text, msg: `${r.fam} thiếu "${letters.join('')}", trình duyệt vẽ bằng ${via}`, fix: 'nạp đủ subset của font (vd vietnamese) hoặc chọn font đủ chữ', except: r.except });
    if (syms.length) F.push({ rule: 'symbol-fallback', sel: r.sel, text: r.text, msg: `${r.fam} thiếu "${syms.join(' ')}", trình duyệt vẽ bằng ${via} (mỗi máy một khác)`, fix: 'dùng ký hiệu có trong font, hoặc SVG', except: r.except });
  }
  return F;
}

/* in the page: colors of each content run, then hide all content text so a screenshot shows only what is behind */
function contrastPrep(T) {
  const { runs, rectsOf } = window.__tc, c1 = document.createElement('canvas'); c1.width = c1.height = 1;
  const x = c1.getContext('2d', { willReadFrequently: true });
  const rgba = (c) => { x.clearRect(0, 0, 1, 1); x.fillStyle = '#000'; x.fillStyle = c; x.fillRect(0, 0, 1, 1); const d = x.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  scrollTo(0, 0);
  const list = [];
  for (const r of runs) {
    if (r.decor || !r.el.isConnected) continue;
    r.el.setAttribute('data-tc-c', '');
    if (r.inert || r.el.closest(':disabled,[aria-disabled="true"]')) continue; /* inactive UI: no requirement (1.4.3) */
    const cs = getComputedStyle(r.el), fill = cs.webkitTextFillColor && cs.webkitTextFillColor !== cs.color ? cs.webkitTextFillColor : cs.color;
    const c = rgba(fill);
    let o = c[3];
    for (let a = r.el; a; a = a.parentElement) o *= +getComputedStyle(a).opacity;
    if (o < 0.02) continue;
    list.push({ id: r.id, sel: r.sel, text: r.text, except: r.except, rgb: c.slice(0, 3), alpha: o, fixed: r.pos === 'fixed',
      large: r.size >= T.largePx || (r.size >= T.largeBoldPx && r.weight >= 700),
      rects: rectsOf(r.nodes).map((q) => [q.left, q.top + scrollY, q.width, q.height]) });
  }
  for (const e of document.querySelectorAll('body *')) { const p = getComputedStyle(e).position; if (p === 'fixed') e.setAttribute('data-tc-fixed', ''); else if (p === 'sticky') e.setAttribute('data-tc-sticky', ''); }
  const st = document.createElement('style'); st.id = 'tc-contrast';
  st.textContent = '[data-tc-c]{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;text-decoration-color:transparent!important}'
    + 'html{scroll-behavior:auto!important}[data-tc-fixed]{visibility:hidden!important}[data-tc-sticky]{position:relative!important;top:auto!important}';
  document.head.appendChild(st);
  return { list, height: document.documentElement.scrollHeight };
}
function contrastDone() {
  document.getElementById('tc-contrast')?.remove();
  for (const a of ['data-tc-c', 'data-tc-fixed', 'data-tc-sticky']) for (const e of document.querySelectorAll(`[${a}]`)) e.removeAttribute(a);
  scrollTo(0, 0);
}

/* in the page: content text cut by an overflow box, and text of unrelated blocks overlapping */
function spacingSnap() {
  const { runs, blocks, selOf, rectsOf } = window.__tc, clipped = {}, frags = [], pairs = {};
  const blockOf = new Map();
  blocks.forEach((b, i) => b.runs.forEach((id) => blockOf.set(id, i)));
  for (const r of runs) {
    if (r.decor || r.inert || !r.el.isConnected) continue;
    const rs = rectsOf(r.nodes);
    let view = [-Infinity, -Infinity, Infinity, Infinity]; /* what any overflow box (scrolling or not) leaves visible */
    for (let a = r.el; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflowX === 'visible' && cs.overflowY === 'visible') continue;
      const b = a.getBoundingClientRect(), L = b.left + a.clientLeft, Tp = b.top + a.clientTop, R = L + a.clientWidth, B = Tp + a.clientHeight;
      view = [Math.max(view[0], L), Math.max(view[1], Tp), Math.min(view[2], R), Math.min(view[3], B)];
      const x = /hidden|clip/.test(cs.overflowX), y = /hidden|clip/.test(cs.overflowY);
      if (!clipped[r.id] && rs.some((q) => (x && (q.left < L - 1 || q.right > R + 1)) || (y && (q.top < Tp - 1 || q.bottom > B + 1)))) clipped[r.id] = { sel: r.sel, text: r.text, by: selOf(a), except: r.except };
    }
    if (r.pos !== 'fixed') for (const q of rs) {
      const f = [r.id, Math.max(q.left, view[0]), Math.max(q.top, view[1]), Math.min(q.right, view[2]), Math.min(q.bottom, view[3])];
      if (f[3] > f[1] && f[4] > f[2]) frags.push(f);
    }
  }
  frags.sort((p, q) => p[2] - q[2]);
  for (let i = 0; i < frags.length; i++) for (let j = i + 1; j < frags.length && frags[j][2] < frags[i][4]; j++) {
    const p = frags[i], q = frags[j], bp = blockOf.get(p[0]), bq = blockOf.get(q[0]);
    if (bp === bq) continue;
    if (Math.min(p[3], q[3]) - Math.max(p[1], q[1]) <= 2 || Math.min(p[4], q[4]) - Math.max(p[2], q[2]) <= 2) continue;
    const ep = blocks[bp].el, eq = blocks[bq].el;
    if (ep.contains(eq) || eq.contains(ep)) continue;
    const k = bp < bq ? `${bp}-${bq}` : `${bq}-${bp}`;
    if (!pairs[k]) { const a = runs[p[0]], b = runs[q[0]]; pairs[k] = { sel: a.sel, text: a.text, other: `${b.sel} "${b.text.slice(0, 30)}"`, except: [...a.except, ...b.except] }; }
  }
  return { clipped, pairs };
}
function sizesNow() {
  return window.__tc.runs.filter((r) => !r.decor).map((r) => [r.id, r.el.isConnected && r.el.getClientRects().length ? parseFloat(getComputedStyle(r.el).fontSize) : 0]);
}

/* ───────────── in node ───────────── */

function decodePNG(buf) { /* 8-bit RGB/RGBA, not interlaced: what Chromium writes */
  let pos = 8, w = 0, h = 0, bpp = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos), type = buf.toString('ascii', pos + 4, pos + 8), d = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); bpp = { 2: 3, 6: 4 }[d[9]]; if (d[8] !== 8 || d[12] || !bpp) throw new Error('unsupported PNG'); }
    else if (type === 'IDAT') idat.push(d); else if (type === 'IEND') break;
    pos += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat)), stride = w * bpp, px = Buffer.alloc(w * h * 4);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], cur = Buffer.from(raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)));
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0, b = prev[i], c = i >= bpp ? prev[i - bpp] : 0;
      let v = cur[i];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      cur[i] = v & 255;
    }
    for (let x = 0; x < w; x++) { const s = x * bpp, t = (y * w + x) * 4; px[t] = cur[s]; px[t + 1] = cur[s + 1]; px[t + 2] = cur[s + 2]; px[t + 3] = 255; }
    prev = cur;
  }
  return { w, h, px };
}
const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const hex = (r, g, b) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const f2 = (x, d = 2) => String(+x.toFixed(d)).replace('.', ',');

function sampleInto(acc, img, items, y0) {
  for (const it of items) for (const [x, ry, w, h] of it.rects) {
    const top = ry - y0, xa = Math.max(0, Math.floor(x)), xb = Math.min(img.w - 1, Math.ceil(x + w) - 1);
    const ya = Math.max(0, Math.floor(top)), yb = Math.min(img.h - 1, Math.ceil(top + h) - 1);
    if (xb < xa || yb < ya) continue;
    const step = Math.max(2, Math.floor(Math.sqrt(((xb - xa + 1) * (yb - ya + 1)) / 240)));
    if (!acc.has(it.id)) acc.set(it.id, []);
    const s = acc.get(it.id);
    for (let yy = ya; yy <= yb; yy += step) for (let xx = xa; xx <= xb; xx += step) { const i = (yy * img.w + xx) * 4; s.push([img.px[i], img.px[i + 1], img.px[i + 2]]); }
  }
}
async function contrastPass(p, opt, T) {
  const { list, height } = await p.evaluate(contrastPrep, T.contrast);
  const acc = new Map(), flow = list.filter((x) => !x.fixed), fixed = list.filter((x) => x.fixed);
  for (let y = 0; y < height; y += opt.height) {
    const at = await p.evaluate((v) => { scrollTo(0, v); return scrollY; }, y);
    await p.waitForTimeout(40);
    const img = decodePNG(await p.screenshot({ animations: 'disabled', caret: 'hide' }));
    sampleInto(acc, img, flow.filter((it) => it.rects.some(([, ry, , h]) => ry + h > at && ry < at + opt.height)), at);
  }
  if (fixed.length) {
    await p.evaluate(() => { scrollTo(0, 0); for (const e of document.querySelectorAll('[data-tc-fixed]')) e.removeAttribute('data-tc-fixed'); });
    await p.waitForTimeout(40);
    sampleInto(acc, decodePNG(await p.screenshot({ animations: 'disabled', caret: 'hide' })), fixed, 0);
  }
  await p.evaluate(contrastDone);
  const out = [];
  for (const it of list) {
    const bg = acc.get(it.id);
    if (!bg || !bg.length) continue;
    const need = it.large ? T.contrast.large : T.contrast.normal;
    const ratios = bg.map(([r, g, b]) => {
      const e = [r, g, b].map((v, i) => v * (1 - it.alpha) + it.rgb[i] * it.alpha), L1 = lum(...e), L2 = lum(r, g, b);
      return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    }).sort((a, b) => a - b);
    const v = ratios[Math.floor((ratios.length - 1) * T.contrast.percentile / 100)];
    if (v >= need) continue;
    const mid = bg.map(([r, g, b]) => [lum(r, g, b), r, g, b]).sort((a, b) => a[0] - b[0])[bg.length >> 1];
    const fg = it.rgb.map((c, i) => c * it.alpha + mid[i + 1] * (1 - it.alpha));
    out.push({ rule: 'contrast', sel: it.sel, text: it.text, except: it.except,
      msg: `${f2(v)}:1, cần ${need}:1 (chữ ${hex(...fg)}${it.alpha < 0.99 ? ` = ${hex(...it.rgb)} ở ${Math.round(it.alpha * 100)}%` : ''} trên ${hex(mid[1], mid[2], mid[3])})`,
      fix: it.alpha < 0.99 ? 'bỏ opacity trên chữ; dùng token fg/fg-muted/fg-subtle' : 'dùng token chữ đã đo (README: fg-subtle ≥ 4,7:1 trên bg, bg-raised)' });
  }
  return out;
}
async function spacingPass(p) {
  const before = await p.evaluate(spacingSnap);
  await p.evaluate((c) => { const s = document.createElement('style'); s.id = 'tc-spacing'; s.textContent = c; document.head.appendChild(s); }, SPACING_CSS);
  await p.waitForTimeout(120);
  const after = await p.evaluate(spacingSnap);
  await p.evaluate(() => document.getElementById('tc-spacing')?.remove());
  await p.waitForTimeout(60);
  const out = [], fix = 'đừng khoá chiều cao/bề rộng của khung chứa chữ; để chữ xuống dòng';
  for (const [id, c] of Object.entries(after.clipped)) if (!before.clipped[id]) out.push({ rule: 'text-spacing', sel: c.sel, text: c.text, except: c.except, msg: `bị ${c.by} cắt khi giãn chữ`, fix });
  for (const [k, c] of Object.entries(after.pairs)) if (!before.pairs[k]) out.push({ rule: 'text-spacing', sel: c.sel, text: c.text, except: c.except, msg: `chồng lên ${c.other} khi giãn chữ`, fix });
  return out;
}
async function zoomPass(p, opt, T) {
  /* zoom = a narrower viewport in CSS px; text a zoomed layout hides cannot be measured, so it is left out */
  const base = new Map(await p.evaluate(sizesNow)), best = new Map(), seen = new Set();
  for (const z of T.zoom.levels) {
    await p.setViewportSize({ width: Math.round(opt.width / z), height: Math.round(opt.height / z) });
    await p.waitForTimeout(150);
    for (const [id, s] of await p.evaluate(sizesNow)) if (s) { best.set(id, Math.max(best.get(id) || 0, z * s)); if (z >= T.zoom.target) seen.add(id); }
  }
  await p.setViewportSize({ width: opt.width, height: opt.height });
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Page.setFontSizes', { fontSizes: { standard: 32, fixed: 26 } });
  await p.waitForTimeout(150);
  const bigger = new Map(await p.evaluate(sizesNow));
  await cdp.send('Page.setFontSizes', { fontSizes: { standard: 16, fixed: 13 } });
  await cdp.detach();
  await p.waitForTimeout(150);
  const meta = new Map((await p.evaluate(() => window.__tc.runs.filter((r) => !r.decor).map((r) => [r.id, { sel: r.sel, text: r.text, except: r.except }]))));
  const out = [];
  for (const [id, s] of base) {
    const b = best.get(id);
    if (s && b && seen.has(id) && b / s < T.zoom.target - 0.01) out.push({ rule: 'zoom', ...meta.get(id), msg: `phóng to tới ${T.zoom.levels[T.zoom.levels.length - 1] * 100}% chỉ được ${f2(b / s)}× cỡ gốc (cần ${T.zoom.target}×)`, fix: 'cỡ fluid: max ≤ 2,5 × min; tránh vw đứng một mình' });
  }
  const fixedPx = [...base].filter(([id, s]) => s && bigger.get(id) && bigger.get(id) / s < T.textSizeSetting.ratio);
  if (fixedPx.length) out.push({ rule: 'text-size-setting', sel: 'body', text: '', except: [], msg: `${fixedPx.length}/${base.size} đoạn chữ giữ nguyên cỡ khi người đọc tăng cỡ chữ trình duyệt lên 200%`, fix: 'đặt cỡ chữ bằng rem (vd 17px → 1.0625rem) để theo cài đặt của người đọc' });
  return out;
}
async function fallbackPass(p) {
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('DOM.enable'); await cdp.send('CSS.enable');
  const { root } = await cdp.send('DOM.getDocument', { depth: 0 });
  const { nodeIds } = await cdp.send('DOM.querySelectorAll', { nodeId: root.nodeId, selector: '[data-tc]' });
  const used = [];
  for (const nodeId of nodeIds) { try { used.push((await cdp.send('CSS.getPlatformFontsForNode', { nodeId })).fonts); } catch (e) { used.push([]); } }
  await cdp.detach();
  return p.evaluate(fallbackEval, used);
}

async function auditPage(ctx, url, opt, cfg) {
  const p = await ctx.newPage(), lost = [], sizes = [];
  p.on('requestfailed', (r) => { if (r.resourceType() === 'font' || /fonts\.g(oogleapis|static)\.com/.test(r.url())) lost.push(r.url()); });
  p.on('requestfinished', (r) => { if (r.resourceType() === 'font') sizes.push(r.response().then((s) => +(s && s.headers()['content-length']) || 0, () => 0)); });
  await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const a = await p.evaluate(analyze, cfg);
  let out = a.findings;
  if (lost.length || a.failed.length) {
    out = out.filter((f) => f.rule !== 'collision' && f.rule !== 'ink-clip');
    out.push({ rule: 'font-load', sel: 'document.fonts', text: '', except: [], msg: `font không nạp được (${[...a.failed, ...lost].slice(0, 3).join(', ')}): bỏ qua kiểm dấu chồng và glyph`, fix: 'kiểm mạng hoặc CDN font rồi chạy lại' });
  } else out.push(...await fallbackPass(p));
  out.push(...await contrastPass(p, opt, cfg.t));
  out.push(...await spacingPass(p));
  if (!opt.isMobile) out.push(...await zoomPass(p, opt, cfg.t));
  await p.close();
  const bytes = (await Promise.all(sizes)).reduce((x, y) => x + y, 0);
  return { findings: out, fonts: { files: sizes.length, kb: Math.round(bytes / 1024) }, runs: a.runs };
}

/* rules the bad fixture must trip. symbol-fallback depends on which generic fonts the machine has, so it is not asserted. */
const EXPECT_BAD = ['contrast', 'min-size', 'light-weight', 'caps-tracking', 'caps-vi', 'justify', 'headings', 'leading', 'measure', 'display-leading', 'orphan',
  'collision', 'ink-clip', 'text-spacing', 'zoom', 'text-size-setting', 'faux-style', 'role', 'font-family', 'font-load', 'glyph-fallback', 'stray-markup', 'punctuation'];

async function selftest(cfg, R) {
  const FIX = path.join(__dirname, 'fixtures'), PUB = path.join(__dirname, '..', 'public');
  const server = await new Promise((ok) => {
    const s = http.createServer((q, r) => {
      const u = decodeURIComponent(q.url.split('?')[0]), f = u.startsWith('/fonts/') ? path.join(PUB, u) : path.join(FIX, u.replace(/^\//, ''));
      if (!f.startsWith(FIX) && !f.startsWith(PUB) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { r.writeHead(404); return r.end(); }
      r.writeHead(200, { 'content-type': f.endsWith('.html') ? 'text/html; charset=utf-8' : 'font/woff2' }); fs.createReadStream(f).pipe(r);
    }).listen(0, '127.0.0.1', () => ok(s));
  });
  const origin = `http://127.0.0.1:${server.address().port}`, opt = R.viewports.desktop;
  const browser = await chromium.launch(), ctx = await browser.newContext({ viewport: { width: opt.width, height: opt.height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const bad = await auditPage(ctx, `${origin}/type-bad.html`, opt, cfg), good = await auditPage(ctx, `${origin}/type-good.html`, opt, cfg);
  await browser.close(); server.close();
  /* a rule counts only when it fires on the block the fixture marks with data-rule (not by accident elsewhere) */
  const want = {};
  for (const m of fs.readFileSync(path.join(FIX, 'type-bad.html'), 'utf8').matchAll(/data-rule="([a-z-]+)"[^>]*>(?:<span>)?([^<]+)/g)) want[m[1]] = m[2].trim().slice(0, 12);
  let fails = 0;
  console.log('Self-test · bad page: every rule must fire on its own block');
  for (const id of EXPECT_BAD) {
    const ok = bad.findings.some((f) => f.rule === id && (!want[id] || f.text.startsWith(want[id])));
    if (!ok) fails++; console.log(`  ${ok ? '✓' : '✕'} ${id}${ok ? '' : '  ← not reported'}`);
  }
  console.log('Self-test · good page: nothing may fire');
  for (const f of good.findings) { fails++; console.log(`  ✕ ${f.rule} ${f.sel} ${f.msg}`); }
  if (!good.findings.length) console.log('  ✓ no findings');
  console.log(fails ? `\n✕ self-test: ${fails} problem(s). The checker itself is broken or changed; fix it before trusting its results.` : '\n✓ self-test passed');
  process.exit(fails ? 1 : 0);
}

function where(list, nPages) {
  const by = {};
  for (const w of list) (by[w.vp] = by[w.vp] || []).push(w.page);
  return Object.entries(by).map(([vp, ps]) => `${vp}: ${ps.length === nPages && nPages > 1 ? `mọi trang (${nPages})` : ps.slice(0, 4).join(' ') + (ps.length > 4 ? ` +${ps.length - 4}` : '')}`).join(' · ');
}

(async () => {
  const R = JSON.parse(fs.readFileSync(args.rules, 'utf8')), ds = !args.url.length || args.ds;
  for (const x of R.exceptions || []) if (!x.rule || !x.selector || !String(x.reason || '').trim()) { console.error('type-rules.json: every exception needs rule, selector and a reason'); process.exit(2); }
  const cfg = { t: R.thresholds, decor: R.decor, exceptions: R.exceptions || [], roles: ds ? R.roles : [], allowed: ds && R.fonts ? R.fonts.allowed : null };
  if (args.selftest) return selftest(cfg, R);
  let server = null, targets;
  if (args.url.length) targets = args.url.map((u) => ({ name: u, url: u }));
  else {
    if (!fs.existsSync(DIST)) { console.error('no dist/: run the build first'); process.exit(1); }
    server = await serve();
    const origin = `http://127.0.0.1:${server.address().port}`;
    const pages = args.pages || htmlFiles().map((f) => path.relative(DIST, path.dirname(f)).split(path.sep).join('/')).map((d) => (d ? d + '/' : '')).filter((d) => !/^(404|ds)\b/.test(d)).sort();
    targets = pages.map((pg) => ({ name: '/' + pg, url: origin + BASE + pg }));
  }
  const vps = Object.entries(R.viewports).filter(([k]) => !args.only || args.only === k);
  console.log(`Typography · ${targets.length} trang × ${vps.map(([k, v]) => `${k} ${v.width}`).join(', ')} · luật ${path.relative(process.cwd(), args.rules)}`);
  const browser = await chromium.launch(), all = [], stats = [];
  for (const [vp, opt] of vps) {
    const ctx = await browser.newContext({ viewport: { width: opt.width, height: opt.height }, isMobile: !!opt.isMobile, hasTouch: !!opt.isMobile, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    for (const t of targets) {
      const t0 = Date.now(), r = await auditPage(ctx, t.url, opt, cfg);
      for (const f of r.findings) all.push({ ...f, page: t.name, vp });
      stats.push({ page: t.name, vp, runs: r.runs, fontFiles: r.fonts.files, fontKB: r.fonts.kb });
      console.log(`  ${vp.padEnd(7)} ${t.name.padEnd(12)} ${String(r.runs).padStart(4)} đoạn chữ · ${String(r.findings.length).padStart(3)} phát hiện · font ${r.fonts.files} file ${r.fonts.kb} KB · ${((Date.now() - t0) / 1000).toFixed(1)}s`);
    }
    await ctx.close();
  }
  await browser.close();
  if (server) server.close();

  /* exceptions (each with a reason in the rules file), severities, then one entry per rule+element+message */
  const excepted = all.filter((f) => f.except.includes(f.rule)).length;
  const merged = new Map();
  for (const f of all.filter((x) => !x.except.includes(x.rule))) {
    const k = `${f.rule}\u0001${f.sel}\u0001${f.msg}`, g = merged.get(k);
    if (g) g.at.push({ page: f.page, vp: f.vp }); else merged.set(k, { rule: f.rule, sev: R.severity[f.rule] || 'warn', sel: f.sel, text: f.text, msg: f.msg, fix: f.fix, at: [{ page: f.page, vp: f.vp }] });
  }
  const order = Object.keys(RULES);
  const list = [...merged.values()].sort((a, b) => (a.sev === b.sev ? 0 : a.sev === 'error' ? -1 : 1) || order.indexOf(a.rule) - order.indexOf(b.rule) || a.sel.localeCompare(b.sel));
  const errors = list.filter((f) => f.sev === 'error'), warns = list.filter((f) => f.sev !== 'error');

  const lines = [], md = [];
  let cur = null;
  for (const f of list) {
    if (f.rule !== cur) { cur = f.rule; const [what, src] = RULES[f.rule] || [f.rule, '']; lines.push(`\n${f.sev === 'error' ? '✕' : '!'} ${f.rule} · ${what} (${src})`); }
    lines.push(`   ${f.sel}${f.text ? `  "${f.text.slice(0, 48)}"` : ''}\n     ${f.msg}\n     → ${f.fix} · ${where(f.at, targets.length)}`);
  }
  console.log(lines.join('\n'));
  console.log(`\n${errors.length ? '✕' : '✓'} ${errors.length} lỗi · ${warns.length} cảnh báo${excepted ? ` · ${excepted} chỗ miễn theo exceptions` : ''}`);

  md.push(`## Typography: ${errors.length ? `✕ ${errors.length} lỗi` : '✓ không có lỗi'} · ${warns.length} cảnh báo`, '',
    `${targets.length} trang × ${vps.map(([k, v]) => `${k} ${v.width}px`).join(', ')}. Luật: \`design-system/type-rules.json\` · giải thích: \`docs/11-typography.md\`.${excepted ? ` ${excepted} chỗ được miễn theo \`exceptions\`.` : ''}`, '',
    '| Luật | Mức | Số chỗ | Kiểm gì | Nguồn |', '|---|---|---|---|---|');
  for (const id of order) {
    const n = list.filter((f) => f.rule === id).length;
    if (n) md.push(`| \`${id}\` | ${(R.severity[id] || 'warn') === 'error' ? 'lỗi' : 'cảnh báo'} | ${n} | ${RULES[id][0]} | ${RULES[id][1]} |`);
  }
  for (const f of list.slice(0, 120)) md.push(`- ${f.sev === 'error' ? '✕' : '!'} \`${f.rule}\` \`${f.sel}\`${f.text ? ` "${f.text.slice(0, 48)}"` : ''}: ${f.msg}. → ${f.fix} (${where(f.at, targets.length)})`);
  if (list.length > 120) md.push(`- … và ${list.length - 120} mục nữa trong report.json`);
  fs.mkdirSync(args.out, { recursive: true });
  fs.writeFileSync(path.join(args.out, 'summary.md'), md.join('\n') + '\n');
  fs.writeFileSync(path.join(args.out, 'report.json'), JSON.stringify({ generated: new Date().toISOString(), rules: path.relative(process.cwd(), args.rules), pages: targets.map((t) => t.name), viewports: Object.fromEntries(vps), counts: { errors: errors.length, warnings: warns.length, excepted }, stats, findings: list }, null, 1));
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md.join('\n') + '\n');
  process.exit(errors.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
