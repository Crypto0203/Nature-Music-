// =====================================================================
// 🎙️ CalmNature — 24-Hour Home Energy & Alexa Skill Handler
// Automatically streams the exact phase based on the time of day:
//  06:00 - 10:00  Morning 90s Devotional Bliss
//  10:00 - 18:00  Positive Daytime Energy & Hourly Temple Bell Chime
//  18:00 - 19:30  Evening Sandhya Pooja Devotion
//  19:30 - 23:00  Night Flute Meditation (Krishna Bansuri + 528Hz)
//  23:00 - 06:00  Quiet Sleep Mode (Off)
// =====================================================================

function getCurrentPhase(offsetHours = 0) {
  const now = new Date();
  // Adjust for timezone offset if passed via query/header (defaults to local server)
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
      volume: 40 // Recommended single-hall volume %
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
  
  // Support IST timezone offset (+5.5) or custom via query ?tz=5.5
  const tzOffset = req.query?.tz ? parseFloat(req.query.tz) : 5.5; // default IST (+5.5)
  const current = getCurrentPhase(tzOffset);
  const audioUrl = current.file ? `${proto}://${host}/audio/${current.file}` : null;
  const bellUrl = `${proto}://${host}/audio/temple-bell-hourly.mp3`;

  // Status check endpoint (Viewable directly in any browser)
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      system: 'CalmNature 24-Hour Home Sanctuary Engine',
      currentPhase: current,
      streamUrl: audioUrl,
      hourlyChimeUrl: bellUrl,
      schedule: [
        { time: '06:00 - 10:00', name: 'Morning 90s Devotional Bliss', file: 'morning-devotional.mp3', volume: '40% Hall' },
        { time: '10:00 - 18:00', name: 'Daytime Positive Vibes & Hourly Bell', file: 'morning-positive.mp3', volume: '25% Hall' },
        { time: '18:00 - 19:30', name: 'Evening Sandhya Pooja Devotion', file: 'evening-sandhya.mp3', volume: '35% Hall' },
        { time: '19:30 - 23:00', name: 'Night Flute & 528Hz Meditation', file: 'night-sleep-flute.mp3', volume: '20% Hall' },
        { time: '23:00 - 06:00', name: 'Silent Sleep Mode (Auto-Off)', file: null, volume: '0%' }
      ]
    });
  }

  const body = req.body || {};
  const request = body.request || {};
  const reqType = request.type;
  const intentName = request.intent?.name;

  // 1. Sleep mode handling between 11 PM and 6 AM
  if (current.phase === 'sleep_mode') {
    return res.status(200).json({
      version: '1.0',
      response: {
        outputSpeech: { type: 'PlainText', text: current.speech },
        directives: [
          { type: 'AudioPlayer.ClearQueue', clearBehavior: 'CLEAR_ALL' },
          { type: 'AudioPlayer.Stop' }
        ],
        shouldEndSession: true
      }
    });
  }

  // 2. Launch / Start Playback
  if (reqType === 'LaunchRequest' || (reqType === 'IntentRequest' && (intentName === 'PlayStreamIntent' || intentName === 'AMAZON.StartOverIntent'))) {
    return res.status(200).json({
      version: '1.0',
      response: {
        outputSpeech: { type: 'PlainText', text: current.speech },
        card: {
          type: 'Simple',
          title: `CalmNature: ${current.title}`,
          content: `Streaming schedule phase: ${current.title} at ${current.volume}% volume.`
        },
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'REPLACE_ALL',
            audioItem: {
              stream: {
                token: `calmnature-${current.phase}`,
                url: audioUrl,
                offsetInMilliseconds: 0
              },
              metadata: {
                title: current.title,
                subtitle: `Single Hall Volume: ${current.volume}%`,
                art: { sources: [{ url: `${proto}://${host}/favicon.ico` }] }
              }
            }
          }
        ],
        shouldEndSession: true
      }
    });
  }

  // 3. Infinite Seamless Loop
  if (reqType === 'AudioPlayer.PlaybackNearlyFinished') {
    // Re-check phase for automatic transition when the clock crosses into the next time block
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

  // 4. Pause / Stop
  if (reqType === 'IntentRequest' && (intentName === 'AMAZON.PauseIntent' || intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent')) {
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

  // 5. Resume
  if (reqType === 'IntentRequest' && intentName === 'AMAZON.ResumeIntent') {
    return res.status(200).json({
      version: '1.0',
      response: {
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'REPLACE_ALL',
            audioItem: {
              stream: {
                token: `calmnature-${current.phase}`,
                url: audioUrl,
                offsetInMilliseconds: request.offsetInMilliseconds || 0
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
