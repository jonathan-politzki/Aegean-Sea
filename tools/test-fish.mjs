// Real clicks on the fish rows: everything must start closed, one click opens only
// that row, a second click closes it, and the deep link opens the right one.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import puppeteer from 'puppeteer-core';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const mime={'.js':'text/javascript','.html':'text/html','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.mp3':'audio/mpeg'};
const server=http.createServer((q,r)=>{const p=path.join(root,'site',decodeURIComponent(q.url.split('?')[0]));
 if(!fs.existsSync(p)||fs.statSync(p).isDirectory()){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream'});fs.createReadStream(p).pipe(r);});
await new Promise(r=>server.listen(0,r)); const port=server.address().port;
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
let fails=0;
const visible = sel => `(() => { const e=document.querySelector('${sel}'); if(!e) return null; const s=getComputedStyle(e); const r=e.getBoundingClientRect(); return s.display!=='none' && r.height>0; })()`;
for (const [name,w,h,mobile] of [['phone',390,844,true],['desktop',1440,900,false]]) {
  const page=await b.newPage(); await page.setViewport({width:w,height:h,deviceScaleFactor:2,isMobile:mobile,hasTouch:mobile});
  page.on('pageerror',e=>{console.log('[pageerror]',e.message);fails++;});
  await page.goto(`http://localhost:${port}/fishes.html`,{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,900));
  const openAtStart = await page.evaluate(()=>[...document.querySelectorAll('.fish-body')].filter(e=>getComputedStyle(e).display!=='none').length);
  console.log(`${name}: rows open on load: ${openAtStart} (want 0)`); if(openAtStart!==0) fails++;
  // click the bonito row for real
  const pt=await page.evaluate(()=>{const h=document.querySelector('#bonito .fish-head');h.scrollIntoView({block:'center'});const r=h.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};});
  await page.mouse.click(pt.x,pt.y); await new Promise(r=>setTimeout(r,450));
  const afterOpen = await page.evaluate(()=>({
    thisOpen: getComputedStyle(document.querySelector('#bonito .fish-body')).display!=='none',
    totalOpen: [...document.querySelectorAll('.fish-body')].filter(e=>getComputedStyle(e).display!=='none').length,
    aria: document.querySelector('#bonito .fish-head').getAttribute('aria-expanded'),
    h: Math.round(document.querySelector('#bonito .fish-body').getBoundingClientRect().height)}));
  console.log(`${name}: after click -> open=${afterOpen.thisOpen} total=${afterOpen.totalOpen} aria=${afterOpen.aria} height=${afterOpen.h}px`);
  if(!afterOpen.thisOpen || afterOpen.totalOpen!==1 || afterOpen.aria!=='true' || afterOpen.h<100) fails++;
  await page.screenshot({path:path.join(root,'tools/shots',`fish-open-${name}.png`)});
  // click again to close
  const pt2=await page.evaluate(()=>{const h=document.querySelector('#bonito .fish-head');h.scrollIntoView({block:'center'});const r=h.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};});
  await page.mouse.click(pt2.x,pt2.y); await new Promise(r=>setTimeout(r,450));
  const afterClose = await page.evaluate(()=>({open:[...document.querySelectorAll('.fish-body')].filter(e=>getComputedStyle(e).display!=='none').length,
    aria:document.querySelector('#bonito .fish-head').getAttribute('aria-expanded')}));
  console.log(`${name}: after second click -> open=${afterClose.open} aria=${afterClose.aria}`);
  if(afterClose.open!==0 || afterClose.aria!=='false') fails++;
  // deep link
  await page.goto(`http://localhost:${port}/fishes.html#octopus`,{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,700));
  const deep=await page.evaluate(()=>({open:[...document.querySelectorAll('.fish-body')].filter(e=>getComputedStyle(e).display!=='none').length,
    which:document.querySelector('.fish.open')?.id}));
  console.log(`${name}: #octopus -> open=${deep.open} which=${deep.which}`);
  if(deep.open!==1 || deep.which!=='octopus') fails++;
  await page.close();
}
await b.close(); server.close();
console.log(fails?`${fails} failure(s)`:'FISH ROWS WORK');
process.exit(fails?1:0);
