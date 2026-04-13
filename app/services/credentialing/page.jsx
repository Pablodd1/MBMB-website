'use client'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@UTILS/button'

const credentialingServices = [
  {
    title: 'CAQH Enrollment',
    description: "Complete CAQH provider enrollment and maintenance. We handle every aspect of your CAQH profile to ensure you're ready to contract with insurance networks.",
    icon: '/svg/credentialing.svg',
    features: [
      'CAQH profile creation',
      'Attestation management',
      'Demographic updates',
      'Document uploads',
      'Re-credentialing support',
      'Expiring license alerts'
    ]
  },
  {
    title: 'EDI Setup',
    description: 'Electronic Data Interchange configuration for seamless claim submission. Connect your practice to payers for efficient electronic claims processing.',
    icon: '/svg/edi.svg',
    features: [
      'EDI enrollment',
      'Claims transmission setup',
      'Error handling configuration',
      'Testing & certification',
      'Multi-payer connections',
      'Ongoing monitoring'
    ]
  },
  {
    title: 'ERA Configuration',
    description: 'Electronic Remittance Advice setup for automatic payment reconciliation. Save time on posting and reduce denials with electronic remittance.',
    icon: '/svg/era.svg',
    features: [
      'ERA enrollment',
      '835 format setup',
      'Payment reconciliation',
      'Adjustment code mapping',
      'Secondary billing integration',
      'Reporting & analytics'
    ]
  },
  {
    title: 'EFT Setup',
    description: 'Electronic Funds Transfer arrangement for faster, more secure payments. Receive payments directly to your bank account without paper checks.',
    icon: '/svg/eft.svg',
    features: [
      'EFT enrollment',
      'Bank information setup',
      'Payment notification',
      'Multi-payer configuration',
      'Payment reconciliation',
      'Direct deposit setup'
    ]
  }
]

const processTimeline = [
  {
    step: 1,
    title: 'Initial Assessment',
    description: 'We review your current credentialing status, identify gaps, and create a customized credentialing roadmap for your practice.',
    days: 'Days 1-7'
  },
  {
    step: 2,
    title: 'Application Preparation',
    description: 'Our team compiles all required documentation, completes applications accurately, and ensures everything is submission-ready.',
    days: 'Days 8-21'
  },
  {
    step: 3,
    title: 'Submission & Follow-up',
    description: 'We submit applications to all relevant insurance networks and proactively follow up to expedite the review process.',
    days: 'Days 22-60'
  },
  {
    step: 4,
    title: 'Network Approval',
    description: 'Once approved, we ensure you're loaded correctly in payer systems and ready to start billing for patients.',
    days: 'Days 61-120'
  }
]

const insuranceNetworks = [
  'Aetna', 'AvMed', 'Blue Cross Blue Shield', 'Cigna', 'Florida Blue',
  'Humana', 'Magnolia Health', 'Medicaid Florida', 'Medicare',
  'Molina Healthcare', 'Oscar Health', 'Simply Healthcare', 'UnitedHealthcare', 'WellCare'
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Provider Credentialing Services",
  "provider": {
    "@type": "Organization",
    "name": "Medical Billing Miami Beach (MBMB)",
    "url": "https://medicalbillingmb.com"
  },
  "areaServed": {
    "@type": "State",
    "name": "Florida"
  },
  "description": "Expert provider credentialing services in Miami, Florida. CAQH enrollment, EDI setup, ERA configuration, and EFT arrangement for insurance networks. Process takes 60-120 days.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Provider Credentialing Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CAQH Enrollment", "description": "CAQH provider enrollment and maintenance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EDI Setup", "description": "Electronic Data Interchange configuration for claims submission" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ERA Configuration", "description": "Electronic Remittance Advice setup for payment reconciliation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EFT Setup", "description": "Electronic Funds Transfer for direct payments" } }
    ]
  }
}

