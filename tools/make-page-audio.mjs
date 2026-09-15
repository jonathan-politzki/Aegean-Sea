// Narration for the pages that are not the map: one walkthrough per prose page,
// and one short recording per species on the fish page.
//
//   node tools/make-page-audio.mjs            everything missing
//   node tools/make-page-audio.mjs --force    everything, again
//   node tools/make-page-audio.mjs --pages    just the prose pages
//   node tools/make-page-audio.mjs --fish     just the species
//
// Page scripts are taken from what the page actually says, read out of the rendered
// page itself, so they cannot drift from the writing. Tables, captions and source
// lists are left out, because nobody wants a table read aloud.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import crypto from 'node:crypto';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import puppeteer from 'puppeteer-core';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const outDir = path.join(root, 'site/audio');
fs.mkdirSync(outDir, { recursive: true });

for (const line of fs.existsSync(path.join(root, '.env')) ? fs.readFileSync(path.join(root, '.env'), 'utf8').split('\n') : []) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error('No OPENAI_API_KEY in .env'); process.exit(1); }
const MODEL = process.env.TTS_MODEL || 'gpt-4o-mini-tts';
const VOICE = process.env.TTS_VOICE || 'onyx';
const INSTRUCTIONS = 'Read like a museum audio guide: unhurried, warm, curious, and plain. '
  + 'Let the facts carry the interest. Do not perform or dramatise. Pause a beat between paragraphs. '
  + 'Greek and French place names are pronounced naturally, not over-enunciated.';

async function tts(text, file) {
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, voice: VOICE, input: text, instructions: INSTRUCTIONS, response_format: 'mp3' }),
  });
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
  const tmp = file + '.raw';
  fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
  try { execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmp, '-ac', '1', '-b:a', '48k', file]); fs.unlinkSync(tmp); }
  catch { fs.renameSync(tmp, file); }
  return fs.statSync(file).size;
}
const duration = f => {
  try { return Math.round(parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString())); }
  catch { return null; }
};

const args = process.argv.slice(2);
const force = args.includes('--force');
const doPages = !args.includes('--fish');
const doFish = !args.includes('--pages');

const manifestFile = path.join(outDir, 'manifest.json');
const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {};
let made = 0, skipped = 0, failed = 0;

async function emit(key, rel, text) {
  const hash = crypto.createHash('sha1').update(MODEL + VOICE + text).digest('hex').slice(0, 12);
  const file = path.join(root, 'site', rel);
  if (!force && manifest[key]?.hash === hash && fs.existsSync(file)) { skipped++; return; }
  process.stdout.write(`${key.padEnd(30)}`);
  try {
    const size = await tts(text, file);
    const secs = duration(file);
    manifest[key] = { file: rel, hash, seconds: secs, chars: text.length, voice: VOICE, model: MODEL };
    made++;
    console.log(`${(size / 1024).toFixed(0)} KB  ${secs ?? '?'}s`);
  } catch (e) { failed++; console.log(`FAILED ${e.message}`); }
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 1));
}

// ---- prose pages, read from the rendered page
if (doPages) {
  const mime = { '.js': 'text/javascript', '.html': 'text/html', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
  const server = http.createServer((q, r) => {
    const p = path.join(root, 'site', decodeURIComponent(q.url.split('?')[0]));
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { r.writeHead(404); return r.end(); }
    r.writeHead(200, { 'Content-Type': mime[path.extname(p)] || 'application/octet-stream' });
    fs.createReadStream(p).pipe(r);
  });
  await new Promise(r => server.listen(0, r));
  const port = server.address().port;
  const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--no-sandbox'] });

  const pages = [
    ['overview', 'overview.html'],
    ['name', 'poulos.html'],
    ['map', 'plate.html'],
  ];
  for (const [slug, file] of pages) {
    if (!fs.existsSync(path.join(root, 'site', file))) { console.log(`${slug}: no ${file}, skipped`); continue; }
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}/${file}`, { waitUntil: 'networkidle0' });
    const text = await page.evaluate(() => {
      const main = document.querySelector('main') || document.body;
      const clone = main.cloneNode(true);
      clone.querySelectorAll('table, .tablewrap, ol.notes, .srcs, figcaption, .fish-index, nav, .listen, .page-listen').forEach(e => e.remove());
      return clone.innerText.replace(/\n{2,}/g, '\n\n').trim();
    });
    await page.close();
    if (text.length < 80) { console.log(`${slug}: too little text, skipped`); continue; }
    await emit(`page|${slug}`, `audio/page-${slug}.mp3`, text);
  }
  await browser.close(); server.close();
}

// ---- one short recording per species
if (doFish) {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'site/fishes.js'), 'utf8'), ctx);
  const F = ctx.window.AEGEAN_FISHES || [];
  const trim = (s, n) => {
    if (!s) return '';
    s = String(s).replace(/\s*\([^)]*\)/g, '').replace(/\s{2,}/g, ' ').trim();
    if (s.length <= n) return s;
    const cut = s.slice(0, n);
    return cut.slice(0, Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; ')) + 1) || cut;
  };
  for (const f of F) {
    const parts = [
      `${f.en}. In Greek, ${f.translit}.${f.ancient ? ` To the ancients, ${String(f.ancient).replace(/[^\x20-\x7E]/g, '').replace(/\s{2,}/g, ' ').trim()}.` : ''}`,
      trim(f.description, 420),
      trim(f.fishing, 300),
      trim(f.cooking, 220),
      trim(f.history, 420),
    ].filter(Boolean);
    await emit(`fish|${f.id}`, `audio/fish-${f.id}.mp3`, parts.join('\n\n'));
  }
}

fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 1));
console.log(`\nmade ${made}, reused ${skipped}, failed ${failed}`);
