// Real tap test for ar.html: finds the target, projects a hotspot to screen
// coordinates, and issues an actual click there — no synthetic .emit('click').
// Usage: node tools/test-ar-tap.mjs   [FEED=fakecam-glare.y4m]
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import puppeteer from 'puppeteer-core';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const mime = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.mind': 'application/octet-stream' };
const server = http.createServer((req, res) => {
  const p = path.join(root, 'site', decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': mime[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, r)); const port = server.address().port;

const feed = process.env.FEED || 'fakecam.y4m';
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true,
  args: ['--no-sandbox', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream',
    `--use-file-for-fake-video-capture=${path.join(root, 'tools/shots/', feed)}`,
    '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
page.on('pageerror', e => console.log('[pageerror]', e.message));
page.on('console', m => { const t = m.text(); if (!/GL Driver|Failed to load resource/.test(t)) console.log('[console]', t.slice(0, 200)); });
await page.evaluateOnNewDocument(() => {
  window.__found = false;
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('anchor').addEventListener('targetFound', () => { window.__found = true; });
  });
});
await page.goto(`http://localhost:${port}/ar.html`, { waitUntil: 'networkidle0' });

const t0 = Date.now();
while (Date.now() - t0 < 60000 && !(await page.evaluate('window.__found'))) await new Promise(r => setTimeout(r, 500));
if (!(await page.evaluate('window.__found'))) { console.log('FAIL: target never found'); await browser.close(); server.close(); process.exit(1); }
console.log('target found');
await new Promise(r => setTimeout(r, 1500));

let fails = 0;

// --- 1. tap the 3D hotspot itself, at its projected screen position
const target = 'milos';
const pos = await page.evaluate((id) => {
  const el = document.querySelector(`.spot[data-id="${id}"]`);
  if (!el || !el.object3D) return null;
  const scene = document.querySelector('a-scene');
  const cam = scene.camera;
  const v = new window.THREE.Vector3();
  el.object3D.getWorldPosition(v);
  v.project(cam);
  const c = scene.canvas.getBoundingClientRect();
  return { x: c.left + (v.x + 1) / 2 * c.width, y: c.top + (1 - v.y) / 2 * c.height, z: v.z };
}, target);

if (!pos || pos.z > 1) { console.log('FAIL: could not project hotspot', JSON.stringify(pos)); fails++; }
else {
  console.log(`tapping ${target} at ${pos.x.toFixed(0)},${pos.y.toFixed(0)}`);
  await page.mouse.click(pos.x, pos.y);
  await new Promise(r => setTimeout(r, 900));
  const open = await page.evaluate(() => {
    const r = document.getElementById('reader');
    return { open: r.classList.contains('open'), name: r.querySelector('.place-name')?.textContent || '' };
  });
  console.log(open.open ? `  reader opened: ${open.name}` : '  FAIL: reader did not open');
  if (!open.open) fails++;
  await page.screenshot({ path: path.join(root, 'tools/shots/ar-tap-3d.png') });
}

// --- 2. close, then tap a name in the strip
await page.evaluate(() => document.querySelector('#reader .close').click());
await new Promise(r => setTimeout(r, 600));
const chip = await page.evaluate(() => {
  const b = document.querySelector('#strip button[data-id="thera"]');
  if (!b) return null;
  b.scrollIntoView({ inline: 'center', block: 'nearest' });
  const r = b.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, h: r.height };
});
if (!chip) { console.log('FAIL: no strip button'); fails++; }
else {
  console.log(`tapping strip chip at ${chip.x.toFixed(0)},${chip.y.toFixed(0)} (height ${chip.h.toFixed(0)}px)`);
  await page.mouse.click(chip.x, chip.y);
  await new Promise(r => setTimeout(r, 900));
  const open = await page.evaluate(() => {
    const r = document.getElementById('reader');
    return { open: r.classList.contains('open'), name: r.querySelector('.place-name')?.textContent || '' };
  });
  console.log(open.open ? `  reader opened: ${open.name}` : '  FAIL: reader did not open from strip');
  if (!open.open) fails++;
  await page.screenshot({ path: path.join(root, 'tools/shots/ar-tap-strip.png') });
}

console.log(fails ? `${fails} failure(s)` : 'ALL TAPS WORK');
await browser.close(); server.close();
process.exit(fails ? 1 : 0);
