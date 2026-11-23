import Link from 'next/link';
import { EHRS } from '../data/seo-hubs';
import { BUSINESS_FACTS } from '../config/business-facts';

export const metadata = {
  title: 'Supported EHR & Practice Management Systems | Medical Billing Miami Beach',
  description:
    'Keep your existing EHR. MBMB bills directly inside eClinicalWorks, Athenahealth, Tebra (Kareo), AdvancedMD, DrChrono, NextGen, SimplePractice, and ModMed with $0 setup fee.',
  alternates: { canonical: 'https://medicalbillingmb.com/ehr' },
};

export default function EhrIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-[#0a1628] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#00A8E8]/15 border border-[#00A8E8]/30 text-[#00A8E8] text-xs font-bold uppercase tracking-wider mb-4">
            Zero Forced EHR Migrations · 100% Data Ownership
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Medical Billing Inside Your Existing EHR
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Never get locked into a billing vendor’s proprietary software. MBMB logs securely into your practice’s EHR under a signed HIPAA BAA—with {BUSINESS_FACTS.pricing.setupFee} and {BUSINESS_FACTS.pricing.headlineRange}.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EHRS.map((ehr) => (
            <Link
              key={ehr.slug}
              href={`/ehr/${ehr.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-[#0066CC] transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0066CC] transition">
                  {ehr.name}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{ehr.shortDesc}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 text-xs font-bold text-[#0066CC]">
                View {ehr.name} Billing →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
