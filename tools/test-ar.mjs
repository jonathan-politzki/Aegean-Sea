// Feed Chrome a fake camera (a video of the *other* photo of the print) and check MindAR finds the target.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import puppeteer from 'puppeteer-core';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const mime = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.mind': 'application/octet-stream' };
const server = http.createServer((req, res) => {
  const p = path.join(root, 'site', decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': mime[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, r)); const port = server.address().port;
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true,
  args: ['--no-sandbox', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-video-capture=${path.join(root, 'tools/shots/' + (process.env.FEED || 'fakecam.y4m'))}`, '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage(); await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
page.on('pageerror', e => console.log('[pageerror]', e.message));
page.on('console', m => { const t = m.text(); if (!/GL Driver|Failed to load resource/.test(t)) console.log('[console]', t.slice(0, 160)); });
await page.evaluateOnNewDocument(() => {
  window.__events = [];
  document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene'); const anchor = document.getElementById('anchor');
    ['arReady', 'arError'].forEach(ev => scene.addEventListener(ev, () => window.__events.push([ev, performance.now()])));
    ['targetFound', 'targetLost'].forEach(ev => anchor.addEventListener(ev, () => window.__events.push([ev, performance.now()])));
  });
});
await page.goto(`http://localhost:${port}/ar.html`, { waitUntil: 'networkidle0' });
const t0 = Date.now();
let found = false;
while (Date.now() - t0 < 60000) {
  const ev = await page.evaluate('window.__events');
  if (ev.some(e => e[0] === 'targetFound')) { found = true; break; }
  await new Promise(r => setTimeout(r, 1000));
}
await page.screenshot({ path: path.join(root, 'tools/shots/ar-tracking' + (process.env.TAG ? '-' + process.env.TAG : '') + '.png') });
if (found) { await page.evaluate(() => document.querySelector('.spot[data-id="milos"]')?.emit('click')); await new Promise(r => setTimeout(r, 800)); await page.screenshot({ path: path.join(root, 'tools/shots/ar-tracking' + (process.env.TAG ? '-' + process.env.TAG : '') + '-clicked.png') }); }
console.log(found ? 'TARGET FOUND' : 'target NOT found in 60s', 'events=', JSON.stringify((await page.evaluate('window.__events')).map(e => [e[0], Math.round(e[1])])));
await browser.close(); server.close();
