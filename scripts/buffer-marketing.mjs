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

const WAVE3_POSTS = [
  {
    title: 'Post 11: 5 Most Costly Medical Billing Mistakes in Miami Practices (Blog Guide)',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/blog-top5-mistakes.jpg',
    text: `⚠️ Are These 5 Common Billing Mistakes Quietly Costing Your Miami Practice $50,000+ a Year?\n\nEven busy clinics with steady patient volume lose 12%–18% of collectable revenue to preventable workflow gaps:\n1️⃣ Front-desk eligibility & copay verification misses (especially HMO/MMA plans)\n2️⃣ Undocumented Modifier 25 & 59 usage triggering NCCI edits\n3️⃣ Delayed ERA/835 reconciliation letting CO/OA denials age past timely filing\n4️⃣ Under-coding E/M levels out of audit fear instead of coding to clinical documentation\n5️⃣ Lapsed CAQH ProView re-attestations freezing commercial reimbursements\n\nRead our complete South Florida guide & checklist:\n🔗 https://medicalbillingmb.com/blog/top-5-medical-billing-mistakes?utm_source=buffer&utm_medium=social&utm_campaign=top5_mistakes_w3\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#MedicalBilling #PracticeManagement #MiamiPhysicians #RevenueCycle #HealthcareFinance #AAPCCertified #SouthFloridaDoctors`,
  },
  {
    title: 'Post 12: Medical Billing 101 — Complete Executive Guide for Florida Physicians',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/blog-medical-billing-101.jpg',
    text: `📘 Medical Billing 101: The 60-Second Executive Benchmark for Miami Doctors & Clinic Owners.\n\nHow does your practice compare against healthy South Florida revenue cycle benchmarks?\n✅ First-Pass Clean Claim Rate: 98%+ (Industry avg: 75%–85%)\n✅ Days in Accounts Receivable (A/R): Under 28 days\n✅ Denial Resolution Turnaround: 24–48 business hours\n✅ Transparent Collection Tiers: 5.6%–10% ($0 setup fee, zero EHR migration)\n\nExplore our full guide on how U.S. AAPC-certified coders + AI pre-submission scrubbing protect your bottom line:\n🔗 https://medicalbillingmb.com/blog/medical-billing-101?utm_source=buffer&utm_medium=social&utm_campaign=billing_101_w3\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#MedicalBilling101 #MiamiDoctors #ClinicOwners #PrivatePractice #HealthcareRCM #MedicalCoding #MiamiBeach`,
  },
  {
    title: 'Post 13: Forensic Charge-to-Balance EOB Reconciliation for Florida Trial Attorneys',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/attorneys-legal-chronology.jpg',
    text: `⚖️ Going Into Mediation or Preparing a Personal Injury Demand Package in Florida?\n\nDefense adjusters scrutinize every CPT line item, contractual adjustment, and overlapping hospital/physician bill. Handing over raw, unreconciled ledgers weakens your special damages presentation.\n\nMBMB’s U.S. AAPC-certified coders + AI verification build litigation-ready billing packages in 3–5 business days:\n✅ Source-Linked Chronology (every charge cited to the exact PDF & page)\n✅ Duplicate & Unbundled Charge Detection\n✅ Clear Table Separating Total Billed, Adjustments, Paid & Net Open Balance (Excel + PDF)\n\n👉 Request a Sample Deliverable or 1-Case Pilot:\n🔗 https://medicalbillingmb.com/for-attorneys?utm_source=buffer&utm_medium=social&utm_campaign=attorney_forensic_w3\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#FloridaTrialLawyers #PersonalInjuryLaw #MedMal #LitigationSupport #Paralegal #MiamiLawFirms #SpecialDamages`,
  },
  {
    title: 'Post 14: End-to-End Revenue Cycle Management (RCM) Inside Your Existing EHR',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/service-rcm-hero.jpg',
    text: `🔄 Full-Lifecycle Revenue Cycle Management — Without Switching Your EHR.\n\nSwitching billing teams shouldn't disrupt your front desk or clinical charting. MBMB plugs directly into eClinicalWorks, Athenahealth, Tebra/Kareo, Epic, AdvancedMD, NextGen, DrChrono, and 25+ EHR platforms:\n\n🔹 Real-Time Eligibility & Prior Auth Verification\n🔹 Daily AAPC Coding + AI Pre-Submission Scrubbing\n🔹 Electronic 837 Claim Submission & Daily 835 ERA Posting\n🔹 48-Hour Clinical Denial Appeals & Patient Statement Support\n\nSee how our 6-step RCM workflow increases net collections:\n🔗 https://medicalbillingmb.com/services/revenue-cycle-management?utm_source=buffer&utm_medium=social&utm_campaign=rcm_lifecycle_w3\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#RevenueCycleManagement #RCM #EHR #MedicalBillingMiami #HealthcareOperations #PracticeGrowth #SouthFloridaHealthcare`,
  },
  {
    title: 'Post 15: Launching a New Clinic in South Florida? Fast-Track Payer Credentialing',
    imageUrl: 'https://medicalbillingmb.com/raster/authentic/home-credentialing-doctor.jpg',
    text: `🏥 Opening a New Medical Practice or Adding a Provider in Miami-Dade, Broward, or Palm Beach?\n\nCredentialing bottlenecks are the #1 reason new clinics face 90–120 day cash-flow gaps. Our dedicated Florida enrollment specialists handle every detail from day one:\n\n✅ NPI Type 1 & Type 2 + CAQH ProView Setup & Quarterly Attestations\n✅ First Coast Medicare (FCSO) PECOS Enrollment\n✅ Florida Medicaid (AHCA) & MMA Plans (Sunshine, Simply, Molina)\n✅ Major Commercial Payers + ERA/EFT Direct Deposit Linkage\n\nStart billing cleanly from your very first patient:\n🔗 https://medicalbillingmb.com/blog/florida-provider-credentialing-guide?utm_source=buffer&utm_medium=social&utm_campaign=credentialing_guide_w3\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#ProviderCredentialing #NewMedicalPractice #FloridaMedicaid #MedicarePECOS #CAQH #MiamiHealthcare #DoctorLife`,
  },
  {
    title: 'Post 16: Bilingual Atención en Español & English — Free 20-Claim Audit',
    imageUrl: 'https://medicalbillingmb.com/raster/social/style-4-split-collage.jpg',
    text: `🌎 Atención Directa en Miami Beach (English & Español) + U.S. AAPC-Certified Coders.\n\nWant to see exactly where your practice is losing collectable revenue before committing to anything?\n\nRequest our complimentary 20-Claim Revenue & Coding Benchmark:\n📊 We review 20 recent encounters/denials from your EHR\n🔍 We flag missed modifiers (-25, -59, -95), under-coded E/M visits, and payer underpayments\n💰 You receive a clear, actionable recovery report within 48 hours\n\nBook your 15-minute discovery call today:\n🔗 https://medicalbillingmb.com/consultation?utm_source=buffer&utm_medium=social&utm_campaign=audit_20claim_w3\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#MedicalBillingMiamiBeach #MBMB #MedicosEnMiami #SouthFloridaClinics #MedicalCodingAudit #HealthcareMiami`,
  },
];

