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
  // metadataBase: new URL('https://medicalbillingmb.com'),
  title: 'Medical Billing, Coding and Credentialling Services | Miami, Florida | Specialist',
  keywords: 'Medical Billing, Medical Coding, Medical Credentialling, Healthcare, Miami Florida, USA, Specialist, Services',
  description: 'Expert medical billing, coding, and credentialing services in Miami, Florida. Trust our specialists for accurate healthcare administration.',
  generator: 'Next.js',
  applicationName: 'MBMB',
  creator: 'Design and Developed By M Talha | Founder of MyAbabeel',
  alternates: {
    canonical: 'https://medicalbillingmb.com'
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sansita.className}>{children}</body>
    </html>
  );
}