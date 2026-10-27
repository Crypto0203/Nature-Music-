#!/usr/bin/env node
// =====================================================================
// 🐦 BULK BIRD SOUND DOWNLOADER
// Downloads CC-licensed recordings from xeno-canto.org (the world's
// largest community bird sound database — 800,000+ recordings).
//
// Usage:
//   node scripts/download-sounds.mjs --count=100 --quality=A
//   node scripts/download-sounds.mjs --species=wren --count=20
// =====================================================================

import fs from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

// ---------- Config ----------
const args = parseArgs(process.argv.slice(2));
const COUNT = parseInt(args.count || '50', 10);
const QUALITY = args.quality || 'A';        // A=best, B, C, D, E
const SPECIES = args.species || null;        // optional filter
const OUTPUT_DIR = path.resolve('sounds/birds/raw');
const META_FILE = path.resolve('data/raw-metadata.json');

// Curated list of relaxing bird species (used when no --species filter)
const RELAXING_SPECIES = [
  'Troglodytes troglodytes',          // Eurasian Wren
  'Luscinia megarhynchos',            // Nightingale
  'Turdus merula',                    // Eurasian Blackbird
  'Erithacus rubecula',               // European Robin
  'Strix aluco',                      // Tawny Owl
  'Streptopelia decaocto',            // Eurasian Collared-Dove
  'Cuculus canorus',                  // Common Cuckoo
  'Alauda arvensis',                  // Skylark
  'Cettia cetti',                     // Cetti's Warbler
  'Eudynamys scolopaceus',            // Asian Koel
  'Copsychus saularis',               // Oriental Magpie-Robin
  'Pavo cristatus',                   // Indian Peafowl
  'Gavia immer',                      // Common Loon
  'Turdus migratorius',               // American Robin
  'Cardinalis cardinalis',            // Northern Cardinal
  'Dacelo novaeguineae',              // Laughing Kookaburra
  'Cracticus tibicen',                // Australian Magpie
  'Anthornis melanura',               // NZ Bellbird
];

// ---------- Main ----------
async function main() {
  console.log('🐦 CalmNature · Bulk Sound Downloader\n');
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(META_FILE), { recursive: true });

  const speciesList = SPECIES ? [SPECIES] : RELAXING_SPECIES;
  const perSpecies = Math.max(1, Math.ceil(COUNT / speciesList.length));
  const allRecordings = [];

  for (const species of speciesList) {
    console.log(`🔍 Searching for ${species}...`);
    const recs = await searchXenoCanto(species, QUALITY, perSpecies);
    console.log(`   Found ${recs.length} recordings (quality ${QUALITY})`);
    allRecordings.push(...recs);
    if (allRecordings.length >= COUNT) break;
  }

  const toDownload = allRecordings.slice(0, COUNT);
  console.log(`\n⬇️  Downloading ${toDownload.length} files...\n`);

  const metadata = [];
  let i = 0;
  for (const rec of toDownload) {
    i++;
    const filename = sanitize(`${rec.gen}_${rec.sp}_${rec.id}.mp3`);
    const filepath = path.join(OUTPUT_DIR, filename);
    try {
      await downloadFile(rec.file, filepath);
      const stats = await fs.stat(filepath);
      console.log(`✅ [${i}/${toDownload.length}] ${filename} (${(stats.size / 1024).toFixed(0)} KB)`);
      metadata.push({
        filename,
        species: `${rec.gen} ${rec.sp}`,
        commonName: rec.en,
        country: rec.cnt,
        recordist: rec.rec,
        license: rec.lic,
        sourceUrl: `https:${rec.url}`,
        quality: rec.q,
        length: rec.length,
        type: rec.type,
      });
    } catch (err) {
      console.warn(`❌ [${i}/${toDownload.length}] ${filename}: ${err.message}`);
    }
  }

  await fs.writeFile(META_FILE, JSON.stringify(metadata, null, 2));
  console.log(`\n💾 Saved metadata → ${META_FILE}`);
  console.log(`📁 Files in        → ${OUTPUT_DIR}`);
  console.log(`\n✨ Next step: bash scripts/process-audio.sh\n`);
}

// ---------- xeno-canto API ----------
async function searchXenoCanto(species, quality, limit) {
  const query = encodeURIComponent(`${species} q:${quality} len:5-60`);
  const url = `https://xeno-canto.org/api/2/recordings?query=${query}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`xeno-canto error ${res.status}`);
  const data = await res.json();
  return (data.recordings || []).slice(0, limit);
}

// ---------- Download with stream ----------
async function downloadFile(url, dest) {
  const fullUrl = url.startsWith('http') ? url : `https:${url}`;
  const res = await fetch(fullUrl);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

// ---------- Helpers ----------
function parseArgs(arr) {
  const out = {};
  for (const a of arr) {
    const m = a.match(/^--([^=]+)(?:=(.+))?$/);
    if (m) out[m[1]] = m[2] ?? true;
  }
  return out;
}
function sanitize(s) { return s.replace(/[^a-z0-9._-]/gi, '_'); }

main().catch(err => { console.error('💥', err); process.exit(1); });
