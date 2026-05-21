import { siteConfig } from '../config/site';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  lang?: string;
}

export function makeTitle(pageTitle?: string): string {
  if (!pageTitle) return siteConfig.title;
  return `${pageTitle} — ${siteConfig.name}`;
}

export function makeCanonical(path: string): string {
  const clean = path.replace(/\/$/, '') || '/';
  return `${siteConfig.siteUrl}${clean}`;
}

export function jsonLdBlogPosting(post: {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  author: string;
  url: string;
  image?: string;
  tags: string[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.pubDate.toISOString(),
    dateModified: (post.updatedDate || post.pubDate).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
    },
    url: post.url,
    image: post.image,
    keywords: post.tags.join(', '),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/favicon.svg`,
      },
    },
  };
}

export function jsonLdWebSite(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.siteUrl}/articles?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
