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

const CONTENT360_API_KEY = process.env.CONTENT360_API_KEY;
const CONTENT360_WORKSPACE = process.env.CONTENT360_WORKSPACE || 'a53f2350-fe13-4582-b4d6-a7031ca92838';

if (!CONTENT360_API_KEY) {
  console.error('ERROR: CONTENT360_API_KEY is not set in .env.local');
  process.exit(1);
}

// All 3 Active Authorized MBMB Accounts in Content360:
// 219359 = Instagram Direct: @medicalbillingmiami
// 143488 = Facebook Page: Miami Beach Medical Billing (@MiamiBeachmb)
// 143486 = Google Business Profile: Medical Billing Miami Beach
const MBMB_ALL_ACCOUNT_IDS = [219359, 143488, 143486];

const WEEKLY_STYLE2_POSTS = [
  {
    key: 'week2-nov10',
    title: 'Week 2 (Publish Today): 48-Hour Denial Recovery Scorecard + 20-Claim Free Proof Test',
    schedule: 'now',
    scheduledAt: null,
    mediaId: 2895055,
    imageUrl: 'https://medicalbillingmb.com/raster/social/style2-week2-denial-recovery.jpg',
    altText: '48-Hour Denial Recovery Scorecard — Medical Billing Miami Beach',
    ctaUrl: 'https://medicalbillingmb.com/for-providers?utm_source=content360&utm_medium=social&utm_campaign=weekly_style2_w2',
    body: `Show Us 20 Denied Claims. We’ll Show You the Exact Money You’re Owed in 48 Hours—Free.

Most Florida practices lose 12%–18% of their collections because billers write off CO-16, CO-50, and Modifier 25/59 rejections instead of fighting them.

48-HOUR DENIAL RECOVERY SCORECARD:
• Industry Average: Up to 65% of denied claims go unworked | 30–60 day appeal lag | Silent write-offs
• With MBMB: 100% of CO, PR & OA denials investigated | Under 48-hour clinical appeals | 98.4% clean claims

Our U.S. AAPC coders scrub and appeal every claim inside your existing EHR—and you only pay 5.6%–10% of what actually hits your bank account ($0 setup).

Request your free 48-hour 20-claim audit & 2026 rate sheet:
https://medicalbillingmb.com/for-providers?utm_source=content360&utm_medium=social&utm_campaign=weekly_style2_w2
📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com

#DenialManagement #MedicalBillingMiami #MiamiHealthcare #PrivatePractice #MedicalCoding #SouthFloridaDoctors`,
  },
  {
    key: 'week3-nov16',
    uuid: 'f66149a1-5756-4e27-a754-4bfecc02d9ce',
    title: 'Week 3 (Nov 16): Florida Trial Attorney Billing & Chronology Scorecard (1-Case Pilot)',
    schedule: 'scheduled',
    scheduledAt: '2026-11-16 10:00',
    mediaId: 2895056,
    imageUrl: 'https://medicalbillingmb.com/raster/social/style2-week3-attorney-chronology.jpg',
    altText: 'Florida Trial Attorney Medical Billing Chronology & EOB Reconciliation Scorecard',
    ctaUrl: 'https://medicalbillingmb.com/for-attorneys?utm_source=content360&utm_medium=social&utm_campaign=weekly_style2_w3',
    body: `Don’t Walk Into Mediation With Unreconciled Medical Ledgers.

Defense adjusters love raw medical bills: duplicate CPT charges, unbundled facility fees, and messy EOBs give them an excuse to slash your demand.

FLORIDA TRIAL ATTORNEY BILLING SCORECARD:
• Raw Medical Bills: Unflagged duplicate CPT charges | Unreconciled EOBs | 15+ paralegal hours per demand
• MBMB 1-Case Pilot: Exact PDF & page citations | Full Charge-to-Balance table (Excel + PDF) | 3–5 business day turnaround

Our U.S. AAPC-certified coders reconcile every CMS-1500, UB-04, and EOB adjustment into a clean, source-linked chronology and Charge-to-Balance table.

Download a sample deliverable or test us on 1 active case file:
https://medicalbillingmb.com/for-attorneys?utm_source=content360&utm_medium=social&utm_campaign=weekly_style2_w3
📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com

#FloridaTrialLawyers #PersonalInjuryLaw #MedMal #LitigationSupport #Paralegal #MiamiLawFirms`,
  },
  {
    key: 'week4-nov23',
    uuid: 'c49d1d16-f5cc-4955-9ee6-85b370071b97',
    title: 'Week 4 (Nov 23): Florida Payer Credentialing Scorecard (Medicare PECOS, AHCA & Commercial)',
    schedule: 'scheduled',
    scheduledAt: '2026-11-23 10:00',
    mediaId: 2895057,
    imageUrl: 'https://medicalbillingmb.com/raster/social/style2-week4-credentialing-scorecard.jpg',
    altText: 'Florida Provider Credentialing Scorecard — Medicare PECOS, AHCA Medicaid & Commercial Payers',
    ctaUrl: 'https://medicalbillingmb.com/services/credentialing?utm_source=content360&utm_medium=social&utm_campaign=weekly_style2_w4',
    body: `Adding a Physician, NP, or PA in Florida? Don’t Let Credentialing Holds Freeze Your Cash Flow for 90 Days.

FLORIDA PAYER CREDENTIALING SCORECARD:
• DIY Enrollment: 90–120 day cash-flow freeze | Lapsed CAQH ProView holds | Missing ERA/EFT linkage
• MBMB Enrollment: Fast-track Medicare PECOS (First Coast — FCSO), Florida Medicaid (AHCA/MMA) & Commercial setup | Quarterly CAQH re-attestations managed

Whether you are launching a new South Florida clinic or onboarding a new provider, we handle NPI Type 1/2, CAQH ProView, and EDI/ERA linkage from day one.

https://medicalbillingmb.com/services/credentialing?utm_source=content360&utm_medium=social&utm_campaign=weekly_style2_w4
📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com

#ProviderCredentialing #CAQH #FloridaMedicaid #MedicarePECOS #ClinicOwners #MiamiMedicine`,
  },
  {
    key: 'week5-nov30',
    uuid: '87afcb68-f3f8-4a38-8d25-eba8f370e246',
    title: 'Week 5 (Nov 30): Transparent Collection Tiers Scorecard (5.6%–10% | $0 Setup Fee)',
    schedule: 'scheduled',
    scheduledAt: '2026-11-30 10:00',
    mediaId: 2895059,
    imageUrl: 'https://medicalbillingmb.com/raster/social/style2-week5-transparent-pricing.jpg',
    altText: 'Transparent Medical Billing Collection Tiers — 5.6% to 10% with $0 Setup Fee',
    ctaUrl: 'https://medicalbillingmb.com/consultation?utm_source=content360&utm_medium=social&utm_campaign=weekly_style2_w5',
    body: `Stop Paying Billing Agencies That Write Off Your Hardest Claims. You Only Pay When Money Hits Your Bank Account.

TRANSPARENT COLLECTION TIERS ($0 SETUP FEE):
• $50,000+ / mo Collected → 5.6% Rate
• $40,000–$50,000 / mo → 6.5% Rate
• $20,000–$40,000 / mo → 7.5% Rate
• New & Launching Clinics (Under $20k/mo) → 10.0% Rate

We work directly inside eClinicalWorks, Athenahealth, Tebra/Kareo, Epic, AdvancedMD, NextGen, DrChrono, and 25+ EHRs with zero migration cost. Bilingual coordination in Miami Beach (English & Español).

Book a 15-minute call or request your free 20-Claim Audit:
https://medicalbillingmb.com/consultation?utm_source=content360&utm_medium=social&utm_campaign=weekly_style2_w5
📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com

#MedicalBillingMiamiBeach #MBMB #TransparentPricing #SouthFloridaHealthcare #DoctorLife #MiamiBeach`,
  },
  {
    key: 'week6-dec07',
    uuid: '25579388-f975-483d-a54c-14ffce14b991',
    title: 'Week 6 (Dec 7): 90-Day Miami Practice Benchmark Scorecard (18.0% to 2.4% Denial Rate)',
    schedule: 'scheduled',
    scheduledAt: '2026-12-07 10:00',
    mediaId: 2895060,
    imageUrl: 'https://medicalbillingmb.com/raster/social/style2-week1-90day-benchmark.jpg',
    altText: '90-Day Miami Practice Benchmark — 18.0% to 2.4% Denial Rate',
    ctaUrl: 'https://medicalbillingmb.com/for-providers?utm_source=content360&utm_medium=social&utm_campaign=weekly_style2_w6',
    body: `90-DAY MIAMI PRACTICE BENCHMARK (4-Provider Clinic):

• Before MBMB: 18.0% Denial Rate | -$127,000/yr Preventable Revenue Leakage
• With MBMB: 2.4% Denial Rate (98.4% Clean Claims) | +$142,000 Net Annualized Recovery
• Zero EHR Migration ($0 Setup Fee)

Every encounter is verified by U.S. AAPC-certified coders first and an AI pre-submission double-check second—directly inside your existing EHR.

Find out how much earned revenue is sitting in your 60+ day A/R with a complimentary 20-claim proof test:
https://medicalbillingmb.com/for-providers?utm_source=content360&utm_medium=social&utm_campaign=weekly_style2_w6
📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com

#MedicalBillingMiami #HealthcareROI #PracticeManagement #MiamiDoctors #AAPCCertified #RCM`,
  },
];

