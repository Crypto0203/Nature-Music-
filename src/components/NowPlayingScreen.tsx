import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, StopCircle, Volume2, Timer, Music } from 'lucide-react';
import { useAppStore } from '../store';
import { audioEngine } from '../audio/engine';
import { getBird, getTone } from '../data';
import WaveVisualizer from './WaveVisualizer';
import { SoundLayer } from '../types';
import {
  enableKeepAwake, disableKeepAwake, hapticTap, hapticSuccess,
  onBack, onAppStateChange,
} from '../native/capacitor';
import StarField from './StarField';
import BreathingGuide from './BreathingGuide';

export default function NowPlayingScreen() {
  const {
    selectedMood,
    selectedEnvironment,
    setScreen,
    addSample,
    endSession,
    startSession,
    masterVolume,
    setMasterVolume,
  } = useAppStore();

  const [elapsed, setElapsed] = useState(0);
  const [layerVolumes, setLayerVolumes] = useState<Record<string, number>>({});
  const sessionStarted = useRef(false);

  // Initialize layer volumes & start session once
  useEffect(() => {
    if (!selectedEnvironment) return;
    const init: Record<string, number> = {};
    selectedEnvironment.layers.forEach((l) => (init[l.id] = l.baseVolume));
    setLayerVolumes(init);

    if (!sessionStarted.current) {
      startSession();
      sessionStarted.current = true;
    }

    audioEngine.setMasterVolume(masterVolume);

    // 📱 Native: Keep screen on during meditation/playback
    enableKeepAwake();

    // 📱 Native: Handle Android back button = stop session
    const offBack = onBack(async () => {
      await handleStop();
      return true; // we handled it
    });

    // 📱 Native: Pause audio when app backgrounded, resume when active
    const offLifecycle = onAppStateChange((isActive) => {
      if (!isActive) {
        // App went to background — keep playing for now (could pause if desired)
        // Most users want sound to continue when phone is locked
      }
    });

    return () => {
      disableKeepAwake();
      offBack();
      offLifecycle();
    };
  }, [selectedEnvironment]);

  // Clock + sampling
  useEffect(() => {
    const clock = setInterval(() => setElapsed((p) => p + 1), 1000);
    const sampler = setInterval(() => {
      addSample({
        timestamp: new Date().toISOString(),
        stress: 0.5,
        sourceTag: selectedMood?.id || 'general',
      });
    }, 5000);
    return () => {
      clearInterval(clock);
      clearInterval(sampler);
    };
  }, [selectedMood, addSample]);

  if (!selectedMood || !selectedEnvironment) {
    setScreen('mood');
    return null;
  }

  const handleStop = async () => {
    hapticSuccess();
    endSession();
    await audioEngine.stop();
    await disableKeepAwake();
    sessionStarted.current = false;
    setScreen('mood');
  };

  // Light haptic on layer volume changes (native only, no-op on web)
  const handleLayerVolumeWithHaptic = (layerId: string, v: number) => {
    handleLayerVolume(layerId, v);
    if (Math.random() < 0.15) hapticTap('light'); // sparingly
  };
  void handleLayerVolumeWithHaptic; // available for future use

  const handleLayerVolume = (layerId: string, v: number) => {
    setLayerVolumes((prev) => ({ ...prev, [layerId]: v }));
    audioEngine.setLayerVolume(layerId, v);
  };

  const handleMasterVolume = (v: number) => {
    setMasterVolume(v);
    audioEngine.setMasterVolume(v);
  };

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const accent = selectedMood.color;

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <StarField />
      <div className="absolute inset-0" style={{ background: selectedEnvironment.bgGradient }} />
      <div className="absolute inset-0 bg-black/55" />

      {/* Animated ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl"
        style={{ background: accent, opacity: 0.15 }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl"
        style={{ background: accent, opacity: 0.12 }}
      />

      <div className="relative max-w-4xl mx-auto px-6 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setScreen('environments')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <Music size={12} />
            <span className="text-xs font-medium">Now Playing</span>
          </div>
        </div>

        {/* Visualizer & Breathing Guide */}
        <div className="flex flex-col items-center justify-center my-4 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <WaveVisualizer color={accent} stress={0.4} isPlaying={true} />
          </motion.div>
          <BreathingGuide />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">{selectedEnvironment.emoji}</span>
            {selectedEnvironment.region && (
              <span className="text-[10px] tracking-widest font-bold uppercase px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20">
                {selectedEnvironment.region}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-2">{selectedEnvironment.name}</h1>
          <p className="text-sm text-white/70 max-w-lg mx-auto">{selectedEnvironment.description}</p>
        </motion.div>

        {/* Timer pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/15">
            <Timer size={14} />
            <span className="text-sm font-mono">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border"
            style={{
              background: `${accent}25`,
              borderColor: `${accent}50`,
              color: accent,
            }}
          >
            {selectedMood.emoji} <span className="text-sm font-medium">{selectedMood.label}</span>
          </div>
        </motion.div>

        {/* Layer Mixer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/[0.05] backdrop-blur-xl rounded-3xl p-5 border border-white/10 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">
              Sound Layers · Mix Live
            </h3>
            <span className="text-xs text-white/40">{selectedEnvironment.layers.length} active</span>
          </div>
          <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
            {selectedEnvironment.layers.map((layer) => (
              <LayerRow
                key={layer.id}
                layer={layer}
                volume={layerVolumes[layer.id] ?? layer.baseVolume}
                accent={accent}
                onChange={(v) => handleLayerVolume(layer.id, v)}
              />
            ))}
          </div>
        </motion.div>

        {/* Master Volume */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/[0.05] backdrop-blur-xl rounded-2xl p-4 border border-white/10 mb-6"
        >
          <div className="flex items-center gap-3">
            <Volume2 size={18} className="text-white/60 flex-shrink-0" />
            <span className="text-sm text-white/70 w-20">Master</span>
            <input
              type="range"
              min={0}
              max={100}
              value={masterVolume * 100}
              onChange={(e) => handleMasterVolume(Number(e.target.value) / 100)}
              className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${accent} ${masterVolume * 100}%, rgba(255,255,255,0.1) ${masterVolume * 100}%)`,
              }}
            />
            <span className="text-sm font-mono text-white/70 w-10 text-right">
              {Math.round(masterVolume * 100)}
            </span>
          </div>
        </motion.div>

        {/* Stop */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={handleStop}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-red-500/80 hover:bg-red-500 text-white font-semibold transition-colors backdrop-blur-md border border-red-400/40"
          >
            <StopCircle size={18} />
            Stop Session
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function LayerRow({ layer, volume, accent, onChange }: {
  layer: SoundLayer; volume: number; accent: string; onChange: (v: number) => void;
}) {
  let displayName = layer.name;
  let icon = '🎵';

  if (layer.kind === 'bird' && layer.birdSpeciesId) {
    const b = getBird(layer.birdSpeciesId);
    if (b) {
      icon = b.flag;
      displayName = `${b.name}`;
    }
  } else if (layer.kind === 'tone' && layer.toneId) {
    const t = getTone(layer.toneId);
    if (t) {
      icon = '🎵';
      displayName = `${t.name} — ${t.description}`;
    }
  } else {
    const iconMap: Record<string, string> = {
      bowl: '🔔', crystal_bowl: '💎', gong: '🥁',
      pad: '✨', cosmic_pad: '🌌',
      om: '🕉️', mantra: '🙏', throat_sing: '🎤',
      chimes: '🎐', wind_chimes: '🎐', temple_bell: '🛕', hang_drum: '🪘',
      flute: '🪈', bamboo_flute: '🎋',
      didgeridoo: '🎺', tanpura: '🪕', sitar_drone: '🎻',
      whale: '🐋', dolphin: '🐬',
      wolf: '🐺', heartbeat: '❤️', womb: '🤰',
      rain: '🌧️', rain_heavy: '🌧️', rain_tent: '⛺',
      thunder: '⚡', storm: '⛈️',
      ocean: '🌊', waves_gentle: '🌊', underwater: '🐠',
      fire: '🔥', campfire: '🔥',
      wind: '💨', wind_arctic: '❄️', wind_desert: '🏜️',
      forest: '🌲', jungle: '🌴',
      stream: '💧', waterfall: '💦', river_rapids: '🏞️',
      crickets: '🦗', frogs: '🐸', cicada: '🪲',
      brown: '🟫', pink: '🩷', white: '⚪',
      snow: '❄️', ice_crack: '🧊',
      train_distant: '🚂', cafe: '☕', library: '📚',
      // 🙏 Mantras
      mantra_om: '🕉️', mantra_om_namah_shivaya: '🕉️',
      mantra_hare_krishna: '🦚', mantra_gayatri: '☀️',
      mantra_mahamrityunjaya: '🪔', mantra_om_mani_padme_hum: '☸️',
      mantra_waheguru: '☬', mantra_gregorian: '⛪',
      mantra_sufi_allah: '☪️', mantra_native_american: '🪶',
      // 🪈 Krishna & mountain
      krishna_bansuri: '🪈', tibetan_horn: '📯', yak_bells: '🔔',
      cave_drips: '💧', avalanche: '⛰️',
      // 🦁 Wildlife
      lion_roar: '🦁', tiger_roar: '🐅', elephant_trumpet: '🐘',
      monkey_howler: '🐒', coyote_howl: '🐺', bear_growl: '🐻', deer_call: '🦌',
    };
    icon = iconMap[layer.kind] || '🎵';
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xl flex-shrink-0 w-7 text-center">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/85 truncate">{displayName}</span>
          <span className="text-[10px] text-white/40 font-mono ml-2">{Math.round(volume * 100)}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={volume * 100}
          onChange={(e) => onChange(Number(e.target.value) / 100)}
          className="w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${accent} ${volume * 100}%, rgba(255,255,255,0.08) ${volume * 100}%)`,
          }}
        />
      </div>
    </div>
  );
}
