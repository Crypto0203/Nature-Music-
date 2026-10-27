export type StressSource =
  | 'workload' | 'breakup' | 'financial' | 'health' | 'family' | 'social' | 'general';

export interface StressType {
  source: StressSource;
  label: string;
  emoji: string;
  description: string;
  intensity: number;
}

export interface StressSample {
  timestamp: string;
  stress: number;
  sourceTag: string;
}

export interface SessionRecord {
  id: string;
  start: string;
  end: string | null;
  moodId: string;
  moodLabel: string;
  moodEmoji: string;
  environmentId: string;
  environmentName: string;
  samples: StressSample[];
}

// === BIRD SPECIES ===
export type BirdCallPattern =
  | 'trill' | 'whistle' | 'twoNote' | 'rising' | 'wail'
  | 'laugh' | 'cry' | 'chirp' | 'warble' | 'coo' | 'melody'
  | 'screech' | 'caw' | 'chatter' | 'descending'
  | 'flute' | 'bell' | 'rooster' | 'drum' | 'honk' | 'quack';

export interface BirdSpecies {
  id: string;
  name: string;
  country: string;
  flag: string;
  region: string;
  description: string;
  fundamental: number;       // Base frequency in Hz
  pattern: BirdCallPattern;
  syllables: number;
  callDuration: number;      // ms
  intervalMin: number;       // ms between calls
  intervalMax: number;
  vibrato: number;           // Hz of vibrato
  freqSweep: number;         // Range of frequency sweep (Hz)
  filterQ: number;
  warmth: number;            // 0-1, more warmth = lower harmonics
}

// === HEALING TONES ===
export interface HealingTone {
  id: string;
  frequency: number;
  name: string;
  description: string;
  benefit: string;
  binaural?: number;         // For binaural beat (delta = freq diff between L/R)
}

// === SOUND LAYER (generic) ===
export type LayerKind =
  | 'bird'           // Use BirdSpecies
  | 'rain' | 'rain_heavy' | 'rain_tent'
  | 'ocean' | 'waves_gentle' | 'underwater'
  | 'fire' | 'campfire'
  | 'wind' | 'wind_arctic' | 'wind_desert'
  | 'thunder' | 'storm'
  | 'brown' | 'pink' | 'white'
  | 'stream' | 'waterfall' | 'river_rapids'
  | 'forest' | 'jungle'
  | 'crickets' | 'frogs' | 'cicada'
  | 'tone'           // Use HealingTone
  | 'bowl'           // Tibetan singing bowl
  | 'crystal_bowl'   // Crystal singing bowl (clearer, higher)
  | 'gong'           // Deep gong
  | 'hang_drum'      // Heavenly metallic drum
  | 'pad'            // Ambient synth pad
  | 'cosmic_pad'     // Space ambient pad
  | 'chimes'         // Random pentatonic bell chimes
  | 'wind_chimes'    // Metallic wind chimes
  | 'om'             // Om drone
  | 'mantra'         // Chanted mantra (synthesized vowel formant)
  | 'throat_sing'    // Tibetan throat singing (overtone)
  | 'flute'          // Native American flute
  | 'bamboo_flute'   // Japanese shakuhachi
  | 'didgeridoo'     // Australian aboriginal drone
  | 'tanpura'        // Indian classical drone
  | 'sitar_drone'    // Indian sitar background
  | 'whale'          // Whale song
  | 'dolphin'        // Dolphin clicks/whistles
  | 'wolf'           // Wolf howl
  | 'owl'            // Owl hoots
  | 'heartbeat'      // Slow human heartbeat
  | 'womb'           // Womb simulator (filtered noise + heartbeat)
  | 'snow'           // Snowfall (very subtle pink noise)
  | 'ice_crack'      // Glacier ice cracks
  | 'train_distant'  // Nostalgic train rumble
  | 'cafe'           // Coffee shop murmur
  | 'library'        // Library page turns + pencil
  | 'temple_bell'    // Buddhist temple bell
  // 🙏 SACRED MANTRAS (multi-religion)
  | 'mantra_om'                      // Pure sacred Om
  | 'mantra_om_namah_shivaya'        // Hindu — Lord Shiva
  | 'mantra_hare_krishna'            // Hindu — Lord Krishna kirtan
  | 'mantra_gayatri'                 // Hindu — Vedic sun mantra
  | 'mantra_mahamrityunjaya'         // Hindu — healing mantra
  | 'mantra_om_mani_padme_hum'       // Buddhist — compassion
  | 'mantra_waheguru'                // Sikh — divine wonder
  | 'mantra_gregorian'               // Christian — Latin chant
  | 'mantra_sufi_allah'              // Islamic — Sufi remembrance
  | 'mantra_native_american'         // Native — sacred chant
  // 🪈 KRISHNA'S DIVINE FLUTE & MOUNTAIN
  | 'krishna_bansuri'                // Lord Krishna's bamboo flute (Indian raga)
  | 'tibetan_horn'                   // Dungchen long horn
  | 'yak_bells'                      // Tibetan yak bells
  | 'cave_drips'                     // Mystic cave water drops
  | 'avalanche'                      // Distant avalanche rumble
  // 🦁 WILDLIFE
  | 'lion_roar' | 'tiger_roar' | 'elephant_trumpet'
  | 'monkey_howler' | 'coyote_howl' | 'bear_growl' | 'deer_call';

