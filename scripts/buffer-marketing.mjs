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

const BUFFER_API_KEY = process.env.BUFFER_API_KEY;
if (!BUFFER_API_KEY) {
  console.error('ERROR: BUFFER_API_KEY is not set in .env.local');
  process.exit(1);
}

const ORG_ID = '69e206bc90f427a8de07a907';
const CHANNELS = {
  instagram: '69e40fcc031bfa423c1bba9b', // @medicalbillingmiami (Instagram Business)
  linkedin: '69e40c02031bfa423c1ba626',  // Medical Billing Miami Beach (LinkedIn Page)
};

const CAMPAIGN_POSTS = [
  {
    title: 'Post 1: Human AAPC Coders + AI Pre-Submission Double-Check (Providers)',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/providers-hero-team.jpg',
    text: `🩺 Why do South Florida clinics lose 12%–18% of collectable revenue before a claim ever reaches the payer?\n\nBecause blind automation misses clinical context, and manual-only billing misses subtle NCCI edits.\n\nAt Medical Billing Miami Beach (MBMB), every encounter goes through a 2-layer verification inside your existing EHR:\n✅ 01. U.S. AAPC-Certified Coding Review (ICD-10-CM, CPT, HCPCS verified against your clinical chart)\n✅ 02. AI Pre-Submission Double-Check (catches missing Modifiers 25, 59, XE, 95 & Florida LCD/NCD rules)\n✅ 03. 48-Hour Denial Appeals & Daily ERA Posting\n\n💰 Transparent performance tiers: 5.6%–10% of collections ($0 setup fee).\n\n👉 Request your free 48-hour billing benchmark:\n🔗 https://medicalbillingmb.com/for-providers?utm_source=buffer&utm_medium=social&utm_campaign=provider_aapc_ai\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#MedicalBilling #MiamiHealthcare #RevenueCycleManagement #MedicalCoding #AAPCCertified #SouthFloridaDoctors #PracticeManagement`,
  },
  {
    title: 'Post 2: Source-Linked Medical Billing Chronologies for Attorneys (Legal Pilot)',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/attorneys-legal-chronology.jpg',
    text: `⚖️ Preparing a Personal Injury Demand Package or Mediation Brief in Florida?\n\nUntangling fragmented CMS-1500/UB-04 statements, hospital facility ledgers, and EOB adjustments takes hours away from core legal strategy—and unflagged duplicate charges can undermine your special damages summary at mediation.\n\nMBMB’s U.S. AAPC-certified coders + AI verification deliver litigation-ready administrative billing packages in 3–5 business days:\n✅ Source-Linked Medical Billing Chronologies (cited to the exact PDF & page number)\n✅ Plain-English CPT, ICD-10 & Modifier Explanations (-25, -59, -26/TC)\n✅ Charge-to-Balance Reconciliation (separating Total Billed, Adjustments, Paid, Flagged Duplicates & Net Open Balance in Excel + PDF)\n\n👉 Test us on 1 active case file (Request a Sample Deliverable or 1-Case Pilot):\n🔗 https://medicalbillingmb.com/for-attorneys?utm_source=buffer&utm_medium=social&utm_campaign=attorney_pilot\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#PersonalInjuryLaw #FloridaTrialLawyers #MedicalMalpractice #LegalOperations #ParalegalLife #MiamiLawFirms #MedicalChronology`,
  },
  {
    title: 'Post 3: 90-Day Miami Beach Case Study (18% to 2.4% Denial Rate)',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/providers-rcm-analytics.jpg',
    text: `📈 Real 90-Day Benchmark: How a 4-Provider Miami Beach Practice Cut Denials from 18.0% to 2.4%\n\nBefore partnering with MBMB:\n❌ 18% claim denial rate from modifier & bundling rejections\n❌ Denied CO/OA claims aging past 60 days without clinical appeals\n❌ $127K+ in annual preventable revenue leakage\n\nWithin 90 days with MBMB (working directly inside their existing EHR):\n✅ Denial rate dropped to 2.4% (98%+ first-pass clean claims)\n✅ +27% net collections increase (+$142,000 annualized)\n✅ $0 software migration cost\n\nSee how much collectable revenue your clinic is leaving on the table:\n🔗 https://medicalbillingmb.com/consultation?utm_source=buffer&utm_medium=social&utm_campaign=case_study_90d\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#HealthcareFinance #MedicalPractice #MiamiDoctors #DenialManagement #CleanClaims #MedicalBillingMiami #RCM`,
  },
  {
    title: 'Post 4: Florida Provider Credentialing, CAQH ProView & Medicaid MMA Enrollment',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/service-credentialing-hero.jpg',
    text: `🏥 Adding a New Physician, NP, or PA in Florida? Don’t Let Credentialing Delays Hold Up Your Claims.\n\nA single lapsed CAQH ProView attestation or mismatched NPI Type 1 / Type 2 record can freeze reimbursements for 60–120 days.\n\nOur Florida Credentialing & Enrollment specialists manage the entire lifecycle:\n✅ Medicare PECOS (First Coast Service Options — FCSO)\n✅ Florida Medicaid (AHCA) & Managed Medical Assistance (Sunshine Health, Simply, Molina)\n✅ Commercial Payers (Florida Blue, UnitedHealthcare, Aetna, Cigna, AvMed, Humana)\n✅ Quarterly CAQH Re-Attestations + EDI/835 ERA/EFT Setup\n\n🔗 https://medicalbillingmb.com/services/credentialing?utm_source=buffer&utm_medium=social&utm_campaign=fl_credentialing\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#ProviderCredentialing #CAQH #FloridaMedicaid #MedicareEnrollment #ClinicOwners #MiamiMedicine #HealthcareAdmin`,
  },
  {
    title: 'Post 5: Transparent Percentage-of-Collections Pricing ($0 Setup Fee)',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/providers-audit-consultation.jpg',
    text: `💡 Aligned Incentives: We Only Succeed When Your Practice Collects.\n\nNo setup fees. No software migration. We plug directly into eClinicalWorks, Athenahealth, Tebra/Kareo, Epic, AdvancedMD, DrChrono, NextGen, and 25+ EHRs.\n\nOur Transparent Monthly Collection Tiers:\n• $50,000+/mo Volume → 5.6%\n• $40,000–$50,000/mo → 6.5%\n• $20,000–$40,000/mo → 7.5%\n• Under $20,000/mo (New & Launching Clinics) → 10.0%\n\n🇪🇸 Hablamos Español — Atención directa en Miami Beach con respaldo de codificadores certificados por la AAPC en EE. UU.\n\n👉 Book your 15-minute practice consultation:\n🔗 https://medicalbillingmb.com/consultation?utm_source=buffer&utm_medium=social&utm_campaign=transparent_pricing\n📞 (786) 643-2099\n\n#MedicalBillingServices #TransparentPricing #SouthFloridaHealthcare #PrivatePractice #DoctorLife #MiamiBeach`,
  },
];

