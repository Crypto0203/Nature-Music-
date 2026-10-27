#!/usr/bin/env bash
# =====================================================================
# 📱 CalmNature — Android Setup Script
#
# One-shot script that adds the native Android project to your repo
# and prepares everything for building an APK.
#
# Run this ONCE after cloning the project.
# Requires: Node.js, Java JDK 17+, Android Studio (or Android SDK)
# =====================================================================

set -e

echo "🌿 CalmNature · Android Setup"
echo "=============================="
echo ""

# 1. Check prerequisites
echo "🔍 Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required. Install: https://nodejs.org"; exit 1; }
command -v npx  >/dev/null 2>&1 || { echo "❌ npx is required (comes with Node.js)"; exit 1; }
command -v java >/dev/null 2>&1 || { echo "⚠️  Java JDK 17+ recommended for Android build (Android Studio provides one)"; }
echo "✅ Node.js $(node -v)"
echo ""

# 2. Install dependencies (in case fresh clone)
echo "📦 Installing npm packages..."
npm install
echo ""

# 3. Build the web app (must exist before adding Android)
echo "🔨 Building web app..."
npm run build
echo ""

# 4. Add Android platform (only if not already added)
if [ -d "android" ]; then
  echo "📁 Android folder already exists — syncing latest changes..."
else
  echo "📱 Adding Android platform..."
  npx cap add android
fi
echo ""

# 5. Sync web assets into native project
echo "🔄 Syncing web assets to Android..."
npx cap sync android
echo ""

# 6. Done!
echo "✨ All set! Next steps:"
echo ""
echo "  Option A — Open in Android Studio (easiest):"
echo "    npx cap open android"
echo "    → Click ▶ Run to install on connected device/emulator"
echo ""
echo "  Option B — Build APK from command line:"
echo "    cd android"
echo "    ./gradlew assembleDebug"
echo "    → APK will be at: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "  Option C — Build a signed release APK:"
echo "    cd android"
echo "    ./gradlew assembleRelease"
echo ""
echo "📖 Full guide: see ANDROID.md"
