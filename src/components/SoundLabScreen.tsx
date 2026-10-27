import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, Play, Pause, Plus, X, Save,
  PlayCircle, Sparkles, Trash2, FlaskConical, Wand2, MessageSquare,
} from 'lucide-react';
import { useAppStore } from '../store';
import { audioEngine } from '../audio/engine';
import StarField from './StarField';
import {
  ALL_MOODS, ALL_FREQS, ALL_TEMPOS,
  ALL_ENERGIES, ALL_CATEGORIES, filterSounds, buildLayerFromTag,
  recommendForMood, getStats, SoundFilters,
} from '../audio/tagger';
import { SoundTag, MoodTag, FreqBand, Tempo, Energy, SoundLayer, CustomMix } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface MixLayer {
  tag: SoundTag;
  layer: SoundLayer;
  volume: number;
}

export default function SoundLabScreen() {
  const { setScreen, customMixes, addCustomMix, removeCustomMix, playCustomMix } = useAppStore();

  // Filters
  const [search, setSearch] = useState('');
  const [moodFilter, setMoodFilter] = useState<MoodTag[]>([]);
  const [freqFilter, setFreqFilter] = useState<FreqBand[]>([]);
  const [tempoFilter, setTempoFilter] = useState<Tempo[]>([]);
  const [energyFilter, setEnergyFilter] = useState<Energy[]>([]);
  const [catFilter, setCatFilter] = useState<SoundTag['category'][]>([]);

  // Preview
  const [previewId, setPreviewId] = useState<string | null>(null);

  // Mix builder
  const [mix, setMix] = useState<MixLayer[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [mixName, setMixName] = useState('');
  const [mixEmoji, setMixEmoji] = useState('🎼');
  const [showMyMixes, setShowMyMixes] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const stats = useMemo(() => getStats(), []);

  const filters: SoundFilters = {
    search: search || undefined,
    moods: moodFilter.length ? moodFilter : undefined,
    freqs: freqFilter.length ? freqFilter : undefined,
    tempos: tempoFilter.length ? tempoFilter : undefined,
    energies: energyFilter.length ? energyFilter : undefined,
    categories: catFilter.length ? catFilter : undefined,
  };

  const filteredSounds = useMemo(() => filterSounds(filters), [search, moodFilter, freqFilter, tempoFilter, energyFilter, catFilter]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { audioEngine.stop(); };
  }, []);

  const togglePreview = async (s: SoundTag) => {
    if (previewId === s.id) {
      await audioEngine.stop();
      setPreviewId(null);
    } else {
      // Build temporary single-layer environment
      const layer = buildLayerFromTag(s, 0.7);
      await audioEngine.playEnvironment({
        id: `prev_${s.id}`,
        name: s.name, emoji: s.emoji,
        description: '',
        layers: [layer],
        bgGradient: '',
      });
      setPreviewId(s.id);
    }
  };

  const addToMix = (s: SoundTag) => {
    if (mix.find(m => m.tag.id === s.id)) return;
    const layer = buildLayerFromTag(s, s.defaultVolume);
    setMix(prev => [...prev, { tag: s, layer, volume: s.defaultVolume }]);
  };

  const removeFromMix = (tagId: string) => {
    setMix(prev => prev.filter(m => m.tag.id !== tagId));
  };

  const updateMixVolume = (tagId: string, vol: number) => {
    setMix(prev => prev.map(m =>
      m.tag.id === tagId ? { ...m, volume: vol, layer: { ...m.layer, baseVolume: vol } } : m
    ));
  };

  const playMix = async () => {
    if (mix.length === 0) return;
    await audioEngine.stop();
    setPreviewId(null);
    const layers = mix.map(m => ({ ...m.layer, baseVolume: m.volume }));
    await audioEngine.playEnvironment({
      id: `mix_preview_${Date.now()}`,
      name: 'Custom Mix', emoji: '🎼',
      description: `${layers.length} layers`,
      layers,
      bgGradient: '',
    });
  };

  const stopMix = async () => {
    await audioEngine.stop();
    setPreviewId(null);
  };

  const startFullSession = () => {
    if (mix.length === 0) return;
    const customMix: CustomMix = {
      id: uuidv4(),
      name: 'Quick Mix',
      emoji: '🎼',
      createdAt: new Date().toISOString(),
      layers: mix.map(m => ({ ...m.layer, baseVolume: m.volume })),
    };
    audioEngine.stop();
    setPreviewId(null);
    playCustomMix(customMix);
  };

  const saveMix = () => {
    if (mix.length === 0 || !mixName.trim()) return;
    const newMix: CustomMix = {
      id: uuidv4(),
      name: mixName.trim(),
      emoji: mixEmoji,
      createdAt: new Date().toISOString(),
      layers: mix.map(m => ({ ...m.layer, baseVolume: m.volume })),
    };
    addCustomMix(newMix);
    setShowSaveModal(false);
    setMixName('');
    setMixEmoji('🎼');
  };

  const smartMix = (mood: MoodTag) => {
    const recs = recommendForMood(mood);
    setMix(recs.map(t => ({
      tag: t,
      layer: buildLayerFromTag(t, t.defaultVolume),
      volume: t.defaultVolume,
    })));
  };

  const handleAiMix = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    
    // Artificial delay for "AI feel"
    await new Promise(r => setTimeout(r, 1500));
    
    const prompt = aiPrompt.toLowerCase();
    
    // Find a matching mood based on keywords
    let matchedMood: MoodTag = 'calm';
    if (prompt.includes('rain') || prompt.includes('water')) matchedMood = 'calm';
    if (prompt.includes('focus') || prompt.includes('study')) matchedMood = 'focus';
    if (prompt.includes('spiritual') || prompt.includes('temple')) matchedMood = 'sacred';
    if (prompt.includes('sleep') || prompt.includes('night')) matchedMood = 'sleep';
    if (prompt.includes('happy') || prompt.includes('morning')) matchedMood = 'happy';

    const recs = recommendForMood(matchedMood);
    setMix(recs.map(t => ({
      tag: t,
      layer: buildLayerFromTag(t, t.defaultVolume),
      volume: t.defaultVolume,
    })));
    
    setIsAiLoading(false);
    setAiPrompt('');
  };

  const clearAllFilters = () => {
    setSearch(''); setMoodFilter([]); setFreqFilter([]);
    setTempoFilter([]); setEnergyFilter([]); setCatFilter([]);
  };

  const handleBack = async () => {
    await audioEngine.stop();
    setScreen('mood');
  };

  return (
    <div className="min-h-screen bg-[#050810] text-white relative">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#4DB6AC] opacity-[0.05] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#BA68C8] opacity-[0.05] blur-[120px]" />
      </div>

      <StarField />

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-6 flex-wrap gap-4"
        >
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#B0BEC5] hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back</span>
          </button>
          <button
            onClick={() => setShowMyMixes(!showMyMixes)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all border ${
              showMyMixes
                ? 'bg-[#4DB6AC] text-[#0a0a1a] border-[#4DB6AC]'
                : 'bg-white/[0.05] text-[#B0BEC5] hover:text-white border-white/10'
            }`}
          >
            <Sparkles size={16} />
            <span className="text-sm">My Mixes ({customMixes.length})</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical size={28} className="text-[#4DB6AC]" />
            <h1 className="text-3xl sm:text-4xl font-bold">Sound Lab</h1>
            <span className="text-[10px] tracking-widest font-bold text-[#4DB6AC] bg-[#4DB6AC]/10 px-2 py-0.5 rounded-md border border-[#4DB6AC]/30">
              SMART MIXER
            </span>
          </div>
          <p className="text-[#B0BEC5] max-w-3xl">
            Browse {stats.total} auto-tagged sounds. Filter by mood, frequency, tempo & energy. Build & save your own mixes.
          </p>
        </motion.div>

        {/* MY MIXES Drawer */}
        <AnimatePresence>
          {showMyMixes && customMixes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">Saved Mixes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {customMixes.map(m => (
                    <div key={m.id} className="bg-white/[0.04] rounded-xl p-3 flex items-center gap-3 group">
                      <span className="text-2xl">{m.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{m.name}</p>
                        <p className="text-[10px] text-white/50">{m.layers.length} layers</p>
                      </div>
                      <button
                        onClick={() => playCustomMix(m)}
                        className="w-8 h-8 rounded-full bg-[#4DB6AC] text-[#0a0a1a] flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Play size={12} fill="currentColor" />
                      </button>
                      <button
                        onClick={() => removeCustomMix(m.id)}
                        className="text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI PROMPT SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#4DB6AC]/15 via-[#BA68C8]/15 to-[#FFD700]/15 border border-[#FFD700]/20 rounded-2xl p-5 mb-6 shadow-[0_0_20px_rgba(255,215,0,0.05)]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-[#FFD700]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700]">Ultra-Pro AI Mix Generator</span>
          </div>
          
          <div className="flex gap-3">
            <div className="relative flex-1">
              <MessageSquare size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Describe your vibe (e.g., 'Rainy forest morning' or 'Ancient temple peace')..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiMix()}
                className="w-full bg-black/30 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm placeholder-white/30 focus:outline-none focus:border-[#FFD700]/40 transition-all"
              />
            </div>
            <button
              onClick={handleAiMix}
              disabled={isAiLoading || !aiPrompt.trim()}
              className="px-6 py-3.5 rounded-xl bg-[#FFD700] text-[#0a0a1a] font-bold text-sm hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
            >
              {isAiLoading ? (
                <div className="w-4 h-4 border-2 border-[#0a0a1a]/30 border-t-[#0a0a1a] rounded-full animate-spin" />
              ) : (
                <Wand2 size={16} />
              )}
              {isAiLoading ? 'Synthesizing...' : 'Generate'}
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-[10px] uppercase font-bold text-white/30 mr-2 flex items-center">Or try a recipe:</span>
            {ALL_MOODS.map(m => (
              <button
                key={m}
                onClick={() => smartMix(m)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/5 text-[10px] hover:bg-[#4DB6AC]/20 hover:border-[#4DB6AC]/40 transition-all capitalize text-white/60 hover:text-white"
              >
                {m}
              </button>
            ))}
          </div>
        </motion.div>

        {/* MAIN GRID: filters+sounds | mix builder */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* LEFT: Filters + Sound Library */}
          <div>
            {/* Search */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search 70+ sounds (e.g. 'rain', 'whale', 'koel')..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm placeholder-white/30 focus:outline-none focus:border-[#4DB6AC]/60 transition-colors"
              />
            </div>

            {/* Filter chips */}
            <div className="space-y-2.5 mb-5">
              <FilterRow label="Mood" options={ALL_MOODS} selected={moodFilter} onChange={setMoodFilter as any} color="#FFB74D" />
              <FilterRow label="Frequency" options={ALL_FREQS} selected={freqFilter} onChange={setFreqFilter as any} color="#4FC3F7" />
              <FilterRow label="Tempo" options={ALL_TEMPOS} selected={tempoFilter} onChange={setTempoFilter as any} color="#BA68C8" />
              <FilterRow label="Energy" options={ALL_ENERGIES} selected={energyFilter} onChange={setEnergyFilter as any} color="#F06292" />
              <FilterRow
                label="Category"
                options={ALL_CATEGORIES.map(c => c.id)}
                selected={catFilter}
                onChange={setCatFilter as any}
                color="#81C784"
                getLabel={(id) => {
                  const c = ALL_CATEGORIES.find(x => x.id === id);
                  return c ? `${c.emoji} ${c.label}` : id;
                }}
              />
              {(moodFilter.length + freqFilter.length + tempoFilter.length + energyFilter.length + catFilter.length + (search ? 1 : 0)) > 0 && (
                <button onClick={clearAllFilters} className="text-xs text-white/50 hover:text-white underline">
                  Clear all filters
                </button>
              )}
            </div>

            {/* Result count */}
            <p className="text-xs text-white/50 mb-3">
              {filteredSounds.length} {filteredSounds.length === 1 ? 'sound' : 'sounds'} matching your filters
            </p>

            {/* Sound Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[600px] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {filteredSounds.map((s, i) => (
                  <SoundCard
                    key={s.id}
                    sound={s}
                    index={i}
                    isPreviewing={previewId === s.id}
                    isInMix={!!mix.find(m => m.tag.id === s.id)}
                    onPreview={() => togglePreview(s)}
                    onAdd={() => addToMix(s)}
                  />
                ))}
              </AnimatePresence>
            </div>
            {filteredSounds.length === 0 && (
              <div className="text-center py-16 text-white/40">
                <span className="text-4xl mb-3 block">🔍</span>
                No sounds match your filters
              </div>
            )}
          </div>

          {/* RIGHT: Mix Builder */}
          <div className="lg:sticky lg:top-6 self-start">
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FlaskConical size={16} className="text-[#4DB6AC]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest">My Mix</h3>
                </div>
                <span className="text-xs text-white/50">{mix.length} {mix.length === 1 ? 'layer' : 'layers'}</span>
              </div>

              {mix.length === 0 ? (
                <div className="py-12 text-center">
                  <span className="text-4xl mb-2 block">🎼</span>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Add sounds from the library<br/>or use a Smart Mix recipe above
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto pr-1">
                    {mix.map((m) => (
                      <MixRow
                        key={m.tag.id}
                        item={m}
                        onRemove={() => removeFromMix(m.tag.id)}
                        onVolume={(v) => updateMixVolume(m.tag.id, v)}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={previewId ? stopMix : playMix}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#4DB6AC] text-[#0a0a1a] font-semibold text-sm hover:bg-[#5BC9C0] transition-colors"
                    >
                      {previewId ? <><Pause size={14} fill="currentColor" /> Stop</> : <><PlayCircle size={14} fill="currentColor" /> Preview</>}
                    </button>
                    <button
                      onClick={() => setShowSaveModal(true)}
                      className="px-3 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white hover:bg-white/[0.1] transition-colors"
                      title="Save mix"
                    >
                      <Save size={14} />
                    </button>
                    <button
                      onClick={() => setMix([])}
                      className="px-3 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/70 hover:bg-red-500/15 hover:text-red-400 transition-colors"
                      title="Clear mix"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <button
                    onClick={startFullSession}
                    className="w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#4DB6AC] to-[#BA68C8] text-white font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    🎧 Start Full Session
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SAVE MODAL */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a2540] rounded-2xl p-6 max-w-sm w-full border border-white/10"
            >
              <h3 className="text-lg font-bold mb-4">Save Your Mix</h3>
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs text-white/60 block mb-1.5">Emoji</label>
                  <div className="flex flex-wrap gap-2">
                    {['🎼', '🌿', '🌊', '✨', '🌙', '☀️', '🔥', '🪷', '💎', '🌌'].map(e => (
                      <button
                        key={e}
                        onClick={() => setMixEmoji(e)}
                        className={`w-10 h-10 text-xl rounded-lg border-2 transition-all ${
                          mixEmoji === e ? 'border-[#4DB6AC] bg-[#4DB6AC]/15' : 'border-white/10 hover:border-white/30'
                        }`}
                      >{e}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/60 block mb-1.5">Mix Name</label>
                  <input
                    type="text"
                    autoFocus
                    placeholder="My Evening Wind-Down"
                    value={mixName}
                    onChange={(e) => setMixName(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4DB6AC]/60"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 transition-colors"
                >Cancel</button>
                <button
                  onClick={saveMix}
                  disabled={!mixName.trim()}
                  className="px-4 py-2 rounded-lg bg-[#4DB6AC] text-[#0a0a1a] font-semibold hover:bg-[#5BC9C0] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >Save Mix</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =====================================================================
// SUB-COMPONENTS
// =====================================================================

function FilterRow<T extends string>({ label, options, selected, onChange, color, getLabel }: {
  label: string; options: T[]; selected: T[]; onChange: (s: T[]) => void;
  color: string; getLabel?: (o: T) => string;
}) {
  const toggle = (o: T) => {
    onChange(selected.includes(o) ? selected.filter(x => x !== o) : [...selected, o]);
  };
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold w-16">{label}</span>
      <div className="flex flex-wrap gap-1.5 flex-1">
        {options.map(o => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              onClick={() => toggle(o)}
              className="px-2.5 py-1 rounded-md text-[11px] capitalize transition-all border"
              style={active ? {
                background: color, color: '#0a0a1a', borderColor: color,
              } : {
                background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.7)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              {getLabel ? getLabel(o) : o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SoundCard({ sound, index, isPreviewing, isInMix, onPreview, onAdd }: {
  sound: SoundTag; index: number; isPreviewing: boolean; isInMix: boolean;
  onPreview: () => void; onAdd: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.02, 0.3), duration: 0.25 }}
      className={`relative rounded-xl p-3 border transition-all ${
        isPreviewing
          ? 'bg-[#4DB6AC]/15 border-[#4DB6AC]/50'
          : isInMix
          ? 'bg-[#BA68C8]/10 border-[#BA68C8]/30'
          : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div className="text-2xl flex-shrink-0">{sound.emoji}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold leading-tight truncate">{sound.name}</h4>
          {sound.region && (
            <p className="text-[10px] uppercase tracking-wider text-white/40 mt-0.5">{sound.region}</p>
          )}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {sound.moods.slice(0, 3).map(m => (
              <span key={m} className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-white/70">
                {m}
              </span>
            ))}
            <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.06] text-white/50">
              {sound.freqBand}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={onPreview}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isPreviewing
                ? 'bg-[#4DB6AC] text-[#0a0a1a]'
                : 'bg-white/[0.08] text-white hover:bg-[#4DB6AC] hover:text-[#0a0a1a]'
            }`}
            title="Preview"
          >
            {isPreviewing ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" />}
          </button>
          <button
            onClick={onAdd}
            disabled={isInMix}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isInMix
                ? 'bg-[#BA68C8]/30 text-[#BA68C8] cursor-not-allowed'
                : 'bg-white/[0.08] text-white hover:bg-[#BA68C8] hover:text-white'
            }`}
            title={isInMix ? 'Already in mix' : 'Add to mix'}
          >
            {isInMix ? '✓' : <Plus size={12} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MixRow({ item, onRemove, onVolume }: {
  item: MixLayer; onRemove: () => void; onVolume: (v: number) => void;
}) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-lg p-2.5">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-base">{item.tag.emoji}</span>
        <span className="text-xs flex-1 truncate font-medium">{item.tag.name}</span>
        <button
          onClick={onRemove}
          className="text-white/40 hover:text-red-400 transition-colors"
        >
          <X size={12} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={0} max={100}
          value={item.volume * 100}
          onChange={(e) => onVolume(Number(e.target.value) / 100)}
          className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #4DB6AC ${item.volume * 100}%, rgba(255,255,255,0.08) ${item.volume * 100}%)`,
          }}
        />
        <span className="text-[10px] font-mono text-white/50 w-8 text-right">{Math.round(item.volume * 100)}</span>
      </div>
    </div>
  );
}
