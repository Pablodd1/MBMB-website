import { Sansita } from "next/font/google";
import "./globals.css";

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
  description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. MBMB helps healthcare providers maximize reimbursements with AAPC-certified specialists. Free billing audit. Call (786) 643-2099.',
  keywords: 'Medical Billing Miami, Medical Coding Florida, Healthcare Revenue Cycle Management, Credentialing Services Miami, Medical Billing Services, MBMB, AAPC Certified Coders, Miami Beach Medical Billing, Medical Billing Company Florida, Revenue Cycle Management Miami, Medical Claims Processing, Insurance Verification Miami, Medical Billing Outsourcing, Healthcare Billing Specialist, Medical Coding Services South Florida',
  generator: 'Next.js',
  applicationName: 'MBMB',
  creator: 'Medical Billing Miami Beach',
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
    description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. Maximize your revenue with our AAPC-certified specialists. Free billing audit available.',
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
    // AI SEO - helps Perplexity, ChatGPT, and other AI search engines
    'ai:bot': 'index, follow',
    'ai:content-type': 'medical billing services',
    'ai:service-area': 'Miami, Florida, South Florida',
    'ai:phone': '+1-786-643-2099',
    'ai:email': 'Jasmel@medicalbillingmb.com',
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
        image: 'https://medicalbillingmb.com/mbmb-white.png',
        description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. Maximize revenue and minimize denials with our AAPC-certified specialists. Serving healthcare providers across Miami-Dade County, Broward, and South Florida.',
        url: 'https://medicalbillingmb.com',
        telephone: '+1-786-643-2099',
        email: 'Jasmel@medicalbillingmb.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Miami',
          addressLocality: 'Miami',
          addressRegion: 'FL',
          postalCode: '33139',
          addressCountry: 'US'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 25.7617,
          longitude: -80.1918
        },
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'Miami' },
          { '@type': 'City', name: 'Miami Beach' },
          { '@type': 'City', name: 'Coral Gables' },
          { '@type': 'City', name: 'Aventura' },
          { '@type': 'City', name: 'Doral' },
          { '@type': 'City', name: 'Hialeah' },
          { '@type': 'City', name: 'Fort Lauderdale' },
          { '@type': 'State', name: 'Florida' }
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Medical Billing Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medical Billing', description: 'Expert medical billing services including claim submission, follow-up, and payment posting' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medical Coding', description: 'ICD-10, CPT, and HCPCS coding by AAPC-certified specialists' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Credentialing', description: 'Provider credentialing and CAQH enrollment for insurance networks' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Revenue Cycle Management', description: 'End-to-end revenue cycle management to maximize collections' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Denial Management', description: 'Proactive denial management and appeals process' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Insurance Verification', description: 'Patient eligibility and benefit verification' } }
          ]
        },
        sameAs: [
          "https://www.instagram.com/medicalbillingmiamibeach",
          "https://www.linkedin.com/company/medical-billing-miami-beach"
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '50',
          bestRating: '5'
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What medical billing services do you offer in Miami?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We provide comprehensive medical billing, medical coding, revenue cycle management, and credentialing services tailored for healthcare practices in Miami and across Florida. Our services include claim submission, denial management, patient billing, and insurance verification.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much does medical billing cost in Miami?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most practices pay 5-6% of collected revenue. No setup fees. No hidden costs. Only pay when we collect. A practice with $500K annual billing typically pays $25K-30K/year.'
            }
          },
          {
            '@type': 'Question',
            name: 'Are you HIPAA compliant?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely. We are fully HIPAA and HITECH compliant with encrypted data transmission, secure servers, and strict access controls. Your patient data is never shared or resold, and we sign Business Associate Agreements (BAAs) with all clients.'
            }
          },
          {
            '@type': 'Question',
            name: 'How long does provider credentialing take in Florida?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The credentialing process typically takes 60 to 120 days depending on the insurance network. Our team expedites this process by ensuring all applications are accurate and complete from day one, handling CAQH, EDI, ERA, and EFT setup.'
            }
          }
        ]
      },
      {
        '@type': 'Service',
        serviceType: 'Medical Billing Services',
        provider: { '@id': 'https://medicalbillingmb.com/#organization' },
        areaServed: 'Miami, Florida',
        description: 'Professional medical billing services for healthcare providers in Miami, Florida. We handle claims, denials, coding, and revenue cycle management.'
      },
      {
        '@type': 'WebSite',
        name: 'Medical Billing Miami Beach',
        url: 'https://medicalbillingmb.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://medicalbillingmb.com/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };

  return (
    <html lang="en">
      <body className={sansita.className}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}