import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPublishedPosts(lang?: string): Promise<Post[]> {
  const all = await getCollection('blog');
  let posts = all.filter((post) => !post.data.draft);
  if (lang) posts = posts.filter((post) => post.data.language === lang);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getFeaturedPosts(limit = 4, lang?: string): Promise<Post[]> {
  const posts = await getPublishedPosts(lang);
  return posts.filter((post) => post.data.featured).slice(0, limit);
}

export async function getRecentPosts(limit = 8, lang?: string): Promise<Post[]> {
  const posts = await getPublishedPosts(lang);
  return posts.slice(0, limit);
}

export function groupByYear(posts: Post[]): Map<string, Post[]> {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const year = post.data.pubDate.getFullYear().toString();
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }
  // Sort each year's posts descending
  for (const [, list] of groups) {
    list.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  }
  return groups;
}

export function groupByYearMonth(posts: Post[]): Map<string, Post[]> {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const key = `${post.data.pubDate.getFullYear()}-${String(post.data.pubDate.getMonth() + 1).padStart(2, '0')}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(post);
  }
  for (const [, list] of groups) {
    list.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  }
  return groups;
}

export function getAllTags(posts: Post[]): Map<string, number> {
  const count = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      count.set(tag, (count.get(tag) || 0) + 1);
    }
  }
  return new Map([...count.entries()].sort((a, b) => b[1] - a[1]));
}

export function getPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter((post) => post.data.tags.includes(tag));
}
