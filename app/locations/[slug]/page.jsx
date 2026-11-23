import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LOCATIONS } from '../../data/seo-hubs';
import { BUSINESS_FACTS } from '../../config/business-facts';

export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) return {};
  return {
    title: `Medical Billing Services in ${loc.city}, FL | Coding, RCM & Credentialing`,
    description: `Outsourced medical billing, AAPC-certified coding, credentialing, and denial recovery for ${loc.city} (${loc.county}) clinics. Transparent ${BUSINESS_FACTS.pricing.headlineRange}, ${BUSINESS_FACTS.pricing.setupFee}.`,
    alternates: { canonical: `https://medicalbillingmb.com/locations/${loc.slug}` },
  };
}

export default async function LocationDetailPage({ params }) {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `Medical Billing & RCM Services in ${loc.city}, FL`,
        provider: { '@id': 'https://medicalbillingmb.com/#organization' },
        areaServed: { '@type': 'City', name: `${loc.city}, FL` },
        description: loc.intro,
        url: `https://medicalbillingmb.com/locations/${loc.slug}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: loc.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://medicalbillingmb.com' },
          { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://medicalbillingmb.com/locations' },
          { '@type': 'ListItem', position: 3, name: loc.city, item: `https://medicalbillingmb.com/locations/${loc.slug}` },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-[#0a1628] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-xs text-slate-400 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-white">Locations</Link>
            <span>/</span>
            <span className="text-[#00A8E8] font-semibold">{loc.city}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Medical Billing &amp; RCM Services in {loc.city}, FL
          </h1>
          <p className="text-[#00A8E8] text-sm font-semibold mb-4">
            Serving {loc.corridor} · {loc.county}
          </p>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
            {loc.intro}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white font-bold text-sm hover:opacity-95 transition"
            >
              Claim Free 48-Hour 20-Claim Audit →
            </Link>
            <a
              href={BUSINESS_FACTS.contact.phoneHref}
              className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition"
            >
              📞 Call {BUSINESS_FACTS.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-14 px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Top Revenue Leaks We Fix in {loc.city}
            </h2>
            <ul className="space-y-3 text-sm text-slate-700">
              {loc.topLeaks.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Local Payer Focus &amp; Transparent Pricing
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              <strong className="text-slate-900">Key Regional Payers:</strong> {loc.payerFocus}
            </p>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm">
              <div className="font-bold text-slate-900 mb-1">
                {BUSINESS_FACTS.pricing.headlineRange} · {BUSINESS_FACTS.pricing.setupFee}
              </div>
              <p className="text-xs text-slate-600">
                $0 monthly minimum. Keep your existing EHR (eCW, Athenahealth, Tebra, AdvancedMD, ModMed, DrChrono). U.S. AAPC coders + AI pre-submission double-check.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            Frequently Asked Questions — {loc.city} Medical Billing
          </h2>
          <div className="space-y-4">
            {loc.faqs.map((faq) => (
              <div key={faq.q} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                <h3 className="text-base font-bold text-slate-900 mb-1">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-xs font-semibold">
          <Link href="/specialties" className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#0066CC] text-slate-700">
            Browse 12+ Specialties →
          </Link>
          <Link href="/ehr" className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#0066CC] text-slate-700">
            Supported EHR Platforms →
          </Link>
          <Link href="/for-providers" className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#0066CC] text-slate-700">
            View Full Pricing Tiers →
          </Link>
        </div>
      </section>
    </div>
  );
}
