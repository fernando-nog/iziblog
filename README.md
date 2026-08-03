# IziBlog

A simple, SEO-first Astro template for technical blogs with multilingual support.

IziBlog is built for developers and technical writers who want a fast, Markdown-first blog with strong SEO, internal discovery, RSS, sitemap, structured data, `llms.txt`, dark mode, multilingual routing, search and privacy-friendly cookie consent.

## Features

- ✅ **Markdown / MDX** content with Astro Content Collections
- ✅ **Multilingual** (EN/PT) via Astro built-in i18n routing — add more languages easily
- ✅ **SEO-ready** — meta tags, Open Graph, Twitter Cards, canonical URLs, JSON-LD, hreflang, breadcrumbs
- ✅ **Internal discovery** — automatic related posts by shared tags and topic tag pages
- ✅ **RSS feed** (`/rss.xml` default, `/{lang}/rss.xml` optional) per language
- ✅ **Sitemap** (`/sitemap-index.xml`) via `@astrojs/sitemap`
- ✅ **`llms.txt`** and **`llms-full.txt`** support for LLM discoverability
- ✅ **Dark / light / system** theme toggle with anti-FOUC script
- ✅ **Static search** via Pagefind (Ctrl+K)
- ✅ **Privacy-friendly cookie consent** with 4 configurable categories
- ✅ **Consent-aware analytics** — Google gtag integration wired to cookie banner
- ✅ **Tag-based navigation**, archive by year, and automatic prefetch on post links
- ✅ **Accessible, responsive, fast by default**
- ✅ **Vanilla CSS** design system — no Tailwind dependency

## Tech Stack

