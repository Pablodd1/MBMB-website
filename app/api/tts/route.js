import { NextResponse } from 'next/server';

const VOICE_INSTRUCTIONS = {
  en: 'Speak as Jass, a warm, upbeat, empathetic, and executive medical office receptionist in Miami Beach. Use natural human pacing, friendly inflection, and reassuring confidence.',
  es: 'Habla como Jass, una recepcionista ejecutiva de facturación médica en Miami Beach, cálida, amable, profesional y muy natural.',
  ht: 'Speak with a warm, welcoming, and professional customer service receptionist tone.',
  ru: 'Говорите тепло, дружелюбно, уверенно и естественно, как профессиональный администратор медицинской клиники в Майами.'
};

// Google Cloud TTS fallback configurations
const GOOGLE_VOICE_CONFIG = {
  en: { languageCode: 'en-US', name: 'en-US-Neural2-F', ssmlGender: 'FEMALE' },
  es: { languageCode: 'es-US', name: 'es-US-Neural2-A', ssmlGender: 'FEMALE' },
  ru: { languageCode: 'ru-RU', name: 'ru-RU-Standard-A', ssmlGender: 'FEMALE' },
  ht: { languageCode: 'en-US', name: 'en-US-Neural2-F', ssmlGender: 'FEMALE' }
};

export async function POST(request) {
  try {
    const { text, language = 'en' } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const cleanInput = text.substring(0, 4000);
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
    const GOOGLE_TTS_API_KEY = process.env.GOOGLE_TTS_API_KEY;

    // 1. Primary: OpenAI Latest Human Voice TTS (`gpt-4o-mini-tts` with `coral`/`nova` + receptionist voice instructions -> `tts-1`)
    if (OPENAI_API_KEY) {
      const openAiTtsAttempts = [
        {
          model: 'gpt-4o-mini-tts',
          voice: 'coral',
          instructions: VOICE_INSTRUCTIONS[language] || VOICE_INSTRUCTIONS.en
        },
        {
          model: 'tts-1',
          voice: 'nova'
        }
      ];

      for (const attempt of openAiTtsAttempts) {
        try {
          const oaRes = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
              ...attempt,
              input: cleanInput,
              response_format: 'mp3'
            })
          });

          if (oaRes.ok) {
            const arrayBuffer = await oaRes.arrayBuffer();
            const audioContent = Buffer.from(arrayBuffer).toString('base64');
            return NextResponse.json({
              audioContent,
              format: 'MP3',
              provider: `openai-${attempt.model}-${attempt.voice}`
            });
          }
        } catch (e) {
          console.warn(`OpenAI TTS (${attempt.model}) fallback triggered:`, e.message);
        }
      }
    }

    // 2. Secondary: ElevenLabs Flash v2.5
    if (ELEVENLABS_API_KEY) {
      try {
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

    // 3. Tertiary: Google Cloud TTS
    if (GOOGLE_TTS_API_KEY) {
      const voiceCfg = GOOGLE_VOICE_CONFIG[language] || GOOGLE_VOICE_CONFIG.en;
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: cleanInput },
            voice: voiceCfg,
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
