import Image from 'next/image'
import Link from 'next/link'
import Button from '@UTILS/button'

const codingTypes = [
  {
    title: 'ICD-10 Coding',
    description: 'International Classification of Diseases, 10th Revision codes for accurate diagnosis documentation.',
    icon: '/raster/medical-coding-icd.webp',
    features: [
      'Over 70,000 diagnosis codes',
      'Accurate clinical documentation',
      'Florida payer compliance',
      'Reduced claim denials',
      'Proper code selection',
      'Clinical validation'
    ]
  },
  {
    title: 'CPT/HCPCS Coding',
    description: 'Current Procedural Terminology and Healthcare Common Procedure Coding System for procedure coding.',
    icon: '/raster/medical-coding-cpt-hcpcs.webp',
    features: [
      'Evaluation & Management codes',
      'Surgical procedure codes',
      'Diagnostic tests & services',
      'Durable medical equipment',
      'HCPCS level II codes',
      'Specialty-specific coding'
    ]
  },
  {
    title: 'Modifier Usage',
    description: 'Proper application of modifiers to provide additional context for procedures and services.',
    icon: '/raster/medical-coding-modifiers.webp',
    features: [
      '25 Modifier - Significant E/M',
      '59 Modifier - Distinct service',
      'Modifier 76/77 - Repeat procedures',
      'Modifiers 50, 51, 52',
      'Anatomical modifiers',
      'State-specific modifiers'
    ]
  }
]

const whyAccurateCoding = [
  {
    title: 'Maximize Reimbursements',
    description: 'Accurate coding ensures you receive proper payment for services rendered, preventing revenue leakage.'
  },
  {
    title: 'Reduce Denials',
    description: 'Proper code selection and documentation significantly reduce claim denials and rejections.'
  },
  {
    title: 'Compliance & Audit Protection',
    description: 'Stay compliant with CMS, Florida Medicaid, and commercial payer requirements to avoid penalties.'
  },
  {
    title: 'Faster Claims Processing',
    description: 'Clean, accurate claims process faster, improving cash flow and reducing AR days.'
  },
  {
    title: 'Quality Patient Care',
    description: 'Accurate coding supports better care coordination and ensures proper clinical documentation.'
  }
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Medical Coding Services",
  "provider": {
    "@type": "Organization",
    "name": "Medical Billing Miami Beach (MBMB)",
    "url": "https://medicalbillingmb.com"
  },
  "areaServed": {
    "@type": "State",
    "name": "Florida"
  },
  "description": "Expert medical coding services including ICD-10, CPT, and HCPCS coding by AAPC-certified specialists for healthcare providers in Miami and South Florida.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Medical Coding Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ICD-10 Coding", "description": "Diagnosis coding using ICD-10-CM classification system" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CPT/HCPCS Coding", "description": "Procedure coding using CPT and HCPCS classification systems" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Modifier Optimization", "description": "Proper modifier application for accurate claims processing" } }
    ]
  }
}

