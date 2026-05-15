#!/bin/bash

# Optimizes hero MP4 sources into desktop and mobile web formats.
# Usage: ./scripts/convert-hero-videos.sh [input-directory]
# Defaults to current directory if no argument is provided.
#
# Files with "mobile" in the filename use the mobile settings.
# All other MP4 files use the desktop settings.

INPUT_DIR="${1:-.}"
OUTPUT_DIR="$INPUT_DIR/converted"

mkdir -p "$OUTPUT_DIR"
shopt -s nullglob
files=("$INPUT_DIR"/*.mp4)

if [ ${#files[@]} -eq 0 ]; then
  echo "No MP4 files found in $INPUT_DIR"
  exit 0
fi

for f in "${files[@]}"; do
  filename=$(basename "$f" .mp4)
  lowercase_filename=$(echo "$filename" | tr '[:upper:]' '[:lower:]')

  if [[ "$lowercase_filename" == *mobile* ]]; then
    width=786
    height=662
    mp4_codec="h264"
  else
    width=1600
    height=998
    mp4_codec="av1"
  fi

  size_label="${width}x${height}"
  video_filter="scale=${width}:${height}:force_original_aspect_ratio=increase:flags=lanczos,crop=${width}:${height}"

  echo ""
  echo "▶ Processing: $filename.mp4 → ${size_label}"

  if [ "$mp4_codec" = "av1" ]; then
    # Desktop MP4 (AV1)
    echo "  → Encoding AV1 MP4 ${size_label}..."
    ffmpeg -i "$f" \
      -vf "$video_filter" \
      -c:v libsvtav1 \
      -crf 30 \
      -preset 4 \
      -movflags +faststart \
      -an \
      -y \
      "$OUTPUT_DIR/${filename}-${size_label}-av1.mp4"
  else
    # Mobile MP4 (H.264)
    echo "  → Encoding H.264 MP4 ${size_label}..."
    ffmpeg -i "$f" \
      -vf "$video_filter" \
      -c:v libx264 \
      -crf 24 \
      -preset slow \
      -profile:v high \
      -level 4.1 \
      -movflags +faststart \
      -an \
      -y \
      "$OUTPUT_DIR/${filename}-${size_label}-h264.mp4"
  fi

  # WebM (VP9)
  echo "  → Encoding VP9 WebM ${size_label}..."
  ffmpeg -i "$f" \
    -vf "$video_filter" \
    -c:v libvpx-vp9 \
    -crf 33 -b:v 0 \
    -deadline best \
    -cpu-used 0 \
    -an \
    -y \
    "$OUTPUT_DIR/${filename}-${size_label}.webm"

  echo "  ✓ Done: ${filename}-${size_label}"
done

echo ""
echo "All done. File sizes:"
ls -lh "$OUTPUT_DIR"/*.mp4 "$OUTPUT_DIR"/*.webm
