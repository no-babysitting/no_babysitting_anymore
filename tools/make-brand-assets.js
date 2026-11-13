// Favicon (the "N" of the Blocks logo) and the 1200x630 share image, both cut from the logo bitmap.
// usage: node tools/make-brand-assets.js   → site/public/favicon.svg, site/public/og.png
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..'), out = path.join(root, 'site/public');
const lg = JSON.parse(fs.readFileSync(path.join(root, 'design-system/assets/Logo/logo-blocks.json'), 'utf8'));
fs.mkdirSync(out, { recursive: true });

/* favicon: the N is the first run of columns before an all-empty column */
const rows = lg.rows; let end = 0;
for (let x = 1; x < lg.w; x++) if (rows.every((r) => r[x] !== '#')) { end = x; break; }
const ys = rows.map((r, y) => (r.slice(0, end).includes('#') ? y : -1)).filter((y) => y >= 0);
const y0 = ys[0], h = ys[ys.length - 1] - y0 + 1, w = end, S = 32, px = Math.max(1, Math.floor((S - 4) / Math.max(w, h)));
const ox = Math.floor((S - w * px) / 2), oy = Math.floor((S - h * px) / 2);
let d = '';
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (rows[y0 + y][x] === '#') d += `M${ox + x * px} ${oy + y * px}h${px}v${px}h-${px}z`;
fs.writeFileSync(path.join(out, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"><rect width="${S}" height="${S}" fill="#14120f"/><path fill="#d97a4a" d="${d}"/></svg>\n`);

/* share image: logo + descriptor + standing, rendered with the real tokens and runtime */
(async () => {
  const ds = path.join(root, 'design-system');
  const html = `<!doctype html><html lang="vi" data-theme="dark"><head><meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500&family=JetBrains+Mono:wght@500;600&family=Newsreader:opsz,wght@6..72,400&display=swap">
  <link rel="stylesheet" href="file://${ds}/tokens.css"><link rel="stylesheet" href="file://${ds}/components/bundle.css">
  <script src="file://${ds}/components/bundle.js"></script>
  <style>html,body{margin:0;background:var(--bg)}body{width:1200px;height:630px;box-sizing:border-box;padding:72px 80px;display:grid;align-content:space-between;color:var(--fg)}
  .m{color:var(--accent);width:834px}.m svg{display:block;width:100%;height:auto}
  .t{font:400 44px/1.2 Newsreader,serif;margin:0 0 14px;text-wrap:balance}.d{font:500 22px/1.4 "JetBrains Mono",monospace;color:var(--fg-muted);margin:0;text-wrap:balance}
  .f{display:flex;justify-content:space-between;font:600 17px/1 "JetBrains Mono",monospace;color:var(--fg-subtle);letter-spacing:.04em;border-top:1px solid var(--control);padding-top:20px}</style></head>
  <body><div class="m" id="m"></div><div><p class="t">Claude đã khôn hơn rồi, sao bạn vẫn còn phải trông trẻ?</p>
  <p class="d">Thôi cầm tay chỉ việc: hãy cùng Claude làm rõ công việc, rồi giao trọn phần thực thi cho em nó.</p></div>
  <div class="f"><span>Dự án cộng đồng độc lập · không phải trang chính thức của Anthropic</span><span>tiếng Việt · beta</span></div>
  <script>document.getElementById('m').innerHTML = NoBabysitting.logoSVG('lg');</script></body></html>`;
  const tmp = path.join(require('os').tmpdir(), 'nb-og.html'); fs.writeFileSync(tmp, html);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.goto('file://' + tmp, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(out, 'og.png') }); await b.close();
  console.log('favicon.svg (N ' + w + 'x' + h + ' px' + px + '), og.png');
})();
