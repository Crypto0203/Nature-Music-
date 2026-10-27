// =====================================================================
// 🎙️ CalmNature — Year 2000 Golden Devotional Songs & Sanctuary API
// Built for Single Hall Living Room + Alexa Echo
//
// JIOSAAVN & GOLDEN DEVOTIONAL TRACKS:
//  1. Shree Hanuman Chalisa (Hariharan)
//  2. Gayatri Mantra 108 Times
//  3. Maha Mrityunjaya Mantra 108 Times (Suresh Wadkar)
//  4. Sri Venkateswara Suprabhatam (M. S. Subbulakshmi)
//  5. Vishnu Sahasranamam (M. S. Subbulakshmi)
//  6. Jai Ganesh Deva (Anuradha Paudwal)
//  7. Om Jai Jagdish Hare
//  8. Subah Subah Le Shiv Ka Naam
//  9. Sri Venkatesam Manasa Smarami (Flagship 2000 Master)
// 10. Govinda Govinda Yani Koluvare
//
// CLEANSING FREQUENCIES:
//  - 174 Hz Mom Pain Relief & Deep Rest
//  - 417 Hz Negative Energy Dissolver
//  - 528 Hz Home Harmony & Positive Vibe
//  - Sacred Shankh Naad & Temple Bells
// =====================================================================

