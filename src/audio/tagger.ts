// =====================================================================
// 🧠 SMART SOUND TAGGER — Automatically analyze & tag every sound
//
// Inspired by audio analysis pipelines: each sound is tagged by
// frequency band, tempo, energy level, and recommended moods.
// Used by the Sound Lab for filtering & smart mixing.
// =====================================================================

import {
  BirdSpecies, FreqBand, Tempo, Energy, MoodTag,
  SoundTag, LayerKind, SoundLayer
} from '../types';
import { BIRDS } from '../data';
import { v4 as uuidv4 } from 'uuid';

// =====================================================================
// AUTO-TAGGING RULES — Mimics what audio feature extraction would do
// =====================================================================

function tagFreqBand(hz: number): FreqBand {
  if (hz < 800) return 'low';
  if (hz < 2500) return 'mid';
  return 'high';
}

function tagBirdTempo(intervalMin: number, intervalMax: number): Tempo {
  const avg = (intervalMin + intervalMax) / 2;
  if (avg > 12000) return 'slow';
  if (avg > 6000) return 'medium';
  return 'fast';
}

function tagBirdEnergy(pattern: string): Energy {
  switch (pattern) {
    case 'wail': case 'coo': return 'minimal';
    case 'whistle': case 'twoNote': case 'melody':
    case 'flute': case 'bell': case 'descending': return 'low';
    case 'rising': case 'warble': case 'cry': case 'rooster': return 'moderate';
    case 'trill': case 'laugh': case 'screech':
    case 'caw': case 'chatter': return 'high';
    default: return 'low';
  }
}

function recommendMoodsForBird(freq: FreqBand, tempo: Tempo, energy: Energy): MoodTag[] {
  const moods: MoodTag[] = [];
  // Calm: low/mid freq + slow/medium + minimal/low energy
  if ((freq !== 'high' || tempo === 'slow') && (energy === 'minimal' || energy === 'low')) {
    moods.push('calm');
  }
  // Sleep: low freq + slow tempo + minimal energy
  if (freq === 'low' && (tempo === 'slow' || tempo === 'medium') && energy !== 'high') {
    moods.push('sleep');
  }
  // Focus: mid freq + steady tempo + low/moderate energy
  if ((freq === 'mid' || freq === 'low') && (tempo === 'medium' || tempo === 'continuous') && energy !== 'high') {
    moods.push('focus');
  }
  // Energetic: high freq + fast + high energy
  if ((freq === 'high' || freq === 'mid') && tempo === 'fast' && (energy === 'moderate' || energy === 'high')) {
    moods.push('energetic');
  }
  // Happy: any bright bird with movement
  if (freq !== 'low' && tempo !== 'slow' && energy !== 'minimal') {
    moods.push('happy');
  }
  // Meditation: very calm low + slow
  if (freq === 'low' && tempo === 'slow' && energy === 'minimal') {
    moods.push('meditation');
  }
  return moods.length ? moods : ['calm'];
}

// =====================================================================
// AUTO-TAG ALL BIRDS
// =====================================================================
function tagBird(bird: BirdSpecies): SoundTag {
  const freqBand = tagFreqBand(bird.fundamental);
  const tempo = tagBirdTempo(bird.intervalMin, bird.intervalMax);
  const energy = tagBirdEnergy(bird.pattern);
  const moods = recommendMoodsForBird(freqBand, tempo, energy);

  return {
    id: `bird_${bird.id}`,
    name: bird.name,
    emoji: bird.flag,
    category: 'bird',
    freqBand,
    freqHz: bird.fundamental,
    tempo,
    energy,
    moods,
    description: bird.description,
    layerKind: 'bird',
    birdSpeciesId: bird.id,
    defaultVolume: 0.45,
    region: bird.region,
    flag: bird.flag,
  };
}

