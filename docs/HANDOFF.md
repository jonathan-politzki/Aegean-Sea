# Handoff plan — finishing the Aegean gift site

Repo: /Users/jonathanpolitzki/Desktop/Coding/Aegean-Sea. Read README.md first. No build step; the site is static in `site/`.
All text must stay factually sourced. Never invent a date, number, name or quotation. When unsure, soften the sentence and cite the dossier.

## State (2026-09-15)
- `site/content.js`: 26 hotspots, 35 chronological stops, every stop has sources. Prose is DRAFT (Jonathan will rewrite).
- `site/index.html` (plate + tour), `site/plate.html` (essay), `site/fishes.html` (species page, renders `window.AEGEAN_FISHES`), `site/ar.html` (MindAR; target `site/targets/map.mind` verified by `node tools/test-ar.mjs`).
- `site/fishes.js` is an empty stub until `tools/build-fishes.mjs` runs.
- Research dossiers in `research/01..05-*.md`. Two more files are being produced by background agents:
  - `research/QA-stops.md` — fact-check of content.js against the dossiers
  - `research/species.json` + `research/06-species.md` — species guide with Commons images

## Task A — apply the fact-check (needs research/QA-stops.md)
1. Read `research/QA-stops.md` fully.
2. For every FIX: edit the exact sentence in `site/content.js` using the dossier's wording; keep the same paragraph structure. For every CHECK: soften ("reportedly", "according to X", or delete) and make sure the `sources` array still supports the paragraph. For any claim the QA says appears in NO dossier: delete it or replace it with a dossier-supported sentence. Fix quotation wording to match the dossier verbatim. Fix chronological ordering by reordering entries in `stops` (era ascending).
3. Validate: `node -e "global.window={}; require('./site/content.js'); const D=window.AEGEAN; const ids=new Set(D.places.map(p=>p.id)); D.stops.forEach(s=>{ if(!ids.has(s.place)) throw new Error('bad place '+s.place)}); console.log(D.stops.length,'stops ok')"`.
4. Append a short section "QA applied" to `research/QA-stops.md` listing what was changed and what was left (with reasons).

## Task B — build the species page (needs research/species.json)
1. `node tools/build-fishes.mjs` (downloads Commons images to `site/assets/fish/`, writes `site/fishes.js`). If a download fails, note which; do not substitute images from non-Commons sources.
2. Validate the licences printed by the script: only Public domain / CC0 / CC BY / CC BY-SA are acceptable. If an entry's licence is anything else (CC BY-NC, ND, fair use, unknown), remove its `image` field from `research/species.json`, delete the downloaded file, rerun the script.
3. Cross-link: in `site/content.js`, add `fishes: ["id", ...]` arrays to stops where a species is discussed, using ids from species.json (e.g. bluefin tuna at Franchthi/Saliagos/Byzantium stops, dolphinfish at Akrotiri, octopus at Minoan Crete, eel at the Athens fish-market stop, sponge at the diving stops, monk seal at the marine park stop, lionfish at the last stop). Only link where the stop text actually mentions the animal.
4. Screenshot: `node tools/shoot.mjs fishes.html fish` then look at `tools/shots/fish-phone.png` and `fish-desktop.png`. Fix layout problems in `site/styles.css` (section "the fish"). Images must not overflow; captions must show author + licence + Commons link.
5. Add a draft notice at the top of the fish page like the one on plate.html (class `draft`), stating the text is drafted from research/06-species.md.

## Task C — final checks (after A and B)
1. `node tools/shoot.mjs index.html final` and `CLICK='.spot[data-id="thera"]' node tools/shoot.mjs index.html final-thera`; look at the PNGs; confirm nothing is broken on phone and desktop.
2. `node tools/test-ar.mjs` must print `TARGET FOUND`.
3. `node tools/debug-overlay.mjs` and look at `tools/shots/overlay.png`; every hotspot ellipse should sit on its island.
4. Do NOT deploy and do NOT git commit/push. Jonathan decides that. Deploy is `tools/deploy.sh` (Vercel, then regenerates the QR).
5. Write `docs/STATUS.md`: what was done, what remains, and a list of every sentence still marked draft/uncertain that Jonathan should personally review.

## Acceptance
- No console errors on any page (shoot.mjs prints `[console]`/`[pageerror]` lines; only the favicon 404 is acceptable).
- Every stop still has ≥1 source; every fish entry has an image with a permissive licence or no image.
- Stops in ascending chronological order.
