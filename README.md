# Aegean-Sea

A companion website for a 1683 copperplate map of the Aegean (Alain Manesson Mallet,
*Description de l'Univers*, Paris 1683, "Les Isles de l'Archipel qui sont de l'Europe",
fig. LXXIV, p. 169), given to Cole Poulos. A QR code on the frame opens the site.

## What's here

- `site/` — the static website. No build step; open `site/index.html` over any http server.
  - `index.html` the plate with tappable islands and a chronological "walk the sea" tour
  - `fishes.html` the species guide
  - `ar.html` point-your-phone mode (MindAR image tracking; needs https + camera)
  - `content.js` **all the history text lives here** — edit freely
  - `fishes.js` generated from `research/species.json` by `tools/build-fishes.mjs`
  - `targets/map.mind` the compiled AR image target for the print
  - `qr/` the QR code (regenerate with `node tools/make-qr.mjs <url>`)
- `research/` — sourced dossiers the text was written from. Every claim carries a URL and a confidence rating.
  `QA-stops.md` is a fact-check of the site text against those dossiers.
- `print/` — print-ready cards carrying the QR code (generated; see below).
- `docs/` — `HANDOFF.md` (the finishing plan) and `STATUS.md` (what is done, what needs your eye).
- `tools/` — node scripts (image prep, AR target compile, QR, cards, screenshots, species build).

## Run locally

    cd site && python3 -m http.server 8000
    # open http://localhost:8000

Camera-based AR only works over https (or localhost), so test `ar.html` on a phone via a deployed URL.

## Deploy

The repo is private, so GitHub Pages is not available on a free plan. Either:

- **Vercel** (CLI is installed): `cd site && vercel deploy --prod --name aegean-sea` → gives an https URL.
- **GitHub Pages**: make the repo public, then Settings → Pages → deploy from branch `main`, folder `/site`.

`tools/deploy.sh` does the Vercel deploy and then regenerates the QR code, the print cards and
the decode check against the live URL, all in one go.

## The printed cards

    node tools/make-card.mjs            # uses the URL in site/qr/url.txt
    node tools/check-qr.mjs             # decodes the QR back out of the rendered art

Writes `print/card-small.pdf` (3.5 x 2 in, for the back of the frame), `print/card-large.pdf`
(4 x 6 in, to hand over), and `print/card-sheet.pdf` (US Letter, both with crop marks).
**The wording lives in the `TEXT` block at the top of `tools/make-card.mjs`** — edit it there,
especially the dedication, and rerun.

> Print only after deploying. The QR currently encodes `https://aegean-sea.vercel.app`, which is
> a guess at the production URL; if Vercel assigns a different one, `tools/deploy.sh` rewrites the
> code and the cards to match.

## The voice

Two separate things, deliberately.

**Narration is baked in.** `tools/make-audio.mjs` calls OpenAI's text to speech once, on your machine,
and writes an mp3 per stop into `site/audio/`. The site just plays those files. No API key is involved at
runtime, there is no per play cost, and it keeps working whatever happens to any API later.

    node tools/make-audio.mjs --test     # samples of four voices, listen and choose
    TTS_VOICE=onyx node tools/make-audio.mjs
    node tools/make-audio.mjs --force    # redo everything

Only stops whose text changed are regenerated, tracked by a hash in `site/audio/manifest.json`, so rerun it
after you rewrite the prose and it will do just the ones you touched.

**Questions are live.** `site/api/ask.js` is a Vercel function. It transcribes a spoken question, answers it
strictly from `site/lib/knowledge.js`, which is built from this site's own content, and speaks the answer
back. It refuses anything the map does not cover rather than inventing.

    node tools/build-knowledge.mjs   # rebuild after changing content.js or the fish
    node tools/test-ask.mjs          # ask it three questions from the terminal

This one needs the key on the server:

    vercel env add OPENAI_API_KEY production

Your key lives in `.env` locally, which is git ignored. Bear in mind that anyone who scans the QR can ask
questions and each one costs you a fraction of a cent. There is a rate limit of 8 questions a minute per
address, a 40 second cap on recordings, and a cap on answer length. If you would rather not run that risk,
delete `site/api/` and the site keeps the narration and loses nothing else.

## Regenerate things

    node tools/prep-image.mjs        # Aegan.png -> site/assets/map*.jpg
    node tools/compile-target.mjs    # -> site/targets/map.mind (headless Chrome, ~20 s)
    node tools/build-fishes.mjs      # research/species.json -> site/fishes.js + images
    node tools/debug-overlay.mjs     # hotspot placement check -> tools/shots/overlay.png
    node tools/shoot.mjs index.html  # phone + desktop screenshots -> tools/shots/
