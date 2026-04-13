import Image from 'next/image'
import Link from 'next/link'
import Button from '@UTILS/button'

const rcmSteps = [
  {
    step: 1,
    title: 'Patient Registration',
    description: 'Capture and verify patient demographics, insurance coverage, and eligibility information at the point of service.',
    icon: '/svg/patient.svg'
  },
  {
    step: 2,
    title: 'Insurance Verification',
    description: 'Verify benefits, coverage limits, prior authorizations, and patient responsibilities before services are rendered.',
    icon: '/svg/insurance.svg'
  },
  {
    step: 3,
    title: 'Charge Capture',
    description: 'Accurate recording of all services provided using proper CPT/HCPCS codes and ICD-10 diagnoses.',
    icon: '/svg/charge.svg'
  },
  {
    step: 4,
    title: 'Claims Submission',
    description: 'Electronic claim preparation and submission with thorough validation to prevent errors.',
    icon: '/svg/claims.svg'
  },
  {
    step: 5,
    title: 'Payment Posting',
    description: 'Fast, accurate posting of payments from insurance carriers and patients with detailed tracking.',
    icon: '/svg/payment.svg'
  },
  {
    step: 6,
    title: 'Denial Management',
    description: 'Proactive identification and resolution of claim denials to maximize reimbursement.',
    icon: '/svg/denial.svg'
  },
  {
    step: 7,
    title: 'AR Follow-up',
    description: 'Persistent tracking and follow-up on outstanding claims to minimize days in AR.',
    icon: '/svg/ar.svg'
  },
  {
    step: 8,
    title: 'Reporting & Analytics',
    description: 'Comprehensive reporting on key performance indicators to identify trends and opportunities.',
    icon: '/svg/reports.svg'
  }
]

const benefits = [
  {
    title: 'Increased Revenue',
    description: 'Our RCM services typically increase practice revenue by 15-30% through reduced denials and improved clean claim rates.',
    icon: '/svg/revenue.svg'
  },
  {
    title: 'Reduced Administrative Burden',
    description: 'Free your staff from billing tasks so they can focus on patient care and practice operations.',
    icon: '/svg/admin.svg'
  },
  {
    title: 'Faster Cash Flow',
    description: 'Optimized claims processing and follow-up means faster payments and improved cash flow.',
    icon: '/svg/cashflow.svg'
  },
  {
    title: 'Real-Time Reporting',
    description: 'Access dashboards and reports showing your practice financial health at any moment.',
    icon: '/svg/realtime.svg'
  },
  {
    title: 'Compliance Guaranteed',
    description: 'Stay compliant with ever-changing healthcare regulations, payer requirements, and HIPAA.',
    icon: '/svg/compliance.svg'
  },
  {
    title: 'Transparent Communication',
    description: 'Regular updates and clear communication about your account status and performance.',
    icon: '/svg/communication.svg'
  }
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Revenue Cycle Management Services",
  "provider": {
    "@type": "Organization",
    "name": "Medical Billing Miami Beach (MBMB)",
    "url": "https://medicalbillingmb.com"
  },
  "areaServed": {
    "@type": "State",
    "name": "Florida"
  },
  "description": "Comprehensive revenue cycle management (RCM) services for healthcare providers in Miami, Florida. Full-cycle coverage from patient registration to final payment, maximizing collections and cash flow.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Revenue Cycle Management Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Patient Registration", "description": "Patient demographic capture and insurance verification" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Insurance Verification", "description": "Benefits and eligibility verification before services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Charge Capture", "description": "Accurate recording of services using proper codes" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Claims Submission", "description": "Electronic claim preparation and submission" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Payment Posting", "description": "Fast, accurate posting of all payments" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Denial Management", "description": "Proactive identification and resolution of denials" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AR Follow-up", "description": "Tracking and follow-up on outstanding claims" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reporting & Analytics", "description": "Comprehensive reporting on financial performance" } }
    ]
  }
}

