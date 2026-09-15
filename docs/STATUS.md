# Status — the Aegean gift site

Written 2026-09-15 at the end of the finishing pass (Tasks A, B and C of `docs/HANDOFF.md`).
Nothing has been deployed and nothing has been committed. That is yours to decide.

## What was done

**Task A — the fact-check applied.** Every FIX in `research/QA-stops.md` was applied to `site/content.js`,
every CHECK was softened or cut, and four stops were moved so the walk runs earliest to latest.
The full, sentence-by-sentence list of what changed and what was deliberately left is appended to
`research/QA-stops.md` as section 7, "QA applied". Plate geography was corrected from the plate image:
Lesbos is drawn (unlabelled) on the Asian shore and keeps its hotspot; Constantinople is *not* on the sheet,
so the `bosporus` hotspot now reads "Toward the Hellespont and Byzantium" and the stop says the city lies off
the plate; Aegina's label is "Ingia"; and the Delos hotspot was moved off Mallet's ghost island "Sirna" onto
the islets west of Micone.

**Task B — the species page.** `research/species.json` (26 entries) was built into `site/fishes.js` and
`site/assets/fish/` by `node tools/build-fishes.mjs`. All 26 have an image. All 26 licences are permissive —
Public domain, CC0, CC BY or CC BY-SA — so nothing had to be removed. Each caption carries author, licence
and a link to the Commons file page. Cross-links were added: 23 of the 35 stops now carry a `fishes: [...]`
array, and only where the stop's own text names the animal. A draft notice was added at the top of the
fish page, in the style of the one on `plate.html`.

**Task C — checks.** All pass:

| Check | Result |
|---|---|
| `node tools/test-ar.mjs` | `TARGET FOUND` (arReady 4.1 s, targetFound 4.3 s) |
| `node tools/debug-overlay.mjs` | every ellipse sits on its island in `tools/shots/overlay.png` |
| `node tools/shoot.mjs index.html final` | phone and desktop clean |
| `CLICK='.spot[data-id="thera"]' … final-thera` | stop opens, reads "Stop 8 of 35" |
| `node tools/shoot.mjs fishes.html fish` | no overflow at 390 px or 1440 px; 26 images, 26 Commons links |
| Console errors | none on any of index / fishes / plate / ar, except the favicon 404 |
| Every stop has ≥1 source | yes (35 of 35) |
| Stops ascending | yes, with the two soft spots noted below |

## Files touched

- `site/content.js` — all of Task A, plus the `fishes` cross-links.
- `site/fishes.js`, `site/assets/fish/*.jpg` — generated (3.4 MB of images).
- `site/fishes.html` — draft notice added.
- `site/styles.css` — one rule, so the draft notice reads on the dark fish page.
- `research/species.json` — see "Research-voice wording" below.
- `research/QA-stops.md` — section 7 appended.
- `tools/build-fishes.mjs` — Commons rate-limits anonymous API calls (HTTP 429) and the script was silently
  dropping 16 of the 26 entries. It now honours `retry-after` and pauses between entries. Same output, no
  other behaviour change.

## What remains — sentences you should personally review

The prose is still a draft. These are the places where a claim was **softened rather than fixed**, i.e. the
sentence now says less than it used to because the dossier would not carry the stronger version. Each is a
candidate for cutting outright when you rewrite:

1. **Stop 1, Milos** — "on Kythnos in the ninth millennium and on Youra soon after". No dossier dates the
   Youra obsidian; "soon after" is the hedge.
2. **Stop 3, Cave of the Cyclops** — "the oldest fish hooks yet found in the Aegean" and "one of the longest
   documented histories in the Aegean". Both are inferences from the dossier, not statements in it.
3. **Stop 4, Franchthi** — "whose 1996 book remains the reference". Editorial.
4. **Stop 8, Akrotiri** — "The identification is not certain: it is the standard reading, not a settled one."
   The Greek names kynigos/lampouka are now sourced to the species guide; the species identification is not.
5. **Stop 12, Kythera** — era changed from "antiquity" to "5th century BC – 2nd century AD", built from its
   witnesses (Archippus, Pliny, Pausanias) rather than from a dossier statement.
6. **Stop 13, Athens** — "the people of Halai, probably the Attic coastal deme". The identification is only
   MEDIUM. Also "Poisoning the water was already worth forbidding in the fourth century BC", which is an
   inference from Plato's ban.
