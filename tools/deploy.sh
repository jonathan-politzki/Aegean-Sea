#!/usr/bin/env bash
# Deploy site/ to Vercel (production), then regenerate the QR code and the print
# cards so the printed code always points at the live URL.
# Usage: tools/deploy.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/site"
URL=$(vercel deploy --prod --yes --name aegean-sea 2>/dev/null | tail -1)
echo "deployed: $URL"
cd "$ROOT"
node tools/make-qr.mjs "$URL"
node tools/make-card.mjs "$URL"
node tools/check-qr.mjs
echo
echo "Live:  $URL"
echo "Print: print/card-sheet.pdf  (both cards, crop marks, US Letter)"
