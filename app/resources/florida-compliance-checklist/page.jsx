import Link from 'next/link';
import PrintChecklistButton from '../../components/PrintChecklistButton';
import { BUSINESS_FACTS } from '../../config/business-facts';

export const metadata = {
  title: '2026 Florida Billing & Telehealth Compliance Checklist | MBMB',
  description:
    'Free 2026 Florida medical billing audit checklist covering Telehealth POS 02/10 & Modifier 95, First Coast Medicare LCD/NCD checks, Florida Medicaid AHCA MMA rules, Modifier 25/59 edits, and HIPAA BAA readiness.',
  alternates: {
    canonical: 'https://medicalbillingmb.com/resources/florida-compliance-checklist',
  },
};

const CHECKLIST_SECTIONS = [
  {
    code: '01',
    title: 'Florida Telehealth Coding & Place of Service (POS)',
    items: [
      {
        title: 'POS 10 vs. POS 02 Distinction Applied Correctly',
        detail:
          'Use POS 10 when the patient is at home during the telehealth encounter (eligible for non-facility Medicare rates under applicable CY rules) and POS 02 when outside the home.',
      },
      {
        title: 'Modifier 95 vs. GT Verified by Payer Contract',
        detail:
          'Florida Blue, UHC, Aetna, Cigna, and AHCA Medicaid MMA plans differ on Modifier 95 vs. GT and audio-only Modifier 93 — audit payer bulletins quarterly.',
      },
      {
        title: 'Provider Distant-Site Address & Consent Logged',
        detail:
          'Ensure patient verbal/written telehealth consent and time or Medical Decision Making (MDM) rationale are clearly documented in the signed note.',
      },
    ],
  },
  {
    code: '02',
    title: 'Clinical Note, ICD-10-CM & CPT Pre-Submission Scrubbing',
    items: [
      {
        title: 'No Negated or "Rule-Out" Outpatient Diagnoses Billed',
        detail:
          'Verify outpatient claims never bill "suspected", "probable", or "rule-out" conditions as confirmed ICD-10 diagnoses; code documented signs/symptoms instead.',
      },
      {
        title: 'Ordered vs. Performed Services Cleanly Separated',
        detail:
          'Never submit billing lines for outside imaging, send-out labs, or external referrals that were merely ordered in the Plan without in-office execution.',
      },
      {
        title: 'E/M Level Supported by Signed AMA MDM or Total Time',
        detail:
          'Check 99213 vs. 99214 / 99204 alignment so earned complexity is captured cleanly without undercoding or unsupported upcoding exposure.',
      },
      {
        title: 'Modifier 25, 59 & XE/XS/XP/XU Documentation Check',
        detail:
          'Attach Modifier 25 only when a separately identifiable E/M occurs alongside a minor procedure on the same DOS, and substantiate distinct anatomic/session NCCI bypasses.',
      },
    ],
  },
  {
    code: '03',
    title: 'Florida Payer Rules: FCSO Medicare, AHCA Medicaid & Managed Care',
    items: [
      {
        title: 'Medicare Advantage vs. Traditional Medicare Fee-for-Service Split',
        detail:
          'Verify eligibility on date of service so Medicare Advantage HMO/PPO claims never hit First Coast (FCSO) MAC (eliminates instant CO-24 / CARC 109 denials).',
      },
      {
        title: 'Florida Medicaid (AHCA Region 11 / MMA Plans) Prior-Auth & PCP Referral',
        detail:
          'Confirm Sunshine Health, Simply Healthcare, Molina, Humana Healthy Horizons, or Aetna Better Health referrals/PA numbers before Box 23 transmission.',
      },
      {
        title: '835 ERA Contractual Underpayment Audit (CO-45 Variance)',
        detail:
          'Compare allowed/paid amounts against executed Florida payer fee schedules so silent underpayments are appealed rather than auto-written off.',
      },
    ],
  },
  {
    code: '04',
    title: 'HIPAA Privacy, Credentialing & A/R Recovery Guardrails',
    items: [
      {
        title: 'Signed HIPAA BAA Executed Before Sharing Any PHI',
        detail:
          'Never transmit patient names, DOBs, member IDs, or SOAP notes over unencrypted public web forms or personal email without a signed Business Associate Agreement.',
      },
      {
        title: 'CAQH ProView 120-Day Re-Attestation & NPI Type 1 / Type 2 Sync',
        detail:
          'Confirm every rendering physician, NP, and PA has active CAQH attestation, taxonomy alignment, and linked EFT/ERA enrollment.',
      },
      {
        title: '48-Hour Denial Triage & >60 / >90-Day Aging Sweep',
        detail:
          'Require root-cause categorization (CO-16, CO-50, CO-97, CO-197) and timely-filing tracking on every unpaid line item so no claim ages silently to write-off.',
      },
    ],
  },
];

export default function FloridaComplianceChecklistPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-[#0a1628] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A8E8]/15 border border-[#00A8E8]/30 text-[#00A8E8] text-xs font-bold uppercase tracking-wider">
              Free MBMB Practice Resource · 2026 Edition
            </span>
            <PrintChecklistButton />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            2026 Florida Medical Billing &amp; Telehealth Compliance Checklist
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            A practical 13-point pre-submission and revenue-protection checklist built for Miami-Dade, Broward, Palm Beach, and statewide Florida clinics by {BUSINESS_FACTS.brandName}.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        {CHECKLIST_SECTIONS.map((sec) => (
          <div key={sec.code} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
              <span className="w-9 h-9 rounded-xl bg-[#0066CC] text-white font-black text-sm flex items-center justify-center shrink-0">
                {sec.code}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{sec.title}</h2>
            </div>
            <ul className="space-y-4">
              {sec.items.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded border-2 border-[#0066CC] text-[#0066CC] flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</h3>
                    <p className="text-slate-600 text-sm mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-2xl bg-gradient-to-r from-[#0a1628] via-[#102340] to-[#0066CC] text-white p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold mb-2">
              Want Us to Run This Checklist Against 20 Denied Claims — Free?
            </h2>
            <p className="text-slate-200 text-sm max-w-2xl">
              After executing your HIPAA BAA, our U.S. AAPC-certified fulfillment team audits 20 denied or aging claims inside your existing EHR within 48 hours and estimates your recoverable dollars.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/consultation"
              className="px-6 py-3 rounded-xl bg-white text-[#0a1628] font-bold text-sm hover:bg-slate-100 transition"
            >
              Claim Free 20-Claim Audit →
            </Link>
            <a
              href={BUSINESS_FACTS.contact.phoneHref}
              className="px-6 py-3 rounded-xl border border-white/25 bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition"
            >
              📞 {BUSINESS_FACTS.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
