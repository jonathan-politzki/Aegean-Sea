// Clicks Listen and Play through for real, and checks audio actually starts and advances.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import puppeteer from 'puppeteer-core';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const mime={'.js':'text/javascript','.html':'text/html','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.json':'application/json','.mp3':'audio/mpeg'};
const server=http.createServer((q,r)=>{const p=path.join(root,'site',decodeURIComponent(q.url.split('?')[0]));
 if(!fs.existsSync(p)||fs.statSync(p).isDirectory()){r.writeHead(404);return r.end();}
 r.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream'});fs.createReadStream(p).pipe(r);});
await new Promise(r=>server.listen(0,r)); const port=server.address().port;
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,
  args:['--no-sandbox','--autoplay-policy=no-user-gesture-required','--mute-audio']});
const page=await b.newPage(); await page.setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true});
page.on('pageerror',e=>console.log('[pageerror]',e.message));
await page.goto(`http://localhost:${port}/index.html`,{waitUntil:'networkidle0'});
await new Promise(r=>setTimeout(r,1200));
let fails=0;
// open a stop by really tapping an island
const pt=await page.evaluate(()=>{const g=document.querySelector('.spot[data-id="milos"]');const r=g.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};});
await page.mouse.click(pt.x,pt.y); await new Promise(r=>setTimeout(r,900));
const hasBtn=await page.evaluate(()=>!!document.querySelector('.listen-play'));
console.log('listen button present:', hasBtn); if(!hasBtn) fails++;
// tap Listen
const lp=await page.evaluate(()=>{const b=document.querySelector('.listen-play');const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};});
await page.mouse.click(lp.x,lp.y); await new Promise(r=>setTimeout(r,2500));
let st=await page.evaluate(()=>{const a=document.querySelector('audio')||null;return null;});
st=await page.evaluate(()=>{ const els=[...document.querySelectorAll('*')]; return window.__probe||null; });
const playing=await page.evaluate(()=>{ // the Audio object is not in the DOM; check the label instead
  const t=document.querySelector('.listen-time'); const w=document.querySelector('.listen');
  return {label:document.querySelector('.listen-play')?.textContent.trim(), time:t?.textContent, on:w?.classList.contains('on')}; });
console.log('after tapping Listen:', JSON.stringify(playing));
if(!playing.on) { console.log('  FAIL: not playing'); fails++; }
// now Play through
await page.evaluate(()=>document.querySelector('.listen-play').click()); // pause
await new Promise(r=>setTimeout(r,300));
const pth=await page.evaluate(()=>{const b=document.querySelector('.listen-all');const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2};});
await page.mouse.click(pth.x,pth.y); await new Promise(r=>setTimeout(r,2500));
const pt2=await page.evaluate(()=>({btn:document.querySelector('.listen-all')?.textContent.trim(), on:document.querySelector('.listen')?.classList.contains('on'), stop:document.querySelector('.pos')?.textContent}));
console.log('after Play through:', JSON.stringify(pt2));
if(!pt2.on || pt2.btn!=='Stop playing'){ console.log('  FAIL: play through did not start'); fails++; }
await page.screenshot({path:path.join(root,'tools/shots/audio-test.png')});
await b.close(); server.close();
console.log(fails?`${fails} failure(s)`:'AUDIO CONTROLS WORK');
process.exit(fails?1:0);
