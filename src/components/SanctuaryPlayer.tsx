import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Bell, Clock, Sun, Moon, Flame, Sunrise, Heart, Sparkles, Shield, Activity } from 'lucide-react';

interface DevotionalSong {
  id: string;
  title: string;
  artist: string;
  tag: string;
  file: string;
  durationHint: string;
  featured?: boolean;
}

interface HealingTrack {
  id: string;
  title: string;
  hz: string;
  purpose: string;
  description: string;
  file: string;
  tips: string;
  icon: React.ReactNode;
}

const HIT_DEVOTIONAL_SONGS: DevotionalSong[] = [
  // --- FLAGSHIP SONGS ---
  {
    id: 'manasa_smarami',
    title: 'Sri Venkatesam Manasa Smarami',
    artist: 'Sri Srinivasam Sritha Parijatham',
    tag: 'Year 2000 Golden Master Song',
    file: '/audio/devotional/sri-venkatesam-manasa-smarami.mp3',
    durationHint: 'Full Master (16 MB)',
    featured: true,
  },
  {
    id: 'hanuman_chalisa',
    title: 'Shree Hanuman Chalisa',
    artist: 'Hariharan (T-Series)',
    tag: 'JioSaavn Top Devotional Hit #1',
    file: '/audio/devotional/hanuman-chalisa-hariharan.mp3',
    durationHint: 'Morning Power',
    featured: true,
  },
  {
    id: 'govinda_koluvare',
    title: 'Govinda Govinda Yani Koluvare',
    artist: 'Annamacharya Sankeertana',
    tag: 'Year 2000 Super Hit Morning Bhajan',
    file: '/audio/devotional/govinda-govinda-yani-koluvare.mp3',
    durationHint: 'Temple Classic',
    featured: true,
  },
  {
    id: 'suprabhatam',
    title: 'Sri Venkateswara Suprabhatam',
    artist: 'M. S. Subbulakshmi',
    tag: 'Tirupati Balaji Sunrise Puja',
    file: '/audio/devotional/suprabhatam.mp3',
    durationHint: '20 mins (Full Puja)',
  },
  {
    id: 'jai_ganesh',
    title: 'Jai Ganesh Deva (Aarti)',
    artist: 'Anuradha Paudwal',
    tag: 'JioSaavn Morning Aarti',
    file: '/audio/devotional/jai-ganesh-deva.mp3',
    durationHint: 'Auspicious Start',
  },
  {
    id: 'gayatri_mantra',
    title: 'Gayatri Mantra (108 Times)',
    artist: 'Anuradha Paudwal',
    tag: 'Vedic Mind Peace & Clarity',
    file: '/audio/devotional/gayatri-mantra-108.mp3',
    durationHint: '108 Recitations',
  },
  {
    id: 'om_jai_jagdish',
    title: 'Om Jai Jagdish Hare',
    artist: 'Anuradha Paudwal',
    tag: 'Maha Vishnu Evening & Morning Aarti',
    file: '/audio/devotional/om-jai-jagdish-hare.mp3',
    durationHint: 'Evergreen Aarti',
  },
  {
    id: 'subah_subah_shiv',
    title: 'Subah Subah Le Shiv Ka Naam',
    artist: 'Hariharan',
    tag: 'Shiv Bholenath Morning Bhajan',
    file: '/audio/devotional/subah-subah-le-shiv-ka-naam.mp3',
    durationHint: 'Divine Morning',
  },
  {
    id: 'brahmam_okate',
    title: 'Brahmam Okate (Thandanana)',
    artist: 'Annamacharya Keertana',
    tag: 'Universal Oneness & Divine Peace',
    file: '/audio/devotional/brahmam-okate.mp3',
    durationHint: 'Classic Hit',
  },
  {
    id: 'muddugare_yashoda',
    title: 'Muddugare Yashoda',
    artist: 'Annamacharya Keertana',
    tag: 'Lord Balakrishna / Raga Kurinji',
    file: '/audio/devotional/muddugare-yashoda.mp3',
    durationHint: 'Devotional Bliss',
  },
  {
    id: 'kondalalo_nelakonna',
    title: 'Kondalalo Nelakonna Koneti Rayadu',
    artist: 'Annamacharya Keertana',
    tag: 'Seven Hills Lord Srinivasa',
    file: '/audio/devotional/kondalalo-nelakonna.mp3',
    durationHint: 'Temple Favorite',
  },
  {
    id: 'adivo_alladivo',
    title: 'Adivo Alladivo Sri Hari Vasamu',
    artist: 'Annamacharya Keertana',
    tag: 'Raga Madhyamavati / Sacred Hills',
    file: '/audio/devotional/adivo-alladivo.mp3',
    durationHint: 'Classic Hit',
  },
  {
    id: 'sreemannarayana',
    title: 'Sriman Narayana Sriman Narayana',
    artist: 'Annamacharya Keertana',
    tag: 'Maha Vishnu Namasmarana',
    file: '/audio/devotional/sreemannarayana.mp3',
    durationHint: 'Peaceful Chant',
  },
];

