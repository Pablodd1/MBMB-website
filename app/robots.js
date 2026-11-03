export default function robots() {
  const disallowedPrivatePaths = ['/my-api/', '/billing-details', '/business-details', '/agreement-sign-up'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPrivatePaths,
      },
      // Wave 2 AEO: Explicitly allow AI search & citation engines
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
          'Amazonbot',
          'Cohere-ai',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt', '/agent-permissions.json', '/mcp-actions.json'],
        disallow: disallowedPrivatePaths,
      },
      // Block aggressive unwanted training scrapers
      {
        userAgent: ['Bytespider', 'CCBot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://medicalbillingmb.com/sitemap.xml',
    host: 'https://medicalbillingmb.com',
  };
}