export default function CredentialingPage() {
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
            <li className="text-pink2 font-medium">Credentialing</li>
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
                <span className="text-sm text-pink2 font-medium">Provider Credentialing</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Provider Credentialing
                <span className="block text-pink2 mt-2">in Miami, Florida</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Fast provider credentialing (60-120 days) for insurance networks. We handle CAQH enrollment, EDI setup, ERA configuration, and EFT arrangements so you can start billing faster.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">CAQH Expert</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">EDI/ERA/EFT</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">60-120 Days</span>
              </div>
              
              <Button href="/consultation" text="Start Credentialing" colors="bg-pink2 text-white hover:bg-pink2/80 text-lg px-8 py-4" />
            </div>
            
            <div className="relative">
              <Image
                src="/raster/Time-Saving-Medical-Billing-Solutions.webp"
                alt="Provider Credentialing Services - CAQH, EDI, ERA, EFT"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl shadow-pink2/20"
              />
              <div className="absolute -bottom-6 -left-6 bg-pink2 text-white px-6 py-4 rounded-xl shadow-xl">
                <p className="text-3xl font-bold">60-120</p>
                <p className="text-sm">Day Process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentialing Services */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete Credentialing Services</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to get credentialed and connected to insurance networks for maximum patient access
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentialingServices.map((service, index) => (
              <article 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-pink2/50 transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-pink2/20 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-pink2 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
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

      {/* Process Timeline */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Credentialing Process</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our streamlined process gets you credentialed as quickly as possible, typically within 60-120 days
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processTimeline.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-pink2 rounded-full flex items-center justify-center text-white font-bold">
                      {item.step}
                    </div>
                    <span className="text-xs text-pink2 font-medium bg-pink2/20 px-2 py-1 rounded">{item.days}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
                {index < processTimeline.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-pink2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Networks */}
      <section className="py-16 lg:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Insurance Networks We Credential</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We handle credentialing with all major Florida insurance plans to help you expand your patient base
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {insuranceNetworks.map((network, i) => (
              <span 
                key={i} 
                className="px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border border-gray-700 text-sm text-gray-300 hover:border-pink2/50 transition-colors"
              >
                {network}
              </span>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Don't see your insurance network?</p>
            <Button href="/consultation" text="Contact Us" colors="bg-white text-gray-900 hover:bg-pink2 hover:text-white" />
          </div>
        </div>
      </section>

      {/* Why Credentialing Matters */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Provider Credentialing is <span className="text-pink2">Essential</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Getting credentialed with insurance networks is critical for practices that want to serve insured patients. Without proper credentialing, you may not be able to bill insurance for services rendered.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink2/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Expanded Patient Base</h4>
                    <p className="text-gray-400 text-sm">Access thousands of insured patients in your area</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink2/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Proper Reimbursement</h4>
                    <p className="text-gray-400 text-sm">Get paid correctly for services through insurance</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink2/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Reduced Billing Issues</h4>
                    <p className="text-gray-400 text-sm">Avoid claim denials from improper credentialing</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to Get Credentialed?</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Process Time</span>
                  <span className="text-white font-semibold">60-120 Days</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Network Applications</span>
                  <span className="text-white font-semibold">Unlimited</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300">Initial Consultation</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
              </div>
              <Button href="/consultation" text="Start Credentialing Today" colors="w-full bg-pink2 text-white hover:bg-pink2/80 py-4" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink2 to-pink2/80 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Expand Your Practice?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get started with provider credentialing today. We'll handle the paperwork so you can focus on patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/consultation" text="Start Credentialing" colors="bg-white text-pink2 hover:bg-gray-100 text-lg px-8 py-4" />
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
  title: 'Provider Credentialing Services Miami | CAQH, EDI, ERA, EFT Setup Florida',
  description: 'Expert provider credentialing services in Miami, Florida. CAQH enrollment, EDI setup, ERA configuration, and EFT arrangement. Process takes 60-120 days. Start billing insurance faster.',
  keywords: 'Provider Credentialing Miami, CAQH Enrollment Florida, EDI Setup Miami, ERA Configuration, EFT Setup, Insurance Credentialing Miami, Provider Enrollment Florida, Medical Credentialing Services',
  alternates: {
    canonical: 'https://medicalbillingmb.com/services/credentialing'
  },
  openGraph: {
    title: 'Provider Credentialing Services Miami | MBMB',
    description: 'Expert provider credentialing services including CAQH enrollment, EDI setup, ERA configuration, and EFT arrangement in Miami, Florida.',
    url: 'https://medicalbillingmb.com/services/credentialing',
    siteName: 'Medical Billing Miami Beach (MBMB)',
    locale: 'en_US',
    type: 'website',
  },
  other: {
    'ai:service': 'provider credentialing, CAQH enrollment, EDI setup, ERA configuration, EFT setup',
    'ai:location': 'Miami, Florida',
    'ai:phone': '+1-786-643-2099',
  }
}