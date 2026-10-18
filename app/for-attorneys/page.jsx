import Link from 'next/link';
import AttorneyPilotForm from './AttorneyPilotForm';

export const metadata = {
  title: 'Medical Billing Support for Attorneys & Law Firms | Bill Organization & Reconciliation',
  description:
    'Administrative medical billing support for Florida legal teams. We organize itemized medical bills and EOBs by provider and date, compare charges, payments, adjustments, and balances, and flag source-linked billing questions.',
  keywords:
    'medical billing support for attorneys, itemized medical bill organization Miami, EOB reconciliation law firms Florida, medical billing chronology for legal teams, administrative billing review Miami Beach',
  alternates: {
    canonical: 'https://medicalbillingmb.com/for-attorneys',
  },
  openGraph: {
    title: 'Medical Billing Clarity for Your Legal Team | MBMB',
    description:
      'Need help making sense of itemized medical bills and EOBs? We organize billing records, reconcile payments and adjustments, and flag administrative billing questions for your legal team.',
    url: 'https://medicalbillingmb.com/for-attorneys',
    siteName: 'Medical Billing Miami Beach (MBMB)',
    locale: 'en_US',
    type: 'website',
  },
};

const attorneyFaqs = [
  {
    question: 'What types of files can you help organize?',
    answer:
      'Itemized bills, CMS-1500 (professional) and UB-04 (facility) claims, patient billing ledgers, Explanation of Benefits (EOB) statements, and PIP / MedPay / LOP payment logs.',
  },
  {
    question: 'Do you provide legal or medical opinions?',
    answer:
      'No. We provide administrative billing organization, plain-English code translation, and document-level number reconciliation so your legal team can review the records efficiently.',
  },
  {
    question: 'How do we share documents and protect confidentiality?',
    answer:
      'Contact us to agree on an encrypted transfer method before sending any sensitive files, and we are happy to execute your firm’s Confidentiality Agreement / NDA or HIPAA Business Associate Agreement (BAA). Do not submit sensitive patient information through the public website form.',
  },
  {
    question: 'What formats do we receive, and what is the typical turnaround?',
    answer:
      'Deliverables are provided in both an editable Excel / CSV workbook (for sorting and filtering by provider, date, or payer) and a clean, Bates/page-referenced PDF summary table. Standard 1-case pilot files are typically completed within 3–5 business days.',
  },
];

