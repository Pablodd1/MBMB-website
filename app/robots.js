export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/my-api/', '/billing-details', '/business-details', '/agreement-sign-up'],
    },
    sitemap: 'https://medicalbillingmb.com/sitemap.xml',
  }
}