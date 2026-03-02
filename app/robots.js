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