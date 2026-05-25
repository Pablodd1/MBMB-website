import { NextResponse } from 'next/server';

// Voice configurations for each language - FRIENDLIER voices
const VOICE_CONFIG = {
  en: {
    languageCode: 'en-US',
    name: 'en-US-Neural2-F', // Warm, friendly female voice
    ssmlGender: 'FEMALE'
  },
  es: {
    languageCode: 'es-US',
    name: 'es-US-Neural2-A', // Warm Spanish female
    ssmlGender: 'FEMALE'
  },
  ru: {
    languageCode: 'ru-RU',
    name: 'ru-RU-Standard-A',
    ssmlGender: 'FEMALE'
  },
  ht: {
    languageCode: 'en-US', // Haitian Creole fallback to warm English
    name: 'en-US-Neural2-F',
    ssmlGender: 'FEMALE'
  }
};

export async function POST(request) {
  const { text, language = 'en' } = await request.json();

  const GOOGLE_TTS_API_KEY = process.env.GOOGLE_TTS_API_KEY;

  if (!GOOGLE_TTS_API_KEY) {
    return NextResponse.json(
      { error: 'Google TTS API key not configured. Please add GOOGLE_TTS_API_KEY to Vercel environment variables.' },
      { status: 500 }
    );
  }

  if (!text || text.trim().length === 0) {
    return NextResponse.json(
      { error: 'No text provided' },
      { status: 400 }
    );
  }

  // Get voice config for language, fallback to English
  const voice = VOICE_CONFIG[language] || VOICE_CONFIG.en;

  try {
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text: text.substring(0, 5000) }, // Max 5000 chars
          voice: voice,
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.92, // Slightly slower, more conversational
            pitch: 1.5, // Slightly higher = warmer, friendlier
            sampleRateHertz: 24000
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Google TTS API error:', data);
      return NextResponse.json(
        { error: data?.error?.message || 'TTS API error: ' + response.status },
        { status: response.status }
      );
    }

    // Return the base64 audio content
    return NextResponse.json({
      audioContent: data.audioContent,
      format: 'MP3'
    });
  } catch (err) {
    console.error('TTS error:', err);
    return NextResponse.json(
      { error: 'TTS error: ' + err.message },
      { status: 500 }
    );
  }
}
