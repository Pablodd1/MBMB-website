import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { BUSINESS_FACTS } from '../config/business-facts';

export const metadata = {
  title: 'For Healthcare Providers | End-to-End Revenue Cycle Management Miami',
  description:
    'Medical billing, AAPC-certified coding, credentialing, and AR recovery for Florida healthcare practices. Human coding expertise paired with AI pre-submission double-check. Transparent 5.6%–10% collection rates.',
  alternates: {
    canonical: 'https://medicalbillingmb.com/for-providers',
  },
  openGraph: {
    title: 'For Healthcare Providers | Medical Billing Miami Beach (MBMB)',
    description:
      'End-to-end medical billing and revenue cycle management for independent practices, clinics, and telehealth groups. Human AAPC-certified review + AI double-check.',
    url: 'https://medicalbillingmb.com/for-providers',
    type: 'website',
  },
};

const deliverables = [
  {
    title: 'Pre-Submission Scrubbing (Human + AI Double-Check)',
    description:
      'Every superbill and encounter is reviewed by U.S. AAPC-certified coders and cross-checked with AI rule verification for NCCI bundling, modifier accuracy, and payer-specific LCD/NCD compliance before submission.',
    badge: '01',
    image: '/raster/medical-coding-cpt-hcpcs.webp',
  },
  {
    title: 'Daily Claim Submission & ERA Auto-Posting',
    description:
      'Clean claims are submitted within 24–48 business hours of receiving complete chart documentation. Electronic Remittance Advice (ERA) payments and adjustments are reconciled daily.',
    badge: '02',
    image: '/raster/Time-Saving-Medical-Billing-Solutions.webp',
  },
  {
    title: 'Proactive Denial Management & Appeals',
    description:
      'Zero write-offs without investigation. Every CO, PR, or OA denial is categorized, corrected, or appealed with clinical documentation references within 48 hours of receipt.',
    badge: '03',
    image: '/raster/medical-coding-modifiers.webp',
  },
  {
    title: 'Provider Credentialing & Enrollment',
    description:
      'CAQH ProView maintenance, NPI Type 1 & Type 2 registration, Medicare PECOS, Florida Medicaid, and commercial payer contracting managed end-to-end.',
    badge: '04',
    image: '/raster/Medical-Billing-and-Coding-Specialists.webp',
  },
  {
    title: 'Monthly Financial & Aging Transparency',
    description:
      'Clear monthly executive packets covering gross collection rate, net collection percentage, days in AR, 30/60/90/120+ aging buckets, and payer mix performance.',
    badge: '05',
    image: '/raster/healthcare-revenue-cycle-management-companies.webp',
  },
  {
    title: 'Seamless EHR & PM Integration',
    description:
      'We work inside your existing EHR and Practice Management platform—including Athenahealth, Kareo/Tebra, AdvancedMD, eClinicalWorks, DrChrono, NextGen, and Epic.',
    badge: '06',
    image: '/raster/medical-coding-icd.webp',
  },
];

const specialties = [
  'Primary Care & Internal Medicine',
  'Cardiology & Vascular',
  'Orthopedics & Pain Management',
  'Behavioral Health & Psychiatry',
  'Urgent Care & Walk-In Clinics',
  'Dermatology & Plastic Surgery',
  'OB/GYN & Women’s Health',
  'Telehealth & Multi-State Groups',
];

const faqs = [
  {
    question: 'Do we have to switch our EHR or Practice Management software?',
    answer:
      'No. Our fulfillment team integrates directly with your current EHR/PM system and clearinghouse via role-based, HIPAA-aligned access so your providers and front-desk staff keep their familiar clinical workflow.',
  },
  {
    question: 'How does your percentage-of-collections pricing work?',
    answer:
      'Our standard Revenue Cycle Management fees range from 5.6% to 10% of actual collections depending on monthly claim volume, specialty complexity, and scope of services. There are $0 setup fees and no fees on uncollected claims.',
  },
  {
    question: 'How do you combine human billers with AI verification?',
    answer:
      'Your claims are never left to unverified automation. Experienced U.S. AAPC-certified coders review clinical documentation first, and our AI verification layer performs a secondary audit to catch missing modifiers, diagnosis-to-CPT mismatches, or frequency limits prior to transmission.',
  },
  {
    question: 'Who is our day-to-day point of contact?',
    answer:
      'Medical Billing Miami Beach (MBMB) serves as your dedicated Miami Beach account coordination and client communication hub, working seamlessly alongside our experienced U.S. certified medical billing fulfillment partner.',
  },
];

