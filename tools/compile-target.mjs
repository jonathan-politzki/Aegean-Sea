// Compile the MindAR image target (site/targets/map.mind) using headless Chrome.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const mime = { '.js': 'text/javascript', '.html': 'text/html', '.jpg': 'image/jpeg', '.png': 'image/png', '.mind': 'application/octet-stream' };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': mime[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, r));
const port = server.address().port;

const html = `<!doctype html><html><body><script type="module">
import { Compiler } from '/tools/node_modules/mind-ar/dist/mindar-image.prod.js';
window.run = async () => {
  const img = new Image(); img.src = '/site/assets/map-target.jpg';
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
  const compiler = new Compiler();
  const t0 = performance.now();
  await compiler.compileImageTargets([img], p => { window.progress = p; });
  const buf = await compiler.exportData();
  const bytes = new Uint8Array(buf);
  let s = ''; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return { b64: btoa(s), ms: performance.now() - t0 };
};
window.ready = true;
</script></body></html>`;
fs.writeFileSync(path.join(root, 'tools', '_compile.html'), html);

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage();
page.on('console', m => console.log('[page]', m.text()));
page.on('pageerror', e => console.log('[pageerror]', e.message));
await page.goto(`http://localhost:${port}/tools/_compile.html`);
await page.waitForFunction('window.ready === true');
const tick = setInterval(async () => { try { const p = await page.evaluate('window.progress'); if (p) process.stdout.write(`\rprogress ${p.toFixed(1)}%   `); } catch {} }, 2000);
const { b64, ms } = await page.evaluate('window.run()');
clearInterval(tick);
const outFile = path.join(root, 'site', 'targets', 'map.mind');
fs.writeFileSync(outFile, Buffer.from(b64, 'base64'));
console.log(`\nwrote ${outFile} (${(fs.statSync(outFile).size/1024).toFixed(0)} KB) in ${(ms/1000).toFixed(1)}s`);
await browser.close(); server.close();
fs.unlinkSync(path.join(root, 'tools', '_compile.html'));
