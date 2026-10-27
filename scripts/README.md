# 🛠️ CalmNature Production Scripts

> **Note:** The CalmNature web app uses **fully procedural audio synthesis** (Web Audio API) — no MP3 files needed. These scripts are **bonus utilities** for teams who want to scale to thousands of real bird recordings as a future enhancement.

---

## 📁 What's Here

| Script | Purpose | Usage |
|--------|---------|-------|
| `download-sounds.mjs` | Bulk-download bird recordings from xeno-canto API (free, CC-licensed) | `node scripts/download-sounds.mjs` |
| `process-audio.sh` | FFmpeg pipeline: normalize, trim silence, convert to web-optimized MP3 | `bash scripts/process-audio.sh` |
| `analyze-audio.mjs` | Extract features (duration, frequency, tempo, energy) → tagged JSON | `node scripts/analyze-audio.mjs` |

---

## 🚀 Quick Start (Full Pipeline)

```bash
# 1. Download 100 high-quality bird recordings
node scripts/download-sounds.mjs --count=100 --quality=A

# 2. Process all files (FFmpeg required)
bash scripts/process-audio.sh

# 3. Auto-analyze & tag every file
node scripts/analyze-audio.mjs

# Output: data/sound-metadata.json (drop-in compatible with Sound Lab)
```

---

## 📦 Output Structure

```
sounds/
└── birds/
    ├── raw/          # Original downloads
    └── processed/    # Normalized, web-optimized
data/
├── sound-metadata.json   # Auto-generated tags
└── SCHEMA.md             # Database schema docs
```

---

## 🔌 Integrating Real Files into the App

The existing `src/audio/tagger.ts` `SOUND_REGISTRY` array is the **source of truth**. To add real audio:

1. Run the pipeline above to produce `data/sound-metadata.json`
2. In `src/audio/engine.ts`, add a new `LayerKind` like `'audio_file'` that loads via `decodeAudioData()`
3. Each registry entry can opt-in with `audioFileUrl: '/sounds/birds/processed/wren_001.mp3'`
4. The Sound Lab filter & mix builder **work automatically** — no UI changes needed

---

## 📊 Scaling to 1,000+ Sounds

See `data/SCHEMA.md` for:
- PostgreSQL schema (sounds, tags, regions, licenses)
- CDN strategy (Cloudflare R2 / S3 + edge caching)
- Streaming protocol (HLS for adaptive quality)
- Real-time personalization (collaborative filtering)