export default function ForProvidersPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#060d18] text-white">
      <Script
        id="for-providers-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section with Background Image & Visual Showcase */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#0a1628] via-[#0f1f38] to-[#060d18]">
        {/* Ambient Glow Accents */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00A8E8 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #0066CC 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A8E8]/15 border border-[#00A8E8]/40 text-[#00A8E8] text-xs uppercase tracking-widest font-bold mb-6">
              <span>For Healthcare Providers &amp; Medical Practices</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white">
              End-to-End Revenue Cycle Management Built for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8E8] to-cyan-300">
                98%+ Clean Claims
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8">
              Medical Billing Miami Beach (MBMB) coordinates responsive local account management with an experienced U.S. AAPC-certified fulfillment team—combining meticulous human coding review with an AI pre-submission double-check so your practice collects more with fewer denials.
            </p>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 max-w-xl">
              <div className="bg-[#0a1628]/90 border border-[#00A8E8]/30 rounded-xl p-3.5 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-[#00A8E8]">5.6%–10%</div>
                <div className="text-[11px] sm:text-xs text-slate-300">Of Net Collections</div>
              </div>
              <div className="bg-[#0a1628]/90 border border-emerald-400/30 rounded-xl p-3.5 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">$0 Fee</div>
                <div className="text-[11px] sm:text-xs text-slate-300">Standard Setup</div>
              </div>
              <div className="bg-[#0a1628]/90 border border-[#00A8E8]/30 rounded-xl p-3.5 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-white">24–48h</div>
                <div className="text-[11px] sm:text-xs text-slate-300">Claim Turnaround</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066CC] to-[#00A8E8] hover:opacity-95 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-[#0066CC]/30 transition"
              >
                <span>Request a Free Revenue Audit</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href={`tel:${BUSINESS_FACTS.contact.phoneTel}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-4 rounded-xl transition"
              >
                <span>📞 Call {BUSINESS_FACTS.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Hero Image Collage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#00A8E8]/40 shadow-2xl bg-[#0a1628]">
              <Image
                src="/raster/Medical-Billing-and-Coding-Specialists.webp"
                alt="AAPC-Certified Medical Billing and Coding Specialists for Healthcare Providers"
                width={640}
                height={420}
                className="w-full h-64 sm:h-72 object-cover"
                priority
              />
              <div className="p-4 bg-gradient-to-t from-[#060d18] via-[#0a1628]/95 to-transparent">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A8E8]">
                  Human AAPC Review + AI Verification
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  Every chart note and superbill is reviewed by certified coders and double-checked by AI before transmission.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-white/15 bg-[#0a1628] shadow-lg">
                <Image
                  src="/raster/medical-coding-cpt-hcpcs.webp"
                  alt="CPT and HCPCS Medical Coding Verification"
                  width={320}
                  height={200}
                  className="w-full h-28 object-cover"
                />
                <div className="p-2.5 text-center text-xs font-semibold text-slate-200">
                  CPT / ICD-10 / HCPCS Audit
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/15 bg-[#0a1628] shadow-lg">
                <Image
                  src="/raster/healthcare-revenue-cycle-management-companies.webp"
                  alt="Healthcare Revenue Cycle Management Analytics"
                  width={320}
                  height={200}
                  className="w-full h-28 object-cover"
                />
                <div className="p-2.5 text-center text-xs font-semibold text-slate-200">
                  Daily ERA &amp; A/R Recovery
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Deliverables with Images */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <span className="text-[#00A8E8] text-xs font-bold uppercase tracking-widest">
            Full-Service Revenue Cycle Management
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold mt-2 mb-4 text-white">
            What Your Practice Receives Every Month
          </h2>
          <p className="text-slate-300 leading-relaxed">
            From patient eligibility verification and charge capture through ERA posting and secondary appeals, our team manages the complete administrative billing lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {deliverables.map((item) => (
            <div
              key={item.title}
              className="bg-[#0f1f38] border border-[#00A8E8]/25 rounded-2xl overflow-hidden hover:border-[#00A8E8] transition-all shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-[#0a1628]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={480}
                    height={260}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-[#0a1628]/90 border border-[#00A8E8]/50 flex items-center justify-center font-mono text-[#00A8E8] font-bold text-sm shadow-md">
                    {item.badge}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transparent Pricing Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a1628] to-[#0f1f38] border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#00A8E8] text-xs font-bold uppercase tracking-widest">
              Aligned Incentives • $0 Setup Fee
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold mt-2 mb-4 text-white">
              Transparent Percentage-of-Collections Pricing ({BUSINESS_FACTS.pricing.rcmRangeDisplay})
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              We only get paid when your practice gets paid. Rates are tailored to your monthly claim volume, specialty mix, and required administrative scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {BUSINESS_FACTS.pricing.tiers.map((tier, idx) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-7 border flex flex-col justify-between ${
                  idx === 1
                    ? 'bg-gradient-to-b from-[#0066CC]/30 to-[#0a1628] border-[#00A8E8] shadow-2xl shadow-[#00A8E8]/15'
                    : 'bg-[#060d18]/90 border-white/15'
                }`}
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    {tier.volume}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{tier.name}</h3>
                  <div className="text-4xl font-extrabold text-[#00A8E8] mb-2">
                    {tier.rate}
                  </div>
                  <div className="text-xs text-slate-400 mb-5">{tier.basis}</div>
                  <p className="text-sm text-slate-200 leading-relaxed mb-6">
                    {tier.bestFor}
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-200 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Human AAPC-certified coding + AI claim scrubbing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Daily EDI claim submission &amp; ERA payment posting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Denial management, appeals &amp; monthly AR reporting</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/consultation"
                  className="w-full text-center py-3.5 px-4 rounded-xl font-bold bg-gradient-to-r from-[#0066CC] to-[#00A8E8] hover:opacity-95 text-white transition shadow-md"
                >
                  Request Custom Proposal
                </Link>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-400 text-center max-w-3xl mx-auto italic">
            {BUSINESS_FACTS.pricing.interimDisclaimer}
          </p>
        </div>
      </section>

      {/* Specialties & Operating Model */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
              Specialties We Support Across Florida &amp; Nationwide
            </h2>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Whether you operate an independent single-provider clinic in Miami-Dade or a multi-location group practice, our billing workflows adapt to specialty-specific coding rules, prior authorizations, and telehealth modifiers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {specialties.map((spec) => (
                <div
                  key={spec}
                  className="flex items-center gap-2.5 bg-[#0f1f38] border border-[#00A8E8]/25 rounded-xl px-4 py-3 text-sm text-slate-100"
                >
                  <span className="text-[#00A8E8] font-bold">✓</span>
                  <span>{spec}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 text-[#00A8E8] hover:underline font-semibold text-sm"
              >
                <span>See our 5-step operational workflow →</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold text-sm"
              >
                <span>Explore individual billing &amp; credentialing services →</span>
              </Link>
            </div>
          </div>

          <div className="bg-[#0f1f38] border border-[#00A8E8]/30 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/raster/join-medical-billing-coding-miami-beach-today.webp"
              alt="Miami Beach Medical Billing Coordination and Certified U.S. Fulfillment"
              width={600}
              height={320}
              className="w-full h-52 object-cover"
            />
            <div className="p-7 sm:p-8">
              <div className="inline-flex items-center gap-2 text-[#00A8E8] text-xs font-bold uppercase tracking-widest mb-3">
                <span>Accountable Operating Structure</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                Local Miami Beach Coordination + Certified U.S. Fulfillment
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {BUSINESS_FACTS.operatingModel.summary}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {BUSINESS_FACTS.operatingModel.aiVerificationStatement}
              </p>
              <div className="border-t border-white/10 pt-5 space-y-2 text-xs text-slate-400">
                <div>🕐 Support Hours: {BUSINESS_FACTS.hours.display}</div>
                <div>📍 Headquartered in {BUSINESS_FACTS.address.fullDisplay}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-white">
          Frequently Asked Questions for Providers
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-[#0f1f38] border border-white/15 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0a1628] via-[#0f1f38] to-[#0a1628] border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-white">
            Ready to Benchmark Your Practice’s Collection Rate?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Schedule a confidential 15-minute revenue cycle consultation. Please do not submit patient-identifying information (PHI) through public web forms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0066CC] to-[#00A8E8] hover:opacity-95 text-white font-bold px-8 py-4 rounded-xl transition shadow-lg"
            >
              <span>Request Consultation →</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl transition"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
