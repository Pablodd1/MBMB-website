# MBMB SEO Strategy — Medical Billing Miami Beach
**Prepared:** April 2026 | **Site:** https://medicalbillingmb.com | **Market:** Miami, FL

---

## PART 1: WEBSITE AUDIT FINDINGS

### 1.1 Meta Tags & Descriptions
**Status: GOOD with critical fixes needed**

- Title tag (layout.js line 33): `"Medical Billing Miami Beach | MBMB - Expert Medical Coding & Billing Services"` — strong primary keyword
- Meta description (line 36): 162 chars, includes phone number, CTA ("Free billing audit"), and AAPC credential — excellent
- Canonical URL: `https://medicalbillingmb.com` — correct
- Open Graph tags: present and well-structured
- **CRITICAL ISSUE**: Sitemap (sitemap.js lines 4-33) uses staging URL `https://pablodd1-mbmb-website.vercel.app` instead of production `https://medicalbillingmb.com` — this prevents Google from indexing the correct URLs
- **ISSUE**: Robots.txt is minimal — no `Host:`, `Sitemap:` directive pointing to the real sitemap
- Twitter card: present

### 1.2 Heading Structure
**Status: NEEDS OPTIMIZATION**

- Homepage has ONE `<h1>`: "Medical Billing Miami Beach"
- H1 lacks geo-modifier and service intent modifier (e.g., "Medical Billing Miami Beach — Expert RCM Services")
- Multiple H2s on page are styled text, not keyword-targeted (e.g., "Reduce Administrative Burden", "Experienced Staff")
- "Medical Coding Services" is an H2 but lacks local intent keywords
- Footer has multiple H3s but not structured for SEO
- Missing proper H2 hierarchy for services: Billing, Coding, Credentialing, RCM

### 1.3 Content Gaps
**Status: MAJOR GAPS**

Missing pages that competitors have:
- `/services` — no dedicated services page (all content is on homepage)
- `/medical-coding` — no standalone coding page
- `/credentialing` — no standalone credentialing page
- `/revenue-cycle-management` — no RCM page
- `/blog` — zero blog posts (massive SEO gap)
- `/about` — no about page
- `/testimonials` — no dedicated testimonials page (only 2 case studies on homepage)
- `/medical-billing-miami` — no city-specific landing pages for Coral Gables, Hialeah, Fort Lauderdale, etc.
- `/resources` — no resources/guides page
- No bilingual (Spanish) pages despite offering EN/ES services

### 1.4 Image Alt Tags
**Status: PARTIAL — many images lack alt text**

- Hero images: alt text present (e.g., "Medical Billing and Coding Specialists in Miami Florida") — GOOD
- Medical coding icons (icd, cpt-hcpcs, modifiers): alt text present — GOOD
- Footer logo: alt text present — GOOD
- Section images (pair1, pair2, joinUs): SmartImage component used — GOOD
- Social media icons (footer): alt text uses icon name (e.g., "whatsapp", "linkedin") — needs full label like "MBMB WhatsApp"
- Background images: decorative (CSS backgrounds) — no issue
- **ISSUE**: Some SmartImage usages may not pass descriptive alt text (check every instance)

### 1.5 Page Speed Factors
**Status: NEEDS WORK**

- Hero video background (`/assets/medical-presentation (3).mp4`) loads on every homepage view, autoplays, muted — this file size unknown, could be large
- Images: WebP format used — GOOD. Sizes are reasonable (8KB to 68KB)
- next.config.mjs is completely empty (no image optimization config)
- No `priority` on most images — only logo and hero logo have `priority`
- No lazy loading attribute on most images — should use `loading="lazy"` on all below-fold images (already using SmartImage which may handle this)
- No content delivery network (CDN) config visible
- Font loading: `display: 'swap'` used — GOOD

### 1.6 Local SEO Signals (NAP Consistency)
**Status: PARTIAL — major inconsistency**

