import Link from 'next/link';
import { BUSINESS_FACTS } from '../config/business-facts';

export const metadata = {
  title: 'About Us | Medical Billing Miami Beach (MBMB)',
  description:
    'Learn about Medical Billing Miami Beach (MBMB), our Miami Beach account coordination hub, our U.S. AAPC-certified medical billing fulfillment team, and our Human + AI double-check philosophy.',
  alternates: {
    canonical: 'https://medicalbillingmb.com/about',
  },
  openGraph: {
    title: 'About Medical Billing Miami Beach (MBMB)',
    description:
      'Miami Beach medical billing and revenue cycle coordination backed by U.S. AAPC-certified coding professionals and AI pre-submission double-check.',
    url: 'https://medicalbillingmb.com/about',
    type: 'website',
  },
};

const values = [
  {
    title: 'Accountable Local Coordination',
    description:
      'Based in Miami Beach, Florida, MBMB provides direct, responsive account coordination so healthcare providers and legal teams never feel lost in an anonymous call-center queue.',
    badge: '01',
  },
  {
    title: 'Veteran U.S. Certified Fulfillment',
    description:
      'We operate in partnership with an established U.S. medical billing and coding fulfillment team bringing 10+ years of multi-specialty revenue cycle, credentialing, and denial recovery experience.',
    badge: '02',
  },
  {
    title: 'Human Coding Review + AI Double-Check',
    description:
      'Every claim and billing ledger is reviewed by skilled human specialists and verified with AI quality-control checks to catch modifier gaps, bundling conflicts, and duplicate charges.',
    badge: '03',
  },
  {
    title: 'Compliance-First Communication',
    description:
      'We maintain strict HIPAA-aligned workflows, transparent percentage-of-collections pricing, and clear administrative boundaries across both healthcare and legal support engagements.',
    badge: '04',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-charcoal text-white">
      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-navy to-charcoal">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink/15 border border-pink/30 text-pink text-xs uppercase tracking-widest font-semibold mb-6">
            About {BUSINESS_FACTS.shortName}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
            Dedicated Miami Beach Coordination Backed by Certified U.S. Billing Specialists
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            {BUSINESS_FACTS.brandName} ({BUSINESS_FACTS.shortName}) bridges the gap between high-touch local client service in South Florida and scalable, AAPC-certified revenue cycle execution.
          </p>
        </div>
      </section>

      {/* Mission & Operating Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Who We Are &amp; How We Serve Clients
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Independent physicians, specialty clinics, and telehealth providers face rising payer scrutiny, complex prior-authorization rules, and costly front-end claim rejections. At the same time, legal teams handling medical-heavy matters often struggle with fragmented provider bills, EOBs, and unclear balance ledgers.
            </p>
            <p className="text-gray-300 leading-relaxed">
              {BUSINESS_FACTS.operatingModel.summary}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {BUSINESS_FACTS.operatingModel.aiVerificationStatement}
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-navy/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                <span className="text-pink font-bold mt-0.5">✓</span>
                <div>
                  <div className="font-bold text-sm text-white">For Healthcare Practices</div>
                  <p className="text-xs text-gray-300 mt-1">
                    Full-cycle RCM, coding, credentialing, and denial appeals at {BUSINESS_FACTS.pricing.rcmRangeDisplay} of collections.
                  </p>
                </div>
              </div>
              <div className="bg-navy/60 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                <span className="text-pink font-bold mt-0.5">✓</span>
                <div>
                  <div className="font-bold text-sm text-white">For Legal Teams</div>
                  <p className="text-xs text-gray-300 mt-1">
                    Administrative medical bill organization, source-linked chronologies, and balance reconciliation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Contact Card */}
          <div className="lg:col-span-5 bg-navy border border-white/10 rounded-2xl p-7">
            <h3 className="text-xl font-bold mb-4">
              Miami Beach Headquarters &amp; Contact
            </h3>
            <ul className="space-y-4 text-sm text-gray-300 mb-6">
              <li>
                <div className="font-semibold text-white">📍 Location</div>
                <div>{BUSINESS_FACTS.address.fullDisplay}</div>
              </li>
              <li>
                <div className="font-semibold text-white">📞 Phone &amp; WhatsApp</div>
                <a
                  href={`tel:${BUSINESS_FACTS.contact.phoneTel}`}
                  className="hover:text-pink transition"
                >
                  {BUSINESS_FACTS.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <div className="font-semibold text-white">📧 Email</div>
                <a
                  href={`mailto:${BUSINESS_FACTS.contact.email}`}
                  className="hover:text-pink transition"
                >
                  {BUSINESS_FACTS.contact.email}
                </a>
              </li>
              <li>
                <div className="font-semibold text-white">🕐 Business Hours</div>
                <div>{BUSINESS_FACTS.hours.display}</div>
              </li>
            </ul>

            <Link
              href="/consultation"
              className="w-full inline-flex items-center justify-center gap-2 bg-pink hover:bg-pink/90 text-white font-semibold py-3.5 px-6 rounded-xl transition"
            >
              <span>Schedule a Discovery Call →</span>
            </Link>
          </div>
        </div>

        {/* 4 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-navy/70 border border-white/10 rounded-2xl p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-pink/15 border border-pink/30 flex items-center justify-center mb-4 font-mono text-pink font-bold">
                {v.badge}
              </div>
              <h3 className="text-lg font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
