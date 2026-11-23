import Link from 'next/link';
import { LOCATIONS } from '../data/seo-hubs';
import { BUSINESS_FACTS } from '../config/business-facts';

export const metadata = {
  title: 'South Florida Medical Billing Service Areas | Miami-Dade, Broward & Palm Beach',
  description:
    'Local medical billing, AAPC-certified coding, credentialing, and denial recovery across Miami Beach, Coral Gables, Brickell, Aventura, Doral, Kendall, Hialeah, Fort Lauderdale, Boca Raton, and West Palm Beach.',
  alternates: { canonical: 'https://medicalbillingmb.com/locations' },
};

export default function LocationsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-[#0a1628] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#00A8E8]/15 border border-[#00A8E8]/30 text-[#00A8E8] text-xs font-bold uppercase tracking-wider mb-4">
            Local South Florida Coverage
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Medical Billing Services Across South Florida
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Coordinated locally from Miami Beach with U.S. AAPC-certified coders and AI pre-submission double-check—transparent {BUSINESS_FACTS.pricing.headlineRange} ({BUSINESS_FACTS.pricing.setupFee}) across Miami-Dade, Broward, and Palm Beach counties.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-[#0066CC] transition flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066CC]">
                  {loc.county}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1 mb-2 group-hover:text-[#0066CC] transition">
                  Medical Billing in {loc.city}
                </h2>
                <p className="text-xs text-slate-500 font-medium mb-3">{loc.corridor}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{loc.intro}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 text-xs font-bold text-[#0066CC]">
                View {loc.city} Billing Guide →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
