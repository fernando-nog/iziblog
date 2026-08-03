export const siteConfig = {
  name: 'IziBlog',
  title: 'IziBlog',
  description: 'A simple, SEO-first Astro template for technical blogs.',
  siteUrl: 'https://example.com',
  defaultLanguage: 'en' as const,
  lang: 'en' as const,
  author: {
    name: 'IziBlog Author',
    bio: 'Technical writer and software engineer.',
  },
  social: {
    github: 'https://github.com',
    twitter: '',
    linkedin: 'https://linkedin.com',
  },
  analytics: {
    measurementId: '',
  },
};

export type SiteConfig = typeof siteConfig;
