import { LOCATIONS, SPECIALTIES, EHRS } from './data/seo-hubs';

export default function sitemap() {
  const baseUrl = 'https://medicalbillingmb.com';
  const now = new Date();

  const locationEntries = [
    { url: `${baseUrl}/locations`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...LOCATIONS.map((l) => ({
      url: `${baseUrl}/locations/${l.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    })),
  ];

  const specialtyEntries = [
    { url: `${baseUrl}/specialties`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...SPECIALTIES.map((s) => ({
      url: `${baseUrl}/specialties/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    })),
  ];

  const ehrEntries = [
    { url: `${baseUrl}/ehr`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    ...EHRS.map((e) => ({
      url: `${baseUrl}/ehr/${e.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/client-portal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...locationEntries,
    ...specialtyEntries,
    ...ehrEntries,
    {
      url: `${baseUrl}/for-providers`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/for-attorneys`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/pre-submission-scrutiny`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/medical-coding`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/credentialing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/revenue-cycle-management`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources/florida-compliance-checklist`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/co-16-co-50-co-97-denial-codes-florida-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/co-45-underpayment-contract-allowables-florida`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/co-197-prior-authorization-denial-appeals-miami`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/florida-medicaid-2026-fee-schedule-billing-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/scrutiny-before-the-scrutiny-pre-submission-review`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog/medical-billing-chronology-reconciliation-for-attorneys`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/ai-double-check-medical-coding-clean-claims`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/florida-provider-credentialing-caqh-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/medical-billing-101`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/denial-management-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/miami-medicaid-billing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/top-5-medical-billing-mistakes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];
}