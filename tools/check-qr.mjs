// Decode the QR out of the rendered card PNGs, to be sure what will print actually scans.
import fs from 'node:fs'; import path from 'node:path';
import sharp from 'sharp'; import jsQR from 'jsqr';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const expected = fs.readFileSync(path.join(root, 'site/qr/url.txt'), 'utf8').trim();
let bad = 0;
for (const f of ['print/card-small.png', 'print/card-large.png', 'print/card-sheet.png', 'site/qr/qr.png']) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) { console.log('MISSING', f); bad++; continue; }
  const { data, info } = await sharp(p).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const res = jsQR(new Uint8ClampedArray(data), info.width, info.height);
  const ok = res && res.data === expected;
  console.log(ok ? 'OK  ' : 'FAIL', f, '->', res ? res.data : 'no QR found');
  if (!ok) bad++;
}
console.log(bad ? `${bad} problem(s)` : `all decode to ${expected}`);
process.exit(bad ? 1 : 0);
