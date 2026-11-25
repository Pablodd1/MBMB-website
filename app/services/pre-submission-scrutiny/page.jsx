import Link from 'next/link';

export const metadata = {
  title: 'Scrutiny Before the Scrutiny™ | Pre-Submission Medical Coding & Billing Review',
  description:
    'Prevent denials before claims ever reach payers. Medical Billing Miami Beach reviews your full clinical note, ICD-10, CPT, modifiers, medical necessity, and payer rules through our proprietary 8-Point Pre-Submission Scrutiny + U.S. AAPC-certified coders.',
  keywords:
    'pre-submission medical billing review, clinical documentation coding scrutiny, prevent claim denials Florida, ICD-10 CPT medical necessity review, AAPC pre-claim audit Miami Beach',
  alternates: {
    canonical: 'https://medicalbillingmb.com/services/pre-submission-scrutiny',
  },
  openGraph: {
    title: 'Scrutiny Before the Scrutiny™ | Medical Billing Miami Beach (MBMB)',
    description:
      'Insurance payers scrutinize your claims to deny them. We scrutinize every clinical note, ICD-10, CPT, modifier, and coverage rule first—so only audit-proof claims go out.',
    url: 'https://medicalbillingmb.com/services/pre-submission-scrutiny',
    siteName: 'Medical Billing Miami Beach (MBMB)',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scrutiny Before the Scrutiny™ | MBMB Pre-Submission Review',
    description:
      'Catch missing documentation, ICD-10/CPT mismatches, modifier gaps, and payer routing errors before claims ever leave your practice.',
  },
};

const eightPointChecks = [
  {
    num: '01',
    title: 'Full Clinical Note & E/M MDM Alignment',
    desc: 'We read the complete progress note, SOAP documentation, or consult report—verifying that every ICD-10 diagnosis and CPT/E&M level matches documented Medical Decision Making, never downcoding earned visits and never billing negated ("ruled-out") conditions.',
    accent: 'border-[#00A8E8]/40 text-[#00A8E8]',
  },
  {
    num: '02',
    title: 'Performed vs. Ordered Service Protection',
    desc: 'Diagnostic imaging, send-out labs, or referrals merely ordered in the clinical Plan are cleanly separated from procedures actually rendered in-office—eliminating compliance exposure and front-end rejections.',
    accent: 'border-emerald-400/40 text-emerald-400',
  },
  {
    num: '03',
    title: 'Medical Necessity & Florida LCD / NCD Check',
    desc: 'Every procedure line is verified against supporting diagnosis pointers (Box 24E) and Florida Medicare (First Coast / FCSO) Local Coverage Determinations and National Coverage rules before transmission.',
    accent: 'border-[#00A8E8]/40 text-[#00A8E8]',
  },
  {
    num: '04',
    title: 'Modifier & NCCI Bundling Guard',
    desc: 'Automatic and coder-verified checks for Modifier -25, -59, -XE/-XS, and -95 scoping, mutually exclusive NCCI procedure pairs, and Medically Unlikely Unit (MUE) limits stop preventable CO-97 and CO-50 denials.',
    accent: 'border-amber-400/40 text-amber-300',
  },
  {
    num: '05',
    title: 'Payer Routing, Eligibility & QMB Shield',
    desc: 'Catches Medicare Advantage HMO routing traps, Part-A-only gaps, secondary Florida Medicaid coordination, and Federal QMB balance-billing protections before a claim hits the wrong payer.',
    accent: 'border-emerald-400/40 text-emerald-400',
  },
  {
    num: '06',
    title: 'Florida Provider, Facility & APRN Compliance',
    desc: 'Verifies rendering and billing NPIs, specialty taxonomy, Place of Service (Office 11, Telehealth 02/10, SNF 31/32), admission dates, and Florida APRN supervisory or autonomous practice rules.',
    accent: 'border-[#00A8E8]/40 text-[#00A8E8]',
  },
  {
    num: '07',
    title: 'Timely Filing & Duplicate Claim Firewall',
    desc: 'Blocks accidental duplicate submissions before they trigger payer audit flags and alerts your team to approaching timely-filing deadlines so earned revenue never expires.',
    accent: 'border-amber-400/40 text-amber-300',
  },
  {
    num: '08',
    title: 'U.S. AAPC-Certified Coder Final Sign-Off',
    desc: 'Nothing goes out on blind autopilot. Any encounter missing a signature, modifier justification, or clinical link is cleanly held for fast pre-submission resolution—so only clean, defensible claims reach payers.',
    accent: 'border-emerald-400/40 text-emerald-400',
  },
];