export default function MedicalCodingPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      {/* Breadcrumb */}
      <nav className="bg-gray-900 py-3 border-b border-gray-800" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm">
            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
            <li className="text-gray-600">/</li>
            <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
            <li className="text-gray-600">/</li>
            <li className="text-pink2 font-medium">Medical Coding</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink2/10 via-transparent to-blue-500/10"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink2/20 rounded-full border border-pink2/30 mb-6">
                <span className="w-2 h-2 bg-pink2 rounded-full animate-pulse"></span>
                <span className="text-sm text-pink2 font-medium">Specialty Coding Services</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Expert Medical Coding
                <span className="block text-pink2 mt-2">in Miami, Florida</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Precision medical coding with ICD-10, CPT, and HCPCS expertise. Our AAPC-certified coders ensure accurate code selection, proper modifier usage, and compliance with Florida payer requirements.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">AAPC Certified</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">ICD-10 Expert</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">All Specialties</span>
              </div>
              
              <Button href="/consultation" text="Get Free Coding Audit" colors="bg-pink2 text-white hover:bg-pink2/80 text-lg px-8 py-4" />
            </div>
            
            <div className="relative">
              <Image
                src="/raster/medical-coding-icd.webp"
                alt="Medical Coding Services - ICD-10, CPT, HCPCS"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl shadow-pink2/20"
              />
              <div className="absolute -bottom-6 -right-6 bg-pink2 text-white px-6 py-4 rounded-xl shadow-xl">
                <p className="text-3xl font-bold">95%+</p>
                <p className="text-sm">Clean Claim Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coding Types Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Comprehensive Medical Coding</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From diagnosis to procedure coding, we cover every aspect to ensure accurate claims and maximum reimbursement
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {codingTypes.map((coding, index) => (
              <article 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-pink2/50 transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={coding.icon}
                    alt={coding.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">{coding.title}</h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">{coding.description}</p>
                  
                  <ul className="space-y-2">
                    {coding.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 bg-pink2 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Accurate Coding Matters */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Accurate Medical Coding Matters</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Medical coding is the foundation of your revenue cycle. Errors in coding directly impact your bottom line.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAccurateCoding.map((item, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-pink2/30 transition-colors"
              >
                <div className="w-12 h-12 bg-pink2/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-pink2 font-bold">{index + 1}</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-pink2/90 to-pink2 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">95%+</p>
              <p className="text-sm opacity-90">Clean Claim Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">70K+</p>
              <p className="text-sm opacity-90">ICD-10 Codes</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">30%+</p>
              <p className="text-sm opacity-90">Revenue Increase</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">24hr</p>
              <p className="text-sm opacity-90">Turnaround Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 lg:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Coding Expertise Across <span className="text-pink2">All Specialties</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our team of AAPC-certified coders has extensive experience across medical and surgical specialties, ensuring accurate code selection regardless of your practice focus.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Primary Care', 'Family Medicine', 'Internal Medicine', 'Pediatrics',
                  'OB/GYN', 'General Surgery', 'Orthopedics', 'Dermatology',
                  'Psychiatry', 'Cardiology', 'Oncology', 'Ophthalmology',
                  'Radiology', 'Urology', 'Endocrinology', 'Urgent Care'
                ].map((specialty, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-pink2 rounded-full"></span>
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to Optimize Your Coding?</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Coding Audit</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Code Analysis</span>
                  <span className="text-white font-semibold">Included</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300">Specialty Consultation</span>
                  <span className="text-white font-semibold">Available</span>
                </div>
              </div>
              <Button href="/consultation" text="Schedule Free Consultation" colors="w-full bg-pink2 text-white hover:bg-pink2/80 py-4" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ensure Accurate Medical Coding for Your Practice</h2>
          <p className="text-xl text-gray-400 mb-8">
            Contact us today for a free coding audit and discover how accurate coding can increase your revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/consultation" text="Get Free Coding Audit" colors="bg-pink2 text-white hover:bg-pink2/80 text-lg px-8 py-4" />
            <a href="tel:+1-786-643-2099" className="inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition-colors">
              <span>Call (786) 643-2099</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Medical Coding Services Miami | ICD-10, CPT, HCPCS Coding Florida',
  description: 'Expert medical coding services in Miami, Florida. ICD-10, CPT, and HCPCS coding by AAPC-certified specialists. We reduce claim denials and maximize reimbursements for healthcare providers. Free coding audit available.',
  keywords: 'Medical Coding Miami, ICD-10 Coding Florida, CPT Coding Services, HCPCS Codes, Medical Coding Specialists Miami, AAPC Certified Coders, Florida Medical Coding, Healthcare Coding Miami',
  alternates: {
    canonical: 'https://medicalbillingmb.com/services/medical-coding'
  },
  openGraph: {
    title: 'Medical Coding Services Miami | MBMB',
    description: 'Expert ICD-10, CPT, and HCPCS medical coding services in Miami, Florida by AAPC-certified specialists.',
    url: 'https://medicalbillingmb.com/services/medical-coding',
    siteName: 'Medical Billing Miami Beach (MBMB)',
    locale: 'en_US',
    type: 'website',
  },
  other: {
    'ai:service': 'medical coding, ICD-10 coding, CPT coding, HCPCS coding',
    'ai:location': 'Miami, Florida',
    'ai:phone': '+1-786-643-2099',
  }
}