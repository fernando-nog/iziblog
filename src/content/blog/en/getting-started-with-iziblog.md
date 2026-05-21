---
title: "Getting Started with IziBlog"
description: "A quick guide to setting up and customizing the IziBlog Astro template."
pubDate: 2026-05-15
updatedDate: 2026-05-15
author: "IziBlog Author"
tags: ["astro", "blog", "template"]
category: "engineering"
language: "en"
draft: false
featured: true
tldr:
  - "IziBlog is an Astro template for technical blogs."
  - "Clone the repo, edit site.ts, and add content to src/content/blog."
  - "Build with npm run build and deploy anywhere."
---

IziBlog is a clean, SEO-first blog template built with Astro. It is designed for developers and technical writers who want a fast, Markdown-first publishing workflow without sacrificing modern features.

## Why Astro?

Astro ships zero JavaScript by default and hydrates only what you need. For a content-heavy blog, this means excellent Core Web Vitals out of the box.

## Quick start

1. Clone the repository or use it as a GitHub template.
2. Run `npm install` to install dependencies.
3. Edit `src/config/site.ts` with your metadata.
4. Add posts to `src/content/blog/` as Markdown or MDX.
5. Run `npm run dev` to start the dev server.
6. Run `npm run build` to generate the static site.

## What you get

- **Content collections** with schema-validated frontmatter
- **RSS**, **sitemap**, and **JSON-LD** structured data
- **Dark / light / system** theme support
- **Cookie consent** with configurable categories
- **Search** via Pagefind (optional)
- **`llms.txt`** and **`llms-full.txt`** support for LLM indexing
- **Tag-based navigation** and archive by year

## Customization

The template uses CSS custom properties for tokens. Edit `src/styles/global.css` to change colors, fonts, and spacing. Tailwind CSS v4 is included for utility classes when you need them.
