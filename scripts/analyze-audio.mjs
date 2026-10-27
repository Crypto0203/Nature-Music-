#!/usr/bin/env node
// =====================================================================
// 🧠 AUDIO ANALYZER & AUTO-TAGGER
// Extracts low-level features from each processed audio file using
// FFprobe + ffmpeg's astats / volumedetect filters and produces a
// JSON file with mood/frequency/tempo/energy tags ready for the
// CalmNature Sound Lab.
//
// Output schema matches src/audio/tagger.ts SoundTag interface.
// =====================================================================

import fs from 'fs/promises';
import path from 'path';
import { execFile as execFileCb } from 'child_process';
import { promisify } from 'util';

const execFile = promisify(execFileCb);

const INPUT_DIR  = path.resolve('sounds/birds/processed');
const RAW_META   = path.resolve('data/raw-metadata.json');
const OUT_FILE   = path.resolve('data/sound-metadata.json');

async function main() {
  console.log('🧠 CalmNature · Audio Analyzer\n');

  // Load source metadata if exists
  let rawMeta = [];
  try { rawMeta = JSON.parse(await fs.readFile(RAW_META, 'utf-8')); } catch {}
  const metaByFile = Object.fromEntries(rawMeta.map(m => [m.filename, m]));

  const files = (await fs.readdir(INPUT_DIR).catch(() => [])).filter(f => f.endsWith('.mp3'));
  if (files.length === 0) {
    console.log(`⚠️  No files in ${INPUT_DIR}. Run process-audio.sh first.`);
    return;
  }

  console.log(`Analyzing ${files.length} files...\n`);

  const results = [];
  let i = 0;
  for (const file of files) {
    i++;
    const filepath = path.join(INPUT_DIR, file);
    try {
      const features = await analyzeFile(filepath);
      const tags = autoTag(features);
      const source = metaByFile[file] || {};

      const entry = {
        // Required: SoundTag-compatible
        id: `file_${path.basename(file, '.mp3')}`,
        name: source.commonName || prettify(file),
        emoji: '🐦',
        category: 'bird',
        layerKind: 'audio_file',
        audioFileUrl: `/sounds/birds/processed/${file}`,
        defaultVolume: 0.5,
        // Auto-extracted
        ...tags,
        // Raw features (for debugging)
        _features: features,
        // Provenance
        species: source.species,
        country: source.country,
        license: source.license,
        sourceUrl: source.sourceUrl,
        recordist: source.recordist,
      };
      results.push(entry);
      console.log(`✅ [${i}/${files.length}] ${file}`);
      console.log(`     ${tags.freqBand} freq · ${tags.tempo} tempo · ${tags.energy} energy → [${tags.moods.join(', ')}]`);
    } catch (err) {
      console.warn(`❌ [${i}/${files.length}] ${file}: ${err.message}`);
    }
  }

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(results, null, 2));
  console.log(`\n💾 Wrote ${results.length} tagged sounds → ${OUT_FILE}`);

  // Summary stats
  const moodCount = {};
  results.forEach(r => r.moods.forEach(m => { moodCount[m] = (moodCount[m] || 0) + 1; }));
  console.log('\n📊 Mood distribution:');
  Object.entries(moodCount).sort((a, b) => b[1] - a[1]).forEach(([m, c]) =>
    console.log(`   ${m.padEnd(12)} ${c}`));
}

