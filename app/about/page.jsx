'use client'
import Button from "@UTILS/button";
import Image from "next/image";

export const metadata = {
  title: 'About MBMB - Miami Medical Billing Experts Since 2015',
  description: 'Learn about Medical Billing Miami Beach (MBMB) - AAPC-certified medical billing specialists serving healthcare providers across Miami, Florida since 2015. Free consultation available.',
  keywords: 'about medical billing miami, medical billing company miami beach, healthcare billing specialists florida, MBMB about us, medical billing miami team',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-myblack/90 to-pink2/20 -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="text-mypink">MBMB</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Miami's Trusted Medical Billing Partner Since 2015
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Medical Billing Miami Beach (MBMB) has been helping healthcare providers across South Florida maximize their revenue, reduce claim denials, and focus on what matters most — patient care.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Our Mission
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-pink2">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Medical Billing Miami Beach, our mission is to empower healthcare practices with financial clarity and peace of mind. We believe that no doctor should lose revenue to billing errors, denied claims, or inefficient processes.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2015, we've grown from a small team of two AAPC-certified specialists to a full-service medical billing company serving practices across Miami-Dade County, Broward, and all of South Florida. Our deep understanding of Florida's payer landscape — from Medicaid to Medicare to commercial insurers — sets us apart from generic billing companies.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why Miami Practices Choose MBMB
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'AAPC Certified', desc: 'Our team holds active AAPC credentials — Certified Professional Coders (CPC) and Certified Medical billing specialists.' },
              { icon: '📍', title: 'Miami-Based', desc: "We're not a call center. We know Florida's payer requirements, Medicaid rules, and local healthcare market." },
              { icon: '💰', title: 'Performance-Based', desc: 'Most clients pay 5-6% of collections. No setup fees. No hidden costs. We win when you win.' },
              { icon: '🔒', title: 'HIPAA Compliant', desc: 'Fully HIPAA and HITECH compliant with encrypted data transmission, secure servers, and strict access controls.' },
              { icon: '🤖', title: 'AI-Powered', desc: 'Our AI chatbot answers patient questions 24/7 in English, Spanish, and Haitian Creole.' },
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Claims submitted within 24 hours. Denials followed up within 48 hours. Payments tracked in real-time.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors border border-gray-700">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '10+', label: 'Years in Business' },
              { num: '500+', label: 'Practices Served' },
              { num: '95%+', label: 'Clean Claim Rate' },
              { num: '$50M+', label: 'Revenue Collected' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-pink2 mb-2">{stat.num}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Meet Our Leadership
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💼</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">Jasmel Acosta</h3>
              <p className="text-pink2 font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">Leading MBMB's mission to help Miami healthcare providers maximize revenue and reduce billing stress. AAPC-certified with expertise in Florida Medicaid and Medicare billing.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍💻</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">MBMB Team</h3>
              <p className="text-pink2 font-medium mb-3">Certified Billing Specialists</p>
              <p className="text-gray-600 text-sm">Our team of AAPC-certified coders and billing specialists brings decades of combined experience across primary care, specialty practices, and surgical centers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-pink2 to-myblack text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Optimize Your Revenue?</h2>
          <p className="text-lg text-white/80 mb-8">
            Schedule a free billing audit and discover how much revenue your practice is leaving on the table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/consultation" text="Free Billing Audit" colors="bg-white text-pink2 hover:bg-gray-100 text-lg px-8 py-4" />
            <a href="tel:+1-786-643-2099" className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-pink2 font-bold text-lg px-8 py-4 rounded-md transition-colors">
              📞 (786) 643-2099
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}