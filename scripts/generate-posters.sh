#!/usr/bin/env bash
# generate-posters.sh
#
# Converts source JPGs into responsive WebP poster images at five widths.
# Output goes directly into the public/ directories consumed by the site.
#
# Usage: bash scripts/generate-posters.sh
#
# Requirements: ffmpeg (brew install ffmpeg)

set -euo pipefail

WIDTHS=(300 500 1000 1500 2500)
QUALITY=82   # WebP quality — good visual fidelity at reasonable file size

HERO_SRC="/Users/ak.m4/Dropbox/01-work/00-projects/01-keystone/03-website/01-splash-page/01-assets/01-hero/export/r2/image-fallbacks/source"
HERO_OUT="/Users/ak.m4/repos/keystone-35246740/public/videos/hero-autoloop-clips/posters"

EC_SRC="/Users/ak.m4/Dropbox/01-work/00-projects/01-keystone/03-website/01-splash-page/01-assets/03-everychannel/export/r2/image-fallbacks/source"
EC_OUT="/Users/ak.m4/repos/keystone-35246740/public/every-channel/posters"

convert_set() {
  local src_dir="$1"
  local out_dir="$2"

  for src in "$src_dir"/*.jpg; do
    base=$(basename "$src" .jpg)
    echo "→ $base"
    for w in "${WIDTHS[@]}"; do
      out="$out_dir/${base}-${w}w.webp"
      # sips resizes to target width (height auto), cwebp converts to WebP
      tmp=$(mktemp /tmp/poster-XXXXXX.jpg)
      sips --resampleWidth "$w" "$src" --out "$tmp" > /dev/null 2>&1
      cwebp -q "$QUALITY" "$tmp" -o "$out" -quiet
      rm "$tmp"
      echo "   ✓ ${base}-${w}w.webp"
    done
  done
}

echo "── Hero posters ─────────────────────────────"
convert_set "$HERO_SRC" "$HERO_OUT"

echo ""
echo "── Every Channel posters ────────────────────"
convert_set "$EC_SRC" "$EC_OUT"

echo ""
echo "Done."
