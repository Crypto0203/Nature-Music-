// =====================================================================
// 🎙️ CalmNature — Year 2000 Golden Devotional Songs & Sanctuary API
// Built for Single Hall Living Room + Alexa Echo
// Morning List: Sri Venkatesam Manasa Smarami, Hanuman Chalisa,
//               Jai Ganesh Deva, Gayatri Mantra 108, Om Jai Jagdish Hare,
//               Subah Subah Le Shiv Ka Naam, Govinda Govinda, Suprabhatam
// Daytime & Healing: 174 Hz Pain Relief (Mom's Leg Relief),
//                    528 Hz Home Cleanse, 432 Hz OM Chanting,
//                    Tibetan Singing Bowls + Hourly Temple Bell
// =====================================================================

function getRequestedSong(request) {
  const slots = request.intent?.slots || {};
  let query = '';
  for (const k in slots) {
    if (slots[k]?.value) query += ' ' + slots[k].value.toLowerCase();
  }
  const intentName = (request.intent?.name || '').toLowerCase();
  const text = (query + ' ' + intentName).toLowerCase();

  // --- MOM'S LEG PAIN RELIEF & 174 HZ ---
  if (text.includes('174') || text.includes('pain') || text.includes('leg') || text.includes('mom') || text.includes('mother') || text.includes('healing') || text.includes('muscle') || text.includes('relief')) {
    return {
      phase: 'pain_relief_174',
      title: '174 Hz Deep Pain Relief & Muscle Relaxation',
      file: 'healing/174hz-pain-relief.mp3',
      speech: "Starting 174 Hz Solfeggio frequency for your mother's comfort and deep leg muscle pain relief. Please keep the volume gentle and place one or two soft pillows under her calves for best relief.",
      volume: 35
    };
  }

  // --- 528 HZ HOME CLEANSE & POSITIVE ENERGY ---
  if (text.includes('528') || text.includes('cleanse') || text.includes('negative') || text.includes('vibe') || text.includes('clean')) {
    return {
      phase: 'home_cleanse_528',
      title: '528 Hz Negative Energy Cleansing & Home Transformation',
      file: 'healing/528hz-home-cleanse.mp3',
      speech: 'Playing 528 Hz transformation frequency to cleanse and uplift your home with pure positive energy.',
      volume: 35
    };
  }

  // --- 432 HZ OM CHANTING ---
  if (text.includes('432') || text.includes('om chant') || text.includes('chanting') || text.includes('om mantra')) {
    return {
      phase: 'om_chanting_432',
      title: '432 Hz Sacred OM Chanting for Deep Peace',
      file: 'healing/432hz-om-chanting.mp3',
      speech: 'Starting 432 Hz deep peace OM chanting for mental tranquility and harmony.',
      volume: 35
    };
  }

  // --- TIBETAN SINGING BOWLS ---
  if (text.includes('bowl') || text.includes('tibetan') || text.includes('sound bath')) {
    return {
      phase: 'tibetan_bowls',
      title: 'Tibetan Singing Bowls Sound Bath',
      file: 'healing/tibetan-singing-bowls.mp3',
      speech: 'Playing Tibetan Singing Bowls sound bath for cellular relaxation and peace.',
      volume: 35
    };
  }

  // --- JIOSAAVN TOP DEVOTIONAL MORNING SONGS ---
  if (text.includes('hanuman') || text.includes('chalisa') || text.includes('hariharan') || text.includes('bajrangbali')) {
    return {
      phase: 'hanuman_chalisa',
      title: 'Shree Hanuman Chalisa (Hariharan)',
      file: 'devotional/hanuman-chalisa-hariharan.mp3',
      speech: 'Starting Shree Hanuman Chalisa sung by Hariharan. Jai Bajrangbali.',
      volume: 40
    };
  }

  if (text.includes('ganesh') || text.includes('ganpati') || text.includes('jai ganesh')) {
    return {
      phase: 'jai_ganesh_deva',
      title: 'Jai Ganesh Deva (Anuradha Paudwal)',
      file: 'devotional/jai-ganesh-deva.mp3',
      speech: 'Playing Jai Ganesh Deva Aarti by Anuradha Paudwal. Ganpati Bappa Morya.',
      volume: 40
    };
  }

  if (text.includes('gayatri') || text.includes('108') || text.includes('gayatri mantra')) {
    return {
      phase: 'gayatri_mantra_108',
      title: 'Gayatri Mantra 108 Times (Anuradha Paudwal)',
      file: 'devotional/gayatri-mantra-108.mp3',
      speech: 'Starting Gayatri Mantra 108 Times for supreme mental clarity and peace.',
      volume: 40
    };
  }

  if (text.includes('jagdish') || text.includes('om jai jagdish') || text.includes('vishnu aarti')) {
    return {
      phase: 'om_jai_jagdish_hare',
      title: 'Om Jai Jagdish Hare (Anuradha Paudwal)',
      file: 'devotional/om-jai-jagdish-hare.mp3',
      speech: 'Playing Om Jai Jagdish Hare Aarti by Anuradha Paudwal.',
      volume: 40
    };
  }

  if (text.includes('subah') || text.includes('shiv') || text.includes('bholenath') || text.includes('shiva')) {
    return {
      phase: 'subah_subah_le_shiv',
      title: 'Subah Subah Le Shiv Ka Naam (Hariharan)',
      file: 'devotional/subah-subah-le-shiv-ka-naam.mp3',
      speech: 'Playing Subah Subah Le Shiv Ka Naam by Hariharan. Har Har Mahadev.',
      volume: 40
    };
  }

  // --- YEAR 2000 GOLDEN TELUGU DEVOTIONAL HITS ---
  if (text.includes('smarami') || text.includes('manasa') || text.includes('venkatesam') || text.includes('srinivasam')) {
    return {
      phase: 'manasa_smarami',
      title: 'Sri Venkatesam Manasa Smarami',
      file: 'devotional/sri-venkatesam-manasa-smarami.mp3',
      speech: 'Starting Sri Venkatesam Manasa Smarami, Sri Srinivasam Sritha Parijatham. Have a blessed and auspicious day.',
      volume: 40
    };
  }

  if (text.includes('koluvare') || text.includes('govinda govinda')) {
    return {
      phase: 'govinda_koluvare',
      title: 'Govinda Govinda Yani Koluvare',
      file: 'devotional/govinda-govinda-yani-koluvare.mp3',
      speech: 'Playing Govinda Govinda Yani Koluvare, Annamacharya Sankeertana.',
      volume: 40
    };
  }

  if (text.includes('suprabhatam') || text.includes('subbulakshmi') || text.includes('balaji')) {
    return {
      phase: 'suprabhatam',
      title: 'Sri Venkateswara Suprabhatam',
      file: 'devotional/suprabhatam.mp3',
      speech: 'Good morning! Starting M.S. Subbulakshmi’s legendary Sri Venkateswara Suprabhatam.',
      volume: 40
    };
  }

  if (text.includes('brahmam') || text.includes('thandanana')) {
    return {
      phase: 'brahmam_okate',
      title: 'Brahmam Okate (Thandanana)',
      file: 'devotional/brahmam-okate.mp3',
      speech: 'Playing Brahmam Okate Parabrahmam Okate.',
      volume: 40
    };
  }

  if (text.includes('muddugare') || text.includes('yashoda') || text.includes('krishna song')) {
    return {
      phase: 'muddugare_yashoda',
      title: 'Muddugare Yashoda',
      file: 'devotional/muddugare-yashoda.mp3',
      speech: 'Playing Muddugare Yashoda.',
      volume: 40
    };
  }

  if (text.includes('kondalalo') || text.includes('koneti')) {
    return {
      phase: 'kondalalo_nelakonna',
      title: 'Kondalalo Nelakonna',
      file: 'devotional/kondalalo-nelakonna.mp3',
      speech: 'Playing Kondalalo Nelakonna Koneti Rayadu.',
      volume: 40
    };
  }

  if (text.includes('adivo') || text.includes('alladivo')) {
    return {
      phase: 'adivo_alladivo',
      title: 'Adivo Alladivo',
      file: 'devotional/adivo-alladivo.mp3',
      speech: 'Playing Adivo Alladivo Sri Hari Vasamu.',
      volume: 40
    };
  }

  if (text.includes('narayana') || text.includes('sreemannarayana')) {
    return {
      phase: 'sreemannarayana',
      title: 'Sriman Narayana',
      file: 'devotional/sreemannarayana.mp3',
      speech: 'Playing Sriman Narayana Sriman Narayana.',
      volume: 40
    };
  }

  // --- GENERAL COMMANDS ---
  if (text.includes('2000') || text.includes('90') || text.includes('devotion') || text.includes('god song') || text.includes('bhajan') || text.includes('morning song') || text.includes('morning list')) {
    return {
      phase: 'manasa_smarami',
      title: 'Sri Venkatesam Manasa Smarami',
      file: 'devotional/sri-venkatesam-manasa-smarami.mp3',
      speech: 'Playing your golden morning devotional song: Sri Venkatesam Manasa Smarami.',
      volume: 40
    };
  }

  if (text.includes('bell') || text.includes('chime') || text.includes('temple')) {
    return {
      phase: 'temple_bell',
      title: 'Sacred Bronze Temple Bell',
      file: 'temple-bell-hourly.mp3',
      speech: 'Ringing the sacred bronze temple bell to bless your home.',
      volume: 40
    };
  }

  if (text.includes('evening') || text.includes('sandhya') || text.includes('pooja') || text.includes('aarti')) {
    return {
      phase: 'evening_sandhya',
      title: 'Evening Sandhya Pooja Devotion',
      file: 'evening-sandhya.mp3',
      speech: 'Playing your Evening Sandhya Pooja devotional melodies.',
      volume: 35
    };
  }

  if (text.includes('flute') || text.includes('sleep') || text.includes('night')) {
    return {
      phase: 'night_flute',
      title: 'Night Peace & Krishna Bansuri Flute',
      file: 'night-sleep-flute.mp3',
      speech: 'Starting your calming Krishna Bansuri flute for peaceful rest.',
      volume: 20
    };
  }

  return null;
}

