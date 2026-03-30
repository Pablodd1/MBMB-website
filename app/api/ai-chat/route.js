import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(request) {
  const { messages } = await request.json();
  // Basic privacy: do not log PHI; ensure you have BAAs with providers
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return NextResponse.json({ text: 'Server not configured' }, { status: 500 });
  }
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages
      })
    });
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json({ text: 'Error generating response' }, { status: 500 });
  }
}
