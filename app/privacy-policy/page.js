'use client'
import Image from "next/image";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Image
            src="/mbmb-white.png"
            width={120}
            height={120}
            alt="MBMB Logo"
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300">Medical Billing Miami Beach (MBMB)</p>
          <p className="text-gray-400 text-sm mt-2">Last Updated: March 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* HIPAA Notice */}
        <section className="mb-12">
          <div className="bg-yellow-900/10 border border-yellow-600/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-yellow-800 font-semibold text-lg mb-2">HIPAA Compliance Notice</p>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  This website uses HIPAA-compliant communication methods only. Please do not send protected health information (PHI) through WhatsApp, social media, or unsecured email. For secure communication, please call our office directly at <a href="tel:+1-786-643-2099" className="font-semibold underline">(786) 643-2099</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Notice */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Communication Policy
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <p className="text-green-800 font-semibold mb-4">WHATSAPP IS FOR GENERAL INQUIRIES ONLY:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-green-700 font-medium mb-2">You CAN ask about:</p>
                <ul className="text-green-600 text-sm space-y-1">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Office hours questions</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> General service information</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Appointment scheduling</li>
                </ul>
              </div>
              <div>
                <p className="text-red-700 font-medium mb-2">DO NOT send:</p>
                <ul className="text-red-600 text-sm space-y-1">
                  <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Insurance numbers</li>
                  <li className="flex items-center gap-2"><span className="text-red-500">✗</span> SSN or medical information</li>
                  <li className="flex items-center gap-2"><span className="text-red-500">✗</span> Billing details or claims</li>
                </ul>
              </div>
            </div>
            <p className="text-green-700 text-sm mt-4 italic">By messaging us via WhatsApp, you agree not to share sensitive information.</p>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          <div className="space-y-4 text-gray-700">
            <p>We collect information you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, practice name</li>
              <li><strong>Business Information:</strong> Practice details, NPI numbers, EIN (for credentialing purposes only)</li>
              <li><strong>Communication Records:</strong> Emails, calls, consultation requests</li>
              <li><strong>Website Analytics:</strong> Browser type, IP address, pages visited (anonymized)</li>
            </ul>
            <p className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800 text-sm">
              <strong>Important:</strong> We do NOT collect or store patient health information (PHI) through this website. PHI is only handled through secure, HIPAA-compliant channels after establishing a formal business relationship.
            </p>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>To respond to your inquiries and consultation requests</li>
            <li>To provide medical billing and coding services (after formal engagement)</li>
            <li>To send important updates about our services</li>
            <li>To improve our website and services</li>
            <li>To comply with legal and regulatory requirements</li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
          <p className="text-gray-700 mb-4">We implement robust security measures to protect your information:</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">Security Measure</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Status</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">SSL Certificate (HTTPS)</td>
                  <td className="border border-gray-300 px-4 py-3"><span className="text-green-600 font-semibold">✓ Active</span></td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">All data encrypted in transit</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Privacy Policy</td>
                  <td className="border border-gray-300 px-4 py-3"><span className="text-green-600 font-semibold">✓ Active</span></td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">This page</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Terms of Use</td>
                  <td className="border border-gray-300 px-4 py-3"><span className="text-green-600 font-semibold">✓ Active</span></td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">See <Link href="/terms-of-use" className="text-blue-600 hover:underline">Terms of Use</Link></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">2FA on Admin</td>
                  <td className="border border-gray-300 px-4 py-3"><span className="text-green-600 font-semibold">✓ Enabled</span></td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">Two-factor authentication active</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Strong Passwords</td>
                  <td className="border border-gray-300 px-4 py-3"><span className="text-green-600 font-semibold">✓ Enforced</span></td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">16+ character requirement</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Daily Backups</td>
                  <td className="border border-gray-300 px-4 py-3"><span className="text-green-600 font-semibold">✓ Automated</span></td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">Automated daily backup system</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Business Associate Agreements</td>
                  <td className="border border-gray-300 px-4 py-3"><span className="text-green-600 font-semibold">✓ Signed</span></td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">BAAs with all vendors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Social Media Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Social Media Policy</h2>
          <div className="bg-gray-100 rounded-xl p-6">
            <p className="text-gray-700 font-semibold mb-4">Staff Guidelines for Social Media:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <p className="text-red-700 font-bold mb-3">DO NOT:</p>
                <ul className="text-red-600 text-sm space-y-2">
                  <li className="flex items-start gap-2"><span>❌</span> Post patient names or photos</li>
                  <li className="flex items-start gap-2"><span>❌</span> Respond with medical/billing details in comments</li>
                  <li className="flex items-start gap-2"><span>❌</span> Accept patient friend requests</li>
                  <li className="flex items-start gap-2"><span>❌</span> Share PHI on any platform</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-green-700 font-bold mb-3">DO:</p>
                <ul className="text-green-600 text-sm space-y-2">
                  <li className="flex items-start gap-2"><span>✅</span> Share general billing tips</li>
                  <li className="flex items-start gap-2"><span>✅</span> Post company news (no patient photos)</li>
                  <li className="flex items-start gap-2"><span>✅</span> Reply: "Please call our office" to DMs</li>
                  <li className="flex items-start gap-2"><span>✅</span> Direct inquiries to secure channels</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Information Sharing</h2>
          <p className="text-gray-700 mb-4">We do NOT sell, trade, or share your personal information with third parties except:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>With your explicit consent</li>
            <li>To comply with legal obligations</li>
            <li>With trusted service providers who sign BAAs (Business Associate Agreements)</li>
            <li>To protect our rights or safety</li>
          </ul>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Access your personal information</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>File a complaint with relevant authorities</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
          <div className="bg-gray-100 rounded-xl p-6">
            <p className="text-gray-700 mb-4">For privacy-related questions or to exercise your rights:</p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Phone:</strong> <a href="tel:+1-786-643-2099" className="text-blue-600 hover:underline">(786) 643-2099</a></li>
              <li><strong>Email:</strong> <a href="mailto:Jasmel@medicalbillingmb.com" className="text-blue-600 hover:underline">Jasmel@medicalbillingmb.com</a></li>
              <li><strong>WhatsApp:</strong> General inquiries only (no PHI)</li>
            </ul>
          </div>
        </section>

        {/* Back Link */}
        <div className="text-center pt-8 border-t border-gray-200">
          <Link href="/" className="inline-flex items-center text-pink2 hover:text-pink-600 font-semibold transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
