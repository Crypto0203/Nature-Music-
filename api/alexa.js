// =====================================================================
// 🎙️ CalmNature — Year 2000 Golden Devotional Songs & Sanctuary API
// Built for Single Hall Living Room + Alexa Echo
// 100% Zero-Touch Automatic Continuous AudioPlayer Engine
// =====================================================================

const BASE_URL = 'https://nature-music-two.vercel.app';

// --- 1. MASTER PLAYLIST DEFINITIONS ---

export const MORNING_PLAYLIST = [
  {
    id: 'suprabhatam',
    title: 'Sri Venkateswara Suprabhatam (M. S. Subbulakshmi)',
    file: 'devotional/suprabhatam.mp3',
    volume: 40
  },
  {
    id: 'jai_ganesh_deva',
    title: 'Jai Ganesh Deva (Anuradha Paudwal)',
    file: 'devotional/jai-ganesh-deva.mp3',
    volume: 40
  },
  {
    id: 'manasa_smarami',
    title: 'Sri Venkatesam Manasa Smarami (Year 2000 Master)',
    file: 'devotional/sri-venkatesam-manasa-smarami.mp3',
    volume: 40
  },
  {
    id: 'hanuman_chalisa',
    title: 'Shree Hanuman Chalisa (Hariharan)',
    file: 'devotional/hanuman-chalisa-hariharan.mp3',
    volume: 40
  },
  {
    id: 'om_jai_jagdish_hare',
    title: 'Om Jai Jagdish Hare (Anuradha Paudwal)',
    file: 'devotional/om-jai-jagdish-hare.mp3',
    volume: 40
  },
  {
    id: 'vishnu_sahasranamam',
    title: 'Vishnu Sahasranamam (M. S. Subbulakshmi)',
    file: 'devotional/vishnu-sahasranamam.mp3',
    volume: 40
  },
  {
    id: 'brahmam_okate',
    title: 'Brahmam Okate (Thandanana)',
    file: 'devotional/brahmam-okate.mp3',
    volume: 40
  },
  {
    id: 'muddugare_yashoda',
    title: 'Muddugare Yashoda',
    file: 'devotional/muddugare-yashoda.mp3',
    volume: 40
  },
  {
    id: 'kondalalo_nelakonna',
    title: 'Kondalalo Nelakonna',
    file: 'devotional/kondalalo-nelakonna.mp3',
    volume: 40
  },
  {
    id: 'adivo_alladivo',
    title: 'Adivo Alladivo',
    file: 'devotional/adivo-alladivo.mp3',
    volume: 40
  },
  {
    id: 'sreemannarayana',
    title: 'Sriman Narayana',
    file: 'devotional/sreemannarayana.mp3',
    volume: 40
  },
  {
    id: 'shiva_tandava',
    title: 'Shiva Tandava Stotram (Most Powerful Shiva Mantra)',
    file: 'devotional/shiva-tandava-stotram.mp3',
    volume: 40
  },
  {
    id: 'maha_mrityunjaya',
    title: 'Maha Mrityunjaya Mantra 108 Times (Suresh Wadkar & Anuradha Paudwal)',
    file: 'devotional/maha-mrityunjaya-mantra-108.mp3',
    volume: 40
  },
  {
    id: 'gayatri_mantra_108',
    title: 'Gayatri Mantra 108 Times (Anuradha Paudwal)',
    file: 'devotional/gayatri-mantra-108.mp3',
    volume: 40
  },
  {
    id: 'shankh_naad',
    title: 'Sacred Shankh Naad & Temple Bells',
    file: 'devotional/shankh-and-temple-bell.mp3',
    volume: 45
  }
];

export const AFTERNOON_PLAYLIST = [
  {
    id: 'home_cleanse_528',
    title: '528 Hz Home Harmony & Positive Vibe',
    file: 'healing/528hz-home-cleanse.mp3',
    volume: 30
  },
  {
    id: 'space_cleanse_417',
    title: '417 Hz Negative Energy Dissolver & Space Cleanser',
    file: 'healing/417hz-negative-energy-cleanse.mp3',
    volume: 30
  },
  {
    id: 'om_chanting_432',
    title: '432 Hz Sacred OM Chanting for Deep Peace',
    file: 'healing/432hz-om-chanting.mp3',
    volume: 30
  },
  {
    id: 'tibetan_bowls',
    title: 'Tibetan Singing Bowls Sound Bath',
    file: 'healing/tibetan-singing-bowls.mp3',
    volume: 30
  }
];

