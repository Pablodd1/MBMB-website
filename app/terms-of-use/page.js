'use client'
import Image from "next/image";
import Link from "next/link";

export default function TermsOfUse() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Use</h1>
          <p className="text-gray-300">Medical Billing Miami Beach (MBMB)</p>
          <p className="text-gray-400 text-sm mt-2">Last Updated: March 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Agreement */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing or using the Medical Billing Miami Beach (MBMB) website, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        {/* Services Description */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Description</h2>
          <p className="text-gray-700 mb-4">MBMB provides the following services:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Medical billing and claims submission</li>
            <li>Medical coding (ICD-10, CPT, HCPCS)</li>
            <li>Provider credentialing services</li>
            <li>Revenue cycle management</li>
            <li>AI-assisted consultation (general information only)</li>
          </ul>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm font-semibold">
              <strong>Important:</strong> Our AI chatbot provides general information only and does not constitute medical, legal, or financial advice. Always consult with qualified professionals for specific guidance.
            </p>
          </div>
        </section>

        {/* HIPAA Compliance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. HIPAA Compliance & PHI</h2>
          <div className="bg-yellow-900/10 border border-yellow-600/30 rounded-xl p-6">
            <p className="text-yellow-800 font-semibold mb-3">Protected Health Information (PHI) Policy</p>
            <p className="text-yellow-700 text-sm leading-relaxed mb-4">
              MBMB is committed to HIPAA compliance. Please note:
            </p>
            <ul className="text-yellow-700 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                Do NOT send PHI through WhatsApp, social media, or unsecured email
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                PHI is only handled through secure, HIPAA-compliant channels after formal engagement
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                We sign Business Associate Agreements (BAAs) with all clients
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                For secure communication, call <a href="tel:+1-786-643-2099" className="font-semibold underline">(786) 643-2099</a>
              </li>
            </ul>
          </div>
        </section>

        {/* WhatsApp Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. WhatsApp Communication Terms</h2>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <p className="text-green-800 font-semibold mb-3">WhatsApp is for General Inquiries Only</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-green-700 font-medium mb-2">Acceptable Uses:</p>
                <ul className="text-green-600 text-sm space-y-1">
                  <li>✓ Office hours questions</li>
                  <li>✓ General service information</li>
                  <li>✓ Appointment scheduling</li>
                </ul>
              </div>
              <div>
                <p className="text-red-700 font-medium mb-2">Prohibited:</p>
                <ul className="text-red-600 text-sm space-y-1">
                  <li>✗ Insurance numbers</li>
                  <li>✗ SSN or medical information</li>
                  <li>✗ Billing details or claims</li>
                </ul>
              </div>
            </div>
            <p className="text-green-700 text-sm mt-4 italic">
              By messaging us via WhatsApp, you acknowledge and agree to these terms.
            </p>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All content on this website, including text, graphics, logos, images, and software, is the property of MBMB or its content suppliers and is protected by United States and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written consent.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            MBMB shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Your use or inability to use the website</li>
            <li>Any unauthorized access to or use of our servers</li>
            <li>Any interruption or cessation of transmission to or from the website</li>
            <li>Any bugs, viruses, or other harmful code that may be transmitted through the website</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed">
            The information on this website is provided "as is" without any representations or warranties, express or implied. MBMB makes no representations or warranties in relation to the information provided on this website. The AI chatbot provides general information only and does not constitute professional advice.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms of Use shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of Miami-Dade County, Florida.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            MBMB reserves the right to modify these Terms of Use at any time. We will notify users of any material changes by posting the new Terms of Use on this page and updating the "Last Updated" date. Your continued use of the website after any changes constitutes your acceptance of the new Terms of Use.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
          <div className="bg-gray-100 rounded-xl p-6">
            <p className="text-gray-700 mb-4">For questions about these Terms of Use:</p>
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
