import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import puppeteer from 'puppeteer-core';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const mime={'.js':'text/javascript','.html':'text/html','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.mind':'application/octet-stream'};
const server=http.createServer((req,res)=>{const p=path.join(root,'site',decodeURIComponent(req.url.split('?')[0]));
 if(!fs.existsSync(p)||fs.statSync(p).isDirectory()){res.writeHead(404);return res.end();}
 res.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream'});fs.createReadStream(p).pipe(res);});
await new Promise(r=>server.listen(0,r)); const port=server.address().port;
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,
 args:['--no-sandbox','--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',
 `--use-file-for-fake-video-capture=${path.join(root,'tools/shots/fakecam.y4m')}`,'--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const page=await b.newPage(); await page.setViewport({width:390,height:844,deviceScaleFactor:2,isMobile:true,hasTouch:true});
await page.evaluateOnNewDocument(()=>{window.__found=false;document.addEventListener('DOMContentLoaded',()=>{document.getElementById('anchor').addEventListener('targetFound',()=>{window.__found=true;});});});
await page.goto(`http://localhost:${port}/ar.html`,{waitUntil:'networkidle0'});
const t0=Date.now(); while(Date.now()-t0<60000 && !(await page.evaluate('window.__found'))) await new Promise(r=>setTimeout(r,500));
await new Promise(r=>setTimeout(r,1500));
console.log(JSON.stringify(await page.evaluate(()=>{
  const sc=document.querySelector('a-scene');
  const el=document.querySelector('.spot[data-id="milos"]');
  const v=new window.THREE.Vector3(); el.object3D.getWorldPosition(v); v.project(sc.camera);
  const c=sc.canvas.getBoundingClientRect();
  const x=c.left+(v.x+1)/2*c.width, y=c.top+(1-v.y)/2*c.height;
  const top=document.elementFromPoint(x,y);
  const stack=document.elementsFromPoint(x,y).map(e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&typeof e.className==='string'?'.'+e.className.trim().split(/\s+/).join('.'):''));
  const cam=document.querySelector('a-camera')||document.querySelector('[camera]');
  return {x:Math.round(x),y:Math.round(y),z:+v.z.toFixed(3),
    top: top? top.tagName.toLowerCase()+(top.id?'#'+top.id:''):null,
    stack: stack.slice(0,6),
    canvasRect:{w:Math.round(c.width),h:Math.round(c.height),l:Math.round(c.left),t:Math.round(c.top)},
    cursorAttr: cam? cam.getAttribute('cursor') : null,
    rayAttr: cam? JSON.stringify(cam.getAttribute('raycaster')).slice(0,160) : null,
    spots: document.querySelectorAll('.spot').length};
}),null,1));
await b.close(); server.close();