export const EVENING_PLAYLIST = [
  {
    id: 'hanuman_chalisa',
    title: 'Shree Hanuman Chalisa (Hariharan)',
    file: 'devotional/hanuman-chalisa-hariharan.mp3',
    volume: 40
  },
  {
    id: 'maha_mrityunjaya',
    title: 'Maha Mrityunjaya Mantra 108 Times',
    file: 'devotional/maha-mrityunjaya-mantra-108.mp3',
    volume: 40
  },
  {
    id: 'shankh_naad',
    title: 'Sacred Shankh Naad & Temple Bells',
    file: 'devotional/shankh-and-temple-bell.mp3',
    volume: 45
  }
];

// Rich 5-track nocturnal healing sanctuary for continuous overnight sleep (No 11 PM shutdown!)
export const NIGHT_PLAYLIST = [
  {
    id: 'pain_relief_174',
    title: '174 Hz Cellular Rest & Natural Pain Relief',
    file: 'healing/174hz-pain-relief.mp3',
    volume: 22
  },
  {
    id: 'night_sleep_flute',
    title: 'Gentle Nocturnal Flute & Deep Sleep Flow',
    file: 'night-sleep-flute.mp3',
    volume: 20
  },
  {
    id: 'om_chanting_432_sleep',
    title: '432 Hz Sacred Delta Rest & Deep Sleep Waves',
    file: 'healing/432hz-om-chanting.mp3',
    volume: 22
  },
  {
    id: 'tibetan_bowls_rest',
    title: 'Tibetan Singing Bowls Nocturnal Sound Bath',
    file: 'healing/tibetan-singing-bowls.mp3',
    volume: 20
  },
  {
    id: 'home_harmony_528_calm',
    title: '528 Hz Deep Serenity & Cell Repair',
    file: 'healing/528hz-home-cleanse.mp3',
    volume: 20
  }
];

function getPlaylistByName(name) {
  switch (name) {
    case 'afternoon':
      return AFTERNOON_PLAYLIST;
    case 'evening':
      return EVENING_PLAYLIST;
    case 'night':
      return NIGHT_PLAYLIST;
    case 'morning':
    default:
      return MORNING_PLAYLIST;
  }
}

// 24-Hour Continuous Living Sanctuary (Zero 11 PM cutoff — nocturnal healing loops all night)
function getCurrentPhaseInfo() {
  const istString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  const targetTime = new Date(istString);
  
  const hour = targetTime.getHours();
  const minute = targetTime.getMinutes();
  const timeVal = hour + minute / 60.0;

  // Phase 1: Morning Awakening (6:00 AM – 8:00 AM) IST
  if (timeVal >= 6.0 && timeVal < 8.0) {
    return {
      phase: 'morning_awakening',
      playlistName: 'morning',
      index: 0,
      track: MORNING_PLAYLIST[0]
    };
  // Phase 2: Daytime / Afternoon Focus (8:00 AM – 6:00 PM) IST
  } else if (timeVal >= 8.0 && timeVal < 18.0) {
    return {
      phase: 'afternoon_calm',
      playlistName: 'afternoon',
      index: 0,
      track: AFTERNOON_PLAYLIST[0]
    };
  // Phase 3: Evening Sandhya (6:00 PM – 7:30 PM) IST
  } else if (timeVal >= 18.0 && timeVal < 19.5) {
    return {
      phase: 'evening_sandhya',
      playlistName: 'evening',
      index: 0,
      track: EVENING_PLAYLIST[0]
    };
  // Phase 4: Nocturnal Healing & Deep Sleep (7:30 PM – 6:00 AM next morning) IST
  // Runs all night through 11 PM and past midnight with ZERO shutdown!
  } else {
    return {
      phase: 'night_healing_sleep',
      playlistName: 'night',
      index: 0,
      track: NIGHT_PLAYLIST[0]
    };
  }
}

