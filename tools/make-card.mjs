// Print-ready cards carrying the QR code, to go with the framed plate.
// Usage: node tools/make-card.mjs            (uses the URL in site/qr/url.txt)
//        node tools/make-card.mjs https://...
// Writes: print/card-small.pdf  (3.5 x 2 in, for the back of the frame)
//         print/card-large.pdf  (4 x 6 in, to hand over with the gift)
//         print/card-sheet.pdf  (US Letter, both cards with crop marks)
//         print/*.png           (previews)
//
// EDIT THE WORDS HERE. Everything else follows from them.
const TEXT = {
  eyebrow: 'Les Isles de l’Archipel qui sont de l’Europe',
  attribution: 'Alain Manesson Mallet · Paris, 1683',
  headline: 'Thirteen thousand years\nof fishing this sea',
  instruction: 'Point your phone at the code.\nThen point it at the map.',
  // The dedication prints only on the large card. Rewrite it in your own words.
  dedication:
    'Cole — you gave me a megalodon tooth and a book about an archipelago.\n'
    + 'Here is an archipelago, and every fish anyone has taken out of it.',
  signoff: '',
};

import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const outDir = path.join(root, 'print');
fs.mkdirSync(outDir, { recursive: true });

const url = process.argv[2] || fs.readFileSync(path.join(root, 'site/qr/url.txt'), 'utf8').trim();
const qrSvg = fs.readFileSync(path.join(root, 'site/qr/qr.svg'), 'utf8')
  .replace(/<\?xml[^>]*\?>/, '').replace(/<!DOCTYPE[^>]*>/, '')
  .replace('<svg ', '<svg class="qr" ');
const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const lines = s => esc(s).split('\n').join('<br>');

// The plate's own border: a thin outer rule and a heavier inner one.
const css = `
  @page { margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    background: #EDE6D6;
    color: #231F1A;
    font-family: 'Alegreya', Palatino, Georgia, serif;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .card { position: relative; width: 100%; height: 100vh; overflow: hidden; background: #EDE6D6; }
  .border { position: absolute; inset: 3mm; border: 0.4pt solid #231F1A; }
  .border::after { content: ''; position: absolute; inset: 1.2mm; border: 1.2pt solid #231F1A; }
  .inner { position: absolute; inset: 7mm; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  /* landscape: QR at the left, words at the right */
  .card.wide .inner { flex-direction: row; align-items: center; justify-content: center; gap: 4.5mm; inset: 6mm; }
  .card.wide .words { display: flex; flex-direction: column; align-items: center; text-align: center; }
  .card.wide .qrwrap { margin: 0; flex: none; }
  .card.wide .url { margin-top: 1.2mm; padding-top: 0; }
  .eyebrow {
    font-family: 'IM Fell English SC', Palatino, serif; font-size: var(--eyebrow); line-height: 1.25;
    letter-spacing: .01em; margin: 0;
  }
  .attribution {
    font-family: 'IM Fell English', Palatino, serif; font-style: italic; font-size: var(--attr);
    color: #5A5348; margin: .4mm 0 0;
  }
  .rule { width: 42%; height: 0; border-top: 0.5pt solid #231F1A; opacity: .5; margin: var(--rule-gap) 0; }
  .headline {
    font-family: 'IM Fell English', Palatino, serif; font-weight: 400; font-size: var(--headline);
    line-height: 1.12; margin: 0;
  }
  .qrwrap { margin: var(--qr-gap) 0 0; }
  .qr { display: block; width: var(--qr); height: var(--qr); }
  .instruction {
    font-family: 'IM Fell English', Palatino, serif; font-style: italic; font-size: var(--instr);
    line-height: 1.3; margin: var(--instr-gap) 0 0;
  }
  .dedication {
    font-family: 'IM Fell English', Palatino, serif; font-size: var(--ded); line-height: 1.45;
    margin: var(--ded-gap) 0 0; max-width: 80%;
  }
  .url { font-family: 'IM Fell English', Palatino, serif; font-size: var(--url); color: #5A5348; margin: var(--url-gap) 0 0; word-break: break-all; }
`;

const head = `<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&family=Alegreya:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
<style>${css}</style>`;

