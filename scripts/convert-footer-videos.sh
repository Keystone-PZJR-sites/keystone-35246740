#!/bin/bash

# Optimizes footer MP4 sources into desktop and mobile web formats.
# Usage: ./scripts/convert-footer-videos.sh [input-directory]
# Defaults to current directory if no argument is provided.
#
# Composition-preserving exports:
# - Desktop width: 1024px (height auto)
# - Mobile width: 640px (height auto)
#
# Output naming:
#   <name>-desktop.webm / <name>-desktop.mp4
#   <name>-mobile.webm  / <name>-mobile.mp4

INPUT_DIR="${1:-.}"
OUTPUT_DIR="$INPUT_DIR/converted"

DESKTOP_WIDTH=1024
MOBILE_WIDTH=640

mkdir -p "$OUTPUT_DIR"
shopt -s nullglob
files=("$INPUT_DIR"/*.mp4)

if [ ${#files[@]} -eq 0 ]; then
  echo "No MP4 files found in $INPUT_DIR"
  exit 0
fi

for f in "${files[@]}"; do
  filename=$(basename "$f" .mp4)

  echo ""
  echo "▶ Processing: $filename.mp4"

  # Desktop MP4 (H.264) — width-targeted, preserve source composition.
  echo "  → Encoding desktop MP4 (${DESKTOP_WIDTH}px wide)..."
  ffmpeg -i "$f" \
    -vf "scale=${DESKTOP_WIDTH}:-2:flags=lanczos" \
    -c:v libx264 \
    -crf 24 \
    -preset slow \
    -profile:v high \
    -level 4.1 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    -y \
    "$OUTPUT_DIR/${filename}-desktop.mp4"

  # Desktop WebM (VP9)
  echo "  → Encoding desktop WebM (${DESKTOP_WIDTH}px wide)..."
  ffmpeg -i "$f" \
    -vf "scale=${DESKTOP_WIDTH}:-2:flags=lanczos" \
    -c:v libvpx-vp9 \
    -crf 33 -b:v 0 \
    -deadline best \
    -cpu-used 0 \
    -an \
    -y \
    "$OUTPUT_DIR/${filename}-desktop.webm"

  # Mobile MP4 (H.264) — width-targeted, preserve source composition.
  echo "  → Encoding mobile MP4 (${MOBILE_WIDTH}px wide)..."
  ffmpeg -i "$f" \
    -vf "scale=${MOBILE_WIDTH}:-2:flags=lanczos" \
    -c:v libx264 \
    -crf 24 \
    -preset slow \
    -profile:v high \
    -level 4.1 \
    -pix_fmt yuv420p \
    -movflags +faststart \
    -an \
    -y \
    "$OUTPUT_DIR/${filename}-mobile.mp4"

  # Mobile WebM (VP9)
  echo "  → Encoding mobile WebM (${MOBILE_WIDTH}px wide)..."
  ffmpeg -i "$f" \
    -vf "scale=${MOBILE_WIDTH}:-2:flags=lanczos" \
    -c:v libvpx-vp9 \
    -crf 33 -b:v 0 \
    -deadline best \
    -cpu-used 0 \
    -an \
    -y \
    "$OUTPUT_DIR/${filename}-mobile.webm"

  echo "  ✓ Done: ${filename}-desktop.{mp4,webm} + ${filename}-mobile.{mp4,webm}"
done

echo ""
echo "All done. File sizes:"
ls -lh "$OUTPUT_DIR"/*.mp4 "$OUTPUT_DIR"/*.webm
