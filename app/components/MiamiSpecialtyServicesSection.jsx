import Link from 'next/link';

const SPECIALIZED_MODULES = [
  {
    tag: 'Underpayment Recovery',
    title: 'Payer Contract Allowable Review & 835 Variance Auditing',
    desc: 'We check Explanation of Benefits (835 ERAs) against your executed payer fee schedules (Florida Blue, UHC, Aetna, Cigna, Medicare) so silent underpayments are appealed instead of closed as "paid in full."',
  },
  {
    tag: 'Miami-Dade HMO / VBC',
    title: 'Managed Care, Medicare Advantage MSO & RAF Coding Support',
    desc: 'South Florida practices face dense Medicare Advantage HMO and MSO rules. We support accurate HCC/RAF documentation alignment, referral tracking, and capitation encounter submissions.',
  },
  {
    tag: 'Net-New Medicare Revenue',
    title: 'CCM, RPM & MIPS Quality Billing Optimization',
    desc: 'Capture compliant Chronic Care Management (99490), Remote Patient Monitoring (RPM), Annual Wellness Visits, and MIPS quality documentation to expand recurring revenue and avoid Medicare penalties.',
  },
  {
    tag: 'Out-of-Network Claims',
    title: 'Out-of-Network & No Surprises Act (NSA) Dispute Support',
    desc: 'Structured claim documentation, payer negotiation packets, and timeline tracking for high-dollar out-of-network surgical, urgent care, and specialty reimbursements.',
  },
  {
    tag: 'Payer Audit Response',
    title: 'Post-Payment Audit Defense (TPE / UPIC / RAC) & Pre-Submission Scrutiny',
    desc: 'Pair our proactive "Scrutiny Before the Scrutiny" pre-submission chart review with structured administrative audit response packets when Medicare MAC (First Coast) or commercial payers request records.',
  },
  {
    tag: 'Modular / Unbundled',
    title: 'Keep Your In-House Staff — Add Only the Leaking Stage',
    desc: 'Not ready to outsource everything? Engage MBMB for standalone Legacy >90-Day A/R Cleanup, Prior Authorization & Eligibility Support, Credentialing/CAQH, or Pre-Submission Clinical Scrutiny.',
  },
];

export default function MiamiSpecialtyServicesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              Full-Cycle &amp; Modular South Florida Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Specialized RCM Capabilities Built for South Florida Payers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Beyond core 5.6%–10% full-cycle billing, MBMB supports the exact managed-care, underpayment, audit-defense, and unbundled rescue workflows Miami practices need most.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/specialties"
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:border-[#0066CC] hover:text-[#0066CC] transition"
            >
              Explore 18+ Specialties →
            </Link>
            <Link
              href="/locations"
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:border-[#0066CC] hover:text-[#0066CC] transition"
            >
              South FL Service Areas →
            </Link>
            <Link
              href="/ehr"
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:border-[#0066CC] hover:text-[#0066CC] transition"
            >
              Supported EHRs →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPECIALIZED_MODULES.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-[#00A8E8]/50 transition flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0066CC] bg-blue-50 px-2.5 py-1 rounded-md mb-3">
                  {item.tag}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  href="/consultation"
                  className="text-xs font-bold text-[#0066CC] hover:text-[#00A8E8] transition"
                >
                  Request Scope &amp; Proposal →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
