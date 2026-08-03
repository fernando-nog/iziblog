// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: []
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});