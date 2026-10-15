/**
 * Centralized Business-Facts & Evidence Register Configuration
 * Single source of truth for Medical Billing Miami Beach (MBMB)
 * Last Reviewed: October 15, 2026
 */

export const BUSINESS_FACTS = {
  companyName: 'Medical Billing Miami Beach',
  brandName: 'Medical Billing Miami Beach',
  shortName: 'MBMB',
  legalNotice:
    'Medical Billing Miami Beach (MBMB) provides administrative medical billing, coding, credentialing coordination, and non-clinical medical bill organization services. MBMB does not provide legal advice, expert witness testimony, or clinical medical necessity determinations.',
  contact: {
    phoneDisplay: '(786) 643-2099',
    phoneTel: '+17866432099',
    phoneHref: 'tel:+17866432099',
    phoneE164: '+1-786-643-2099',
    whatsappHref: 'https://api.whatsapp.com/send?phone=17866432099',
    email: 'Jasmel@medicalbillingmb.com',
    location: 'Miami Beach, FL 33139',
    serviceArea:
      'Miami Beach, Miami, Coral Gables, Brickell, Doral, Hialeah, Miami-Dade County, Broward County, Palm Beach County, and Statewide Florida',
    hoursDisplay: 'Mon–Fri: 9:00 AM – 6:00 PM EST',
    timezoneDisplay: 'Times shown in Eastern Time (America/New_York, EST/EDT)',
  },
  hours: {
    display: 'Mon–Fri: 9:00 AM – 6:00 PM EST (America/New_York)',
  },
  address: {
    fullDisplay: 'Miami Beach, FL 33139',
    locality: 'Miami Beach',
    region: 'FL',
    postalCode: '33139',
    country: 'US',
  },
  compliance: {
    phiWarningShort:
      'Please do not include patient names, dates of birth, Social Security numbers, insurance member IDs, or other Protected Health Information (PHI) in public website forms or chat.',
  },
  socialAndProfiles: {
    instagram: 'https://www.instagram.com/medicalbillingmiamibeach',
    whatsapp: 'https://api.whatsapp.com/send?phone=17866432099',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/medicalbillingmiamibeach',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/medical-billing-miami-beach',
    googleBusinessProfile:
      process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL || 'https://www.google.com/maps/search/?api=1&query=Medical+Billing+Miami+Beach+FL+33139',
  },
  socialAndDirectories: {
    instagram: 'https://www.instagram.com/medicalbillingmiamibeach',
    whatsapp: 'https://api.whatsapp.com/send?phone=17866432099',
    facebookPage: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/medicalbillingmiamibeach',
    linkedInCompany: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/medical-billing-miami-beach',
    googleBusinessProfile:
      process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL || 'https://www.google.com/maps/search/?api=1&query=Medical+Billing+Miami+Beach+FL+33139',
  },
  pricing: {
    headlineRange: '5.6%–10% of Net Collections',
    rcmRangeDisplay: '5.6%–10%',
    setupFee: '$0 Setup Fee',
    tiers: [
      {
        tier: 'Tier 1 — High-Volume Practices',
        name: 'High-Volume & Multi-Provider Groups',
        monthlyVolume: '$50,000+ / month in collections',
        volume: '$50,000+ Monthly Collections',
        rate: '5.6%–6.5%',
        basis: 'of net collections · $0 setup fee',
        bestFor: 'Established multi-provider clinics and high-volume specialty practices seeking dedicated account coordination and daily ERA reconciliation.',
        numericRate: 5.6,
        included: [
          'Human AAPC-certified coding review + AI claim scrubbing double-check',
          'Same-day electronic claim submission (EDI) & ERA/EFT posting',
          'Proactive denial root-cause analysis & 48-hour appeal preparation',
          'Dedicated account coordinator & monthly executive financial reporting',
        ],
      },
      {
        tier: 'Tier 2 — Established & Growing Practices',
        name: 'Growth & Specialty Practices',
        monthlyVolume: '$20,000–$50,000 / month in collections',
        volume: '$20,000–$50,000 Monthly Collections',
        rate: '6.5%–8%',
        basis: 'of net collections · $0 setup fee',
        bestFor: 'Growing single- and multi-provider practices needing full-cycle claim scrubbing, proactive denial appeals, and payer follow-up.',
        numericRate: 7.0,
        included: [
          'Full-cycle claim submission, payment posting & secondary billing',
          'Human coding verification + AI pre-submission rule checking',
          'Denial management, appeals & aging A/R follow-up (>30/60/90 days)',
          'Monthly practice performance & payer mix analytics',
        ],
      },
      {
        tier: 'Tier 3 — New & Startup Practices',
        name: 'Starter & Launching Clinics',
        monthlyVolume: 'Under $20,000 / month or launching clinics',
        volume: 'Launching or Under $20,000 / Month',
        rate: '8%–10%',
        basis: 'of net collections · $0 setup fee',
        bestFor: 'New practices, solo clinicians, or telehealth startups building clean billing workflows from day one with automatic tier step-downs as volume grows.',
        numericRate: 9.0,
        included: [
          'Complete practice billing workflow setup & clearinghouse connection',
          'Claim submission, coding verification & payer follow-up',
          'Eligibility verification guidance & front-desk intake checklists',
          'Rate steps down automatically as monthly collections grow into higher tiers',
        ],
      },
    ],
    proposalDisclaimer:
      'Pricing depends on agreed services, claim volume, specialty complexity, and payer mix. $0 setup fee for standard EHR connections. Standalone credentialing or historical A/R cleanup projects may be scoped separately. Request a written proposal detailing exact fees, minimums (if any), and included services.',
    interimDisclaimer:
      'Final pricing is confirmed in a written proposal based on monthly claim volume, specialty mix, and required services. $0 setup fee for standard EHR onboarding.',
    credentialingNote:
      'We coordinate enrollment applications, CAQH ProView attestations, and payer follow-up for the networks included in your agreement. Payer review times vary (typically 60–120 days); final approval and network participation are determined solely by each insurer and are not guaranteed.',
    calculatorDisclaimer:
      'Illustrative estimate, not a guarantee. Actual recovery and fees depend on your practice’s payer mix, clinical documentation, timely filing windows, and agreed service scope.',
  },
  operatingModel: {
    summary:
      'Medical Billing Miami Beach (MBMB) serves as your accountable client relationship and coordination hub in Miami Beach, working alongside our experienced U.S.-based certified medical billing and coding fulfillment team and our AI pre-submission verification layer.',
    humanPlusAiStatement:
      'Every claim is reviewed by experienced medical billing and AAPC-certified coding professionals who read the clinical documentation and payer guidelines, then confirmed by our AI pre-submission verification check for modifiers, NCCI edits, and LCD/NCD rules.',
    aiVerificationStatement:
      'Every claim is reviewed by experienced medical billing and AAPC-certified coding professionals who read the clinical documentation and payer guidelines, then confirmed by our AI pre-submission verification check for modifiers, NCCI edits, and LCD/NCD rules.',
    credentialingDisclaimer:
      'We coordinate enrollment applications, CAQH ProView attestations, and payer follow-up for the networks included in your agreement. Payer review times vary (typically 60–120 days); payer approval and network participation are determined solely by each insurer and are not guaranteed.',
    phiWarningText:
      'Do not include patient names, dates of birth, medical records, insurance IDs, or other sensitive information in this form.',
  },
};