// =====================================================================
// AMBIENT SOUND REGISTRY (curated tags)
// =====================================================================
const AMBIENT_REGISTRY: Omit<SoundTag, 'id'>[] = [
  // 💧 WATER
  { name: 'Light Rain', emoji: '🌧️', category: 'water', freqBand: 'mid', freqHz: 1200, tempo: 'continuous', energy: 'low', moods: ['focus', 'sleep', 'calm'], description: 'Steady rainfall — universal calming sound.', layerKind: 'rain', defaultVolume: 0.5 },
  { name: 'Heavy Rain', emoji: '🌧️', category: 'water', freqBand: 'mid', freqHz: 1500, tempo: 'continuous', energy: 'moderate', moods: ['sleep', 'focus'], description: 'Powerful downpour — deep relaxation.', layerKind: 'rain_heavy', defaultVolume: 0.55 },
  { name: 'Rain on Tent', emoji: '⛺', category: 'water', freqBand: 'mid', freqHz: 1500, tempo: 'continuous', energy: 'moderate', moods: ['sleep', 'calm'], description: 'Cozy rain pattering on canvas.', layerKind: 'rain_tent', defaultVolume: 0.55 },
  { name: 'Gentle Ocean Waves', emoji: '🌊', category: 'water', freqBand: 'low', freqHz: 500, tempo: 'continuous', energy: 'low', moods: ['calm', 'sleep', 'meditation'], description: 'Rhythmic waves on shore — primal calm.', layerKind: 'waves_gentle', defaultVolume: 0.55 },
  { name: 'Underwater Ambience', emoji: '🐠', category: 'water', freqBand: 'low', freqHz: 350, tempo: 'continuous', energy: 'low', moods: ['meditation', 'sleep'], description: 'Deep sea pressure — womb-like enclosure.', layerKind: 'underwater', defaultVolume: 0.45 },
  { name: 'Forest Stream', emoji: '💧', category: 'water', freqBand: 'mid', freqHz: 2000, tempo: 'continuous', energy: 'low', moods: ['focus', 'calm', 'happy'], description: 'Bubbling water over stones.', layerKind: 'stream', defaultVolume: 0.4 },
  { name: 'Waterfall', emoji: '💦', category: 'water', freqBand: 'high', freqHz: 3000, tempo: 'continuous', energy: 'high', moods: ['energetic', 'focus'], description: 'Powerful rushing water.', layerKind: 'waterfall', defaultVolume: 0.55 },
  { name: 'River Rapids', emoji: '🏞️', category: 'water', freqBand: 'high', freqHz: 2500, tempo: 'continuous', energy: 'moderate', moods: ['energetic', 'focus'], description: 'Tumbling river with splashes.', layerKind: 'river_rapids', defaultVolume: 0.5 },

  // ⛈️ WEATHER
  { name: 'Distant Thunder', emoji: '⚡', category: 'weather', freqBand: 'low', freqHz: 100, tempo: 'slow', energy: 'moderate', moods: ['sleep', 'meditation'], description: 'Low rolling thunder rumbles.', layerKind: 'thunder', defaultVolume: 0.25 },
  { name: 'Mountain Storm', emoji: '⛈️', category: 'weather', freqBand: 'low', freqHz: 120, tempo: 'medium', energy: 'high', moods: ['sleep'], description: 'Dramatic thunder & lightning.', layerKind: 'storm', defaultVolume: 0.4 },
  { name: 'Snowfall', emoji: '❄️', category: 'weather', freqBand: 'low', freqHz: 200, tempo: 'continuous', energy: 'minimal', moods: ['sleep', 'calm', 'meditation'], description: 'Almost-silent presence of falling snow.', layerKind: 'snow', defaultVolume: 0.4 },
  { name: 'Glacier Ice Cracks', emoji: '🧊', category: 'weather', freqBand: 'low', freqHz: 200, tempo: 'slow', energy: 'low', moods: ['meditation', 'focus'], description: 'Deep ice cracks across glaciers.', layerKind: 'ice_crack', defaultVolume: 0.3 },

  // 🔥 FIRE
  { name: 'Fireplace Crackle', emoji: '🔥', category: 'fire', freqBand: 'mid', freqHz: 1200, tempo: 'continuous', energy: 'low', moods: ['sleep', 'calm'], description: 'Warm crackling logs.', layerKind: 'fire', defaultVolume: 0.5 },
  { name: 'Campfire', emoji: '🔥', category: 'fire', freqBand: 'mid', freqHz: 1300, tempo: 'continuous', energy: 'low', moods: ['calm', 'sleep'], description: 'Outdoor campfire under stars.', layerKind: 'campfire', defaultVolume: 0.5 },

  // 💨 WIND
  { name: 'Gentle Breeze', emoji: '💨', category: 'wind', freqBand: 'mid', freqHz: 450, tempo: 'continuous', energy: 'low', moods: ['calm', 'focus'], description: 'Soft wind through trees.', layerKind: 'wind', defaultVolume: 0.35 },
  { name: 'Arctic Wind', emoji: '❄️', category: 'wind', freqBand: 'high', freqHz: 700, tempo: 'continuous', energy: 'moderate', moods: ['focus', 'meditation'], description: 'Cold wind sweeping across glaciers.', layerKind: 'wind_arctic', defaultVolume: 0.45 },
  { name: 'Desert Wind', emoji: '🏜️', category: 'wind', freqBand: 'low', freqHz: 350, tempo: 'continuous', energy: 'low', moods: ['meditation', 'calm'], description: 'Hot wind across sand dunes.', layerKind: 'wind_desert', defaultVolume: 0.45 },

  // 🌲 FOREST / JUNGLE
  { name: 'Forest Hum', emoji: '🌲', category: 'ambient', freqBand: 'mid', freqHz: 600, tempo: 'continuous', energy: 'low', moods: ['calm', 'focus'], description: 'Distant forest ambience.', layerKind: 'forest', defaultVolume: 0.4 },
  { name: 'Jungle Density', emoji: '🌴', category: 'ambient', freqBand: 'mid', freqHz: 800, tempo: 'continuous', energy: 'moderate', moods: ['focus', 'energetic'], description: 'Dense tropical jungle layer.', layerKind: 'jungle', defaultVolume: 0.4 },

  // 🦗 INSECTS / FROGS
  { name: 'Crickets at Night', emoji: '🦗', category: 'animal', freqBand: 'high', freqHz: 4500, tempo: 'continuous', energy: 'low', moods: ['sleep', 'calm'], description: 'Soothing nighttime chirps.', layerKind: 'crickets', defaultVolume: 0.35 },
  { name: 'Tropical Frogs', emoji: '🐸', category: 'animal', freqBand: 'low', freqHz: 250, tempo: 'medium', energy: 'moderate', moods: ['sleep', 'meditation'], description: 'Rhythmic tree frog croaks.', layerKind: 'frogs', defaultVolume: 0.4 },
  { name: 'Cicadas', emoji: '🪲', category: 'animal', freqBand: 'high', freqHz: 4000, tempo: 'continuous', energy: 'moderate', moods: ['calm'], description: 'Continuous cicada buzz at dusk.', layerKind: 'cicada', defaultVolume: 0.3 },

  // 🐾 LARGER ANIMALS
  { name: 'Wolf Howl', emoji: '🐺', category: 'animal', freqBand: 'low', freqHz: 240, tempo: 'slow', energy: 'moderate', moods: ['meditation', 'sleep'], description: 'Distant wolf cries across wilderness.', layerKind: 'wolf', defaultPitch: 240, defaultVolume: 0.3 },
  { name: 'Whale Song', emoji: '🐋', category: 'animal', freqBand: 'low', freqHz: 180, tempo: 'slow', energy: 'low', moods: ['meditation', 'sleep', 'calm'], description: 'Ancient humpback whale cathedral.', layerKind: 'whale', defaultPitch: 180, defaultVolume: 0.45 },
  { name: 'Dolphin Pod', emoji: '🐬', category: 'animal', freqBand: 'high', freqHz: 8000, tempo: 'fast', energy: 'low', moods: ['happy', 'energetic'], description: 'Dolphin clicks & whistles.', layerKind: 'dolphin', defaultVolume: 0.35 },

  // ❤️ BIO / WOMB
  { name: 'Heartbeat (60 BPM)', emoji: '❤️', category: 'meditation', freqBand: 'low', freqHz: 60, tempo: 'slow', energy: 'low', moods: ['sleep', 'meditation'], description: 'Slow human heartbeat — primal grounding.', layerKind: 'heartbeat', defaultVolume: 0.3 },
  { name: 'Womb Sanctuary', emoji: '🤰', category: 'meditation', freqBand: 'low', freqHz: 100, tempo: 'continuous', energy: 'low', moods: ['sleep', 'meditation'], description: 'Mother\'s womb whoosh.', layerKind: 'womb', defaultVolume: 0.45 },

  // 🔔 INSTRUMENTS
  { name: 'Tibetan Singing Bowl', emoji: '🔔', category: 'instrument', freqBand: 'mid', freqHz: 220, tempo: 'slow', energy: 'low', moods: ['meditation', 'calm'], description: 'Ancient bronze bowl resonance.', layerKind: 'bowl', defaultPitch: 220, defaultVolume: 0.4 },
  { name: 'Crystal Singing Bowl', emoji: '💎', category: 'instrument', freqBand: 'mid', freqHz: 528, tempo: 'slow', energy: 'low', moods: ['meditation'], description: 'Pure quartz crystal at 528 Hz.', layerKind: 'crystal_bowl', defaultPitch: 528, defaultVolume: 0.4 },
  { name: 'Deep Gong', emoji: '🥁', category: 'instrument', freqBand: 'low', freqHz: 80, tempo: 'slow', energy: 'high', moods: ['meditation'], description: 'Full-body cellular reset.', layerKind: 'gong', defaultPitch: 80, defaultVolume: 0.4 },
  { name: 'Hang Drum', emoji: '🪘', category: 'instrument', freqBand: 'mid', freqHz: 293, tempo: 'medium', energy: 'low', moods: ['meditation', 'happy', 'calm'], description: 'Heavenly metallic D minor pentatonic.', layerKind: 'hang_drum', defaultPitch: 293, defaultVolume: 0.4 },
  { name: 'Buddhist Temple Bell', emoji: '🛕', category: 'instrument', freqBand: 'mid', freqHz: 260, tempo: 'slow', energy: 'low', moods: ['meditation'], description: 'Sustained sacred bell tones.', layerKind: 'temple_bell', defaultVolume: 0.3 },
  { name: 'Wind Chimes', emoji: '🎐', category: 'instrument', freqBand: 'high', freqHz: 800, tempo: 'medium', energy: 'low', moods: ['calm', 'happy'], description: 'Sparkling metallic chime clusters.', layerKind: 'wind_chimes', defaultVolume: 0.3 },
  { name: 'Pentatonic Chimes', emoji: '🎐', category: 'instrument', freqBand: 'high', freqHz: 600, tempo: 'medium', energy: 'low', moods: ['meditation', 'calm'], description: 'Bell-like pentatonic notes.', layerKind: 'chimes', defaultVolume: 0.3 },
  { name: 'Native American Flute', emoji: '🪈', category: 'instrument', freqBand: 'mid', freqHz: 293, tempo: 'slow', energy: 'low', moods: ['meditation', 'calm'], description: 'Sacred breathy flute melody.', layerKind: 'flute', defaultPitch: 293, defaultVolume: 0.4 },
  { name: 'Bamboo Shakuhachi', emoji: '🎋', category: 'instrument', freqBand: 'mid', freqHz: 440, tempo: 'slow', energy: 'low', moods: ['meditation', 'calm'], description: 'Japanese pentatonic bamboo flute.', layerKind: 'bamboo_flute', defaultPitch: 440, defaultVolume: 0.4 },
  { name: 'Australian Didgeridoo', emoji: '🎺', category: 'instrument', freqBand: 'low', freqHz: 73, tempo: 'continuous', energy: 'moderate', moods: ['meditation', 'focus'], description: 'Deep aboriginal drone with breath.', layerKind: 'didgeridoo', defaultPitch: 73, defaultVolume: 0.4 },
  { name: 'Indian Tanpura', emoji: '🪕', category: 'instrument', freqBand: 'low', freqHz: 146, tempo: 'continuous', energy: 'low', moods: ['meditation', 'focus'], description: 'Classical Indian drone (Pa-Sa).', layerKind: 'tanpura', defaultPitch: 146, defaultVolume: 0.35 },
  { name: 'Sitar Drone', emoji: '🎻', category: 'instrument', freqBand: 'low', freqHz: 146, tempo: 'continuous', energy: 'low', moods: ['meditation', 'focus'], description: 'Sitar with characteristic jawari buzz.', layerKind: 'sitar_drone', defaultPitch: 146, defaultVolume: 0.35 },

  // 🧘 MEDITATION
  { name: 'Om Drone', emoji: '🕉️', category: 'meditation', freqBand: 'low', freqHz: 110, tempo: 'continuous', energy: 'low', moods: ['meditation'], description: 'Sacred Om vibration.', layerKind: 'om', defaultPitch: 110, defaultVolume: 0.35 },
  { name: 'Mantra Chant', emoji: '🙏', category: 'meditation', freqBand: 'low', freqHz: 110, tempo: 'continuous', energy: 'low', moods: ['meditation'], description: 'Vowel formant Om-Aum cycle.', layerKind: 'mantra', defaultPitch: 110, defaultVolume: 0.35 },
  { name: 'Tibetan Throat Singing', emoji: '🎤', category: 'meditation', freqBand: 'low', freqHz: 90, tempo: 'continuous', energy: 'moderate', moods: ['meditation'], description: 'Overtone singing with whistling harmonic.', layerKind: 'throat_sing', defaultPitch: 90, defaultVolume: 0.35 },

  // 🌌 PADS
  { name: 'Ambient Pad', emoji: '✨', category: 'ambient', freqBand: 'low', freqHz: 220, tempo: 'continuous', energy: 'low', moods: ['meditation', 'sleep', 'focus'], description: 'Soft synthesized warm pad.', layerKind: 'pad', defaultPitch: 220, defaultVolume: 0.3 },
  { name: 'Cosmic Pad', emoji: '🌌', category: 'ambient', freqBand: 'low', freqHz: 110, tempo: 'continuous', energy: 'low', moods: ['meditation'], description: 'Deep space ethereal pad.', layerKind: 'cosmic_pad', defaultPitch: 110, defaultVolume: 0.35 },

  // 🟫 NOISE
  { name: 'Brown Noise', emoji: '🟫', category: 'noise', freqBand: 'low', freqHz: 150, tempo: 'continuous', energy: 'low', moods: ['focus', 'sleep'], description: 'Deep low-frequency masking noise.', layerKind: 'brown', defaultVolume: 0.3 },
  { name: 'Pink Noise', emoji: '🩷', category: 'noise', freqBand: 'mid', freqHz: 800, tempo: 'continuous', energy: 'low', moods: ['focus', 'sleep'], description: 'Balanced spectrum — easier on ears.', layerKind: 'pink', defaultVolume: 0.25 },
  { name: 'White Noise', emoji: '⚪', category: 'noise', freqBand: 'high', freqHz: 5000, tempo: 'continuous', energy: 'moderate', moods: ['focus'], description: 'Full-spectrum sound mask.', layerKind: 'white', defaultVolume: 0.2 },

  // ☕ HUMAN AMBIENT
  { name: 'Coffee Shop', emoji: '☕', category: 'ambient', freqBand: 'mid', freqHz: 800, tempo: 'continuous', energy: 'moderate', moods: ['focus', 'happy'], description: 'Cafe murmur with cup clinks.', layerKind: 'cafe', defaultVolume: 0.4 },
  { name: 'Library Ambience', emoji: '📚', category: 'ambient', freqBand: 'mid', freqHz: 1500, tempo: 'continuous', energy: 'minimal', moods: ['focus'], description: 'Quiet library with page turns.', layerKind: 'library', defaultVolume: 0.35 },
  { name: 'Distant Train', emoji: '🚂', category: 'ambient', freqBand: 'low', freqHz: 250, tempo: 'continuous', energy: 'low', moods: ['sleep', 'focus'], description: 'Rhythmic train rumble through countryside.', layerKind: 'train_distant', defaultVolume: 0.45 },

  // 🙏 SACRED MANTRAS (multi-religion)
  { name: 'Om Mantra (Pure)', emoji: '🕉️', category: 'meditation', freqBand: 'low', freqHz: 130, tempo: 'continuous', energy: 'low', moods: ['meditation', 'calm'], description: 'The primordial sound of the universe — pure Aum vibration.', layerKind: 'mantra_om', defaultPitch: 130, defaultVolume: 0.35 },
  { name: 'Om Namah Shivaya', emoji: '🕉️', category: 'meditation', freqBand: 'low', freqHz: 130, tempo: 'continuous', energy: 'low', moods: ['meditation', 'calm'], description: 'Hindu mantra of devotion to Lord Shiva — "I bow to Shiva."', layerKind: 'mantra_om_namah_shivaya', defaultPitch: 130, defaultVolume: 0.35 },
  { name: 'Hare Krishna Maha-Mantra', emoji: '🦚', category: 'meditation', freqBand: 'mid', freqHz: 165, tempo: 'medium', energy: 'low', moods: ['meditation', 'happy'], description: '16-syllable Krishna kirtan — devotional joy & liberation.', layerKind: 'mantra_hare_krishna', defaultPitch: 165, defaultVolume: 0.35 },
  { name: 'Gayatri Mantra', emoji: '☀️', category: 'meditation', freqBand: 'low', freqHz: 146, tempo: 'slow', energy: 'low', moods: ['meditation'], description: 'Vedic sacred mantra to the sun — wisdom & illumination.', layerKind: 'mantra_gayatri', defaultPitch: 146, defaultVolume: 0.35 },
  { name: 'Mahamrityunjaya Mantra', emoji: '🪔', category: 'meditation', freqBand: 'low', freqHz: 130, tempo: 'slow', energy: 'low', moods: ['meditation'], description: 'Ancient Vedic healing mantra — conquers fear & sickness.', layerKind: 'mantra_mahamrityunjaya', defaultPitch: 130, defaultVolume: 0.35 },
  { name: 'Om Mani Padme Hum', emoji: '☸️', category: 'meditation', freqBand: 'low', freqHz: 110, tempo: 'slow', energy: 'low', moods: ['meditation'], description: 'Buddhist mantra of compassion — jewel in the lotus.', layerKind: 'mantra_om_mani_padme_hum', defaultPitch: 110, defaultVolume: 0.35 },
  { name: 'Waheguru', emoji: '☬', category: 'meditation', freqBand: 'mid', freqHz: 146, tempo: 'medium', energy: 'low', moods: ['meditation'], description: 'Sikh sacred name of God — wonderful enlightener.', layerKind: 'mantra_waheguru', defaultPitch: 146, defaultVolume: 0.35 },
  { name: 'Gregorian Chant', emoji: '⛪', category: 'meditation', freqBand: 'low', freqHz: 130, tempo: 'slow', energy: 'low', moods: ['meditation', 'calm'], description: 'Christian Latin chant — Kyrie eleison ("Lord have mercy").', layerKind: 'mantra_gregorian', defaultPitch: 130, defaultVolume: 0.4 },
  { name: 'Sufi Allah Dhikr', emoji: '☪️', category: 'meditation', freqBand: 'mid', freqHz: 165, tempo: 'medium', energy: 'low', moods: ['meditation'], description: 'Islamic Sufi remembrance of God — heart of devotion.', layerKind: 'mantra_sufi_allah', defaultPitch: 165, defaultVolume: 0.4 },
  { name: 'Native American Chant', emoji: '🪶', category: 'meditation', freqBand: 'mid', freqHz: 220, tempo: 'medium', energy: 'low', moods: ['meditation'], description: 'Sacred chant honoring earth, sky & ancestors.', layerKind: 'mantra_native_american', defaultPitch: 220, defaultVolume: 0.4 },

  // 🪈 KRISHNA'S BANSURI
  { name: "Krishna's Bansuri (Bamboo Flute)", emoji: '🪈', category: 'instrument', freqBand: 'mid', freqHz: 261, tempo: 'slow', energy: 'low', moods: ['meditation', 'calm', 'happy'], description: "Lord Krishna's divine bamboo flute in Raga Yaman — eternal devotion.", layerKind: 'krishna_bansuri', defaultPitch: 261, defaultVolume: 0.45 },

  // 🏔️ MOUNTAIN
  { name: 'Tibetan Horn (Dungchen)', emoji: '📯', category: 'instrument', freqBand: 'low', freqHz: 55, tempo: 'continuous', energy: 'moderate', moods: ['meditation'], description: 'Long deep horn calling across Himalayan valleys.', layerKind: 'tibetan_horn', defaultPitch: 55, defaultVolume: 0.35 },
  { name: 'Yak Bells', emoji: '🔔', category: 'ambient', freqBand: 'mid', freqHz: 460, tempo: 'slow', energy: 'low', moods: ['meditation', 'calm'], description: 'Random clanks of yaks roaming Tibetan plateau.', layerKind: 'yak_bells', defaultVolume: 0.3 },
  { name: 'Mystic Cave Drips', emoji: '💧', category: 'water', freqBand: 'mid', freqHz: 1000, tempo: 'slow', energy: 'minimal', moods: ['meditation', 'sleep'], description: 'Echoing water drops in ancient mountain cave.', layerKind: 'cave_drips', defaultVolume: 0.35 },
  { name: 'Distant Avalanche', emoji: '⛰️', category: 'weather', freqBand: 'low', freqHz: 100, tempo: 'continuous', energy: 'high', moods: ['sleep'], description: 'Deep rumbling snow falling far away in mountains.', layerKind: 'avalanche', defaultVolume: 0.25 },

  // 🦁 WILDLIFE
  { name: 'Lion Roar', emoji: '🦁', category: 'animal', freqBand: 'low', freqHz: 110, tempo: 'slow', energy: 'high', moods: ['energetic'], description: 'Powerful king of beasts — African savanna sovereign.', layerKind: 'lion_roar', defaultVolume: 0.35 },
  { name: 'Tiger Roar', emoji: '🐅', category: 'animal', freqBand: 'low', freqHz: 90, tempo: 'slow', energy: 'high', moods: ['energetic'], description: 'Bengal tiger\'s territorial call — Asian jungle apex.', layerKind: 'tiger_roar', defaultVolume: 0.35 },
  { name: 'Elephant Trumpet', emoji: '🐘', category: 'animal', freqBand: 'low', freqHz: 350, tempo: 'slow', energy: 'high', moods: ['energetic'], description: 'Majestic trumpet of the gentle giant.', layerKind: 'elephant_trumpet', defaultVolume: 0.3 },
  { name: 'Howler Monkey', emoji: '🐒', category: 'animal', freqBand: 'low', freqHz: 200, tempo: 'slow', energy: 'moderate', moods: ['meditation'], description: 'Deep haunting howl — loudest land animal call.', layerKind: 'monkey_howler', defaultVolume: 0.3 },
  { name: 'Coyote Howl', emoji: '🐺', category: 'animal', freqBand: 'mid', freqHz: 700, tempo: 'medium', energy: 'moderate', moods: ['meditation'], description: 'Yipping & howling pack across desert moonlight.', layerKind: 'coyote_howl', defaultVolume: 0.3 },
  { name: 'Bear Growl', emoji: '🐻', category: 'animal', freqBand: 'low', freqHz: 80, tempo: 'slow', energy: 'high', moods: ['sleep'], description: 'Deep guttural rumble of forest bear.', layerKind: 'bear_growl', defaultVolume: 0.22 },
  { name: 'Deer Bugle', emoji: '🦌', category: 'animal', freqBand: 'mid', freqHz: 700, tempo: 'slow', energy: 'low', moods: ['calm'], description: 'Bugling rutting call across mountain forests.', layerKind: 'deer_call', defaultVolume: 0.3 },
];

