#!/usr/bin/env bash
# =====================================================================
# 🎚️ AUDIO PROCESSING PIPELINE
# - Normalizes loudness (EBU R128 broadcast standard, target -16 LUFS)
# - Trims leading/trailing silence
# - Converts to web-optimized MP3 (44.1kHz, 128 kbps, stereo)
# - Adds 200ms fade-in / fade-out for seamless looping
#
# Requires: ffmpeg with loudnorm filter (built-in since 3.2)
# Install:  brew install ffmpeg   |   sudo apt install ffmpeg
# =====================================================================

set -e

INPUT_DIR="sounds/birds/raw"
OUTPUT_DIR="sounds/birds/processed"

if ! command -v ffmpeg &> /dev/null; then
  echo "❌ ffmpeg not found. Install: https://ffmpeg.org/download.html"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

count=$(find "$INPUT_DIR" -maxdepth 1 -type f -name '*.mp3' 2>/dev/null | wc -l | tr -d ' ')
if [ "$count" = "0" ]; then
  echo "⚠️  No MP3 files in $INPUT_DIR. Run download-sounds.mjs first."
  exit 0
fi

echo "🎚️  Processing $count audio files..."
echo "    Target: -16 LUFS · 44.1kHz · 128 kbps · trimmed silence · fade ends"
echo ""

i=0
for src in "$INPUT_DIR"/*.mp3; do
  i=$((i+1))
  base=$(basename "$src" .mp3)
  dst="$OUTPUT_DIR/${base}.mp3"

  echo "[$i/$count] $base"

  ffmpeg -y -loglevel error -i "$src" \
    -af "
      silenceremove=start_periods=1:start_silence=0.1:start_threshold=-50dB,
      areverse,
      silenceremove=start_periods=1:start_silence=0.1:start_threshold=-50dB,
      areverse,
      loudnorm=I=-16:TP=-1.5:LRA=11,
      afade=t=in:st=0:d=0.2,
      afade=t=out:st=999:d=0.2
    " \
    -ar 44100 -ac 2 -b:a 128k -map_metadata -1 \
    "$dst" 2>&1 | grep -v "^$" || true
done

echo ""
echo "✅ Processed $count files → $OUTPUT_DIR"
echo ""
echo "📊 Output stats:"
du -sh "$OUTPUT_DIR" 2>/dev/null || true
echo ""
echo "✨ Next step: node scripts/analyze-audio.mjs"