const WAVE4_STYLED_POSTS = [
  {
    title: 'Post 17 [Style 1 - Editorial Magazine Overlay]: Behind-the-Desk Miami Coding Audit Story',
    imageUrl: 'https://medicalbillingmb.com/raster/social/style-1-editorial-overlay.jpg',
    text: `Last week, a 3-physician clinic in Miami-Dade sent us 20 recent EOBs to review.\n\nOn paper, their previous biller told them their collection rate was "fine."\n\nWithin 40 minutes, our AAPC-certified coder found $4,820 in unpaid procedural line items from a single month. Every time an office visit (99214) was billed alongside an in-office procedure, the claim went out without Modifier 25 or the right NCCI unbundling support. When First Coast Medicare and Florida Blue denied the second line item, the old billing team simply wrote it off.\n\nThat's why every claim we touch goes through a U.S. AAPC-certified human coder first, and an AI pre-submission double-check second—bringing first-pass clean claims to 98.4%.\n\nWant us to look at 20 of your recent claims—free and confidential?\n\n🔗 https://medicalbillingmb.com/consultation?utm_source=buffer&utm_medium=social&utm_campaign=style1_editorial_audit\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#MiamiDoctors #MedicalBillingMiami #PracticeOwners #HealthcareFinance #SouthFloridaMedicine`,
  },
  {
    title: 'Post 18 [Style 2 - FinTech ROI Scorecard]: 90-Day Miami Practice Benchmark ($142K Net Recovery)',
    imageUrl: 'https://medicalbillingmb.com/raster/social/style-2-data-infographic.jpg',
    text: `THE REAL COST OF AN 18% DENIAL RATE (4-Provider Miami Practice):\n\n• Monthly Billed Volume: $85,000\n• Unworked / Timed-Out Denials: -$10,580 / mo\n• Annual Preventable Revenue Loss: -$127,000 / yr\n\n————————————————————\n\nAFTER 90 DAYS WITH MBMB (Inside Their Existing EHR):\n\n• First-Pass Clean Claim Rate: 98.4%\n• Denial Rate After AAPC + AI Scrubbing: 2.4%\n• Denial Appeal Turnaround: Under 48 Hours\n• Net Annualized Recovery: +$142,000 / yr\n• Software Migration Cost: $0\n\n————————————————————\n\nHow much of your earned revenue is sitting in 60+ day A/R right now? Find out with a 48-hour benchmark audit:\n\n🔗 https://medicalbillingmb.com/for-providers?utm_source=buffer&utm_medium=social&utm_campaign=style2_roi_scorecard\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#HealthcareROI #MedicalPracticeManagement #MiamiBeach #AAPCCertified #RCM`,
  },
  {
    title: 'Post 19 [Style 3 - Minimalist Billboard Poster]: 65% of Denied Claims Are Never Appealed',
    imageUrl: 'https://medicalbillingmb.com/raster/social/style-3-minimal-billboard.jpg',
    text: `Most medical practices don't have a "patient volume" problem.\nThey have a silent write-off problem.\n\nUp to 65% of denied medical claims are never appealed by traditional billing companies. It is faster for a volume-based biller to chase the easy 80% and quietly write off your hardest 20% as "uncollectable."\n\nThose "uncollectable" claims are your profit margin.\n\nAt Medical Billing Miami Beach, we don't write off a single CO, PR, or OA denial without a clinical chart investigation and a 48-hour appeal.\n\n• We work inside your existing EHR.\n• We charge $0 setup fees.\n• We only get paid when you collect (5.6%–10%).\n\nStop funding payer profits with preventable write-offs.\n\n🔗 https://medicalbillingmb.com/blog/denial-management-guide?utm_source=buffer&utm_medium=social&utm_campaign=style3_billboard_denials\n📞 (786) 643-2099\n\n#PrivatePractice #MiamiHealthcare #RevenueCycle #MedicalCoding #DoctorLife`,
  },
  {
    title: 'Post 20 [Style 4 - Split-Screen Photo + Action Card]: U.S. AAPC Coders + AI Double-Check',
    imageUrl: 'https://medicalbillingmb.com/raster/social/style-4-split-collage.jpg',
    text: `Q: "If we switch our medical billing to MBMB, do we have to change our EHR or retrain our front desk?"\n\nA: No. Zero software migration.\n\nOur U.S. AAPC-certified coders and billing specialists plug directly into your current system—whether you run eClinicalWorks, Athenahealth, Tebra/Kareo, Epic, AdvancedMD, NextGen, or DrChrono.\n\nQ: "How fast can you spot where we're losing money?"\n\nA: Within 48 hours. We pull a sample of 20 recent encounters and EOBs, run our human coder + AI double-check, and hand you a plain-English report showing every missed modifier, under-coded visit, and recoverable denial.\n\nBook your complimentary 20-Claim Audit today:\n🔗 https://medicalbillingmb.com/consultation?utm_source=buffer&utm_medium=social&utm_campaign=style4_split_card\n📞 (786) 643-2099 | ✉️ Jasmel@medicalbillingmb.com\n\n#MiamiPhysicians #FloridaHealthcare #MedicalBillingServices #ClinicManagement #MBMB`,
  },
  {
    title: 'Post 21 [Style 5 - 3D Glassmorphism UI Card]: Turning Denied CO-50 Claims Into Paid 98.4% Clean Claims',
    imageUrl: 'https://medicalbillingmb.com/raster/social/style-5-3d-glass-ui.jpg',
    text: `EN | For South Florida Physicians & Law Firms:\nTurning a "DENIED CO-50" rejection into a paid claim requires clinical chart evidence, exact NCCI modifier logic, and relentless 48-hour follow-up. We combine local Miami Beach coordination with U.S. AAPC-certified coders and AI pre-submission verification—delivering 98.4% clean claims for clinics and 3–5 day source-linked billing chronologies for trial attorneys.\n\nES | Para Médicos y Abogados en el Sur de la Florida:\nTransformamos reclamos rechazados en ingresos cobrados en 48 horas. Nuestro equipo certificado por la AAPC en EE. UU., respaldado por verificación de Inteligencia Artificial, trabaja directamente dentro de su EHR actual sin costo de instalación ($0 setup fee, tarifas transparentes del 5.6% al 10%).\n\n📍 Miami Beach, FL | 📞 (786) 643-2099\n🔗 https://medicalbillingmb.com/services/medical-coding?utm_source=buffer&utm_medium=social&utm_campaign=style5_3d_glass_ui\n\n#MedicosEnMiami #MiamiHealthcare #MedicalBillingMiamiBeach #AbogadosMiami #SouthFloridaDoctors`,
  },
];

