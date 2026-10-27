import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { useAppStore } from '../store';
import { ENVIRONMENTS, getBird, getTone } from '../data';
import { audioEngine } from '../audio/engine';
import { Environment } from '../types';

export default function EnvironmentsScreen() {
  const { selectedMood, setScreen, selectEnvironment } = useAppStore();

  if (!selectedMood) {
    setScreen('mood');
    return null;
  }

  const envs = selectedMood.environmentIds
    .map((id) => ENVIRONMENTS.find((e) => e.id === id))
    .filter((e): e is Environment => Boolean(e));

  const handlePlay = (env: Environment) => {
    selectEnvironment(env);
    audioEngine.playEnvironment(env);
    setScreen('playing');
  };

  return (
    <div
      className="min-h-screen text-white relative"
      style={{ background: '#050810' }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: selectedMood.bgGradient }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-5xl mx-auto px-6 py-8">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setScreen('mood')}
          className="flex items-center gap-2 text-[#B0BEC5] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back to moods</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">{selectedMood.emoji}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">{selectedMood.label}</h1>
              <p className="text-sm" style={{ color: selectedMood.color }}>
                {selectedMood.tagline}
              </p>
            </div>
          </div>
          <p className="text-[#B0BEC5] max-w-2xl">{selectedMood.description}</p>
        </motion.div>

        {/* Environment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {envs.map((env, i) => (
            <EnvCard key={env.id} env={env} index={i} accentColor={selectedMood.color} onPlay={() => handlePlay(env)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EnvCard({ env, index, accentColor, onPlay }: {
  env: Environment; index: number; accentColor: string; onPlay: () => void;
}) {
  // Build a list of "ingredients" for preview
  const ingredients = env.layers.slice(0, 5).map((l) => {
    if (l.kind === 'bird' && l.birdSpeciesId) {
      const b = getBird(l.birdSpeciesId);
      return b ? `${b.flag} ${b.name}` : l.name;
    }
    if (l.kind === 'tone' && l.toneId) {
      const t = getTone(l.toneId);
      return t ? `🎵 ${t.name}` : l.name;
    }
    const m: Record<string, string> = {
      bowl: '🔔 Singing Bowl', crystal_bowl: '💎 Crystal Bowl', gong: '🥁 Deep Gong',
      pad: '✨ Ambient Pad', cosmic_pad: '🌌 Cosmic Pad',
      om: '🕉️ Om Drone', mantra: '🙏 Mantra Chant', throat_sing: '🎤 Throat Singing',
      chimes: '🎐 Chimes', wind_chimes: '🎐 Wind Chimes', temple_bell: '🛕 Temple Bell',
      hang_drum: '🪘 Hang Drum',
      flute: '🪈 Native Flute', bamboo_flute: '🎋 Shakuhachi',
      didgeridoo: '🎺 Didgeridoo', tanpura: '🪕 Tanpura', sitar_drone: '🎻 Sitar',
      whale: '🐋 Whale Song', dolphin: '🐬 Dolphins',
      wolf: '🐺 Wolf Howl', heartbeat: '❤️ Heartbeat', womb: '🤰 Womb',
      rain: '🌧️ Rain', rain_heavy: '🌧️ Heavy Rain', rain_tent: '⛺ Rain on Tent',
      thunder: '⚡ Thunder', storm: '⛈️ Storm',
      ocean: '🌊 Ocean', waves_gentle: '🌊 Gentle Waves', underwater: '🐠 Underwater',
      fire: '🔥 Fireplace', campfire: '🔥 Campfire',
      wind: '💨 Wind', wind_arctic: '❄️ Arctic Wind', wind_desert: '🏜️ Desert Wind',
      forest: '🌲 Forest', jungle: '🌴 Jungle',
      stream: '💧 Stream', waterfall: '💦 Waterfall', river_rapids: '🏞️ Rapids',
      crickets: '🦗 Crickets', frogs: '🐸 Frogs', cicada: '🪲 Cicadas',
      brown: '🟫 Brown Noise', pink: '🩷 Pink Noise', white: '⚪ White Noise',
      snow: '❄️ Snowfall', ice_crack: '🧊 Ice Cracks',
      train_distant: '🚂 Train', cafe: '☕ Cafe', library: '📚 Library',
      // 🙏 Mantras
      mantra_om: '🕉️ Om Mantra',
      mantra_om_namah_shivaya: '🕉️ Om Namah Shivaya',
      mantra_hare_krishna: '🦚 Hare Krishna',
      mantra_gayatri: '☀️ Gayatri Mantra',
      mantra_mahamrityunjaya: '🪔 Mahamrityunjaya',
      mantra_om_mani_padme_hum: '☸️ Om Mani Padme Hum',
      mantra_waheguru: '☬ Waheguru',
      mantra_gregorian: '⛪ Gregorian Chant',
      mantra_sufi_allah: '☪️ Sufi Allah',
      mantra_native_american: '🪶 Native Chant',
      // 🪈 Krishna's flute & mountain
      krishna_bansuri: "🪈 Krishna's Bansuri",
      tibetan_horn: '📯 Tibetan Horn',
      yak_bells: '🔔 Yak Bells',
      cave_drips: '💧 Cave Drips',
      avalanche: '⛰️ Avalanche',
      // 🦁 Wildlife
      lion_roar: '🦁 Lion Roar',
      tiger_roar: '🐅 Tiger Roar',
      elephant_trumpet: '🐘 Elephant',
      monkey_howler: '🐒 Howler Monkey',
      coyote_howl: '🐺 Coyote',
      bear_growl: '🐻 Bear',
      deer_call: '🦌 Deer Call',
    };
    return m[l.kind] || l.name;
  });

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.07 * index }}
      whileHover={{ y: -3 }}
      onClick={onPlay}
      className="group relative overflow-hidden rounded-3xl text-left flex flex-col"
      style={{ background: env.bgGradient, minHeight: 280 }}
    >
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />

      <div className="relative z-10 p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="text-5xl drop-shadow-lg">{env.emoji}</span>
          {env.region && (
            <span className="text-[10px] tracking-widest font-bold uppercase px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white">
              {env.region}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold mb-1.5 drop-shadow">{env.name}</h3>
        <p className="text-sm text-white/80 mb-4 leading-relaxed">{env.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {ingredients.map((ing, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-white/90"
            >
              {ing}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-xs text-white/60">{env.layers.length} layers</span>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all group-hover:scale-105"
            style={{
              background: accentColor,
              color: '#0a0a1a',
              boxShadow: `0 0 30px ${accentColor}50`,
            }}
          >
            <Play size={14} fill="currentColor" />
            Play
          </div>
        </div>
      </div>
    </motion.button>
  );
}
