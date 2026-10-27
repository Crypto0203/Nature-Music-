// =====================================================================
// 🎙️ CalmNature — 90s All-Time Hit Devotional Songs & Alexa Handler
// Songs Inbuilt:
//  - Sri Venkateswara Suprabhatam (M.S. Subbulakshmi)
//  - Brahmam Okate (Thandanana) (Annamayya Sankeertana)
//  - Muddugare Yashoda (Annamayya Sankeertana)
//  - Kondalalo Nelakonna Koneti Rayadu (Annamayya Sankeertana)
//  - Adivo Alladivo (Annamayya Sankeertana)
//  - Sriman Narayana (Annamayya Sankeertana)
// =====================================================================

function getRequestedSong(request) {
  const slots = request.intent?.slots || {};
  let query = '';
  for (const k in slots) {
    if (slots[k]?.value) query += ' ' + slots[k].value.toLowerCase();
  }
  const intentName = (request.intent?.name || '').toLowerCase();
  const text = (query + ' ' + intentName).toLowerCase();

  if (text.includes('suprabhatam') || text.includes('subbulakshmi') || text.includes('morning song') || text.includes('balaji') || text.includes('venkateswara')) {
    return {
      phase: 'suprabhatam',
      title: 'Sri Venkateswara Suprabhatam',
      file: 'devotional/suprabhatam.mp3',
      speech: 'Good morning! Starting M.S. Subbulakshmi’s legendary Sri Venkateswara Suprabhatam. Have a blessed and auspicious day.',
      volume: 40
    };
  }
  if (text.includes('brahmam') || text.includes('thandanana')) {
    return {
      phase: 'brahmam_okate',
      title: 'Brahmam Okate (Thandanana)',
      file: 'devotional/brahmam-okate.mp3',
      speech: 'Playing the classic Annamacharya Sankeertana Brahmam Okate Parabrahmam Okate.',
      volume: 40
    };
  }
  if (text.includes('muddugare') || text.includes('yashoda') || text.includes('krishna song')) {
    return {
      phase: 'muddugare_yashoda',
      title: 'Muddugare Yashoda',
      file: 'devotional/muddugare-yashoda.mp3',
      speech: 'Playing the divine Annamacharya Sankeertana Muddugare Yashoda.',
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
  if (text.includes('90') || text.includes('devotion') || text.includes('god') || text.includes('bhajan')) {
    return {
      phase: 'suprabhatam',
      title: 'Sri Venkateswara Suprabhatam',
      file: 'devotional/suprabhatam.mp3',
      speech: 'Playing your all-time hit 90s devotional morning prayer: M.S. Subbulakshmi’s Sri Venkateswara Suprabhatam.',
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

  // 6:00 AM to 10:00 AM -> M.S. Subbulakshmi Sri Venkateswara Suprabhatam
  if (timeVal >= 6.0 && timeVal < 10.0) {
    return {
      phase: 'morning_devotional',
      title: 'Sri Venkateswara Suprabhatam (M.S. Subbulakshmi)',
      file: 'devotional/suprabhatam.mp3',
      speech: 'Good morning! Starting your 90s morning devotional prayer: M.S. Subbulakshmi’s Sri Venkateswara Suprabhatam. Have a blessed day.',
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
  
  const tzOffset = req.query?.tz ? parseFloat(req.query.tz) : 5.5;
  const current = getCurrentPhase(tzOffset);
  const audioUrl = current.file ? `${proto}://${host}/audio/${current.file}` : null;
  const bellUrl = `${proto}://${host}/audio/temple-bell-hourly.mp3`;

  // Status check endpoint
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      system: 'CalmNature 90s Hit Devotional & Sanctuary Engine',
      currentPhase: current,
      streamUrl: audioUrl,
      hourlyChimeUrl: bellUrl,
      devotionalSongs: [
        { id: 'suprabhatam', name: 'Sri Venkateswara Suprabhatam (M.S. Subbulakshmi)', url: `${proto}://${host}/audio/devotional/suprabhatam.mp3` },
        { id: 'brahmam_okate', name: 'Brahmam Okate (Annamayya)', url: `${proto}://${host}/audio/devotional/brahmam-okate.mp3` },
        { id: 'muddugare_yashoda', name: 'Muddugare Yashoda (Annamayya)', url: `${proto}://${host}/audio/devotional/muddugare-yashoda.mp3` },
        { id: 'kondalalo_nelakonna', name: 'Kondalalo Nelakonna (Annamayya)', url: `${proto}://${host}/audio/devotional/kondalalo-nelakonna.mp3` },
        { id: 'adivo_alladivo', name: 'Adivo Alladivo (Annamayya)', url: `${proto}://${host}/audio/devotional/adivo-alladivo.mp3` },
        { id: 'sreemannarayana', name: 'Sriman Narayana (Annamayya)', url: `${proto}://${host}/audio/devotional/sreemannarayana.mp3` }
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
