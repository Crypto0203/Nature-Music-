import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Bell, Clock, Sun, Moon, Flame, Sunrise } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  period: string;
  description: string;
  file: string;
  icon: React.ReactNode;
  color: string;
  bgGlow: string;
  defaultVol: number;
}

const SANCTUARY_TRACKS: Track[] = [
  {
    id: 'morning_devotional',
    name: '90s Morning Devotional Bliss',
    period: '06:00 AM – 10:00 AM',
    description: 'Authentic Pa-Sa Tanpura drone, Raga Bhupalam morning flute & sacred Om vibration',
    file: '/audio/morning-devotional.mp3',
    icon: <Sunrise className="w-5 h-5 text-[#FFB74D]" />,
    color: 'from-[#FFB74D] to-[#FFA726]',
    bgGlow: 'rgba(255, 183, 77, 0.15)',
    defaultVol: 0.40,
  },
  {
    id: 'daytime_positive',
    name: 'Daytime Positive Home Energy',
    period: '10:00 AM – 06:00 PM',
    description: 'Uplifting 432 Hz clear-mind frequency, gentle forest breeze & morning songbirds',
    file: '/audio/morning-positive.mp3',
    icon: <Sun className="w-5 h-5 text-[#4FC3F7]" />,
    color: 'from-[#4FC3F7] to-[#29B6F6]',
    bgGlow: 'rgba(79, 195, 247, 0.15)',
    defaultVol: 0.25,
  },
  {
    id: 'evening_sandhya',
    name: 'Evening Sandhya Pooja Devotion',
    period: '06:00 PM – 07:30 PM',
    description: 'Deeparadhana aarti resonance, C# Vedic tanpura drone & twilight temple chimes',
    file: '/audio/evening-sandhya.mp3',
    icon: <Flame className="w-5 h-5 text-[#FF7043]" />,
    color: 'from-[#FF7043] to-[#F4511E]',
    bgGlow: 'rgba(255, 112, 67, 0.15)',
    defaultVol: 0.35,
  },
  {
    id: 'night_flute',
    name: 'Night Peace & Krishna Flute',
    period: '07:30 PM – 11:00 PM',
    description: 'Krishna Bansuri flute in Raga Yaman, 528 Hz healing love frequency & Delta sleep waves',
    file: '/audio/night-sleep-flute.mp3',
    icon: <Moon className="w-5 h-5 text-[#BA68C8]" />,
    color: 'from-[#BA68C8] to-[#AB47BC]',
    bgGlow: 'rgba(186, 104, 200, 0.15)',
    defaultVol: 0.20,
  },
];

export default function SanctuaryPlayer() {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [bellRinging, setBellRinging] = useState(false);
  const [currentHourPhase, setCurrentHourPhase] = useState<string>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bellAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const updateTimePhase = () => {
      const now = new Date();
      const h = now.getHours() + now.getMinutes() / 60;
      if (h >= 6 && h < 10) setCurrentHourPhase('morning_devotional');
      else if (h >= 10 && h < 18) setCurrentHourPhase('daytime_positive');
      else if (h >= 18 && h < 19.5) setCurrentHourPhase('evening_sandhya');
      else if (h >= 19.5 && h < 23) setCurrentHourPhase('night_flute');
      else setCurrentHourPhase('sleep_mode');
    };
    updateTimePhase();
    const interval = setInterval(updateTimePhase, 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayTrack = (track: Track) => {
    if (activeTrack?.id === track.id && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    audioRef.current.src = track.file;
    audioRef.current.volume = volume;
    audioRef.current.play()
      .then(() => {
        setActiveTrack(track);
        setIsPlaying(true);
      })
      .catch((err) => console.log('Audio playback error:', err));
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
      className="mb-12 rounded-2xl bg-gradient-to-b from-[#10182E]/90 to-[#0A0E1A]/95 p-6 border border-[#90CAF9]/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🪔</span>
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#FFD700] via-[#FFB74D] to-[#4FC3F7] bg-clip-text text-transparent">
              24-Hour Home Sanctuary & 90s Devotional Radio
            </h3>
            <span className="text-[10px] tracking-widest font-bold text-[#FFD700] bg-[#FFD700]/15 px-2 py-0.5 rounded border border-[#FFD700]/30 animate-pulse">
              CALIBRATED FOR LIVING HALL
            </span>
          </div>
          <p className="text-xs text-[#90CAF9]/80">
            Listen to all 90s god songs, daytime positive ambient streams, and the sacred hourly temple bell.
          </p>
        </div>

        <button
          onClick={handleRingTempleBell}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg ${
            bellRinging
              ? 'bg-[#FFD700] text-black shadow-[#FFD700]/40 scale-105'
              : 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/40 hover:bg-[#FFD700]/20'
          }`}
        >
          <Bell className={`w-4 h-4 ${bellRinging ? 'animate-bounce text-black' : ''}`} />
          {bellRinging ? '🔔 Ringing Sacred Bell...' : '🔔 Ring Temple Bell Now'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {SANCTUARY_TRACKS.map((t) => {
          const isCurrentActive = activeTrack?.id === t.id && isPlaying;
          const isScheduleMatch = currentHourPhase === t.id;

          return (
            <motion.div
              key={t.id}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-xl p-4 transition-all border flex flex-col justify-between ${
                isCurrentActive
                  ? 'bg-white/10 border-white/40 shadow-lg'
                  : 'bg-white/5 border-white/10 hover:border-white/25'
              }`}
              style={{
                boxShadow: isCurrentActive ? `0 0 25px ${t.bgGlow}` : undefined,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                    {t.icon}
                  </div>
                  {isScheduleMatch && (
                    <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      LIVE NOW
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-sm text-white mb-0.5">{t.name}</h4>
                <div className="flex items-center gap-1 text-[11px] text-[#FFB74D] font-medium mb-2">
                  <Clock size={12} />
                  <span>{t.period}</span>
                </div>
                <p className="text-[11px] text-white/60 line-clamp-2 mb-4 leading-relaxed">
                  {t.description}
                </p>
              </div>

              <button
                onClick={() => handlePlayTrack(t)}
                className={`w-full py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-md ${
                  isCurrentActive
                    ? 'bg-gradient-to-r from-[#F06292] to-[#E91E63] text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {isCurrentActive ? (
                  <>
                    <Pause size={14} className="fill-current" />
                    <span>Pause Soundscape</span>
                  </>
                ) : (
                  <>
                    <Play size={14} className="fill-current" />
                    <span>Play Soundscape</span>
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Volume2 className="w-4 h-4 text-[#4FC3F7] shrink-0" />
          <span className="text-white/80 shrink-0 font-medium">Single Hall Volume:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-32 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#4FC3F7]"
          />
          <span className="text-white font-bold w-10">{Math.round(volume * 100)}%</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-white/70 text-[11px]">
          <span className="font-semibold text-[#FFD700]">Alexa Voice Commands:</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play 90s songs"</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to ring temple bell"</span>
        </div>
      </div>
    </motion.div>
  );
}
