import Link from 'next/link';
import { BUSINESS_FACTS } from '../config/business-facts';

export const metadata = {
  title: 'Client Portal & Secure HIPAA Document Transfer',
  description:
    'Access your MBMB client coordination hub, EHR billing dashboard links, encrypted HIPAA document transfer instructions, and Miami Beach account support.',
  alternates: {
    canonical: 'https://medicalbillingmb.com/client-portal',
  },
};

export default function ClientPortalPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="bg-[#0a1628] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A8E8]/15 border border-[#00A8E8]/30 text-[#00A8E8] text-xs font-bold uppercase tracking-wider mb-4">
            HIPAA-Aligned Client Access
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            MBMB Client Portal &amp; Secure Document Hub
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Unlike billing vendors that lock your data inside proprietary software, MBMB works directly inside your existing EHR/PM platform so you retain 100% ownership of your patient records, claims history, and real-time A/R dashboards.
          </p>
        </div>
      </section>

      {/* Main Cards */}
      <section className="max-w-5xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0066CC] mb-2">
              Active Healthcare Practices
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Real-Time EHR &amp; Financial Reporting Access
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              Active clients view live claim status, 835 ERA payment postings, and 30/60/90/120+ aging buckets directly inside their own EHR (eClinicalWorks, Athenahealth, Tebra/Kareo, AdvancedMD, DrChrono, NextGen, ModMed, or SimplePractice), paired with MBMB&apos;s monthly executive reconciliation packets.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/ehr"
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-slate-800 transition"
              >
                Supported EHR Systems →
              </Link>
              <Link
                href="/call-me"
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold hover:bg-slate-100 transition"
              >
                Message Account Coordinator
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
              New Audits &amp; Attorney Case Files
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Encrypted HIPAA / BAA File Transfer
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              Before transmitting any 20-claim proof-test batch, Pre-Submission Scrutiny chart packet, or Personal Injury medical billing file, MBMB executes your HIPAA Business Associate Agreement (BAA) or NDA and provisions a dedicated encrypted transfer link.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/consultation"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white text-xs sm:text-sm font-bold hover:opacity-95 transition"
              >
                Request BAA &amp; Encrypted Upload Link →
              </Link>
            </div>
          </div>
        </div>

        {/* Security & Direct Support Strip */}
        <div className="rounded-2xl bg-[#0a1628] text-white p-7 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Need Immediate Portal or Billing Help?</h3>
              <p className="text-sm text-slate-300 max-w-2xl">
                {BUSINESS_FACTS.compliance.phiWarningShort} Call our Miami Beach hub directly or request an immediate callback.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={BUSINESS_FACTS.contact.phoneHref}
                className="px-5 py-2.5 rounded-xl bg-white text-[#0a1628] font-bold text-sm hover:bg-slate-100 transition"
              >
                📞 {BUSINESS_FACTS.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${BUSINESS_FACTS.contact.email}`}
                className="px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 transition"
              >
                Email Coordinator
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
