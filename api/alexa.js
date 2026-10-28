// =====================================================================
// 🎙️ CalmNature — Year 2000 Golden Devotional Songs & Sanctuary API
// Built for Single Hall Living Room + Alexa Echo
// Continuous Multi-Track AudioPlayer Engine
// =====================================================================

// --- 1. MASTER PLAYLIST DEFINITIONS ---

export const MORNING_PLAYLIST = [
  {
    id: 'suprabhatam',
    title: 'Sri Venkateswara Suprabhatam (M. S. Subbulakshmi)',
    file: 'devotional/suprabhatam.mp3',
    volume: 40,
    speech: 'Good morning! Starting M. S. Subbulakshmi’s legendary Sri Venkateswara Suprabhatam, your first morning awakening puja.'
  },
  {
    id: 'jai_ganesh_deva',
    title: 'Jai Ganesh Deva (Anuradha Paudwal)',
    file: 'devotional/jai-ganesh-deva.mp3',
    volume: 40,
    speech: 'Playing Jai Ganesh Deva Aarti by Anuradha Paudwal. Ganpati Bappa Morya.'
  },
  {
    id: 'manasa_smarami',
    title: 'Sri Venkatesam Manasa Smarami (Year 2000 Master)',
    file: 'devotional/sri-venkatesam-manasa-smarami.mp3',
    volume: 40,
    speech: 'Starting Sri Venkatesam Manasa Smarami, Sri Srinivasam Sritha Parijatham. Have a blessed and auspicious day.'
  },
  {
    id: 'hanuman_chalisa',
    title: 'Shree Hanuman Chalisa (Hariharan)',
    file: 'devotional/hanuman-chalisa-hariharan.mp3',
    volume: 40,
    speech: 'Starting Shree Hanuman Chalisa sung by Hariharan. Jai Bajrangbali.'
  },
  {
    id: 'om_jai_jagdish_hare',
    title: 'Om Jai Jagdish Hare (Anuradha Paudwal)',
    file: 'devotional/om-jai-jagdish-hare.mp3',
    volume: 40,
    speech: 'Playing Om Jai Jagdish Hare Aarti by Anuradha Paudwal.'
  },
  {
    id: 'vishnu_sahasranamam',
    title: 'Vishnu Sahasranamam (M. S. Subbulakshmi)',
    file: 'devotional/vishnu-sahasranamam.mp3',
    volume: 40,
    speech: 'Starting Vishnu Sahasranamam sung by M. S. Subbulakshmi. An ancient shield of divine positivity and protection.'
  },
  {
    id: 'brahmam_okate',
    title: 'Brahmam Okate (Thandanana)',
    file: 'devotional/brahmam-okate.mp3',
    volume: 40,
    speech: 'Playing Brahmam Okate Parabrahmam Okate.'
  },
  {
    id: 'muddugare_yashoda',
    title: 'Muddugare Yashoda',
    file: 'devotional/muddugare-yashoda.mp3',
    volume: 40,
    speech: 'Playing Muddugare Yashoda.'
  },
  {
    id: 'kondalalo_nelakonna',
    title: 'Kondalalo Nelakonna',
    file: 'devotional/kondalalo-nelakonna.mp3',
    volume: 40,
    speech: 'Playing Kondalalo Nelakonna Koneti Rayadu.'
  },
  {
    id: 'adivo_alladivo',
    title: 'Adivo Alladivo',
    file: 'devotional/adivo-alladivo.mp3',
    volume: 40,
    speech: 'Playing Adivo Alladivo Sri Hari Vasamu.'
  },
  {
    id: 'sreemannarayana',
    title: 'Sriman Narayana',
    file: 'devotional/sreemannarayana.mp3',
    volume: 40,
    speech: 'Playing Sriman Narayana Sriman Narayana.'
  },
  {
    id: 'shiva_tandava',
    title: 'Shiva Tandava Stotram (Most Powerful Shiva Mantra)',
    file: 'devotional/shiva-tandava-stotram.mp3',
    volume: 40,
    speech: 'Starting the supreme Shiva chant: Shiva Tandava Stotram. Invoking immense positive strength and divine courage.'
  },
  {
    id: 'maha_mrityunjaya',
    title: 'Maha Mrityunjaya Mantra 108 Times (Suresh Wadkar & Anuradha Paudwal)',
    file: 'devotional/maha-mrityunjaya-mantra-108.mp3',
    volume: 40,
    speech: 'Starting Maha Mrityunjaya Mantra 108 Repetitions. The ultimate healing and protective chant.'
  },
  {
    id: 'gayatri_mantra_108',
    title: 'Gayatri Mantra 108 Times (Anuradha Paudwal)',
    file: 'devotional/gayatri-mantra-108.mp3',
    volume: 40,
    speech: 'Starting Gayatri Mantra 108 Times for supreme mental clarity and peace.'
  },
  {
    id: 'shankh_naad',
    title: 'Sacred Shankh Naad & Temple Bells',
    file: 'devotional/shankh-and-temple-bell.mp3',
    volume: 45,
    speech: 'Blowing the sacred Shankh conch with resonant temple bells to reset room energy.'
  }
];

