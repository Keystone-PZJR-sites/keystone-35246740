#!/bin/bash

# Optimizes MP4s (H.264) and produces VP9 WebM exports from a folder of MP4s.
# Usage: ./scripts/convert-videos.sh [input-directory]
# Defaults to current directory if no argument is provided.

INPUT_DIR="${1:-.}"

for f in "$INPUT_DIR"/*.mp4; do
  filename=$(basename "$f" .mp4)

  echo ""
  echo "▶ Processing: $filename.mp4"

  # Optimized MP4 (H.264)
  echo "  → Encoding MP4..."
  ffmpeg -i "$f" \
    -c:v libx264 \
    -crf 24 \
    -preset slow \
    -profile:v high \
    -level 4.1 \
    -movflags +faststart \
    -an \
    -y \
    "$INPUT_DIR/${filename}-optimized.mp4"

  # Optimized WebM (VP9)
  echo "  → Encoding WebM..."
  ffmpeg -i "$f" \
    -c:v libvpx-vp9 \
    -crf 33 -b:v 0 \
    -deadline best \
    -cpu-used 0 \
    -an \
    -y \
    "$INPUT_DIR/${filename}.webm"

  echo "  ✓ Done: ${filename}-optimized.mp4 + ${filename}.webm"
done

echo ""
echo "All done. File sizes:"
ls -lh "$INPUT_DIR"/*.mp4 "$INPUT_DIR"/*.webm
