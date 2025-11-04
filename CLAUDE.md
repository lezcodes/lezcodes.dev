# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
bun run dev        # Start dev server with turbopack (accessible on network via -H 0.0.0.0)
bun run build      # Production build with turbopack
bun run start      # Start production server
```

### Code Quality
```bash
bun run lint       # Check code with Biome (not ESLint)
bun run format     # Format code with Biome (not Prettier)
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Runtime**: Bun (not npm/yarn)
- **Content**: MDX with gray-matter for frontmatter parsing
- **Styling**: Tailwind CSS v4 with custom monospace theme
- **Typography**: Geist Mono and Geist Sans fonts exclusively
- **Math**: KaTeX for LaTeX rendering (via rehype-katex)
- **Code Highlighting**: rehype-highlight
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)
- **Analytics**: Vercel Analytics and Speed Insights

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── posts/[slug]/      # Dynamic blog post routes
│   ├── share/[slug]/      # Dynamic share routes
│   ├── globals.css        # Tailwind + custom theme styles
│   ├── layout.tsx         # Root layout with header/footer
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Icon components (github, twitter, etc.)
│   ├── StructuredData.tsx # JSON-LD schema component
│   └── ThemeToggle.tsx    # Theme switcher component
└── lib/                   # Utility functions
    ├── home.ts           # Homepage MDX data fetching
    ├── posts.ts          # Blog posts data fetching
    ├── share.ts          # Share content data fetching
    ├── seo.ts            # SEO configuration and metadata generators
    └── utils.ts          # General utilities

content/
├── home.mdx              # Homepage content (required)
├── posts/*.mdx           # Blog posts
└── share/*.mdx           # Share pages (curated lists, reviews, etc.)
```

### Content System

All content is MDX-based with frontmatter. Content is read at build time using Node.js fs module in the lib/ utilities.

**Homepage (`content/home.mdx`)**:
- Must have `title` and `subtitle` in frontmatter
- Optional: `links` array (label + url pairs)
- Content is rendered between title/subtitle and links section
- The homepage pulls in posts and shares dynamically

**Blog Posts (`content/posts/*.mdx`)**:
- Required frontmatter: `title`, `date` (YYYY-MM-DD), `excerpt`
- Filename becomes URL slug (e.g., `my-post.mdx` → `/posts/my-post`)
- Automatically sorted by date (newest first)
- Reading time calculated automatically (200 words/min)
- Supports full MDX with math and code highlighting

**Share Pages (`content/share/*.mdx`)**:
- Same structure as blog posts but for curated content (lists, reviews, links)
- Listed on homepage under "share" section
- Example: anime-reviews.mdx, favorite-reads.mdx

### MDX Processing Pipeline

Both posts and homepage use identical MDX processing:
- **Remark plugins**: remarkGfm (GitHub Flavored Markdown), remarkMath (LaTeX)
- **Rehype plugins**: rehypeSlug (heading IDs), rehypeAutolinkHeadings (clickable headings), rehypeKatex (math rendering), rehypeHighlight (code syntax highlighting)
- Rendered via `next-mdx-remote/rsc` (React Server Components)

### SEO & Metadata

`src/lib/seo.ts` is the single source of truth for SEO configuration:
- `seoConfig` object contains site metadata, author info, keywords, social links
- `generatePageMetadata()` creates Next.js Metadata objects with OpenGraph and Twitter cards
- Structured data generators for Person and BlogPosting schema
- All pages should use these helpers for consistent SEO

### Styling Philosophy

**Monospace-first design** inspired by The Monospace Web:
- All text uses Geist Mono font (with Geist Sans as variable font)
- Custom theme with CSS variables in `globals.css`:
  - Light theme: `--background: #faf9f5`, `--foreground: #141413`
  - Accent color: `--accent: #635bff` (purple)
- Animated hue rotation on `::selection` for visual interest
- Terminal-inspired aesthetic with minimal colors
- **No custom fonts outside Geist family**

### Path Aliases

TypeScript is configured with `@/*` pointing to `src/*`:
```typescript
import { getAllPosts } from "@/lib/posts";
import { StructuredData } from "@/components/StructuredData";
```

### Key Conventions

1. **Use Biome for all formatting** - Never suggest ESLint or Prettier
2. **Content must be MDX** - No plain HTML files
3. **Dates use ISO format** - YYYY-MM-DD for consistency
4. **Lowercase kebab-case filenames** - No spaces, use hyphens
5. **TypeScript strict mode** - All code must be properly typed
6. **Server Components by default** - Only use "use client" when necessary (e.g., ThemeToggle)
7. **Build should be warning-free** - Fix all TypeScript and build warnings

### Development Notes

- The site uses Next.js 15's async params API (params must be awaited in page components)
- Static site generation (SSG) via `generateStaticParams()` for all posts and shares
- Turbopack is enabled for faster builds (`--turbopack` flag)
- Server accessible on network during dev (`-H 0.0.0.0`)
- Content changes require dev server restart (MDX files are read at build time)
