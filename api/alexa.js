// =====================================================================
// 🎙️ CalmNature — Amazon Alexa AudioPlayer Skill Handler (Vercel Serverless)
// Compatible with any Alexa Echo / Dot / Studio speaker and Alexa Routines.
// =====================================================================

export default function handler(req, res) {
  // CORS & Health check
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const audioUrl = `${proto}://${host}/audio/morning-positive.mp3`;

  // Simple GET test in browser
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      app: 'CalmNature Alexa Skill Service',
      streamUrl: audioUrl,
      instructions: 'Configure this endpoint URL in your Amazon Alexa Developer Console (HTTPS Endpoint)'
    });
  }

  const body = req.body || {};
  const request = body.request || {};
  const reqType = request.type;
  const intentName = request.intent?.name;

  console.log(`[Alexa Request] Type: ${reqType}, Intent: ${intentName}`);

  // 1. Launch Request (e.g. "Alexa, open Calm Nature" or triggered by Alexa Morning Routine)
  if (reqType === 'LaunchRequest' || (reqType === 'IntentRequest' && (intentName === 'PlayStreamIntent' || intentName === 'AMAZON.StartOverIntent'))) {
    return res.status(200).json({
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: 'Playing your positive morning soundscape from Calm Nature. Have a peaceful and energized day.'
        },
        card: {
          type: 'Simple',
          title: 'CalmNature Morning Positive Stream',
          content: 'Streaming 432Hz healing soundscape with Krishna Bansuri flute and nature birds.'
        },
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'REPLACE_ALL',
            audioItem: {
              stream: {
                token: 'calmnature-morning-loop',
                url: audioUrl,
                offsetInMilliseconds: 0
              },
              metadata: {
                title: 'Morning Positive Energy (432Hz)',
                subtitle: 'CalmNature Sound Therapy',
                art: {
                  sources: [
                    { url: `${proto}://${host}/favicon.ico` }
                  ]
                }
              }
            }
          }
        ],
        shouldEndSession: true
      }
    });
  }

  // 2. Playback Nearly Finished -> Infinite Loop (queues the next track seamlessly)
  if (reqType === 'AudioPlayer.PlaybackNearlyFinished') {
    return res.status(200).json({
      version: '1.0',
      response: {
        directives: [
          {
            type: 'AudioPlayer.Play',
            playBehavior: 'ENQUEUE',
            audioItem: {
              stream: {
                token: 'calmnature-morning-loop',
                url: audioUrl,
                offsetInMilliseconds: 0,
                expectedPreviousToken: 'calmnature-morning-loop'
              }
            }
          }
        ]
      }
    });
  }

  // 3. Pause / Stop Intent
  if (reqType === 'IntentRequest' && (intentName === 'AMAZON.PauseIntent' || intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent')) {
    return res.status(200).json({
      version: '1.0',
      response: {
        directives: [
          {
            type: 'AudioPlayer.ClearQueue',
            clearBehavior: 'CLEAR_ALL'
          },
          {
            type: 'AudioPlayer.Stop'
          }
        ],
        shouldEndSession: true
      }
    });
  }

  // 4. Resume Intent
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
                token: 'calmnature-morning-loop',
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

  // 5. Help Intent
  if (reqType === 'IntentRequest' && intentName === 'AMAZON.HelpIntent') {
    return res.status(200).json({
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: 'You can say play, pause, or resume to listen to your morning positive soundscape. What would you like to do?'
        },
        shouldEndSession: false
      }
    });
  }

  // Default empty acknowledgment
  return res.status(200).json({
    version: '1.0',
    response: {
      shouldEndSession: true
    }
  });
}