// =====================================================================
// 🌍 EXPORT: COMPLETE SOUND REGISTRY
// =====================================================================
export const SOUND_REGISTRY: SoundTag[] = [
  ...BIRDS.map(tagBird),
  ...AMBIENT_REGISTRY.map((s, i) => ({ ...s, id: `amb_${s.layerKind}_${i}` })),
];

// =====================================================================
// HELPERS
// =====================================================================
export const ALL_MOODS: MoodTag[] = ['calm', 'focus', 'sleep', 'energetic', 'meditation', 'happy'];
export const ALL_FREQS: FreqBand[] = ['low', 'mid', 'high'];
export const ALL_TEMPOS: Tempo[] = ['slow', 'medium', 'fast', 'continuous'];
export const ALL_ENERGIES: Energy[] = ['minimal', 'low', 'moderate', 'high'];
export const ALL_CATEGORIES: { id: SoundTag['category']; label: string; emoji: string }[] = [
  { id: 'bird', label: 'Birds', emoji: '🐦' },
  { id: 'water', label: 'Water', emoji: '💧' },
  { id: 'weather', label: 'Weather', emoji: '⛈️' },
  { id: 'fire', label: 'Fire', emoji: '🔥' },
  { id: 'wind', label: 'Wind', emoji: '💨' },
  { id: 'instrument', label: 'Instruments', emoji: '🪘' },
  { id: 'meditation', label: 'Meditation', emoji: '🧘' },
  { id: 'animal', label: 'Animals', emoji: '🐺' },
  { id: 'ambient', label: 'Ambient', emoji: '🌌' },
  { id: 'noise', label: 'Noise', emoji: '🟫' },
];

