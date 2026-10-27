import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Mood, Environment, Screen, SessionRecord, StressSample, CustomMix } from './types';

interface AppState {
  screen: Screen;
  setScreen: (screen: Screen) => void;

  selectedMood: Mood | null;
  selectMood: (mood: Mood) => void;

  selectedEnvironment: Environment | null;
  selectEnvironment: (env: Environment) => void;

  masterVolume: number;
  setMasterVolume: (v: number) => void;

  sessions: SessionRecord[];
  addSession: (session: SessionRecord) => void;
  clearSessions: () => void;

  currentSession: SessionRecord | null;
  startSession: () => void;
  addSample: (sample: StressSample) => void;
  endSession: () => SessionRecord | null;

  // Custom Mixes (Sound Lab)
  customMixes: CustomMix[];
  addCustomMix: (mix: CustomMix) => void;
  removeCustomMix: (id: string) => void;
  playCustomMix: (mix: CustomMix) => void;
}

const SESSIONS_KEY = 'calmnature_sessions_v2';
const VOLUME_KEY = 'calmnature_volume';
const MIXES_KEY = 'calmnature_custom_mixes_v1';

function loadCustomMixes(): CustomMix[] {
  try {
    const raw = localStorage.getItem(MIXES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}
function saveCustomMixes(m: CustomMix[]) {
  try { localStorage.setItem(MIXES_KEY, JSON.stringify(m)); } catch {}
}

function loadSessions(): SessionRecord[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}
function saveSessions(s: SessionRecord[]) {
  try { localStorage.setItem(SESSIONS_KEY, JSON.stringify(s)); } catch {}
}
function loadVolume(): number {
  try {
    const v = localStorage.getItem(VOLUME_KEY);
    if (v) return parseFloat(v);
  } catch {}
  return 0.7;
}

export const useAppStore = create<AppState>((set, get) => ({
  screen: 'mood',
  setScreen: (screen) => set({ screen }),

  selectedMood: null,
  selectMood: (mood) => set({ selectedMood: mood }),

  selectedEnvironment: null,
  selectEnvironment: (env) => set({ selectedEnvironment: env }),

  masterVolume: loadVolume(),
  setMasterVolume: (v) => {
    set({ masterVolume: v });
    try { localStorage.setItem(VOLUME_KEY, String(v)); } catch {}
  },

  sessions: loadSessions(),

  addSession: (session) => {
    const sessions = [session, ...get().sessions].slice(0, 100);
    set({ sessions });
    saveSessions(sessions);
  },

  clearSessions: () => {
    set({ sessions: [] });
    saveSessions([]);
  },

  currentSession: null,

  startSession: () => {
    const mood = get().selectedMood;
    const env = get().selectedEnvironment;
    if (!mood || !env) return;
    const session: SessionRecord = {
      id: uuidv4(),
      start: new Date().toISOString(),
      end: null,
      moodId: mood.id,
      moodLabel: mood.label,
      moodEmoji: mood.emoji,
      environmentId: env.id,
      environmentName: env.name,
      samples: [],
    };
    set({ currentSession: session });
  },

  addSample: (sample) => {
    const session = get().currentSession;
    if (!session) return;
    set({
      currentSession: { ...session, samples: [...session.samples, sample] },
    });
  },

  endSession: () => {
    const session = get().currentSession;
    if (!session) return null;
    const ended: SessionRecord = { ...session, end: new Date().toISOString() };
    get().addSession(ended);
    set({ currentSession: null });
    return ended;
  },

  customMixes: loadCustomMixes(),
  addCustomMix: (mix) => {
    const next = [mix, ...get().customMixes];
    set({ customMixes: next });
    saveCustomMixes(next);
  },
  removeCustomMix: (id) => {
    const next = get().customMixes.filter(m => m.id !== id);
    set({ customMixes: next });
    saveCustomMixes(next);
  },
  playCustomMix: (mix) => {
    // Convert mix into a pseudo-environment & route through existing player
    const env: Environment = {
      id: `mix_${mix.id}`,
      name: mix.name,
      emoji: mix.emoji,
      description: `Custom mix · ${mix.layers.length} layers`,
      layers: mix.layers,
      bgGradient: mix.bgGradient || 'linear-gradient(135deg, #1a4a4a 0%, #0a1a3a 100%)',
    };
    // Default mood for custom mixes
    const customMood: Mood = {
      id: 'calm',
      label: 'Custom Mix',
      emoji: mix.emoji,
      tagline: 'Your personal soundscape',
      description: 'A mix you crafted in the Sound Lab',
      color: '#4DB6AC',
      bgGradient: env.bgGradient!,
      environmentIds: [env.id],
    };
    set({ selectedMood: customMood, selectedEnvironment: env, screen: 'playing' });
  },
}));
