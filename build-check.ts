import { siteConfig } from './src/config/site';

const EXPECTED_DOMAIN = 'example.com';

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return '';
  }
}

if (process.env.NODE_ENV === 'production') {
  if (getHostname(siteConfig.siteUrl) === EXPECTED_DOMAIN) {
    console.warn(
      '\n⚠️  WARNING: siteConfig.siteUrl still uses the placeholder domain "example.com".\n' +
      '   Update src/config/site.ts with your real domain before deploying.\n' +
      `   Current value: ${siteConfig.siteUrl}\n`,
    );
  }

  if (siteConfig.analytics?.measurementId === '') {
    console.warn(
      '\nℹ️  NOTE: No Google Analytics measurementId configured.\n' +
      '   Set siteConfig.analytics.measurementId to enable gtag, or leave it empty to skip analytics.\n',
    );
  }
}

export {};
