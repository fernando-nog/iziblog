import { siteConfig } from '../config/site';
import type { Post } from './posts';

function postUrl(post: Post): string {
  // post.id format: "en/slug" or "pt/slug" after i18n restructuring
  const parts = post.id.split('/');
  const lang = parts[0] || 'en';
  const slug = parts[1] || post.id;
  return `/${lang}/articles/${slug}`;
}

export function generateLlmsTxt(posts: Post[]): string {
  const lines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    '## Site',
    `- Home: /`,
    `- Articles: /en/articles`,
    `- Archive: /en/archive`,
    `- Tags: /en/tags`,
    `- About: /en/about`,
    `- RSS: /rss.xml`,
    '',
    '## Recent posts',
  ];

  for (const post of posts.slice(0, 10)) {
    lines.push(`- [${post.data.title}](${postUrl(post)}): ${post.data.description}`);
  }

  const allTags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) allTags.add(tag);
  }

  if (allTags.size > 0) {
    lines.push('', '## Topics');
    for (const tag of Array.from(allTags).sort()) {
      lines.push(`- ${tag}`);
    }
  }

  return lines.join('\n');
}

export function generateLlmsFullTxt(posts: Post[]): string {
  const lines = [
    `# ${siteConfig.name} — Full Index`,
    '',
    `> ${siteConfig.description}`,
    '',
    '## Overview',
    `${siteConfig.name} is an Astro blog template for technical writers and developers.`,
    'It includes features like RSS, sitemap, dark mode, static search, cookie consent, and llms.txt support.',
    '',
    '## Suggested reading order',
    '1. Start with the home page and featured posts.',
    '2. Browse categories via /en/tags or /pt/tags.',
    '3. Use /en/archive or /pt/archive for chronological exploration.',
    '4. Subscribe via /rss.xml.',
    '',
    '## All posts',
  ];

  for (const post of posts) {
    const date = post.data.pubDate.toISOString().split('T')[0];
    lines.push(`- [${post.data.title}](${postUrl(post)}) — ${date}`);
    lines.push(`  ${post.data.description}`);
    if (post.data.tags.length) {
      lines.push(`  Tags: ${post.data.tags.join(', ')}`);
    }
    lines.push('');
  }

  const categories = new Map<string, string[]>();
  for (const post of posts) {
    const cat = post.data.category;
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(post.id);
  }

  lines.push('## Categories');
  for (const [cat, slugs] of [...categories.entries()].sort()) {
    lines.push(`- ${cat} (${slugs.length} posts)`);
  }

  lines.push(
    '',
    '## Customization notes for template users',
    '- Edit `src/config/site.ts` to change site metadata.',
    '- Add posts to `src/content/blog/en/` or `src/content/blog/pt/` as Markdown or MDX.',
    '- Run `npm run build` to generate the static site.',
    '- Pagefind search is built automatically after `npm run build`.',
    '- Cookie consent is client-side only; no third-party tracking is enabled by default.',
  );

  return lines.join('\n');
}