export interface SoundFilters {
  search?: string;
  moods?: MoodTag[];
  freqs?: FreqBand[];
  tempos?: Tempo[];
  energies?: Energy[];
  categories?: SoundTag['category'][];
}

export function filterSounds(filters: SoundFilters): SoundTag[] {
  return SOUND_REGISTRY.filter((s) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!s.name.toLowerCase().includes(q) &&
          !s.description.toLowerCase().includes(q) &&
          !(s.region || '').toLowerCase().includes(q)) return false;
    }
    if (filters.moods?.length && !filters.moods.some(m => s.moods.includes(m))) return false;
    if (filters.freqs?.length && !filters.freqs.includes(s.freqBand)) return false;
    if (filters.tempos?.length && !filters.tempos.includes(s.tempo)) return false;
    if (filters.energies?.length && !filters.energies.includes(s.energy)) return false;
    if (filters.categories?.length && !filters.categories.includes(s.category)) return false;
    return true;
  });
}

// Build a SoundLayer from a SoundTag (for the audio engine)
export function buildLayerFromTag(tag: SoundTag, volume?: number): SoundLayer {
  return {
    id: `${tag.id}_${uuidv4().slice(0, 8)}`,
    name: tag.name,
    kind: tag.layerKind as LayerKind,
    baseVolume: volume ?? tag.defaultVolume,
    birdSpeciesId: tag.birdSpeciesId,
    pitch: tag.defaultPitch,
  };
}