async function bufferMCP(method, params = {}) {
  const res = await fetch('https://mcp.buffer.com/mcp', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BUFFER_API_KEY}`,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
    },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  return res.json();
}

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
  const mode = args.includes('--queue')
    ? 'queue'
    : args.includes('--wave2')
      ? 'wave2'
      : args.includes('--wave3')
        ? 'wave3'
        : args.includes('--wave4')
          ? 'wave4'
          : args.includes('--retry-failed')
            ? 'retry-failed'
            : args.includes('--draft')
              ? 'draft'
              : 'status';

  const statusData = await bufferGraphQL(
    `query($orgId: OrganizationId!) {
      channels(input: { organizationId: $orgId }) {
        id
        name
        displayName
        service
        type
        isQueuePaused
        isDisconnected
      }
      posts(input: { organizationId: $orgId }, first: 40) {
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
    console.log(
      `- [${ch.service.toUpperCase()}] ${ch.displayName} (ID: ${ch.id}, Disconnected: ${ch.isDisconnected}, Queue Paused: ${ch.isQueuePaused})`
    );
  }

  const posts = statusData?.data?.posts?.edges?.map((e) => e.node) || [];
  console.log(`\n=== All Recent & Scheduled Buffer Posts (${posts.length}) ===`);
  for (const p of posts) {
    const firstLine = (p.text || '').split('\n')[0];
    const chLabel = p.channelId === CHANNELS.instagram ? 'IG (@medicalbillingmiami)' : 'LI (Medical Billing MB)';
    console.log(`- [${p.status.toUpperCase()}] ${chLabel} | ID: ${p.id} | Due/Sent: ${p.sentAt || p.dueAt || 'Draft'} | "${firstLine}"`);
  }

  if (mode === 'status') return;

  if (mode === 'retry-failed') {
    const allDefinedPosts = [...CAMPAIGN_POSTS, ...WAVE2_POSTS, ...WAVE3_POSTS, ...WAVE4_STYLED_POSTS];
    const erroredPosts = posts.filter((p) => p.status === 'error' || p.status === 'failed');
    if (erroredPosts.length === 0) {
      console.log('\nNo failed/error posts found in Buffer.');
      return;
    }
    console.log(`\n=== Retrying ${erroredPosts.length} Failed Posts in Place via Buffer MCP (edit_post) ===`);
    for (const errPost of erroredPosts) {
      const firstLine = (errPost.text || '').split('\n')[0];
      const matched = allDefinedPosts.find((item) => item.text.split('\n')[0] === firstLine);
      const service = errPost.channelId === CHANNELS.instagram ? 'instagram' : 'linkedin';
      const imageUrl = matched?.imageUrl || 'https://medicalbillingmb.com/raster/social/style-1-editorial-overlay.jpg';

      const editRes = await bufferMCP('tools/call', {
        name: 'edit_post',
        arguments: {
          postId: errPost.id,
          text: errPost.text,
          mode: 'addToQueue',
          assets: [{ image: { url: imageUrl, thumbnailUrl: imageUrl } }],
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
        },
      });

      const contentText = editRes?.result?.content?.[0]?.text || '';
      if (!editRes?.result?.isError && contentText.startsWith('{')) {
        const updated = JSON.parse(contentText);
        console.log(
          `  RE-SCHEDULED IN PLACE [${service.toUpperCase()}] "${firstLine}" -> Post ID: ${updated.id} (status: ${updated.status}, dueAt: ${updated.dueAt})`
        );
      } else {
        console.log(`  WARN [${service.toUpperCase()}] "${firstLine}" ->`, JSON.stringify(editRes));
      }
    }
    return;
  }

  const saveToDraft = mode === 'draft';
  const postsToCreate =
    mode === 'wave4' ? WAVE4_STYLED_POSTS : mode === 'wave3' ? WAVE3_POSTS : mode === 'wave2' ? WAVE2_POSTS : CAMPAIGN_POSTS;
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
