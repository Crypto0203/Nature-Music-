import { motion } from 'framer-motion';
import { History, Settings, Bird, Sparkles, FlaskConical } from 'lucide-react';
import { MOODS, BIRDS, ENVIRONMENTS, HEALING_TONES } from '../data';
import { useAppStore } from '../store';
import { Mood } from '../types';
import { hapticTap } from '../native/capacitor';
import StarField from './StarField';

export default function MoodScreen() {
  const { selectMood, setScreen, customMixes, playCustomMix } = useAppStore();

  const handleSelect = (mood: Mood) => {
    hapticTap('light');
    selectMood(mood);
    setScreen('environments');
  };

  return (
    <div className="min-h-screen bg-[#050810] text-white">
      {/* Background ambient gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#4FC3F7] opacity-[0.07] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#BA68C8] opacity-[0.07] blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#FFB74D] opacity-[0.05] blur-[120px]" />
      </div>

      <StarField />

      <div className="relative max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="text-5xl">🌿</span>
              <Sparkles size={14} className="absolute -top-1 -right-1 text-[#FFB74D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#4FC3F7] via-[#BA68C8] to-[#FFB74D] bg-clip-text text-transparent">
                  CalmNature
                </h1>
                <span className="text-[10px] tracking-widest font-bold text-[#FFD700] bg-[#FFD700]/10 px-2 py-0.5 rounded-md border border-[#FFD700]/40 shadow-[0_0_10px_rgba(255,215,0,0.2)]">
                  ULTRA-PRO
                </span>
              </div>
              <p className="text-sm text-[#90CAF9]/80 mt-0.5">
                World birds · Healing frequencies · Sound therapy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NavButton icon={<FlaskConical size={18} />} label="Sound Lab" onClick={() => setScreen('sound-lab')} highlight />
            <NavButton icon={<Bird size={18} />} label="Birds" onClick={() => setScreen('birds')} />
            <NavButton icon={<History size={18} />} label="History" onClick={() => setScreen('history')} />
            <NavButton icon={<Settings size={18} />} label="Settings" onClick={() => setScreen('settings')} />
          </div>
        </motion.div>

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-3 leading-tight">
            How do you want to <span className="bg-gradient-to-r from-[#FFB74D] to-[#F06292] bg-clip-text text-transparent">feel</span>?
          </h2>
          <p className="text-[#90CAF9]/70 max-w-xl mx-auto">
            Pick a mood and let healing nature sounds from around the world transform your state.
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <StatPill emoji="🌍" value={`${BIRDS.length}`} label="World Birds" color="#FFB74D" />
          <StatPill emoji="🌌" value={`${ENVIRONMENTS.length}`} label="Soundscapes" color="#4FC3F7" />
          <StatPill emoji="🎵" value={`${HEALING_TONES.length}`} label="Healing Tones" color="#BA68C8" />
          <StatPill emoji="🎭" value={`${MOODS.length}`} label="Moods" color="#F06292" />
        </motion.div>

        {/* Mood Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {MOODS.map((mood, i) => (
            <MoodCard key={mood.id} mood={mood} index={i} onClick={() => handleSelect(mood)} />
          ))}
        </div>

        {/* My Custom Mixes (Sound Lab) */}
        {customMixes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#4DB6AC]" />
                <h3 className="text-lg font-bold">My Custom Mixes</h3>
                <span className="text-[10px] tracking-widest font-bold text-[#4DB6AC] bg-[#4DB6AC]/10 px-2 py-0.5 rounded-md border border-[#4DB6AC]/30">
                  FROM SOUND LAB
                </span>
              </div>
              <button
                onClick={() => setScreen('sound-lab')}
                className="text-xs text-[#4DB6AC] hover:underline"
              >Open Sound Lab →</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {customMixes.slice(0, 8).map((m, i) => (
                <motion.button
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{ y: -2 }}
                  onClick={() => playCustomMix(m)}
                  className="bg-white/[0.04] border border-white/10 hover:border-[#4DB6AC]/40 hover:bg-[#4DB6AC]/5 rounded-2xl p-3.5 flex items-center gap-3 transition-all text-left"
                >
                  <span className="text-3xl">{m.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{m.name}</p>
                    <p className="text-[10px] text-white/50">{m.layers.length} layers</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Footer hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-xs text-[#607D8B]"
        >
          🎧 Use headphones for the best experience · Binaural beats require stereo
        </motion.div>
      </div>
    </div>
  );
}

function StatPill({ emoji, value, label, color }: { emoji: string; value: string; label: string; color: string }) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-md border"
      style={{ borderColor: `${color}30` }}
    >
      <span className="text-lg">{emoji}</span>
      <div className="flex items-baseline gap-1.5">
        <span className="font-bold text-base" style={{ color }}>{value}</span>
        <span className="text-xs text-white/60">{label}</span>
      </div>
    </div>
  );
}

function NavButton({ icon, label, onClick, highlight }: { icon: React.ReactNode; label: string; onClick: () => void; highlight?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${
        highlight
          ? 'bg-gradient-to-r from-[#4DB6AC]/20 to-[#BA68C8]/20 border-[#4DB6AC]/40 text-[#4DB6AC] hover:from-[#4DB6AC]/30 hover:to-[#BA68C8]/30'
          : 'bg-white/[0.04] border-white/[0.06] text-[#B0BEC5] hover:bg-white/[0.08] hover:text-white hover:border-white/10'
      }`}
    >
      {icon}
      <span className="text-sm hidden md:inline">{label}</span>
    </button>
  );
}

function MoodCard({ mood, index, onClick }: { mood: Mood; index: number; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.45 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl p-6 text-left aspect-[4/3] flex flex-col justify-between"
      style={{ background: mood.bgGradient }}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

      {/* Glow effect */}
      <div
        className="absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
        style={{ background: mood.color }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="text-5xl drop-shadow-lg">{mood.emoji}</div>
        <div
          className="text-xs uppercase tracking-widest font-bold px-2 py-1 rounded-md backdrop-blur-md"
          style={{
            backgroundColor: `${mood.color}30`,
            color: mood.color,
            border: `1px solid ${mood.color}50`,
          }}
        >
          {mood.environmentIds.length} sounds
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-1 drop-shadow">{mood.label}</h3>
        <p className="text-xs font-medium mb-2" style={{ color: mood.color }}>
          {mood.tagline}
        </p>
        <p className="text-xs text-white/70 line-clamp-2">{mood.description}</p>
      </div>
    </motion.button>
  );
}