function getRequestedSong(request) {
  const slots = request.intent?.slots || {};
  let query = '';
  for (const k in slots) {
    if (slots[k]?.value) query += ' ' + slots[k].value.toLowerCase();
  }
  const intentName = (request.intent?.name || '').toLowerCase();
  const text = (query + ' ' + intentName).toLowerCase();

  // --- 10-MINUTE MORNING CLEANSING RITUAL ---
  if (text.includes('ritual') || text.includes('10 minute') || (text.includes('cleanse') && text.includes('morning'))) {
    return {
      phase: 'morning_ritual',
      title: '10-Minute Morning Cleansing Ritual (Maha Mrityunjaya 108)',
      file: 'devotional/maha-mrityunjaya-mantra-108.mp3',
      speech: 'Starting your 10-minute home cleansing ritual. Open the windows and curtains to let fresh morning sunlight and air in, and light a small piece of natural camphor or herbal dhoop while Maha Mrityunjaya Mantra cleanses and protects your home.',
      volume: 45
    };
  }

  // --- VISHNU SAHASRANAMAM (M. S. SUBBULAKSHMI) ---
  if (text.includes('sahasranamam') || text.includes('vishnu sahasra') || text.includes('subbulakshmi sahasranamam') || text.includes('ancient shield')) {
    return {
      phase: 'vishnu_sahasranamam',
      title: 'Vishnu Sahasranamam (M. S. Subbulakshmi)',
      file: 'devotional/vishnu-sahasranamam.mp3',
      speech: 'Starting Vishnu Sahasranamam sung by M. S. Subbulakshmi. An ancient shield of divine positivity and protection for your home.',
      volume: 40
    };
  }

  // --- MAHA MRITYUNJAYA MANTRA (108 TIMES) ---
  if (text.includes('mrityunjaya') || text.includes('mrutyunjaya') || text.includes('tryambakam') || text.includes('protective mantra') || text.includes('healing mantra') || text.includes('fear protection')) {
    return {
      phase: 'maha_mrityunjaya',
      title: 'Maha Mrityunjaya Mantra 108 Times (Suresh Wadkar & Anuradha Paudwal)',
      file: 'devotional/maha-mrityunjaya-mantra-108.mp3',
      speech: 'Starting Maha Mrityunjaya Mantra 108 Repetitions by Suresh Wadkar and Anuradha Paudwal. The ultimate healing and fear protection chant.',
      volume: 40
    };
  }

  // --- SHANKH (CONCH SHELL) & TEMPLE BELLS SPACE RESET ---
  if (text.includes('shankh') || text.includes('conch') || text.includes('shankha') || text.includes('blow shankh') || text.includes('space clearing')) {
    return {
      phase: 'shankh_naad',
      title: 'Sacred Shankh Naad & Temple Bells (Space Reset)',
      file: 'devotional/shankh-and-temple-bell.mp3',
      speech: 'Blowing the sacred Shankh conch with resonant temple bells to break standing wave dead-zones and stagnant air in all room corners, resetting your home energy.',
      volume: 45
    };
  }

  // --- 417 HZ SPACE & MIND CLEANSER ---
  if (text.includes('417') || text.includes('dissolve blockage') || text.includes('space cleanser') || text.includes('negative energy dissolver')) {
    return {
      phase: 'space_cleanse_417',
      title: '417 Hz Negative Energy Dissolver & Space Cleanser',
      file: 'healing/417hz-negative-energy-cleanse.mp3',
      speech: 'Starting 417 Hz Solfeggio frequency to break up negative emotional energy and clear heavy stagnant atmospheres in your home.',
      volume: 35
    };
  }

  // --- MOM'S LEG PAIN RELIEF & 174 HZ ---
  if (text.includes('174') || text.includes('pain') || text.includes('leg') || text.includes('mom') || text.includes('mother') || text.includes('muscle') || text.includes('relief') || text.includes('deep rest')) {
    return {
      phase: 'pain_relief_174',
      title: '174 Hz Mom Pain Relief & Deep Rest',
      file: 'healing/174hz-pain-relief.mp3',
      speech: "Starting 174 Hz Solfeggio frequency for your mother's leg comfort and deep restorative sleep. Please keep the volume gentle and place one or two soft pillows under her calves for best relief.",
      volume: 30
    };
  }

  // --- 528 HZ HOME HARMONY & POSITIVE VIBE ---
  if (text.includes('528') || text.includes('positive energy') || text.includes('positive vibe') || text.includes('harmony') || text.includes('transformation')) {
    return {
      phase: 'home_cleanse_528',
      title: '528 Hz Home Harmony & Positive Vibe',
      file: 'healing/528hz-home-cleanse.mp3',
      speech: 'Playing 528 Hz transformation frequency to bring harmony and pure positive energy into your home.',
      volume: 30
    };
  }

  // --- 432 HZ OM CHANTING ---
  if (text.includes('432') || text.includes('om chant') || text.includes('chanting') || text.includes('om mantra')) {
    return {
      phase: 'om_chanting_432',
      title: '432 Hz Sacred OM Chanting for Deep Peace',
      file: 'healing/432hz-om-chanting.mp3',
      speech: 'Starting 432 Hz deep peace OM chanting for mental tranquility and harmony.',
      volume: 30
    };
  }

  // --- TIBETAN SINGING BOWLS ---
  if (text.includes('bowl') || text.includes('tibetan') || text.includes('sound bath')) {
    return {
      phase: 'tibetan_bowls',
      title: 'Tibetan Singing Bowls Sound Bath',
      file: 'healing/tibetan-singing-bowls.mp3',
      speech: 'Playing Tibetan Singing Bowls sound bath for cellular relaxation and peace.',
      volume: 30
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
      title: 'Sri Venkateswara Suprabhatam (M. S. Subbulakshmi)',
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
      title: 'Evening Sandhya Pooja Devotion (Hanuman Chalisa & Temple Bells)',
      file: 'devotional/hanuman-chalisa-hariharan.mp3',
      speech: 'Good evening! Starting your Evening Sandhya space clearing with Shree Hanuman Chalisa and sacred temple bells to clear twilight negative energy and bring divine peace into your home.',
      volume: 40
    };
  }

  if (text.includes('flute') || text.includes('sleep') || text.includes('night') || text.includes('bedtime')) {
    return {
      phase: 'night_healing',
      title: '174 Hz Mom Pain Relief & Deep Rest',
      file: 'healing/174hz-pain-relief.mp3',
      speech: "Starting 174 Hz continuous healing frequency for your mother's leg comfort and deep restorative sleep. Good night.",
      volume: 25
    };
  }

  return null;
}

