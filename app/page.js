'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Subscribe from "@UTILS/subscribe";
import Button from "@UTILS/button";
import SmartImage from "./components/SmartImage";
import RotatingLogo3D from "./components/RotatingLogo3D";
import CPTICD10HeroBackground from "./components/CPTICD10HeroBackground";
import RevenueCalculator from "./components/revenue-calculator.jsx";
import LeadMagnetPopup from "./components/lead-magnet-popup.jsx";
import GoogleCalendarBooking from "./components/GoogleCalendarBooking";
import ScrollReveal from "./components/ScrollReveal";
import AIFeatureCards from "./components/AIFeatureCards";
import AIProcessFlow from "./components/AIProcessFlow";

const faqs = [
  {
    question: "What medical billing services do you offer?",
    answer: "We provide comprehensive medical billing, coding, revenue cycle management, and provider credentialing for healthcare practices across Miami and South Florida. Services include claim scrubbing & submission, denial management, patient billing, and real-time insurance verification."
  },
  {
    question: "Why should I outsource my medical billing to MBMB?",
    answer: "Outsourcing reduces administrative overhead, cuts claim denials from the 15%+ industry average down to 2%, ensures compliance with 2026 coding standards, and increases net collections by 15–30%. We specialize in Florida's healthcare market and local payer rules."
  },
  {
    question: "What is your pricing structure?",
    answer: "5.6% to 10% of collected revenue — we only get paid when you get paid. No setup fees, no hidden costs, and no monthly retainers. The exact percentage depends on your practice specialty, claim volume, and service tier."
  },
  {
    question: "How long does provider credentialing take in Florida?",
    answer: "Typically 60–120 days depending on the insurance network. We expedite enrollment by ensuring all applications are 100% accurate from day one, handling CAQH ProView, EDI, ERA, and EFT setup for Florida Blue, Simply, Sunshine Health, Medicare, and Medicaid."
  },
  {
    question: "Do you offer a free billing audit?",
    answer: "Yes — we offer a free 48-hour billing and coding audit to identify revenue leaks, analyze denial patterns, and quantify how much uncollected revenue your practice can recover. Schedule via phone, calendar widget, or our online consultation form."
  },
  {
    question: "How do you handle claim denials?",
    answer: "We proactively manage denials with root-cause analysis and appeals filed within 48 hours. Our AI pre-submission scrubbing catches modifier, LCD/NCD, and POS errors before claims ever reach the payer."
  },
  {
    question: "Do you work with my existing EHR system?",
    answer: "Yes — we integrate seamlessly with all major EHR and PM systems including eClinicalWorks, Athenahealth, Epic, Cerner, Kareo/Tebra, AdvancedMD, DrChrono, and NextGen with zero disruption to your clinical workflow."
  },
  {
    question: "How quickly will my practice receive payments?",
    answer: "Most clean electronic claims are paid within 14–21 days of submission. We track every claim daily and follow up aggressively on aging AR (>30/60/90 days)."
  },
  {
    question: "Are you HIPAA compliant?",
    answer: "Yes. MBMB is 100% HIPAA and HITECH compliant with encrypted data transmission, role-based access controls, and signed Business Associate Agreements (BAAs) with every healthcare practice."
  },
  {
    question: "What makes MBMB different from national billing companies?",
    answer: "Unlike national call-center billing companies, we are locally focused on Miami-Dade, Broward, and South Florida healthcare. Our AAPC-certified team knows First Coast Service Options (FCSO) Medicare, Florida Medicaid (AHCA), and regional commercial plans inside and out—plus we offer bilingual (English/Spanish/Creole) support."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const services = [
  {
    title: "Revenue Cycle Management (RCM)",
    description: "End-to-end revenue cycle optimization from patient intake to final payment posting. We identify revenue leak points and eliminate them.",
    features: ["AI claim scrubbing & same-day submission", "ERA payment posting & reconciliation", "Aging AR recovery (>30/60/90 days)", "Custom monthly financial analytics"],
    href: "/services/revenue-cycle-management",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
  },
  {
    title: "AAPC-Certified Medical Coding",
    description: "Precision ICD-10-CM, CPT, and HCPCS coding by certified specialists ensuring maximum reimbursement and strict payer compliance.",
    features: ["ICD-10-CM diagnosis coding", "CPT & HCPCS procedure coding", "Modifier 25, 59 & 95 optimization", "Chart audits & provider documentation review"],
    href: "/services/medical-coding",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
  },
  {
    title: "Provider Credentialing & CAQH",
    description: "Get enrolled with Florida commercial, Medicare, and Medicaid networks fast. We manage every application and re-attestation.",
    features: ["Commercial & Medicare/Medicaid enrollment", "CAQH ProView profile management", "EDI, ERA & EFT banking setup", "Ongoing re-credentialing & maintenance"],
    href: "/services/credentialing",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    title: "Proactive Denial Management",
    description: "Aggressive denial follow-up with 48-hour appeal turnaround and root-cause prevention protocols.",
    features: ["Denial root-cause forensics", "Clinical appeal letter generation", "Florida payer trend tracking", "Pre-submission rejection rules"],
    href: "/services",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
  },
  {
    title: "Eligibility & Prior Authorizations",
    description: "Eliminate front-desk claim rejections with real-time patient insurance verification and prior auth tracking.",
    features: ["Real-time eligibility & co-pay checks", "Prior authorization submission & follow-up", "Florida telehealth POS 02/10 verification", "Out-of-network benefit checks"],
    href: "/services",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  },
  {
    title: "HIPAA Compliance & Practice Consulting",
    description: "Strategic operational guidance to protect your practice from audits while scaling clinical profitability.",
    features: ["HIPAA & AHCA compliance reviews", "EHR workflow optimization", "Front-desk staff billing training", "Quarterly financial business reviews"],
    href: "/consultation",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
  }
];

const caseStudies = [
  {
    practice: "Dr. Martinez — Family Practice (Miami Beach)",
    specialtyTag: "Primary Care · 4 Providers",
    problem: "High volume of claims with frequent modifier and coding errors leading to an 18% denial rate and $127K+ in annual revenue leakage.",
    solution: "Implemented AAPC-certified coding validation, real-time claim scrubbing, and aggressive AR recovery on 90+ day claims.",
    result: "Denial rate dropped from 18% to 2.4%. Net collections increased 27% (+$142,000 annualized) within 90 days.",
    metricBadge: "+27% Net Collections"
  },
  {
    practice: "Sunrise Pediatrics (Coral Gables, FL)",
    specialtyTag: "Pediatrics · Florida Medicaid & Commercial",
    problem: "High Florida Medicaid (MMA) rejections and delayed vaccine/well-visit reimbursements hurting monthly cash flow.",
    solution: "Restructured AHCA Medicaid coding templates, automated eligibility verification, and standardized modifier workflows.",
    result: "Reduced denial rate from 16% to under 3%. Average days in AR dropped from 46 days to 18 days.",
    metricBadge: "Denials Cut 16% → 3%"
  },
  {
    practice: "South Florida Cardiology & Vascular Group",
    specialtyTag: "Cardiology · Complex Procedures",
    problem: "Complex prior authorizations and diagnostic bundling errors delaying high-value procedure reimbursements.",
    solution: "Built payer-specific prior authorization rules engine and dedicated cardiology CPT coding oversight.",
    result: "Prior auth turnaround reduced from 5 days to 48 hours. Practice revenue per encounter increased 22%.",
    metricBadge: "+22% Revenue / Visit"
  }
];

const specialtiesList = [
  "Primary Care",
  "Family Medicine",
  "Internal Medicine",
  "Pediatrics",
  "Cardiology",
  "Dermatology",
  "Orthopedics & MSK",
  "Physical Therapy & Rehab",
  "OB/GYN",
  "Psychiatry & Behavioral Health",
  "Urgent Care Centers",
  "General Surgery",
  "Oncology",
  "Ophthalmology",
  "Radiology & Imaging",
  "Urology",
  "Endocrinology",
  "Pain Management"
];

const floridaPayers = [
  "Florida Blue (BCBS)",
  "Medicare (FCSO)",
  "Florida Medicaid (AHCA)",
  "Simply Healthcare",
  "Sunshine Health",
  "UnitedHealthcare",
  "Aetna",
  "Cigna",
  "Humana Florida",
  "AvMed",
  "Molina Healthcare",
  "Oscar Health"
];

const ehrSystems = [
  "eClinicalWorks",
  "Athenahealth",
  "Epic",
  "Kareo / Tebra",
  "AdvancedMD",
  "DrChrono",
  "NextGen",
  "Cerner / Oracle",
  "Practice Fusion",
  "SimplePractice"
];

const partners = [
  {
    name: "AI Medical Scriber",
    desc: "HIPAA-Compliant Voice-to-SOAP Clinical Notes",
    href: "https://aimedicalscriber.com/",
    badge: "Clinical AI"
  },
  {
    name: "AI Dynamics Pro",
    desc: "Medical Front-Desk & Workflow Automation",
    href: "https://aidynamic.pro/",
    badge: "Automation"
  },
  {
    name: "305Business",
    desc: "Miami Healthcare & B2B Partner Network",
    href: "https://305business-llc.vercel.app/",
    badge: "Miami Network"
  },
  {
    name: "AI Law Helper",
    desc: "Medical Lien, PIP & Healthcare Legal Tech",
    href: "https://new-law-helper-app.vercel.app/",
    badge: "Legal & Compliance"
  }
];

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(index < 2);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-[#0066CC] hover:shadow-md transition-all">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center justify-between gap-4"
        aria-expanded={isOpen}
      >
        <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug flex-1">
          {faq.question}
        </h3>
        <span className={`text-[#0066CC] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[82vh] flex flex-col justify-center items-center bg-[#030508] overflow-hidden py-16">
        {/* Executive Ambient Aurora & Glassmorphic Claim Cards background */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          <CPTICD10HeroBackground />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a1628] to-transparent pointer-events-none" style={{ zIndex: 1 }} />
        </div>

        {/* 3D Rotating Logo */}
        <div className="relative z-10 mb-4">
          <RotatingLogo3D size={125} />
        </div>

        <article className="w-11/12 max-w-4xl mx-auto px-4 sm:px-6 py-4 text-center relative z-10">
          <ScrollReveal direction="up" distance={20} duration={500}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00A8E8]/40 bg-[#00A8E8]/10 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00A8E8] animate-pulse" />
              <span className="text-[#00A8E8] text-xs sm:text-sm font-bold tracking-wide uppercase">
                Miami-Dade &amp; South Florida Revenue Cycle Specialists
              </span>
            </div>
          </ScrollReveal>

          <header>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center font-extrabold drop-shadow-lg leading-tight">
              Medical Billing Miami Beach
              <span className="block text-[#00A8E8] text-2xl sm:text-3xl md:text-4xl mt-3 font-bold">
                98% Clean-Claim Rate · Recover 15–30% More Practice Revenue
              </span>
            </h1>
          </header>

          <p className="text-slate-200 mt-6 text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed">
            The average South Florida medical practice loses <strong className="text-white">$127,000+ per year</strong> to preventable coding errors, under-paid claims, and unappealed denials. Our AAPC-certified specialists handle your entire billing lifecycle—you only pay when we collect.
          </p>

          {/* Key Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto my-8 text-sm font-semibold text-white">
            <div className="bg-white/10 border border-white/15 rounded-xl py-2.5 px-4 backdrop-blur-sm">
              ✓ 5.6%–10% Collection Pricing*
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl py-2.5 px-4 backdrop-blur-sm">
              ✓ Human AAPC Review + AI Double-Check
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl py-2.5 px-4 backdrop-blur-sm">
              ✓ 24–48 Hr Claim &amp; Denial Turnaround
            </div>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <Button
              href="/consultation"
              text="Request a Free Billing Consultation"
              colors="bg-[#0066CC] text-white hover:bg-[#00A8E8] text-base sm:text-lg px-8 py-4 shadow-xl shadow-[#0066CC]/40 font-bold"
              className="w-full sm:w-auto"
            />
            <a
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-lg border-2 border-white/30 text-white hover:bg-white/10 font-bold text-base transition-all"
            >
              Calculate Your Denial Loss ↓
            </a>
          </div>

          {/* Trust Credentials */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
            {['U.S. AAPC-Certified Coders', 'HIPAA-Aligned Workflows', 'Human + AI Double-Check', 'Miami Beach Account Hub', 'EN / ES / HT Support'].map((badge) => (
              <span key={badge} className="text-slate-300 font-medium border border-white/15 px-3 py-1 rounded-full bg-white/5 text-xs">
                {badge}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-4 max-w-xl mx-auto">
            *Final pricing is confirmed in a written proposal based on monthly claim volume, specialty mix, and required services.
          </p>
        </article>
      </section>

      {/* ===== WHY MBMB OPERATIONAL COMMITMENTS BAR ===== */}
      <section className="w-full py-12 bg-[#0a1628] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "5.6%–10%", label: "Collection-Based Fee", desc: "Proposal-scoped · $0 setup fee" },
              { number: "24–48 Hr", label: "Claim & Denial Triage", desc: "Clean submission & appeal workflow" },
              { number: "10+ Yrs", label: "Fulfillment Experience", desc: "U.S. AAPC-certified billing team" },
              { number: "Dual-Check", label: "Human + AI Scrubbing", desc: "Certified coders + AI rule audit" }
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100} direction="up" distance={20}>
                <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-2xl md:text-3xl font-extrabold text-[#00A8E8] mb-1">{stat.number}</div>
                  <div className="text-white font-bold text-base mb-1">{stat.label}</div>
                  <div className="text-slate-400 text-xs sm:text-sm">{stat.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TWO-AUDIENCE PATHWAY: FOR PROVIDERS & FOR ATTORNEYS ===== */}
      <section className="w-full py-16 bg-white border-b border-slate-200 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0066CC] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
              Dedicated Workflows by Audience
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3">
              Choose Your Solution Pathway
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We coordinate specialized revenue cycle operations for healthcare practices and structured medical bill organization for legal teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pathway 1: Healthcare Providers */}
            <div className="rounded-2xl bg-[#0a1628] text-white p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#00A8E8] bg-[#00A8E8]/15 border border-[#00A8E8]/30 px-3 py-1 rounded-full mb-4">
                  For Healthcare Providers &amp; Clinics
                </span>
                <h3 className="text-2xl font-bold mb-3">
                  End-to-End Revenue Cycle Management &amp; Coding
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Full-service medical billing, AAPC-certified coding with AI pre-submission double-check, provider credentialing, and proactive denial recovery—scoped at 5.6%–10% of collections.
                </p>
                <ul className="space-y-2 text-sm text-slate-200 mb-8">
                  <li>✓ Daily claim scrubbing, EDI submission &amp; ERA posting</li>
                  <li>✓ 48-hour denial root-cause analysis &amp; appeals</li>
                  <li>✓ CAQH, Medicare, Florida Medicaid &amp; commercial credentialing</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/for-providers"
                  className="inline-flex items-center justify-center bg-[#0066CC] hover:bg-[#00A8E8] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition"
                >
                  Explore Provider Services →
                </Link>
                <Link
                  href="/how-we-work"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition"
                >
                  How We Work
                </Link>
              </div>
            </div>

            {/* Pathway 2: Attorneys & Legal Teams */}
            <div className="rounded-2xl bg-slate-900 text-white p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-pink bg-pink/15 border border-pink/30 px-3 py-1 rounded-full mb-4">
                  For Personal Injury &amp; Medical-Legal Teams
                </span>
                <h3 className="text-2xl font-bold mb-3">
                  Medical Billing Clarity for Your Legal Team
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  We organize fragmented provider bills, EOBs, and payment records into clean chronologies, plain-English code explanations, and charge-to-balance tables—so attorneys and paralegals can review medical special damages faster.
                </p>
                <ul className="space-y-2 text-sm text-slate-200 mb-8">
                  <li>✓ Source-linked medical billing chronology &amp; duplicate flagging</li>
                  <li>✓ Plain-English CPT, ICD-10 &amp; HCPCS code explanations</li>
                  <li>✓ Charge, adjustment, payment &amp; open-balance reconciliation</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/for-attorneys"
                  className="inline-flex items-center justify-center bg-pink hover:bg-pink/90 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition"
                >
                  Explore Attorney Pilot Workflow →
                </Link>
                <Link
                  href="/for-attorneys#pilot-form"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition"
                >
                  Request Sample Deliverable
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INLINE INTERACTIVE ROI & DENIAL CALCULATOR ===== */}
      <section className="w-full py-20 bg-slate-50 px-4">
        <RevenueCalculator inline={true} />
      </section>

      {/* ===== COMPLETE BILLING SERVICES (SINGLE UNIFIED SECTION) ===== */}
      <section id="services" className="w-full py-20 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00A8E8] bg-white/10 px-3 py-1 rounded-full mb-3">
                Full-Cycle Healthcare Revenue Management
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Complete Medical Billing, Coding &amp; Credentialing Services
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-base">
                Everything your Miami practice needs to eliminate denials, accelerate reimbursements, and stay 100% compliant.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 100} direction="up" distance={30}>
                <div className="group bg-[#11223d] border border-white/10 rounded-2xl p-7 hover:border-[#00A8E8]/50 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#0066CC]/20 border border-[#00A8E8]/30 flex items-center justify-center mb-5 group-hover:bg-[#0066CC] transition-colors">
                      <svg className="w-6 h-6 text-[#00A8E8] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={service.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-slate-300 text-sm mb-5 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2.5 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-200">
                          <svg className="w-4 h-4 text-[#00A8E8] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-sm font-bold text-[#00A8E8] hover:text-white transition-colors"
                  >
                    Explore {service.title.split(' ')[0]} →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              href="/consultation"
              text="Request Your Custom Practice Proposal"
              colors="bg-[#0066CC] text-white hover:bg-[#00A8E8] text-base font-bold px-8 py-3.5"
            />
          </div>
        </div>
      </section>

      {/* ===== AI FEATURE CARDS & AUTOMATED PIPELINE ===== */}
      <AIFeatureCards />
      <AIProcessFlow />

      {/* ===== FLORIDA PAYERS, EHR INTEGRATIONS & SPECIALTIES (LOCAL SEO HUB) ===== */}
      <section id="practices" className="w-full py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal direction="up" distance={20}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0066CC] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
                Built for South Florida Healthcare
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                18+ Medical Specialties · All Florida Payers · Seamless EHR Integration
              </h2>
              <p className="text-slate-600 text-base">
                Serving private practices, specialty clinics, physical therapy centers, and multi-provider groups across Miami Beach, Coral Gables, Brickell, Doral, Hialeah, Kendall, Aventura, and Broward County.
              </p>
            </div>
          </ScrollReveal>

          {/* 18 Specialties Full Visible Grid (Replaces broken #specialties-full link) */}
          <div id="specialties-full" className="mb-14">
            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center uppercase tracking-wider">
              Medical Specialties We Serve
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {specialtiesList.map((spec) => (
                <div
                  key={spec}
                  className="bg-slate-50 border border-slate-200 hover:border-[#0066CC] rounded-xl px-3.5 py-3 text-center text-xs sm:text-sm font-semibold text-slate-800 transition-colors"
                >
                  {spec}
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column Payers & EHR Compatibility */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 text-white rounded-2xl p-7 border border-slate-800">
              <h3 className="text-xl font-bold text-[#00A8E8] mb-2">
                Florida Insurance Payer Expertise
              </h3>
              <p className="text-slate-300 text-sm mb-5">
                Deep familiarity with regional commercial plans, Medicare MAC (First Coast Service Options), and Florida Medicaid Managed Medical Assistance (MMA) plans:
              </p>
              <div className="flex flex-wrap gap-2">
                {floridaPayers.map((payer) => (
                  <span
                    key={payer}
                    className="bg-white/10 border border-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                  >
                    ✓ {payer}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-blue-50/70 rounded-2xl p-7 border border-blue-200">
              <h3 className="text-xl font-bold text-[#1A3A5F] mb-2">
                Plug-and-Play EHR &amp; PM Integration
              </h3>
              <p className="text-slate-600 text-sm mb-5">
                No need to switch your software. Our billing team connects directly into your existing Electronic Health Record system within 5–7 business days:
              </p>
              <div className="flex flex-wrap gap-2">
                {ehrSystems.map((ehr) => (
                  <span
                    key={ehr}
                    className="bg-white border border-blue-200 text-[#1A3A5F] text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs"
                  >
                    ⚡ {ehr}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ILLUSTRATIVE PRACTICE SCENARIOS ===== */}
      <section className="w-full py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal direction="up" distance={30}>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0066CC] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
                Illustrative Practice Scenarios
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                How Clean-Claim Scrubbing &amp; Denial Recovery Transform Cash Flow
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Representative specialty billing scenarios illustrating how our human coding review and AI double-check address high denial rates and slow AR cycles.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {caseStudies.map((case_, i) => (
              <ScrollReveal key={case_.practice} delay={i * 120} direction="up" distance={30}>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-200 border-l-4 border-l-[#0066CC]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0066CC]">
                        {case_.specialtyTag} · Illustrative Scenario
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mt-0.5">{case_.practice}</h3>
                    </div>
                    <span className="inline-block self-start md:self-auto bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 rounded-full text-sm font-extrabold">
                      {case_.metricBadge}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1.5">The Challenge</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{case_.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1.5">MBMB Workflow Intervention</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{case_.solution}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1.5">Target Workflow Outcome</p>
                      <p className="text-slate-900 font-semibold text-sm leading-relaxed">{case_.result}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <p className="text-xs text-slate-500 text-center mt-6 max-w-3xl mx-auto italic">
            Note: The scenarios above are illustrative examples of revenue cycle interventions and are not a guarantee of specific financial outcomes. Actual collections depend on specialty, payer mix, clinical documentation, and claim volume.
          </p>

          <div className="text-center mt-8">
            <Button
              href="/consultation"
              text="Request a Custom Practice Assessment"
              colors="bg-[#0066CC] text-white hover:bg-[#1A3A5F] text-base font-bold px-8 py-3.5"
            />
          </div>
        </div>
      </section>

      {/* ===== 2026 FLORIDA TELEHEALTH & CREDENTIALING SPOTLIGHT ===== */}
      <section className="max-w-7xl w-11/12 mx-auto my-20 grid lg:grid-cols-2 gap-10 items-center bg-[#0a1628] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <div className="p-8 md:p-12 lg:p-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00A8E8] bg-white/10 px-3 py-1 rounded-full mb-4">
            2026 Florida Regulatory Compliance
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            Fast-Track Provider Credentialing &amp; 2026 Telehealth Billing
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Whether you are adding a new physician, opening a new clinic in Miami-Dade, or billing telehealth encounters under updated Florida POS 02/10 and Modifier 95 rules, our credentialing team handles all payer paperwork from day one.
          </p>
          <ul className="space-y-2.5 text-sm text-slate-200 mb-8">
            <li className="flex items-center gap-2.5">
              <span className="text-[#00A8E8] font-bold">✓</span> CAQH ProView Enrollment &amp; Quarterly Re-Attestation
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-[#00A8E8] font-bold">✓</span> EDI, ERA &amp; EFT Direct Deposit Setup Across All Payers
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-[#00A8E8] font-bold">✓</span> 2026 Florida Telehealth POS Code 02/10 &amp; Modifier 95 Auditing
            </li>
            <li className="flex items-center gap-2.5">
              <span className="text-[#00A8E8] font-bold">✓</span> Commercial, Medicare (FCSO) &amp; Florida Medicaid Enrollment
            </li>
          </ul>
          <Button
            href="/services/credentialing"
            text="Explore Credentialing Services"
            colors="bg-[#0066CC] text-white hover:bg-[#00A8E8] font-bold px-7 py-3"
          />
        </div>
        <div className="relative h-full min-h-[340px] w-full">
          <SmartImage
            src="/raster/healthcare-revenue-cycle-management-companies.webp"
            alt="Provider Credentialing and Revenue Cycle Management in Miami Florida"
            width={800}
            height={600}
            className="object-cover w-full h-full min-h-[340px]"
          />
        </div>
      </section>

      {/* ===== BLOG INSIGHTS SECTION ===== */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <ScrollReveal direction="up" distance={20}>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#00A8E8] bg-white/10 px-3 py-1 rounded-full mb-3">
                Florida Billing Guides
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Medical Billing Insights</h2>
              <p className="text-slate-400">Expert compliance updates and revenue cycle strategies for Miami healthcare practices</p>
            </ScrollReveal>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ScrollReveal delay={0} direction="up" distance={30}>
              <div className="bg-slate-800/90 border border-white/10 rounded-2xl overflow-hidden hover:border-[#00A8E8]/50 transition h-full flex flex-col">
                <div className="relative h-44">
                  <Image src="/raster/Medical-Billing-and-Coding-Specialists.webp" alt="Medical Billing 101 Guide for Miami Doctors" fill className="object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[#00A8E8] text-xs font-semibold mb-2">Practice Guide · April 2026</p>
                    <h3 className="font-bold text-lg mb-2">Medical Billing 101: Everything Miami Doctors Need to Know</h3>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">The complete guide to medical billing, clean claims, and outsourcing for Miami doctors.</p>
                  </div>
                  <Button href="/blog/medical-billing-101" text="Read Guide" colors="bg-[#0066CC] text-white hover:bg-[#00A8E8] text-sm px-4 py-2" />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150} direction="up" distance={30}>
              <div className="bg-slate-800/90 border border-white/10 rounded-2xl overflow-hidden hover:border-[#00A8E8]/50 transition h-full flex flex-col">
                <div className="relative h-44">
                  <Image src="/raster/medical-billing-and-medical-coding-services-healthcare-revenue-management-1.2.avif" alt="Denial Management Guide for Florida Practices" fill className="object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[#00A8E8] text-xs font-semibold mb-2">Denial Prevention · April 2026</p>
                    <h3 className="font-bold text-lg mb-2">Denial Management: A Complete Guide for Miami Practices</h3>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">Every denied claim is lost revenue unless you have a 48-hour system to fight back.</p>
                  </div>
                  <Button href="/blog/denial-management-guide" text="Read Guide" colors="bg-[#0066CC] text-white hover:bg-[#00A8E8] text-sm px-4 py-2" />
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300} direction="up" distance={30}>
              <div className="bg-slate-800/90 border border-white/10 rounded-2xl overflow-hidden hover:border-[#00A8E8]/50 transition h-full flex flex-col">
                <div className="relative h-44">
                  <Image src="/raster/medical-coding-icd.webp" alt="Florida Medicaid Billing for Miami Healthcare Providers" fill className="object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[#00A8E8] text-xs font-semibold mb-2">Florida Medicaid · April 2026</p>
                    <h3 className="font-bold text-lg mb-2">Florida Medicaid Billing for Miami Providers</h3>
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">Navigate Florida AHCA Medicaid billing complexities and MMA plans with confidence.</p>
                  </div>
                  <Button href="/blog/miami-medicaid-billing" text="Read Guide" colors="bg-[#0066CC] text-white hover:bg-[#00A8E8] text-sm px-4 py-2" />
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="text-center mt-10">
            <Button href="/blog" text="View All 4 Florida Billing Guides" colors="bg-white text-slate-900 hover:bg-[#00A8E8] hover:text-white font-bold px-6 py-3" />
          </div>
        </div>
      </section>

      {/* ===== SEO / GEO FAQ SECTION ===== */}
      <section className="max-w-5xl mx-auto w-11/12 my-20 py-12 bg-slate-50 rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
        <ScrollReveal direction="up" distance={20}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-slate-600 mb-10">
            Transparent answers on pricing, EHR integration, credentialing timelines, and HIPAA security
          </p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-5">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} delay={index * 40} direction="up" distance={20}>
              <FAQItem faq={faq} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== STRATEGIC CONVERSION CTA BANNER ===== */}
      <section className="bg-gradient-to-r from-[#0a1628] via-[#1A3A5F] to-[#0066CC] text-white py-16 my-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal direction="up" distance={30}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Stop Losing 15–20% of Your Practice Revenue?
            </h2>
            <p className="text-slate-200 text-lg mb-8 max-w-2xl mx-auto">
              Our free 48-hour billing audit reveals your exact denial triggers, under-coded CPTs, and recoverable AR—with zero obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/consultation"
                text="Schedule Your Free Billing Audit"
                colors="bg-white text-[#0a1628] hover:bg-[#00A8E8] hover:text-white text-lg font-bold px-8 py-4 shadow-xl"
              />
              <a
                href="tel:+17866432099"
                className="inline-flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-lg font-bold border-2 border-white text-white hover:bg-white/10 transition-colors"
              >
                📞 Call (786) 643-2099
              </a>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm mt-4">
              No setup fees · Signed HIPAA BAA · Onboarding in 5–7 business days
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== HEALTHCARE TECHNOLOGY ECOSYSTEM PARTNERS (SINGLE CLEAN GRID) ===== */}
      <section className="w-11/12 max-w-6xl mx-auto my-16 pb-8">
        <ScrollReveal direction="up" distance={20}>
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">
              Our Healthcare &amp; AI Technology Ecosystem
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Integrated clinical documentation, front-desk automation, and compliance partners in South Florida
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <Link key={partner.name} href={partner.href} target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-slate-50 border border-slate-200 hover:border-[#0066CC] rounded-xl p-5 hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0066CC] bg-blue-50 px-2.5 py-0.5 rounded-full mb-2">
                    {partner.badge}
                  </span>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-[#0066CC] transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{partner.desc}</p>
                </div>
                <span className="inline-block mt-3 text-xs font-bold text-[#0066CC]">
                  Explore Partner →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FLOATING WIDGETS ===== */}
      {/* Right: Direct Google Calendar Audit Booking */}
      <GoogleCalendarBooking />

      {/* Delayed 25s Florida Compliance Checklist Offer */}
      <LeadMagnetPopup />
    </div>
  );
}
