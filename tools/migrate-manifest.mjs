// Re-key the audio manifest from stop numbers to stable place|title keys, matching
// each existing file to its stop by the text hash that generated it.
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto'; import vm from 'node:vm';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const mf = path.join(root, 'site/audio/manifest.json');
const old = JSON.parse(fs.readFileSync(mf, 'utf8'));
if (Object.keys(old).some(k => k.includes('|'))) { console.log('already migrated'); process.exit(0); }
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'site/content.js'), 'utf8'), ctx);
const D = ctx.window.AEGEAN;
const byId = Object.fromEntries(D.places.map(p => [p.id, p]));
function speech(stop) {
  const place = byId[stop.place];
  const name = (place.label || place.modern).split(':')[0].split('(')[0].trim();
  const parts = [`${name}. ${stop.era}. ${stop.title}.`];
  for (const p of stop.text) parts.push(p);
  if (stop.quote) parts.push(`${stop.quote.text} That is ${stop.quote.cite.replace(/,\s*trans\..*$/, '')}.`);
  return parts.join('\n\n').replace(/\s*\([^)]{0,80}\)/g, m => (/\d/.test(m) ? m : '')).replace(/\s{2,}/g, ' ').trim();
}
const byHash = {};
for (const [k, v] of Object.entries(old)) if (v.hash) byHash[v.hash] = v;
const out = {}; let matched = 0, missing = [];
for (const stop of D.stops) {
  const h = crypto.createHash('sha1').update((old[Object.keys(old)[0]]?.model || 'gpt-4o-mini-tts') + (old[Object.keys(old)[0]]?.voice || 'onyx') + speech(stop)).digest('hex').slice(0, 12);
  const key = `${stop.place}|${stop.title}`;
  if (byHash[h]) { out[key] = byHash[h]; matched++; } else missing.push(stop.title.slice(0, 40));
}
fs.writeFileSync(mf, JSON.stringify(out, null, 1));
console.log(`re-keyed ${matched} of ${D.stops.length} stops`);
if (missing.length) console.log('no audio yet for:', missing.join(' | '));
