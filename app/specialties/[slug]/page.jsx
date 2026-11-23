import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SPECIALTIES } from '../../data/seo-hubs';
import { BUSINESS_FACTS } from '../../config/business-facts';

export function generateStaticParams() {
  return SPECIALTIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const spec = SPECIALTIES.find((s) => s.slug === slug);
  if (!spec) return {};
  return {
    title: `${spec.name} Medical Billing Services Miami & Florida | MBMB`,
    description: `${spec.shortDesc} Transparent ${BUSINESS_FACTS.pricing.headlineRange} (${BUSINESS_FACTS.pricing.setupFee}) by U.S. AAPC coders + AI pre-submission verification.`,
    alternates: { canonical: `https://medicalbillingmb.com/specialties/${spec.slug}` },
  };
}

export default async function SpecialtyDetailPage({ params }) {
  const { slug } = await params;
  const spec = SPECIALTIES.find((s) => s.slug === slug);
  if (!spec) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `${spec.name} Medical Billing & Coding Services`,
        provider: { '@id': 'https://medicalbillingmb.com/#organization' },
        areaServed: 'Florida',
        description: spec.shortDesc,
        url: `https://medicalbillingmb.com/specialties/${spec.slug}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: spec.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://medicalbillingmb.com' },
          { '@type': 'ListItem', position: 2, name: 'Specialties', item: 'https://medicalbillingmb.com/specialties' },
          { '@type': 'ListItem', position: 3, name: spec.name, item: `https://medicalbillingmb.com/specialties/${spec.slug}` },
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
            <Link href="/specialties" className="hover:text-white">Specialties</Link>
            <span>/</span>
            <span className="text-[#00A8E8] font-semibold">{spec.name}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {spec.name} Medical Billing Services
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-4">
            {spec.shortDesc}
          </p>
          <div className="inline-block font-mono text-xs bg-white/10 border border-white/15 text-[#00A8E8] px-3 py-1.5 rounded-lg mb-8">
            Core Codes &amp; Modifiers: {spec.commonCodes}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white font-bold text-sm hover:opacity-95 transition"
            >
              Test Us on 20 Denied Claims (Free) →
            </Link>
            <Link
              href="/services/pre-submission-scrutiny"
              className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition"
            >
              Add Pre-Submission Clinical Scrutiny
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-14 px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Common {spec.name} Denial Triggers
            </h2>
            <ul className="space-y-3 text-sm text-slate-700">
              {spec.denialRisks.map((risk) => (
                <li key={risk} className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold mt-0.5">•</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              How MBMB Protects Your Net Collections
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{spec.howMbmbHelps}</p>
            <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-4 text-sm">
              <div className="font-bold text-emerald-900 mb-1">
                {BUSINESS_FACTS.pricing.headlineRange} · {BUSINESS_FACTS.pricing.setupFee}
              </div>
              <p className="text-xs text-emerald-800">
                U.S. AAPC-certified coders + AI double-check · $0 monthly minimum · Work directly inside your current EHR.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            Frequently Asked Questions — {spec.name} Billing
          </h2>
          <div className="space-y-4">
            {spec.faqs.map((faq) => (
              <div key={faq.q} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                <h3 className="text-base font-bold text-slate-900 mb-1">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