async function content360MCP(toolName, args = {}) {
  const res = await fetch('https://app.content360.io/os/mcp', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CONTENT360_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: {
          workspace: CONTENT360_WORKSPACE,
          timezone: 'America/New_York',
          ...args,
        },
      },
    }),
  });

  const json = await res.json();
  const text = json?.result?.content?.[0]?.text;
  let parsed = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }
  return { raw: json, data: parsed, isError: json?.result?.isError || false };
}

async function fetchRawPost(uuid) {
  const r = await fetch(`https://app.content360.io/os/api/${CONTENT360_WORKSPACE}/posts/${uuid}`, {
    headers: {
      Authorization: `Bearer ${CONTENT360_API_KEY}`,
      Accept: 'application/json',
    },
  });
  return r.json();
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args.includes('--activate-all') ? 'activate-all' : 'status';

  console.log(`\n=== Content360 MCP Status (Workspace: ${CONTENT360_WORKSPACE}) ===`);
  const accountsRes = await content360MCP('list-accounts-tool');
  const accounts = accountsRes.data?.accounts || [];
  console.log(`\nConnected Social Accounts (${accounts.length}):`);
  for (const acc of accounts) {
    console.log(
      `- [ID: ${acc.id}] ${acc.provider.toUpperCase()} | ${acc.name} (${acc.username ? '@' + acc.username : 'Business Profile'}) | Authorized: ${acc.authorized ? '✅ YES' : '⚠️ NO'}`
    );
  }

  if (mode === 'activate-all') {
    // 1. Publish Today's Week 2 Scorecard NOW to newly connected Instagram (@medicalbillingmiami, 219359) + Google Business (143486)
    // (Facebook 143488 already published Week 2 live at https://facebook.com/120489827650831_1065615623159996)
    const w2 = WEEKLY_STYLE2_POSTS[0];
    console.log(`\n=== 1. Publishing Today's Week 2 Scorecard NOW to Instagram (219359) & Google Business (143486) ===`);
    const draftRes = await content360MCP('create-post-tool', {
      account_ids: [219359, 143486],
      schedule: 'draft',
      content: w2.body,
    });
    const w2Uuid = draftRes.data?.post?.uuid;
    if (w2Uuid) {
      const rawW2 = await fetchRawPost(w2Uuid);
      const nativeOptions = rawW2.versions?.[0]?.options || {};
      await content360MCP('update-post-version-tool', {
        uuid: w2Uuid,
        account_id: 0,
        content: [
          {
            body: w2.body,
            media: [w2.mediaId],
            url: w2.ctaUrl,
          },
        ],
        options: nativeOptions,
      });
      const pubRes = await content360MCP('schedule-post-tool', {
        uuid: w2Uuid,
        post_now: true,
      });
      console.log(`  PUBLISHED NOW -> UUID: ${w2Uuid} | Result:`, JSON.stringify(pubRes.data));
    }

    // 2. Attach Instagram (219359) + Facebook (143488) + Google Business (143486) to all 4 upcoming Monday scheduled posts
    console.log(`\n=== 2. Attaching Instagram (@medicalbillingmiami, 219359) + FB (143488) + GBP (143486) to All 4 Scheduled Monday Posts ===`);
    for (const item of WEEKLY_STYLE2_POSTS.slice(1)) {
      const rawPost = await fetchRawPost(item.uuid);
      const nativeOptions = rawPost.versions?.[0]?.options || {};
      const upd = await content360MCP('update-post-tool', {
        uuid: item.uuid,
        account_ids: MBMB_ALL_ACCOUNT_IDS,
        versions: [
          {
            account_id: 0,
            content: [
              {
                body: item.body,
                media: [item.mediaId],
                url: item.ctaUrl,
              },
            ],
            options: nativeOptions,
          },
        ],
      });
      console.log(`  SYNCED ${item.key} (${item.uuid}) -> Accounts: [IG 219359, FB 143488, GBP 143486] | Error: ${upd.isError}`);
    }

    // 3. Also update all 7 reserve drafts to include Instagram (219359) + FB (143488) + GBP (143486)
    console.log(`\n=== 3. Updating 7 Repaired Reserve Drafts to Target [IG 219359, FB 143488, GBP 143486] ===`);
    const draftUuids = [
      'e58aa22c-13c2-49b4-ac37-6f73dffb0da4',
      '6f881d19-504d-4c6f-a0ee-2b9bb34d953b',
      'e71bc587-5e52-48ed-9143-dc236ce68000',
      'c385cce8-c312-4f34-bd8f-dad2c8ddd529',
      '0e797921-16e9-424c-9e52-f26169955a74',
      '898f09f9-133b-4a71-bdd4-94fece963ca4',
      'b60c3abb-20fe-478b-9b71-d53f0ff55d4c',
    ];
    for (const uuid of draftUuids) {
      const upd = await content360MCP('update-post-tool', {
        uuid,
        account_ids: MBMB_ALL_ACCOUNT_IDS,
      });
      console.log(`  UPDATED Draft ${uuid} -> [IG 219359, FB 143488, GBP 143486] | Error: ${upd.isError}`);
    }
  }

  const postsRes = await content360MCP('list-posts-tool');
  const posts = postsRes.data?.posts || [];
  console.log(`\n=== Current Posts in Content360 (${posts.length}) ===`);
  for (const p of posts) {
    const body = p.content || '';
    const firstLine = body.split('\n')[0].slice(0, 68);
    const accNames = (p.accounts || []).map((a) => a.provider).join(', ') || 'None';
    console.log(
      `- [${p.status.toUpperCase()}] ${p.uuid} | Due: ${p.scheduled_at || 'Draft'} | Media: ${p.media_count} | [${accNames}] | "${firstLine}"`
    );
  }
}

main().catch(console.error);