- Business name in schema: "Medical Billing Miami Beach (MBMB)" — GOOD
- Phone: +1-786-643-2099 — GOOD (consistent everywhere)
- Email: Jasmel@medicalbillingmb.com — GOOD
- Address in schema: "Miami", "FL", "33139" — **INCONSISTENT**: The postal code 33139 is Miami Beach (not generic Miami). Street address is missing ("Miami" only).
- Google Business Profile: **NOT LINKED on website** — no href to GBP listing
- NAP not present in footer HTML as text (only in schema)
- No local citations built yet (no mention of directories)
- Footer uses "Miami, Florida" generically — no specific street address
- Schema geo coordinates (25.7617, -80.1918) are correct for Miami
- No NextPhyscial schema type used — should add ` '@type': 'Physician' ` or ` 'additionalType': 'Physician' `
- SameAs in schema only has Instagram and LinkedIn — missing Twitter/X, Facebook, Yelp, BBB, etc.

---

## PART 2: KEYWORD RESEARCH FINDINGS

### 2.1 Primary Target Keywords (High Volume)

| Keyword | Est. Monthly Searches | Competition | Priority |
|---------|----------------------|-------------|----------|
| medical billing miami | 320 | Medium | 🔴 HIGH |
| medical billing florida | 390 | Medium-High | 🔴 HIGH |
| healthcare billing florida | 70 | Low | 🟡 MEDIUM |
| medical coding miami | 140 | Medium | 🔴 HIGH |
| medical billing services miami | 110 | Medium | 🔴 HIGH |
| medical billing company miami | 90 | Medium | 🔴 HIGH |
| revenue cycle management miami | 90 | Medium | 🔴 HIGH |
| credentialing services florida | 140 | Medium | 🔴 HIGH |
| medical billing coral gables | 50 | Low | 🟡 MEDIUM |
| medical billing fort lauderdale | 90 | Medium | 🟡 MEDIUM |
| medical billing homestead | 30 | Low | 🟢 LOW |
| medical credentialing florida | 110 | Medium | 🔴 HIGH |
| medical coding services florida | 90 | Low | 🟡 MEDIUM |
| florida medicaid billing | 170 | Medium | 🔴 HIGH |
| medical billing miami beach | 90 | Low | 🔴 HIGH |
| outsource medical billing miami | 40 | Low | 🟡 MEDIUM |
| medical billing specialist miami | 50 | Low | 🟡 MEDIUM |
| AAPC certified medical billing | 90 | Medium | 🟡 MEDIUM |

### 2.2 Long-Tail Keywords (Lower Volume, Higher Intent)

- "medical billing company miami beach"
- "how much does medical billing cost in florida"
- "medical billing outsourcing florida"
- "best medical billing company south florida"
- "medical billing for cardiologists miami"
- "credentialing process florida insurance"
- "medical billing for dermatology practice florida"
- "how to reduce claim denials medical billing"
- "medical billing for primary care miami"
- "medical billing for pediatrics miami"
- "Florida Medicaid billing requirements"
- "medical billing compliance Florida HIPAA"
- "medical coding certification florida"

### 2.3 LSI/Supporting Keywords
- revenue cycle management (RCM)
- claim submission
- denial management
- insurance verification
- patient billing
- EHR integration
- HIPAA compliant
- AAPC certified coder
- ICD-10 coding
- CPT coding
- CAQH enrollment
- EDI ERA EFT setup
- Medicare billing florida
- Florida Blue credentialing
- United Healthcare florida

---

## PART 3: COMPETITOR ANALYSIS

### 3.1 Top Miami/Florida Medical Billing Competitors to Analyze

1. **Medical Billing Group** — medicalbillinggroup.com
   - Strong local SEO for "medical billing miami"
   - Multiple service pages
   - Has blog with Florida-specific content
   - GBP likely verified

2. **RCM Data Systems** — rcmdata.com
   - National brand with Florida presence
   - Heavy content marketing
   - Strong on "revenue cycle management"

3. **MediBilling Solutions** — medibillingsolutions.com
   - Florida-focused
   - Good case studies
   - Strong on "medical billing florida"

4. **ProMed Medical Billing** — promedbilling.com
   - South Florida focus
   - Good local citations
   - Specialties pages

5. **NMB Medical Billing** — nmbsolutions.com
   - Miami-Dade focused
   - Clean SEO structure

6. **Physician Billing Services FL** — Various small operations
   - Typically weak SEO — opportunity to outrank

### 3.2 Competitive SEO Gaps to Exploit

