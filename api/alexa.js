// =====================================================================
// 🎙️ CalmNature — 24-Hour Home Energy & Alexa Skill Handler
// Automatically streams the exact phase based on the time of day,
// OR plays specific requested tracks (90s god songs, temple bell, evening pooja, night flute)
// =====================================================================

function getRequestedTrack(request) {
  const slots = request.intent?.slots || {};
  let query = '';
  for (const k in slots) {
    if (slots[k]?.value) query += ' ' + slots[k].value.toLowerCase();
  }
  const intentName = (request.intent?.name || '').toLowerCase();
  const text = (query + ' ' + intentName).toLowerCase();

  if (text.includes('morning') || text.includes('90') || text.includes('devotion') || text.includes('god') || text.includes('bhajan')) {
    return {
      phase: 'morning_devotional',
      title: '90s Morning Devotional Bliss',
      file: 'morning-devotional.mp3',
      speech: 'Playing your 90s morning devotional soundscape with Suprabhatam and Annamayya temple vibrations. Have a blessed day.',
      volume: 40
    };
  }
  if (text.includes('bell') || text.includes('chime') || text.includes('temple')) {
    return {
      phase: 'temple_bell',
      title: 'Sacred Bronze Temple Bell',
      file: 'temple-bell-hourly.mp3',
      speech: 'Ringing the sacred bronze temple bell to bless your home with positive energy.',
      volume: 40
    };
  }
  if (text.includes('evening') || text.includes('sandhya') || text.includes('pooja') || text.includes('aarti') || text.includes('stotram')) {
    return {
      phase: 'evening_sandhya',
      title: 'Evening Sandhya Pooja Devotion',
      file: 'evening-sandhya.mp3',
      speech: 'Playing your Evening Sandhya Pooja devotional melodies with Deeparadhana temple resonances.',
      volume: 35
    };
  }
  if (text.includes('night') || text.includes('sleep') || text.includes('flute') || text.includes('bansuri') || text.includes('krishna')) {
    return {
      phase: 'night_flute',
      title: 'Night Peace & Krishna Bansuri Flute',
      file: 'night-sleep-flute.mp3',
      speech: 'Starting your calming Krishna Bansuri flute and 528 Hz healing frequencies for peaceful sleep.',
      volume: 20
    };
  }
  if (text.includes('day') || text.includes('positive') || text.includes('vibe') || text.includes('bird')) {
    return {
      phase: 'daytime_positive',
      title: 'Positive Home Energy & Hourly Bell',
      file: 'morning-positive.mp3',
      speech: 'Playing your positive daytime vibration soundscape. Hourly temple chimes will ring to bring peace to your home.',
      volume: 25
    };
  }
  return null;
}

function getCurrentPhase(offsetHours = 5.5) { // default IST (+5.5)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const targetTime = new Date(utc + (3600000 * offsetHours));
  
  const hour = targetTime.getHours();
  const minute = targetTime.getMinutes();
  const timeVal = hour + minute / 60.0;

  if (timeVal >= 6.0 && timeVal < 10.0) {
    return {
      phase: 'morning_devotional',
      title: '90s Morning Devotional Bliss',
      file: 'morning-devotional.mp3',
      speech: 'Good morning! Starting your 90s morning devotional soundscape. Have a blessed day.',
      volume: 40
    };
  } else if (timeVal >= 10.0 && timeVal < 18.0) {
    return {
      phase: 'daytime_positive',
      title: 'Positive Home Energy & Hourly Bell',
      file: 'morning-positive.mp3',
      speech: 'Starting your positive daytime vibration soundscape. Hourly temple chimes will ring to bring peace to your home.',
      volume: 25
    };
  } else if (timeVal >= 18.0 && timeVal < 19.5) {
    return {
      phase: 'evening_sandhya',
      title: 'Evening Sandhya Pooja Devotion',
      file: 'evening-sandhya.mp3',
      speech: 'Good evening! Starting your Sandhya Deepam pooja devotional melodies.',
      volume: 35
    };
  } else if (timeVal >= 19.5 && timeVal < 23.0) {
    return {
      phase: 'night_flute',
      title: 'Night Peace & Krishna Bansuri Flute',
      file: 'night-sleep-flute.mp3',
      speech: 'Starting your calming night bansuri flute and 528 Hz healing frequencies for peaceful sleep.',
      volume: 20
    };
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
  
  const tzOffset = req.query?.tz ? parseFloat(req.query.tz) : 5.5; // default IST (+5.5)
  const current = getCurrentPhase(tzOffset);
  const audioUrl = current.file ? `${proto}://${host}/audio/${current.file}` : null;
  const bellUrl = `${proto}://${host}/audio/temple-bell-hourly.mp3`;

  // Status check endpoint
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      system: 'CalmNature 24-Hour Home Sanctuary Engine',
      currentPhase: current,
      streamUrl: audioUrl,
      hourlyChimeUrl: bellUrl,
      tracks: [
        { id: 'morning_devotional', name: '90s Morning Devotional Bliss', file: `${proto}://${host}/audio/morning-devotional.mp3` },
        { id: 'daytime_positive', name: 'Daytime Positive Home Energy', file: `${proto}://${host}/audio/morning-positive.mp3` },
        { id: 'temple_bell', name: 'Sacred Bronze Temple Bell', file: `${proto}://${host}/audio/temple-bell-hourly.mp3` },
        { id: 'evening_sandhya', name: 'Evening Sandhya Pooja Devotion', file: `${proto}://${host}/audio/evening-sandhya.mp3` },
        { id: 'night_flute', name: 'Night Peace & Krishna Bansuri Flute', file: `${proto}://${host}/audio/night-sleep-flute.mp3` }
      ]
    });
  }

  const body = req.body || {};
  const request = body.request || {};
  const reqType = request.type;
  const intentName = request.intent?.name;

  // Check if user specifically requested a track (e.g. 90s songs, bell, evening, etc.)
  const requested = getRequestedTrack(request);
  const activeSelection = requested || current;
  const activeUrl = activeSelection.file ? `${proto}://${host}/audio/${activeSelection.file}` : audioUrl;

  // Sleep mode check (only if no specific track was explicitly asked for)
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

  // Launch Request or Intent Request
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

  // Infinite Loop
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
