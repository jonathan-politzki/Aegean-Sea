// Real tap test for index.html: clicks the actual screen position of an island,
// and checks a drag does NOT select. No synthetic events.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import puppeteer from 'puppeteer-core';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const mime={'.js':'text/javascript','.html':'text/html','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{const p=path.join(root,'site',decodeURIComponent(req.url.split('?')[0]));
 if(!fs.existsSync(p)||fs.statSync(p).isDirectory()){res.writeHead(404);return res.end();}
 res.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream'});fs.createReadStream(p).pipe(res);});
await new Promise(r=>server.listen(0,r)); const port=server.address().port;
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
let fails=0;
for (const [name,w,h,mobile] of [['phone',390,844,true],['desktop',1440,900,false]]) {
  const page=await b.newPage(); await page.setViewport({width:w,height:h,deviceScaleFactor:2,isMobile:mobile,hasTouch:mobile});
  page.on('pageerror',e=>{console.log('[pageerror]',e.message); fails++;});
  await page.goto(`http://localhost:${port}/index.html`,{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,1400));
  const pt = await page.evaluate(()=>{
    const g=document.querySelector('.spot[data-id="crete"]'); const r=g.getBoundingClientRect();
    return {x:r.left+r.width/2, y:r.top+r.height/2};
  });
  await page.mouse.click(pt.x, pt.y);
  await new Promise(r=>setTimeout(r,800));
  let got = await page.evaluate(()=>document.querySelector('.place-name')?.textContent||'');
  console.log(`${name}: tap at ${pt.x.toFixed(0)},${pt.y.toFixed(0)} -> ${got||'(nothing)'}`);
  if(!/Crete/i.test(got)) fails++;
  // a drag across an island must pan, not select
  const before = await page.evaluate(()=>document.querySelector('.place-name')?.textContent||'');
  const pt2 = await page.evaluate(()=>{const g=document.querySelector('.spot[data-id="thasos"]');const r=g.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};});
  await page.mouse.move(pt2.x, pt2.y); await page.mouse.down();
  for (let i=1;i<=6;i++) await page.mouse.move(pt2.x - i*12, pt2.y - i*5);
  await page.mouse.up();
  await new Promise(r=>setTimeout(r,600));
  const after = await page.evaluate(()=>document.querySelector('.place-name')?.textContent||'');
  const dragOk = after === before;
  console.log(`${name}: drag across an island -> ${dragOk?'panned, no selection':'WRONGLY selected '+after}`);
  if(!dragOk) fails++;
  await page.screenshot({path:path.join(root,'tools/shots',`maptap-${name}.png`)});
  await page.close();
}
await b.close(); server.close();
console.log(fails?`${fails} failure(s)`:'MAP TAPS WORK');
process.exit(fails?1:0);
