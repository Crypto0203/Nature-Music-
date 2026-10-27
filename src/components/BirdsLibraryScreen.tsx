import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, Globe } from 'lucide-react';
import { useAppStore } from '../store';
import { BIRDS } from '../data';
import { audioEngine } from '../audio/engine';
import { BirdSpecies } from '../types';

const REGIONS = ['All', 'Europe', 'South Asia', 'East Asia', 'North America', 'Oceania', 'South America', 'Africa', 'Worldwide'];

export default function BirdsLibraryScreen() {
  const { setScreen } = useAppStore();
  const [region, setRegion] = useState('All');
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  const filtered = region === 'All' ? BIRDS : BIRDS.filter(b => b.region === region);

  const togglePlay = async (bird: BirdSpecies) => {
    if (playingId === bird.id) {
      await audioEngine.stop();
      setPlayingId(null);
    } else {
      await audioEngine.previewBird(bird);
      setPlayingId(bird.id);
    }
  };

  const handleBack = async () => {
    await audioEngine.stop();
    setPlayingId(null);
    setScreen('mood');
  };

  return (
    <div className="min-h-screen bg-[#050810] text-white relative">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FFB74D] opacity-[0.06] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#4FC3F7] opacity-[0.05] blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="flex items-center gap-2 text-[#B0BEC5] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Globe size={28} className="text-[#FFB74D]" />
            <h1 className="text-3xl sm:text-4xl font-bold">World Birds Library</h1>
          </div>
          <p className="text-[#B0BEC5]">
            Listen to {BIRDS.length} unique bird species from around the world. Each call is procedurally synthesized to match the real bird's signature voice.
          </p>
        </motion.div>

        {/* Region Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                region === r
                  ? 'bg-[#FFB74D] text-[#0a0a1a]'
                  : 'bg-white/[0.05] text-[#B0BEC5] hover:bg-white/10 border border-white/10'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Birds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((bird, i) => (
              <BirdCard
                key={bird.id}
                bird={bird}
                index={i}
                isPlaying={playingId === bird.id}
                onToggle={() => togglePlay(bird)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#607D8B]">
            <span className="text-4xl mb-4 block">🐦</span>
            No birds found in this region
          </div>
        )}
      </div>
    </div>
  );
}

function BirdCard({ bird, index, isPlaying, onToggle }: {
  bird: BirdSpecies; index: number; isPlaying: boolean; onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: 0.04 * index, duration: 0.3 }}
      className={`relative rounded-2xl p-4 border transition-all ${
        isPlaying
          ? 'bg-[#FFB74D]/15 border-[#FFB74D]/50 shadow-lg shadow-[#FFB74D]/10'
          : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.07]'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">{bird.flag}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-sm leading-tight">{bird.name}</h3>
            <button
              onClick={onToggle}
              className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-[#FFB74D] text-[#0a0a1a] shadow-lg shadow-[#FFB74D]/40'
                  : 'bg-white/10 text-white hover:bg-[#FFB74D] hover:text-[#0a0a1a]'
              }`}
            >
              {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            </button>
          </div>
          <p className="text-[10px] uppercase tracking-wider text-[#FFB74D] font-bold mb-1.5">
            {bird.country} · {bird.region}
          </p>
          <p className="text-xs text-white/65 leading-relaxed line-clamp-2">{bird.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] text-white/40 px-1.5 py-0.5 rounded bg-white/5">
              {bird.fundamental} Hz
            </span>
            <span className="text-[10px] text-white/40 px-1.5 py-0.5 rounded bg-white/5 capitalize">
              {bird.pattern}
            </span>
          </div>
        </div>
      </div>

      {isPlaying && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 8, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-0.5 bg-[#FFB74D] rounded-b-2xl"
        />
      )}
    </motion.div>
  );
}
