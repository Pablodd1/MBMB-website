export default function sitemap() {
  return [
    {
      url: 'https://pablodd1-mbmb-website.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://pablodd1-mbmb-website.vercel.app/consultation',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://pablodd1-mbmb-website.vercel.app/billing-details',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://pablodd1-mbmb-website.vercel.app/agreement-sign-up',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://pablodd1-mbmb-website.vercel.app/business-details',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}