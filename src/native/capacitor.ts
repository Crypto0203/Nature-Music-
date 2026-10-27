// =====================================================================
// 📱 NATIVE CAPACITOR INTEGRATION
// Android-specific features: Keep Awake, Status Bar, Back Button,
// Haptics, App lifecycle events. All wrapped in feature-detection so
// the same code runs in browser AND on Android without errors.
// =====================================================================

import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export const isNative = Capacitor.isNativePlatform();
export const platform = Capacitor.getPlatform(); // 'web' | 'android' | 'ios'

// =====================================================================
// 🚀 INITIALIZATION (call once on app boot)
// =====================================================================
export async function initNative(): Promise<void> {
  if (!isNative) return;

  try {
    // Style status bar to match dark theme
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#050810' });
    await StatusBar.setOverlaysWebView({ overlay: false });
  } catch (e) {
    console.warn('StatusBar setup failed:', e);
  }

  try {
    // Hide splash screen with smooth fade
    await SplashScreen.hide({ fadeOutDuration: 400 });
  } catch (e) {
    console.warn('SplashScreen.hide failed:', e);
  }
}

// =====================================================================
// 🔋 KEEP SCREEN AWAKE (during playback)
// Prevents Android from dimming/locking while user is meditating
// =====================================================================
let keepAwakeActive = false;

export async function enableKeepAwake(): Promise<void> {
  if (!isNative || keepAwakeActive) return;
  try {
    await KeepAwake.keepAwake();
    keepAwakeActive = true;
  } catch (e) {
    console.warn('KeepAwake.keepAwake failed:', e);
  }
}

export async function disableKeepAwake(): Promise<void> {
  if (!isNative || !keepAwakeActive) return;
  try {
    await KeepAwake.allowSleep();
    keepAwakeActive = false;
  } catch (e) {
    console.warn('KeepAwake.allowSleep failed:', e);
  }
}

// =====================================================================
// 📳 HAPTIC FEEDBACK (subtle confirmation taps)
// =====================================================================
export async function hapticTap(intensity: 'light' | 'medium' | 'heavy' = 'light'): Promise<void> {
  if (!isNative) return;
  try {
    const style = intensity === 'light' ? ImpactStyle.Light
      : intensity === 'medium' ? ImpactStyle.Medium
      : ImpactStyle.Heavy;
    await Haptics.impact({ style });
  } catch {}
}

export async function hapticSuccess(): Promise<void> {
  if (!isNative) return;
  try { await Haptics.notification({ type: NotificationType.Success }); } catch {}
}

// =====================================================================
// 🔙 ANDROID BACK BUTTON HANDLING
// Provides app-specific back navigation instead of closing the app
// =====================================================================
type BackHandler = () => boolean | Promise<boolean>;
const backHandlers: BackHandler[] = [];

let backListenerInitialized = false;

export function initBackButtonHandler(): void {
  if (!isNative || backListenerInitialized) return;
  backListenerInitialized = true;

  App.addListener('backButton', async (data: { canGoBack: boolean }) => {
    const { canGoBack } = data;
    // Run handlers in reverse (LIFO — most recent screen handles first)
    for (let i = backHandlers.length - 1; i >= 0; i--) {
      const handled = await backHandlers[i]();
      if (handled) return;
    }
    // No handler took it — exit if root, otherwise let webview navigate
    if (!canGoBack) {
      App.exitApp();
    } else {
      window.history.back();
    }
  });
}

/** Register a back handler. Returns an unsubscribe function. */
export function onBack(handler: BackHandler): () => void {
  backHandlers.push(handler);
  return () => {
    const idx = backHandlers.indexOf(handler);
    if (idx >= 0) backHandlers.splice(idx, 1);
  };
}

// =====================================================================
// 🔄 APP LIFECYCLE (pause/resume audio when app is backgrounded)
// =====================================================================
export type LifecycleHandler = (isActive: boolean) => void;
const lifecycleHandlers: LifecycleHandler[] = [];

let lifecycleInitialized = false;

export function initLifecycleHandler(): void {
  if (!isNative || lifecycleInitialized) return;
  lifecycleInitialized = true;

  App.addListener('appStateChange', (data: { isActive: boolean }) => {
    const { isActive } = data;
    lifecycleHandlers.forEach(h => h(isActive));
  });
}

export function onAppStateChange(handler: LifecycleHandler): () => void {
  lifecycleHandlers.push(handler);
  return () => {
    const idx = lifecycleHandlers.indexOf(handler);
    if (idx >= 0) lifecycleHandlers.splice(idx, 1);
  };
}