function card(vars, { dedication, wide }) {
  const v = Object.entries(vars).map(([k, x]) => `--${k}:${x}`).join(';');
  const words = `<p class="eyebrow">${lines(TEXT.eyebrow)}</p>
      <p class="attribution">${lines(TEXT.attribution)}</p>
      <div class="rule"></div>
      <h1 class="headline">${lines(TEXT.headline)}</h1>
      ${wide ? '' : `<div class="qrwrap">${qrSvg}</div>`}
      <p class="instruction">${lines(TEXT.instruction)}</p>
      ${dedication && TEXT.dedication ? `<p class="dedication">${lines(TEXT.dedication)}</p>` : ''}
      <p class="url">${esc(url.replace(/^https?:\/\//, ''))}</p>`;
  return `<div class="card${wide ? ' wide' : ''}" style="${v}">
    <div class="border"></div>
    <div class="inner">
      ${wide ? `<div class="qrwrap">${qrSvg}</div><div class="words">${words}</div>` : words}
    </div>
  </div>`;
}

const SMALL = { eyebrow: '4.6pt', attr: '4.4pt', headline: '8.5pt', instr: '5pt', ded: '6pt', url: '4pt', qr: '26mm', 'rule-gap': '1mm', 'qr-gap': '1.4mm', 'instr-gap': '1.2mm', 'ded-gap': '1.5mm', 'url-gap': '1mm' };
const LARGE = { eyebrow: '8pt', attr: '7.5pt', headline: '17pt', instr: '9pt', ded: '9.5pt', url: '6.5pt', qr: '40mm', 'rule-gap': '3.2mm', 'qr-gap': '4mm', 'instr-gap': '3.2mm', 'ded-gap': '5mm', 'url-gap': '6mm' };

const pages = [
  { name: 'card-small', w: '88.9mm', h: '50.8mm', px: [336, 192], html: card(SMALL, { dedication: false, wide: true }) },
  { name: 'card-large', w: '101.6mm', h: '152.4mm', px: [384, 576], html: card(LARGE, { dedication: true }) },
];

const sheet = `<style>
  body { background: #fff; }
  .sheet { width: 215.9mm; height: 279.4mm; padding: 14mm; background: #fff; }
  .slot { position: relative; margin: 0 auto 16mm; }
  .slot .card { position: relative; height: 100%; }
  .s1 { width: 88.9mm; height: 50.8mm; }
  .s2 { width: 101.6mm; height: 152.4mm; }
  .marks { position: absolute; inset: -6mm; pointer-events: none; }
  .marks i { position: absolute; background: #999; }
  .marks i.h { width: 4mm; height: 0.3pt; } .marks i.v { width: 0.3pt; height: 4mm; }
  .cap { font-family: 'Alegreya', serif; font-size: 7pt; color: #777; text-align: center; margin: 0 0 3mm; }
</style>
<div class="sheet">
  <p class="cap">Cut on the marks. Left: 3.5 &times; 2 in, for the back of the frame. Below: 4 &times; 6 in, to hand over.</p>
  <div class="slot s1">${card(SMALL, { dedication: false, wide: true })}${marks()}</div>
  <div class="slot s2">${card(LARGE, { dedication: true })}${marks()}</div>
</div>`;

function marks() {
  const c = [];
  for (const [y, v] of [['top', '6mm'], ['bottom', '6mm']]) {
    for (const x of ['left', 'right']) {
      c.push(`<i class="h" style="${y}:${v};${x}:0"></i><i class="v" style="${y}:0;${x}:${v}"></i>`);
    }
  }
  return `<div class="marks">${c.join('')}</div>`;
}

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true, args: ['--no-sandbox'],
});

for (const p of pages) {
  const page = await browser.newPage();
  await page.setContent(`<!doctype html><html><head>${head}</head><body>${p.html}</body></html>`, { waitUntil: 'networkidle0' });
  await page.pdf({ path: path.join(outDir, `${p.name}.pdf`), width: p.w, height: p.h, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.setViewport({ width: p.px[0], height: p.px[1], deviceScaleFactor: 3 });
  await page.screenshot({ path: path.join(outDir, `${p.name}.png`) });
  await page.close();
  console.log('wrote', `print/${p.name}.pdf`, `(${p.w} x ${p.h})`);
}

const page = await browser.newPage();
await page.setContent(`<!doctype html><html><head>${head}</head><body>${sheet}</body></html>`, { waitUntil: 'networkidle0' });
await page.pdf({ path: path.join(outDir, 'card-sheet.pdf'), format: 'Letter', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await page.setViewport({ width: 816, height: 1056, deviceScaleFactor: 2 });
await page.screenshot({ path: path.join(outDir, 'card-sheet.png') });
await page.close();
console.log('wrote print/card-sheet.pdf (US Letter, with crop marks)');
console.log('QR points at:', url);

await browser.close();
