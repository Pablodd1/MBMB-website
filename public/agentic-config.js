// Agentic Website Configuration for MBMB
window.AGENTIC_CONFIG = {
  siteId: 'mbmb-medical-billing',
  
  track: {
    searches: true,
    clicks: true,
    scrollDepth: true,
    forms: true,
    timeOnPage: true,
    ctaVisibility: true
  },
  
  optimize: {
    metaTitle: true,
    metaDescription: true,
    ctaButtons: true,
    contentPriority: true,
    schemaOrg: true
  },
  
  targetKeywords: [
    'medical billing Miami',
    'medical billing services',
    'revenue cycle management',
    'healthcare billing',
    'medical billing company',
    'physician billing',
    'medical coding services',
    'billing assessment',
    'revenue optimization',
    'healthcare revenue'
  ],
  
  ctaVariants: [
    'Free Billing Assessment',
    'Book Consultation',
    'Get Free Audit',
    'Talk to an Expert',
    'Start Saving Today'
  ],
  
  schemaTypes: {
    homepage: 'LocalBusiness',
    services: 'Service',
    contact: 'ContactPage',
    about: 'AboutPage'
  },
  
  rules: [
    {
      condition: 'search_contains("billing" OR "revenue" OR "collections")',
      action: 'update_cta_to: "Free Billing Assessment"',
      priority: 'high'
    },
    {
      condition: 'search_contains("consultation" OR "audit" OR "assessment")',
      action: 'update_headline_to: "Free Medical Billing Assessment"',
      priority: 'high'
    },
    {
      condition: 'click_rate("pricing") > 0.3',
      action: 'move_section_up: "pricing"',
      priority: 'medium'
    },
    {
      condition: 'bounce_rate > 0.6',
      action: 'simplify_hero_section',
      priority: 'high'
    },
    {
      condition: 'search_contains("Miami" OR "Florida" OR "South Florida")',
      action: 'update_headline_to: "Miami\'s Trusted Medical Billing Partner"',
      priority: 'high'
    }
  ]
};

// Auto-initialize when engine loads
(function initAgentic() {
  if (window.AgenticWebsite && window.AGENTIC_CONFIG) {
    window.agentic = new AgenticWebsite(window.AGENTIC_CONFIG);
    console.log('[MBMB Agentic] Initialized');
  } else {
    setTimeout(initAgentic, 100);
  }
})();