export interface SoundLayer {
  id: string;
  name: string;
  kind: LayerKind;
  baseVolume: number;
  birdSpeciesId?: string;    // If kind === 'bird'
  toneId?: string;           // If kind === 'tone'
  pitch?: number;            // For pads/bowls
}

// === ENVIRONMENT (curated soundscape) ===
export interface Environment {
  id: string;
  name: string;
  emoji: string;
  description: string;
  region?: string;            // e.g. "Amazon", "Himalayas"
  layers: SoundLayer[];
  bgGradient: string;
}

// === MOOD ===
export type MoodId =
  | 'calm' | 'happy' | 'meditation' | 'sleep' | 'focus'
  | 'travel' | 'heartbreak' | 'energy' | 'creativity'
  | 'anxiety' | 'pain' | 'cosmic' | 'sacred' | 'wild';

export interface Mood {
  id: MoodId;
  label: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string;
  bgGradient: string;
  environmentIds: string[];   // Curated environments for this mood
}

export type Screen =
  | 'mood'
  | 'environments'
  | 'playing'
  | 'birds'
  | 'sound-lab'
  | 'history'
  | 'settings';

// === SMART SOUND LAB ===
export type FreqBand = 'low' | 'mid' | 'high';
export type Tempo = 'slow' | 'medium' | 'fast' | 'continuous';
export type Energy = 'minimal' | 'low' | 'moderate' | 'high';
export type MoodTag = 'calm' | 'focus' | 'sleep' | 'energetic' | 'meditation' | 'happy' | 'sacred';
export type SoundCategory =
  | 'bird' | 'water' | 'weather' | 'fire' | 'wind'
  | 'instrument' | 'meditation' | 'animal' | 'noise' | 'ambient';

export interface SoundTag {
  id: string;
  name: string;
  emoji: string;
  category: SoundCategory;
  freqBand: FreqBand;
  freqHz: number;
  tempo: Tempo;
  energy: Energy;
  moods: MoodTag[];
  description: string;
  // Mapping to audio engine
  layerKind: LayerKind;
  birdSpeciesId?: string;
  defaultPitch?: number;
  defaultVolume: number;
  region?: string;
  flag?: string;
}

export interface CustomMix {
  id: string;
  name: string;
  emoji: string;
  createdAt: string;
  layers: SoundLayer[];
  bgGradient?: string;
}
