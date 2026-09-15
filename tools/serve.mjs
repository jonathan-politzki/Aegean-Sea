// Local server that behaves like the deployed site: serves site/ and also runs the
// /api/ask function, so questions can be tested without deploying.
//   node tools/serve.mjs          -> http://127.0.0.1:8787
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const siteDir = path.join(root, 'site');
const PORT = Number(process.env.PORT || 8787);

for (const line of fs.existsSync(path.join(root, '.env')) ? fs.readFileSync(path.join(root, '.env'), 'utf8').split('\n') : []) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.mp3': 'audio/mpeg', '.mind': 'application/octet-stream', '.woff2': 'font/woff2',
};

let askHandler = null;
async function getAsk() {
  if (askHandler) return askHandler;
  const mod = await import(path.join(siteDir, 'api/ask.js') + `?v=${Date.now()}`);
  askHandler = mod.default;
  return askHandler;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === '/api/ask') {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 8e6) req.destroy(); });
    req.on('end', async () => {
      try {
        const handler = await getAsk();
        const fake = {
          _status: 200,
          status(c) { this._status = c; return this; },
          setHeader(k, v) { res.setHeader(k, v); },
          json(obj) { res.writeHead(this._status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); },
        };
        await handler({ method: req.method, headers: req.headers, body: body ? JSON.parse(body) : {} }, fake);
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Local function failed', detail: String(e.message || e) }));
      }
    });
    return;
  }

  if (pathname.endsWith('/')) pathname += 'index.html';
  let file = path.join(siteDir, pathname);
  if (!file.startsWith(siteDir)) { res.writeHead(403); return res.end(); }
  if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Not found: ' + pathname);
  }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`serving site/ on http://127.0.0.1:${PORT}`);
  console.log(process.env.OPENAI_API_KEY ? 'questions are live (key found in .env)' : 'no OPENAI_API_KEY, questions will be switched off');
});