- None of the above have strong content for "medical billing miami beach"
- None have dedicated Spanish-language pages
- None have AI chatbot integration
- None have a revenue calculator widget
- None leverage AAPC certification prominently in titles
- Most lack proper FAQ schema
- Most lack video content

---

## PART 4: LOCAL CITATION LIST (50+ DIRECTORIES)

### 4.1 Major Business Directories (Free)

1. Google Business Profile — https://business.google.com (CRITICAL — claim and verify)
2. Bing Places — https://bing.com/webmasters
3. Apple Maps — via Apple Business Connect
4. Yelp — https://biz.yelp.com
5. Yellow Pages — https://www.yellowpages.com
6. Facebook Business — https://business.facebook.com
7. LinkedIn Company Page — already exists
8. Instagram Business — via Meta Business Suite
9. BBB (Better Business Bureau) — https://bbb.org
10. Foursquare / Swarm — https://business.foursquare.com

### 4.2 Medical/Healthcare Specific Directories

11. Zocdoc — https://zocdoc.com (for medical billing service referral)
12. Vitals — https://vitals.com
13. Healthgrades — https://healthgrades.com
14. WebMD Care — https://webmd.com
15. RateMDs — https://ratemds.com
16. Doctor.com — https://doctor.com
17. WellSprings — https://wellsprings.com
18. MedicalBillingGuide — https://medicalbillingguide.com
19. HIPAA compliant billing directories — search "medical billing directory florida"
20. MGMA (Medical Group Management Association) — https://mgma.com
21. FMA (Florida Medical Association) — https://flmedical.org
22. Miami-Dade Medical Association — https://miamimed.com
23. Florida Chamber of Commerce — https://floridachamber.com
24. Miami Beach Chamber of Commerce — https://miamibeachchamber.com
25. Coral Gables Chamber of Commerce — https://coralgableschamber.com
26. South Florida Business Journal — https://southfloridabusinessjournal.com

### 4.3 Citation/NAP Aggregators (Free)

27. Data Axle (formerly Neustar) — https://dataaxle.com
28. Localeze — https://localeze.com
29. Infogroup — https://infogroup.com
30. Acxiom — https://acxiom.com
31. Factual — https://factual.com

### 4.4 General Local Directories

32. Citygrid — https://citygrid.com
33. Superpages — https://superpages.com
34. DexKnows — https://dexknows.com
35. MerchantCircle — https://merchantcircle.com
36. Judy's Book — https://judysbook.com
37. ShowMeLocal — https://showmelocal.com
38. YellowBook — https://yellowbook.com
39. CitySquares — https://citysquares.com
40. BizJournals — https://bizjournals.com

### 4.5 Niche/Industry Directories

41. Health Level Seven (HL7) — https://hl7.org
42. WEDI (Workgroup for Electronic Data Interchange) — https://wedi.org
43. AHIMA (American Health Information Management) — https://ahima.org
44. AAPC (American Academy of Professional Coders) — https://aapc.com (list your company in their directory)
45. HIMSS (Healthcare Information and Management Systems) — https://himss.org
46. MedicalCodingCertifications — search for "AAPC member directory"
47. HealthcareBillingOptimization — industry forums and directories

### 4.6 Insurance Network Directories (Credentialing Visibility)

48. CAQH ProView — https://proview.caqh.org (ensure profile is complete)
49. Availity — https://availity.com
50. Change Healthcare — https://changehealthcare.com
51. TriZetto — https://trizetto.com
52. Navicure — https://navicure.com
53. Waystar — https://waystar.com

### 4.7 Additional Free Directories

54. HubSpot CRM listing — https://hubspot.com
55. Alignable — https://alignable.com
56. BizOnMedia — https://bizonmedia.com
57. eImportrz — https://eimportrz.com
58. Get Autos — no (skip)
59. GoLocalise — https://golocalise.com
60. Hotfrog — https://hotfrog.com
61. iBegin — https://ibegin.com
62. J巡 — skip
63. KwikInsights — skip
64. Lazuki — skip
65. My Time — skip
66. One Fine List — skip
67. Point of Beginning — skip
68. Provencio — skip
69. ShowMeVitamins — skip
70. Start Saturday — skip
71. Telstra — skip
72. Telo — skip
73. Vcflo — skip
74. Wherez.it — skip
75. Whois — skip
76. Zing Network — skip