const HEALING_TRACKS: HealingTrack[] = [
  {
    id: 'pain_relief_174',
    title: '174 Hz Deep Pain Relief & Muscle Relaxation',
    hz: '174 Hz Solfeggio',
    purpose: "Specially for Mom's Leg Pain & Body Tension",
    description: 'Acts as a natural vibrational relaxant. Helps tight calf & leg muscles release tension, loosens spasms, and triggers calming endorphins.',
    file: '/audio/healing/174hz-pain-relief.mp3',
    tips: 'Elevate legs with 1-2 soft pillows under calves + apply gentle warmth. Play through room speakers at 35% volume.',
    icon: <Heart className="w-5 h-5 text-rose-400" />,
  },
  {
    id: 'home_cleanse_528',
    title: '528 Hz Transformation & Home Cleanse',
    hz: '528 Hz Solfeggio',
    purpose: 'Remove Negative Vibrations & Brighten Home',
    description: 'Produces a clean, uplifting resonance that clears heavy atmosphere and transforms the living hall into a peaceful, positive sanctuary.',
    file: '/audio/healing/528hz-home-cleanse.mp3',
    tips: 'Ideal for daytime background listening between 10:00 AM and 6:00 PM.',
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
  },
  {
    id: 'om_chanting_432',
    title: '432 Hz Sacred OM Chanting for Deep Peace',
    hz: '432 Hz Harmonic',
    purpose: 'Quiet Mind, Stress Reduction & Inner Balance',
    description: 'Aligned with natural vibrational geometries. Soothes the central nervous system and creates an oasis of meditative calm in the home.',
    file: '/audio/healing/432hz-om-chanting.mp3',
    tips: 'Great for resting, reading, or quiet meditation in the hall.',
    icon: <Shield className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'tibetan_bowls',
    title: 'Tibetan Singing Bowls Sound Bath',
    hz: 'Multi-Resonant Bowls',
    purpose: 'Cellular Restoration & Deep Rest',
    description: 'Rich, layered harmonic overtones that wash away mental fatigue and guide the body into deep delta/theta restorative states.',
    file: '/audio/healing/tibetan-singing-bowls.mp3',
    tips: 'Listen lying down with eyes closed for 15-20 minutes of restorative rest.',
    icon: <Activity className="w-5 h-5 text-purple-400" />,
  },
];

interface ScheduleTrack {
  id: string;
  name: string;
  period: string;
  description: string;
  file: string;
  icon: React.ReactNode;
}

const SCHEDULE_TRACKS: ScheduleTrack[] = [
  {
    id: 'morning_devotional',
    name: 'Morning Sri Venkatesam & Suprabhatam',
    period: '06:00 AM – 10:00 AM',
    description: 'Sri Venkatesam Manasa Smarami, Hanuman Chalisa, Suprabhatam & Annamayya Sankeertanalu for auspicious wake-up',
    file: '/audio/devotional/sri-venkatesam-manasa-smarami.mp3',
    icon: <Sunrise className="w-5 h-5 text-[#FFB74D]" />,
  },
  {
    id: 'daytime_healing',
    name: 'Daytime 174 Hz Healing & 528 Hz Home Energy',
    period: '10:00 AM – 06:00 PM',
    description: "174 Hz muscle pain relief for Mom's legs, 528 Hz home cleanse & hourly bronze temple bell chime every hour on the hour",
    file: '/audio/healing/174hz-pain-relief.mp3',
    icon: <Sun className="w-5 h-5 text-[#4FC3F7]" />,
  },
  {
    id: 'evening_sandhya',
    name: 'Evening Sandhya Pooja Devotion',
    period: '06:00 PM – 07:30 PM',
    description: 'Deeparadhana aarti resonance, C# Vedic tanpura drone & twilight temple chimes',
    file: '/audio/evening-sandhya.mp3',
    icon: <Flame className="w-5 h-5 text-[#FF7043]" />,
  },
  {
    id: 'night_flute',
    name: 'Night Peace & Krishna Flute',
    period: '07:30 PM – 11:00 PM',
    description: 'Krishna Bansuri flute in Raga Yaman, 528 Hz healing love frequency & Delta sleep waves',
    file: '/audio/night-sleep-flute.mp3',
    icon: <Moon className="w-5 h-5 text-[#BA68C8]" />,
  },
];

