import Image from 'next/image'
import Link from 'next/link'
import Button from '@UTILS/button'

export const metadata = {
  title: 'Florida Medicaid Billing Guide for Miami Healthcare Providers',
  description: 'Everything Miami doctors need to know about Florida Medicaid billing. Coverage requirements, common denials, AHCA compliance, and how to maximize reimbursements from Florida Medicaid.',
  keywords: 'florida medicaid billing miami, medicaid billing florida, AHCA billing, florida medicaid requirements, medicaid credentialing florida, medical billing miami medicaid',
  openGraph: {
    title: 'Florida Medicaid Billing Guide for Miami Healthcare Providers',
    description: 'Everything Miami doctors need to know about Florida Medicaid billing.',
    url: 'https://medicalbillingmb.com/blog/miami-medicaid-billing',
    type: 'article',
    publishedTime: '2026-04-15',
    modifiedTime: '2026-04-15',
    authors: ['Medical Billing Miami Beach (MBMB)'],
    images: [
      {
        url: 'https://medicalbillingmb.com/raster/medical-coding-icd.webp',
        width: 1200,
        height: 800,
        alt: 'Florida Medicaid Billing Guide'
      }
    ]
  },
  alternates: {
    canonical: 'https://medicalbillingmb.com/blog/miami-medicaid-billing'
  }
}

export default function MiamiMedicaidBilling() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-gray-900 to-gray-900 text-white py-20 lg:py-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-400 text-sm font-medium mb-6">
              Florida Medicaid
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Florida Medicaid Billing for{' '}
              <span className="text-blue-400">Miami Healthcare Providers</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Navigate the complexities of Florida Medicaid billing with confidence. Miami-Dade has one of the highest Medicaid enrollments in Florida—learn how to maximize your reimbursements.
            </p>
            <Button href="/consultation" text="Get a Free Billing Audit" colors="bg-pink2 text-white hover:bg-pink2/80" />
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-gray-900 text-gray-400 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-white font-medium">Miami Medicaid Billing</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <article className="lg:col-span-2">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Miami-Dade County has one of the <strong>largest Medicaid enrollments in Florida</strong>, making Medicaid billing a critical revenue stream for many practices—but also one of the most complex. Florida Medicaid has unique requirements, frequent regulatory changes, and some of the strictest documentation demands in the country.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-10">Why Miami Medicaid Billing Is Different</h2>
              <p className="text-lg text-gray-700 mb-4">
                Unlike standard Medicare or commercial insurance billing, Florida Medicaid requires navigating the Agency for Health Care Administration (AHCA), managing multiple managed care organizations (MCOs), and staying current with Florida-specific policy changes. Miami's patient population also includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
                <li>Traditional Medicaid recipients (straight Medicaid)</li>
                <li>Medicaid Managed Care (MMC) enrollees in plans like Sunshine Health, Molina, and Community Care Plan</li>
                <li>Long-term Care Medicaid recipients</li>
                <li>Emergency Medicaid for qualifying non-citizens</li>
                <li>Dual-eligible patients (Medicare + Medicaid)</li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Florida Medicaid Billing Requirements</h2>

              <div className="space-y-6 mb-10">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Provider Credentialing</h3>
                  <p className="text-gray-700">All providers must be enrolled with AHCA Medicaid before billing. This includes completing the Florida Medicaid Provider Enrollment application, obtaining a Florida Medicaid provider number, and enrolling with each MCO you intend to see patients from. The process typically takes 60-120 days.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Prior Authorization Requirements</h3>
                  <p className="text-gray-700">Florida Medicaid requires prior authorization for many services including specialty medications, imaging (MRI, CT), certain procedures, and extended hospital stays. Failure to obtain prior auth before rendering services results in automatic denials with no appeal pathway in most cases.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Documentation Standards</h3>
                  <p className="text-gray-700">Florida Medicaid has some of the most stringent documentation requirements in the nation. Every claim must be supported by contemporaneous documentation that clearly demonstrates medical necessity. AHCA conducts regular audits of Miami-Dade providers specifically.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Claim Timely Filing</h3>
                  <p className="text-gray-700">Florida Medicaid claims must be submitted within 12 months of the date of service. For managed care claims, timely filing limits are often shorter (90-180 days).Denied claims resubmission windows are even shorter—typically 30-60 days.</p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Top Florida Medicaid Denial Reasons (& How to Prevent Them)</h2>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-red-500 font-bold text-xl shrink-0">1</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Patient Not Enrolled in Medicaid at Time of Service</h4>
                    <p className="text-gray-600 text-sm mt-1">Medicaid eligibility changes frequently. Always verify the morning of the appointment through the Florida Medicaid Portal (FFS) or the MCO member portal.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-red-500 font-bold text-xl shrink-0">2</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Missing or Invalid Prior Authorization</h4>
                    <p className="text-gray-600 text-sm mt-1">Services rendered without prior auth where required will be denied. Keep authorization numbers documented in the patient's record.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-red-500 font-bold text-xl shrink-0">3</span>
                  <div>
                    <h4 className="font-bold text-gray-900">Coding Errors Specific to Florida Medicaid</h4>
                    <p className="text-gray-600 text-sm mt-1">Florida Medicaid uses a subset of CPT codes and has unique modifier requirements. Codes accepted by Medicare aren't always accepted by Florida Medicaid.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                  <span className="text-red-500 font-bold text-xl shrink-0">4</span>
                  <div>
                    <h4 className="font-bold text-gray-900">MCO vs. Straight Medicaid Billing Errors</h4>
                    <p className="text-gray-600 text-sm mt-1">Billing a claim to the wrong payer is common when a patient has both straight Medicaid and managed care coverage, or when they've recently switched MCOs.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center mb-10">
                <h2 className="text-2xl font-bold mb-4">Miami Medicaid Billing Support</h2>
                <p className="mb-6 opacity-90">MBMB specializes in Florida Medicaid billing for Miami practices. We handle AHCA enrollment, MCO credentialing, claim submissions, and denial management for all Florida Medicaid products.</p>
                <Button href="/consultation" text="Schedule Free Consultation" colors="bg-white text-blue-700 hover:bg-gray-100" />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Florida Medicaid Stats</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink2 font-bold">•</span>
                    <span>Miami-Dade has 400K+ Medicaid recipients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink2 font-bold">•</span>
                    <span>6 MCOs operate in Miami-Dade County</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink2 font-bold">•</span>
                    <span>Typical Medicaid denial rate: 15-25%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink2 font-bold">•</span>
                    <span>60-120 day credentialing timeline</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900 text-white rounded-2xl p-6 mb-6">
                <h3 className="font-bold mb-4">Related Resources</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/blog/medical-billing-101" className="text-gray-300 hover:text-pink2">Medical Billing 101 Guide →</Link></li>
                  <li><Link href="/blog/denial-management-guide" className="text-gray-300 hover:text-pink2">Denial Management Guide →</Link></li>
                  <li><Link href="/services/credentialing" className="text-gray-300 hover:text-pink2">Credentialing Services →</Link></li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