export default function ForAttorneysPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://medicalbillingmb.com/for-attorneys#service',
        name: 'Administrative Medical Billing Organization & Reconciliation for Legal Teams',
        provider: {
          '@type': 'Organization',
          name: 'Medical Billing Miami Beach (MBMB)',
          url: 'https://medicalbillingmb.com',
        },
        areaServed: {
          '@type': 'State',
          name: 'Florida',
        },
        description:
          'Administrative medical billing organization, plain-English CPT/ICD-10/HCPCS code explanations, EOB and ledger comparison, and source-linked billing question summaries for law firms and legal teams.',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://medicalbillingmb.com/for-attorneys#faq',
        mainEntity: attorneyFaqs.map((faq) => ({
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
    <div className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-[#0a1628] text-slate-300 py-3 border-b border-white/10" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li className="text-slate-500">/</li>
            <li className="text-[#00A8E8] font-semibold">For Attorneys</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a1628] via-[#102340] to-[#0a1628] text-white py-20 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A8E8]/40 bg-[#00A8E8]/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00A8E8]" />
              <span className="text-[#00A8E8] text-xs sm:text-sm font-bold uppercase tracking-wider">
                U.S. AAPC-Certified Coders + AI Verification · 1-Case Law Firm Pilot
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              Medical billing clarity for your legal team
            </h1>

            <p className="text-slate-200 text-lg md:text-xl leading-relaxed mb-10">
              Need help making sense of itemized medical bills, CMS-1500/UB-04 claims, and EOBs? Our AAPC-certified billing specialists work alongside your team to organize billing records, translate CPT/ICD-10 codes into plain English, reconcile payments and adjustments, and flag administrative billing questions—so you can review the numbers with confidence.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <a
                href="#pilot-form"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#0066CC] hover:bg-[#00A8E8] text-white font-bold text-base shadow-xl shadow-[#0066CC]/30 transition-all"
              >
                Discuss a Pilot File
              </a>
              <a
                href="#pilot-workflow"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/25 hover:bg-white/10 text-white font-bold text-base transition-all"
              >
                How Our Process Works
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border-2 border-[#00A8E8]/40 shadow-2xl bg-[#060d18]">
              <img
                src="/raster/authentic/attorneys-legal-chronology.jpg"
                alt="Miami Trial Attorney and Paralegal Reviewing Tabbed Medical Billing Chronology Binders"
                className="w-full h-72 sm:h-80 object-cover"
              />
              <div className="p-4 bg-[#060d18] border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A8E8]">
                  Source-Linked Chronologies &amp; EOB Reconciliation
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  Delivered in editable Excel/CSV &amp; Bates-referenced PDF tables (3–5 business day standard pilot turnaround).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Can Help Your Firm (3 Core Administrative Pillars) */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Structured Billing Organization
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
              How We Can Help Your Firm
            </h2>
            <p className="text-slate-600 text-base">
              When case files include dozens of provider statements, CMS-1500/UB-04 forms, ledgers, and Explanation of Benefits (EOB) documents, our AAPC-certified specialists organize the numbers into a clean, source-linked reference table (delivered in editable Excel/CSV &amp; PDF).
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:border-[#0066CC] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0066CC]/10 text-[#0066CC] flex items-center justify-center font-extrabold text-lg mb-5">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Organize bills &amp; translate codes</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We sort CMS-1500s, UB-04s, and ledgers chronologically by provider, service date, and Bates/page reference—translating CPT, ICD-10-CM, HCPCS, and modifiers (-25, -59, -26/-TC) into plain English.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:border-[#0066CC] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0066CC]/10 text-[#0066CC] flex items-center justify-center font-extrabold text-lg mb-5">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reconcile payments &amp; balances</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We line up original billed charges, commercial/government EOB payments, contractual adjustments, PIP/MedPay logs, and stated open balances to show exactly how the figures connect.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:border-[#0066CC] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0066CC]/10 text-[#0066CC] flex items-center justify-center font-extrabold text-lg mb-5">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Flag duplicates &amp; billing questions</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We note potential duplicate line items (e.g., facility vs. professional billing overlap), missing statement pages, or unclear adjustments and prepare source-linked questions for counsel.
              </p>
            </div>
          </div>

          {/* Illustrative Deliverable Preview Table */}
          <div className="mt-14 bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A8E8]">
                  Illustrative Output Format (Delivered in Editable Excel/CSV &amp; PDF)
                </span>
                <h3 className="text-lg md:text-xl font-bold mt-0.5">
                  Source-Linked Billing Chronology &amp; Reconciliation Table
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Sample administrative layout (redacted / non-clinical · 3–5 business day pilot turnaround)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-300">
                    <th className="py-3 px-3">Date / Provider</th>
                    <th className="py-3 px-3">Source Doc Ref</th>
                    <th className="py-3 px-3">Code / Plain-English Description</th>
                    <th className="py-3 px-3">Billed</th>
                    <th className="py-3 px-3">Paid / Adj.</th>
                    <th className="py-3 px-3">Stated Bal.</th>
                    <th className="py-3 px-3">Administrative Note for Counsel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr>
                    <td className="py-3 px-3 font-medium">2026-02-14 · Imaging Center A</td>
                    <td className="py-3 px-3 text-slate-400">Ledger p. 4 / EOB p. 2</td>
                    <td className="py-3 px-3">CPT 72148 — Lumbar Spine MRI w/o Contrast</td>
                    <td className="py-3 px-3">$1,850.00</td>
                    <td className="py-3 px-3">$420.00 / $980.00</td>
                    <td className="py-3 px-3">$450.00</td>
                    <td className="py-3 px-3 text-cyan-300">Reconciled with EOB #402; co-insurance matches ledger.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium">2026-02-14 · Imaging Center A</td>
                    <td className="py-3 px-3 text-slate-400">Statement #2 p. 1</td>
                    <td className="py-3 px-3">CPT 72148 — Lumbar Spine MRI w/o Contrast</td>
                    <td className="py-3 px-3">$1,850.00</td>
                    <td className="py-3 px-3">$0.00 / $0.00</td>
                    <td className="py-3 px-3">$1,850.00</td>
                    <td className="py-3 px-3 text-amber-300">Flagged: Appears to duplicate 2026-02-14 line prior to EOB posting.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-medium">2026-03-03 · Ortho Group B</td>
                    <td className="py-3 px-3 text-slate-400">CMS-1500 p. 3</td>
                    <td className="py-3 px-3">CPT 99204-25 / 20610 — New Pt Visit &amp; Major Joint Inj.</td>
                    <td className="py-3 px-3">$640.00</td>
                    <td className="py-3 px-3">Pending EOB</td>
                    <td className="py-3 px-3">$640.00</td>
                    <td className="py-3 px-3 text-amber-300">Missing page 4 of itemized statement; follow-up question noted.</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-700 bg-slate-950/60 font-bold text-white">
                    <td className="py-3 px-3" colSpan={3}>Sample Roll-Up Summary (De-Duplicated Net Verified vs. Gross Stated)</td>
                    <td className="py-3 px-3">$2,490.00 Net ($4,340 Gross)</td>
                    <td className="py-3 px-3">$420.00 / $980.00</td>
                    <td className="py-3 px-3 text-emerald-400">$1,090.00 Verified</td>
                    <td className="py-3 px-3 text-xs text-slate-300">$1,850.00 duplicate billing line isolated for counsel review.</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How a Pilot Works (4 Steps) */}
      <section id="pilot-workflow" className="scroll-mt-24 py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] bg-white border border-blue-200 px-3 py-1 rounded-full">
              Pilot Workflow
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
              How a Pilot Works
            </h2>
            <p className="text-slate-600 text-base">
              Start with a single sample or redacted billing packet so your team can evaluate the structure and usefulness of the summary before any ongoing commitment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Agree on File Transfer',
                desc: 'Share a sample or redacted billing set through an agreed channel.',
              },
              {
                step: '2',
                title: 'Chronological Organization',
                desc: 'We organize the records into a structured summary.',
              },
              {
                step: '3',
                title: 'Flag Administrative Items',
                desc: 'We highlight items that may need a closer look or provider follow-up.',
              },
              {
                step: '4',
                title: 'Team Walkthrough',
                desc: 'We walk through the findings with your team.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-[#0a1628] text-[#00A8E8] font-extrabold flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Important Note on Responsibilities */}
          <div className="mt-12 bg-white border-l-4 border-l-[#0066CC] border border-slate-200 rounded-2xl p-6 md:p-8 shadow-2xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Important Note on Responsibilities
            </h3>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Our support is administrative and focused on organizing and summarizing billing records. We do not provide legal advice, expert testimony, or opinions on medical necessity.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {attorneyFaqs.map((faq) => (
              <div key={faq.question} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Pilot Discussion Intake Form */}
      <section id="pilot-form" className="scroll-mt-24 py-16 lg:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0066CC] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                Pilot Inquiry
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3 mb-4">
                Interested in testing this workflow on a pilot file?
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                Reach out to discuss your firm&apos;s needs and set up a convenient way to review a sample set.
              </p>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3 text-sm">
                <p className="font-bold text-slate-900">Direct Coordination Desk (Miami Beach)</p>
                <p className="text-slate-700">
                  📞{' '}
                  <a href="tel:+17866432099" className="text-[#0066CC] font-bold hover:underline">
                    (786) 643-2099
                  </a>
                </p>
                <p className="text-slate-700">
                  📧{' '}
                  <a href="mailto:Jasmel@medicalbillingmb.com" className="text-[#0066CC] hover:underline">
                    Jasmel@medicalbillingmb.com
                  </a>
                </p>
                <p className="text-xs text-slate-500">
                  Mon–Fri: 9:00 AM – 6:00 PM EST (America/New_York)
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Request a Pilot Discussion
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">
                Complete the non-sensitive business inquiry form below and we will contact your office within 1 business day.
              </p>
              <AttorneyPilotForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
