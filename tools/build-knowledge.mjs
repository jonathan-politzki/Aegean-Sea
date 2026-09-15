// Compact the site's own content into one file the ask endpoint can ground answers on.
import fs from 'node:fs'; import path from 'node:path'; import vm from 'node:vm';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'site/content.js'), 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync(path.join(root, 'site/fishes.js'), 'utf8'), ctx);
const D = ctx.window.AEGEAN, F = ctx.window.AEGEAN_FISHES || [];
const byId = Object.fromEntries(D.places.map(p => [p.id, p]));

const places = D.places.map(p => `${p.modern} (on the 1683 plate: ${p.plate}; ancient: ${p.ancient})`).join('\n');
const stops = D.stops.map((s, i) => {
  const p = byId[s.place];
  return `[${i + 1}] ${p.modern}, ${s.era}. ${s.title}\n${s.text.join(' ')}${s.quote ? `\nQuotation: "${s.quote.text}" (${s.quote.cite})` : ''}`;
}).join('\n\n');
const fish = F.map(f => `${f.en} (${f.sci}; Greek ${f.el} ${f.translit}${f.ancient ? `; ancient ${f.ancient}` : ''}). ${f.description} Caught: ${f.fishing} Eaten: ${f.cooking} History: ${f.history}`).join('\n\n');

const text = `THE OBJECT
A copperplate engraving, "Les Isles de l'Archipel qui sont de l'Europe", figure LXXIV on page 169 of tome IV of Alain Manesson Mallet's Description de l'Univers, Paris, Denys Thierry, 1683. It shows the Aegean. It was printed months before the Morean War began.

PLACES MARKED ON THE PLATE
${places}

THE HISTORY, STOP BY STOP
${stops}

THE FISH
${fish}
`;
fs.mkdirSync(path.join(root, 'site/lib'), { recursive: true });
fs.writeFileSync(path.join(root, 'site/lib/knowledge.js'),
  'export const KNOWLEDGE = ' + JSON.stringify(text) + ';\n');
console.log('site/lib/knowledge.js', (text.length / 1024).toFixed(0), 'KB,', text.length.toLocaleString(), 'chars');