7. **Stop 14, Archestratus** — "Athenaeus, book 7" instead of a page number; the dossier's "c. 7.320f" was
   too approximate to print as a citation.
8. **Stop 15, Aristotle** — era "c. 345–343 BC" (the years are conventional) and "usually identified with
   today's Gulf of Kalloni" (the identification is disputed).
9. **Stop 16, Byzantium** — era **600–300 BC**, but the paragraph still quotes Polybius (2nd century BC) and
   Strabo (c. AD 20). Strabo is now introduced as "writing centuries later". If you want the era airtight,
   the Strabo paragraph belongs in a Roman stop.
10. **Stop 19, Delos** — "on one scholar's estimate". The 18–36 kg figure comes from a summary of Lytle's
    study rather than the study.
11. **Stop 20, Roman Crete** — "has been excavated so far". It is a negative finding from one research pass,
    not a settled absence.
12. **Stop 21, Oppian/Aelian** — "the earliest description of pyrofani placed in Aegean waters". Oppian and
    Plato describe fire-fishing earlier; the Aegean qualifier is doing the work.
13. **Stop 24, Thévenot** — "the earliest modern witness we have".
14. **Stop 26, Tournefort** — "Kaloyeros, Cheiro — probably Keros — Schinoussa". Tournefort's "Cheiro" is
    only probably Keros; confirm before printing, or drop the gloss.
15. **Stop 28, Hydra/Spetses** — "Psara, by most accounts, was third" (LOW) and "The fishing boat of these
    islands, the trechandiri … is said by tradition". No period source names a trechandiri before 1820.
16. **Stop 29, the diving suit** — "Aegina's waters among them". The dossier says only "Saronic Gulf islands";
    this stop is pinned to Aegina on the plate, which is a weaker link than the text implies.
17. **Stop 30, Skiathos** — "is said to have built boats for seven generations" and "By one account, from the
    1920s…". Both rest on a travel blog and a magazine piece.
18. **Stop 31, the refugees** — "Some were fishing people … and in three documented places they changed how
    Greece fished". The general claim has no academic treatment in the dossiers.
19. **Stop 34, the marine park** — "for three decades the largest marine protected area in Europe". The
    original "still the largest" is a Wikipedia line that the 2025 parks in stop 35 would overturn anyway.
20. **Stop 35, the close** — "for at least thirteen thousand years, and only in the last few decades has
    anyone tried, in earnest, to fish it less." This is the last sentence of the walk and the one most worth
    writing in your own voice.

### Two chronology soft spots, left deliberately
- **Minoan Crete (c. 2000–1450 BC)** still follows Phylakopi (16th century BC) and Akrotiri (c. 1600–1540 BC).
  Its end date is the latest of the three and its closing line carries the walk into Homer, so it was left as
  a section closer rather than moved. Move it before Phylakopi if you want strict start-date order.
- **The syrmata of Klima ("20th century")** sits between 1922–1923 and 1966–2026. The only date in the dossier
  for Klima is a LOW "1920s", which was judged too weak to print as the era.

### Research-voice wording in the species data
`research/species.json` carried working notes into what is now published prose — "SeaLifeBase not fetched this
session", "VERIFIED CLAIMS.", "not read this session", "read on Perseus". About thirty of these were rewritten
into the reader's voice, keeping the hedge and dropping the reference to the research process (for example
"(general reference values; SeaLifeBase not fetched this session)" became "(general reference values)"). The
underlying claims were not changed. `research/06-species.md` itself was not touched, so the dossier and the
JSON now differ in tone in these places.

### Smaller things
- The species entries are long and uneven — some `history` fields run to a paragraph of quotation. They read
  as research notes rather than gift prose. Worth a pass if you want the fish page to match the tour.
- There is no favicon, so every page logs one 404. Harmless, and the only console error anywhere.
- The `bosporus` hotspot sits in the top-right corner but now names something off the sheet. If that reads
  oddly on the wall, the alternative is to drop the hotspot and fold Byzantium into a note.

## Printing

The physical side of the gift was built in parallel and lives in `print/`, generated by `tools/make-card.mjs`
(3.5×2 in card for the back of the frame, 4×6 in card to hand over, and a US Letter sheet with crop marks).
`tools/check-qr.mjs` decodes the QR back out of the rendered art to prove it scans.

