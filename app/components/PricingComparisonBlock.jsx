import Link from 'next/link';
import { BUSINESS_FACTS } from '../config/business-facts';

const ROWS = [
  {
    factor: 'Fee Structure',
    mbmb: 'Transparent 5.6%–10% of actual net collections (volume-tiered)',
    lowTeaser: 'Headline "2.49%–3.99%" teaser (often restricted to very high volume)',
    saasBundle: '4%–5% RCM + $195–$799/mo per-provider software license',
  },
  {
    factor: 'Monthly Minimum Fee',
    mbmb: '$0 monthly minimum — you pay only on money collected',
    lowTeaser: 'Often $999–$1,295/mo minimum floor (pushes small clinics to 6%–9%+ effective)',
    saasBundle: 'Fixed monthly minimums + per-provider seat fees even in slow months',
  },
  {
    factor: 'Setup & EHR Switching',
    mbmb: '$0 setup fee · Keep your existing EHR (100% data ownership)',
    lowTeaser: 'May push proprietary billing software or charge migration fees',
    saasBundle: 'Mandatory EHR switch + paid implementation/training fees',
  },
  {
    factor: 'Contract Lock-In & Exit',
    mbmb: 'Transparent written proposal · No punitive multi-year lock-ins',
    lowTeaser: 'Common 2–3 year auto-renewals & early termination penalties',
    saasBundle: '3–5 year contracts with strict written notice windows',
  },
  {
    factor: 'Coding & Account Support',
    mbmb: 'U.S. AAPC-certified coders + AI double-check + Miami Beach EN/ES/HT coordinator',
    lowTeaser: 'High-volume offshore ticket queues & timezone delays',
    saasBundle: 'Call-center ticket queue; limited local South FL payer knowledge',
  },
];

export default function PricingComparisonBlock() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0066CC] text-xs font-bold uppercase tracking-wider mb-3">
            Transparent Economics · Zero Hidden Floors
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why &ldquo;2.49%&rdquo; Billing Teasers Often Cost More Than Transparent {BUSINESS_FACTS.pricing.rcmRangeDisplay}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Many national billing ads lead with ultra-low teaser percentages—then add $999–$1,295 monthly minimums, per-payer credentialing surcharges, mandatory EHR switches, and multi-year exit fees. Here is how MBMB compares on real monthly cost.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#0a1628] text-white">
                <th className="py-4 px-5 font-bold">Comparison Factor</th>
                <th className="py-4 px-5 font-bold bg-[#0066CC] text-white">
                  MBMB ({BUSINESS_FACTS.pricing.rcmRangeDisplay} · {BUSINESS_FACTS.pricing.setupFee})
                </th>
                <th className="py-4 px-5 font-bold text-slate-200">&ldquo;2.49%&rdquo; National Teaser Billers</th>
                <th className="py-4 px-5 font-bold text-slate-200">All-in-One EHR + RCM Bundles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {ROWS.map((row) => (
                <tr key={row.factor} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900 whitespace-nowrap">{row.factor}</td>
                  <td className="py-4 px-5 font-semibold text-emerald-900 bg-emerald-50/50 border-x border-emerald-100">
                    ✓ {row.mbmb}
                  </td>
                  <td className="py-4 px-5 text-slate-600">{row.lowTeaser}</td>
                  <td className="py-4 px-5 text-slate-600">{row.saasBundle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            <strong className="text-slate-900">Keep your current EHR &amp; test us risk-free:</strong> Send 20 denied or underpaid claims after BAA execution—our U.S. AAPC-certified fulfillment team estimates CPT/modifier fixes and recoverable dollars in 48 hours at $0 cost.
          </p>
          <Link
            href="/consultation"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white font-bold text-xs sm:text-sm hover:opacity-95 transition"
          >
            Request Written Proposal →
          </Link>
        </div>
      </div>
    </section>
  );
}
