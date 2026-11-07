// Build the "Blocks" logo: render the name in a serif, sample it onto a coarse pixel grid,
// and write every format the system needs from that one bitmap.
//   node tools/make-logo.js <outdir> [rows] [weight] [text]
// Outputs in <outdir>: logo-blocks.json (rows of '#'/'.'), logo-blocks.svg (one path, currentColor),
// logo-blocks.txt (half-block text art for terminals and READMEs), logo-blocks.png (preview).
// Needs Playwright + network for Google Fonts (Newsreader). The bitmap is the master: commit it,
// do not regenerate it casually, a logo must not change shape between builds.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2] || '.';
const ROWS = Number(process.argv[3] || 24);   // master: 24 -> 139x18 grid; small (HUD): 18 -> 104x14
const WEIGHT = Number(process.argv[4] || 800);
const TEXT = process.argv[5] || 'No babysitting';

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setContent(`<html><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..800&display=block"></head><body><canvas id="c"></canvas></body></html>`, { waitUntil: 'networkidle' });
  const res = await p.evaluate(async ({ ROWS, WEIGHT, TEXT }) => {
    const fam = '"Newsreader"';
    await document.fonts.load(`${WEIGHT} 100px ${fam}`);
    // master render at 16x the target grid, then area-average each cell
    const K = 16, size = ROWS * K * 0.78;            // em so that ascender..descender ~ ROWS
    const c = document.createElement('canvas'), g = c.getContext('2d');
    g.font = `${WEIGHT} ${size}px ${fam}`;
    try { g.fontVariationSettings = "'opsz' 12"; } catch (e) {}
    const m = g.measureText(TEXT);
    const asc = Math.ceil(m.actualBoundingBoxAscent), desc = Math.ceil(m.actualBoundingBoxDescent);
    const left = Math.floor(m.actualBoundingBoxLeft), w = Math.ceil(m.actualBoundingBoxRight + left);
    c.width = Math.ceil(w / K) * K + 2 * K; c.height = ROWS * K;
    g.font = `${WEIGHT} ${size}px ${fam}`; g.fillStyle = '#fff'; g.textBaseline = 'alphabetic';
    const scale = Math.min(1, (ROWS * K) / (asc + desc));
    g.setTransform(scale, 0, 0, scale, 0, 0);
    g.fillText(TEXT, (K + left) / scale, (asc * scale + (ROWS * K - (asc + desc) * scale) / 2) / scale);
    const d = g.getImageData(0, 0, c.width, c.height).data, W = c.width / K, rows = [];
    for (let y = 0; y < ROWS; y++) {
      let r = '';
      for (let x = 0; x < W; x++) {
        let s = 0;
        for (let yy = 0; yy < K; yy++) for (let xx = 0; xx < K; xx++) s += d[((y * K + yy) * c.width + x * K + xx) * 4 + 3];
        r += s / (K * K * 255) >= 0.5 ? '#' : '.';
      }
      rows.push(r);
    }
    return rows;
  }, { ROWS, WEIGHT, TEXT });
  await b.close();

  // trim empty columns and rows
  let rows = res;
  const colUsed = i => rows.some(r => r[i] === '#');
  let l = 0, r = rows[0].length - 1;
  while (l < r && !colUsed(l)) l++;
  while (r > l && !colUsed(r)) r--;
  rows = rows.map(s => s.slice(l, r + 1)).filter((s, i, a) => s.includes('#') || (i > 0 && i < a.length - 1 && a.slice(0, i).some(x => x.includes('#')) && a.slice(i).some(x => x.includes('#'))));
  const H = rows.length, W = rows[0].length;

  // SVG: one path of horizontal runs, currentColor, crisp edges
  let dpath = '';
  rows.forEach((s, y) => { const re = /#+/g; let m; while ((m = re.exec(s))) dpath += `M${m.index} ${y}h${m[0].length}v1h-${m[0].length}z`; });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * 4}" height="${H * 4}" shape-rendering="crispEdges" role="img" aria-label="${TEXT}"><path fill="currentColor" d="${dpath}"/></svg>\n`;

  // half-block text: each text row carries two pixel rows
  const HB = { '..': ' ', '#.': '▀', '.#': '▄', '##': '█' };
  const txt = [];
  for (let y = 0; y < H; y += 2) {
    let line = '';
    for (let x = 0; x < W; x++) line += HB[rows[y][x] + ((rows[y + 1] || '')[x] || '.')];
    txt.push(line.replace(/\s+$/, ''));
  }

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'logo-blocks.json'), JSON.stringify({ text: TEXT, font: `Newsreader ${WEIGHT}`, w: W, h: H, rows }, null, 0) + '\n');
  fs.writeFileSync(path.join(OUT, 'logo-blocks.svg'), svg);
  fs.writeFileSync(path.join(OUT, 'logo-blocks.txt'), txt.join('\n') + '\n');
  console.log(`${W}x${H}`);
  console.log(rows.join('\n'));
})();
