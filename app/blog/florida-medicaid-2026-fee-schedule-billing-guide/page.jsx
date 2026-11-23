import Link from 'next/link';

export const metadata = {
  title: 'Florida Medicaid 2026 Fee Schedule & Managed Care Billing Guide | MBMB',
  description:
    'Key billing rules for Florida AHCA Medicaid and Miami-Dade managed care plans (Simply, Sunshine, Humana, Molina): timely filing, enrollment, VFC vaccines, and denial prevention.',
  alternates: { canonical: 'https://medicalbillingmb.com/blog/florida-medicaid-2026-fee-schedule-billing-guide' },
};

export default function FloridaMedicaidFeeScheduleGuide() {
  return (
    <article className="min-h-screen bg-white text-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-xs text-slate-500 mb-4 flex gap-2">
          <Link href="/blog" className="hover:text-[#0066CC]">Blog</Link>
          <span>/</span>
          <span>Florida Medicaid</span>
        </div>
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0066CC] text-xs font-bold uppercase tracking-wider mb-3">
          Florida Payer Guide · Nov 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5">
          Florida Medicaid 2026 Fee Schedule &amp; Managed Care Billing Checklist
        </h1>
        <p className="text-slate-600 text-base leading-relaxed mb-8">
          Navigating Florida AHCA Medicaid alongside Miami-Dade managed care plans (Simply Healthcare, Sunshine Health, Humana Healthy Horizons, and Molina) requires strict adherence to practitioner fee schedules, timely filing windows, and active Medicaid IDs.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-3">Critical 2026 Florida Medicaid Billing Rules</h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
          <li><strong>Verify Managed Care Plan Monthly:</strong> Florida Medicaid recipients frequently switch MMA plans on the 1st of the month—check eligibility before every visit to avoid routing claims to the wrong payer ID.</li>
          <li><strong>Timely Filing Discipline:</strong> While straight Florida Medicaid allows up to 12 months, MMA managed care plans often enforce strict 90-to-180-day initial filing windows and shorter appeal windows.</li>
          <li><strong>Pediatric VFC &amp; Behavioral Health Rules:</strong> Apply Modifier SL on VFC vaccines and verify BCBA/RBT or rendering-clinician Florida Medicaid ID linkage before billing 9715x or psychotherapy codes.</li>
          <li><strong>Provider Revalidation:</strong> Never let AHCA Medicaid revalidation or CAQH ProView attestations lapse—claims suspend immediately when enrollment status flips to inactive.</li>
        </ul>

        <div className="rounded-2xl bg-[#0a1628] text-white p-7 mt-10">
          <h3 className="text-xl font-bold mb-2">Eliminate Florida Medicaid &amp; HMO Write-Offs</h3>
          <p className="text-slate-300 text-sm mb-5">
            MBMB’s Miami Beach hub and U.S. AAPC-certified coders manage Florida Medicaid billing, credentialing, and denial appeals at 5.6%–10% of net collections ($0 setup fee).
          </p>
          <Link href="/consultation" className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00A8E8] text-white font-bold text-sm">
            Claim Your Free 20-Claim Audit →
          </Link>
        </div>
      </div>
    </article>
  );
}