function getCurrentPhase(offsetHours = 5.5) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const targetTime = new Date(utc + (3600000 * offsetHours));
  
  const hour = targetTime.getHours();
  const minute = targetTime.getMinutes();
  const timeVal = hour + minute / 60.0;

  // 6:00 AM to 10:00 AM -> Morning Devotional Songs (Sri Venkatesam Manasa Smarami)
  if (timeVal >= 6.0 && timeVal < 10.0) {
    return {
      phase: 'morning_devotional',
      title: 'Sri Venkatesam Manasa Smarami',
      file: 'devotional/sri-venkatesam-manasa-smarami.mp3',
      speech: 'Good morning! Starting Sri Venkatesam Manasa Smarami and your morning devotional songs. Have a blessed and prosperous day.',
      volume: 40
    };
  // 10:00 AM to 6:00 PM -> Daytime Healing & Pain Relief (174 Hz / 528 Hz) + Hourly Bell
  } else if (timeVal >= 10.0 && timeVal < 18.0) {
    return {
      phase: 'daytime_healing',
      title: 'Daytime 174 Hz Healing & 528 Hz Home Positive Energy',
      file: 'healing/174hz-pain-relief.mp3',
      speech: "Good day! Starting 174 Hz deep muscle pain relief and 528 Hz positive home cleanse. Hourly temple bells will ring every hour.",
      volume: 35
    };
  // 6:00 PM to 7:30 PM -> Evening Sandhya Pooja
  } else if (timeVal >= 18.0 && timeVal < 19.5) {
    return {
      phase: 'evening_sandhya',
      title: 'Evening Sandhya Pooja Devotion',
      file: 'evening-sandhya.mp3',
      speech: 'Good evening! Starting your Sandhya Deepam pooja devotional melodies.',
      volume: 35
    };
  // 7:30 PM to 11:00 PM -> Night Peace Krishna Flute & 528 Hz
  } else if (timeVal >= 19.5 && timeVal < 23.0) {
    return {
      phase: 'night_flute',
      title: 'Night Peace & Krishna Bansuri Flute',
      file: 'night-sleep-flute.mp3',
      speech: 'Starting your calming night bansuri flute and 528 Hz healing frequencies for peaceful sleep.',
      volume: 20
    };
  // 11:00 PM to 6:00 AM -> Quiet Rest / Sleep Mode
  } else {
    return {
      phase: 'sleep_mode',
      title: 'Quiet Rest & Sleep Mode',
      file: null,
      speech: 'Calm Nature is in quiet sleep mode for deep rest until 6:00 AM. Good night.',
      volume: 0
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
  const current = getCurrentPhase(tzOffset);
  const audioUrl = current.file ? `${proto}://${host}/audio/${current.file}` : null;
  const bellUrl = `${proto}://${host}/audio/temple-bell-hourly.mp3`;

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      system: 'CalmNature Sanctuary & Alexa Audio Engine',
      currentPhase: current,
      streamUrl: audioUrl,
      hourlyChimeUrl: bellUrl,
      flagshipSong: 'Sri Venkatesam Manasa Smarami',
      momPainReliefTrack: '174 Hz Deep Pain Relief & Muscle Relaxation',
      jiosaavnTracks: [
        'Shree Hanuman Chalisa (Hariharan)',
        'Jai Ganesh Deva (Anuradha Paudwal)',
        'Gayatri Mantra 108 Times',
        'Om Jai Jagdish Hare',
        'Subah Subah Le Shiv Ka Naam'
      ]
    });
  }

  const body = req.body || {};
  const request = body.request || {};
  const reqType = request.type;
  const intentName = request.intent?.name;

  const requested = getRequestedSong(request);
  const activeSelection = requested || current;
  const activeUrl = activeSelection.file ? `${proto}://${host}/audio/${activeSelection.file}` : audioUrl;

  if (!requested && activeSelection.phase === 'sleep_mode') {
    return res.status(200).json({
      version: '1.0',
      response: {
        outputSpeech: { type: 'PlainText', text: activeSelection.speech },
        directives: [
          { type: 'AudioPlayer.ClearQueue', clearBehavior: 'CLEAR_ALL' },
          { type: 'AudioPlayer.Stop' }
        ],
        shouldEndSession: true
      }
    });
  }

  if (reqType === 'LaunchRequest' || reqType === 'IntentRequest') {
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

    if (intentName === 'AMAZON.ResumeIntent') {
      return res.status(200).json({
        version: '1.0',
        response: {
          directives: [
            {
              type: 'AudioPlayer.Play',
              playBehavior: 'REPLACE_ALL',
              audioItem: {
                stream: {
                  token: `calmnature-${activeSelection.phase}`,
                  url: activeUrl,
                  offsetInMilliseconds: request.offsetInMilliseconds || 0
                }
              }
            }
          ],
          shouldEndSession: true
        }
      });
    }

    return res.status(200).json({
      version: '1.0',
      response: {
        outputSpeech: { type: 'PlainText', text: activeSelection.speech },
        card: {
          type: 'Simple',
          title: `CalmNature: ${activeSelection.title}`,
          content: `Streaming: ${activeSelection.title} at ${activeSelection.volume}% volume.`
        },
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'REPLACE_ALL',
            audioItem: {
              stream: {
                token: `calmnature-${activeSelection.phase}`,
                url: activeUrl,
                offsetInMilliseconds: 0
              },
              metadata: {
                title: activeSelection.title,
                subtitle: `Single Hall Volume: ${activeSelection.volume}%`,
                art: { sources: [{ url: `${proto}://${host}/favicon.ico` }] }
              }
            }
          }
        ],
        shouldEndSession: true
      }
    });
  }

  if (reqType === 'AudioPlayer.PlaybackNearlyFinished') {
    const nextPhase = getCurrentPhase(tzOffset);
    const nextUrl = nextPhase.file ? `${proto}://${host}/audio/${nextPhase.file}` : audioUrl;

    return res.status(200).json({
      version: '1.0',
      response: {
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'ENQUEUE',
            audioItem: {
              stream: {
                token: `calmnature-${nextPhase.phase}`,
                url: nextUrl,
                offsetInMilliseconds: 0,
                expectedPreviousToken: request.token
              }
            }
          }
        ]
      }
    });
  }

  return res.status(200).json({ version: '1.0', response: { shouldEndSession: true } });
}
