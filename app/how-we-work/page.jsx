import Link from 'next/link';
import { BUSINESS_FACTS } from '../config/business-facts';

export const metadata = {
  title: 'How We Work | Human Expertise + AI Double-Check Workflow | MBMB',
  description:
    'Discover how Medical Billing Miami Beach (MBMB) coordinates local client communication with our U.S. AAPC-certified fulfillment team and AI pre-submission verification.',
  alternates: {
    canonical: 'https://medicalbillingmb.com/how-we-work',
  },
  openGraph: {
    title: 'How We Work | Medical Billing Miami Beach (MBMB)',
    description:
      'Step-by-step look at our 5-stage medical billing, coding, credentialing, and administrative bill organization workflow.',
    url: 'https://medicalbillingmb.com/how-we-work',
    type: 'website',
  },
};

const workflowSteps = [
  {
    step: '01',
    title: 'Scope Alignment & Secure System Onboarding',
    description:
      'MBMB conducts a structured discovery call to map your specialty mix, payer contracts, and current EHR/PM setup. Once a Business Associate Agreement (BAA) and service scope are executed, we configure role-based access to your practice management platform or secure document portal.',
  },
  {
    step: '02',
    title: 'Human AAPC-Certified Coding + AI Pre-Submission Double-Check',
    description:
      'Our experienced U.S. AAPC-certified coders verify ICD-10-CM, CPT, and HCPCS codes against provider documentation. Next, our AI verification layer runs an automated double-check for NCCI edits, modifier completeness, and payer-specific billing rules before any claim leaves the queue.',
  },
  {
    step: '03',
    title: 'Clean Claim Transmission & Clearinghouse Tracking',
    description:
      'Scrubbed claims are transmitted electronically within 24–48 business hours. We monitor clearinghouse acknowledgments (277CA) daily so front-end rejections are resolved immediately rather than sitting in an unworked bucket.',
  },
  {
    step: '04',
    title: 'ERA Auto-Posting, Denial Triage & Appeals',
    description:
      'As Electronic Remittance Advices (835 ERAs) arrive, payments and contractual adjustments are reconciled against fee schedules. Any underpaid or denied line item is routed to our denial resolution specialists for timely re-submission or formal appeal.',
  },
  {
    step: '05',
    title: 'Monthly Executive Reporting & Ongoing Optimization',
    description:
      'You receive clear monthly reporting covering net collection rate, days in AR, aging buckets (30/60/90/120+ days), and root-cause denial trends—backed by direct account coordination from our Miami Beach office.',
  },
];

export default function HowWeWorkPage() {
  return (
    <div className="min-h-screen bg-charcoal text-white">
      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-navy to-charcoal">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink/15 border border-pink/30 text-pink text-xs uppercase tracking-widest font-semibold mb-6">
            Operational Transparency
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
            How We Work: Accountable Coordination, Certified Coders &amp; AI Verification
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            {BUSINESS_FACTS.operatingModel.summary} We combine veteran human billing judgment with modern AI double-check workflows—and strict data-privacy boundaries at every step.
          </p>
        </div>
      </section>

      {/* Two-Pillar Operating Model */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-navy/80 border border-white/10 rounded-2xl p-7">
            <h2 className="text-xl font-bold mb-4 text-white">
              1. Miami Beach Client Hub + Certified U.S. Fulfillment Partner
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Medical Billing Miami Beach (MBMB) serves as your dedicated local account coordinator, onboarding lead, and quality-assurance point of contact in Miami Beach, FL.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Day-to-day claim coding, clearinghouse management, credentialing packet preparation, and AR follow-up are executed in tandem with our established U.S. certified medical billing fulfillment partner—giving your practice both responsive local communication and deep multi-specialty operational capacity.
            </p>
          </div>

          <div className="bg-navy/80 border border-white/10 rounded-2xl p-7">
            <h2 className="text-xl font-bold mb-4 text-white">
              2. Human Expertise First, AI Double-Check Second
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {BUSINESS_FACTS.operatingModel.aiVerificationStatement}
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              AI never replaces certified human review or clinical documentation integrity; instead, it acts as a tireless second pair of eyes to flag potential NCCI bundling conflicts, missing modifiers, or clerical discrepancies before claims are submitted.
            </p>
          </div>
        </div>

        {/* 5-Step Provider Workflow */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Our 5-Stage Provider Revenue Cycle Workflow
          </h2>
          <div className="space-y-6">
            {workflowSteps.map((item) => (
              <div
                key={item.step}
                className="bg-navy/60 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="w-14 h-14 rounded-xl bg-pink/15 border border-pink/30 flex items-center justify-center shrink-0 font-mono text-2xl font-extrabold text-pink">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credentialing & Law Firm Administrative Support Callouts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <div className="bg-navy/60 border border-white/10 rounded-2xl p-7">
            <h3 className="text-lg font-bold text-white mb-3">
              ✓ Credentialing &amp; Payer Enrollment Timelines
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              We prepare, submit, and follow up on CAQH profiles, Medicare PECOS, Florida Medicaid, and commercial payer enrollment applications.
            </p>
            <p className="text-xs text-gray-400 italic">
              {BUSINESS_FACTS.pricing.credentialingNote}
            </p>
          </div>

          <div className="bg-navy/60 border border-white/10 rounded-2xl p-7">
            <h3 className="text-lg font-bold text-white mb-3">
              ⚖️ Administrative Billing Support for Law Firms
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              For personal injury and medical-legal teams, we offer a dedicated 4-step pilot workflow to organize fragmented provider bills, EOBs, and payment records into source-linked chronologies and charge-to-balance tables.
            </p>
            <Link
              href="/for-attorneys"
              className="inline-flex items-center gap-2 text-pink hover:underline text-sm font-semibold"
            >
              <span>View our /for-attorneys administrative workflow →</span>
            </Link>
          </div>
        </div>

        {/* Data Privacy & Public Website Boundaries */}
        <div className="bg-charcoal border border-pink/30 rounded-2xl p-7 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-2">
            🔒 Strict Data Privacy, HIPAA Alignment &amp; Public Website Boundaries
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Public website forms, live chat widgets, and scheduling calendars are strictly for initial business inquiries and non-sensitive intake. We never request or accept Protected Health Information (PHI) or confidential case records through public web forms.
          </p>
          <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            {BUSINESS_FACTS.compliance.phiWarningShort} Once a service agreement and Business Associate Agreement (BAA) where applicable are in place, all protected records are exchanged exclusively through encrypted, HIPAA-aligned channels.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-navy/40 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Have Questions About Onboarding Your Practice or Law Firm?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-8">
            Speak directly with our Miami Beach coordination team to discuss your workflow and request a tailored proposal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-pink hover:bg-pink/90 text-white font-semibold px-7 py-3.5 rounded-xl transition"
            >
              <span>Request a Consultation →</span>
            </Link>
            <Link
              href="/for-providers"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-3.5 rounded-xl transition"
            >
              For Healthcare Providers
            </Link>
            <Link
              href="/for-attorneys"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-3.5 rounded-xl transition"
            >
              For Attorneys
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
