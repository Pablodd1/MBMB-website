import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Medical Bill Review, Chronologies & EOB Reconciliation for Legal Teams (2026 Guide)',
  description:
    'How personal injury attorneys, healthcare lawyers, and paralegals organize fragmented CMS-1500/UB-04 bills, reconcile EOB adjustments, spot duplicate CPT charges, and build source-linked medical billing chronologies.',
  keywords:
    'medical billing chronology for attorneys, forensic medical bill review administrative support, EOB reconciliation law firms, CMS-1500 UB-04 review personal injury Florida, duplicate CPT charge detection legal teams, Medical Billing Miami Beach',
  alternates: {
    canonical:
      'https://medicalbillingmb.com/blog/medical-billing-chronology-reconciliation-for-attorneys',
  },
  openGraph: {
    title:
      'Medical Bill Review, Chronologies & EOB Reconciliation for Legal Teams | MBMB',
    description:
      'A practical guide for attorneys and paralegals on turning scattered medical bills and EOBs into source-linked chronologies, plain-English code explanations, and charge-to-balance tables.',
    url: 'https://medicalbillingmb.com/blog/medical-billing-chronology-reconciliation-for-attorneys',
    type: 'article',
    images: [
      {
        url: 'https://medicalbillingmb.com/raster/medical-coding-cpt-hcpcs.webp',
        width: 1200,
        height: 630,
        alt: 'Medical Billing Chronology and EOB Reconciliation for Attorneys',
      },
    ],
  },
};

const faqs = [
  {
    question:
      'What is the difference between administrative medical bill organization and expert witness testimony?',
    answer:
      'Administrative medical bill organization and reconciliation focuses strictly on organizing itemized provider statements, CMS-1500/UB-04 forms, and Explanation of Benefits (EOB) records by date, provider, and code; translating CPT/ICD-10/HCPCS descriptions into plain English; and reconciling billed charges, payments, adjustments, and stated balances. It does not provide legal advice, expert witness testimony, or clinical opinions on medical necessity.',
  },
  {
    question:
      'Why do personal injury and medical-legal files often have conflicting balance totals?',
    answer:
      'Conflicting totals usually happen when summary statements are mixed with itemized ledgers, when facility (UB-04) and professional (CMS-1500) charges overlap on the same date of service, or when contractual adjustments and PIP/health insurance EOB payments have not been posted to the provider ledger.',
  },
  {
    question: 'How should a law firm share billing records for a pilot review?',
    answer:
      'Sensitive or patient-identifying records (PHI) should never be submitted through public website forms or unencrypted email. Law firms first contact our Miami Beach coordination desk via /for-attorneys to scope a pilot and establish an agreed encrypted file-transfer method.',
  },
];

export default function AttorneyBillingChronologyGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline:
          'Medical Bill Review, Chronologies & EOB Reconciliation for Personal Injury & Legal Teams (2026 Guide)',
        description:
          'How legal teams organize fragmented CMS-1500/UB-04 bills, reconcile EOB adjustments, spot duplicate CPT charges, and build source-linked medical billing chronologies.',
        datePublished: '2026-10-16',
        dateModified: '2026-10-16',
        author: {
          '@type': 'Organization',
          name: 'Medical Billing Miami Beach (MBMB)',
          url: 'https://medicalbillingmb.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Medical Billing Miami Beach (MBMB)',
          logo: {
            '@type': 'ImageObject',
            url: 'https://medicalbillingmb.com/mbmb-white.png',
          },
        },
        mainEntityOfPage:
          'https://medicalbillingmb.com/blog/medical-billing-chronology-reconciliation-for-attorneys',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-[#0a1628] text-slate-300 py-3 border-b border-white/10" aria-label="Breadcrumb">
        <div className="max-w-5xl mx-auto px-4">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li>/</li>
            <li className="text-[#00A8E8] font-semibold">Medical Billing Chronology &amp; Reconciliation for Legal Teams</li>
          </ol>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-gradient-to-b from-[#0a1628] to-[#11223d] text-white py-16 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink/15 border border-pink/40 text-pink text-xs font-bold uppercase tracking-wider mb-5">
            Legal Billing Support &amp; Chronologies · Reviewed October 16, 2026
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Medical Bill Review, Chronologies &amp; EOB Reconciliation for Legal Teams (2026 Guide)
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            When personal injury attorneys, healthcare litigators, and paralegals search for &ldquo;forensic medical billing review,&rdquo; what they most often need first is clean, source-linked administrative clarity: organizing scattered CMS-1500s, UB-04s, provider ledgers, and insurance EOBs into a single reconcilable table.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-xl p-4">
            <span><strong>Editorial Team:</strong> Medical Billing Miami Beach (MBMB) Coordination &amp; U.S. AAPC-Certified Coding Fulfillment Team</span>
            <span>·</span>
            <span><strong>Scope Notice:</strong> Administrative billing &amp; coding support only (not legal advice or clinical medical-necessity opinions).</span>
          </div>
        </div>
      </header>

      {/* Main Article Body */}
      <main className="max-w-4xl mx-auto px-4 py-14 space-y-12">
        <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <Image
            src="/raster/medical-coding-cpt-hcpcs.webp"
            alt="Medical Billing Chronology and CPT HCPCS Code Reconciliation for Law Firms"
            fill
            className="object-cover"
          />
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            1. Why Fragmented Medical Bills Slow Down Demand Preparation &amp; Mediation
          </h2>
          <p className="text-slate-700 leading-relaxed">
            In medical-heavy legal matters—such as personal injury, bodily injury, and multi-provider treatment claims—billing packets rarely arrive in a single standardized format. Paralegals and attorneys are frequently handed hundreds of PDF pages containing:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><strong>Mixed Claim Formats:</strong> Professional claims (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">CMS-1500</code>), institutional facility claims (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">UB-04 / CMS-1450</code>), and patient summary balance sheets that omit CPT/HCPCS line items.</li>
            <li><strong>Unapplied Adjustments &amp; Payments:</strong> Auto PIP logs, commercial health insurance Explanation of Benefits (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">835 ERA / EOB</code>), Medicare/Medicaid remits, and Letter of Protection (LOP) ledgers that do not match the stated balance.</li>
            <li><strong>Duplicate or Overlapping Line Items:</strong> Identical imaging or evaluation codes appearing on both a clinic summary statement and a separate billing company ledger.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            2. The 3 Core Deliverables of Administrative Medical Billing Support
          </h2>
          <p className="text-slate-700 leading-relaxed">
            At <Link href="/for-attorneys" className="text-[#0066CC] font-semibold hover:underline">Medical Billing Miami Beach (MBMB)</Link>, we pair experienced U.S. AAPC-certified coding specialists with an AI secondary check to deliver three structured administrative outputs for legal teams:
          </p>

          <div className="grid sm:grid-cols-3 gap-5 pt-2">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0066CC] mb-2">Pillar 01</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Source-Linked Billing Chronology</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every billed encounter is sorted chronologically by date of service, provider, and code—linked to the exact PDF document name and page number.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0066CC] mb-2">Pillar 02</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Plain-English Code Explanations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Standard CPT, ICD-10-CM, and HCPCS codes—along with modifiers like <code className="text-xs bg-white px-1 rounded">-25</code>, <code className="text-xs bg-white px-1 rounded">-59</code>, or <code className="text-xs bg-white px-1 rounded">-26/-TC</code>—are translated into clear, plain English.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0066CC] mb-2">Pillar 03</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Charge-to-Balance Reconciliation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Side-by-side comparison of billed charges, contractual adjustments, payer/PIP payments, and stated open balances, flagging duplicates or missing pages.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Illustrative Table */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            3. Illustrative Example: Source-Linked Chronology &amp; Reconciliation Table
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Below is an illustrative example showing how a raw packet of provider bills and EOBs is organized so an attorney or paralegal can verify every figure in seconds:
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0a1628] text-white">
                  <th className="p-3.5 font-semibold">Date of Service</th>
                  <th className="p-3.5 font-semibold">Provider</th>
                  <th className="p-3.5 font-semibold">Code &amp; Plain-English Description</th>
                  <th className="p-3.5 font-semibold">Billed</th>
                  <th className="p-3.5 font-semibold">Adj / Paid</th>
                  <th className="p-3.5 font-semibold">Stated Balance &amp; Admin Flag [Source]</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="p-3.5 font-mono">03/14/2026</td>
                  <td className="p-3.5">South FL Ortho</td>
                  <td className="p-3.5"><strong>CPT 99204</strong> — New Patient Office Evaluation (Moderate Complexity)</td>
                  <td className="p-3.5 font-mono">$420.00</td>
                  <td className="p-3.5 font-mono">-$235.00</td>
                  <td className="p-3.5 text-emerald-700 font-semibold">$185.00 Reconciled [Ref: EOB p.04]</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3.5 font-mono">03/18/2026</td>
                  <td className="p-3.5">Biscayne Imaging</td>
                  <td className="p-3.5"><strong>CPT 72141</strong> — MRI Cervical Spine Without Contrast</td>
                  <td className="p-3.5 font-mono">$1,450.00</td>
                  <td className="p-3.5 font-mono">$0.00</td>
                  <td className="p-3.5 text-amber-700 font-semibold">$1,450.00 Open LOP [Ref: Ledger p.11]</td>
                </tr>
                <tr className="bg-red-50/60">
                  <td className="p-3.5 font-mono">03/18/2026</td>
                  <td className="p-3.5">Biscayne Imaging</td>
                  <td className="p-3.5"><strong>CPT 72141</strong> — MRI Cervical Spine Without Contrast</td>
                  <td className="p-3.5 font-mono text-red-700">$1,450.00</td>
                  <td className="p-3.5 font-mono">--</td>
                  <td className="p-3.5 text-red-700 font-bold">Flagged Duplicate Line Item [Ref: Statement p.19]</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 italic">
            *Illustrative sample only. All administrative summaries are prepared for counsel&apos;s internal review and do not constitute legal advice, expert witness testimony, or clinical medical-necessity determinations.
          </p>
        </section>

        {/* Section 4: FAQ */}
        <section id="faq" className="scroll-mt-24 space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.question} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.question}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#0a1628] text-white rounded-3xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Want to Test This Workflow on a Single Pilot File?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Explore our dedicated attorney support workflow or request a sample deliverable. Please do not submit confidential client or patient records (PHI) through public web forms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/for-attorneys"
              className="bg-[#0066CC] hover:bg-[#00A8E8] text-white font-bold px-7 py-3.5 rounded-xl transition"
            >
              Visit /for-attorneys Pilot Page →
            </Link>
            <a
              href="tel:+17866432099"
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition"
            >
              📞 Call (786) 643-2099
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
