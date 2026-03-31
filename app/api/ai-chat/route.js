import { NextResponse } from 'next/server';

export async function POST(request) {
  const { messages } = await request.json();
  const KIMI_API_KEY = process.env.KIMI_API_KEY;
  
  if (!KIMI_API_KEY) {
    return NextResponse.json({ text: 'Server not configured. Please add KIMI_API_KEY to Vercel environment variables.' }, { status: 500 });
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
    
    if (!res.ok) {
      console.error('Kimi API error:', data);
      return NextResponse.json({ text: data?.error?.message || 'API error: ' + res.status }, { status: res.status });
    }
    
    const text = data?.choices?.[0]?.message?.content?.trim();
    return NextResponse.json({ text });
  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json({ text: 'Error generating response: ' + err.message }, { status: 500 });
  }
}
