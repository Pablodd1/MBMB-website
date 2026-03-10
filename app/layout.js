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
  title: 'Medical Billing Miami Beach | MBMB - Expert Medical Coding & Billing Services',
  description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. MBMB helps healthcare providers maximize reimbursements with AAPC-certified specialists. Call (786) 643-2099.',
  keywords: 'Medical Billing Miami, Medical Coding Florida, Healthcare Revenue Cycle Management, Credentialing Services Miami, Medical Billing Services, MBMB, AAPC Certified Coders, Miami Beach Medical Billing',
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
    description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. Maximize your revenue with our AAPC-certified specialists.',
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
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness', 'Organization'],
    name: 'Medical Billing Miami Beach (MBMB)',
    image: 'https://medicalbillingmb.com/mbmb-white.png',
    description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. Maximize revenue and minimize denials with our certified specialists.',
    url: 'https://medicalbillingmb.com',
    telephone: '+1-786-643-2099',
    email: 'Jasmel@medicalbillingmb.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Miami',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.7617,
      longitude: -80.1918
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: 'Miami'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Medical Billing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Medical Billing'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Medical Coding'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Credentialing'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Revenue Cycle Management'
          }
        }
      ]
    },
    sameAs: [
      "https://www.instagram.com/medicalbillingmiamibeach",
      "https://www.linkedin.com/company/medical-billing-miami-beach"
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