import Link from 'next/link';
import { SPECIALTIES } from '../data/seo-hubs';
import { BUSINESS_FACTS } from '../config/business-facts';

export const metadata = {
  title: 'Medical Billing Specialties in Miami & Florida | 12+ Clinical Verticals',
  description:
    'Specialty-trained U.S. AAPC medical billing and coding for ABA Therapy, Behavioral Health, Cardiology, Orthopedics, Dermatology, Urgent Care, Pediatrics, Primary Care, Home Health, ASC, OB/GYN, and Physical Therapy.',
  alternates: { canonical: 'https://medicalbillingmb.com/specialties' },
};

export default function SpecialtiesIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-[#0a1628] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#00A8E8]/15 border border-[#00A8E8]/30 text-[#00A8E8] text-xs font-bold uppercase tracking-wider mb-4">
            Specialty-Specific AAPC Coding + AI Double-Check
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Medical Billing Specialties We Serve in South Florida
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Every specialty has unique modifier traps, prior-authorization rules, and Florida payer edits. Explore our specialty-tuned billing workflows—backed by transparent {BUSINESS_FACTS.pricing.headlineRange} ({BUSINESS_FACTS.pricing.setupFee}).
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALTIES.map((spec) => (
            <Link
              key={spec.slug}
              href={`/specialties/${spec.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-[#0066CC] transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0066CC] transition">
                  {spec.name}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{spec.shortDesc}</p>
                <p className="text-[11px] font-mono text-slate-500 bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-100">
                  {spec.commonCodes}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 text-xs font-bold text-[#0066CC]">
                View Specialty Billing Guide →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
