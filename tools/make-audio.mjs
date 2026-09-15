// Narration for every stop, generated once and shipped with the site.
// No API key is needed at runtime; these are plain mp3 files.
//
//   node tools/make-audio.mjs --test          one short sample per candidate voice
//   node tools/make-audio.mjs --only 1,2,3    just those stops
//   node tools/make-audio.mjs                 everything missing
//   node tools/make-audio.mjs --force         everything, again
//
// Re-run after rewriting the prose. Only stops whose text changed are regenerated,
// which is tracked by a hash in site/audio/manifest.json.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const outDir = path.join(root, 'site/audio');
fs.mkdirSync(outDir, { recursive: true });

// --- key
const envFile = path.join(root, '.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error('No OPENAI_API_KEY. Put it in .env at the repo root.'); process.exit(1); }

const MODEL = process.env.TTS_MODEL || 'gpt-4o-mini-tts';
const VOICE = process.env.TTS_VOICE || 'onyx';
const INSTRUCTIONS = 'Read like a museum audio guide: unhurried, warm, curious, and plain. '
  + 'Let the facts carry the interest. Do not perform or dramatise. Pause a beat between paragraphs. '
  + 'Greek and French place names are pronounced naturally, not over-enunciated.';

// --- content
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'site/content.js'), 'utf8'), ctx);
const D = ctx.window.AEGEAN;
const byId = Object.fromEntries(D.places.map(p => [p.id, p]));

// Strip things that are for the eye, not the ear.
function speech(stop) {
  const place = byId[stop.place];
  const name = (place.label || place.modern).split(':')[0].split('(')[0].trim();
  const parts = [`${name}. ${stop.era}. ${stop.title}.`];
  for (const p of stop.text) parts.push(p);
  if (stop.quote) parts.push(`${stop.quote.text} That is ${stop.quote.cite.replace(/,\s*trans\..*$/, '')}.`);
  return parts.join('\n\n')
    .replace(/\s*\([^)]{0,80}\)/g, m => (/\d/.test(m) ? m : ''))  // drop short asides, keep dated ones
    .replace(/\s{2,}/g, ' ')
    .trim();
}

async function tts(text, file, voice = VOICE) {
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, voice, input: text, instructions: INSTRUCTIONS, response_format: 'mp3' }),
  });
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 300)}`);
  const raw = Buffer.from(await res.arrayBuffer());
  const tmp = file + '.raw.mp3';
  fs.writeFileSync(tmp, raw);
  // Re-encode small: speech is fine at 48k mono.
  try {
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', tmp, '-ac', '1', '-b:a', '48k', file]);
    fs.unlinkSync(tmp);
  } catch { fs.renameSync(tmp, file); }
  return fs.statSync(file).size;
}

function duration(file) {
  try {
    const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString();
    return Math.round(parseFloat(out));
  } catch { return null; }
}

const args = process.argv.slice(2);
const force = args.includes('--force');

if (args.includes('--test')) {
  const sample = speech(D.stops[0]).slice(0, 420);
  const voices = (process.env.TTS_VOICES || 'onyx,ash,sage,alloy').split(',');
  for (const v of voices) {
    const f = path.join(outDir, `_sample-${v}.mp3`);
    try { const n = await tts(sample, f, v); console.log(`${v.padEnd(8)} ${(n / 1024).toFixed(0)} KB  ${duration(f)}s  ${f}`); }
    catch (e) { console.log(`${v.padEnd(8)} FAILED ${e.message}`); }
  }
  console.log('\nListen, then set TTS_VOICE and run without --test.');
  process.exit(0);
}

const only = (args.find(a => a.startsWith('--only')) || '').split('=')[1]
  || (args.includes('--only') ? args[args.indexOf('--only') + 1] : null);
const pick = only ? new Set(only.split(',').map(n => parseInt(n, 10))) : null;

const manifestFile = path.join(outDir, 'manifest.json');
const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {};

let made = 0, skipped = 0, failed = 0, bytes = 0;
for (let i = 0; i < D.stops.length; i++) {
  const n = i + 1;
  if (pick && !pick.has(n)) continue;
  const text = speech(D.stops[i]);
  const hash = crypto.createHash('sha1').update(MODEL + VOICE + text).digest('hex').slice(0, 12);
  const key = `${D.stops[i].place}|${D.stops[i].title}`;
  const rel = `audio/stop-${String(n).padStart(2, '0')}.mp3`;
  const file = path.join(root, 'site', rel);
  if (!force && manifest[key]?.hash === hash && fs.existsSync(path.join(root, 'site', manifest[key].file))) {
    skipped++; bytes += fs.statSync(path.join(root, 'site', manifest[key].file)).size; continue;
  }
  process.stdout.write(`stop ${String(n).padStart(2)} ${D.stops[i].title.slice(0, 44).padEnd(46)}`);
  try {
    const size = await tts(text, file);
    const secs = duration(file);
    manifest[key] = { file: rel, hash, seconds: secs, chars: text.length, voice: VOICE, model: MODEL };
    bytes += size; made++;
    console.log(`${(size / 1024).toFixed(0)} KB  ${secs ? secs + 's' : ''}`);
  } catch (e) { failed++; console.log(`FAILED ${e.message}`); }
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 1));
}

fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 1));
const chars = Object.values(manifest).reduce((a, m) => a + (m.chars || 0), 0);
console.log(`\nmade ${made}, reused ${skipped}, failed ${failed}`);
console.log(`${(bytes / 1048576).toFixed(1)} MB total, ${chars.toLocaleString()} characters`);
console.log(`manifest: site/audio/manifest.json`);
