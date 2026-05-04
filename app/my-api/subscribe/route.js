import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;

export async function POST(req) {
  try {
    const body = await req.json();
    const email = typeof body === 'string' ? body : body.email;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    // Add to Brevo contact list if API key is set
    if (BREVO_API_KEY) {
      try {
        await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY
          },
          body: JSON.stringify({
            email,
            emailBlacklisted: false,
            smsBlacklisted: false,
            attributes: {
              SOURCE: 'MBMB Website Subscribe'
            },
            listIds: []
          })
        });
      } catch (brevoErr) {
        console.warn('Brevo contact add warning:', brevoErr.message);
      }
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