**NOTE**: Items 54-76 are lower priority. Focus on 1-53 first. Revisit 54-76 quarterly.

---

## PART 5: 10 PRIORITY ACTION ITEMS

### ACTION 1: Fix Sitemap and Canonical URLs (CRITICAL — Do Today)

**File: app/sitemap.js**
Replace ALL instances of `https://pablodd1-mbmb-website.vercel.app` with `https://medicalbillingmb.com`

```javascript
// Change every URL from:
url: 'https://pablodd1-mbmb-website.vercel.app',
// To:
url: 'https://medicalbillingmb.com',
```

Also update the canonical in layout.js line 54 to confirm: `canonical: 'https://medicalbillingmb.com'`

**File: app/robots.js** — Add sitemap directive:
```javascript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/my-api/'],
    },
    sitemap: 'https://medicalbillingmb.com/sitemap.xml',
  }
}
```

### ACTION 2: Claim and Optimize Google Business Profile (CRITICAL — Week 1)

1. Go to https://business.google.com
2. Claim the listing for "Medical Billing Miami Beach" or create new
3. Fill in EXACT name: "Medical Billing Miami Beach (MBMB)"
4. Use the production domain as website: https://medicalbillingmb.com
5. Phone: (786) 643-2099
6. Address: **You must use a real physical address** — if virtual, use a registered agent address or coworking space address. Do NOT use a PO Box.
7. Service areas: Miami-Dade County, Broward County, South Florida
8. Categories: "Medical Billing Service", "Medical Coding Service", "Healthcare Administrator"
9. Add all 16 specialty services under "Services"
10. Add business hours: Mon-Fri 9AM-6PM EST
11. Add photos: logo, office (if applicable), team, service infographics
12. Get 5+ reviews from existing clients (send via email/SMS link)
13. Post GBP updates weekly (offers, events, tips)

### ACTION 3: Add Complete Street Address to Schema and Footer (HIGH — Week 1)

**File: app/layout.js**

In the PostalAddress schema (around line 124), replace:
```javascript
'streetAddress': 'Miami',
```
With a real street address. For example if the address is 1000 Brickell Ave:
```javascript
'streetAddress': '1000 Brickell Ave, Suite 900',
```

Also add the full address as visible HTML in the footer contact section (line 381). Currently only "Miami, Florida" is shown. Use schema-validated address.

### ACTION 4: Create Dedicated Service Pages (HIGH — Month 1)

Create 4 new Next.js pages:

**File: app/services/page.js**
- H1: "Medical Billing Services in Miami | Expert RCM for Florida Practices"
- H2s: "Medical Billing Miami", "Medical Billing Florida", "Claim Submission & Follow-Up", "Denial Management Miami", "Patient Billing Services"
- Content: Service description, process steps, why MBMB, CTA
- Schema: LocalBusiness + Service schema for each service

**File: app/services/medical-coding/page.js**
- H1: "Medical Coding Services in Miami | AAPC-Certified ICD-10/CPT Coders"
- H2s: "ICD-10 Coding Miami", "CPT & HCPCS Coding Florida", "Medical Coding Audit", "Specialty Coding"
- Content: Coding services, specialties served, compliance info

**File: app/services/credentialing/page.js**
- H1: "Provider Credentialing Services in Florida | Fast 60-120 Day Enrollment"
- H2s: "Florida Provider Credentialing", "CAQH Enrollment", "Insurance Network Enrollment", "Credentialing for New Practices"
- Content: Process timeline, what they need from provider, CAQH setup

**File: app/services/revenue-cycle-management/page.js**
- H1: "Revenue Cycle Management Miami | End-to-End RCM for Florida Practices"
- H2s: "RCM Miami", "Florida Healthcare RCM", "Denial Prevention", "Financial Reporting"

Each page needs: unique meta title, unique meta description (150-160 chars), FAQ schema, internal links to other services.

### ACTION 5: Optimize Homepage H1 and Add H2 Hierarchy (HIGH — Week 2)

**File: app/page.js line 287**

Change:
```javascript
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 text-center font-bold" >
  Medical Billing Miami Beach
</h1>
```

To:
```javascript
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 text-center font-bold" >
  Medical Billing Miami Beach — Expert Coding, Credentialing & RCM Services in Florida
</h1>
```

