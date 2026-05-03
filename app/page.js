'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Subscribe from "@UTILS/subscribe";
import LinkToAIMS from "@UTILS/linkToAAMS";
import VideoShowcase from "@UTILS/videos";
import Button from "@UTILS/button";
import LinkToAIDynamic from "@UTILS/linkToAIDynamic";
import Head from "next/head";
import SmartImage from "./components/SmartImage";
import SplashScreen from "./components/SplashScreen";
import RotatingLogo3D from "./components/RotatingLogo3D";
import DarkHeroBackground from "./components/DarkHeroBackground";
import UnifiedReceptionist from "./components/UnifiedReceptionist";

const faqs = [
  {
    question: "What medical billing services do you offer?",
    answer: "We provide comprehensive medical billing, coding, revenue cycle management, and credentialing for healthcare practices across Florida. Services include claim submission, denial management, patient billing, and insurance verification."
  },
  {
    question: "Why should I outsource my medical billing to MBMB?",
    answer: "Outsourcing reduces administrative burden, minimizes claim denials, ensures compliance with latest coding standards, and maximizes revenue. We specialize in Florida's healthcare market and local payer requirements."
  },
  {
    question: "How long does provider credentialing take?",
    answer: "Typically 60-120 days depending on the insurance network. We expedite by ensuring all applications are accurate from day one, handling CAQH, EDI, ERA, and EFT setup."
  },
  {
    question: "Do you offer free consultations?",
    answer: "Yes — we offer a free initial billing audit to identify revenue leaks, analyze denial patterns, and propose strategies to improve collections. Schedule via phone, email, or our online form."
  },
  {
    question: "What is your pricing structure?",
    answer: "5.6% to 10% of collected revenue — we only get paid when you get paid. No setup fees, no hidden costs, no monthly retainers. The exact percentage depends on practice size, volume, and complexity."
  },
  {
    question: "How do you handle claim denials?",
    answer: "We proactively manage denials with dedicated follow-up. We analyze patterns, appeal when necessary, and implement corrective measures to reduce future denials."
  },
  {
    question: "Do you work with my existing EHR system?",
    answer: "Yes — we integrate with most major EHRs including Epic, Cerner, Athenahealth, eClinicalWorks, and many others. We ensure seamless data flow with minimal disruption."
  },
  {
    question: "How quickly will I receive payments?",
    answer: "Most claims are paid within 14-30 days of submission. We track every claim and follow up promptly. Florida Medicaid and Medicare typically process within 30-45 days."
  },
  {
    question: "Are you HIPAA compliant?",
    answer: "Fully HIPAA and HITECH compliant with encrypted data transmission, secure servers, and strict access controls. We sign BAAs with all clients and never share or resell patient data."
  },
  {
    question: "How do I get started?",
    answer: "Schedule a free consultation via phone, email, or our form. We'll analyze your current billing process, identify opportunities, and create a custom plan. Onboarding takes 1-2 weeks with minimal disruption."
  },
  {
    question: "What makes MBMB different?",
    answer: "Unlike large national companies, we're locally focused on Florida healthcare. Our team has deep knowledge of state Medicaid, Medicare, and commercial payer requirements. Personalized service without corporate bureaucracy."
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

const solutions = [
  {
    label: "Medical Billing",
    description: "Expert medical billing services tailored for Miami healthcare providers. Our AAPC-certified specialists handle everything from claim submission to denial management, ensuring maximum reimbursements and faster payments for your practice.",
    href: "/consultation",
    icon: "billing"
  },
  {
    label: "Medical Coding",
    description: "Precision medical coding with ICD-10, CPT, and HCPCS expertise. We reduce claim denials by 95%+ and ensure compliance with Florida payer requirements and Medicare/Medicaid guidelines.",
    href: "/consultation",
    icon: "coding"
  },
  {
    label: "Credentialing",
    description: "Fast provider credentialing (60-120 days) for insurance networks. We handle CAQH, EDI, ERA, and EFT setup so you can start billing faster.",
    href: "/consultation",
    icon: "credentialing"
  }
]
const benefits = [
  {
    label: "Accurate Medical Coding:",
    description: "Our expert team ensures precise coding for maximum reimbursement, minimizing errors and denials."
  },
  {
    label: "Efficient Revenue Management:",
    description: "Streamline your revenue cycle with our comprehensive services, optimizing cash flow and financial performance."
  },
  {
    label: "Timely Reminders: ",
    description: "Send polite balance reminder calls to patients after the statement cycle, helping them stay informed about their outstanding balances."
  }
]
const pair1 = {
  src: "/raster/Time-Saving-Medical-Billing-Solutions.webp",
  alt: "Time-Saving Medical Billing Solutions",
  h2: "Time-Saving Medical Billing Solutions",
  p: "Experience unparalleled efficiency with our time-saving medical billing solutions. Our advanced technology and streamlined processes minimize administrative burdens, allowing you to reclaim valuable time for patient care and practice growth. From automated coding to seamless claim submission and follow-up, our services are designed to optimize workflow and maximize productivity.",
  actions: {
    label: "Try Now",
    href: '/consultation'
  }
}
const pair2 = {
  src: "/raster/healthcare-revenue-cycle-management-companies.webp",
  alt: "healthcare-revenue-cycle-management-companies",
  h2: "Credentialing",
  ul: [
    "Attestation due for private insurers",
    "Demographic changes including address",
    "CAQH Enrollment and Maintenance",
    "Electronic Data Interchange (EDI)",
    "Electronic Remittance Advice (ERA)",
    "Electronic Funds Transfer (EFT)"
  ],
  actions: {
    label: "Consult Now",
    href: '/consultation'
  }
}
const joinUs = {
  src: "/raster/mbmb-consultation-new.jpg",
  alt: "Medical Billing Consultation - Schedule Your Free Audit Today",
  h2: "Schedule Your Free Audit",
  p: "Our solutions streamline healthcare revenue management. We handle billing, coding, and collections so you can focus on patient care. No obligation — see how much revenue you're recovering.",
  actions: {
    label: "Free Audit",
    href: '/consultation'
  }
}
const paragraphContent = [
  "In today's fast-paced healthcare environment, minimizing administrative tasks is essential for maximizing productivity and ensuring quality patient care.",
  "Our comprehensive suite of services is designed to streamline administrative processes for doctors and clinic administrators, freeing up valuable time and resources.",
  "By leveraging our expertise in medical billing, coding, and revenue management, you can eliminate the hassle of paperwork and administrative complexities. With our efficient solutions, you'll experience a significant reduction in administrative burden, allowing you to focus on providing the best possible healthcare experience for your patients."
];
const practices = {
  label: "Practices",
  description: "understands the unique demands of different medical specialties. Our approach is highly adaptable, ensuring that we meet the specific needs of your practice, regardless of your medical field. From primary care to specialized areas such as cardiology, radiology, and more, our services are tailored to your specialties. We're committed to delivering customized solutions that align with the nature of your practice, ensuring your financial success in your chosen field of healthcare.",
  ul: [
    'Primary care',
    'Family medicine',
    'Internal medicine',
    'Pediatrics',
    'OB/GYN',
    'General surgery',
    'Orthopedics',
    'Dermatology',
    'Psychiatry',
    'Cardiology',
    'Oncology',
    'Ophthalmology',
    'Radiology',
    'Urology',
    'Endocrinology',
    'Urgent care'
  ]
}
const links = [
  [{
    href: "/consultation",
    label: "Get Consultation"
  },
  {
    href: "/consultation",
    label: "Medical Coding"
  },
  {
    href: "/consultation",
    label: "Medical Billing"
  }],
  [
    {
      href: "/billing-details",
      label: "Billing Form"
    },
    {
      href: "/agreement-sign-up",
      label: "Agreement Sign-up"
    },
    {
      href: "/privacy-policy",
      label: "Privacy Policy"
    },
    {
      href: "/terms-of-use",
      label: "Terms of Use"
    }
  ]
]
  const social = [
  {
    href: "https://api.whatsapp.com/send?phone=17866432099",
    icon: "whatsapp"
  },
  {
    href: "https://www.instagram.com/medicalbillingmiamibeach",
    icon: "instagram"
  }
]
const contact = [
  {
    href: "https://api.whatsapp.com/send?phone=17866432099",
    icon: "whatsapp-white",
    label: "WhatsApp"
  },
  {
    href: "mailto:Jasmel@medicalbillingmb.com",
    icon: "email",
    label: "Email"
  },
  {
    href: "tel://+1-786-643-2099",
    icon: "phone",
    label: "Phone"
  }
]
const coding = {
  label: "Medical Coding",
  description: "Ensure accurate coding for your practice with our team of certified Medical Billing and Coding Specialists, Billing Consultants, and Coding Specialists. Our team has expertise in all specialties and adheres to industry guidelines and standards to meet your medical coding needs. We offer medical coding outsourcing services and provide support for doctor credential services, hospital billing, dispute medical resolution services, and insurance billing consultancy. Trust us to optimize your revenue cycle management and ensure that you receive the reimbursement you deserve.",
  ul: [
    { label: "ICD-10 Coding", sublabel: "Diagnosis Codes", icon: "medical-coding-icd" },
    { label: "CPT/HCPCS Coding", sublabel: "Procedure Codes", icon: "medical-coding-cpt-hcpcs" },
    { label: "Modifiers", sublabel: "Code Enhancements", icon: "medical-coding-modifiers" }
  ]
}

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(index < 2); // First 2 FAQs open by default
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-pink2 hover:shadow-lg transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center justify-between gap-4"
      >
        <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1">
          {faq.question}
        </h3>
        <span className={`text-pink2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-700 text-sm leading-relaxed pb-2">{faq.answer}</p>
      </div>
    </div>
  )
}

const ImageAndText = (props) => {
  const { className, content } = props;
  return (
    <section className={className.section} >
      <figure className={className.figure} >
        <SmartImage
          src={content.src}
          alt={content.alt}
          width={800}
          height={600}
          className={className.image}
        />
      </figure>
      <article className={className.article} >
        <h2 className={className.h2}>
          {content.h2}
        </h2>
        {content.p && <p className={className.p}>{content.p}</p>}
        {content.ul && (
          <ul className={className.ul}>
            {content.ul.map((y, j) => (
              <li key={`${j}`} className={className.li}>
              <SmartImage
                src={'/svg/arrow.svg'}
                alt={'bullet arrow'}
                width={20}
                height={14}
                className={'inline-block -rotate-45 mr-3 w-4'}
              />
                {y}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8">
          <Button href={content.actions.href} text={content.actions.label} colors={className.icon} className="mx-0" />
        </div>
      </article>
    </section>
  )
}

export default function Home() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  return (
    <main className=" ">
      {/* Splash Screen - Logo intro on first load */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center bg-black" >
        {/* Dark animated canvas background */}
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
          <DarkHeroBackground />
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* 3D Rotating Logo - Floating above content */}
        <div className="relative z-10 mb-6">
          <RotatingLogo3D size={140} />
        </div>

        <article className="w-11/12 md:max-w-3xl mx-auto px-6 py-8 text-center relative z-10" >
          <header className="" >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center font-bold drop-shadow-lg" >
              Miami's Highest Clean-Claim Rate
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-3 font-medium drop-shadow-md">
              Medical billing that maximizes revenue — period.
            </p>
          </header>
          <p className="text-gray-100 mt-6 text-sm md:text-lg max-w-2xl mx-auto text-center leading-relaxed drop-shadow-md">
            15+ years serving Florida healthcare providers. We handle the billing complexity so you can focus on patients. No setup fees. No hidden costs. We only win when you win.
          </p>
          
          {/* Centered Feature List - White text for video background */}
          <div className="flex flex-col items-center justify-center gap-2 my-8">
            <p className="text-white font-bold text-xl drop-shadow-md">✓ Serving Miami Healthcare Providers</p>
            <p className="text-white font-bold text-xl drop-shadow-md">✓ High Clean Claim Rate</p>
            <p className="text-white font-bold text-xl drop-shadow-md">✓ Revenue Optimization Focus</p>
          </div>

          {/* Trust Badges - Light style for dark bg */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            <span className="text-white/90 font-medium border border-white/30 px-4 py-1.5 rounded backdrop-blur-sm bg-white/10">AAPC</span>
            <span className="text-white/90 font-medium border border-white/30 px-4 py-1.5 rounded backdrop-blur-sm bg-white/10">HIPAA</span>
            <span className="text-white/90 font-medium border border-white/30 px-4 py-1.5 rounded backdrop-blur-sm bg-white/10">MGMA</span>
            <span className="text-white/90 font-medium border border-white/30 px-4 py-1.5 rounded backdrop-blur-sm bg-white/10">FMA</span>
          </div>
          
          {/* PRIMARY CTA — ONE clear action */}
          <div className="mb-6">
            <Button href="/consultation" text='Schedule Your Free Billing Audit' colors="bg-pink-600 text-white hover:bg-pink-700 text-lg px-10 py-4 shadow-lg shadow-pink-600/30" className="w-full md:w-auto" />
          </div>
          <p className="text-gray-400 text-sm mt-2">No obligation. See how much revenue you're losing.</p>
        </article>
        
        {/* Rest of page... */}
      </section>
      {/* Consolidated Services — 3 clean cards */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Core Services</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Three pillars of revenue cycle management. Every service is designed to do one thing: get you paid faster, with fewer headaches.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-pink2 hover:shadow-xl transition text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-pink2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Medical Billing</h3>
              <p className="text-gray-600 text-sm">Claim submission, denial management, and payment posting. We handle the full cycle so nothing falls through the cracks.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Medical Coding</h3>
              <p className="text-gray-600 text-sm">ICD-10, CPT, and HCPCS coding by AAPC-certified specialists. Accurate codes mean fewer denials and maximum reimbursement.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-green-500 hover:shadow-xl transition text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Credentialing</h3>
              <p className="text-gray-600 text-sm">Provider enrollment with insurance networks. We handle CAQH, EDI, ERA, and EFT setup — typically in 60-90 days.</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button href="/consultation" text="Start Your Free Audit" colors="bg-pink2 text-white hover:bg-black text-lg px-8 py-3" />
          </div>
        </div>
      </section>

      {/* Unified Receptionist Widget — LEFT side, text + voice */}
      <UnifiedReceptionist />
      
      {/* Rest of the page unchanged structure but with semantic/visual tweaks */}
        <section className="grid lg:grid-cols-2 gap-8 md:max-w-7xl mx-auto md:px-6 py-16 lg:my-12" >
        <figure className="overflow-hidden lg:rounded-2xl mx-4 shadow-2xl" >
        <SmartImage
          className="object-cover hover:scale-105 transition-all ease-linear duration-500 h-fit md:max-h-[500px] w-full mx-auto self-center"
          src={'/raster/Medical-Billing-and-Coding-Specialists.webp'}
          width={1200}
          height={800}
          alt="Medical Billing and Coding Specialists in Miami Florida"
          loading="lazy"
        />
        </figure>
        <article className="flex flex-col justify-center py-8 lg:py-0 px-6 w-full max-w-xl mx-auto" >
          <h2 className="text-3xl lg:text-4xl text-myblack mb-2 font-bold leading-tight underline decoration-pink2" >
            Experienced Staff
          </h2>
          <h3 className="text-lg xl:text-xl font-semibold text-pink2 mb-6" >
            Medical Billing and Coding Specialists
          </h3>
          <p className="text-base xl:text-lg text-gray-700 leading-relaxed text-justify mb-8" >
            At our firm, we pride ourselves on being expert medical billing and coding specialists, dedicated to ensuring the financial success of your practice. With years of experience and a deep understanding of healthcare revenue cycle management, we offer unparalleled professionalism and expertise. Trust us to handle your medical billing and coding needs with precision and efficiency, allowing you to focus on providing excellent patient care.
          </p>
          <Button href="#practices" text="Explore Expertise" colors="bg-myblack text-white hover:bg-pink2" className="mx-0" />
        </article>
      </section>

      <ul className="grid md:grid-cols-3 w-full h-full bg-black py-16 lg:py-40 my-10 px-6 lg:px-12 gap-10" >
        {benefits.map((x, i) => {
          return (
            <li key={i} className="flex flex-col items-center text-center w-full max-w-sm mx-auto p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"  >
              <div className="circle w-12 h-12 xl:w-20 xl:h-20 mb-6 before:animate-pulse after:animate-pulse" />
              <h3 className="text-mypink font-bold text-xl lg:text-2xl mb-4" >
                {x.label}
              </h3>
              <p className="text-gray-300 text-sm xl:text-base font-serif leading-relaxed" >
                {x.description}
              </p>
            </li>
          )
        })}
      </ul>

      <ImageAndText
        content={pair1}
        className={{
          section: "text-white rounded-2xl shadow-2xl shadow-myblack/50 w-11/12 max-w-2xl lg:max-w-6xl mt-16 mb-24 mx-auto flex flex-col lg:flex-row-reverse overflow-hidden",
          figure: "overflow-hidden flex lg:w-1/2",
          image: "object-cover transition-transform duration-700 ease hover:scale-105 h-auto w-full lg:h-full lg:min-h-[400px]",
          article: "bg-black lg:w-1/2 justify-center flex flex-col py-10 px-8 lg:px-16",
          h2: "mb-6 text-center md:text-left uppercase text-2xl sm:text-3xl lg:text-4xl tracking-widest font-bold text-mypink",
          p: "text-gray-200 text-base md:text-lg leading-relaxed mb-8",
          icon: "bg-white text-pink2 hover:bg-pink2 hover:text-white",
          rect: "stroke-pink2"
        }}
      />

      <section className="background1 relative overflow-hidden lg:bg-fixed bg-no-repeat text-white w-full h-fit md:py-24 my-16 mx-auto" >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60 lg:bg-black/40 -z-10"></div>
        <Image
          className="sm:hidden absolute inset-0 w-full h-full object-cover -z-20"
          src={'/raster/medical-billing-and-medical-coding-services-healthcare-revenue-management-1.2.avif'}
          width={1280}
          height={640}
          alt="medical billing and medical coding services healthcare revenue management"
        />
        <Image
          className="hidden sm:block lg:hidden absolute inset-0 w-full h-full object-cover -z-20"
          src={'/raster/medical-billing-and-medical-coding-services-healthcare-revenue-management-2.1.avif'}
          width={1280}
          height={640}
          alt="medical billing and medical coding services healthcare revenue management"
        />
        <article className="relative py-12 md:px-8 flex flex-col items-center lg:items-start max-w-7xl mx-auto" >
          <h2 className="text-center lg:text-left uppercase font-orbitron font-bold text-3xl md:text-4xl lg:text-5xl tracking-wide max-w-2xl bg-pink2/90 px-6 py-4 rounded-t-xl shadow-2xl" >
            Reduce Administrative Burden
          </h2>
          <ul className="font-serif text-center lg:text-left text-base lg:text-lg max-w-2xl text-gray-100 bg-black/80 px-8 py-6 shadow-2xl backdrop-blur-sm">
            {paragraphContent.map((paragraph, index) => <li key={index} className="mb-4 last:mb-0 leading-relaxed" >{paragraph}</li>)}
          </ul>
          <footer className="max-w-2xl bg-myblack px-6 py-6 rounded-b-xl w-full flex justify-center lg:justify-start shadow-2xl" >
            <Link href={'/consultation'} className="text-sm block">
              <div className="text-white relative flex justify-center items-center uppercase h-12 w-48 font-bold tracking-wider transition-all ease-in-out duration-300 border-2 border-white hover:border-pink2 hover:bg-pink2 rounded-md">
                Free Audit
              </div>
            </Link>
          </footer>
        </article>
      </section>

      <ImageAndText
        content={pair2}
        className={{
          section: "text-myblack bg-white shadow-2xl shadow-pink2/20 w-11/12 xl:max-w-7xl rounded-2xl mt-16 mb-24 mx-auto flex flex-col lg:flex-row overflow-hidden border border-gray-100",
          figure: "overflow-hidden lg:w-1/2",
          image: "object-cover transition-transform duration-700 ease hover:scale-105 h-full w-full min-h-[300px]",
          article: "lg:w-1/2 justify-center flex flex-col py-10 px-8 lg:px-16",
          h2: "text-center lg:text-left uppercase text-2xl sm:text-3xl lg:text-4xl font-bold text-pink2 mb-6",
          p: "font-serif text-base tracking-wider",
          ul: "my-4 w-full",
          li: "py-3 px-2 border-b border-gray-200 last:border-b-0 flex items-center text-gray-700",
          icon: "bg-myblack text-white hover:bg-pink2",
          rect: "stroke-white"
        }}
      />

      {/* Case Studies Section */}
      <section className="max-w-6xl mx-auto w-11/12 my-20 py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-8 shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Success Stories</h2>
        <p className="text-center text-gray-600 mb-10">Real results from Miami healthcare practices</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Case Study 1 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-pink2">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Dr. Martinez</h3>
                <p className="text-gray-600 text-sm">Family Practice, Miami Beach</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">"MBMB transformed our billing process. We were losing thousands every month to denials and slow payments."</p>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-center">
              📈 Increased collections 27% in 6 months
            </div>
          </div>
          
          {/* Case Study 2 */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">👶</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Sunrise Pediatrics</h3>
                <p className="text-gray-600 text-sm">Coral Gables, Florida</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">"Our denial rate was killing us. MBMB's expert coding team turned things around completely."</p>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold text-center">
              ✅ Reduced denial rate from 18% to 3%
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Button href="/consultation" text="Get Your Free Audit" colors="bg-pink2 text-white hover:bg-black" />
        </div>
      </section>

      {/* ONE strategic CTA section — after trust is established */}
      <section className="bg-black text-white py-16 my-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Stop Losing Revenue?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Most practices leak 15-20% of revenue to billing errors, slow claims, and denied appeals. 
            Our free audit shows exactly where your money is going — and how to get it back.
          </p>
          <Button href="/consultation" text="Start Your Free Audit" colors="bg-pink2 text-white hover:bg-pink-600 text-lg px-10 py-4 shadow-lg shadow-pink2/30" />
          <p className="text-gray-500 text-sm mt-4">No obligation. Takes 15 minutes. Results in 48 hours.</p>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-900 text-white py-16 my-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Medical Billing Insights</h2>
            <p className="text-gray-400">Expert tips, compliance updates, and revenue cycle insights for Miami healthcare practices</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition">
              <div className="relative h-40">
                <Image src="/raster/Medical-Billing-and-Coding-Specialists.webp" alt="Medical Billing 101" fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-xs mb-2">April 12, 2026</p>
                <h3 className="font-bold text-lg mb-2">Medical Billing 101: Everything Miami Doctors Need to Know</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">The complete guide to medical billing for Miami doctors.</p>
                <Button href="/blog/medical-billing-101" text="Read More" colors="bg-pink2 text-white hover:bg-pink-600 text-sm px-4 py-2" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition">
              <div className="relative h-40">
                <Image src="/raster/medical-billing-and-medical-coding-services-healthcare-revenue-management-1.2.avif" alt="Denial Management Guide" fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-xs mb-2">April 14, 2026</p>
                <h3 className="font-bold text-lg mb-2">Denial Management: A Complete Guide</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">Every denied claim is lost revenue unless you have a system to fight back.</p>
                <Button href="/blog/denial-management-guide" text="Read More" colors="bg-pink2 text-white hover:bg-pink-600 text-sm px-4 py-2" />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition">
              <div className="relative h-40">
                <Image src="/raster/medical-coding-icd.webp" alt="Miami Medicaid Billing" fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-xs mb-2">April 15, 2026</p>
                <h3 className="font-bold text-lg mb-2">Florida Medicaid Billing for Miami Providers</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">Navigate Florida Medicaid billing complexities with confidence.</p>
                <Button href="/blog/miami-medicaid-billing" text="Read More" colors="bg-pink2 text-white hover:bg-pink-600 text-sm px-4 py-2" />
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button href="/blog" text="View All Blog Posts" colors="bg-white text-gray-900 hover:bg-pink2 hover:text-white" />
          </div>
        </div>
      </section>

      {/* SEO/GEO FAQ Section */}
      <section className="max-w-5xl mx-auto w-11/12 my-20 py-12 bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 shadow-xl" >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Medical Billing Services for Miami Healthcare Practices</h2>
        <p className="text-center text-gray-600 mb-10">Everything you need to know about our medical billing services in Miami and Florida</p>
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 mb-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Follow MBMB on Instagram</h2>
          <p className="text-gray-600 mb-8">@medicalbillingmiamibeach</p>
          
          {/* Instagram Profile Link */}
          <div className="flex flex-col items-center justify-center py-8 bg-gray-100 rounded-xl max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <p className="text-gray-700 font-semibold mb-2">medicalbillingmiamibeach</p>
            <a 
              href="https://www.instagram.com/medicalbillingmiamibeach" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
            >
              Follow on Instagram
            </a>
            <p className="text-sm text-gray-500 mt-4">Latest updates from @medicalbillingmiamibeach</p>
          </div>
        </div>
      </section>

      <section id="practices" className="max-w-7xl w-11/12 mx-auto my-16 py-14" >
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 font-bold underline decoration-pink2 mb-8" >
          {practices.label}
        </h1>
        <p className="font-serif text-gray-700 mb-6 text-base md:text-lg lg:text-xl max-w-5xl leading-relaxed">
          <strong className="text-pink2">Medical Billing Miami Beach </strong>
          serves 20+ specialties. From primary care to cardiology, dermatology, and mental health — our certified coders know your field's unique billing requirements.
        </p>
        <p className="text-gray-600 mb-8 text-lg">
          Primary Care • Family Medicine • Cardiology • Dermatology • Mental Health • Pediatrics • OB/GYN • Orthopedics • Surgery • Urgent Care 
          <a href="#specialties-full" className="text-pink2 hover:underline font-semibold ml-2">[+ 12 more]</a>
        </p>
        <div className="max-w-5xl">
          <Link className="font-sans cta bg-mygreen text-white hover:bg-myblack text-lg lg:text-xl h-fit w-max shadow-lg shadow-pink2/40 px-6 py-3 rounded-md flex items-center transition-all duration-300 transform hover:-translate-y-1" href="/consultation">
            <span className="font-bold">Free Billing Audit</span>
            <span className="ml-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </Link>
        </div>
      </section>

      <section className="px-6 py-16 mt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white" >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" >
              <span className="text-white">Medical Coding</span> Services
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              Expert medical coding with ICD-10, CPT, and HCPCS expertise. Our AAPC-certified coders ensure accurate documentation and maximum reimbursements.
            </p>
          </div>
          
          {/* Simple clean cards without icons - just text */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold text-lg text-white mb-1">ICD-10 Coding</h3>
              <p className="text-gray-400 text-sm">Diagnosis Codes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="font-bold text-lg text-white mb-1">CPT/HCPCS</h3>
              <p className="text-gray-400 text-sm">Procedure Codes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition">
              <div className="text-3xl mb-3">✏️</div>
              <h3 className="font-bold text-lg text-white mb-1">Modifiers</h3>
              <p className="text-gray-400 text-sm">Code Enhancements</p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-fixed bg-no-repeat bg-cover bg-center w-full h-fit min-h-[400px] mx-auto background2 border-y-8 border-pink2" />

      <ImageAndText
        content={joinUs}
        className={{
          section: "text-myblack bg-gray-50 shadow-xl w-11/12 xl:max-w-7xl rounded-2xl mt-24 mb-32 mx-auto flex flex-col md:flex-row overflow-hidden",
          figure: "overflow-hidden md:w-1/2",
          image: "object-cover transition-transform duration-700 ease h-full w-full hover:scale-105 min-h-[300px]",
          article: "md:w-1/2 justify-center flex flex-col py-10 px-8 lg:px-16",
          h2: "mb-6 text-center lg:text-left uppercase text-2xl sm:text-3xl lg:text-4xl font-bold text-pink2",
          p: "text-gray-700 text-base md:text-lg leading-relaxed mb-8",
          icon: "bg-black text-white hover:bg-pink2",
          rect: "stroke-transparent"
        }}
      />
      
      {/* Services & Partners Section */}
      <section className="w-11/12 max-w-6xl mx-auto mb-24">
        <h2 className="border-b-4 border-pink2 pb-2 text-2xl font-bold text-gray-900 uppercase tracking-wider mb-8 text-center">
          Our Services & Partners
        </h2>
        
        {/* Partner Links - Professional Minimalist Design */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <Link href="https://aimedicalscriber.com/" target="_blank" className="group">
            <div className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-blue-500">
              <div className="text-white text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-base mb-1">AI Medical Scriber</h3>
                <p className="text-xs text-gray-400">Voice-to-SOAM notes</p>
              </div>
            </div>
          </Link>
          
          <Link href="https://aidynamics.art/" target="_blank" className="group">
            <div className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-purple-500">
              <div className="text-white text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-base mb-1">AI Dynamics</h3>
                <p className="text-xs text-gray-400">EHR & Billing Software</p>
              </div>
            </div>
          </Link>

          <Link href="https://new-law-helper-app.vercel.app/" target="_blank" className="group">
            <div className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-amber-500">
              <div className="text-white text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="font-bold text-base mb-1">AI Law Helper</h3>
                <p className="text-xs text-gray-400">Attorney Services</p>
              </div>
            </div>
          </Link>
          
          <Link href="/consultation" className="group">
            <div className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-700 hover:border-pink-500">
              <div className="text-white text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-pink-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-base mb-1">Free Billing Audit</h3>
                <p className="text-xs text-gray-400">See what you're losing</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Minimalist AI Banners - Two clean cards */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <Link href="https://aimedicalscriber.com/" target="_blank" className="group">
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-gray-800 text-center">
                <h3 className="font-bold text-lg mb-1">AI Medical Scriber</h3>
                <p className="text-sm text-gray-600">Minimal, secure AI note-taking</p>
                <span className="inline-block mt-2 text-sm font-medium text-blue-600 group-hover:text-blue-800">Learn More →</span>
              </div>
            </div>
          </Link>
          
          <Link href="https://aidynamics.art/" target="_blank" className="group">
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-gray-800 text-center">
                <h3 className="font-bold text-lg mb-1">AI Dynamics</h3>
                <p className="text-sm text-gray-600">EHR & Medical Billing Software</p>
                <span className="inline-block mt-2 text-sm font-medium text-purple-600 group-hover:text-purple-800">Demo →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Floating WhatsApp — REMOVED due to PHI conflict. Use phone/email only. */}
      
    </main>
  );
}
