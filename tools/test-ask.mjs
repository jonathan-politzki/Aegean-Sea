// Calls the ask handler directly, the way Vercel would, with a typed question.
import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(new URL('..', import.meta.url).pathname);
for (const line of fs.readFileSync(path.join(root, '.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const { default: handler } = await import(path.join(root, 'site/api/ask.js'));
const questions = [
  ['How did they catch tuna at Byzantium?', 'bosporus'],
  ['What is the oldest thing on this map?', null],
  ['Who won the 1998 World Cup?', null],            // must refuse, not invent
];
for (const [text, place] of questions) {
  const res = { _s: 200, status(c) { this._s = c; return this; }, setHeader() {},
    json(o) { console.log(`\n[${this._s}] Q: ${text}`); console.log('A:', o.answer || o.error);
      console.log('   audio:', o.audio ? (o.audio.length / 1365).toFixed(0) + ' KB' : 'none'); } };
  await handler({ method: 'POST', headers: {}, body: { text, place } }, res);
}
