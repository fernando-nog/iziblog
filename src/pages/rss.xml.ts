import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';
import { siteConfig } from '../config/site';

export const GET: APIRoute = async (context) => {
  const posts = await getPublishedPosts();
  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site || siteConfig.siteUrl,
    items: posts.map((post) => {
      const slug = post.id.split('/').pop() || post.id;
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/articles/${slug}/`,
        categories: post.data.tags,
      };
    }),
    customData: `<language>${siteConfig.defaultLanguage}</language>`,
  });
};