// =====================================================================
// FEATURE EXTRACTION (via ffprobe + ffmpeg astats)
// =====================================================================
async function analyzeFile(filepath) {
  // 1. Duration via ffprobe
  const { stdout: probeOut } = await execFile('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1', filepath
  ]);
  const duration = parseFloat(probeOut.trim());

  // 2. Loudness, peak, RMS via ffmpeg astats
  const { stderr: statsOut } = await execFile('ffmpeg', [
    '-i', filepath, '-af', 'astats=metadata=1:reset=1,ametadata=mode=print',
    '-f', 'null', '-'
  ]);
  const peakDb = extractFloat(statsOut, /Peak level dB:\s*(-?[\d.]+)/);
  const rmsDb  = extractFloat(statsOut, /RMS level dB:\s*(-?[\d.]+)/);
  const flatness = extractFloat(statsOut, /Flat factor:\s*([\d.]+)/) || 0;

  // 3. Spectral centroid (rough freq estimate via ffmpeg's biquad)
  // Approximation: high-pass at 2k ratio vs full energy
  const { stderr: hpfOut } = await execFile('ffmpeg', [
    '-i', filepath, '-af', 'highpass=f=2000,volumedetect',
    '-f', 'null', '-'
  ]);
  const hpfMean = extractFloat(hpfOut, /mean_volume:\s*(-?[\d.]+)\s*dB/) || -90;
  const { stderr: fullOut } = await execFile('ffmpeg', [
    '-i', filepath, '-af', 'volumedetect', '-f', 'null', '-'
  ]);
  const fullMean = extractFloat(fullOut, /mean_volume:\s*(-?[\d.]+)\s*dB/) || -90;
  const highEnergyRatio = Math.max(0, Math.min(1, (hpfMean - fullMean + 30) / 30));

  // 4. Onset density (transients / sec) — proxy for tempo
  // Using ffmpeg silencedetect to count "events"
  const { stderr: silOut } = await execFile('ffmpeg', [
    '-i', filepath, '-af', 'silencedetect=n=-30dB:d=0.05',
    '-f', 'null', '-'
  ]);
  const silenceMatches = silOut.match(/silence_start/g);
  const onsetDensity = silenceMatches ? silenceMatches.length / Math.max(duration, 1) : 0;

  return {
    duration: Math.round(duration * 100) / 100,
    peakDb: Math.round(peakDb * 10) / 10,
    rmsDb:  Math.round(rmsDb * 10) / 10,
    flatness: Math.round(flatness * 100) / 100,
    highEnergyRatio: Math.round(highEnergyRatio * 100) / 100,
    onsetDensity: Math.round(onsetDensity * 100) / 100,
  };
}

// =====================================================================
// AUTO-TAGGING RULES
// =====================================================================
function autoTag(f) {
  // Frequency band
  let freqBand;
  if (f.highEnergyRatio < 0.3) freqBand = 'low';
  else if (f.highEnergyRatio < 0.6) freqBand = 'mid';
  else freqBand = 'high';

  // Tempo (from onset density events/sec)
  let tempo;
  if (f.onsetDensity < 0.3) tempo = 'slow';
  else if (f.onsetDensity < 1.2) tempo = 'medium';
  else if (f.onsetDensity < 3) tempo = 'fast';
  else tempo = 'continuous';

  // Energy (from RMS loudness)
  let energy;
  if (f.rmsDb < -30) energy = 'minimal';
  else if (f.rmsDb < -22) energy = 'low';
  else if (f.rmsDb < -16) energy = 'moderate';
  else energy = 'high';

  // Mood mapping (matches src/audio/tagger.ts logic)
  const moods = [];
  if ((freqBand !== 'high' || tempo === 'slow') && (energy === 'minimal' || energy === 'low')) moods.push('calm');
  if (freqBand === 'low' && (tempo === 'slow' || tempo === 'medium') && energy !== 'high') moods.push('sleep');
  if ((freqBand === 'mid' || freqBand === 'low') && (tempo === 'medium' || tempo === 'continuous') && energy !== 'high') moods.push('focus');
  if ((freqBand === 'high' || freqBand === 'mid') && tempo === 'fast' && (energy === 'moderate' || energy === 'high')) moods.push('energetic');
  if (freqBand !== 'low' && tempo !== 'slow' && energy !== 'minimal') moods.push('happy');
  if (freqBand === 'low' && tempo === 'slow' && energy === 'minimal') moods.push('meditation');

  return {
    freqBand, freqHz: estimateFreqHz(freqBand),
    tempo, energy,
    moods: moods.length ? moods : ['calm'],
  };
}

function estimateFreqHz(band) {
  return band === 'low' ? 500 : band === 'mid' ? 1500 : 4000;
}

// ---------- Helpers ----------
function extractFloat(text, re) {
  const m = text.match(re);
  return m ? parseFloat(m[1]) : null;
}
function prettify(file) {
  return file.replace(/\.mp3$/, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

main().catch(err => { console.error('💥', err); process.exit(1); });
