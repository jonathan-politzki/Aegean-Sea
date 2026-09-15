// Render the hotspots onto the map image (static) to check placement.
import sharp from 'sharp'; import fs from 'node:fs'; import vm from 'node:vm';
const root = new URL('..', import.meta.url).pathname;
const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(root + 'site/content.js', 'utf8'), ctx);
const W = 884, H = 1348;
const els = ctx.window.AEGEAN.places.map(p => {
  const cx = p.x/100*W, cy = p.y/100*H, rx = p.rx/100*W, ry = p.ry/100*W;
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${p.rot?`transform="rotate(${p.rot} ${cx} ${cy})"`:''} fill="#4e9a8a" fill-opacity=".35" stroke="#a8402f" stroke-width="2"/>
  <line x1="${cx-6}" y1="${cy}" x2="${cx+6}" y2="${cy}" stroke="#a8402f" stroke-width="2"/><line x1="${cx}" y1="${cy-6}" x2="${cx}" y2="${cy+6}" stroke="#a8402f" stroke-width="2"/>
  <text x="${cx}" y="${cy-ry-4}" font-size="13" font-family="Helvetica" text-anchor="middle" fill="#a8402f" font-weight="bold">${p.id}</text>`;
}).join('');
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${els}</svg>`);
await sharp(root + 'site/assets/map.jpg').composite([{ input: svg }]).png().toFile(root + 'tools/shots/overlay.png');
console.log('ok');