const WAVE2_POSTS = [
  {
    title: 'Post 6: Modifier 25, 59 & XE/XS — Stopping Surgical & E/M Unbundling Rejections',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/providers-coding-specialist.jpg',
    text: `🔍 Are Modifier 25, 59, or XE/XS Rejections Quietly Draining Your Specialty Practice?\n\nIn Cardiology, Orthopedics, Pain Management, and Dermatology, NCCI bundling edits and missing modifiers are the #1 trigger for preventable First Coast Medicare (FCSO) and commercial claim denials.\n\nAt Medical Billing Miami Beach (MBMB):\n✅ U.S. AAPC-certified coders verify your operative & clinical chart notes first\n✅ Our AI secondary check flags NCCI unbundling conflicts and LCD/NCD medical-necessity gaps before transmission\n✅ 98%+ first-pass clean claim rate inside your existing EHR\n\n👉 Request a complimentary 20-claim coding & modifier benchmark:\n🔗 https://medicalbillingmb.com/services/medical-coding?utm_source=buffer&utm_medium=social&utm_campaign=coding_modifiers\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#MedicalCoding #CPT #ICD10 #AAPCCertified #Orthopedics #Cardiology #MiamiPhysicians #RevenueCycle`,
  },
  {
    title: 'Post 7: 48-Hour Denial Management & Clinical Appeals (Zero Unchecked Write-Offs)',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/providers-workflow-denials.jpg',
    text: `⏱️ Industry Secret: Up to 65% of Denied Medical Claims Are Never Re-Worked by Traditional Billing Services.\n\nWriting off CO, PR, or OA denials as "uncollectable" without clinical investigation costs South Florida clinics $50,000–$150,000+ every year.\n\nOur 48-Hour Denial Recovery Protocol:\n✅ Every denied line item is logged and categorized within 24 hours\n✅ Root-cause analysis & clinical chart appeal letters submitted within 48 business hours\n✅ Aging 30 / 60 / 90 / 120+ day A/R recovery sweep\n\n🔗 https://medicalbillingmb.com/blog/denial-management-guide?utm_source=buffer&utm_medium=social&utm_campaign=denial_appeals_48h\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#DenialManagement #AccountsReceivable #MedicalBillingMiami #HealthcareRevenue #PracticeOwners #SouthFlorida`,
  },
  {
    title: 'Post 8: Florida Medicaid (AHCA & MMA Plans) Billing for Miami-Dade & Broward Clinics',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/blog-medicaid-miami.jpg',
    text: `🌴 Billing Florida Medicaid (AHCA Region 11) & MMA Plans Without the Rejections.\n\nMiami-Dade and Broward have the highest Medicaid Managed Medical Assistance enrollment in Florida—including Sunshine Health, Simply Healthcare, Molina, Humana Medical Plan, and Community Care Plan.\n\nWe help Pediatric, OB/GYN, Behavioral Health, and Primary Care clinics:\n✅ Verify straight Medicaid vs. MCO assignment prior to every visit\n✅ Navigate Florida Medicaid fee schedules, prior authorizations & timely filing rules\n✅ Eliminate bilingual front-desk intake errors (English & Español)\n\n🔗 https://medicalbillingmb.com/blog/miami-medicaid-billing?utm_source=buffer&utm_medium=social&utm_campaign=fl_medicaid_mma\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#FloridaMedicaid #MiamiPediatrics #OBGYN #BehavioralHealth #MiamiDadeHealthcare #MedicalBilling`,
  },
  {
    title: 'Post 9: For PI & Med-Mal Paralegals — Catching Duplicate Billing Lines Before Mediation',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/blog-ai-coding-double-check.jpg',
    text: `⚖️ How Many Hours Does Your Legal Team Spend Reconciling Medical Bills & EOBs Before a Demand Goes Out?\n\nWhen hospital UB-04s, physician CMS-1500s, imaging centers, and anesthesia ledgers overlap, duplicate CPT charges and unreconciled contractual adjustments can slip into your special damages calculation.\n\nMBMB’s AAPC-certified coders + AI double-check deliver a clean, source-linked package in 3–5 business days:\n📊 Editable Excel/CSV + Formatted PDF\n📄 Every line linked to the exact source PDF and page number\n🔍 Duplicate charges & missing date ranges clearly flagged\n\n👉 Try our 1-Case Pilot on your next demand or mediation file:\n🔗 https://medicalbillingmb.com/for-attorneys#pilot-form?utm_source=buffer&utm_medium=social&utm_campaign=legal_paralegal_pilot\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#PersonalInjuryAttorney #Paralegal #LitigationSupport #FloridaLawyers #DemandPackage #MedMal #MiamiLaw`,
  },
  {
    title: 'Post 10: Bilingual Miami Beach Coordination + 24/7 AI Receptionist Front Desk',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/consultation-audit-desk.jpg',
    text: `🤝 Local Miami Beach Coordination + U.S. AAPC-Certified Fulfillment.\n\nWhether you are a multi-provider medical group looking to cut denials below 2.5%, a launching clinic needing fast CAQH & payer credentialing, or a Florida law firm needing source-linked medical billing chronologies—our team is ready to help.\n\n✅ $0 Setup Fee | 5.6%–10% Collection Tiers\n✅ Works inside your existing EHR\n✅ Bilingual Support (English & Español)\n\nBook your confidential 15-minute consultation today:\n🔗 https://medicalbillingmb.com/consultation?utm_source=buffer&utm_medium=social&utm_campaign=miami_coord_hub\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#MedicalBillingMiamiBeach #MBMB #MiamiDoctors #FloridaHealthcare #HealthcareConsulting #MiamiBusiness`,
  },
];