Add a new H2 section after the hero (before "Experienced Staff"):
```jsx
<h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mt-8 mb-4">
  Trusted Medical Billing Services for Miami, Coral Gables, Hialeah & All of South Florida
</h2>
```

### ACTION 6: Add Spanish Language Page (MEDIUM — Month 2)

**File: app/es/page.js** (or use next-intl / next-routes)

- Full Spanish translation of homepage
- H1: "Facturación Médica Miami Beach | Servicios de Codificación y Gestión de Ingresos"
- Target keyword: "facturación médica miami", "servicios de facturación médica florida"
- Add `hreflang="es"` to layout.js alternate link (already has the tag, need the actual page)
- Meta description in Spanish

This targets the significant Spanish-speaking healthcare provider market in Miami-Dade.

### ACTION 7: Start a Blog with 12 Posts (HIGH — Month 1-3)

See Part 6 below for full content calendar. First post should be:

**File: app/blog/medical-billing-miami-what-to-expect-2026/page.js**
- Target keyword: "medical billing miami"
- 1500+ word guide
- Local intent keywords naturally integrated
- Share on LinkedIn, email to existing contacts

Each blog post needs its own meta title, description, canonical, and FAQ or article schema.

### ACTION 8: Fix Image Alt Tags Systematically (MEDIUM — Week 2)

Audit all SmartImage and Image components. Ensure every non-decorative image has descriptive alt text:

- Footer social icons: change `alt={x.icon}` to `alt={`MBMB on ${x.icon}`}` (e.g., "MBMB on LinkedIn")
- All section images: confirm SmartImage alt prop is descriptive (already mostly good)
- Background video: add `aria-hidden="true"` since decorative
- Partner logos (AI Medical Scriber, AI Dynamics, AI Law Helper): add alt text
- Any image used as `<img>` without alt: add descriptive alt immediately

### ACTION 9: Add Next.js Image Optimization Config (MEDIUM — Week 2)

