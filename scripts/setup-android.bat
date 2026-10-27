@echo off
REM =====================================================================
REM CalmNature - Android Setup Script (Windows)
REM
REM One-shot script for Windows users to add Android platform.
REM Run with: scripts\setup-android.bat
REM =====================================================================

echo.
echo CalmNature - Android Setup (Windows)
echo =====================================
echo.

REM Check Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Download from: https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version
echo.

REM Install dependencies
echo [1/4] Installing npm packages...
call npm install
if errorlevel 1 (
    echo [ERROR] npm install failed
    pause
    exit /b 1
)
echo.

REM Build web app
echo [2/4] Building web app...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo.

REM Add Android platform (if not exists)
if exist "android\" (
    echo [3/4] Android folder exists - skipping add
) else (
    echo [3/4] Adding Android platform...
    call npx cap add android
    if errorlevel 1 (
        echo [ERROR] Cap add android failed
        pause
        exit /b 1
    )
)
echo.

REM Sync
echo [4/4] Syncing web assets to Android...
call npx cap sync android
if errorlevel 1 (
    echo [ERROR] Sync failed
    pause
    exit /b 1
)
echo.

echo =====================================
echo SUCCESS! All set!
echo =====================================
echo.
echo Next steps:
echo.
echo   Option A - Open in Android Studio:
echo     npx cap open android
echo.
echo   Option B - Build APK from command line:
echo     cd android
echo     gradlew.bat assembleDebug
echo     APK will be at: android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Read PROJECT.md for the full guide.
echo.
pause
