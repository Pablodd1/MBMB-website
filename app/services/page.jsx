import Image from 'next/image'
import Link from 'next/link'
import SmartImage from '../components/SmartImage'
import Button from '@UTILS/button'

const services = [
  {
    title: 'Medical Billing',
    description: 'Expert medical billing services for healthcare providers across Miami and South Florida. Our AAPC-certified specialists handle claims submission, denial management, payment posting, and revenue optimization so you can focus on patient care.',
    icon: '/svg/billing.svg',
    features: ['Claims Submission', 'Denial Management', 'Payment Posting', 'Insurance Verification', 'Patient Billing', 'AR Follow-up'],
    href: '/consultation',
    image: '/raster/medical-billing-and-medical-coding-services-healthcare-revenue-management-7.5.avif'
  },
  {
    title: 'Medical Coding',
    description: 'Precision medical coding with ICD-10, CPT, and HCPCS expertise. We reduce claim denials by ensuring accurate code selection, proper modifier usage, and compliance with Florida payer requirements and Medicare/Medicaid guidelines.',
    icon: '/svg/coding.svg',
    features: ['ICD-10 Coding', 'CPT/HCPCS Coding', 'Modifiers', 'Code Auditing', 'Compliance Review', 'Specialty Coding'],
    href: '/services/medical-coding',
    image: '/raster/medical-coding-icd.webp'
  },
  {
    title: 'Provider Credentialing',
    description: 'Fast provider credentialing (60-120 days) for insurance networks. We handle CAQH enrollment, EDI setup, ERA configuration, and EFT arrangements so you can start billing faster and expand your patient base.',
    icon: '/svg/credentialing.svg',
    features: ['CAQH Enrollment', 'EDI Setup', 'ERA Configuration', 'EFT Setup', 'Network Applications', 'Demographic Updates'],
    href: '/services/credentialing',
    image: '/raster/Time-Saving-Medical-Billing-Solutions.webp'
  },
  {
    title: 'Revenue Cycle Management',
    description: 'End-to-end revenue cycle management covering every step from patient registration to final payment. Our comprehensive RCM services optimize cash flow, reduce denials, and maximize your practice revenue.',
    icon: '/svg/rcm.svg',
    features: ['Patient Registration', 'Insurance Verification', 'Charge Capture', 'Claims Processing', 'Denial Management', 'Payment Posting', 'Reporting & Analytics'],
    href: '/services/revenue-cycle-management',
    image: '/raster/healthcare-revenue-cycle-management-companies.webp'
  }
]

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Medical Billing Services",
  "provider": {
    "@type": "Organization",
    "name": "Medical Billing Miami Beach (MBMB)",
    "url": "https://medicalbillingmb.com"
  },
  "areaServed": {
    "@type": "State",
    "name": "Florida"
  },
  "description": "Expert medical billing, medical coding, credentialing, and revenue cycle management services for healthcare providers in Miami and South Florida.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Healthcare Revenue Management Services",
    "itemListElement": services.map((service, index) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.title,
        "description": service.description,
        "areaServed": "Miami, Florida"
      }
    }))
  }
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-pink2/20 via-transparent to-blue-500/20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Expert Medical Billing Services
              <span className="block text-pink2 mt-2">in Miami, Florida</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Maximize your practice revenue with our comprehensive suite of healthcare revenue management services. From medical billing and coding to provider credentialing and full revenue cycle management.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <span className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm">AAPC Certified</span>
              <span className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm">HIPAA Compliant</span>
              <span className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm">Florida Specialists</span>
            </div>
            <Button href="/consultation" text="Get Free Billing Audit" colors="bg-pink2 text-white hover:bg-pink2/80 text-lg px-8 py-4" />
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive medical billing and revenue cycle solutions tailored for Miami healthcare providers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <article 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-pink2/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink2/10 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-6 lg:p-8">
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {service.features.slice(0, 6).map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-300">
                        <span className="w-1.5 h-1.5 bg-pink2 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button href={service.href} text={`Learn More About ${service.title}`} colors="bg-white text-gray-900 hover:bg-pink2 hover:text-white" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose MBMB Section */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-pink2">MBMB</span> for Your Medical Billing?
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Since 2015, we've been Miami's trusted partner in healthcare revenue management. Our team of AAPC-certified specialists combines deep industry knowledge with cutting-edge technology to deliver exceptional results.
            </p>
          </div>

          {/* 3-Column Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 text-center hover:border-pink2/50 transition-colors">
              <div className="w-16 h-16 bg-pink2/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h4 className="font-semibold text-xl mb-2">95%+ Clean Claim Rate</h4>
              <p className="text-gray-400 text-sm">Our rigorous coding and documentation standards ensure minimal claim denials</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 text-center hover:border-pink2/50 transition-colors">
              <div className="w-16 h-16 bg-pink2/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">$</span>
              </div>
              <h4 className="font-semibold text-xl mb-2">No Upfront Costs</h4>
              <p className="text-gray-400 text-sm">We work on contingency - you only pay when we collect for you</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 text-center hover:border-pink2/50 transition-colors">
              <div className="w-16 h-16 bg-pink2/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤖</span>
              </div>
              <h4 className="font-semibold text-xl mb-2">24/7 AI Assistant</h4>
              <p className="text-gray-400 text-sm">Multilingual AI chatbot available around the clock to answer patient questions</p>
            </div>
          </div>

          {/* Centered CTA Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">Ready to Maximize Your Revenue?</h3>
              <div className="space-y-0 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Service Area</span>
                  <span className="text-white font-semibold">Miami &amp; South Florida</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Response Time</span>
                  <span className="text-white font-semibold">&lt; 24 Hours</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Initial Consultation</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300">Pricing</span>
                  <span className="text-white font-semibold">4-8% of Collections</span>
                </div>
              </div>
              <Button href="/consultation" text="Schedule Free Consultation" colors="w-full bg-pink2 text-white hover:bg-pink2/80 py-4" />
              <p className="text-center text-gray-500 text-sm mt-4">No commitment required</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink2 to-pink2/80 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Optimize Your Revenue Cycle?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today for a free billing audit and discover how much revenue your practice could be losing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/consultation" text="Get Free Audit" colors="bg-white text-pink2 hover:bg-gray-100 text-lg px-8 py-4" />
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
  title: 'Medical Billing Services Miami | Medical Coding, Credentialing & RCM',
  description: 'Expert medical billing services in Miami, Florida. We offer medical coding (ICD-10, CPT, HCPCS), provider credentialing (CAQH, EDI, ERA, EFT), and full revenue cycle management. AAPC-certified specialists. Call (786) 643-2099.',
  keywords: 'Medical Billing Services Miami, Medical Coding Florida, Provider Credentialing Miami, Revenue Cycle Management, ICD-10 Coding, CPT Coding, HCPCS Coding, CAQH Enrollment, EDI Setup, Miami Medical Billing Company',
  alternates: {
    canonical: 'https://medicalbillingmb.com/services'
  },
  openGraph: {
    title: 'Medical Billing Services Miami | MBMB',
    description: 'Expert medical billing, medical coding, credentialing, and revenue cycle management services in Miami, Florida.',
    url: 'https://medicalbillingmb.com/services',
    siteName: 'Medical Billing Miami Beach (MBMB)',
    locale: 'en_US',
    type: 'website',
  },
  other: {
    'ai:service': 'medical billing services, medical coding, credentialing, revenue cycle management',
    'ai:location': 'Miami, Florida',
    'ai:phone': '+1-786-643-2099',
  }
}