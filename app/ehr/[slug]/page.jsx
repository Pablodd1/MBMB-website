import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EHRS } from '../../data/seo-hubs';
import { BUSINESS_FACTS } from '../../config/business-facts';

export function generateStaticParams() {
  return EHRS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ehr = EHRS.find((e) => e.slug === slug);
  if (!ehr) return {};
  return {
    title: `${ehr.name} Medical Billing Services in Miami & Florida | MBMB`,
    description: `${ehr.shortDesc} Transparent ${BUSINESS_FACTS.pricing.headlineRange} (${BUSINESS_FACTS.pricing.setupFee}) by U.S. AAPC coders.`,
    alternates: { canonical: `https://medicalbillingmb.com/ehr/${ehr.slug}` },
  };
}

export default async function EhrDetailPage({ params }) {
  const { slug } = await params;
  const ehr = EHRS.find((e) => e.slug === slug);
  if (!ehr) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `${ehr.name} Medical Billing & RCM Services`,
        provider: { '@id': 'https://medicalbillingmb.com/#organization' },
        areaServed: 'Florida',
        description: ehr.shortDesc,
        url: `https://medicalbillingmb.com/ehr/${ehr.slug}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: ehr.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
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
            <Link href="/ehr" className="hover:text-white">EHR Systems</Link>
            <span>/</span>
            <span className="text-[#00A8E8] font-semibold">{ehr.name}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {ehr.name} Medical Billing Services
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
            {ehr.shortDesc}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white font-bold text-sm hover:opacity-95 transition"
            >
              Start Free 20-Claim Audit →
            </Link>
            <Link
              href="/client-portal"
              className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition"
            >
              View Client Portal Workflow
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-14 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            How MBMB Executes Inside {ehr.name}
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 mb-6">
            {ehr.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs sm:text-sm text-slate-600">
            <strong className="text-slate-900">Transparent Pricing:</strong> {BUSINESS_FACTS.pricing.headlineRange} ({BUSINESS_FACTS.pricing.setupFee}, $0 monthly minimum). Your practice retains 100% EHR ownership and live reporting visibility.
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">FAQ</h2>
          {ehr.faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="text-base font-bold text-slate-900 mb-1">{faq.q}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
