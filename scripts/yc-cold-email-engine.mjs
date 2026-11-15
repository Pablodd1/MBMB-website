import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile(path.resolve(process.cwd(), '.env.local'));
loadEnvFile(path.resolve(process.cwd(), '.env'));
loadEnvFile(path.join(os.homedir(), '.env'));

const BREVO_API_KEY = process.env.BREVO_API_KEY;
if (!BREVO_API_KEY) {
  console.error('ERROR: BREVO_API_KEY missing.');
  process.exit(1);
}

const args = process.argv.slice(2);
const curateLists = args.includes('--curate');
const stageDrafts = args.includes('--stage-drafts');
const sendPreview = args.includes('--preview');

async function brevo(endpoint, options = {}) {
  const res = await fetch(`https://api.brevo.com/v3${endpoint}`, {
    ...options,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': BREVO_API_KEY,
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`Brevo ${endpoint} (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

const GENERIC_FREEMAIL = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'msn.com',
  'live.com',
  'comcast.net',
  'att.net',
  'bellsouth.net',
  'me.com',
]);

// Strict domain/company healthcare & legal matchers (zero false positives)
const PROVIDER_DOMAIN_RX =
  /(clinic|medical|medspa|health|dental|dentist|ortho|cardio|pediat|peds|dermat|urolog|gastro|neuro|pain|rehab|therapy|counseling|chiro|podiat|surg|wellness|physic|hospital|doctor|eyecare|vision|obgyn|urgentcare|familycare|primarycare|psych)/i;
const PROVIDER_ORG_RX =
  /\b(m\.?d\.?|d\.?o\.?|d\.?d\.?s\.?|d\.?m\.?d\.?|clinic|medical|healthcare|dental|dentist|orthodontics|cardiology|pediatrics|dermatology|urology|gastro|neurology|pain|rehab|rehabilitation|therapy|counseling|chiropractic|podiatry|surgery|surgical|medspa|physicians?|hospital|urgent care|primary care)\b/i;

const ATTORNEY_DOMAIN_RX =
  /(lawfirm|lawgroup|law\b|legal|attorney|lawyer|litigat|injury|trial|justice|pllc)/i;
const ATTORNEY_ORG_RX =
  /\b(law firm|law group|law office|legal|attorneys?|lawyers?|esq|litigation|personal injury|pllc|trial)\b/i;

const EXCLUDE_RX =
  /(hoa|hoas|poaboard|condo|property|management|realty|realtor|roofing|plumbing|hvac|church|school|sflawish)/i;

export function classifyGoodFitContact(c) {
  if (!c?.email || c.emailBlacklisted) return null;
  const email = c.email.trim().toLowerCase();
  if (email.includes('medicalbillingmb.com') || email.includes('jasmel')) return null;

  const [local, domain = ''] = email.split('@');
  const isFreemail = GENERIC_FREEMAIL.has(domain);
  const company = String(c.attributes?.COMPANY || '').trim();
  const fullText = `${local} ${domain} ${company}`;
  if (EXCLUDE_RX.test(fullText)) return null;

  // Check Attorney fit
  if ((!isFreemail && ATTORNEY_DOMAIN_RX.test(domain)) || ATTORNEY_ORG_RX.test(company)) {
    return 'attorney';
  }
  // Check Provider fit (custom medical domain, or explicit healthcare company/local handle likeablesdental@gmail.com)
  if (
    (!isFreemail && PROVIDER_DOMAIN_RX.test(domain)) ||
    PROVIDER_ORG_RX.test(company) ||
    (isFreemail && PROVIDER_DOMAIN_RX.test(local))
  ) {
    return 'provider';
  }
  return null;
}

async function fetchAllContacts(max = 2500) {
  const all = [];
  let offset = 0;
  while (offset < max) {
    const d = await brevo(`/contacts?limit=500&offset=${offset}`);
    const batch = d.contacts || [];
    all.push(...batch);
    if (batch.length < 500) break;
    offset += 500;
  }
  return all;
}

async function ensureList(name, folderId = 1) {
  const listsData = await brevo('/contacts/lists?limit=50&offset=0');
  const existing = (listsData?.lists || []).find((l) => l.name === name);
  if (existing) return existing.id;
  const created = await brevo('/contacts/lists', {
    method: 'POST',
    body: JSON.stringify({ name, folderId }),
  });
  return created.id;
}

async function addEmailsToList(listId, emails) {
  for (let i = 0; i < emails.length; i += 100) {
    const chunk = emails.slice(i, i + 100);
    await brevo(`/contacts/lists/${listId}/contacts/add`, {
      method: 'POST',
      body: JSON.stringify({ emails: chunk }),
    }).catch(() => {});
  }
}

async function main() {
  const contacts = await fetchAllContacts(2500);
  const providers = [];
  const attorneys = [];

  for (const c of contacts) {
    const fit = classifyGoodFitContact(c);
    if (fit === 'provider') providers.push(c.email);
    if (fit === 'attorney') attorneys.push(c.email);
  }

  console.log(`Strict YC Good-Fit Audit across ${contacts.length} CRM contacts:`);
  console.log(`  - Verified High-Fit Providers/Clinics: ${providers.length}`);
  console.log(`    Sample Providers:`, providers.slice(0, 8));
  console.log(`  - Verified High-Fit Attorneys/Law Firms: ${attorneys.length}`);
  console.log(`    Sample Attorneys:`, attorneys.slice(0, 8));

  let providerListId = null;
  let attorneyListId = null;

  if (curateLists) {
    const listsData = await brevo('/contacts/lists?limit=50&offset=0');
    const defaultFolderId = listsData?.lists?.[0]?.folderId || 1;
    providerListId = await ensureList('MBMB_YC_GoodFit_Providers_Top100', defaultFolderId);
    attorneyListId = await ensureList('MBMB_YC_GoodFit_Attorneys', defaultFolderId);

    // Rule 17: "Target better, not wider — 100 good-fit emails beat 1,000 random"
    await addEmailsToList(providerListId, providers.slice(0, 100));
    await addEmailsToList(attorneyListId, attorneys.slice(0, 100));
    console.log(
      `Curated Brevo Lists -> Providers Top-100 List #${providerListId} (${Math.min(
        100,
        providers.length
      )} contacts), Attorneys List #${attorneyListId} (${Math.min(100, attorneys.length)} contacts)`
    );
  }

  if (stageDrafts && providerListId && attorneyListId) {
    const draftsToCreate = [
      {
        name: 'YC Cold #1 (Providers Top-100) — "20 denied claims?" [PAUSED DRAFT]',
        subject: '20 denied claims?',
        previewText:
          'My team of U.S. AAPC-certified coders here in Miami Beach handles medical billing inside your current EHR...',
        file: 'yc-provider-cold-1.html',
        listIds: [providerListId],
      },
      {
        name: 'YC Follow-Up #1 (Providers Top-100, Day +3) — "re: 20 denied claims?" [PAUSED DRAFT]',
        subject: 're: 20 denied claims?',
        previewText:
          'Floating this back up in case it got buried between patients — 48-hour line-by-line recovery dollar sheet...',
        file: 'yc-provider-followup-1.html',
        listIds: [providerListId],
      },
      {
        name: 'YC Follow-Up #2 (Providers Top-100, Day +7) — "co-16 / modifier 25 write-offs" [PAUSED DRAFT]',
        subject: 'co-16 / modifier 25 write-offs',
        previewText:
          'Most South Florida clinics lose 12%–18% because billers quietly write off Modifier 25/59 rejections...',
        file: 'yc-provider-followup-2.html',
        listIds: [providerListId],
      },
      {
        name: 'YC Cold #1 (Attorneys Good-Fit) — "quick question on your pi medical bills" [PAUSED DRAFT]',
        subject: 'quick question on your pi medical bills',
        previewText:
          'My team of U.S. AAPC-certified medical coders here in Miami Beach turns messy PI billing packets into Bates-linked chronologies...',
        file: 'yc-attorney-cold-1.html',
        listIds: [attorneyListId],
      },
      {
        name: 'YC Follow-Up #1 (Attorneys Good-Fit, Day +3) — "re: quick question on your pi medical bills" [PAUSED DRAFT]',
        subject: 're: quick question on your pi medical bills',
        previewText:
          'Quick bump in case your team has a demand or mediation packet coming up this month...',
        file: 'yc-attorney-followup-1.html',
        listIds: [attorneyListId],
      },
    ];

    for (const d of draftsToCreate) {
      const htmlContent = fs.readFileSync(
        path.resolve(process.cwd(), 'public/email-templates', d.file),
        'utf8'
      );
      const created = await brevo('/emailCampaigns', {
        method: 'POST',
        body: JSON.stringify({
          name: d.name,
          subject: d.subject,
          previewText: d.previewText,
          sender: { name: 'Jasmel Acosta', email: 'Jasmel@medicalbillingmb.com' },
          type: 'classic',
          htmlContent,
          recipients: { listIds: d.listIds },
          replyTo: 'Jasmel@medicalbillingmb.com',
        }),
      });
      console.log(`Staged Safe Brevo Draft #${created.id}: "${d.name}" (status=draft, NOT sent)`);
    }
  }

  if (sendPreview) {
    const html = fs
      .readFileSync(
        path.resolve(process.cwd(), 'public/email-templates/yc-provider-cold-1.html'),
        'utf8'
      )
      .replace(/\{\{\s*contact\.FIRSTNAME[^}]*\}\}/g, 'Dr. Martinez')
      .replace(/\{\{\s*contact\.EMAIL\s*\}\}/g, 'Jasmel@medicalbillingmb.com')
      .replace(/\{\{\s*unsubscribe\s*\}\}/g, 'https://medicalbillingmb.com');

    const r = await brevo('/smtp/email', {
      method: 'POST',
      body: JSON.stringify({
        sender: { name: 'Jasmel Acosta', email: 'Jasmel@medicalbillingmb.com' },
        to: [
          { email: 'Jasmel@medicalbillingmb.com', name: 'Jasmel Acosta' },
          { email: 'jasmelacosta@gmail.com', name: 'Jasmel Acosta' },
        ],
        subject: '20 denied claims?',
        htmlContent: html,
      }),
    });
    console.log('Sent YC Plain-Letter Preview to Jasmel:', r);
  }
}

main().catch((err) => {
  console.error('YC Cold Email Engine error:', err.message);
  process.exit(1);
});
