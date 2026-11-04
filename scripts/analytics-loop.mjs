/**
 * MBMB Unified Closed-Loop Analytics & Personalization Engine
 * Fetches live telemetry across:
 *   1. Website Behavioral Telemetry (https://medicalbillingmb.com/my-api/telemetry)
 *   2. Email Transactional / Drip Performance (Brevo SMTP 30-day & 7-day stats)
 *   3. Dynamic Site Personalization Rules
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
for (const envFile of ['../.env.local', '../.env']) {
  const envPath = path.resolve(__dirname, envFile);
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split(/\r?\n/)) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = (match[2] || '').replace(/^['"]|['"]$/g, '');
      }
    }
  }
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medicalbillingmb.com';
const BREVO_API_KEY = process.env.BREVO_API_KEY;

async function fetchWebsiteTelemetry() {
  try {
    const res = await fetch(`${SITE_URL}/my-api/telemetry`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return { ok: false, status: res.status };
    return await res.json();
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function fetchBrevoEmailStats() {
  if (!BREVO_API_KEY) return { ok: false, error: 'Missing BREVO_API_KEY in .env.local' };
  try {
    const [res30, res7] = await Promise.all([
      fetch('https://api.brevo.com/v3/smtp/statistics/aggregatedReport?days=30', {
        headers: { 'api-key': BREVO_API_KEY, Accept: 'application/json' },
      }),
      fetch('https://api.brevo.com/v3/smtp/statistics/aggregatedReport?days=7', {
        headers: { 'api-key': BREVO_API_KEY, Accept: 'application/json' },
      }),
    ]);
    return {
      ok: true,
      last30Days: res30.ok ? await res30.json() : null,
      last7Days: res7.ok ? await res7.json() : null,
    };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function main() {
  console.log('======================================================================');
  console.log('📊 MBMB UNIFIED CLOSED-LOOP ANALYTICS & PERSONALIZATION ENGINE');
  console.log(`🕒 Timestamp: ${new Date().toISOString()}`);
  console.log('======================================================================\n');

  const [web, email] = await Promise.all([
    fetchWebsiteTelemetry(),
    fetchBrevoEmailStats(),
  ]);

  // 1. WEBSITE BEHAVIORAL TELEMETRY
  console.log('1️⃣  WEBSITE REAL-TIME TELEMETRY & DYNAMIC PERSONALIZATION');
  console.log('----------------------------------------------------------------------');
  if (web?.ok && web?.totals) {
    const t = web.totals;
    console.log(`  • Last Event Timestamp:   ${web.updatedAt || 'N/A'}`);
    console.log(`  • Page Views / Sessions:  ${t.pageViews || 0} page views | ${t.uniqueSessions || 0} unique sessions`);
    console.log(`  • High-Intent Actions:    ${t.ctaClicks || 0} CTA clicks | ${t.phoneClicks || 0} phone | ${t.emailClicks || 0} email | ${t.leadSubmissions || 0} leads`);
    console.log(`  • Engagement Depth:       ${t.scroll50 || 0} scrolled 50%+ | ${t.engaged25s || 0} 25s+ readers | ${t.calculatorUses || 0} ROI calc uses`);
    console.log(`  • Audience Segments:      Providers: ${web.audienceSegments?.provider || 0} | Attorneys: ${web.audienceSegments?.attorney || 0} | General: ${web.audienceSegments?.general || 0}`);
    console.log(`  • Language Split:         English (EN): ${web.languages?.en || 0} | Español (ES): ${web.languages?.es || 0}`);

    console.log('  • Top Visited Pages:');
    for (const [pagePath, views] of (web.topPages || []).slice(0, 6)) {
      console.log(`      - ${String(pagePath).padEnd(35)} ${views} views`);
    }
  } else {
    console.log(`  ⚠️ Website telemetry endpoint status: ${JSON.stringify(web)}`);
  }

  // 2. EMAIL TELEMETRY (BREVO)
  console.log('\n2️⃣  EMAIL MARKETING & TRANSACTIONAL TELEMETRY (BREVO)');
  console.log('----------------------------------------------------------------------');
  if (email?.ok && email.last30Days) {
    const s30 = email.last30Days;
    const s7 = email.last7Days || {};
    const openRate30 = s30.delivered ? ((s30.uniqueOpens / s30.delivered) * 100).toFixed(1) : '0.0';
    const clickRate30 = s30.delivered ? ((s30.uniqueClicks / s30.delivered) * 100).toFixed(1) : '0.0';
    console.log(`  • Last 30 Days:           ${s30.requests || 0} sent | ${s30.delivered || 0} delivered`);
    console.log(`  • 30-Day Open Rate:       ${openRate30}% (${s30.uniqueOpens || 0} unique / ${s30.opens || 0} total opens)`);
    console.log(`  • 30-Day Click Rate:      ${clickRate30}% (${s30.uniqueClicks || 0} unique / ${s30.clicks || 0} total clicks)`);
    console.log(`  • Last 7 Days Activity:   ${s7.delivered || 0} delivered | ${s7.uniqueOpens || 0} unique opens | ${s7.uniqueClicks || 0} unique clicks`);
    console.log(`  • Bounces / Blocks (30d): ${s30.hardBounces || 0} hard | ${s30.softBounces || 0} soft | ${s30.blocked || 0} blocked`);
  } else {
    console.log(`  ⚠️ Brevo telemetry status: ${email?.error || 'Unavailable'}`);
  }

  // 3. DYNAMIC SITE OPTIMIZATION RULES
  console.log('\n3️⃣  ACTIVE DYNAMIC PERSONALIZATION RULES ON MEDICALBILLINGMB.COM');
  console.log('----------------------------------------------------------------------');
  console.log('  ✅ Rule 1 (Attorney Traffic Detection):');
  console.log('     Visitors arriving via /for-attorneys, ?audience=attorney, or PI/Legal UTMs');
  console.log('     automatically see the "Trial Attorneys & Law Firms" hero, 7-day chronology');
  console.log('     turnaround metrics, and "Launch Free 1-Case Pilot" primary CTA.');
  console.log('  ✅ Rule 2 (Healthcare Provider Default & Switching):');
  console.log('     Physicians & clinic managers see the "Recover 15-30% More Revenue" RCM hero');
  console.log('     with a live interactive Hero Pill Switcher to toggle between Provider & Attorney views.');
  console.log('  ✅ Rule 3 (Bilingual Miami Detection):');
  console.log('     Visitors with Spanish browser locale (es-*) automatically see a direct');
  console.log('     "Atención en Español — Hablar con un Especialista" quick-action bar.');
  console.log('======================================================================\n');
}

main();
