#!/bin/bash

# Optimizes MP4s (H.264) and produces VP9 WebM exports at several 16:9 sizes.
# Usage: ./scripts/convert-videos.sh [input-directory]
# Defaults to current directory if no argument is provided.

INPUT_DIR="${1:-.}"
OUTPUT_DIR="$INPUT_DIR/converted"
SIZES=(
  "1920:1080"
  "1600:900"
  "1440:810"
  "1280:720"
)

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

  for size in "${SIZES[@]}"; do
    IFS=":" read -r width height <<< "$size"
    size_label="${width}x${height}"

    # Optimized MP4 (H.264)
    echo "  → Encoding MP4 ${size_label}..."
    ffmpeg -i "$f" \
      -vf "scale=${width}:${height}:flags=lanczos" \
      -c:v libx264 \
      -crf 25 \
      -preset slow \
      -profile:v high \
      -level 4.1 \
      -movflags +faststart \
      -an \
      -y \
      "$OUTPUT_DIR/${filename}-${size_label}.mp4"

    # Optimized WebM (VP9)
    echo "  → Encoding WebM ${size_label}..."
    ffmpeg -i "$f" \
      -vf "scale=${width}:${height}:flags=lanczos" \
      -c:v libvpx-vp9 \
      -crf 34 -b:v 0 \
      -deadline best \
      -cpu-used 0 \
      -an \
      -y \
      "$OUTPUT_DIR/${filename}-${size_label}.webm"

    echo "  ✓ Done: ${filename}-${size_label}.mp4 + ${filename}-${size_label}.webm"
  done
done

echo ""
echo "All done. File sizes:"
ls -lh "$OUTPUT_DIR"/*.mp4 "$OUTPUT_DIR"/*.webm
