export const TEST_IDS = {
  // Page-level
  page: {
    layout: 'page-layout',
  },

  // UI Components
  ui: {
    title: 'ui-title',
    text: 'ui-text',
    footer: 'ui-footer',
    iconGrid: 'icon-grid',
    loadingState: 'loading-state',
    loading: 'loading-state', // Alias
    errorBoundary: 'error-boundary',
  },

  // Text/Typography
  text: {
    tagline: 'text-tagline',
  },

  // Navigation
  nav: {
    iconLink: 'nav-icon-link',
  },

  // Particles
  particles: {
    container: 'particles-background-container',
  },

  // Season (for provider tests)
  season: {
    providerContent: 'season-provider-content',
    childPrimary: 'season-child-primary',
    childSecondary: 'season-child-secondary',
  },

  // Pages
  pages: {
    home: {
      tagline: 'home-tagline',
    },
    resume: {
      tagline: 'resume-tagline',
    },
    marketingAnalytics: {
      tagline: 'marketing-analytics-tagline',
    },
    marketingCampaigns: {
      tagline: 'marketing-campaigns-tagline',
    },
    performanceMetrics: {
      tagline: 'performance-metrics-tagline',
    },
    companyInfo: {
      tagline: 'company-info-tagline',
    },
  },
} as const

export type TestIds = typeof TEST_IDS
