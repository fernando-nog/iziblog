import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${siteConfig.siteUrl.replace(/\/$/, '')}/sitemap-index.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
