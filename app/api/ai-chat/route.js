import { NextResponse } from 'next/server';
// Use global fetch (no extra dependency needed)

export async function POST(request) {
  const { messages } = await request.json();
  // Basic privacy: do not log PHI; ensure you have BAAs with providers
  const KIMI_API_KEY = process.env.KIMI_API_KEY;
  if (!KIMI_API_KEY) {
    return NextResponse.json({ text: 'Server not configured' }, { status: 500 });
  }
  try {
    const res = await fetch('https://api.moonshot.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'kimi-k2.5',
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
