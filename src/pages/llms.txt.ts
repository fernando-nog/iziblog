import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';
import { generateLlmsTxt } from '../lib/llms';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const body = generateLlmsTxt(posts);
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
