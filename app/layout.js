import { Sansita } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import Subscribe from "@UTILS/subscribe";

const social = [
  {
    href: "https://api.whatsapp.com/send?phone=17866432099",
    icon: "whatsapp"
  },
  {
    href: "https://www.instagram.com/medicalbillingmiamibeach",
    icon: "instagram"
  }
];

const sansita = Sansita({
  weight: ['400', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sansita',
});

export const metadata = {
  metadataBase: new URL('https://medicalbillingmb.com'),
  title: {
    default: 'Medical Billing Miami Beach | MBMB - Expert Medical Coding & Billing Services',
    template: '%s | Medical Billing Miami Beach - MBMB'
  },
  description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. AAPC-certified specialists help healthcare providers maximize reimbursements. Free billing audit. Call (786) 643-2099.',
  keywords: 'Medical Billing Miami, Medical Coding Florida, Healthcare Revenue Cycle Management, Credentialing Services Miami, Medical Billing Services, MBMB, AAPC Certified Coders, Miami Beach Medical Billing, Medical Billing Company Florida, Revenue Cycle Management Miami, Medical Claims Processing, Insurance Verification Miami, Medical Billing Outsourcing, Healthcare Billing Specialist, Medical Coding Services South Florida, Florida Medicaid Billing, Miami Healthcare Billing',
  generator: 'Next.js',
  applicationName: 'MBMB',
  creator: 'Medical Billing Miami Beach',
  publisher: 'Medical Billing Miami Beach',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://medicalbillingmb.com'
  },
  openGraph: {
    title: 'Medical Billing Miami Beach | MBMB - Expert Medical Coding Services',
    description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. Maximize your revenue with AAPC-certified specialists. Free billing audit available.',
    url: 'https://medicalbillingmb.com',
    siteName: 'Medical Billing Miami Beach (MBMB)',
    images: [
      {
        url: 'https://medicalbillingmb.com/mbmb-white.png',
        width: 1200,
        height: 630,
        alt: 'Medical Billing Miami Beach - MBMB Logo'
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Billing Miami Beach | MBMB',
    description: 'Expert medical billing, coding, and credentialing services in Miami, Florida.',
    images: ['https://medicalbillingmb.com/mbmb-white.png'],
  },
  verification: {
    // google: 'your-google-verification-code',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/mbmb-white.png',
    shortcut: '/mbmb-white.png',
    apple: '/mbmb-white.png'
  },
  other: {
    // AI SEO - helps Perplexity, ChatGPT, Claude, and other AI search engines
    'ai:bot': 'index, follow, max-snippet:-1, max-image-preview:large',
    'ai:content-type': 'medical billing services, healthcare revenue cycle management',
    'ai:service-area': 'Miami, Florida, South Florida, Miami-Dade County, Broward County',
    'ai:phone': '+1-786-643-2099',
    'ai:email': 'Jasmel@medicalbillingmb.com',
    'ai:business-hours': 'Mon-Fri 9AM-6PM EST',
    'ai:services': 'medical billing, medical coding, credentialing, revenue cycle management, denial management, insurance verification',
    'ai:specialties': 'primary care, family medicine, internal medicine, pediatrics, OB/GYN, general surgery, orthopedics, dermatology, psychiatry, cardiology, oncology',
    'ai:ai-assistant': 'available',
    'ai:ai-assistant-capabilities': 'multilingual, voice-input, voice-output, appointment-scheduling, service-info, pricing-info',
    // Additional meta for LLMs
    'llm-friendly': 'true',
    'llm-contact-priority': 'high',
    'llm-response-time': '< 24 hours',
    'llm-consultation': 'free',
    // Structured data hint for AI crawlers
    'structured-data-available': 'MedicalBusiness, LocalBusiness, Organization, FAQPage, Service, ChatBot',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['MedicalBusiness', 'LocalBusiness', 'Organization'],
        '@id': 'https://medicalbillingmb.com/#organization',
        name: 'Medical Billing Miami Beach (MBMB)',
        alternateName: 'MBMB',
        image: 'https://medicalbillingmb.com/mbmb-white.png',
        description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. Maximize revenue and minimize denials with our AAPC-certified specialists. Serving healthcare providers across Miami-Dade County, Broward, and South Florida.',
        url: 'https://medicalbillingmb.com',
        telephone: '+1-786-643-2099',
        email: 'Jasmel@medicalbillingmb.com',
        address: {
          '@type': 'PostalAddress',
          'streetAddress': 'Miami',
          'addressLocality': 'Miami',
          'addressRegion': 'FL',
          'postalCode': '33139',
          'addressCountry': 'US'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': '25.7617',
          'longitude': '-80.1918'
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'opens': '09:00',
            'closes': '18:00',
            'timeZone': 'America/New_York'
          }
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Medical Billing Services',
          'itemListElement': [
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Medical Billing', 'description': 'Expert medical billing services including claim submission, follow-up, and payment posting', 'areaServed': 'Miami, Florida' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Medical Coding', 'description': 'ICD-10, CPT, and HCPCS coding by AAPC-certified specialists', 'areaServed': 'Florida' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Credentialing', 'description': 'Provider credentialing and CAQH enrollment for insurance networks', 'areaServed': 'South Florida' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Revenue Cycle Management', 'description': 'End-to-end revenue cycle management to maximize collections' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Denial Management', 'description': 'Proactive denial management and appeals process' } },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Insurance Verification', 'description': 'Patient eligibility and benefit verification' } }
          ]
        },
        'sameAs': [
          "https://www.instagram.com/medicalbillingmiamibeach"
        ],
        // Note: aggregateRating removed until real reviews are collected
        'priceRange': '4-8% of collections',
        'currenciesAccepted': 'USD',
        'paymentAccepted': 'Cash, Check, Credit Card, ACH Transfer',
        'knowsAbout': [
          'Medical billing services',
          'Medical coding',
          'Healthcare credentialing',
          'Revenue cycle management',
          'Insurance claims processing',
          'Denial management',
          'HIPAA compliance'
        ],
        'serviceArea': {
          '@type': 'GeoCircle',
          'geoMidpoint': {
            '@type': 'GeoCoordinates',
            'latitude': '25.7617',
            'longitude': '-80.1918'
          },
          'geoRadius': '50000'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://medicalbillingmb.com/#faqpage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What medical billing services do you offer in Miami?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We provide comprehensive medical billing, medical coding, revenue cycle management, and credentialing services tailored for healthcare practices in Miami and across Florida. Our services include claim submission, denial management, patient billing, and insurance verification.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How much does medical billing cost in Miami?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Most practices pay 5-6% of collected revenue. No setup fees. No hidden costs. Only pay when we collect. A practice with $500K annual billing typically pays $25K-30K/year.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Are you HIPAA compliant?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Absolutely. We are fully HIPAA and HITECH compliant with encrypted data transmission, secure servers, and strict access controls. Your patient data is never shared or resold, and we sign Business Associate Agreements (BAAs) with all clients.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How long does provider credentialing take in Florida?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'The credentialing process typically takes 60 to 120 days depending on the insurance network. Our team expedites this process by ensuring all applications are accurate and complete from day one, handling CAQH, EDI, ERA, and EFT setup.'
            }
          }
        ]
      },
      {
        '@type': 'Service',
        'serviceType': 'Medical Billing Services',
        'provider': { '@id': 'https://medicalbillingmb.com/#organization' },
        'areaServed': {
          '@type': 'State',
          'name': 'Florida'
        },
        'description': 'Professional medical billing services for healthcare providers in Miami, Florida. We handle claims, denials, coding, and revenue cycle management.'
      },
      {
        '@type': 'ChatBot',
        '@id': 'https://medicalbillingmb.com/#chatbot',
        'name': 'MBMB AI Virtual Receptionist',
        'description': 'Multilingual AI assistant for Medical Billing Miami Beach that can answer questions about services, pricing, specialties, and scheduling. Supports voice input and output.',
        'url': 'https://medicalbillingmb.com',
        'applicationCategory': 'Customer Service',
        'applicationSubCategory': 'Healthcare Assistant',
        'features': [
          'Multilingual support (English, Spanish, Haitian Creole)',
          'Voice recognition and speech-to-text',
          'Text-to-speech voice output',
          'Appointment scheduling assistance',
          'Service and pricing information',
          'HIPAA compliance information',
          'Credentialing guidance',
          'Specialty-specific billing information'
        ],
        'availableLanguage': ['en', 'es', 'ht'],
        'provider': {
          '@type': 'Organization',
          'name': 'Medical Billing Miami Beach (MBMB)',
          'url': 'https://medicalbillingmb.com'
        },
        'isBasedOn': 'Kimi AI (moonshot.ai)',
        'operatingSystem': 'Web Browser',
        'interactionStatistic': {
          '@type': 'InteractionCounter',
          'interactionType': { '@type': 'ListenAction' },
          'userInteractionCount': '0'
        },
        'contactOption': {
          '@type': 'ContactPoint',
          'telephone': '+1-786-643-2099',
          'contactType': 'customer support',
          'availableLanguage': ['en', 'es', 'ht'],
          'areaServed': 'US'
        }
      },
      {
        '@type': 'WebSite',
        'name': 'Medical Billing Miami Beach (MBMB)',
        'url': 'https://medicalbillingmb.com',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://medicalbillingmb.com/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        },
        'publisher': { '@id': 'https://medicalbillingmb.com/#organization' }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://medicalbillingmb.com'
          }
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Additional AI and LLM discovery tags */}
        <meta name="llm-friendly" content="true" />
        <meta name="ai-assistant-available" content="true" />
        <meta name="ai-assistant-capabilities" content="multilingual,voice-input,voice-output,appointment-scheduling,service-info,pricing-info" />
        <link rel="alternate" href="https://medicalbillingmb.com" hrefLang="en-us" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      </head>
      <body className={sansita.className}>
        {/* Header with Phone - Enhanced for SEO */}
        <header className="bg-white shadow-md border-b-4 border-blue-600" itemScope itemType="https://schema.org/WPHeader">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center" itemScope itemType="https://schema.org/Organization">
              <div className="text-blue-600 font-bold text-xl" itemProp="name">MBMB</div>
              <div className="ml-4">
                <div className="text-slate-800 font-semibold" itemProp="description">Medical Billing Miami Beach</div>
                <div className="text-blue-600 text-sm">Expert Medical Billing & Coding</div>
              </div>
            </div>
            <div className="text-right" itemScope itemType="https://schema.org/ContactPoint">
              <div className="text-slate-600 text-sm">Call us today</div>
              <div className="text-blue-600 font-bold text-lg">
                <a href="tel:+17866432099" itemProp="telephone" content="+1-786-643-2099">
                  (786) 643-2099
                </a>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="min-h-screen" itemScope itemType="https://schema.org/MainContentOfPage">
          {children}
        </main>
        
        {/* Footer - Enhanced with HIPAA Notice, Social, Newsletter */}
        <footer className="bg-black text-white w-full pt-16 pb-8" itemScope itemType="https://schema.org/WPFooter">
          {/* Trust Badges Bar */}
          <div className="w-full border-b border-white/10 pb-8 mb-8">
            <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                <span>AAPC Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                <span>MGMA Member</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                <span>BAA Signed</span>
              </div>
            </div>
          </div>

          <div className="w-11/12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Logo and Description */}
              <div className="flex flex-col items-center md:items-start">
                <Image src="/mbmb-white.png" alt="Medical Billing Miami Beach Logo" width={180} height={130} className="mb-4" />
                <p className="text-slate-300 text-sm text-center md:text-left">Expert medical billing and coding for Florida healthcare providers. AAPC-certified specialists maximizing your revenue.</p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-blue-400 font-bold mb-4">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <div><a href="/blog" className="text-slate-300 hover:text-blue-400">Blog</a></div>
                  <div><a href="/consultation" className="text-slate-300 hover:text-blue-400">Free Consultation</a></div>
                  <div><a href="/" className="text-slate-300 hover:text-blue-400">About MBMB</a></div>
                  <div><a href="/services" className="text-slate-300 hover:text-blue-400">Our Services</a></div>
                  <div><a href="/contact" className="text-slate-300 hover:text-blue-400">Contact Us</a></div>
                  <div><a href="/privacy-policy" className="text-slate-300 hover:text-blue-400">Privacy Policy</a></div>
                  <div><a href="/terms-of-use" className="text-slate-300 hover:text-blue-400">Terms of Use</a></div>
                </div>
              </div>

              {/* Contact Info */}
              <div itemScope itemType="https://schema.org/ContactPoint">
                <h3 className="text-blue-400 font-bold mb-4">Contact Info</h3>
                <div className="text-slate-300 text-sm space-y-2">
                  <div>📧 <a href="mailto:Jasmel@medicalbillingmb.com" className="hover:text-blue-400" itemProp="email">Jasmel@medicalbillingmb.com</a></div>
                  <div>📞 <a href="tel:+178****2099" className="hover:text-blue-400 font-bold" itemProp="telephone" content="+1-786-643-2099">(786) 643-2099</a></div>
                  <div>📍 <span itemProp="areaServed">Miami, Florida</span></div>
                  <div>🕐 <span itemProp="hoursAvailable">Mon-Fri: 9AM-6PM EST</span></div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h3 className="text-blue-400 font-bold mb-4">Stay Updated</h3>
                <Subscribe />
                <div className="mt-6">
                  <div className="flex space-x-4">
                    {social.map((x, i) => (
                      <a key={i} href={x.href} target="_blank" rel="noopener noreferrer" aria-label={x.icon} className="hover:-translate-y-1 transition-transform">
                        <div className="bg-gray-800 p-3 rounded-full hover:bg-pink2 transition-colors">
                          <Image src={`/svg/${x.icon}.svg`} width={24} height={24} alt={x.icon} />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 text-center text-slate-400 text-sm">
              <p>© 2025 Medical Billing Miami Beach (MBMB). All rights reserved.</p>
              <p className="mt-2">Serving healthcare providers across Florida.</p>
            </div>
          </div>
        </footer>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
        />
      </body>
    </html>
  );
}
