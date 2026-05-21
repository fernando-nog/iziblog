---
title: "Why Every Blog Should Have llms.txt"
description: "A plain-text index that helps AI assistants discover and understand your content."
pubDate: 2026-05-05
updatedDate: 2026-05-05
author: "IziBlog Author"
tags: ["llms", "ai", "seo", "metadata"]
category: "ai"
language: "en"
draft: false
featured: true
tldr:
  - "llms.txt is a machine-readable index of your site's content."
  - "It helps AI assistants surface your articles accurately."
  - "Keep it concise: summaries, topics, and reading order."
---

As AI assistants become the default way people discover information, having a machine-readable index of your content is no longer optional.

## What is llms.txt?

`llms.txt` is a plain-text file served at the root of your domain. It provides a structured overview of your site: recent posts, topics, and suggested reading order. Think of it as a sitemap designed for LLM consumption.

## Why it matters

1. **Discovery**: AI agents can find your content without crawling every page.
2. **Accuracy**: Summaries reduce hallucination when models reference your work.
3. **Control**: You decide what gets indexed and how it is described.

## What to include

- Site description and metadata
- Recent posts with short descriptions
- Topic tags and categories
- Suggested reading order
- Customization notes for template users (if applicable)

## What to avoid

Do not dump the full text of every post. LLMs handle summaries better than raw content, and you want to guide how your work is represented.

## Getting started

IziBlog generates `/llms.txt` and `/llms-full.txt` automatically from your content collection. Just write good descriptions in your frontmatter and the rest is handled at build time.