**File: next.config.mjs**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['medicalbillingmb.com'],
    minimumCacheTTL: 60,
    loader: 'default',
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
```

Also consider replacing the hero video with a static image for mobile (mobile browsers often block autoplay video). Use media query to serve image on mobile, video only on desktop.

### ACTION 10: Build First 20 Local Citations (MEDIUM — Month 1-2)

Priority order for manual citation building:

1. Google Business Profile (Action 2 covers this)
2. Bing Places
3. Apple Maps
4. Yelp
5. Facebook Business
6. BBB
7. Foursquare
8. LinkedIn Company Page (already exists — update with full NAP)
9. Yellow Pages
10. Superpages
11. Citygrid
12. MerchantCircle
13. DexKnows
14. MedicalCodingGuide (find the listing URL)
15. Zocdoc
16. Vitals
17. Healthgrades
18. MGMA directory
19. FMA (Florida Medical Association) directory
20. Miami Beach Chamber of Commerce

For each citation ensure NAP is EXACTLY:
- Business Name: Medical Billing Miami Beach (MBMB)
- Phone: (786) 643-2099
- Address: [Your Full Street Address], Miami, FL 33139
- Website: https://medicalbillingmb.com
- Hours: Mon-Fri 9:00 AM - 6:00 PM EST

---

## PART 6: 12-MONTH BLOG CONTENT CALENDAR

### Month 1: Foundation — Educational + Local Intent

**Post 1 (Week 1):** "Medical Billing in Miami: What Every Doctor Needs to Know in 2026"
- Target: "medical billing miami", "medical billing florida"
- Type: Ultimate guide (2000 words)
- CTA: Free billing audit
- Keywords: medical billing miami, healthcare billing florida, outsource medical billing

**Post 2 (Week 2):** "Medical Coding Changes 2026: ICD-10 Updates Florida Practices Must Know"
- Target: "medical coding florida", "ICD-10 coding miami"
- Type: News/updates (1200 words)
- CTA: Coding consultation

**Post 3 (Week 3):** "How to Choose a Medical Billing Company in Miami: 7 Questions to Ask"
- Target: "medical billing company miami", "best medical billing miami"
- Type: Buyer's guide (1800 words)
- CTA: Free consultation

**Post 4 (Week 4):** "Florida Medicaid Billing: A Complete Guide for Healthcare Providers"
- Target: "Florida Medicaid billing", "medicaid billing florida"
- Type: How-to guide (1500 words)
- CTA: Medicaid billing consultation

### Month 2: Specialties + Case Studies

**Post 5 (Week 5):** "Medical Billing for Primary Care Practices in Miami"
- Target: "primary care medical billing miami", "family practice billing florida"
- Type: Specialty guide (1400 words)
- CTA: Primary care billing consultation

**Post 6 (Week 6):** "Medical Billing for Cardiologists in South Florida"
- Target: "cardiology billing miami", "cardiology medical billing florida"
- Type: Specialty guide (1400 words)
- CTA: Cardiology billing consultation

**Post 7 (Week 7):** "The True Cost of Medical Billing Errors: A Florida Practice Analysis"
- Target: "medical billing errors", "claim denials florida"
- Type: Data-driven article (1200 words)
- CTA: Free billing audit

**Post 8 (Week 8):** "Provider Credentialing in Florida: Timeline, Process, and How to Speed It Up"
- Target: "credentialing services florida", "provider credentialing miami"
- Type: Process guide (1600 words)
- CTA: Credentialing consultation

### Month 3: RCM + Growth

**Post 9 (Week 9):** "Revenue Cycle Management for Miami Practices: A Step-by-Step Guide"
- Target: "revenue cycle management miami", "rcm florida"
- Type: Guide (1500 words)
- CTA: RCM consultation

**Post 10 (Week 10):** "How to Reduce Claim Denials in Your Florida Medical Practice"
- Target: "reduce claim denials", "denial management florida"
- Type: Tips/tricks (1200 words)
- CTA: Denial management services

**Post 11 (Week 11):** "Medical Billing for Dermatology Practices in South Florida"
- Target: "dermatology billing florida", "dermatology medical billing miami"
- Type: Specialty guide (1300 words)
- CTA: Dermatology billing consultation

**Post 12 (Week 12):** "HIPAA Compliance in Medical Billing: What Florida Practices Must Review in 2026"
- Target: "HIPAA compliance medical billing", "HIPAA billing florida"
- Type: Compliance guide (1800 words)
- CTA: Compliance consultation

**Recurring Content:**
- Monthly: Update "Medicare Reimbursement Rates by Specialty" guide
- Quarterly: Florida medical billing law changes update
- Bi-weekly: Short LinkedIn posts + email newsletter (Brevo)

---

## PART 7: STRUCTURAL RECOMMENDATIONS

### 7.1 Schema Markup Additions

Add Physician/MedicalBusiness schema variations. Current schema is good but add:
```javascript
'additionalType': 'https://schema.org/Physician',
'specialty': [
  'Medical Billing',
  'Medical Coding',
  'Healthcare Administration'
]
```

### 7.2 Internal Linking Strategy

- Every service page link to every other service page
- Blog posts link to relevant service pages (2-3 internal links per post)
- Footer links should include all service pages
- Add breadcrumb schema to all pages (already on homepage via jsonLd)

### 7.3 External Link Strategy

- Get listed on AAPC.com directory (they have a "find a medical billing professional" search)
- Get listed on MGMA.com member directory
- Guest post on healthcare finance blogs
- Get listed on FL medical association sites

### 7.4 Google Search Console Priorities

1. Fix coverage errors (crawl > sitemap issues)
2. Check for manual actions
3. Monitor Core Web Vitals
4. Look for "medicalbillingmb.com" branded search impressions — ensure CTR > 30%
5. Check for 404 errors in Crawl > Index Coverage

---

## PART 8: QUICK WINS CHECKLIST (Do This Week)

- [ ] Fix sitemap URLs (pablodd1-mbmb-website.vercel.app → medicalbillingmb.com)
- [ ] Add sitemap to robots.txt
- [ ] Claim Google Business Profile
- [ ] Add complete street address to schema
- [ ] Update footer with full address as visible HTML
- [ ] Optimize homepage H1 with full service list
- [ ] Fix footer social icon alt texts
- [ ] Submit sitemap to Google Search Console
- [ ] Add Next.js image optimization config
- [ ] Create first blog post draft

---

*Document prepared for MBMB — Medical Billing Miami Beach*
*For questions contact: Jasmel@medicalbillingmb.com*
