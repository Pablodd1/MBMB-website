import fs from 'fs';
import path from 'path';

const envFile = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
const brevoMatch = envFile.match(/BREVO_API_KEY=["']?([^"'\r\n]+)["']?/);
const BREVO_API_KEY = brevoMatch ? brevoMatch[1].trim() : process.env.BREVO_API_KEY;

if (!BREVO_API_KEY) {
  console.error('Missing BREVO_API_KEY');
  process.exit(1);
}

const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
  'api-key': BREVO_API_KEY,
};

// Authentic 3-sentence plain-text personal note (looks typed by hand from Jasmel's desk/iPhone)
export function buildPersonalPlainTextNote({ firstName, orgName, isAttorney = false }) {
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,';
  if (isAttorney) {
    return {
      subject: orgName ? `Quick question re: ${orgName} medical bill chronologies` : 'Quick question re: injury billing chronologies',
      textContent: `${greeting}

Saw you checked out our page at Medical Billing Miami Beach this week. If your team has a messy Personal Injury file sitting on a desk right now, send us 1 case—our U.S. AAPC coders will turn around a Bates-linked chronology (Excel + PDF) with duplicate CPT charges flagged and EOBs reconciled in 72 hours.

Want me to send over a 1-page redacted sample table first so you can see the exact layout?

Best,
Jasmel Acosta
Medical Billing Miami Beach
(786) 643-2099
https://medicalbillingmb.com/for-attorneys`,
    };
  }

  return {
    subject: orgName ? `20 denied claims test for ${orgName}` : 'Quick question — 20 denied claims test',
    textContent: `${greeting}

Saw you visited Medical Billing Miami Beach recently. Instead of a sales pitch, if you have 20 denied or underpaid claims sitting in your EHR right now, our U.S. AAPC coders will audit them in 48 hours and show you the exact CPT/modifier fix and what you're owed—free.

Are you open to a quick 10-minute call this week, or should I send over the 1-page instructions?

Best,
Jasmel Acosta
Medical Billing Miami Beach
(786) 643-2099
https://medicalbillingmb.com/for-providers`,
  };
}

async function fetchEvents(eventType, limit = 100) {
  const res = await fetch(`https://api.brevo.com/v3/smtp/statistics/events?limit=${limit}&event=${eventType}&days=30`, {
    headers,
  });
  if (!res.ok) {
    console.warn(`Warning fetching ${eventType}:`, res.status, await res.text());
    return [];
  }
  const data = await res.json();
  return data.events || [];
}

async function run() {
  console.log('=== MBMB HOT LEADS RADAR & HUMAN FOLLOW-UP ENGINE (LAST 30 DAYS) ===\n');

  const clickedEvents = await fetchEvents('clicks', 100);
  const openedEvents = await fetchEvents('opened', 100);

  const leadsMap = new Map();

  for (const ev of openedEvents) {
    const email = (ev.email || '').toLowerCase();
    if (!email || email.includes('medicalbillingmb.com') || email.includes('jasmel')) continue;
    if (!leadsMap.has(email)) {
      leadsMap.set(email, { email, opens: 0, clicks: 0, lastSubject: ev.subject, lastDate: ev.date, links: [] });
    }
    const entry = leadsMap.get(email);
    entry.opens += 1;
    if (ev.date > entry.lastDate) entry.lastDate = ev.date;
  }

  for (const ev of clickedEvents) {
    const email = (ev.email || '').toLowerCase();
    if (!email || email.includes('medicalbillingmb.com') || email.includes('jasmel')) continue;
    if (!leadsMap.has(email)) {
      leadsMap.set(email, { email, opens: 0, clicks: 0, lastSubject: ev.subject, lastDate: ev.date, links: [] });
    }
    const entry = leadsMap.get(email);
    entry.clicks += 1;
    if (ev.link && !entry.links.includes(ev.link)) entry.links.push(ev.link);
    if (ev.date > entry.lastDate) entry.lastDate = ev.date;
  }

  const sorted = Array.from(leadsMap.values()).sort((a, b) => {
    if (b.clicks !== a.clicks) return b.clicks - a.clicks;
    return b.opens - a.opens;
  });

  console.log(`Total Engaged Prospects Found: ${sorted.length}`);
  console.log(`Prospects Who Clicked Links: ${sorted.filter((x) => x.clicks > 0).length}`);
  console.log(`Prospects Who Opened Emails: ${sorted.filter((x) => x.opens > 0).length}\n`);

  const topLeads = sorted.slice(0, 15);
  for (const lead of topLeads) {
    try {
      const cRes = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(lead.email)}`, { headers });
      if (cRes.ok) {
        const cData = await cRes.json();
        lead.firstName = cData.attributes?.FIRSTNAME || '';
        lead.lastName = cData.attributes?.LASTNAME || '';
        lead.company = cData.attributes?.COMPANY || cData.attributes?.ORGANIZATION || '';
        lead.phone = cData.attributes?.PHONE || cData.attributes?.SMS || '';
      }
    } catch {}
  }

  console.log('--- TOP ENGAGED LEADS ---');
  topLeads.forEach((l, idx) => {
    console.log(
      `${idx + 1}. ${l.email} | Name: ${l.firstName || '-'} ${l.lastName || '-'} | Org: ${l.company || '-'} | Clicks: ${l.clicks} | Opens: ${l.opens} | Last: ${l.lastDate}`
    );
    if (l.links.length > 0) {
      console.log(`   Links clicked: ${l.links.join(', ')}`);
    }
  });

  // Check if user passed --send-personal-note <email>
  const sendIdx = process.argv.indexOf('--send-personal-note');
  if (sendIdx !== -1 && process.argv[sendIdx + 1]) {
    const targetEmail = process.argv[sendIdx + 1].trim().toLowerCase();
    const matched = topLeads.find((x) => x.email === targetEmail) || { email: targetEmail, firstName: '', company: '' };
    const note = buildPersonalPlainTextNote({
      firstName: matched.firstName,
      orgName: matched.company,
      isAttorney: false,
    });
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sender: { name: 'Jasmel Acosta', email: 'Jasmel@medicalbillingmb.com' },
        to: [{ email: targetEmail }],
        replyTo: { name: 'Jasmel Acosta', email: 'Jasmel@medicalbillingmb.com' },
        subject: note.subject,
        textContent: note.textContent,
      }),
    });
    console.log(`\nSent personal plain-text note to ${targetEmail}: HTTP ${res.status}`);
  } else {
    console.log('\n--- READY-TO-SEND PLAIN-TEXT PERSONAL NOTE PREVIEW ---');
    const sample = buildPersonalPlainTextNote({ firstName: 'Dr.', orgName: 'Your Practice', isAttorney: false });
    console.log(`Subject: ${sample.subject}\n\n${sample.textContent}`);
    console.log('\n(Run `node scripts/hot-leads-sync.mjs --send-personal-note <email>` to send this plain-text personal note to any warm lead.)');
  }
}

run().catch((e) => console.error(e));
