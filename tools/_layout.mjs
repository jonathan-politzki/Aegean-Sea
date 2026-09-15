import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import puppeteer from 'puppeteer-core';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const mime={'.js':'text/javascript','.html':'text/html','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.mp3':'audio/mpeg'};
const server=http.createServer((q,r)=>{const p=path.join(root,'site',decodeURIComponent(q.url.split('?')[0]));
 if(!fs.existsSync(p)||fs.statSync(p).isDirectory()){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream'});fs.createReadStream(p).pipe(r);});
await new Promise(r=>server.listen(0,r)); const port=server.address().port;
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
const page=await b.newPage(); await page.setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true});
await page.goto(`http://localhost:${port}/index.html`,{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,1200));
console.log(JSON.stringify(await page.evaluate(()=>{
  const R=s=>{const e=document.querySelector(s); if(!e) return null; const r=e.getBoundingClientRect();
    return {top:Math.round(r.top),bottom:Math.round(r.bottom),h:Math.round(r.height)};};
  return {viewport:window.innerHeight, masthead:R('.masthead'), frame:R('.frame'), main:R('.main'),
    stage:R('.stage'), reader:R('.reader'), navItems:document.querySelectorAll('.masthead nav a').length,
    sheetH:getComputedStyle(document.documentElement).getPropertyValue('--sheet-h').trim()};
}),null,1));
await b.close(); server.close();
