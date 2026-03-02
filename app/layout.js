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
  title: 'Medical Billing & Coding Services | Miami, Florida | MBMB',
  description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. Trust our certified specialists for accurate healthcare revenue management and consulting.',
  keywords: 'Medical Billing Miami, Medical Coding Florida, Healthcare Revenue Cycle Management, Credentialing Services Miami, Medical Billing Services, Medical Billing MBMB',
  generator: 'Next.js',
  applicationName: 'MBMB',
  creator: 'Design and Developed By M Talha | Founder of MyAbabeel',
  alternates: {
    canonical: 'https://medicalbillingmb.com'
  },
  openGraph: {
    title: 'Medical Billing & Coding Services | Miami, Florida',
    description: 'Maximize your healthcare revenue with expert medical billing, coding, and credentialing services in Miami, Florida.',
    url: 'https://medicalbillingmb.com',
    siteName: 'Medical Billing Miami Beach',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'MBMB Logo'
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Billing & Coding Services | Miami, Florida',
    description: 'Maximize your healthcare revenue with expert medical billing, coding, and credentialing services in Miami, Florida.',
    images: ['/logo.png'],
  },
  verification: {
    // google: '5mY7Mp4Wz4jdKB94tgnuTNF1g1I5MV447Cm--rsF3SI',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/apple-icon.png'
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness', 'Organization'],
    name: 'Medical Billing Miami Beach (MBMB)',
    image: 'https://medicalbillingmb.com/logo.png',
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
        }
      ]
    },
    sameAs: [
      "https://www.instagram.com/Miamitesting123"
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