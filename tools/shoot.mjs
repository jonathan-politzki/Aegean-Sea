// Screenshot the site at phone and desktop sizes for review. Usage: node tools/shoot.mjs [page] [out-prefix]
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import puppeteer from 'puppeteer-core';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const page_ = process.argv[2] || 'index.html'; const prefix = process.argv[3] || 'shot';
const outDir = process.env.SHOT_DIR || path.join(root, 'tools', 'shots'); fs.mkdirSync(outDir, { recursive: true });
const mime = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.json': 'application/json', '.svg': 'image/svg+xml', '.mind': 'application/octet-stream' };
const server = http.createServer((req, res) => {
  const p = path.join(root, 'site', decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': mime[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, r)); const port = server.address().port;
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });
const shots = [['phone', 390, 844, 3], ['desktop', 1440, 900, 1]];
for (const [name, w, h, dpr] of shots) {
  const page = await browser.newPage(); await page.setViewport({ width: w, height: h, deviceScaleFactor: dpr, isMobile: name === 'phone', hasTouch: name === 'phone' });
  page.on('pageerror', e => console.log('[pageerror]', e.message)); page.on('console', m => { if (m.type() === 'error') console.log('[console]', m.text()); });
  await page.goto(`http://localhost:${port}/${page_}`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, `${prefix}-${name}.png`) });
  if (process.env.CLICK) { await page.evaluate(sel => document.querySelector(sel)?.dispatchEvent(new MouseEvent('click', { bubbles: true })), process.env.CLICK); await new Promise(r => setTimeout(r, 900)); await page.screenshot({ path: path.join(outDir, `${prefix}-${name}-clicked.png`) }); }
  await page.close();
}
await browser.close(); server.close(); console.log('shots in', outDir);
