import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';
import { generateLlmsFullTxt } from '../lib/llms';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const body = generateLlmsFullTxt(posts);
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
