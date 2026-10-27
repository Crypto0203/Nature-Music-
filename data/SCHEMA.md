# 📊 CalmNature — Data Schema & Scaling Guide

> Reference for scaling beyond the in-browser synth engine to a multi-thousand-sound, server-backed system.

---

## 1. Sound Metadata Schema (JSON / DB)

The output of `scripts/analyze-audio.mjs` matches the in-app `SoundTag` interface — drop-in compatible with the Sound Lab.

```ts
interface SoundTag {
  id: string;                    // 'file_wren_001'  (PK)
  name: string;                  // 'Eurasian Wren'
  emoji: string;                 // '🇬🇧'
  category: 'bird' | 'water' | 'weather' | ...;
  // Audio analysis
  freqBand: 'low' | 'mid' | 'high';
  freqHz: number;
  tempo: 'slow' | 'medium' | 'fast' | 'continuous';
  energy: 'minimal' | 'low' | 'moderate' | 'high';
  moods: ('calm' | 'focus' | 'sleep' | 'energetic' | 'meditation' | 'happy')[];
  // Playback
  layerKind: 'bird' | 'audio_file' | ...;
  audioFileUrl?: string;         // For real recordings
  birdSpeciesId?: string;        // For procedural synthesis
  defaultVolume: number;
  defaultPitch?: number;
  // Provenance
  region?: string;
  flag?: string;
  species?: string;              // 'Troglodytes troglodytes'
  recordist?: string;
  license?: string;              // 'CC-BY-NC-SA'
  sourceUrl?: string;
}
```

---

## 2. PostgreSQL Schema (Production)

```sql
-- Core sound table
CREATE TABLE sounds (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  emoji           TEXT,
  category        TEXT NOT NULL,
  freq_band       TEXT CHECK (freq_band IN ('low','mid','high')),
  freq_hz         REAL,
  tempo           TEXT CHECK (tempo IN ('slow','medium','fast','continuous')),
  energy          TEXT CHECK (energy IN ('minimal','low','moderate','high')),
  duration_sec    REAL,
  default_volume  REAL DEFAULT 0.5,
  audio_url       TEXT,            -- CDN URL for streaming
  audio_url_hls   TEXT,            -- Adaptive bitrate HLS manifest
  waveform_json   JSONB,           -- Pre-computed waveform peaks
  region          TEXT,
  country         TEXT,
  flag            TEXT,
  species         TEXT,
  recordist       TEXT,
  license         TEXT,
  source_url      TEXT,
  popularity      INT DEFAULT 0,   -- play count
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Many-to-many tags
CREATE TABLE sound_moods (
  sound_id  TEXT REFERENCES sounds(id) ON DELETE CASCADE,
  mood      TEXT NOT NULL,
  PRIMARY KEY (sound_id, mood)
);

CREATE INDEX idx_sounds_category ON sounds(category);
CREATE INDEX idx_sounds_freq     ON sounds(freq_band);
CREATE INDEX idx_sounds_region   ON sounds(region);
CREATE INDEX idx_moods_mood      ON sound_moods(mood);
CREATE INDEX idx_sounds_popular  ON sounds(popularity DESC);

-- Full-text search
CREATE INDEX idx_sounds_search ON sounds
  USING GIN (to_tsvector('english', name || ' ' || COALESCE(species,'') || ' ' || COALESCE(region,'')));

-- User mixes (synced)
CREATE TABLE user_mixes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  name        TEXT NOT NULL,
  emoji       TEXT,
  layers      JSONB NOT NULL,    -- [{soundId, volume}, ...]
  is_public   BOOLEAN DEFAULT false,
  play_count  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Listening history (for personalization)
CREATE TABLE play_events (
  id           BIGSERIAL PRIMARY KEY,
  user_id      UUID,
  mix_id       UUID,
  sound_id     TEXT,
  duration_ms  INT,
  mood_context TEXT,            -- 'calm', 'focus', etc.
  played_at    TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_play_user_time ON play_events(user_id, played_at DESC);
```

---

## 3. CDN & Streaming Strategy

| Layer | Tech | Why |
|------|------|-----|
| **Storage** | Cloudflare R2 / AWS S3 | Cheap, region-replicated |
| **CDN** | Cloudflare / CloudFront | Edge caching for global low-latency |
| **Format** | MP3 128k + HLS (AAC 64/96/128/192) | Adaptive bitrate based on connection |
| **Manifest** | `.m3u8` per sound | Browsers can stream + seek |
| **Pre-roll** | First 10s as `<audio preload>` | Instant playback |
| **Loop** | 30-60s segments with overlap | Seamless infinite playback |

For our app (synth-based) the build is already 535 KB total — no streaming needed. For 1,000+ real recordings, expect ~5GB → use signed CDN URLs.

---

## 4. Real-Time Personalization

### A. Collaborative Filtering (most-played-by-similar-users)
```sql
-- "Users who loved this also loved..."
WITH user_similar AS (
  SELECT user_id, COUNT(*) as overlap
  FROM play_events
  WHERE sound_id IN (SELECT sound_id FROM play_events WHERE user_id = $1)
    AND user_id != $1
  GROUP BY user_id
  ORDER BY overlap DESC LIMIT 50
)
SELECT s.*, COUNT(pe.id) as score
FROM sounds s
JOIN play_events pe ON pe.sound_id = s.id
WHERE pe.user_id IN (SELECT user_id FROM user_similar)
  AND s.id NOT IN (SELECT sound_id FROM play_events WHERE user_id = $1)
GROUP BY s.id ORDER BY score DESC LIMIT 10;
```

### B. Time-of-day Awareness
```ts
function recommendNow(userId) {
  const hour = new Date().getHours();
  let mood: MoodTag;
  if (hour < 6 || hour > 22) mood = 'sleep';
  else if (hour < 10) mood = 'energetic';
  else if (hour < 17) mood = 'focus';
  else mood = 'calm';
  return getSoundsForMood(mood, { excludePlayedToday: userId });
}
```

### C. Biofeedback (optional, advanced)
- WebHID / WebUSB → connect heart-rate monitor
- BPM > baseline → auto-shift mix toward `calm` + `low freq` + `slow tempo`
- BPM < baseline → fade in `energetic` layers

---

## 5. Scaling Checklist (1 → 10,000 sounds)

| Sounds | Strategy |
|--------|----------|
| 1–100 | Embed in JS bundle (current approach for synth) |
| 100–500 | Static CDN + JSON index, lazy-load on play |
| 500–5,000 | PostgreSQL backend + REST API + filtered queries |
| 5,000+ | Add Elasticsearch for fuzzy search, Redis for hot mixes, edge KV for trending |

---

## 6. Connecting to the Web App

The Sound Lab in `src/components/SoundLabScreen.tsx` already supports filter + mix + save. To swap from synth → real files:

1. Add `LayerKind: 'audio_file'` in `src/types.ts`
2. In `src/audio/engine.ts`, handle that kind:
   ```ts
   case 'audio_file': {
     const buf = await fetch(layer.audioFileUrl).then(r => r.arrayBuffer());
     buf = await ctx.decodeAudioData(buf);
     // Continue with existing buffer-source path
   }
   ```
3. Replace `SOUND_REGISTRY` static array with `fetch('/api/sounds')` → server returns the same JSON shape
4. Mix builder, filters, save-presets — **zero code changes needed**, the abstraction holds.

Done. The Sound Lab scales horizontally without UI changes. 🚀
