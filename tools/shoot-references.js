const { chromium } = require('playwright');
const path = require('path');

const OUT = process.argv[2];
const SITES = [
  ['aino', 'https://aino.agency/'],
  ['wrdlss', 'https://wrdlss.club/'],
  ['deified', 'https://elvas.studio/work/deified-brand-identity-website-and-motion/'],
  ['asciify', 'https://asciify.org/'],
  ['artefakt', 'https://artefakt.mov/'],
];

(async () => {
  const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const browser = await chromium.launch({ proxy, args: ['--ignore-certificate-errors'] });
  for (const [name, url] of SITES) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(5000);
      await page.mouse.move(720, 450); await page.waitForTimeout(600);
      await page.mouse.move(980, 380); await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(OUT, `${name}-1.png`) });
      const info = await page.evaluate(() => {
        const cs = (el) => el ? getComputedStyle(el) : null;
        const pick = (sel) => { const el = document.querySelector(sel); const s = cs(el); return s ? { sel, font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, color: s.color, ls: s.letterSpacing, tt: s.textTransform } : null; };
        const fonts = new Set(); document.querySelectorAll('body *').forEach((e, i) => { if (i < 3000) fonts.add(getComputedStyle(e).fontFamily.split(',')[0].trim()); });
        const colors = {}; document.querySelectorAll('body *').forEach((e, i) => { if (i < 3000) { const s = getComputedStyle(e); [s.color, s.backgroundColor].forEach(c => { if (c && c !== 'rgba(0, 0, 0, 0)') colors[c] = (colors[c] || 0) + 1; }); } });
        const topColors = Object.entries(colors).sort((a, b) => b[1] - a[1]).slice(0, 8);
        const pres = Array.from(document.querySelectorAll('pre')).slice(0, 2).map(p => p.textContent.slice(0, 300));
        return {
          title: document.title,
          bodyBg: cs(document.body).backgroundColor,
          h1: pick('h1'), h2: pick('h2'), p: pick('p'), a: pick('nav a, header a'),
          fonts: Array.from(fonts).slice(0, 10),
          topColors,
          canvases: document.querySelectorAll('canvas').length,
          videos: document.querySelectorAll('video').length,
          pres,
          radiusSample: Array.from(document.querySelectorAll('button, a, img, video, [class*=card]')).slice(0, 30).map(e => getComputedStyle(e).borderRadius).filter(r => r !== '0px').slice(0, 5),
          textSample: document.body.innerText.slice(0, 600).replace(/\s+/g, ' '),
        };
      });
      console.log('=====', name, JSON.stringify(info));
      await page.mouse.wheel(0, 1100); await page.waitForTimeout(2500);
      await page.screenshot({ path: path.join(OUT, `${name}-2.png`) });
      await page.mouse.wheel(0, 1600); await page.waitForTimeout(2500);
      await page.screenshot({ path: path.join(OUT, `${name}-3.png`) });
    } catch (e) {
      console.log('=====', name, 'ERROR', e.message.split('\n')[0]);
    }
    await ctx.close();
  }
  await browser.close();
})();
