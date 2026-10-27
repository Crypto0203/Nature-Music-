import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Bell, Clock, Sun, Moon, Flame, Sunrise } from 'lucide-react';

interface DevotionalSong {
  id: string;
  title: string;
  artist: string;
  ragaOrDeity: string;
  file: string;
  durationHint: string;
}

const HIT_DEVOTIONAL_SONGS: DevotionalSong[] = [
  {
    id: 'suprabhatam',
    title: 'Sri Venkateswara Suprabhatam',
    artist: 'M. S. Subbulakshmi',
    ragaOrDeity: 'Lord Balaji / Tirupati Sunrise Prayer',
    file: '/audio/devotional/suprabhatam.mp3',
    durationHint: '20 mins (Full Morning Puja)',
  },
  {
    id: 'brahmam_okate',
    title: 'Brahmam Okate (Thandanana)',
    artist: 'Annamacharya Keertana',
    ragaOrDeity: 'Universal Oneness / Lord Venkateswara',
    file: '/audio/devotional/brahmam-okate.mp3',
    durationHint: 'Classic Hit',
  },
  {
    id: 'muddugare_yashoda',
    title: 'Muddugare Yashoda',
    artist: 'Annamacharya Keertana',
    ragaOrDeity: 'Lord Balakrishna / Raga Kurinji',
    file: '/audio/devotional/muddugare-yashoda.mp3',
    durationHint: 'Devotional Bliss',
  },
  {
    id: 'kondalalo_nelakonna',
    title: 'Kondalalo Nelakonna Koneti Rayadu',
    artist: 'Annamacharya Keertana',
    ragaOrDeity: 'Seven Hills Lord Srinivasa',
    file: '/audio/devotional/kondalalo-nelakonna.mp3',
    durationHint: 'Temple Favorite',
  },
  {
    id: 'adivo_alladivo',
    title: 'Adivo Alladivo Sri Hari Vasamu',
    artist: 'Annamacharya Keertana',
    ragaOrDeity: 'Raga Madhyamavati / Sacred Hills',
    file: '/audio/devotional/adivo-alladivo.mp3',
    durationHint: 'Classic Hit',
  },
  {
    id: 'sreemannarayana',
    title: 'Sriman Narayana Sriman Narayana',
    artist: 'Annamacharya Keertana',
    ragaOrDeity: 'Maha Vishnu Namasmarana',
    file: '/audio/devotional/sreemannarayana.mp3',
    durationHint: 'Peaceful Chant',
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
    name: '90s Morning Suprabhatam & Keertanalu',
    period: '06:00 AM – 10:00 AM',
    description: "M.S. Subbulakshmi's Suprabhatam & Annamayya Sankeertanalu for blissful morning wake-up",
    file: '/audio/devotional/suprabhatam.mp3',
    icon: <Sunrise className="w-5 h-5 text-[#FFB74D]" />,
  },
  {
    id: 'daytime_positive',
    name: 'Daytime Positive Home Energy',
    period: '10:00 AM – 06:00 PM',
    description: 'Uplifting 432 Hz clear-mind frequency, gentle forest breeze & morning songbirds',
    file: '/audio/morning-positive.mp3',
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
  const [activeTab, setActiveTab] = useState<'devotional' | 'schedule'>('devotional');

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
      className="mb-12 rounded-2xl bg-gradient-to-b from-[#141E38]/95 to-[#0A0E1A]/98 p-6 border border-[#FFD700]/30 shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden"
    >
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl">🪔</span>
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FFD700] via-[#FFA726] to-[#4FC3F7] bg-clip-text text-transparent">
              90s Morning All-Time Hit Devotional Songs
            </h3>
            <span className="text-[10px] tracking-widest font-bold text-[#FFD700] bg-[#FFD700]/15 px-2.5 py-1 rounded border border-[#FFD700]/30 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
              INBUILT AUDIO
            </span>
          </div>
          <p className="text-xs text-[#90CAF9]/80">
            Wake up every morning to real legendary devotional songs (M.S. Subbulakshmi & Annamayya Sankeertanalu).
          </p>
        </div>

        {/* Buttons right: Tabs + Temple Bell */}
        <div className="flex items-center gap-3">
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('devotional')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'devotional'
                  ? 'bg-gradient-to-r from-[#FFB74D] to-[#FFA726] text-black shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Devotional Songs
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
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-black/60 border border-emerald-500/40 flex items-center justify-between">
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

      {/* TAB 1: 90s Devotional Hit Songs Jukebox */}
      {activeTab === 'devotional' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
          {HIT_DEVOTIONAL_SONGS.map((song) => {
            const isThisPlaying = currentPlayingTitle === song.title && isPlaying;
            return (
              <motion.div
                key={song.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isThisPlaying
                    ? 'bg-gradient-to-br from-[#FFD700]/20 to-black/80 border-[#FFD700]/70 shadow-[0_0_25px_rgba(255,215,0,0.25)]'
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-lg bg-black/40 border border-white/10 text-lg">
                      🙏
                    </span>
                    <span className="text-[10px] font-semibold text-[#FFB74D] bg-[#FFB74D]/10 px-2 py-0.5 rounded border border-[#FFB74D]/20">
                      {song.durationHint}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-0.5">{song.title}</h4>
                  <p className="text-xs text-[#FFD700] font-medium mb-1">{song.artist}</p>
                  <p className="text-[11px] text-white/60 mb-3">{song.ragaOrDeity}</p>
                </div>

                <button
                  onClick={() => playSong(song.file, song.title)}
                  className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-md ${
                    isThisPlaying
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                      : 'bg-gradient-to-r from-[#FFB74D] to-[#FFA726] hover:from-[#FFA726] hover:to-[#FB8C00] text-black font-semibold'
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

      {/* TAB 2: 24-Hour Home Sanctuary Schedule */}
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
          <span className="font-semibold text-[#FFD700]">Alexa Voice Commands:</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play Suprabhatam"</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play Brahmam Okate"</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play 90s songs"</span>
        </div>
      </div>
    </motion.div>
  );
}