- **The wording is edited in the `TEXT` block at the top of `tools/make-card.mjs`.** The dedication there is a
  placeholder written in your voice — rewrite it before printing.
- **The cards must be regenerated after deploying.** The QR currently encodes a guessed Vercel URL
  (`https://aegean-sea.vercel.app`), which all four renders decode to today. If the real URL differs, every
  card is wrong.
- `tools/deploy.sh` does the whole chain in one run: deploy, regenerate the QR, rebuild the cards, and
  re-run the decode check.

## Test on the real thing

AR tracking was verified in headless Chrome against a tilted photo of the print, and against the same photo
with a strong simulated glare highlight; the target was found in about half a second in both cases. That is
not the same as glass. Test `ar.html` with the actual framed print, under the glass, in ordinary room light
before the gift date — real reflections and low light are not fully simulated.

---

# Addendum — changes made after the finishing pass

Verified independently, then fixed. Written the same day, after `docs/HANDOFF.md` Tasks A, B and C closed.

## Fixed

- **Two working notes were still reaching the reader.** The lionfish entry ended "(Greek campaigns promote
  eating it; details not verified here)", and the last two species were titled "Mediterranean monk seal
  (bonus: not a fish)" and "Mediterranean bath sponge (bonus)". All three were rewritten in the reader's
  voice, keeping the hedge, in both `research/species.json` and `site/fishes.js`.
- **Samothrace was stranded.** The stop is dated "date unknown" and sat between Oppian (c. AD 180–220) and
  Constantinople (895–968), which implied a late date the sources do not support. It now sits after Delos,
  among the Hellenistic stops, where the surrounding text implies nothing the dossiers deny.
- **The favicon 404 is gone.** `site/favicon.svg` is a tunny, after the fish Kyzikos stamped beneath the main
  type on its electrum staters for three centuries, and is linked from all four pages. Every page now loads
  with a completely clean console.

## Deliberately left alone

- **Minoan Crete (c. 2000–1450 BC) still sits after Phylakopi and Akrotiri.** This is correct, not a defect.
  Its closing sentence — the towns burn around 1450 BC and the record thins "for the next seven centuries" —
  is the bridge into the Homer stop at c. 700 BC. Sorting it by start date would break that bridge. The
  Bronze Age stops read as a group that Crete closes.
- **The fish entries carry inline citations** such as "(Wikipedia; FishBase)" inside the prose, duplicating
  each entry's own source list. Left for your rewrite rather than second-guessed.
- **The ancient-names line on some species is long**, because it carries the citation inline. Same reason.

## Printing

`print/` holds the cards: `card-small.pdf` (3.5 × 2 in, for the back of the frame), `card-large.pdf`
(4 × 6 in, to hand over, carrying the dedication) and `card-sheet.pdf` (US Letter, both with crop marks).

**The wording lives in the `TEXT` block at the top of `tools/make-card.mjs`.** The dedication there is a
placeholder written in your voice — rewrite it. Then rerun `node tools/make-card.mjs`.

**Do not print before deploying.** The QR currently encodes `https://aegean-sea.vercel.app`, which is a guess
at the production URL. `tools/deploy.sh` deploys, then regenerates the QR, the cards and the decode check
against whatever URL Vercel actually returns.

`node tools/check-qr.mjs` decodes the QR back out of the rendered artwork, so what prints is proven to scan.
All four renders currently decode correctly.

## Test on the real thing

AR tracking was verified twice in headless Chrome: against a tilted, glare-flecked photo of the print, and
against the same photo with a strong specular highlight burned over the centre of the plate. It found the
target about 0.15 s after the camera started in both cases, so glass reflections are unlikely to break it.

That is still a simulation. Before the gift date, open the deployed `ar.html` on your own phone and point it
at the actual framed print, in the room it will hang in. Real glass and low evening light are the two
conditions the test cannot reproduce. `tools/test-ar.mjs` accepts `FEED=` and `TAG=` environment variables if
you want to try another camera feed.

## The one open decision

The QR points at a Vercel subdomain. That is fine for a year, but this is meant to hang on a wall. If you
want the code to still resolve in ten years, put a domain you own in front of it before printing — the site
is static, so it will outlive any particular host, but the printed URL cannot be changed afterwards.
