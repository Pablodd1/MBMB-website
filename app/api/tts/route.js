import { NextResponse } from 'next/server';

// Google Cloud TTS configurations - Warm, natural voices
const GOOGLE_VOICE_CONFIG = {
  en: { languageCode: 'en-US', name: 'en-US-Journey-F', fallbackName: 'en-US-Neural2-F', ssmlGender: 'FEMALE' },
  es: { languageCode: 'es-US', name: 'es-US-Journey-F', fallbackName: 'es-US-Neural2-A', ssmlGender: 'FEMALE' },
  ru: { languageCode: 'ru-RU', name: 'ru-RU-Standard-A', fallbackName: 'ru-RU-Standard-A', ssmlGender: 'FEMALE' },
  ht: { languageCode: 'en-US', name: 'en-US-Journey-F', fallbackName: 'en-US-Neural2-F', ssmlGender: 'FEMALE' }
};

export async function POST(request) {
  try {
    const { text, language = 'en' } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const cleanInput = text.substring(0, 4000);
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const GOOGLE_TTS_API_KEY = process.env.GOOGLE_TTS_API_KEY;

    // 1. Primary (Most Human & Ultra-Fast): ElevenLabs Flash v2.5
    if (ELEVENLABS_API_KEY) {
      try {
        // Default voice: Sarah / Rachel (warm, executive customer service receptionist)
        const voiceId = process.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';
        const elevenRes = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'xi-api-key': ELEVENLABS_API_KEY
            },
            body: JSON.stringify({
              text: cleanInput,
              model_id: 'eleven_flash_v2_5',
              voice_settings: {
                stability: 0.48,
                similarity_boost: 0.8,
                style: 0.25,
                use_speaker_boost: true
              }
            })
          }
        );

        if (elevenRes.ok) {
          const arrayBuffer = await elevenRes.arrayBuffer();
          const audioContent = Buffer.from(arrayBuffer).toString('base64');
          return NextResponse.json({ audioContent, format: 'MP3', provider: 'elevenlabs-flash-v2.5' });
        }
      } catch (e) {
        console.warn('ElevenLabs TTS fallback triggered:', e.message);
      }
    }

    // 2. Secondary (Natural & Fast with Single OpenAI Key): OpenAI Audio TTS (`gpt-4o-mini-tts` / `tts-1`)
    if (OPENAI_API_KEY) {
      for (const ttsModel of ['gpt-4o-mini-tts', 'tts-1']) {
        try {
          const oaRes = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
              model: ttsModel,
              voice: 'nova', // Warm, energetic, professional female receptionist voice
              input: cleanInput,
              response_format: 'mp3'
            })
          });

          if (oaRes.ok) {
            const arrayBuffer = await oaRes.arrayBuffer();
            const audioContent = Buffer.from(arrayBuffer).toString('base64');
            return NextResponse.json({ audioContent, format: 'MP3', provider: `openai-${ttsModel}` });
          }
        } catch (e) {
          console.warn(`OpenAI TTS (${ttsModel}) fallback triggered:`, e.message);
        }
      }
    }

    // 3. Tertiary: Google Cloud Text-to-Speech
    if (GOOGLE_TTS_API_KEY) {
      const voiceCfg = GOOGLE_VOICE_CONFIG[language] || GOOGLE_VOICE_CONFIG.en;
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: cleanInput },
            voice: {
              languageCode: voiceCfg.languageCode,
              name: voiceCfg.fallbackName,
              ssmlGender: voiceCfg.ssmlGender
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 0.98,
              pitch: 0.5,
              sampleRateHertz: 24000
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          audioContent: data.audioContent,
          format: 'MP3',
          provider: 'google-tts'
        });
      }
    }

    return NextResponse.json(
      { error: 'No cloud TTS API key active; client will use browser Web Speech synthesis.' },
      { status: 503 }
    );
  } catch (err) {
    console.error('TTS error:', err);
    return NextResponse.json({ error: 'TTS error: ' + err.message }, { status: 500 });
  }
}
