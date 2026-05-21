import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const index = posts.map((post) => ({
    title: post.data.title,
    url: `/articles/${post.id}/`,
    excerpt: post.data.description,
    tags: post.data.tags,
    category: post.data.category,
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
