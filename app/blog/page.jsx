import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Medical Billing Insights, AI Coding & Legal Bill Review Blog',
  description:
    'Expert guides on Florida medical billing, AAPC-certified coding + AI pre-submission double-check, provider credentialing (CAQH/PECOS), and medical billing chronologies & EOB reconciliation for legal teams.',
  alternates: {
    canonical: 'https://medicalbillingmb.com/blog',
  },
};

const posts = [
  {
    slug: 'medical-billing-chronology-reconciliation-for-attorneys',
    title: 'Medical Bill Review, Chronologies & EOB Reconciliation for Legal Teams (2026 Guide)',
    description:
      'How personal injury attorneys and paralegals organize fragmented CMS-1500/UB-04 bills, reconcile EOB adjustments, flag duplicate CPT charges, and build source-linked billing chronologies.',
    image: '/raster/medical-coding-cpt-hcpcs.webp',
    date: 'October 16, 2026',
    tag: 'For Attorneys & Legal Teams',
  },
  {
    slug: 'ai-double-check-medical-coding-clean-claims',
    title: 'Human AAPC-Certified Coders + AI Pre-Submission Double-Check: Preventing Claim Denials',
    description:
      'Why neither blind AI automation nor manual-only billing is enough in 2026—and how MBMB’s two-layer verification catches NCCI edits and modifier gaps before submission.',
    image: '/raster/medical-coding-modifiers.webp',
    date: 'October 16, 2026',
    tag: 'Human + AI Workflow',
  },
  {
    slug: 'florida-provider-credentialing-caqh-guide',
    title: 'Florida Provider Credentialing, CAQH ProView & Payer Enrollment Guide (2026)',
    description:
      'Step-by-step guide to aligning CAQH ProView, NPI Type 1 & Type 2, Medicare PECOS (FCSO), Florida Medicaid (AHCA), and EDI/ERA billing setup.',
    image: '/raster/healthcare-revenue-cycle-management-companies.webp',
    date: 'October 16, 2026',
    tag: 'Credentialing & CAQH',
  },
  {
    slug: 'medical-billing-101',
    title: 'Medical Billing 101: Everything Miami Doctors Need to Know',
    description:
      'The complete guide to medical billing for Miami doctors. Learn what medical billing is, why Miami practices struggle, common mistakes, and how to optimize revenue.',
    image: '/raster/Medical-Billing-and-Coding-Specialists.webp',
    date: 'Reviewed October 15, 2026',
    tag: 'Practice Guide',
  },
  {
    slug: 'denial-management-guide',
    title: 'Denial Management: A Complete Guide for Miami Practices',
    description:
      'Every denied claim is lost revenue—unless you have a 48-hour system to fight back. Learn how top Miami practices recover denied and underpaid claims.',
    image: '/raster/medical-billing-and-medical-coding-services-healthcare-revenue-management-1.2.avif',
    date: 'Reviewed October 15, 2026',
    tag: 'Denial Recovery',
  },
  {
    slug: 'miami-medicaid-billing',
    title: 'Florida Medicaid Billing for Miami Healthcare Providers',
    description:
      'Everything Miami doctors need to know about Florida Medicaid billing: coverage requirements, MMA plans, AHCA compliance, and clean claim workflows.',
    image: '/raster/medical-coding-icd.webp',
    date: 'Reviewed October 15, 2026',
    tag: 'Florida Medicaid',
  },
  {
    slug: 'top-5-medical-billing-mistakes',
    title: 'Top 5 Medical Billing Mistakes Costing Miami Practices $100K+/Year',
    description:
      'Discover the 5 most expensive coding, modifier, and prior authorization mistakes in South Florida clinics—and how AAPC-certified scrubbing prevents them.',
    image: '/raster/Time-Saving-Medical-Billing-Solutions.webp',
    date: 'Reviewed October 15, 2026',
    tag: 'Revenue Leakage',
  },
];

export default function BlogIndex() {
  return (
    <main className="bg-[#0a1628] text-white min-h-screen px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00A8E8] bg-white/10 px-3 py-1 rounded-full mb-3">
            MBMB Knowledge Hub · 7 Comprehensive Guides
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Medical Billing, AI Verification &amp; Legal Bill Review Insights
          </h1>
          <p className="text-slate-300 text-base md:text-lg">
            Actionable guides for Florida healthcare providers and legal teams—covering AAPC coding + AI double-check workflows, credentialing, and source-linked medical billing chronologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden hover:border-[#00A8E8]/60 transition-all duration-300 h-full flex flex-col shadow-xl">
                <div className="relative h-52 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0066CC] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.tag}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-400 mb-2">{post.date}</p>
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[#00A8E8] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>
                  <span className="inline-block mt-5 text-[#00A8E8] text-sm font-bold group-hover:translate-x-1 transition-transform">
                    Read Full Guide →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
