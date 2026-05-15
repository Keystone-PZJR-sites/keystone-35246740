#!/usr/bin/env bash

# Generates responsive WebP thumbnail images for Social Proof source JPGs.
# Usage: ./scripts/generate-socialproof-thumbnails.sh [input-directory] [output-directory]
# Defaults to the current directory for input and ./converted for output.
#
# Expected source names:
#   socialproof-01-desktop.jpg
#   socialproof-01-mobile.jpg

set -euo pipefail

INPUT_DIR="${1:-.}"
OUTPUT_DIR="${2:-$INPUT_DIR/converted}"
STANDARD_WIDTHS=(250 500 764)
QUALITY=82

mkdir -p "$OUTPUT_DIR"
shopt -s nullglob
files=("$INPUT_DIR"/*.jpg)

if [ ${#files[@]} -eq 0 ]; then
  echo "No JPG files found in $INPUT_DIR"
  exit 0
fi

for src in "${files[@]}"; do
  base=$(basename "$src" .jpg)
  source_width=$(sips -g pixelWidth "$src" | awk '/pixelWidth/ { print $2 }')
  echo "→ $base"

  widths=("$source_width")
  for width in "${STANDARD_WIDTHS[@]}"; do
    if [ "$width" -gt "$source_width" ]; then
      echo "   - skipped ${base}-${width}w.webp (source is ${source_width}px wide)"
      continue
    fi

    if [ "$width" -ne "$source_width" ]; then
      widths+=("$width")
    fi
  done

  IFS=$'\n' read -r -d '' -a widths < <(printf '%s\n' "${widths[@]}" | sort -n -u && printf '\0')

  for width in "${widths[@]}"; do
    out="$OUTPUT_DIR/${base}-${width}w.webp"
    tmp=$(mktemp /tmp/socialproof-thumb-XXXXXX.jpg)

    sips --resampleWidth "$width" "$src" --out "$tmp" > /dev/null 2>&1
    cwebp -q "$QUALITY" "$tmp" -o "$out" -quiet
    rm "$tmp"

    echo "   ✓ ${base}-${width}w.webp"
  done
done

echo ""
echo "Done. File sizes:"
ls -lh "$OUTPUT_DIR"/*.webp