const faqs = [
  {
    question: 'What is MBMB’s "Scrutiny Before the Scrutiny" review?',
    answer:
      'It is our proprietary 8-point pre-submission clinical documentation, coding, and billing review paired with U.S. AAPC-certified coders. Before your claims ever reach Medicare, Medicaid, or commercial payers, we verify the medical note, ICD-10 codes, CPT codes, modifiers, medical necessity, and payer routing to stop denials before they happen.',
  },
  {
    question: 'Does this replace my current EHR or require switching software?',
    answer:
      'No. We work directly inside your existing EHR and Practice Management platform—including eClinicalWorks, Athenahealth, Tebra/Kareo, Epic, AdvancedMD, NextGen, and DrChrono—with $0 setup fee and zero disruption to how your clinicians chart.',
  },
  {
    question: 'How does pre-submission scrutiny protect our practice from audits and underbilling?',
    answer:
      'Payers use automated edits to reject claims and trigger post-payment recoupments. Reviewing the full clinical note upfront catches both missing documentation (protecting you in payer audits) and habitual undercoding like defaulting to 99213 when documentation supports 99214.',
  },
  {
    question: 'Can we test Scrutiny Before the Scrutiny on our own claims first?',
    answer:
      'Yes. Pull 20 recent charts or denied claims and we will run a complimentary 48-hour Pre-Submission Scrutiny Test—handing you a line-by-line breakdown of missing documentation, coding fixes, and estimated recoverable dollars with zero obligation.',
  },
];

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Scrutiny Before the Scrutiny — Pre-Submission Clinical & Billing Review',
    serviceType: 'Pre-Submission Medical Coding and Billing Audit',
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Medical Billing Miami Beach (MBMB)',
      url: 'https://medicalbillingmb.com',
      telephone: '+1-786-643-2099',
    },
    areaServed: {
      '@type': 'State',
      name: 'Florida',
    },
    description:
      'Proprietary 8-point pre-submission clinical note, ICD-10, CPT, modifier, medical necessity, and Florida payer compliance review backed by U.S. AAPC-certified coders.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '0',
      highPrice: '0',
      description:
        'Complimentary 48-hour 20-claim Pre-Submission Scrutiny Test; ongoing full-cycle RCM is 5.6%–10% of collected cash only with $0 setup.',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://medicalbillingmb.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://medicalbillingmb.com/services' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Scrutiny Before the Scrutiny',
        item: 'https://medicalbillingmb.com/services/pre-submission-scrutiny',
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  },
];