export const AFTERNOON_PLAYLIST = [
  {
    id: 'home_cleanse_528',
    title: '528 Hz Home Harmony & Positive Vibe',
    file: 'healing/528hz-home-cleanse.mp3',
    volume: 30,
    speech: 'Playing 528 Hz transformation frequency to bring harmony and positive vibe into your home.'
  },
  {
    id: 'space_cleanse_417',
    title: '417 Hz Negative Energy Dissolver & Space Cleanser',
    file: 'healing/417hz-negative-energy-cleanse.mp3',
    volume: 30,
    speech: 'Starting 417 Hz Solfeggio frequency to clear heavy stagnant atmospheres in your home.'
  },
  {
    id: 'om_chanting_432',
    title: '432 Hz Sacred OM Chanting for Deep Peace',
    file: 'healing/432hz-om-chanting.mp3',
    volume: 30,
    speech: 'Starting 432 Hz deep peace OM chanting for mental tranquility.'
  },
  {
    id: 'tibetan_bowls',
    title: 'Tibetan Singing Bowls Sound Bath',
    file: 'healing/tibetan-singing-bowls.mp3',
    volume: 30,
    speech: 'Playing Tibetan Singing Bowls sound bath for cellular relaxation.'
  }
];

export const EVENING_PLAYLIST = [
  {
    id: 'hanuman_chalisa',
    title: 'Shree Hanuman Chalisa (Hariharan)',
    file: 'devotional/hanuman-chalisa-hariharan.mp3',
    volume: 40,
    speech: 'Good evening! Starting your Evening Sandhya space clearing with Shree Hanuman Chalisa.'
  },
  {
    id: 'maha_mrityunjaya',
    title: 'Maha Mrityunjaya Mantra 108 Times',
    file: 'devotional/maha-mrityunjaya-mantra-108.mp3',
    volume: 40,
    speech: 'Continuing Evening Sandhya with Maha Mrityunjaya Mantra 108 Times for deep healing.'
  },
  {
    id: 'shankh_naad',
    title: 'Sacred Shankh Naad & Temple Bells',
    file: 'devotional/shankh-and-temple-bell.mp3',
    volume: 45,
    speech: 'Resounding the sacred Shankh and temple bells to dissolve twilight negative energy.'
  }
];

