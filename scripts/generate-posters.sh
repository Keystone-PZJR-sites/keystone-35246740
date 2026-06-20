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
FOOTER_WIDTHS=(300 500 800 1024 1280)
QUALITY=82   # WebP quality — good visual fidelity at reasonable file size

HERO_SRC="/Users/ak.m4/Dropbox/01-work/00-projects/01-keystone/03-website/01-splash-page/01-assets/01-hero/export/r2/image-fallbacks/source"
HERO_OUT="/Users/ak.m4/repos/keystone-35246740/public/media/hero/posters"

EC_SRC="/Users/ak.m4/Dropbox/01-work/00-projects/01-keystone/03-website/01-splash-page/01-assets/03-everychannel/export/r2/image-fallbacks/source"
EC_OUT="/Users/ak.m4/repos/keystone-35246740/public/media/channels/posters"

FOOTER_SRC="/Users/ak.m4/Dropbox/01-work/00-projects/01-keystone/03-website/01-splash-page/01-assets/07-footer/export/r2/fallback-images/source"
FOOTER_OUT="/Users/ak.m4/repos/keystone-35246740/public/media/footer/posters"

convert_set() {
  local src_dir="$1"
  local out_dir="$2"
  shift 2
  local widths=("$@")

  for src in "$src_dir"/*.jpg; do
    base=$(basename "$src" .jpg)
    echo "→ $base"
    for w in "${widths[@]}"; do
      out="$out_dir/${base}-${w}w.webp"
      tmp=$(mktemp /tmp/poster-XXXXXX.jpg)
      sips --resampleWidth "$w" "$src" --out "$tmp" > /dev/null 2>&1
      cwebp -q "$QUALITY" "$tmp" -o "$out" -quiet
      rm "$tmp"
      echo "   ✓ ${base}-${w}w.webp"
    done
  done
}

echo "── Hero posters ─────────────────────────────"
convert_set "$HERO_SRC" "$HERO_OUT" "${WIDTHS[@]}"

echo ""
echo "── Every Channel posters ────────────────────"
convert_set "$EC_SRC" "$EC_OUT" "${WIDTHS[@]}"

echo ""
echo "── Footer posters ───────────────────────────"
mkdir -p "$FOOTER_OUT"
convert_set "$FOOTER_SRC" "$FOOTER_OUT" "${FOOTER_WIDTHS[@]}"

echo ""
echo "Done."
