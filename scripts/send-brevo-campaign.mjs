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
const isFollowUp = args.includes('--followup') || !args.includes('--initial');
const checkOnly = args.includes('--status');
const resumePaused = args.includes('--resume');

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

async function printRecentCampaigns() {
  const acc = await brevoRequest('/account');
  const credits = acc?.plan?.[0]?.credits ?? 0;
  console.log(`\n=== Brevo Account Plan: ${acc?.plan?.[0]?.type || 'unknown'} | Daily Credits Remaining Today: ${credits} ===`);

  const data = await brevoRequest('/emailCampaigns?limit=6&sort=desc');
  const campaigns = data?.campaigns || [];
  console.log('=== Recent Brevo Email Campaigns ===');
  for (const c of campaigns) {
    const detail = await brevoRequest(`/emailCampaigns/${c.id}`);
    const cs = detail.statistics?.campaignStats || [];
    const tot = cs.reduce(
      (a, x) => ({
        sent: a.sent + x.sent,
        delivered: a.delivered + x.delivered,
        uniqueViews: a.uniqueViews + x.uniqueViews,
        clickers: a.clickers + x.clickers,
        uniqueClicks: a.uniqueClicks + x.uniqueClicks,
      }),
      { sent: 0, delivered: 0, uniqueViews: 0, clickers: 0, uniqueClicks: 0 }
    );
    console.log(
      `#${c.id} [${detail.status}] (Remaining: ${detail.statistics?.remaining ?? 0}) "${c.name}" | Sent: ${tot.sent}, Delivered: ${tot.delivered}, Unique Opens: ${tot.uniqueViews}, Clicks: ${tot.clickers} (${tot.uniqueClicks} unique)`
    );
  }
  return { credits, campaigns };
}

async function resumeSuspendedCampaigns(campaignIds = [233, 234]) {
  const acc = await brevoRequest('/account');
  const credits = acc?.plan?.[0]?.credits ?? 0;
  if (credits <= 0) {
    console.log(`\nNo daily credits remaining right now (credits=${credits}). Will resume after next daily reset.`);
    return;
  }
  for (const id of campaignIds) {
    const detail = await brevoRequest(`/emailCampaigns/${id}`);
    const remaining = detail?.statistics?.remaining ?? 0;
    if (detail.status === 'suspended' && remaining > 0) {
      console.log(`\nResuming suspended Campaign #${id} ("${detail.name}", remaining=${remaining}) with ${credits} available daily credits...`);
      await brevoRequest(`/emailCampaigns/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: 'queued' }),
      });
      await brevoRequest(`/emailCampaigns/${id}/sendNow`, {
        method: 'POST',
      });
      console.log(`  -> Triggered today's batch for Campaign #${id}!`);
      break;
    }
  }
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
  await printRecentCampaigns();
  if (resumePaused) {
    await resumeSuspendedCampaigns([233, 234]);
    return;
  }
  if (checkOnly) return;

  const sender = await resolveSender();
  const listIds = await resolveTargetLists();
  const today = new Date().toISOString().slice(0, 10);

  const campaignsToRun = [];

  if (campaignArg === 'attorney' || campaignArg === 'both') {
    if (isFollowUp) {
      campaignsToRun.push({
        name: `MBMB Attorney Follow-Up #2: Case Roll-Up & Duplicate Detection (EN/ES) - ${today}`,
        subject:
          'Following Up: Before Your Next Demand or Mediation — Source-Linked Medical Bill Chronologies (Excel + PDF)',
        previewText:
          'See how our U.S. AAPC-certified coders catch duplicate lines and reconcile CMS-1500/UB-04 & EOB ledgers in 3–5 days.',
        templateFile: 'brevo-attorney-followup-en-es.html',
      });
    } else {
      campaignsToRun.push({
        name: `MBMB Attorney Forensic & Chronology Pilot (EN/ES) - ${today}`,
        subject:
          'Complimentary 1-Case Pilot: Medical Billing Chronologies & Forensic EOB Reconciliation | Piloto Gratuito',
        previewText:
          'AAPC-certified coders + AI double-check for Florida PI, Med-Mal, and Healthcare attorneys (English & Español).',
        templateFile: 'brevo-attorney-pilot-en-es.html',
      });
    }
  }

  if (campaignArg === 'provider' || campaignArg === 'both') {
    if (isFollowUp) {
      campaignsToRun.push({
        name: `MBMB Provider Follow-Up #2: 3 Quiet Revenue Leaks & 90-Day Benchmark (EN/ES) - ${today}`,
        subject:
          'Following Up: The 3 Quiet Billing Leaks Costing South Florida Clinics 12%–18% (+ 90-Day Case Study)',
        previewText:
          'How a 4-provider Miami Beach practice cut denials from 18% to 2.4% (+27% collections) inside their existing EHR.',
        templateFile: 'brevo-provider-followup-en-es.html',
      });
    } else {
      campaignsToRun.push({
        name: `MBMB Healthcare Provider Audit & AI Double-Check (EN/ES) - ${today}`,
        subject:
          'Human AAPC Coders + AI Pre-Submission Scrubbing: Complimentary 20-Claim Audit | Auditoría Gratuita',
        previewText:
          'Catch CPT/ICD-10, modifier, and NCCI bundling errors before claims go out (English & Español).',
        templateFile: 'brevo-provider-audit-en-es.html',
      });
    }
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