// 4-Phase Daily Rhythm
function getCurrentPhase(offsetHours = 5.5) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const targetTime = new Date(utc + (3600000 * offsetHours));
  
  const hour = targetTime.getHours();
  const minute = targetTime.getMinutes();
  const timeVal = hour + minute / 60.0;

  // Phase 1: Morning (6:00 AM – 8:00 AM) — Awakening & Protection
  // Suprabhatam, Sri Venkatesam Manasa Smarami, Vishnu Sahasranamam, Gayatri Mantra
  if (timeVal >= 6.0 && timeVal < 8.0) {
    return {
      phase: 'morning_awakening',
      title: 'Morning Awakening & Protection (M. S. Subbulakshmi Suprabhatam)',
      file: 'devotional/suprabhatam.mp3',
      speech: 'Good morning! Starting your Morning Awakening & Protection with M. S. Subbulakshmi’s sacred Suprabhatam. Have a blessed and auspicious day.',
      volume: 40
    };
  // Phase 2: Daytime / Afternoon (8:00 AM – 6:00 PM) — Calm Focus, Space Cleansing & Rest
  // Soft Bansuri, 528 Hz Home Harmony / 417 Hz Negative Energy Dissolver + Hourly Temple Bell
  } else if (timeVal >= 8.0 && timeVal < 18.0) {
    return {
      phase: 'afternoon_calm',
      title: 'Afternoon Calm Focus & 528 Hz Home Harmony',
      file: 'healing/528hz-home-cleanse.mp3',
      speech: 'Starting your Daytime Calm Focus and 528 Hz Home Harmony soundscape. Hourly bronze temple bell chimes will ring every hour to reset positive energy.',
      volume: 30
    };
  // Phase 3: Evening Sandhya (6:00 PM – 7:30 PM) — Clearing Negative Energy
  // Hanuman Chalisa or Maha Mrityunjaya Mantra + Shankh & Temple Bell
  } else if (timeVal >= 18.0 && timeVal < 19.5) {
    return {
      phase: 'evening_sandhya',
      title: 'Evening Sandhya Space Clearing (Hanuman Chalisa & Temple Bells)',
      file: 'devotional/hanuman-chalisa-hariharan.mp3',
      speech: 'Good evening! Starting your Evening Sandhya space clearing with Shree Hanuman Chalisa and sacred temple bells to clear twilight negative energy and bring divine peace into your home.',
      volume: 40
    };
  // Phase 4: Night / Bedtime (7:30 PM – 11:00 PM, especially 9:00 PM+) — Healing & Sleep for Mom
  // 174 Hz continuous soft playback to ease leg pain and bring deep sleep
  } else if (timeVal >= 19.5 && timeVal < 23.0) {
    return {
      phase: 'night_healing_sleep',
      title: '174 Hz Mom Pain Relief & Deep Sleep',
      file: 'healing/174hz-pain-relief.mp3',
      speech: "Starting 174 Hz continuous healing frequency for your mother's leg comfort and deep restorative sleep. Good night.",
      volume: 25
    };
  // Late Night: 11:00 PM to 6:00 AM -> Quiet Rest / Sleep Mode
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
      jiosaavnTracks: [
        'Shree Hanuman Chalisa (Hariharan)',
        'Gayatri Mantra 108 Times',
        'Maha Mrityunjaya Mantra 108 Times (Suresh Wadkar)',
        'Sri Venkateswara Suprabhatam (M. S. Subbulakshmi)',
        'Vishnu Sahasranamam (M. S. Subbulakshmi)',
        'Jai Ganesh Deva (Anuradha Paudwal)',
        'Om Jai Jagdish Hare',
        'Subah Subah Le Shiv Ka Naam',
        'Sri Venkatesam Manasa Smarami (Year 2000 Master)'
      ],
      cleansingFrequencies: [
        '174 Hz Mom Pain Relief & Deep Rest',
        '417 Hz Negative Energy Dissolver',
        '528 Hz Home Harmony & Positive Vibe',
        'Sacred Shankh Naad & Temple Bells'
      ],
      dailyRhythm: {
        morning: '6:00 AM – 8:00 AM: Awakening & Protection (Suprabhatam / Vishnu Sahasranamam)',
        afternoon: '8:00 AM – 6:00 PM: Calm Focus & Rest (528 Hz / 417 Hz + Hourly Bell)',
        eveningSandhya: '6:00 PM – 7:30 PM: Clearing Negative Energy (Hanuman Chalisa + Shankh/Bell)',
        nightBedtime: '7:30 PM – 11:00 PM: Healing & Sleep for Mom (174 Hz Continuous)'
      },
      physicalHomeTouches: {
        rockSaltMop: 'Add a fistful of natural sea salt / rock salt to the water when mopping floors once a week to absorb static charges and dampness.',
        eveningDeepam: 'Light a small ghee or sesame oil brass lamp during evening Sandhya while Hanuman Chalisa plays for tangible warmth and clarity.'
      }
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