export default function RevenueCycleManagementPage() {
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
            <li className="text-pink2 font-medium">Revenue Cycle Management</li>
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
                <span className="text-sm text-pink2 font-medium">Full Revenue Cycle Coverage</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Revenue Cycle
                <span className="block text-pink2 mt-2">Management</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                End-to-end revenue cycle management covering every step from patient registration to final payment. Our comprehensive RCM services optimize cash flow, reduce denials, and maximize your practice revenue.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">Full Cycle Coverage</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">15-30% Revenue Increase</span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20">Real-Time Dashboards</span>
              </div>
              
              <Button href="/consultation" text="Optimize Your Revenue Cycle" colors="bg-pink2 text-white hover:bg-pink2/80 text-lg px-8 py-4" />
            </div>
            
            <div className="relative">
              <Image
                src="/raster/healthcare-revenue-cycle-management-companies.webp"
                alt="Revenue Cycle Management Services"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl shadow-pink2/20"
              />
              <div className="absolute -bottom-6 -right-6 bg-pink2 text-white px-6 py-4 rounded-xl shadow-xl">
                <p className="text-3xl font-bold">15-30%</p>
                <p className="text-sm">Revenue Increase</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is RCM Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 lg:p-12 border border-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What is <span className="text-pink2">Revenue Cycle Management</span>?
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Revenue Cycle Management (RCM) is the backbone of your practice's financial health. It encompasses every step from the moment a patient schedules an appointment through the final payment on their account. An optimized RCM process ensures your practice receives proper reimbursement for services rendered while maintaining compliance with healthcare regulations.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              At Medical Billing Miami Beach, our comprehensive RCM services handle every aspect of this cycle, allowing you to focus on what matters most: providing excellent patient care. Our team of experts uses proven strategies and cutting-edge technology to identify revenue opportunities and eliminate waste in your billing process.
            </p>
          </div>
        </div>
      </section>

      {/* RCM Process Steps */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Complete Revenue Cycle</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every step of the revenue cycle handled with precision and expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rcmSteps.map((item, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 hover:border-pink2/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pink2 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Benefits of Our RCM Services</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Partner with MBMB for revenue cycle management and see real results in your practice
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-pink2/30 transition-colors"
              >
                <div className="w-12 h-12 bg-pink2/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-pink2 text-xl">✓</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
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
              <p className="text-4xl md:text-5xl font-bold mb-2">15-30%</p>
              <p className="text-sm opacity-90">Revenue Increase</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">14 Days</p>
              <p className="text-sm opacity-90">Avg. Days to Payment</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">24/7</p>
              <p className="text-sm opacity-90">AI Assistant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MBMB */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="text-pink2">MBMB</span> for RCM?
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Since 2015, Medical Billing Miami Beach has been the trusted RCM partner for healthcare providers across South Florida. Our team combines deep industry expertise with proven processes to deliver measurable results.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink2/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">AAPC-Certified Specialists</h4>
                    <p className="text-gray-400 text-sm">Our coders and billers hold active AAPC certifications</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink2/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">No Upfront Costs</h4>
                    <p className="text-gray-400 text-sm">We work on contingency - you only pay when we collect</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink2/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Transparent Reporting</h4>
                    <p className="text-gray-400 text-sm">Real-time dashboards and regular performance reviews</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to Optimize Your Revenue?</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Clean Claim Rate</span>
                  <span className="text-green-400 font-semibold">95%+</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Revenue Increase</span>
                  <span className="text-white font-semibold">15-30%</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Pricing</span>
                  <span className="text-white font-semibold">4-8% of Collections</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300">Initial Consultation</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
              </div>
              <Button href="/consultation" text="Get Free Revenue Analysis" colors="w-full bg-pink2 text-white hover:bg-pink2/80 py-4" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink2 to-pink2/80 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Optimize Your Revenue Cycle?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today for a free revenue cycle analysis and discover how much your practice could be gaining.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/consultation" text="Get Free Analysis" colors="bg-white text-pink2 hover:bg-gray-100 text-lg px-8 py-4" />
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
  title: 'Revenue Cycle Management Services Miami | Full RCM Solutions Florida',
  description: 'Comprehensive revenue cycle management (RCM) services in Miami, Florida. Full-cycle coverage from patient registration to final payment. Increase revenue by 15-30%. AAPC-certified specialists. Free consultation.',
  keywords: 'Revenue Cycle Management Miami, RCM Services Florida, Healthcare RCM, Medical Billing RCM, Revenue Cycle Optimization, Denial Management Miami, AR Follow-up Florida, Medical Billing Company Miami',
  alternates: {
    canonical: 'https://medicalbillingmb.com/services/revenue-cycle-management'
  },
  openGraph: {
    title: 'Revenue Cycle Management Services Miami | MBMB',
    description: 'Comprehensive revenue cycle management services in Miami, Florida. Increase revenue by 15-30% with our full-cycle RCM solutions.',
    url: 'https://medicalbillingmb.com/services/revenue-cycle-management',
    siteName: 'Medical Billing Miami Beach (MBMB)',
    locale: 'en_US',
    type: 'website',
  },
  other: {
    'ai:service': 'revenue cycle management, RCM, medical billing, denial management, AR follow-up',
    'ai:location': 'Miami, Florida',
    'ai:phone': '+1-786-643-2099',
  }
}