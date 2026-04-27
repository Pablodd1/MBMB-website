export default function sitemap() {
  const today = new Date();
  return [
    // Main pages
    {
      url: 'https://medicalbillingmb.com',
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://medicalbillingmb.com/about',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://medicalbillingmb.com/services',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://medicalbillingmb.com/services/medical-coding',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://medicalbillingmb.com/services/credentialing',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://medicalbillingmb.com/services/revenue-cycle-management',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://medicalbillingmb.com/blog',
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://medicalbillingmb.com/blog/medical-billing-101',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://medicalbillingmb.com/blog/denial-management-guide',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://medicalbillingmb.com/blog/miami-medicaid-billing',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://medicalbillingmb.com/blog/top-5-medical-billing-mistakes',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://medicalbillingmb.com/consultation',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://medicalbillingmb.com/contact',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://medicalbillingmb.com/billing-details',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://medicalbillingmb.com/agreement-sign-up',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://medicalbillingmb.com/business-details',
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://medicalbillingmb.com/privacy-policy',
      lastModified: today,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: 'https://medicalbillingmb.com/terms-of-use',
      lastModified: today,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]
}