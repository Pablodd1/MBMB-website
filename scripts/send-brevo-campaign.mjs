import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

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
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

loadEnvFile(path.resolve(process.cwd(), '.env.local'));
loadEnvFile(path.resolve(process.cwd(), '.env'));
loadEnvFile(path.join(os.homedir(), '.env'));

const BREVO_API_KEY = process.env.BREVO_API_KEY;
if (!BREVO_API_KEY) {
  console.error('ERROR: BREVO_API_KEY is not set in .env.local or ~/.env');
  process.exit(1);
}

const args = process.argv.slice(2);
const campaignArg = (args.find((a) => a.startsWith('--type='))?.split('=')[1] || 'both').toLowerCase();
const listIdArg = args.find((a) => a.startsWith('--list='))?.split('=')[1] || process.env.BREVO_LIST_ID;
const dryRun = args.includes('--dry-run');

async function brevoRequest(endpoint, options = {}) {
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
    throw new Error(`Brevo API ${endpoint} failed (${res.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

async function resolveSender() {
  const sendersData = await brevoRequest('/senders');
  const activeSenders = (sendersData?.senders || []).filter((s) => s.active);
  const preferredEmail = process.env.BREVO_SENDER_EMAIL || 'jasmel@medicalbillingmb.com';
  const match =
    activeSenders.find((s) => s.email.toLowerCase() === preferredEmail.toLowerCase()) ||
    activeSenders[0];

  if (!match) {
    throw new Error(
      'No active verified sender found in your Brevo account. Please verify a sender email in Brevo > Senders & IP.'
    );
  }
  return {
    name: process.env.BREVO_SENDER_NAME || 'Jasmel — Medical Billing Miami Beach (MBMB)',
    email: match.email,
  };
}

async function resolveTargetLists() {
  const listsData = await brevoRequest('/contacts/lists?limit=50&offset=0');
  const lists = listsData?.lists || [];
  console.log(
    'Available Brevo Lists:',
    lists.map((l) => `#${l.id} "${l.name}" (${l.uniqueSubscribers ?? l.totalSubscribers ?? 0} subscribers)`).join(', ') || 'None'
  );

  if (listIdArg) {
    const parsedIds = listIdArg
      .split(',')
      .map((x) => Number(x.trim()))
      .filter((n) => !Number.isNaN(n) && n > 0);
    if (parsedIds.length > 0) return parsedIds;
  }

  // Prefer all lists with MBMB in the name that have subscribers
  const mbmbPopulated = lists.filter(
    (l) => /mbmb/i.test(l.name) && (l.uniqueSubscribers || l.totalSubscribers || 0) > 0
  );
  if (mbmbPopulated.length > 0) {
    return mbmbPopulated.map((l) => l.id);
  }

  const populated = lists.filter((l) => (l.uniqueSubscribers || l.totalSubscribers || 0) > 0);
  if (populated.length > 0) {
    return populated.map((l) => l.id);
  }
  if (lists.length > 0) {
    return [lists[0].id];
  }
  throw new Error('No contact lists found in Brevo account.');
}

async function createAndSendCampaign({ name, subject, previewText, templateFile, sender, listIds }) {
  const htmlPath = path.resolve(process.cwd(), 'public', 'email-templates', templateFile);
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  console.log(`\nCreating campaign: "${name}"...`);
  console.log(`  Sender: ${sender.name} <${sender.email}>`);
  console.log(`  Target List IDs: [${listIds.join(', ')}]`);

  const created = await brevoRequest('/emailCampaigns', {
    method: 'POST',
    body: JSON.stringify({
      name,
      subject,
      previewText,
      sender: { name: sender.name, email: sender.email },
      type: 'classic',
      htmlContent,
      recipients: { listIds },
      replyTo: sender.email,
    }),
  });

  const campaignId = created.id;
  console.log(`  Created Brevo Campaign ID: ${campaignId}`);

  if (dryRun) {
    console.log(`  [DRY RUN] Skipping sendNow for Campaign ID ${campaignId}.`);
    return { campaignId, status: 'draft' };
  }

  console.log(`  Sending Campaign ID ${campaignId} to list(s) [${listIds.join(', ')}] now...`);
  await brevoRequest(`/emailCampaigns/${campaignId}/sendNow`, {
    method: 'POST',
  });
  console.log(`  SUCCESS: Campaign ID ${campaignId} queued for immediate delivery!`);
  return { campaignId, status: 'sent' };
}

async function main() {
  const sender = await resolveSender();
  const listIds = await resolveTargetLists();

  const campaignsToRun = [];

  if (campaignArg === 'attorney' || campaignArg === 'both') {
    campaignsToRun.push({
      name: `MBMB Attorney Forensic & Chronology Pilot (EN/ES) - ${new Date().toISOString().slice(0, 10)}`,
      subject:
        'Complimentary 1-Case Pilot: Medical Billing Chronologies & Forensic EOB Reconciliation | Piloto Gratuito',
      previewText:
        'AAPC-certified coders + AI double-check for Florida PI, Med-Mal, and Healthcare attorneys (English & Español).',
      templateFile: 'brevo-attorney-pilot-en-es.html',
    });
  }

  if (campaignArg === 'provider' || campaignArg === 'both') {
    campaignsToRun.push({
      name: `MBMB Healthcare Provider Audit & AI Double-Check (EN/ES) - ${new Date().toISOString().slice(0, 10)}`,
      subject:
        'Human AAPC Coders + AI Pre-Submission Scrubbing: Complimentary 20-Claim Audit | Auditoría Gratuita',
      previewText:
        'Catch CPT/ICD-10, modifier, and NCCI bundling errors before claims go out (English & Español).',
      templateFile: 'brevo-provider-audit-en-es.html',
    });
  }

  const results = [];
  for (const camp of campaignsToRun) {
    const res = await createAndSendCampaign({
      ...camp,
      sender,
      listIds,
    });
    results.push({ name: camp.name, ...res });
  }

  console.log('\n=== Summary ===');
  for (const r of results) {
    console.log(`- ${r.name}: Campaign #${r.campaignId} (${r.status})`);
  }
}

main().catch((err) => {
  console.error('\nCampaign execution failed:', err.message);
  process.exit(1);
});