export default function SanctuaryPlayer() {
  const [currentPlayingTitle, setCurrentPlayingTitle] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.40);
  const [bellRinging, setBellRinging] = useState(false);
  const [activeTab, setActiveTab] = useState<'devotional' | 'healing' | 'schedule'>('devotional');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bellAudioRef = useRef<HTMLAudioElement | null>(null);

  const playSong = (file: string, title: string) => {
    if (currentPlayingTitle === title && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    audioRef.current.src = file;
    audioRef.current.volume = volume;
    audioRef.current.play()
      .then(() => {
        setCurrentPlayingTitle(title);
        setIsPlaying(true);
      })
      .catch((err) => console.log('Playback error:', err));
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const handleRingTempleBell = () => {
    if (!bellAudioRef.current) {
      bellAudioRef.current = new Audio('/audio/temple-bell-hourly.mp3');
    }
    bellAudioRef.current.currentTime = 0;
    bellAudioRef.current.volume = Math.min(1.0, volume * 1.5);
    bellAudioRef.current.play();
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 7000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 rounded-2xl bg-gradient-to-b from-[#141E38]/95 to-[#0A0E1A]/98 p-6 border border-[#FFD700]/40 shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden"
    >
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-3xl">🪔</span>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FFD700] via-[#FFA726] to-[#4FC3F7] bg-clip-text text-transparent">
              CalmNature Home Sanctuary & Devotional Audio
            </h3>
            <span className="text-[10px] tracking-widest font-bold text-[#FFD700] bg-[#FFD700]/15 px-2.5 py-1 rounded border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
              MASTER AUDIO
            </span>
          </div>
          <p className="text-xs text-[#90CAF9]/80">
            Featuring <strong>Sri Venkatesam Manasa Smarami</strong>, Hanuman Chalisa, JioSaavn Morning Hits, 174 Hz Leg Pain Relief & Hourly Bronze Bell.
          </p>
        </div>

        {/* Buttons right: Tabs + Temple Bell */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 text-xs flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('devotional')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'devotional'
                  ? 'bg-gradient-to-r from-[#FFB74D] to-[#FFA726] text-black shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Morning Devotional ({HIT_DEVOTIONAL_SONGS.length})
            </button>
            <button
              onClick={() => setActiveTab('healing')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'healing'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow'
                  : 'text-rose-300 hover:text-white'
              }`}
            >
              <Heart size={13} className="fill-current text-rose-300" />
              <span>Mom's Pain Relief (174 Hz)</span>
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'schedule'
                  ? 'bg-gradient-to-r from-[#4FC3F7] to-[#29B6F6] text-black shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              24-Hour Schedule
            </button>
          </div>

          <button
            onClick={handleRingTempleBell}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-lg ${
              bellRinging
                ? 'bg-[#FFD700] text-black shadow-[#FFD700]/40 scale-105'
                : 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/40 hover:bg-[#FFD700]/20'
            }`}
          >
            <Bell className={`w-3.5 h-3.5 ${bellRinging ? 'animate-bounce text-black' : ''}`} />
            {bellRinging ? '🔔 Ringing...' : '🔔 Temple Bell'}
          </button>
        </div>
      </div>

      {/* Currently Playing Status Card */}
      {currentPlayingTitle && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 to-black/70 border border-emerald-500/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">NOW PLAYING IN HALL</span>
              <h4 className="text-sm font-bold text-white">{currentPlayingTitle}</h4>
            </div>
          </div>
          <button
            onClick={() => {
              if (audioRef.current) {
                if (isPlaying) audioRef.current.pause();
                else audioRef.current.play();
                setIsPlaying(!isPlaying);
              }
            }}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow"
          >
            {isPlaying ? 'Pause' : 'Resume'}
          </button>
        </div>
      )}

      {/* TAB 1: Morning Devotional Songs Jukebox */}
      {activeTab === 'devotional' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
          {HIT_DEVOTIONAL_SONGS.map((song) => {
            const isThisPlaying = currentPlayingTitle === song.title && isPlaying;
            return (
              <motion.div
                key={song.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  song.featured
                    ? isThisPlaying
                      ? 'bg-gradient-to-br from-[#FFD700]/25 to-black/90 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.35)]'
                      : 'bg-gradient-to-br from-[#FFD700]/10 to-white/5 border-[#FFD700]/40 hover:border-[#FFD700]'
                    : isThisPlaying
                    ? 'bg-white/15 border-white/50 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-base">
                      {song.featured ? '⭐' : '🙏'}
                    </span>
                    <span className="text-[10px] font-semibold text-[#FFB74D] bg-[#FFB74D]/10 px-2 py-0.5 rounded border border-[#FFB74D]/20">
                      {song.durationHint}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-0.5 leading-snug">{song.title}</h4>
                  <p className="text-xs text-[#FFD700] font-medium mb-1">{song.artist}</p>
                  <p className="text-[11px] text-white/60 mb-3">{song.tag}</p>
                </div>

                <button
                  onClick={() => playSong(song.file, song.title)}
                  className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-md ${
                    isThisPlaying
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      : song.featured
                      ? 'bg-gradient-to-r from-[#FFD700] via-[#FFA726] to-[#FF9800] text-black font-bold hover:brightness-110'
                      : 'bg-gradient-to-r from-[#FFB74D] to-[#FFA726] text-black font-semibold hover:brightness-105'
                  }`}
                >
                  {isThisPlaying ? (
                    <>
                      <Pause size={14} className="fill-current" />
                      <span>Pause Song</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} className="fill-current" />
                      <span>Play Song</span>
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Mom's Leg Pain Relief & Sound Therapy */}
      {activeTab === 'healing' && (
        <div className="space-y-6 mb-6">
          {/* Compassionate Guide Card for Mom */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-black/60 border border-rose-500/30 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm mb-1">
                <Heart size={16} className="fill-rose-400 text-rose-400" />
                <span>Comfort & Relief Guide for Your Mother</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed max-w-2xl">
                Chronic leg pain keeps muscles guarding and tense, making pain sharper. <strong>174 Hz Solfeggio frequency</strong> loosens muscle spasms, dilates tight vessels, and prompts natural endorphins.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-white/90">
              <span className="bg-rose-500/15 px-2.5 py-1 rounded-lg border border-rose-400/20">🛏️ Elevate legs on 1-2 soft pillows</span>
              <span className="bg-amber-500/15 px-2.5 py-1 rounded-lg border border-amber-400/20">🔥 Warm cloth / water bottle</span>
              <span className="bg-cyan-500/15 px-2.5 py-1 rounded-lg border border-cyan-400/20">🔊 Gentle Hall volume (30-35%)</span>
            </div>
          </div>

          {/* Healing Frequencies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HEALING_TRACKS.map((t) => {
              const isThisPlaying = currentPlayingTitle === t.title && isPlaying;
              return (
                <motion.div
                  key={t.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                    t.id === 'pain_relief_174'
                      ? isThisPlaying
                        ? 'bg-rose-950/60 border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.35)]'
                        : 'bg-rose-950/20 border-rose-500/40 hover:border-rose-400'
                      : isThisPlaying
                      ? 'bg-white/15 border-white/50 shadow-lg'
                      : 'bg-white/5 border-white/10 hover:border-white/25'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                        {t.icon}
                      </div>
                      <span className="text-[10px] font-bold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        {t.hz}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white mb-0.5">{t.title}</h4>
                    <p className="text-xs text-rose-300 font-medium mb-1.5">{t.purpose}</p>
                    <p className="text-[11px] text-white/70 mb-2 leading-relaxed">{t.description}</p>
                    <p className="text-[10px] text-amber-200/90 italic bg-black/30 p-2 rounded border border-white/5 mb-3">
                      💡 {t.tips}
                    </p>
                  </div>

                  <button
                    onClick={() => playSong(t.file, t.title)}
                    className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all shadow ${
                      isThisPlaying
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : t.id === 'pain_relief_174'
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:brightness-110'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {isThisPlaying ? 'Pause Frequency' : 'Play Therapy'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: 24-Hour Home Sanctuary Schedule */}
      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {SCHEDULE_TRACKS.map((t) => {
            const isThisPlaying = currentPlayingTitle === t.name && isPlaying;
            return (
              <motion.div
                key={t.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isThisPlaying
                    ? 'bg-white/15 border-white/50 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/25'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                      {t.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-0.5">{t.name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-[#FFB74D] font-medium mb-2">
                    <Clock size={12} />
                    <span>{t.period}</span>
                  </div>
                  <p className="text-[11px] text-white/60 mb-3">{t.description}</p>
                </div>

                <button
                  onClick={() => playSong(t.file, t.name)}
                  className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all shadow ${
                    isThisPlaying
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {isThisPlaying ? 'Pause' : 'Play Phase'}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Single Hall Volume & Alexa Voice Commands */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-black/50 border border-white/10 text-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Volume2 className="w-4 h-4 text-[#FFD700] shrink-0" />
          <span className="text-white/80 shrink-0 font-medium">Single Hall Volume:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-32 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
          />
          <span className="text-white font-bold w-10">{Math.round(volume * 100)}%</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-white/80 text-[11px]">
          <span className="font-semibold text-[#FFD700]">Alexa Echo Voice Commands:</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play pain relief"</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play 174 Hz"</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play Hanuman Chalisa"</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play Sri Venkatesam Manasa Smarami"</span>
        </div>
      </div>
    </motion.div>
  );
}
