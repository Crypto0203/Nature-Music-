import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Bell, Clock, Sun, Moon, Flame, Sunrise, Heart, Sparkles, Shield, Activity, Sparkle, Droplets } from 'lucide-react';

interface DevotionalItem {
  id: string;
  title: string;
  artist: string;
  tag: string;
  file: string;
  durationHint: string;
  orderBadge?: string;
  isMantra?: boolean;
}

interface CleansingSound {
  id: string;
  title: string;
  category: string;
  whyPowerful: string;
  effect: string;
  file: string;
  bestTime: string;
  icon: string;
  badge: string;
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

// ORDERED SEQUENCE: Songs first (Suprabhatam 1st, then Jai Ganesh Deva), Mantras LAST
const ORDERED_MORNING_PLAYLIST: DevotionalItem[] = [
  // 1. FIRST SONG
  {
    id: 'suprabhatam',
    title: 'Sri Venkateswara Suprabhatam',
    artist: 'M. S. Subbulakshmi',
    tag: 'Divine Morning Energy / Tirupati Balaji Sunrise Puja',
    file: '/audio/devotional/suprabhatam.mp3',
    durationHint: '20 mins (Full Puja)',
    orderBadge: '1ST SONG (06:00 AM)',
  },
  // 2. NEXT SONG
  {
    id: 'jai_ganesh',
    title: 'Jai Ganesh Deva (Aarti)',
    artist: 'Anuradha Paudwal',
    tag: 'Vighnaharta Auspicious Beginning',
    file: '/audio/devotional/jai-ganesh-deva.mp3',
    durationHint: 'Auspicious Start',
    orderBadge: 'NEXT SONG',
  },
  // 3. MASTER HIT
  {
    id: 'manasa_smarami',
    title: 'Sri Venkatesam Manasa Smarami',
    artist: 'Sri Srinivasam Sritha Parijatham',
    tag: 'Year 2000 Golden Master Song',
    file: '/audio/devotional/sri-venkatesam-manasa-smarami.mp3',
    durationHint: 'Full Master (16 MB)',
    orderBadge: 'MASTER HIT',
  },
  // 4. HANUMAN CHALISA
  {
    id: 'hanuman_chalisa',
    title: 'Shree Hanuman Chalisa',
    artist: 'Hariharan (T-Series)',
    tag: 'Courage, Strength & Space Protection',
    file: '/audio/devotional/hanuman-chalisa-hariharan.mp3',
    durationHint: 'Morning Power',
  },
  // 5. OM JAI JAGDISH
  {
    id: 'om_jai_jagdish',
    title: 'Om Jai Jagdish Hare',
    artist: 'Anuradha Paudwal',
    tag: 'Maha Vishnu Evergreen Aarti',
    file: '/audio/devotional/om-jai-jagdish-hare.mp3',
    durationHint: 'Evergreen Aarti',
  },
  // 6. VISHNU SAHASRANAMAM
  {
    id: 'vishnu_sahasranamam',
    title: 'Vishnu Sahasranamam',
    artist: 'M. S. Subbulakshmi',
    tag: 'Ancient Shield of Divine Positivity',
    file: '/audio/devotional/vishnu-sahasranamam.mp3',
    durationHint: 'Full Puja Stotram',
  },
  // 7-11. ANNAMACHARYA SANKEERTANAS
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

  // 12-15. MANTRAS (PLACED AT THE END OF MORNING LIST)
  {
    id: 'shiva_tandava',
    title: 'Shiva Tandava Stotram',
    artist: 'Sacred Chants of Shiva',
    tag: 'Most Powerful Shiva Mantra / Cosmic Strength',
    file: '/audio/devotional/shiva-tandava-stotram.mp3',
    durationHint: 'Most Powerful Shiva Mantra',
    orderBadge: 'MANTRA 1',
    isMantra: true,
  },
  {
    id: 'maha_mrityunjaya',
    title: 'Maha Mrityunjaya Mantra (108 Times)',
    artist: 'Suresh Wadkar & Anuradha Paudwal',
    tag: 'Ultimate Healing & Fear Protection',
    file: '/audio/devotional/maha-mrityunjaya-mantra-108.mp3',
    durationHint: '108 Recitations',
    orderBadge: 'MANTRA 2',
    isMantra: true,
  },
  {
    id: 'gayatri_mantra',
    title: 'Gayatri Mantra (108 Times)',
    artist: 'Anuradha Paudwal',
    tag: 'Vedic Mind Peace & Illumination',
    file: '/audio/devotional/gayatri-mantra-108.mp3',
    durationHint: '108 Recitations',
    orderBadge: 'MANTRA 3',
    isMantra: true,
  },
  {
    id: 'shankh_naad',
    title: 'Sacred Shankh Naad & Temple Bells',
    artist: 'Vedic Conch & Resonant Bronze Chimes',
    tag: 'Instant Acoustic Dead-Zone Breaker',
    file: '/audio/devotional/shankh-and-temple-bell.mp3',
    durationHint: 'Corner Space Reset',
    orderBadge: 'SPACE RESET',
    isMantra: true,
  },
];

const CLEANSING_SOUNDS: CleansingSound[] = [
  {
    id: 'shiva_tandava_cleanse',
    title: 'Shiva Tandava Stotram (Most Powerful Shiva Chant)',
    category: 'Supreme Shiva Energy',
    whyPowerful: 'Composed in dynamic Panchachamara meter. Creates supreme acoustic resonance to dispel dark energies, fears, and inner weakness.',
    effect: 'Ignites divine inner strength, destroys negativity, and creates an impenetrable energetic armor around the home.',
    file: '/audio/devotional/shiva-tandava-stotram.mp3',
    bestTime: 'Morning Pooja / Afternoon Focus',
    icon: '🔱',
    badge: 'Supreme Shiva Mantra',
  },
  {
    id: 'maha_mrityunjaya_cleanse',
    title: 'Maha Mrityunjaya Mantra (108 Repetitions)',
    category: 'A. Sacred Sanskrit Protection',
    whyPowerful: 'The ultimate healing and protective chant. The rhythmic acoustic meter dispels feelings of fear, illness, and heaviness.',
    effect: 'Produces grounding low-to-mid vibrational frequencies that clear stagnant room energy.',
    file: '/audio/devotional/maha-mrityunjaya-mantra-108.mp3',
    bestTime: 'Early Morning (Sunrise) or Sunset',
    icon: '🕉️',
    badge: '108 Repetitions',
  },
  {
    id: 'shankh_temple_bells',
    title: 'The Sound of the Shankh & Temple Bells',
    category: 'B. Acoustic Physics Resonance',
    whyPowerful: 'Traditional temple bells and the blowing of a Shankh (conch) produce an intense acoustic burst with rich overtones lasting 7+ seconds.',
    effect: 'Sharp resonant acoustic pulses physically break standing wave dead-zones and stagnant air in corners, instantly resetting the room’s vibe.',
    file: '/audio/devotional/shankh-and-temple-bell.mp3',
    bestTime: 'Morning Pooja / Space Reset',
    icon: '🐚',
    badge: '7s+ Acoustic Burst',
  },
  {
    id: 'hz_417_cleanse',
    title: '417 Hz Negative Energy Dissolver',
    category: 'C. Solfeggio Vibration Therapy',
    whyPowerful: 'Specifically designated in sound therapy to break up negative emotional energy and dissolve deep mental/energetic blockages.',
    effect: 'Disperses heavy, stagnant home atmospheres and restores clear, uplifting vitality.',
    file: '/audio/healing/417hz-negative-energy-cleanse.mp3',
    bestTime: 'Daytime / Whole House Play',
    icon: '🌀',
    badge: '417 Hz Solfeggio',
  },
];

const HEALING_TRACKS: HealingTrack[] = [
  {
    id: 'pain_relief_174',
    title: '174 Hz Mom Pain Relief & Deep Rest',
    hz: '174 Hz Solfeggio',
    purpose: "Specially for Mom's Leg Pain & Body Tension",
    description: 'Acts as a natural vibrational relaxant. Helps tight calf & leg muscles release tension, loosens spasms, and triggers calming endorphins for deep sleep.',
    file: '/audio/healing/174hz-pain-relief.mp3',
    tips: 'Elevate legs with 1-2 soft pillows under calves + apply gentle warmth. Play continuously in evening or bedtime at 25-30% volume.',
    icon: <Heart className="w-5 h-5 text-rose-400" />,
  },
  {
    id: 'home_cleanse_528',
    title: '528 Hz Home Harmony & Positive Vibe',
    hz: '528 Hz Solfeggio',
    purpose: 'Remove Negative Vibrations & Transform Home',
    description: 'Produces a clean, uplifting resonance that clears heavy atmosphere and transforms the living hall into a peaceful, positive sanctuary.',
    file: '/audio/healing/528hz-home-cleanse.mp3',
    tips: 'Ideal for daytime background listening between 8:00 AM and 6:00 PM.',
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
  phaseLabel: string;
  period: string;
  exactTiming: string;
  songsPlayed: string;
  description: string;
  file: string;
  icon: React.ReactNode;
}

const SCHEDULE_TRACKS: ScheduleTrack[] = [
  {
    id: 'morning_awakening',
    phaseLabel: 'Phase 1',
    name: 'Morning Awakening & Puja',
    period: '06:00 AM – 08:00 AM',
    exactTiming: 'Starts 06:00 AM Sharp',
    songsPlayed: '1st: Suprabhatam ➔ 2nd: Jai Ganesh Deva ➔ Manasa Smarami ➔ Hanuman Chalisa ➔ Mantras Last (Shiva Tandava, Maha Mrityunjaya, Gayatri)',
    description: 'Starts at 06:00 AM sharp with M.S. Subbulakshmi’s Suprabhatam, followed immediately by Jai Ganesh Deva and devotional songs. All sacred mantras play at the end.',
    file: '/audio/devotional/suprabhatam.mp3',
    icon: <Sunrise className="w-5 h-5 text-[#FFB74D]" />,
  },
  {
    id: 'afternoon_calm',
    phaseLabel: 'Phase 2',
    name: 'Daytime Calm Focus & Rest',
    period: '08:00 AM – 06:00 PM',
    exactTiming: '08:00 AM to 06:00 PM Continuous',
    songsPlayed: '528 Hz Home Harmony, 417 Hz Space Cleansing, Soft Bansuri + Sacred Bronze Temple Bell Chime every hour (:00)',
    description: 'Soothing acoustic waves at gentle hall volume (25–30%). Every single hour on the hour (:00), the bronze temple bell rings for 7s to reset room energy.',
    file: '/audio/healing/528hz-home-cleanse.mp3',
    icon: <Sun className="w-5 h-5 text-[#4FC3F7]" />,
  },
  {
    id: 'evening_sandhya',
    phaseLabel: 'Phase 3',
    name: 'Evening Sandhya: Space Clearing',
    period: '06:00 PM – 07:30 PM',
    exactTiming: '06:00 PM to 07:30 PM (Twilight)',
    songsPlayed: 'Shree Hanuman Chalisa, Maha Mrityunjaya Mantra & Shankh Naad / Temple Bells + Brass Deepam',
    description: 'Dispels evening twilight heaviness. Pair with lighting a small brass ghee or sesame oil Deepam for tangible warmth and clarity.',
    file: '/audio/devotional/hanuman-chalisa-hariharan.mp3',
    icon: <Flame className="w-5 h-5 text-[#FF7043]" />,
  },
  {
    id: 'night_healing_sleep',
    phaseLabel: 'Phase 4',
    name: 'Night / Bedtime: Mom Pain Relief',
    period: '07:30 PM – 11:00 PM (9:00 PM+)',
    exactTiming: '07:30 PM to 11:00 PM',
    songsPlayed: '174 Hz Solfeggio Continuous Frequency (Mom’s Leg Relief) & Krishna Flute in Raga Yaman',
    description: 'Natural vibrational relaxant to release calf tension, loosen muscle spasms, and trigger restorative deep sleep for Mom.',
    file: '/audio/healing/174hz-pain-relief.mp3',
    icon: <Moon className="w-5 h-5 text-[#BA68C8]" />,
  },
];

export default function SanctuaryPlayer() {
  const [currentPlayingTitle, setCurrentPlayingTitle] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.40);
  const [bellRinging, setBellRinging] = useState(false);
  const [activeTab, setActiveTab] = useState<'devotional' | 'cleansing' | 'healing' | 'schedule'>('devotional');

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
              ORDERED PLAYLIST
            </span>
          </div>
          <p className="text-xs text-[#90CAF9]/80">
            <strong>1st: Suprabhatam</strong> ➔ <strong>Next: Jai Ganesh Deva</strong> ➔ Songs ➔ <strong>Mantras Last</strong> (Shiva Tandava Stotram, Maha Mrityunjaya, Gayatri Mantra).
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
              Morning List ({ORDERED_MORNING_PLAYLIST.length})
            </button>
            <button
              onClick={() => setActiveTab('cleansing')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'cleansing'
                  ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 text-black shadow'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <Sparkles size={13} className="fill-current text-amber-300" />
              <span>Cleansing & Shiva</span>
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
              Full Day Timing Guide
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

      {/* TAB 1: Ordered Morning Playlist (Suprabhatam 1st, Jai Ganesh Deva Next, Mantras Last) */}
      {activeTab === 'devotional' && (
        <div className="space-y-4 mb-6">
          <div className="p-3 rounded-xl bg-black/40 border border-[#FFD700]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FFD700]">🎵 Playback Sequence:</span>
              <span className="text-white/80">
                1️⃣ Suprabhatam ➔ 2️⃣ Jai Ganesh Deva ➔ 3️⃣ Manasa Smarami & Songs ➔ 4️⃣ Sacred Mantras (End)
              </span>
            </div>
            <span className="text-[11px] text-amber-300 font-semibold bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
              Starts 06:00 AM on Alexa Echo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {ORDERED_MORNING_PLAYLIST.map((item, index) => {
              const isThisPlaying = currentPlayingTitle === item.title && isPlaying;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                    item.isMantra
                      ? isThisPlaying
                        ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.35)]'
                        : 'bg-purple-950/20 border-purple-500/30 hover:border-purple-400'
                      : item.orderBadge
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
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-white/50">#{index + 1}</span>
                        {item.orderBadge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            item.isMantra
                              ? 'bg-purple-500/20 text-purple-300 border-purple-400/30'
                              : 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30'
                          }`}>
                            {item.orderBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-[#FFB74D] bg-[#FFB74D]/10 px-2 py-0.5 rounded border border-[#FFB74D]/20">
                        {item.durationHint}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-0.5 leading-snug">{item.title}</h4>
                    <p className={`text-xs font-medium mb-1 ${item.isMantra ? 'text-purple-300' : 'text-[#FFD700]'}`}>
                      {item.artist}
                    </p>
                    <p className="text-[11px] text-white/60 mb-3">{item.tag}</p>
                  </div>

                  <button
                    onClick={() => playSong(item.file, item.title)}
                    className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-md ${
                      isThisPlaying
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : item.isMantra
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:brightness-110'
                        : item.orderBadge
                        ? 'bg-gradient-to-r from-[#FFD700] via-[#FFA726] to-[#FF9800] text-black font-bold hover:brightness-110'
                        : 'bg-gradient-to-r from-[#FFB74D] to-[#FFA726] text-black font-semibold hover:brightness-105'
                    }`}
                  >
                    {isThisPlaying ? (
                      <>
                        <Pause size={14} className="fill-current" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} className="fill-current" />
                        <span>Play Now</span>
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Most Powerful Shiva Mantra & Space Cleansing */}
      {activeTab === 'cleansing' && (
        <div className="space-y-6 mb-6">
          {/* Spotlight on Shiva Tandava Stotram */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-950/60 via-purple-950/50 to-black/70 border border-orange-500/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-orange-400 font-bold text-base mb-1">
                <span className="text-xl">🔱</span>
                <span>Most Powerful Shiva Mantra: Shiva Tandava Stotram</span>
              </div>
              <p className="text-xs text-white/80 max-w-2xl leading-relaxed">
                The most potent chant of Lord Shiva. The rhythmic metered vibrations awaken profound inner energy, dissolve fear and psychological heaviness, and fill the living space with cosmic protective power.
              </p>
            </div>
            <button
              onClick={() => playSong('/audio/devotional/shiva-tandava-stotram.mp3', 'Shiva Tandava Stotram (Most Powerful Shiva Mantra)')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs shadow-lg hover:brightness-110 shrink-0 flex items-center gap-2"
            >
              <Play size={14} className="fill-current" />
              <span>Play Shiva Tandava</span>
            </button>
          </div>

          {/* Cleansing Sounds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {CLEANSING_SOUNDS.map((cs) => {
              const isThisPlaying = currentPlayingTitle === cs.title && isPlaying;
              return (
                <motion.div
                  key={cs.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                    isThisPlaying
                      ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.35)]'
                      : 'bg-gradient-to-br from-amber-500/10 via-black/40 to-black/60 border-amber-500/30 hover:border-amber-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl p-1.5 rounded-xl bg-black/50 border border-white/10">{cs.icon}</span>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                        {cs.badge}
                      </span>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-400/90">{cs.category}</span>
                    <h4 className="font-bold text-sm text-white mt-0.5 mb-1.5">{cs.title}</h4>

                    <p className="text-[11px] text-white/80 leading-relaxed mb-2">
                      <strong className="text-amber-200">Why Powerful:</strong> {cs.whyPowerful}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-300/90 font-medium mb-3">
                      <Clock size={11} />
                      <span>Best Time: {cs.bestTime}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => playSong(cs.file, cs.title)}
                    className={`w-full py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-extrabold transition-all shadow-md ${
                      isThisPlaying
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : 'bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-black hover:brightness-110'
                    }`}
                  >
                    {isThisPlaying ? 'Pause' : 'Play Sound'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Mom's Leg Pain Relief & Sound Therapy */}
      {activeTab === 'healing' && (
        <div className="space-y-6 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-black/60 border border-rose-500/30 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm mb-1">
                <Heart size={16} className="fill-rose-400 text-rose-400" />
                <span>Comfort & Relief Guide for Your Mother</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed max-w-2xl">
                Chronic leg pain keeps muscles guarding and tense. <strong>174 Hz Solfeggio frequency</strong> loosens muscle spasms, dilates tight vessels, and prompts natural endorphins.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-white/90">
              <span className="bg-rose-500/15 px-2.5 py-1 rounded-lg border border-rose-400/20">🛏️ Elevate legs on 1-2 soft pillows</span>
              <span className="bg-amber-500/15 px-2.5 py-1 rounded-lg border border-amber-400/20">🔥 Warm cloth / water bottle</span>
              <span className="bg-cyan-500/15 px-2.5 py-1 rounded-lg border border-cyan-400/20">🔊 Gentle Hall volume (25-30%)</span>
            </div>
          </div>

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

      {/* TAB 4: Detailed Timing Guide & 24-Hour Schedule Breakdown */}
      {activeTab === 'schedule' && (
        <div className="space-y-6 mb-6">
          {/* 4-Phase Interactive Quick-Play Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <span className="text-[10px] font-bold text-[#FFB74D] bg-[#FFB74D]/15 px-2 py-0.5 rounded border border-[#FFB74D]/25">
                        {t.phaseLabel}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white mb-0.5">{t.name}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-[#FFB74D] font-medium mb-1.5">
                      <Clock size={12} />
                      <span>{t.period}</span>
                    </div>
                    <p className="text-[11px] text-white/70 mb-3 leading-relaxed">{t.description}</p>
                  </div>

                  <button
                    onClick={() => playSong(t.file, t.name)}
                    className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all shadow ${
                      isThisPlaying
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {isThisPlaying ? 'Pause Phase' : 'Play Phase Now'}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Timing Explanation Table */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-black/80 border border-indigo-500/30">
            <h4 className="text-base font-bold text-[#FFD700] mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FFD700]" />
              <span>Exact Timing Breakdown & What Plays When</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-white/60">
                    <th className="py-2.5 px-3">Phase & Time</th>
                    <th className="py-2.5 px-3">Start Trigger</th>
                    <th className="py-2.5 px-3">Songs / Audio Track Sequence</th>
                    <th className="py-2.5 px-3">Volume</th>
                    <th className="py-2.5 px-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  <tr className="bg-amber-500/5">
                    <td className="py-3 px-3 font-bold text-amber-300">Phase 1: Morning<br/><span className="text-[11px] font-normal text-white/60">06:00 AM – 08:00 AM</span></td>
                    <td className="py-3 px-3 text-white/90">06:00 AM Sharp (Alexa / Schedule)</td>
                    <td className="py-3 px-3 font-medium">
                      1. <strong className="text-white">Sri Venkateswara Suprabhatam</strong> (1st song)<br/>
                      2. <strong className="text-white">Jai Ganesh Deva</strong> (Next song)<br/>
                      3. Sri Venkatesam Manasa Smarami & Devotional Songs<br/>
                      4. <strong className="text-purple-300">Mantras Last:</strong> Shiva Tandava, Maha Mrityunjaya, Gayatri Mantra, Shankh Naad
                    </td>
                    <td className="py-3 px-3 font-bold text-[#FFD700]">40%</td>
                    <td className="py-3 px-3 text-white/70">Auspicious family wake-up & divine protection</td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3 font-bold text-sky-300">Phase 2: Daytime<br/><span className="text-[11px] font-normal text-white/60">08:00 AM – 06:00 PM</span></td>
                    <td className="py-3 px-3 text-white/90">08:00 AM Continuous</td>
                    <td className="py-3 px-3">
                      • 528 Hz Home Harmony & 417 Hz Space Cleanser<br/>
                      • Gentle flute / morning ambient background<br/>
                      • <strong className="text-amber-300">Every hour on the hour (:00)</strong>: Bronze Temple Bell rings for 7s
                    </td>
                    <td className="py-3 px-3 font-bold text-[#4FC3F7]">25% – 30%</td>
                    <td className="py-3 px-3 text-white/70">Clears negative stagnation, resets room energy hourly</td>
                  </tr>

                  <tr className="bg-orange-500/5">
                    <td className="py-3 px-3 font-bold text-orange-300">Phase 3: Evening Sandhya<br/><span className="text-[11px] font-normal text-white/60">06:00 PM – 07:30 PM</span></td>
                    <td className="py-3 px-3 text-white/90">06:00 PM (Sunset / Twilight)</td>
                    <td className="py-3 px-3">
                      • <strong className="text-white">Shree Hanuman Chalisa</strong> (Hariharan)<br/>
                      • Maha Mrityunjaya Mantra (108 Times)<br/>
                      • Sacred Shankh Naad & Temple Bells<br/>
                      • Light small brass ghee/sesame lamp (Deepam)
                    </td>
                    <td className="py-3 px-3 font-bold text-orange-400">40%</td>
                    <td className="py-3 px-3 text-white/70">Twilight space clearing; expels heaviness, brings peaceful warmth</td>
                  </tr>

                  <tr className="bg-rose-500/5">
                    <td className="py-3 px-3 font-bold text-rose-300">Phase 4: Night Bedtime<br/><span className="text-[11px] font-normal text-white/60">07:30 PM – 11:00 PM</span></td>
                    <td className="py-3 px-3 text-white/90">07:30 PM (Bedtime Rest)</td>
                    <td className="py-3 px-3">
                      • <strong className="text-rose-300">174 Hz Solfeggio Continuous Frequency</strong> (Mom's Leg Relief)<br/>
                      • Krishna Bansuri flute in Raga Yaman<br/>
                      • Pair with 1-2 soft pillows under Mom's calves + gentle warmth
                    </td>
                    <td className="py-3 px-3 font-bold text-rose-400">20% – 25%</td>
                    <td className="py-3 px-3 text-white/70">Relieves muscle spasms & calf tension for deep restorative sleep</td>
                  </tr>

                  <tr>
                    <td className="py-3 px-3 font-bold text-slate-400">Phase 5: Silent Sleep<br/><span className="text-[11px] font-normal text-white/60">11:00 PM – 06:00 AM</span></td>
                    <td className="py-3 px-3 text-white/90">11:00 PM Auto-Off</td>
                    <td className="py-3 px-3 text-white/50">Silence / Audio stops completely</td>
                    <td className="py-3 px-3 font-bold text-slate-500">0%</td>
                    <td className="py-3 px-3 text-white/70">Deep silent sleep until 06:00 AM Suprabhatam begins next day</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Two Physical Home Touches Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-black/70 border border-indigo-400/30">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-3">
              <Sparkle className="w-4 h-4 text-indigo-400" />
              <span>Two Simple Physical Home Touches to Pair with the Soundscape</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 h-fit">
                  <Droplets size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1">1. Rock Salt Water Mop (Once a Week)</h5>
                  <p className="text-white/75 text-[11px] leading-relaxed">
                    Add a fistful of natural sea salt or rock salt to the water when mopping floors. Salt physically absorbs negative static charges and dampness, leaving the air noticeably lighter.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 h-fit">
                  <Flame size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1">2. Evening Deepam (Brass Lamp)</h5>
                  <p className="text-white/75 text-[11px] leading-relaxed">
                    Light a small ghee or sesame oil brass lamp during evening Sandhya (6:00 PM – 7:30 PM) while the Hanuman Chalisa or bell chime plays. It creates warmth, clarity, and peace you can feel immediately upon stepping into the house.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play Suprabhatam"</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play Jai Ganesh Deva"</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play Shiva Tandava"</span>
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">"Alexa, ask Calm Nature to play pain relief"</span>
        </div>
      </div>
    </motion.div>
  );
}