// Token format: calmnature_{playlistName}_{index}_{counter}
function parseToken(tokenStr) {
  const currentPhase = getCurrentPhaseInfo();
  const defaultPlaylist = currentPhase.playlistName;
  const defaultIndex = currentPhase.index;

  if (!tokenStr || typeof tokenStr !== 'string') {
    return { playlistName: defaultPlaylist, index: defaultIndex, counter: 1 };
  }
  const clean = tokenStr.replace(/:/g, '_');
  const parts = clean.split('_');
  if (parts.length >= 4) {
    const pName = parts[1] || defaultPlaylist;
    const pIdx = parseInt(parts[2] || '0', 10);
    const pCount = parseInt(parts[3] || '1', 10);
    return {
      playlistName: isNaN(pIdx) ? defaultPlaylist : pName,
      index: isNaN(pIdx) ? defaultIndex : pIdx,
      counter: isNaN(pCount) ? 1 : pCount
    };
  }
  return { playlistName: defaultPlaylist, index: defaultIndex, counter: 1 };
}

function buildToken(playlistName, index, counter) {
  return `calmnature_${playlistName}_${index}_${counter}`;
}

// Match voice query to song & index
function matchRequestedSong(request) {
  const slots = request.intent?.slots || {};
  let query = '';
  for (const k in slots) {
    if (slots[k]?.value) query += ' ' + slots[k].value.toLowerCase();
  }
  const intentName = (request.intent?.name || '').toLowerCase();
  const text = (query + ' ' + intentName).toLowerCase();

  // Morning playlist matching
  for (let i = 0; i < MORNING_PLAYLIST.length; i++) {
    const item = MORNING_PLAYLIST[i];
    if (item.id === 'suprabhatam' && (text.includes('suprabhatam') || text.includes('subbulakshmi') || text.includes('first song') || text.includes('1st song') || text.includes('balaji') || text.includes('morning'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'jai_ganesh_deva' && (text.includes('ganesh') || text.includes('ganpati') || text.includes('jai ganesh') || text.includes('second song') || text.includes('next song'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'manasa_smarami' && (text.includes('smarami') || text.includes('manasa') || text.includes('venkatesam') || text.includes('srinivasam'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'shiva_tandava' && (text.includes('shiva') || text.includes('tandav') || text.includes('tandava') || text.includes('shiva mantra') || text.includes('bholenath') || text.includes('mahadev'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'maha_mrityunjaya' && (text.includes('mrityunjaya') || text.includes('mrutyunjaya') || text.includes('tryambakam') || text.includes('healing mantra'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'vishnu_sahasranamam' && (text.includes('sahasranamam') || text.includes('vishnu sahasra'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'hanuman_chalisa' && (text.includes('hanuman') || text.includes('chalisa') || text.includes('hariharan') || text.includes('bajrangbali'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'om_jai_jagdish_hare' && (text.includes('jagdish') || text.includes('om jai jagdish'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'gayatri_mantra_108' && (text.includes('gayatri') || text.includes('gayatri mantra'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'shankh_naad' && (text.includes('shankh') || text.includes('conch') || text.includes('shankha'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'brahmam_okate' && (text.includes('brahmam') || text.includes('thandanana'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'muddugare_yashoda' && (text.includes('muddugare') || text.includes('yashoda'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'kondalalo_nelakonna' && (text.includes('kondalalo') || text.includes('koneti'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'adivo_alladivo' && (text.includes('adivo') || text.includes('alladivo'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'sreemannarayana' && (text.includes('narayana') || text.includes('sreemannarayana'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
  }

  // Healing / night frequencies
  if (text.includes('174') || text.includes('pain') || text.includes('leg') || text.includes('mom') || text.includes('mother') || text.includes('relief') || text.includes('sleep') || text.includes('night') || text.includes('bedtime') || text.includes('flute')) {
    return { playlistName: 'night', index: 0, track: NIGHT_PLAYLIST[0] };
  }

  if (text.includes('417') || text.includes('dissolve blockage') || text.includes('negative energy')) {
    return { playlistName: 'afternoon', index: 1, track: AFTERNOON_PLAYLIST[1] };
  }

  if (text.includes('528') || text.includes('positive energy') || text.includes('positive vibe') || text.includes('harmony')) {
    return { playlistName: 'afternoon', index: 0, track: AFTERNOON_PLAYLIST[0] };
  }

  if (text.includes('432') || text.includes('om chant') || text.includes('chanting')) {
    return { playlistName: 'afternoon', index: 2, track: AFTERNOON_PLAYLIST[2] };
  }

  if (text.includes('bowl') || text.includes('tibetan')) {
    return { playlistName: 'afternoon', index: 3, track: AFTERNOON_PLAYLIST[3] };
  }

  if (text.includes('evening') || text.includes('sandhya') || text.includes('pooja') || text.includes('aarti')) {
    return { playlistName: 'evening', index: 0, track: EVENING_PLAYLIST[0] };
  }

  if (text.includes('2000') || text.includes('90') || text.includes('devotion') || text.includes('god song') || text.includes('bhajan')) {
    return { playlistName: 'morning', index: 0, track: MORNING_PLAYLIST[0] };
  }

  return null;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const currentPhase = getCurrentPhaseInfo();
  const audioUrl = currentPhase.track ? `${BASE_URL}/audio/${currentPhase.track.file}` : null;
  const bellUrl = `${BASE_URL}/audio/temple-bell-hourly.mp3`;

  // Status / Health check
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      system: 'CalmNature Sanctuary & Alexa Continuous 24/7 Audio Engine',
      currentPhase,
      streamUrl: audioUrl,
      hourlyChimeUrl: bellUrl,
      morningTracksTotal: MORNING_PLAYLIST.length,
      nightTracksTotal: NIGHT_PLAYLIST.length,
      orderedMorningPlaylist: MORNING_PLAYLIST.map((t, idx) => `${idx + 1}. ${t.title}`),
      orderedNightPlaylist: NIGHT_PLAYLIST.map((t, idx) => `${idx + 1}. ${t.title}`),
      dailyRhythm: {
        phase1_morning: '06:00 AM – 08:00 AM: Continuous Morning Devotional (#1 Suprabhatam -> #2 Jai Ganesh Deva -> Classics -> Mantras)',
        phase2_afternoon: '08:00 AM – 06:00 PM: Calm Focus, 528 Hz Home Harmony & 417 Hz Space Cleansing + Hourly Bell',
        phase3_eveningSandhya: '06:00 PM – 07:30 PM: Clearing Negative Energy (Hanuman Chalisa + Maha Mrityunjaya + Shankh & Bell)',
        phase4_nightBedtime: '07:30 PM – 06:00 AM: 174 Hz Cellular Rest & 5-Track Deep Sleep Sanctuary (Zero 11 PM cutoff, infinite loop)'
      }
    });
  }

  const body = req.body || {};
  const request = body.request || {};
  const reqType = request.type;
  const intentName = request.intent?.name;

  const contextAudioPlayer = body.context?.AudioPlayer || {};
  const activeToken = request.token || contextAudioPlayer.token || '';

  console.log(`[ALEXA INBOUND] Type: ${reqType} | Intent: ${intentName || 'N/A'} | Token: ${activeToken}`);

  // 1. SILENT AUDIO EVENTS (Telemetry sent by Alexa; respond 200 OK without directives)
  if (reqType === 'AudioPlayer.PlaybackStarted' ||
      reqType === 'AudioPlayer.PlaybackFinished' ||
      reqType === 'AudioPlayer.PlaybackStopped') {
    return res.status(200).json({ version: '1.0', response: {} });
  }

  // 2. ERROR LOGGING & AUTOMATIC RESILIENCE RECOVERY
  if (reqType === 'AudioPlayer.PlaybackFailed') {
    console.error('[ALEXA PLAYBACK FAILED ERROR]:', JSON.stringify(request.error || {}));
    // Try to auto-recover by playing the next available track
    const { playlistName, index, counter } = parseToken(activeToken);
    const playlist = getPlaylistByName(playlistName);
    const fallbackIndex = (index + 1) % playlist.length;
    const fallbackTrack = playlist[fallbackIndex];
    const fallbackToken = buildToken(playlistName, fallbackIndex, counter + 1);
    const fallbackUrl = `${BASE_URL}/audio/${fallbackTrack.file}`;

    return res.status(200).json({
      version: '1.0',
      response: {
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'REPLACE_ALL',
            audioItem: {
              stream: {
                token: fallbackToken,
                url: fallbackUrl,
                offsetInMilliseconds: 0
              },
              metadata: {
                title: fallbackTrack.title,
                subtitle: `Single Hall Volume: ${fallbackTrack.volume}%`
              }
            }
          }
        ]
      }
    });
  }

  // 3. CONTINUOUS MULTI-TRACK QUEUEING (Near end of current song -> ENQUEUE next song)
  // Amazon ASK Requirement: expectedPreviousToken is MANDATORY for playBehavior: 'ENQUEUE'
  if (reqType === 'AudioPlayer.PlaybackNearlyFinished') {
    const { playlistName, index, counter } = parseToken(activeToken);
    const playlist = getPlaylistByName(playlistName);
    
    // Advance to next song (wrap seamlessly when list completes)
    const nextIndex = (index + 1) % playlist.length;
    const nextCounter = counter + 1;
    const nextTrack = playlist[nextIndex];
    const nextToken = buildToken(playlistName, nextIndex, nextCounter);
    const nextUrl = `${BASE_URL}/audio/${nextTrack.file}`;
    const previousToken = activeToken || buildToken(playlistName, index, counter);

    console.log(`[ALEXA QUEUING NEXT] Track ${nextIndex + 1}/${playlist.length}: ${nextTrack.title} -> Token: ${nextToken} | ExpectedPrev: ${previousToken}`);

    return res.status(200).json({
      version: '1.0',
      response: {
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'ENQUEUE',
            audioItem: {
              stream: {
                token: nextToken,
                url: nextUrl,
                offsetInMilliseconds: 0,
                expectedPreviousToken: previousToken
              },
              metadata: {
                title: nextTrack.title,
                subtitle: `Single Hall Volume: ${nextTrack.volume}%`
              }
            }
          }
        ]
      }
    });
  }

  // 4. PLAYBACK CONTROLLER EVENTS (Physical buttons on Echo Dot/Show or Alexa App screen)
  if (reqType === 'PlaybackController.NextCommandIssued') {
    const { playlistName, index, counter } = parseToken(activeToken);
    const playlist = getPlaylistByName(playlistName);
    const nextIndex = (index + 1) % playlist.length;
    const nextTrack = playlist[nextIndex];
    const nextToken = buildToken(playlistName, nextIndex, counter + 1);
    const nextUrl = `${BASE_URL}/audio/${nextTrack.file}`;

    return res.status(200).json({
      version: '1.0',
      response: {
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'REPLACE_ALL',
            audioItem: {
              stream: {
                token: nextToken,
                url: nextUrl,
                offsetInMilliseconds: 0
              },
              metadata: {
                title: nextTrack.title,
                subtitle: `Single Hall Volume: ${nextTrack.volume}%`
              }
            }
          }
        ]
      }
    });
  }

  if (reqType === 'PlaybackController.PreviousCommandIssued') {
    const { playlistName, index, counter } = parseToken(activeToken);
    const playlist = getPlaylistByName(playlistName);
    const prevIndex = (index - 1 + playlist.length) % playlist.length;
    const prevTrack = playlist[prevIndex];
    const prevToken = buildToken(playlistName, prevIndex, counter + 1);
    const prevUrl = `${BASE_URL}/audio/${prevTrack.file}`;

    return res.status(200).json({
      version: '1.0',
      response: {
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'REPLACE_ALL',
            audioItem: {
              stream: {
                token: prevToken,
                url: prevUrl,
                offsetInMilliseconds: 0
              },
              metadata: {
                title: prevTrack.title,
                subtitle: `Single Hall Volume: ${prevTrack.volume}%`
              }
            }
          }
        ]
      }
    });
  }

  // 5. VOICE INTENTS & ROUTINE LAUNCH
  if (reqType === 'LaunchRequest' || reqType === 'IntentRequest') {
    
    // Stop / Cancel / Pause
    if (intentName === 'AMAZON.PauseIntent' || intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
      return res.status(200).json({
        version: '1.0',
        response: {
          directives: [
            { type: 'AudioPlayer.ClearQueue', clearBehavior: 'CLEAR_ALL' },
            { type: 'AudioPlayer.Stop' }
          ],
          shouldEndSession: true
        }
      });
    }

    // Skip Next ("Alexa, next")
    if (intentName === 'AMAZON.NextIntent') {
      const { playlistName, index, counter } = parseToken(activeToken);
      const playlist = getPlaylistByName(playlistName);
      const nextIndex = (index + 1) % playlist.length;
      const nextTrack = playlist[nextIndex];
      const nextToken = buildToken(playlistName, nextIndex, counter + 1);
      const nextUrl = `${BASE_URL}/audio/${nextTrack.file}`;

      return res.status(200).json({
        version: '1.0',
        response: {
          directives: [
            {
              type: 'AudioPlayer.Play',
              playBehavior: 'REPLACE_ALL',
              audioItem: {
                stream: {
                  token: nextToken,
                  url: nextUrl,
                  offsetInMilliseconds: 0
                },
                metadata: {
                  title: nextTrack.title,
                  subtitle: `Single Hall Volume: ${nextTrack.volume}%`
                }
              }
            }
          ],
          shouldEndSession: true
        }
      });
    }

    // Previous Song ("Alexa, previous")
    if (intentName === 'AMAZON.PreviousIntent') {
      const { playlistName, index, counter } = parseToken(activeToken);
      const playlist = getPlaylistByName(playlistName);
      const prevIndex = (index - 1 + playlist.length) % playlist.length;
      const prevTrack = playlist[prevIndex];
      const prevToken = buildToken(playlistName, prevIndex, counter + 1);
      const prevUrl = `${BASE_URL}/audio/${prevTrack.file}`;

      return res.status(200).json({
        version: '1.0',
        response: {
          directives: [
            {
              type: 'AudioPlayer.Play',
              playBehavior: 'REPLACE_ALL',
              audioItem: {
                stream: {
                  token: prevToken,
                  url: prevUrl,
                  offsetInMilliseconds: 0
                },
                metadata: {
                  title: prevTrack.title,
                  subtitle: `Single Hall Volume: ${prevTrack.volume}%`
                }
              }
            }
          ],
          shouldEndSession: true
        }
      });
    }

    // Start Over
    if (intentName === 'AMAZON.StartOverIntent') {
      const { playlistName, index, counter } = parseToken(activeToken);
      const playlist = getPlaylistByName(playlistName);
      const track = playlist[index];
      const currentToken = buildToken(playlistName, index, counter + 1);
      const currentUrl = `${BASE_URL}/audio/${track.file}`;

      return res.status(200).json({
        version: '1.0',
        response: {
          directives: [
            {
              type: 'AudioPlayer.Play',
              playBehavior: 'REPLACE_ALL',
              audioItem: {
                stream: {
                  token: currentToken,
                  url: currentUrl,
                  offsetInMilliseconds: 0
                },
                metadata: {
                  title: track.title,
                  subtitle: `Single Hall Volume: ${track.volume}%`
                }
              }
            }
          ],
          shouldEndSession: true
        }
      });
    }

    // Resume
    if (intentName === 'AMAZON.ResumeIntent') {
      const { playlistName, index, counter } = parseToken(activeToken);
      const playlist = getPlaylistByName(playlistName);
      const track = playlist[index];
      const resumeToken = buildToken(playlistName, index, counter + 1);
      const resumeUrl = `${BASE_URL}/audio/${track.file}`;

      return res.status(200).json({
        version: '1.0',
        response: {
          directives: [
            {
              type: 'AudioPlayer.Play',
              playBehavior: 'REPLACE_ALL',
              audioItem: {
                stream: {
                  token: resumeToken,
                  url: resumeUrl,
                  offsetInMilliseconds: contextAudioPlayer.offsetInMilliseconds || 0
                },
                metadata: {
                  title: track.title,
                  subtitle: `Single Hall Volume: ${track.volume}%`
                }
              }
            }
          ],
          shouldEndSession: true
        }
      });
    }

    // Check if user requested a specific song or if it's default daily launch
    const requested = matchRequestedSong(request);

    let chosenPlaylist = currentPhase.playlistName;
    let chosenIndex = currentPhase.index;
    let chosenTrack = currentPhase.track;

    if (requested) {
      chosenPlaylist = requested.playlistName;
      chosenIndex = requested.index;
      chosenTrack = requested.track;
    }

    const startToken = buildToken(chosenPlaylist, chosenIndex, 1);
    const startUrl = `${BASE_URL}/audio/${chosenTrack.file}`;

    console.log(`[ALEXA STARTING PLAYBACK] Playlist: ${chosenPlaylist} | Track: ${chosenTrack.title} | Token: ${startToken}`);

    // Direct playback with ZERO robotic English speaking
    return res.status(200).json({
      version: '1.0',
      response: {
        card: {
          type: 'Simple',
          title: `CalmNature: ${chosenTrack.title}`,
          content: `Playing track ${chosenIndex + 1}: ${chosenTrack.title}`
        },
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'REPLACE_ALL',
            audioItem: {
              stream: {
                token: startToken,
                url: startUrl,
                offsetInMilliseconds: 0
              },
              metadata: {
                title: chosenTrack.title,
                subtitle: `Single Hall Volume: ${chosenTrack.volume}%`
              }
            }
          }
        ],
        shouldEndSession: true
      }
    });
  }

  return res.status(200).json({ version: '1.0', response: { shouldEndSession: true } });
}
