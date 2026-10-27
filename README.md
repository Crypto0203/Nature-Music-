# 🌿 CalmNature ULTRA-PRO

> **Sound therapy & meditation app** with 88 birds, 61 environments, 23 healing tones, and 10 sacred mantras from all major religions — including **Krishna's divine Bansuri flute** in Raga Yaman. Runs as a web app AND a native Android app.

![Built with React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)
![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF?logo=capacitor)

---

## ✨ Features

- 🐦 **88 unique bird voices** from around the world (procedurally synthesized)
- 🌌 **61 curated soundscapes** organized by mood
- 🎵 **23 healing tones** — Solfeggio + 7 Chakras + Binaural beats
- 🙏 **10 sacred mantras** — Hindu, Buddhist, Sikh, Christian, Islamic, Native American
- 🪈 **Krishna's Bansuri Flute** in Raga Yaman with classical meend (pitch slides)
- 🦁 **Wild animal kingdom** — Lion, Tiger, Elephant, Wolves, Deer, Howler Monkeys
- 🏔️ **Mountain & cave sounds** — Tibetan horn, yak bells, cave drips, avalanches
- 🎭 **14 mood categories** — Calm, Happy, Sleep, Focus, Sacred, Wild Kingdom, etc.
- 🧪 **Smart Sound Lab** — auto-tagged sounds with custom mix builder
- 💾 **Save custom mixes** to local storage
- 📊 **Session history** with charts
- 📱 **Android-ready** — native APK with keep-awake & haptics

---

## 🚀 Quick Start

### Web (instant)
```bash
npm install
npm run dev
# → opens http://localhost:5173
```

### Build Production
```bash
npm run build
# → produces dist/index.html (single file ~612 KB)
```

### Convert to Android
```bash
# One-shot setup:
bash scripts/setup-android.sh        # macOS/Linux
scripts\setup-android.bat            # Windows

# Then open in Android Studio:
npx cap open android
# Click ▶ Run to install on phone
```

---

## 📖 Full Documentation

| Document | Purpose |
|----------|---------|
| **[PROJECT.md](./PROJECT.md)** | ⭐ **Complete guide** — file structure, every file explained, full Android conversion |
| **[ANDROID.md](./ANDROID.md)** | Detailed Android-specific guide — install, customize, publish to Play Store |
| **[scripts/README.md](./scripts/README.md)** | Optional scripts for downloading & analyzing real audio recordings |
| **[data/SCHEMA.md](./data/SCHEMA.md)** | Database schema & strategy for scaling to 1000+ sounds |

---

## 📁 Project Structure (overview)

```
calmnature/
├── PROJECT.md              ⭐ Read this first - complete guide
├── ANDROID.md              📱 Android-specific guide
├── README.md               (this file)
│
├── package.json            Dependencies
├── capacitor.config.ts     Android app config
├── vite.config.ts          Build config
│
├── src/
│   ├── main.tsx            App bootstrap
│   ├── App.tsx             Top-level router
│   ├── types.ts            TypeScript types
│   ├── data.ts             ⭐ All sounds defined here
│   ├── store.ts            Global state (Zustand)
│   │
│   ├── audio/
│   │   ├── engine.ts       ⭐ Web Audio synthesis engine
│   │   └── tagger.ts       Auto-tagging & filters
│   │
│   ├── components/         All React UI screens
│   │   ├── MoodScreen.tsx
│   │   ├── EnvironmentsScreen.tsx
│   │   ├── NowPlayingScreen.tsx
│   │   ├── BirdsLibraryScreen.tsx
│   │   ├── SoundLabScreen.tsx
│   │   ├── HistoryScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── WaveVisualizer.tsx
│   │
│   └── native/
│       └── capacitor.ts    Android native APIs wrapper
│
└── scripts/
    ├── setup-android.sh    ⭐ One-shot Android setup (mac/linux)
    ├── setup-android.bat   ⭐ One-shot Android setup (windows)
    ├── download-sounds.mjs (optional) Download bird MP3s
    ├── process-audio.sh    (optional) FFmpeg pipeline
    └── analyze-audio.mjs   (optional) Auto-tag MP3s
```

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript** — UI framework
- **Tailwind CSS 4** — Styling
- **Vite 7** — Build tool
- **Framer Motion** — Animations
- **Zustand** — State management
- **Web Audio API** — Procedural sound synthesis (no audio files!)
- **Capacitor 8** — Native Android wrapper
- **Recharts** — Session history charts

---

## 📲 Requirements

| For | Minimum |
|-----|---------|
| **Web** | Any modern browser |
| **Android build** | Node.js 18+, Android Studio, JDK 17, 10 GB free disk |
| **Android install** | Android 7.0+ phone |

---

## 🎨 Customization

See [PROJECT.md → Section 7](./PROJECT.md#7-customize-your-app) for:
- Change app name & icon
- Customize splash screen
- Modify theme colors
- Add new sounds

---

## 📦 Scripts

```bash
npm run dev      # Start dev server (web)
npm run build    # Build production single-file HTML
npm run preview  # Preview production build
```

After setup-android:
```bash
npx cap sync android   # Sync web changes to Android project
npx cap open android   # Open in Android Studio
```

---

## 🐛 Troubleshooting

See [PROJECT.md → Section 9](./PROJECT.md#9-troubleshooting) for common issues:
- "command not found"
- "SDK location not found"
- "Audio doesn't play"
- "Phone not detected"

---

## ❤️ Made With Love

Built brother-to-brother. Every line written with care. May this app bring peace to whoever uses it. 🙏

🪈 *"Wherever there is Krishna, the Lord of all yogis, and wherever there is Arjuna, the supreme archer, there will surely be opulence, victory, extraordinary power, and morality."* — Bhagavad Gita 18.78