export default function PreSubmissionScrutinyPage() {
  return (
    <main className="min-h-screen bg-[#040914] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#040914] via-[#08152b] to-[#0a1628] py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A8E8]/40 bg-[#00A8E8]/10 text-[#38bdf8] text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            MBMB Proprietary Pre-Submission Review
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight max-w-4xl">
            Scrutiny Before the Scrutiny™
            <span className="block text-[#00A8E8] text-2xl sm:text-3xl lg:text-4xl mt-3 font-bold">
              Review Every Clinical Note, ICD-10, CPT &amp; Modifier Before Payers Ever See Your Claim.
            </span>
          </h1>

          <p className="mt-6 text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Insurance payers run aggressive automated edits to deny claims in milliseconds—and recoup payments months later in post-payment audits. Before a single claim leaves your practice, MBMB puts your full medical note and billing data through our <strong className="text-white">8-Point Pre-Submission Clinical Scrutiny</strong> plus <strong className="text-white">U.S. AAPC-certified coder sign-off</strong> so missing documentation, coding mismatches, and payer traps are caught and fixed first.
          </p>

          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link
              href="/call-me?audience=provider"
              className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[#0066CC] hover:bg-[#00A8E8] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#0066CC]/30 transition"
            >
              Run a Free 20-Claim Scrutiny Test →
            </Link>
            <a
              href="tel:+17866432099"
              className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm sm:text-base transition"
            >
              📞 Call or Text (786) 643-2099
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
            {[
              { stat: '8-Point', label: 'Clinical & Payer Pre-Check' },
              { stat: '98%', label: 'Clean-Claim Target' },
              { stat: '48 Hrs', label: 'Free 20-Claim Proof Turnaround' },
              { stat: '$0 Setup', label: 'Keep Your Current EHR' },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-4"
              >
                <div className="text-2xl sm:text-3xl font-black text-[#00A8E8]">{k.stat}</div>
                <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8-POINT SCRUTINY GRID */}
      <section className="py-16 sm:py-20 px-4 bg-[#071124]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              What We Check Before Submission
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-2">
              8 Layers of Clinical &amp; Billing Protection on Every Encounter
            </h2>
            <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
              Most billing services only check basic demographics after a claim is already built. We read the clinical note first and validate every link between documentation, coding, compliance, and payer rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {eightPointChecks.map((item) => (
              <div
                key={item.num}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-[#00A8E8]/50 transition"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-12 h-12 rounded-xl border bg-white/[0.03] flex items-center justify-center font-black text-base ${item.accent}`}
                  >
                    {item.num}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-slate-300 text-sm mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE VS AFTER */}
      <section className="py-16 sm:py-20 px-4 bg-[#040914] border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-10">
            Submit-and-Hope Billing vs. Scrutiny Before the Scrutiny™
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-rose-950/20 border border-rose-500/30 p-7">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-3">
                Traditional Billing (Reactive)
              </div>
              <ul className="space-y-3 text-sm text-slate-200">
                <li>✕ Keyed directly from superbills without reading the full clinical note</li>
                <li>✕ Habitual downcoding (99213 instead of 99214) silently drains ~40%/visit</li>
                <li>✕ Missing Modifier 25/59 or wrong Dx pointer triggers 30–60 day denial lags</li>
                <li>✕ Wrong payer routing (Medicare Advantage vs. Traditional Medicare) causes instant CARC 24/109 rejections</li>
                <li>✕ Unworked denials quietly written off—costing practices 12%–18% annually</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/35 p-7">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
                MBMB Scrutiny Before the Scrutiny™ (Proactive)
              </div>
              <ul className="space-y-3 text-sm text-slate-100">
                <li>✓ Full SOAP/consult documentation read against ICD-10, CPT &amp; AMA MDM guidelines</li>
                <li>✓ Captures every legally earned dollar while blocking unsupported/negated codes</li>
                <li>✓ Florida FCSO LCD/NCD, NCCI PTP, MUE &amp; Modifier rules verified upfront</li>
                <li>✓ Eligibility, Medicare Advantage, secondary FL Medicaid &amp; Federal QMB shields checked pre-claim</li>
                <li>✓ Anything missing is cleanly flagged for quick correction before touching the payer</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ILLUSTRATIVE BEFORE/AFTER CHART CATCH EXAMPLE */}
      <section className="py-12 px-4 bg-[#060f20] border-b border-white/10">
        <div className="max-w-5xl mx-auto rounded-2xl border border-[#00A8E8]/30 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00A8E8]">
              Illustrative Pre-Submission Catch Example
            </span>
            <span className="text-xs text-slate-400">Multi-Complaint Outpatient Visit + In-Office Procedure</span>
          </div>
          <div className="grid md:grid-cols-2 gap-5 text-sm">
            <div className="rounded-xl bg-rose-950/30 border border-rose-500/30 p-5">
              <div className="text-xs font-bold uppercase text-rose-300 mb-2">Draft Claim Before MBMB Scrutiny</div>
              <p className="text-slate-200 leading-relaxed">
                Superbill queued <code className="text-rose-200 font-bold">99213</code> + <code className="text-rose-200 font-bold">20610</code> without Modifier <code className="text-rose-200 font-bold">-25</code>, billed a sent-out MRI order in-office, and pointed both lines to a single generic Dx. High risk of instant NCCI CO-97 denial and undercoded E/M value.
              </p>
            </div>
            <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/35 p-5">
              <div className="text-xs font-bold uppercase text-emerald-300 mb-2">After AAPC + Scrutiny Sign-Off</div>
              <p className="text-slate-100 leading-relaxed">
                Verified Moderate MDM note supports <code className="text-emerald-200 font-bold">99214-25</code> + <code className="text-emerald-200 font-bold">20610</code>, removed ordered-only external imaging line for compliance, and mapped distinct ICD-10 pointers in Box 24E before payer submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS + FINAL CTA */}
      <section className="py-16 sm:py-20 px-4 bg-[#071124]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 mb-14">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl bg-white/[0.03] border border-white/10 p-6"
              >
                <h3 className="text-base sm:text-lg font-bold text-white">{faq.question}</h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#0066CC]/25 via-[#0a1e3d] to-emerald-500/15 border border-[#00A8E8]/40 p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Test Our Pre-Submission Scrutiny on 20 Claims — Free.
            </h2>
            <p className="text-slate-200 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
              We sign your HIPAA BAA first, review 20 recent charts or denied claims in 48 hours, and show you missing documentation links, modifier fixes, and estimated recoverable dollars—zero obligation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3.5">
              <Link
                href="/call-me?audience=provider"
                className="px-7 py-3.5 rounded-xl bg-[#0066CC] hover:bg-[#00A8E8] text-white font-extrabold text-sm sm:text-base transition"
              >
                Call, Text, or Book Free 15-Min Review →
              </Link>
              <a
                href="tel:+17866432099"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm sm:text-base transition"
              >
                📞 (786) 643-2099 · EN &amp; Español
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
