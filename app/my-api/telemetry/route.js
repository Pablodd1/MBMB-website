import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TELEMETRY_EMAIL = 'telemetry-store@medicalbillingmb.com';

const DEFAULT_STORE = {
  updatedAt: new Date().toISOString(),
  totals: {
    pageViews: 0,
    uniqueSessions: 0,
    ctaClicks: 0,
    phoneClicks: 0,
    emailClicks: 0,
    leadSubmissions: 0,
    scroll50: 0,
    engaged25s: 0,
    calculatorUses: 0,
  },
  audienceSegments: {
    provider: 0,
    attorney: 0,
    general: 0,
  },
  languages: {
    en: 0,
    es: 0,
    other: 0,
  },
  pages: {},
  utmSources: {},
  utmCampaigns: {},
  recentEvents: [],
};

async function loadTelemetryStore(apiKey) {
  if (!apiKey) return structuredClone(DEFAULT_STORE);
  try {
    const res = await fetch(
      `https://api.brevo.com/v3/contacts/${encodeURIComponent(TELEMETRY_EMAIL)}`,
      {
        headers: { 'api-key': apiKey, Accept: 'application/json' },
        cache: 'no-store',
      }
    );
    if (!res.ok) return structuredClone(DEFAULT_STORE);
    const data = await res.json();
    const raw = data?.attributes?.TELEMETRY_JSON;
    if (!raw) return structuredClone(DEFAULT_STORE);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_STORE),
      ...parsed,
      totals: { ...DEFAULT_STORE.totals, ...(parsed.totals || {}) },
      audienceSegments: {
        ...DEFAULT_STORE.audienceSegments,
        ...(parsed.audienceSegments || {}),
      },
      languages: { ...DEFAULT_STORE.languages, ...(parsed.languages || {}) },
    };
  } catch {
    return structuredClone(DEFAULT_STORE);
  }
}

async function saveTelemetryStore(apiKey, store) {
  if (!apiKey) return false;
  try {
    store.updatedAt = new Date().toISOString();
    // Keep recentEvents bounded to 35 compact entries so payload stays fast & compact
    if (Array.isArray(store.recentEvents) && store.recentEvents.length > 35) {
      store.recentEvents = store.recentEvents.slice(0, 35);
    }
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: TELEMETRY_EMAIL,
        updateEnabled: true,
        emailBlacklisted: true, // Never send marketing emails to the telemetry store record
        attributes: {
          FIRSTNAME: 'MBMB',
          LASTNAME: 'TelemetryStore',
          TELEMETRY_JSON: JSON.stringify(store),
        },
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function classifyAudience({ path = '', utmCampaign = '', utmContent = '', referrer = '', explicitAudience = '' }) {
  const combined = `${path} ${utmCampaign} ${utmContent} ${referrer} ${explicitAudience}`.toLowerCase();
  if (
    combined.includes('attorney') ||
    combined.includes('law') ||
    combined.includes('legal') ||
    combined.includes('chronology') ||
    combined.includes('mediation') ||
    combined.includes('pi-')
  ) {
    return 'attorney';
  }
  if (
    combined.includes('provider') ||
    combined.includes('doctor') ||
    combined.includes('clinic') ||
    combined.includes('coding') ||
    combined.includes('credentialing') ||
    combined.includes('rcm') ||
    combined.includes('medicaid') ||
    combined.includes('denial') ||
    combined.includes('consultation')
  ) {
    return 'provider';
  }
  return 'general';
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const eventType = String(body.event || 'page_view').slice(0, 40);
    const path = String(body.path || '/').split('?')[0].slice(0, 100);
    const utmSource = String(body.utm_source || body.source || 'direct').toLowerCase().slice(0, 40);
    const utmMedium = String(body.utm_medium || '').toLowerCase().slice(0, 40);
    const utmCampaign = String(body.utm_campaign || '').toLowerCase().slice(0, 60);
    const lang = String(body.lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
    const isNewSession = Boolean(body.isNewSession);

    // Filter obvious bots/crawlers from polluting human behavioral metrics
    const ua = (req.headers.get('user-agent') || '').toLowerCase();
    if (ua.includes('bot') || ua.includes('spider') || ua.includes('crawler') || ua.includes('headless')) {
      return NextResponse.json({ ok: true, botFiltered: true });
    }

    const audience = classifyAudience({
      path,
      utmCampaign,
      utmContent: body.utm_content || '',
      referrer: body.referrer || '',
      explicitAudience: body.audience || '',
    });

    const apiKey = process.env.BREVO_API_KEY;
    const store = await loadTelemetryStore(apiKey);

    if (eventType === 'page_view') {
      store.totals.pageViews = (store.totals.pageViews || 0) + 1;
      if (isNewSession) {
        store.totals.uniqueSessions = (store.totals.uniqueSessions || 0) + 1;
      }
      store.pages[path] = (store.pages[path] || 0) + 1;
      store.audienceSegments[audience] = (store.audienceSegments[audience] || 0) + 1;
      store.languages[lang] = (store.languages[lang] || 0) + 1;
      if (utmSource) {
        store.utmSources[utmSource] = (store.utmSources[utmSource] || 0) + 1;
      }
      if (utmCampaign) {
        store.utmCampaigns[utmCampaign] = (store.utmCampaigns[utmCampaign] || 0) + 1;
      }
    } else if (eventType === 'cta_click') {
      store.totals.ctaClicks = (store.totals.ctaClicks || 0) + 1;
    } else if (eventType === 'click_phone_call') {
      store.totals.phoneClicks = (store.totals.phoneClicks || 0) + 1;
    } else if (eventType === 'click_email') {
      store.totals.emailClicks = (store.totals.emailClicks || 0) + 1;
    } else if (eventType === 'generate_lead') {
      store.totals.leadSubmissions = (store.totals.leadSubmissions || 0) + 1;
    } else if (eventType === 'scroll_depth_50') {
      store.totals.scroll50 = (store.totals.scroll50 || 0) + 1;
    } else if (eventType === 'engaged_reader_25s') {
      store.totals.engaged25s = (store.totals.engaged25s || 0) + 1;
    } else if (eventType === 'calculator_interaction') {
      store.totals.calculatorUses = (store.totals.calculatorUses || 0) + 1;
    }

    store.recentEvents.unshift({
      t: new Date().toISOString(),
      e: eventType,
      p: path,
      a: audience,
      s: utmSource,
      c: utmCampaign || undefined,
      l: lang,
      label: body.label ? String(body.label).slice(0, 50) : undefined,
    });

    await saveTelemetryStore(apiKey, store);

    return NextResponse.json({
      ok: true,
      detectedAudience: audience,
      detectedLang: lang,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 200 });
  }
}

export async function GET() {
  const apiKey = process.env.BREVO_API_KEY;
  const store = await loadTelemetryStore(apiKey);

  // Determine dominant audience & top pages for dynamic personalization insights
  const sortedPages = Object.entries(store.pages || {}).sort((a, b) => b[1] - a[1]);
  const sortedSources = Object.entries(store.utmSources || {}).sort((a, b) => b[1] - a[1]);

  return NextResponse.json({
    ok: true,
    updatedAt: store.updatedAt,
    totals: store.totals,
    audienceSegments: store.audienceSegments,
    languages: store.languages,
    topPages: sortedPages,
    topSources: sortedSources,
    utmCampaigns: store.utmCampaigns,
    recentEvents: (store.recentEvents || []).slice(0, 20),
  });
}
