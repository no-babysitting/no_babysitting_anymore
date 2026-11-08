const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:740},deviceScaleFactor:2});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto('file://'+__dirname+'/readme-art.html'); await p.evaluate(()=>window.__ready); await p.waitForTimeout(1500);
  await p.locator('#hero').screenshot({path:'hero.png'});
  const w=p.locator('#water');
  for(let i=0;i<48;i++){ await w.screenshot({path:`w${String(i).padStart(3,'0')}.png`, scale:'css'}); await p.waitForTimeout(80); }
  console.log('errors:',errs.join(' | ')||'none'); await b.close();
})();
