import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Florida Provider Credentialing, CAQH ProView & Payer Enrollment Guide (2026)',
  description:
    'Complete 2026 guide to physician and clinic credentialing in Miami and Florida: CAQH ProView attestations, NPI Type 1 & Type 2 setup, Medicare PECOS (FCSO), Florida Medicaid (AHCA), and commercial payers.',
  keywords:
    'provider credentialing Miami, CAQH ProView enrollment Florida, Medicare FCSO PECOS enrollment, Florida Medicaid AHCA credentialing, EDI ERA EFT setup medical billing',
  alternates: {
    canonical:
      'https://medicalbillingmb.com/blog/florida-provider-credentialing-caqh-guide',
  },
  openGraph: {
    title:
      'Florida Provider Credentialing, CAQH ProView & Payer Enrollment Guide (2026) | MBMB',
    description:
      'How to avoid enrollment-related claim denials by aligning CAQH, Medicare PECOS, Florida Medicaid, and commercial payer credentialing with your billing setup.',
    url: 'https://medicalbillingmb.com/blog/florida-provider-credentialing-caqh-guide',
    type: 'article',
    images: [
      {
        url: 'https://medicalbillingmb.com/raster/authentic/blog-florida-credentialing.jpg',
        width: 1200,
        height: 630,
        alt: 'Florida Provider Credentialing and CAQH Enrollment Guide',
      },
    ],
  },
};

const faqs = [
  {
    question: 'How long does provider credentialing take in Florida?',
    answer:
      'Payer review timelines in Florida typically range from 60 to 120 days depending on the insurance network (Medicare FCSO, Florida Medicaid AHCA/MMA plans, Florida Blue, UnitedHealthcare, Aetna, Cigna, AvMed, or Humana). While thorough application preparation prevents avoidable delays, final approval and effective dates are determined solely by each insurer.',
  },
  {
    question: 'Why must CAQH ProView be re-attested every 120 days?',
    answer:
      'Commercial health plans pull provider license, DEA, malpractice insurance, and practice location data directly from CAQH ProView. If a provider’s CAQH attestation expires past 120 days—or if a malpractice certificate lapses—payers can place enrollment applications on hold or suspend in-network claim adjudication.',
  },
  {
    question: 'What is the difference between NPI Type 1 and NPI Type 2 in payer contracting?',
    answer:
      'NPI Type 1 identifies the individual rendering clinician, while NPI Type 2 identifies the group practice or corporate legal entity (linked to your IRS CP-575 / W-9 Tax ID). Both must be properly linked in PECOS and commercial payer rosters so claims billed under the group Tax ID pay at in-network rates.',
  },
];

export default function FloridaCredentialingGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline:
          'Florida Provider Credentialing, CAQH ProView & Payer Enrollment Guide (2026)',
        description:
          'Complete 2026 guide to physician and clinic credentialing in Miami and Florida: CAQH ProView attestations, NPI Type 1 & Type 2 setup, Medicare PECOS (FCSO), and Florida Medicaid (AHCA).',
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
          'https://medicalbillingmb.com/blog/florida-provider-credentialing-caqh-guide',
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
            <li className="text-[#00A8E8] font-semibold">Florida Provider Credentialing &amp; CAQH Guide</li>
          </ol>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-gradient-to-b from-[#0a1628] to-[#11223d] text-white py-16 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A8E8]/15 border border-[#00A8E8]/40 text-[#00A8E8] text-xs font-bold uppercase tracking-wider mb-5">
            Credentialing &amp; Enrollment · Reviewed October 16, 2026
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Florida Provider Credentialing, CAQH ProView &amp; Payer Enrollment Guide (2026)
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Launching a new clinic in South Florida or onboarding an associate physician? Aligning your CAQH profile, Medicare PECOS, Florida Medicaid, and clearinghouse EDI/ERA enrollment from day one prevents months of avoidable claim holds.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-xl p-4">
            <span><strong>Editorial Review:</strong> Medical Billing Miami Beach (MBMB) Credentialing &amp; RCM Coordination Team</span>
            <span>·</span>
            <span><strong>Regulatory Sources:</strong> CMS PECOS, Florida AHCA Medicaid Provider Enrollment, CAQH ProView</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-14 space-y-12">
        <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
          <Image
            src="/raster/authentic/blog-florida-credentialing.jpg"
            alt="Florida Provider Credentialing and CAQH Enrollment"
            fill
            className="object-cover"
          />
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            1. The 4-Stage Florida Credentialing &amp; Billing Alignment Checklist
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Many practices treat credentialing as a one-time paperwork task separate from medical billing. In reality, a single mismatch between your IRS CP-575 letter, NPPES NPI registry, CAQH profile, and clearinghouse setup will trigger immediate front-end rejections (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">CO-16</code> or <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm">CO-B7</code>).
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><strong>Stage 01 — Primary Document &amp; NPI Alignment:</strong> Verify Florida DOH medical license, DEA, malpractice face sheet, W-9 / IRS CP-575 exact legal name, NPI Type 1 (individual), and NPI Type 2 (group/facility).</li>
            <li><strong>Stage 02 — CAQH ProView Attestation:</strong> Complete 100% of profile sections, upload current COI and license documents, authorize payer access, and calendar 120-day re-attestations.</li>
            <li><strong>Stage 03 — Medicare (FCSO), Florida Medicaid (AHCA) &amp; Commercial Applications:</strong> Submit CMS-855I/855B/855R via PECOS, complete Florida Medicaid base enrollment before Managed Medical Assistance (MMA) plans (Sunshine Health, Simply Healthcare), and track commercial contracting.</li>
            <li><strong>Stage 04 — EDI (837), ERA (835) &amp; EFT Direct Deposit Linking:</strong> Connect approved provider numbers directly into your EHR and clearinghouse before submitting the first claim batch.</li>
          </ul>
          <p className="text-xs text-slate-500 italic">
            *Disclaimer: We coordinate enrollment applications, CAQH attestations, and payer follow-up for the networks scoped in your agreement. Payer review times vary (typically 60–120 days); final approval and network participation are determined solely by each insurer and are not guaranteed.
          </p>
        </section>

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

        {/* CTA */}
        <section className="bg-[#0a1628] text-white rounded-3xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Need Help Enrolling a New Provider or Clinic in Florida?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Speak with our Miami Beach coordination desk to scope your credentialing and revenue cycle onboarding.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/services/credentialing"
              className="bg-[#0066CC] hover:bg-[#00A8E8] text-white font-bold px-7 py-3.5 rounded-xl transition"
            >
              Explore Credentialing Services →
            </Link>
            <Link
              href="/consultation"
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition"
            >
              Request a Consultation
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