async function bufferGraphQL(query, variables = {}) {
  const res = await fetch('https://api.buffer.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BUFFER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

async function createBufferPost({ channelId, service, text, imageUrl, saveToDraft = false }) {
  const input = {
    channelId,
    text,
    assets: [{ image: { url: imageUrl } }],
    mode: 'addToQueue',
    schedulingType: 'automatic',
    needsApproval: false,
    saveToDraft,
    ...(service === 'instagram'
      ? {
          metadata: {
            instagram: {
              type: 'post',
              shouldShareToFeed: true,
            },
          },
        }
      : {}),
  };

  const mutation = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        __typename
        ... on PostActionSuccess {
          post {
            id
            status
            dueAt
            channelId
          }
        }
        ... on InvalidInputError { message }
        ... on LimitReachedError { message }
        ... on RestProxyError { message }
        ... on UnauthorizedError { message }
        ... on UnexpectedError { message }
        ... on NotFoundError { message }
      }
    }
  `;

  return bufferGraphQL(mutation, { input });
}

async function main() {
  const args = process.argv.slice(2);
  const mode = args.includes('--queue') ? 'queue' : args.includes('--wave2') ? 'wave2' : args.includes('--draft') ? 'draft' : 'status';

  const statusData = await bufferGraphQL(
    `query($orgId: OrganizationId!) {
      channels(input: { organizationId: $orgId }) {
        id
        name
        displayName
        service
        type
        isQueuePaused
      }
      posts(input: { organizationId: $orgId }, first: 12) {
        edges {
          node {
            id
            status
            dueAt
            sentAt
            channelId
            text
          }
        }
      }
    }`,
    { orgId: ORG_ID }
  );

  const channels = statusData?.data?.channels || [];
  console.log('\n=== Connected Buffer Channels ===');
  for (const ch of channels) {
    console.log(`- [${ch.service.toUpperCase()}] ${ch.displayName} (ID: ${ch.id}, Queue Paused: ${ch.isQueuePaused})`);
  }

  const posts = statusData?.data?.posts?.edges?.map((e) => e.node) || [];
  console.log('\n=== Recent Buffer Posts ===');
  for (const p of posts.slice(0, 6)) {
    const firstLine = (p.text || '').split('\n')[0];
    console.log(`- [${p.status}] Channel: ${p.channelId} | Due/Sent: ${p.sentAt || p.dueAt || 'Draft'} | "${firstLine}"`);
  }

  if (mode === 'status') return;

  const saveToDraft = mode === 'draft';
  const postsToCreate = mode === 'wave2' ? WAVE2_POSTS : CAMPAIGN_POSTS;
  console.log(`\n=== Creating ${postsToCreate.length} Posts Across Instagram & LinkedIn (mode=${mode}) ===`);

  for (const item of postsToCreate) {
    for (const [service, channelId] of Object.entries(CHANNELS)) {
      const res = await createBufferPost({
        channelId,
        service,
        text: item.text,
        imageUrl: item.imageUrl,
        saveToDraft,
      });
      const payload = res?.data?.createPost;
      if (payload?.__typename === 'PostActionSuccess') {
        console.log(
          `  SUCCESS [${service.toUpperCase()}] ${item.title} -> Post ID: ${payload.post.id} (status: ${payload.post.status}, dueAt: ${payload.post.dueAt || 'draft'})`
        );
      } else {
        console.log(`  WARN [${service.toUpperCase()}] ${item.title} ->`, JSON.stringify(res));
      }
    }
  }
}

main().catch(console.error);