- [Astro](https://astro.build) v7 — static site generation
- [TypeScript](https://www.typescriptlang.org/) — type-safe code
- [Pagefind](https://pagefind.app) — static search indexing
- Vanilla CSS with design tokens (`oklch` colors, Inter font)

## Quick Start

```bash
# Create from template (on GitHub, click "Use this template")
# Or clone directly:
git clone https://github.com/yourname/iziblog.git
cd iziblog

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
# Search index is auto-generated after build

# Preview the production build
npm run preview
```

## Project Structure

```
public/
  favicon.svg        — Site favicon
  robots.txt         — Crawler instructions (generated dynamically via `src/pages/robots.txt.ts`)
src/
  components/        — Reusable UI components
  config/            — Central site configuration
  content/           — Content collections (blog posts)
    blog/
      en/            — English posts
      pt/            — Portuguese posts (add more as needed)
  layouts/           — Page layouts (Base, BlogPost, Page)
  lib/               — Utility functions (dates, SEO, posts, i18n, etc.)
  pages/             — Astro pages and endpoints
    [lang]/          — Multilingual routes (/en/, /pt/)
  styles/            — Global CSS and design tokens
```

## Creating Posts

Add a file to `src/content/blog/{lang}/` with YAML frontmatter:

```yaml
---
title: "Your Post Title"
description: "Short SEO description — max 160 chars"
pubDate: 2026-01-15
updatedDate: 2026-01-15       # optional
author: "Your Name"
tags: ["astro", "blog", "seo"]
category: "engineering"       # used for grouping
language: "en"                # must match the folder name
draft: false                  # drafts are excluded from builds
featured: false               # featured posts appear on the home page
tldr:                         # optional bullet summary
  - "Key takeaway one."
  - "Key takeaway two."
canonicalUrl: https://example.com/original-post
cover:                        # optional Open Graph image
  src: "/images/example-cover.webp"
  alt: "Cover image description"
---

Your Markdown content here...
```

**Frontmatter schema:**

| Field | Type | Required | Default |
|---|---|---|---|
| `title` | string | ✅ | — |
| `description` | string | ✅ | — |
| `pubDate` | date | ✅ | — |
| `updatedDate` | date | ❌ | — |
| `author` | string | ❌ | `"IziBlog Author"` |
| `tags` | string[] | ❌ | `[]` |
| `category` | string | ❌ | `"general"` |
| `language` | string | ❌ | `"en"` |
| `draft` | boolean | ❌ | `false` |
| `featured` | boolean | ❌ | `false` |
| `tldr` | string[] | ❌ | — |
| `canonicalUrl` | string | ❌ | — |
| `cover` | `{ src, alt }` | ❌ | — |

### TL;DR block

Posts with `tldr` frontmatter render a styled summary block above the article content. Great for long posts.

### Code blocks

Fenced code blocks are styled with a dark theme via Shiki (configured in `astro.config.mjs`).

## Adding a New Language

1. **Add to `astro.config.mjs`**:
   ```js
   i18n: {
     locales: ['en', 'pt', 'es'],  // add 'es'
     defaultLocale: 'en',
     routing: { prefixDefaultLocale: true },
   }
   ```

2. **Create content folder**: `src/content/blog/es/`

3. **Add translations in `src/lib/i18n.ts`**:
   ```ts
   labels.es = {
     'nav.home': 'Inicio',
     'nav.articles': 'Artículos',
     // ... see labels.en for the full list
   };
   ```

4. **Create pages** (optional): The `[lang]` dynamic routes auto-generate pages for all configured languages. If you need language-specific pages (e.g., a different About page), create `src/pages/[lang]/about.es.astro` or handle inside the existing `[lang]/about.astro`.

5. **Add posts** in `src/content/blog/es/*.md` with `language: es`

## Customization

### Site metadata

Edit `src/config/site.ts`:

```ts
export const siteConfig = {
  name: 'Your Blog',
  title: 'Your Blog',
  description: 'Your blog description.',
  siteUrl: 'https://yourdomain.com',
  defaultLanguage: 'en',
  analytics: {
    measurementId: '', // set to 'G-XXXXXXXXXX' to enable gtag
  },
  // ...
};
```

### Design tokens

Edit `src/styles/global.css` to customize:

```css
:root {
  --bg:        oklch(95.5% .006 260);   /* background */
  --fg:        oklch(24% .015 260);     /* text */
  --muted:     oklch(57% .018 260);     /* secondary text */
  --border:    oklch(89% .008 260);     /* borders */
  --accent:    oklch(56% .16 290);      /* links, buttons */
  /* Dark mode variants are below — customize as needed */
}
```

Colors use `oklch()` for perceptually uniform light/dark switching. The default palette is **Soft Ash + Violet**.

### Fonts

The template loads **Inter** (400–800) from Google Fonts. Change the `<link>` in `src/components/SEO.astro` to use a different font.

## SEO & LLM Discoverability

### SEO features (automatic)

- `<title>`, `<meta name="description">`
- Open Graph: `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`
- Twitter Cards: `twitter:title`, `twitter:description`, `twitter:image`
- Canonical URL per page
- `hreflang` alternates (`<link rel="alternate">` for EN/PT)
- JSON-LD structured data (WebSite, BlogPosting, BreadcrumbList)
- Breadcrumbs on every post
- Related posts by shared tags
- `sitemap-index.xml` via `@astrojs/sitemap`
- RSS feed (`/rss.xml`) and optional per-language feed (`/{lang}/rss.xml`)
- Automatic link prefetching on post listings

### Analytics

Set your Google Analytics 4 measurement ID in `src/config/site.ts`:

```ts
analytics: {
  measurementId: 'G-XXXXXXXXXX',
},
```

The gtag script only loads after the visitor accepts the **Analytics** category in the cookie banner.

### `llms.txt`

A lightweight plain-text index at `/llms.txt` and `/llms-full.txt` that helps AI assistants discover and understand your content. Auto-generated at build time from your content collection.

## Deployment

The template builds to a static `dist/` directory. Deploy to any static host:

| Host | Method |
|---|---|
| **Netlify** | Drag & drop `dist/`, or connect Git repo. `netlify.toml` included |
| **Vercel** | Connect Git repo — no extra config needed |
| **GitHub Pages** | Use GitHub Actions or deploy `dist/` branch |
| **Cloudflare Pages** | Connect Git repo |
| **Railway / Render** | Point to build command `npm run build` |

### Netlify (recommended)

A `netlify.toml` is included:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

Connect your GitHub repo and Netlify builds + deploys automatically on every push.

## Cookie Consent

A client-side privacy banner with 4 categories:

- **Necessary** — always on (site functionality)
- **Analytics** — helps understand visitor behavior
- **Comments** — enables comment sections if configured
- **Marketing** — used for marketing and advertising

Preferences are stored in `localStorage`. No third-party scripts are loaded by default. Analytics is already wired to the banner via `src/components/Analytics.astro`; set `siteConfig.analytics.measurementId` to enable it.

## Search

Pagefind indexes the full content at build time. Trigger via **Ctrl+K** (or **Cmd+K** on macOS). The modal queries the static index client-side — no server required.

The index is multilingual: Pagefind auto-detects `en` and `pt` from the `lang` attribute on pages.

## License

MIT License. See [`LICENSE`](LICENSE) for details.
