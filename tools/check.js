const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const DS = process.argv[2];
const H = process.argv[3];
const css = fs.readFileSync(path.join(H, 'tokens.css'), 'utf8');
const bcss = fs.existsSync(path.join(DS, 'components', 'bundle.css')) ? fs.readFileSync(path.join(DS, 'components', 'bundle.css'), 'utf8') : '';
const bjs = fs.existsSync(path.join(DS, 'components', 'bundle.js')) ? fs.readFileSync(path.join(DS, 'components', 'bundle.js'), 'utf8') : '';
const ONLY = process.argv[4] && process.argv[4] !== 'all' ? process.argv[4].split(',') : null;
const WIDTHS = (process.argv[5] || '1000').split(',').map(Number);

(async () => {
  const browser = await chromium.launch();
  const comps = fs.readdirSync(path.join(DS, 'components'));
  for (const W of WIDTHS) for (const theme of ['dark', 'light']) {
    for (const c of comps) {
      const f = path.join(DS, 'components', c, 'preview.html');
      if (!fs.existsSync(f)) continue;
      if (ONLY && !ONLY.includes(c)) continue;
      const html = fs.readFileSync(f, 'utf8')
        .replace('<head>', `<head><style>${css}</style><style>${bcss}</style><script>${bjs}</script>`)
        .replace('<html lang="vi">', `<html lang="vi" data-theme="${theme}">`);
      const tmp = path.join(H, `${c}-${theme}.html`);
      fs.writeFileSync(tmp, html);
      const page = await browser.newPage({ viewport: { width: W, height: 1000 }, deviceScaleFactor: 1 });
      const errs = [];
      page.on('pageerror', e => errs.push('pageerror: ' + e.message));
      page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
      await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500);
      const tag = W === 1000 ? theme : `${theme}-${W}`;
      await page.screenshot({ path: path.join(H, 'shots', `${c}-${tag}-0.png`) });
      const btns = await page.$$('button');
      for (const b of btns) {
        try { if (await b.isVisible() && await b.isEnabled()) { await b.click({ timeout: 1000 }); await page.keyboard.press('Escape'); } }
        catch (e) { errs.push('click: ' + e.message.split('\n')[0]); }
      }
      if (c === 'PredictPrompt') {
        await page.reload({ waitUntil: 'networkidle' });
        await page.click('label.opt:nth-of-type(3)');
        await page.click('#commit');
      }
      await page.waitForTimeout(1600);
      const gsapOk = await page.evaluate(() => !!window.gsap);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      await page.screenshot({ path: path.join(H, 'shots', `${c}-${tag}.png`), fullPage: true });
      console.log(`${String(W).padEnd(5)}${theme.padEnd(6)}${c.padEnd(18)} gsap:${gsapOk} hscroll:${overflow} ${errs.length ? 'ERR ' + errs.join(' | ') : 'ok'}`);
      await page.close();
    }
  }
  await browser.close();
})();