// =====================================================================
// 🎯 SMART RECOMMENDATIONS
// =====================================================================
export interface SmartRecommendation {
  layerKinds?: LayerKind[];
  freqBalance?: 'low-heavy' | 'mid-balanced' | 'bright';
  description: string;
}

export function recommendForMood(mood: MoodTag): SoundTag[] {
  // Pick a balanced selection: 1 instrument/tone + 1-2 birds + 1 water + 1 ambient
  const matching = SOUND_REGISTRY.filter(s => s.moods.includes(mood));
  const result: SoundTag[] = [];
  const categoriesNeeded: SoundTag['category'][] = ['meditation', 'bird', 'water', 'wind', 'ambient'];
  for (const cat of categoriesNeeded) {
    const opt = matching.find(s => s.category === cat && !result.includes(s));
    if (opt) result.push(opt);
  }
  if (result.length < 3) {
    matching.slice(0, 5 - result.length).forEach(s => {
      if (!result.includes(s)) result.push(s);
    });
  }
  return result.slice(0, 5);
}

export function getStats() {
  const byCategory: Record<string, number> = {};
  const byMood: Record<string, number> = {};
  for (const s of SOUND_REGISTRY) {
    byCategory[s.category] = (byCategory[s.category] || 0) + 1;
    s.moods.forEach(m => { byMood[m] = (byMood[m] || 0) + 1; });
  }
  return { total: SOUND_REGISTRY.length, byCategory, byMood };
}
