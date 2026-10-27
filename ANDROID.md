# 📱 CalmNature — Android App

Your CalmNature web app is now a **real Android application** powered by Capacitor 8.
The same React code runs as a native app with full Web Audio API support, Android-specific features, and a real `.apk` you can install on any phone.

---

## ✨ What You Get on Android

| Feature | Detail |
|--------|--------|
| 📦 **Native APK** | Real Android app, installable on any device (Android 7.0+) |
| 🔊 **Full audio engine** | All 67 birds + 23 healing tones + 48 environments work natively |
| 🔋 **Keep Screen Awake** | Phone stays on while listening (auto-managed) |
| 📳 **Haptic Feedback** | Subtle tap vibrations on mood selection & stop |
| 🌑 **Dark status bar** | Matches the app theme `#050810` |
| ⬅️ **Android Back Button** | Smart navigation: stops session → returns home → exits |
| 🚀 **Splash Screen** | Branded launch screen (1.5s) |
| 🔄 **Lifecycle aware** | Handles backgrounding/foregrounding gracefully |
| 📁 **Offline-first** | Whole app is in one HTML — works without internet |
| 💾 **Persistent storage** | Custom mixes & history saved via `localStorage` |

---

## 🛠️ Prerequisites

You need these installed **once** on your computer:

### 1. Node.js 18+
Download: https://nodejs.org
Verify:
```bash
node -v   # should show v18 or higher
```

### 2. Java JDK 17 (for Android build)
Easiest: install **Android Studio** which bundles a compatible JDK.
Or get OpenJDK 17: https://adoptium.net

### 3. Android Studio (recommended) OR Android Command-Line Tools
Download: https://developer.android.com/studio

After install, open Android Studio once → **Settings → Languages & Frameworks → Android SDK**:
- Install **Android SDK Platform 34** (or newer)
- Install **Android SDK Build-Tools**
- Install **Android SDK Platform-Tools**

---

## 🚀 Quick Start (3 commands)

```bash
# 1. Run the one-shot setup
bash scripts/setup-android.sh

# 2. Open in Android Studio
npx cap open android

# 3. Click ▶ Run in Android Studio
#    (with phone connected via USB & "USB Debugging" enabled,
#     or with an emulator running)
```

That's it! The app installs and launches on your device.

---

## 📲 Installing on Your Phone

### Option A — Plug in your phone (USB Debug)

1. **Enable Developer Mode** on your phone:
   - Settings → About Phone → tap "Build Number" **7 times**
2. **Enable USB Debugging**:
   - Settings → Developer Options → toggle "USB Debugging"
3. Plug phone into computer with USB cable
4. Allow the connection prompt on your phone
5. In Android Studio, your device shows up in the device dropdown — click ▶

### Option B — Build APK & sideload

```bash
cd android
./gradlew assembleDebug
```

The APK is created at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

Transfer this file to your phone (email, Google Drive, USB) and tap to install.
You'll need to enable **"Install Unknown Apps"** for your file manager once.

### Option C — Android Emulator

In Android Studio:
1. **Tools → Device Manager → Create Device**
2. Pick a Pixel phone & download a system image (e.g. Android 14)
3. Start the emulator
4. Click ▶ Run in Android Studio

---

## 🎨 Customizing the App

### Change the App Icon

1. Use the [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html) to generate icons from a PNG/SVG
2. Replace files in `android/app/src/main/res/mipmap-*/`
3. Re-sync: `npx cap sync android`

### Change the Splash Screen

1. Create a 2732×2732 PNG (centered logo on dark background `#050810`)
2. Replace `android/app/src/main/res/drawable/splash.png`
3. Re-sync: `npx cap sync android`

### Change the App Name

Edit `capacitor.config.ts`:
```ts
appName: 'CalmNature',  // Shown in launcher
appId:   'com.calmnature.app',  // Unique package identifier
```
Then run `npx cap sync android`.

### Change the Theme Color

Edit `android/app/src/main/res/values/colors.xml`:
```xml
<color name="colorPrimary">#050810</color>
<color name="colorPrimaryDark">#050810</color>
```

---

## 🔄 Development Workflow

```bash
# After ANY change to React code:
npm run build      # Builds dist/index.html
npx cap sync       # Copies dist/ into the Android project

# Then either:
npx cap open android   # Open in Android Studio & click ▶
# OR
cd android && ./gradlew installDebug   # Build & install in one go
```