export const NIGHT_PLAYLIST = [
  {
    id: 'pain_relief_174',
    title: '174 Hz Mom Pain Relief & Deep Rest',
    file: 'healing/174hz-pain-relief.mp3',
    volume: 25,
    speech: "Starting 174 Hz continuous healing frequency for your mother's leg comfort and deep restorative sleep. Good night."
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

// Parse custom token: calmnature:playlistName:index:counter
function parseToken(tokenStr) {
  if (!tokenStr || typeof tokenStr !== 'string') {
    return { playlistName: 'morning', index: 0, counter: 1 };
  }
  const parts = tokenStr.split(':');
  if (parts.length >= 4) {
    return {
      playlistName: parts[1] || 'morning',
      index: parseInt(parts[2] || '0', 10),
      counter: parseInt(parts[3] || '1', 10)
    };
  }
  return { playlistName: 'morning', index: 0, counter: 1 };
}

function buildToken(playlistName, index, counter) {
  return `calmnature:${playlistName}:${index}:${counter}`;
}

// Match direct voice query to song & index
function matchRequestedSong(request) {
  const slots = request.intent?.slots || {};
  let query = '';
  for (const k in slots) {
    if (slots[k]?.value) query += ' ' + slots[k].value.toLowerCase();
  }
  const intentName = (request.intent?.name || '').toLowerCase();
  const text = (query + ' ' + intentName).toLowerCase();

  // Check morning playlist items
  for (let i = 0; i < MORNING_PLAYLIST.length; i++) {
    const item = MORNING_PLAYLIST[i];
    if (item.id === 'suprabhatam' && (text.includes('suprabhatam') || text.includes('subbulakshmi') || text.includes('first song') || text.includes('1st song') || text.includes('balaji'))) {
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
    if (item.id === 'maha_mrityunjaya' && (text.includes('mrityunjaya') || text.includes('mrutyunjaya') || text.includes('tryambakam') || text.includes('protective mantra') || text.includes('healing mantra') || text.includes('fear protection'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'vishnu_sahasranamam' && (text.includes('sahasranamam') || text.includes('vishnu sahasra') || text.includes('ancient shield'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'hanuman_chalisa' && (text.includes('hanuman') || text.includes('chalisa') || text.includes('hariharan') || text.includes('bajrangbali'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'om_jai_jagdish_hare' && (text.includes('jagdish') || text.includes('om jai jagdish') || text.includes('vishnu aarti'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'gayatri_mantra_108' && (text.includes('gayatri') || text.includes('gayatri mantra'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'shankh_naad' && (text.includes('shankh') || text.includes('conch') || text.includes('shankha') || text.includes('blow shankh') || text.includes('space clearing'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'brahmam_okate' && (text.includes('brahmam') || text.includes('thandanana'))) {
      return { playlistName: 'morning', index: i, track: item };
    }
    if (item.id === 'muddugare_yashoda' && (text.includes('muddugare') || text.includes('yashoda') || text.includes('krishna song'))) {
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
  if (text.includes('174') || text.includes('pain') || text.includes('leg') || text.includes('mom') || text.includes('mother') || text.includes('relief') || text.includes('deep rest') || text.includes('sleep') || text.includes('night') || text.includes('bedtime') || text.includes('flute')) {
    return { playlistName: 'night', index: 0, track: NIGHT_PLAYLIST[0] };
  }

  if (text.includes('417') || text.includes('dissolve blockage') || text.includes('negative energy dissolver')) {
    return { playlistName: 'afternoon', index: 1, track: AFTERNOON_PLAYLIST[1] };
  }

  if (text.includes('528') || text.includes('positive energy') || text.includes('positive vibe') || text.includes('harmony')) {
    return { playlistName: 'afternoon', index: 0, track: AFTERNOON_PLAYLIST[0] };
  }

  if (text.includes('432') || text.includes('om chant') || text.includes('chanting')) {
    return { playlistName: 'afternoon', index: 2, track: AFTERNOON_PLAYLIST[2] };
  }

  if (text.includes('bowl') || text.includes('tibetan') || text.includes('sound bath')) {
    return { playlistName: 'afternoon', index: 3, track: AFTERNOON_PLAYLIST[3] };
  }

  if (text.includes('evening') || text.includes('sandhya') || text.includes('pooja') || text.includes('aarti')) {
    return { playlistName: 'evening', index: 0, track: EVENING_PLAYLIST[0] };
  }

  if (text.includes('2000') || text.includes('90') || text.includes('devotion') || text.includes('god song') || text.includes('bhajan') || text.includes('morning song') || text.includes('morning list')) {
    return { playlistName: 'morning', index: 0, track: MORNING_PLAYLIST[0] };
  }

  return null;
}

// 4-Phase Daily Rhythm selection
function getCurrentPhaseInfo(offsetHours = 5.5) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const targetTime = new Date(utc + (3600000 * offsetHours));
  
  const hour = targetTime.getHours();
  const minute = targetTime.getMinutes();
  const timeVal = hour + minute / 60.0;

  // Phase 1: Morning (6:00 AM – 8:00 AM)
  if (timeVal >= 6.0 && timeVal < 8.0) {
    return {
      phase: 'morning_awakening',
      playlistName: 'morning',
      index: 0,
      track: MORNING_PLAYLIST[0],
      speech: 'Good morning! Starting your 6:00 AM morning awakening with M. S. Subbulakshmi’s Sri Venkateswara Suprabhatam, followed seamlessly by Jai Ganesh Deva, your devotional classics, and sacred closing mantras. Have a blessed and auspicious day.'
    };
  // Phase 2: Daytime / Afternoon (8:00 AM – 6:00 PM)
  } else if (timeVal >= 8.0 && timeVal < 18.0) {
    return {
      phase: 'afternoon_calm',
      playlistName: 'afternoon',
      index: 0,
      track: AFTERNOON_PLAYLIST[0],
      speech: 'Starting your Daytime Calm Focus and 528 Hz Home Harmony soundscape. Hourly bronze temple bell chimes will ring every hour on the hour to reset positive energy.'
    };
  // Phase 3: Evening Sandhya (6:00 PM – 7:30 PM)
  } else if (timeVal >= 18.0 && timeVal < 19.5) {
    return {
      phase: 'evening_sandhya',
      playlistName: 'evening',
      index: 0,
      track: EVENING_PLAYLIST[0],
      speech: 'Good evening! Starting your Evening Sandhya space clearing with Shree Hanuman Chalisa and sacred temple bells to clear twilight negative energy and bring divine peace into your home.'
    };
  // Phase 4: Night / Bedtime (7:30 PM – 11:00 PM)
  } else if (timeVal >= 19.5 && timeVal < 23.0) {
    return {
      phase: 'night_healing_sleep',
      playlistName: 'night',
      index: 0,
      track: NIGHT_PLAYLIST[0],
      speech: "Starting 174 Hz continuous healing frequency for your mother's leg comfort and deep restorative sleep. Good night."
    };
  // Late Night: 11:00 PM to 6:00 AM -> Quiet Rest / Sleep Mode
  } else {
    return {
      phase: 'sleep_mode',
      playlistName: 'sleep',
      index: 0,
      track: null,
      speech: 'Calm Nature is in quiet sleep mode for deep rest until 6:00 AM. Good night.'
    };
  }
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const tzOffset = req.query?.tz ? parseFloat(req.query.tz) : 5.5;

  const currentPhase = getCurrentPhaseInfo(tzOffset);
  const audioUrl = currentPhase.track ? `${proto}://${host}/audio/${currentPhase.track.file}` : null;
  const bellUrl = `${proto}://${host}/audio/temple-bell-hourly.mp3`;

  // Status / Health check
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      system: 'CalmNature Sanctuary & Alexa Continuous Multi-Track Audio Engine',
      currentPhase,
      streamUrl: audioUrl,
      hourlyChimeUrl: bellUrl,
      morningTracksTotal: MORNING_PLAYLIST.length,
      orderedMorningPlaylist: MORNING_PLAYLIST.map((t, idx) => `${idx + 1}. ${t.title}`),
      dailyRhythm: {
        phase1_morning: '06:00 AM – 08:00 AM: Continuous Morning Devotional & Mantras (#1 Suprabhatam -> #2 Jai Ganesh Deva -> Classics -> Mantras last)',
        phase2_afternoon: '08:00 AM – 06:00 PM: Calm Focus, 528 Hz Home Harmony & 417 Hz Space Cleansing + Hourly Bell',
        phase3_eveningSandhya: '06:00 PM – 07:30 PM: Clearing Negative Energy (Hanuman Chalisa + Maha Mrityunjaya + Shankh & Bell)',
        phase4_nightBedtime: '07:30 PM – 11:00 PM: Mom Pain Relief & Deep Sleep (174 Hz Continuous Seamless Loop)',
        lateNight_sleep: '11:00 PM – 06:00 AM: Quiet Sleep Mode (Auto-Off)'
      }
    });
  }

  const body = req.body || {};
  const request = body.request || {};
  const reqType = request.type;
  const intentName = request.intent?.name;

  // Active audio player token from context or request
  const contextAudioPlayer = body.context?.AudioPlayer || {};
  const activeToken = request.token || contextAudioPlayer.token || '';

  // 1. SILENT AUDIO EVENTS (Echo sends these as telemetry; Alexa requires 200 OK without speech)
  if (reqType === 'AudioPlayer.PlaybackStarted' ||
      reqType === 'AudioPlayer.PlaybackFinished' ||
      reqType === 'AudioPlayer.PlaybackStopped' ||
      reqType === 'AudioPlayer.PlaybackFailed') {
    return res.status(200).json({
      version: '1.0',
      response: {}
    });
  }

  // 2. CONTINUOUS PLAYBACK QUEUEING (Near end of current track -> Pre-queue next track)
  if (reqType === 'AudioPlayer.PlaybackNearlyFinished') {
    const { playlistName, index, counter } = parseToken(request.token);
    const playlist = getPlaylistByName(playlistName);
    
    // Advance to next track (loop back seamlessly when finished)
    const nextIndex = (index + 1) % playlist.length;
    const nextCounter = counter + 1;
    const nextTrack = playlist[nextIndex];
    const nextToken = buildToken(playlistName, nextIndex, nextCounter);
    const nextUrl = `${proto}://${host}/audio/${nextTrack.file}`;

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
                expectedPreviousToken: request.token
              },
              metadata: {
                title: nextTrack.title,
                subtitle: `Single Hall Volume: ${nextTrack.volume}%`,
                art: { sources: [{ url: `${proto}://${host}/favicon.ico` }] }
              }
            }
          }
        ]
      }
    });
  }

  // 3. VOICE INTENTS & LAUNCH
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

    // Next Track ("Alexa, next" / "Alexa, skip")
    if (intentName === 'AMAZON.NextIntent') {
      const { playlistName, index, counter } = parseToken(activeToken);
      const playlist = getPlaylistByName(playlistName);
      const nextIndex = (index + 1) % playlist.length;
      const nextTrack = playlist[nextIndex];
      const nextToken = buildToken(playlistName, nextIndex, counter + 1);
      const nextUrl = `${proto}://${host}/audio/${nextTrack.file}`;

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
                  subtitle: `Single Hall Volume: ${nextTrack.volume}%`,
                  art: { sources: [{ url: `${proto}://${host}/favicon.ico` }] }
                }
              }
            }
          ],
          shouldEndSession: true
        }
      });
    }

    // Previous Track ("Alexa, previous")
    if (intentName === 'AMAZON.PreviousIntent') {
      const { playlistName, index, counter } = parseToken(activeToken);
      const playlist = getPlaylistByName(playlistName);
      const prevIndex = (index - 1 + playlist.length) % playlist.length;
      const prevTrack = playlist[prevIndex];
      const prevToken = buildToken(playlistName, prevIndex, counter + 1);
      const prevUrl = `${proto}://${host}/audio/${prevTrack.file}`;

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
                  subtitle: `Single Hall Volume: ${prevTrack.volume}%`,
                  art: { sources: [{ url: `${proto}://${host}/favicon.ico` }] }
                }
              }
            }
          ],
          shouldEndSession: true
        }
      });
    }

    // Resume / Start Over
    if (intentName === 'AMAZON.StartOverIntent') {
      const { playlistName, index, counter } = parseToken(activeToken);
      const playlist = getPlaylistByName(playlistName);
      const track = playlist[index];
      const currentToken = buildToken(playlistName, index, counter + 1);
      const currentUrl = `${proto}://${host}/audio/${track.file}`;

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
                  subtitle: `Single Hall Volume: ${track.volume}%`,
                  art: { sources: [{ url: `${proto}://${host}/favicon.ico` }] }
                }
              }
            }
          ],
          shouldEndSession: true
        }
      });
    }

    if (intentName === 'AMAZON.ResumeIntent') {
      const { playlistName, index, counter } = parseToken(activeToken);
      const playlist = getPlaylistByName(playlistName);
      const track = playlist[index];
      const resumeToken = buildToken(playlistName, index, counter + 1);
      const resumeUrl = `${proto}://${host}/audio/${track.file}`;

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
                  subtitle: `Single Hall Volume: ${track.volume}%`,
                  art: { sources: [{ url: `${proto}://${host}/favicon.ico` }] }
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

    let chosenPlaylist = 'morning';
    let chosenIndex = 0;
    let chosenTrack = MORNING_PLAYLIST[0];
    let spokenIntro = currentPhase.speech;

    if (requested) {
      chosenPlaylist = requested.playlistName;
      chosenIndex = requested.index;
      chosenTrack = requested.track;
      spokenIntro = requested.track.speech;
    } else {
      if (currentPhase.phase === 'sleep_mode') {
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
      chosenPlaylist = currentPhase.playlistName;
      chosenIndex = currentPhase.index;
      chosenTrack = currentPhase.track;
      spokenIntro = null;
    }

    const startToken = buildToken(chosenPlaylist, chosenIndex, 1);
    const startUrl = `${proto}://${host}/audio/${chosenTrack.file}`;

    const responseObj = {
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
              subtitle: `Single Hall Volume: ${chosenTrack.volume}%`,
              art: { sources: [{ url: `${proto}://${host}/favicon.ico` }] }
            }
          }
        }
      ],
      shouldEndSession: true
    };

    // Only include speech if a specific song was verbally requested by name
    if (requested && requested.track.speech) {
      responseObj.outputSpeech = { type: 'PlainText', text: requested.track.speech };
    }

    return res.status(200).json({
      version: '1.0',
      response: responseObj
    });
  }

  return res.status(200).json({ version: '1.0', response: { shouldEndSession: true } });
}