**Pro tip:** for fast iteration, run `npm run dev` and configure Capacitor's `server.url` to your dev server IP:
```ts
// capacitor.config.ts (development only)
server: {
  url: 'http://192.168.1.xxx:5173',  // your computer's local IP
  cleartext: true,
}
```
Then `npx cap sync` — the app will live-reload from your dev server.

---

## 📦 Producing a Signed Release APK (for sharing/distribution)

### 1. Generate a Keystore (one time)
```bash
keytool -genkey -v -keystore calmnature-release.keystore \
  -alias calmnature -keyalg RSA -keysize 2048 -validity 10000
```
Remember the password!

### 2. Configure signing
Create `android/key.properties`:
```properties
storePassword=YOUR_PASSWORD
keyPassword=YOUR_PASSWORD
keyAlias=calmnature
storeFile=../../calmnature-release.keystore
```

Edit `android/app/build.gradle` to read this file (Capacitor docs: https://capacitorjs.com/docs/android/deploying-to-google-play)

### 3. Build the release APK
```bash
cd android
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/release/app-release.apk`

### 4. Test it!
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### 5. (Optional) Publish to Google Play
- Create a developer account: https://play.google.com/console ($25 one-time)
- Build a `.aab` instead: `./gradlew bundleRelease`
- Upload to Play Console

---

## 🐛 Troubleshooting

### "SDK location not found"
Create `android/local.properties`:
```
sdk.dir=/Users/you/Library/Android/sdk         # macOS
sdk.dir=C:\\Users\\You\\AppData\\Local\\Android\\Sdk   # Windows
sdk.dir=/home/you/Android/Sdk                  # Linux
```

### "JAVA_HOME is not set"
Set it to your JDK 17 path. In Android Studio: **File → Project Structure → SDK Location → Gradle JDK**.

### Audio doesn't play on Android
Modern Android requires a user gesture before audio context starts — the app already handles this (audio starts on first tap), so just tap any mood card.

### App doesn't keep screen awake
Make sure you granted no special permission (this works automatically). Verify by checking the app while a session is playing — screen should not dim.

### "Failed to load resource: net::ERR_FILE_NOT_FOUND"
Run `npm run build && npx cap sync android` to make sure the latest `dist/` is copied.

---

## 📂 Project Structure (after Android setup)

```
calmnature/
├── android/                          ← Native Android project (Gradle, Java)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/                 ← MainActivity.java
│   │   │   ├── res/                  ← Icons, splash, theme colors
│   │   │   └── AndroidManifest.xml   ← Permissions, app metadata
│   │   └── build.gradle              ← App-level build config
│   └── build.gradle                  ← Project-level build
├── capacitor.config.ts               ← Capacitor configuration
├── dist/                             ← Built web app (synced into android/)
├── src/
│   ├── native/capacitor.ts           ← Native API wrapper (keep-awake, haptics, back button)
│   └── ...                           ← React app (works on web AND android)
├── scripts/
│   └── setup-android.sh              ← One-shot Android setup
└── ANDROID.md                        ← This file
```

---

## 🆚 Web vs Android — What Changes?

| Code | Web | Android |
|------|-----|---------|
| All React components | ✅ Same | ✅ Same |
| Web Audio API (synthesis) | ✅ Works | ✅ Works (same engine) |
| `localStorage` (mixes/history) | ✅ Works | ✅ Works (persisted natively) |
| `enableKeepAwake()` | No-op | ✅ Real keep-awake |
| `hapticTap()` | No-op | ✅ Real vibration |
| Back button | Browser back | ✅ Custom handler |
| Splash screen | None | ✅ 1.5s branded splash |

The genius of Capacitor: **one codebase, two outputs**. Your web app at `dist/index.html` and your Android app at `android/app/build/outputs/apk/` come from the SAME source code.

---

## 🚀 Future Enhancements

- **iOS build** — same approach: `npm install @capacitor/ios && npx cap add ios`
- **Background audio** — add `@capacitor-community/background-mode` so sounds keep playing when app is closed
- **Notifications** — daily meditation reminders via `@capacitor/local-notifications`
- **In-app purchases** — premium mood packs via Google Play Billing plugin
- **Share** — let users share custom mixes via `@capacitor/share`

---

Made with ❤️  by your brother 🌿
