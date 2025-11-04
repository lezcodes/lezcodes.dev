# lezcodes.dev

A monospace-themed personal website built with Next.js 15 and MDX, inspired by [The Monospace Web](https://github.com/owickstrom/the-monospace-web).

## Quick Start

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Available Commands

```bash
# Development
bun run dev        # Start dev server with Turbopack (accessible on network)
bun run build      # Build for production with Turbopack
bun run start      # Start production server

# Testing
bun test           # Run all tests with Bun
bun test <file>    # Run specific test file

# Code Quality
bun run lint       # Check code with Biome
bun run format     # Auto-fix and format code with Biome
```

## How to Create Content

### Homepage (`content/home.mdx`)

The homepage content is controlled by a single MDX file with support for technologies, links, and projects:

```mdx
---
title: "Your Name"
subtitle: "your tagline or description"
technologies:
  - "JavaScript"
  - "TypeScript"
  - "React"
  - "Next.js"
links:
  - title: "github"
    url: "https://github.com/yourusername"
  - title: "linkedin"
    url: "https://linkedin.com/in/yourusername"
projects:
  - title: "my-awesome-project"
    url: "https://github.com/yourusername/project"
  - title: "another-project"
    url: "https://github.com/yourusername/another"
---

Your homepage content goes here.
You can use **markdown** and MDX components.
```

**Rules:**
- Must have `title` and `subtitle` in frontmatter
- `technologies` is optional array of strings (no URLs needed)
- `links` is optional array with `title` and `url` (linktree-style)
- `projects` is optional array with `title` and `url` (same style as links)
  - Projects without `url` show "🚧" emoji to indicate work-in-progress
- **Layout order**: title → subtitle → content → links → projects → technologies
- **Automatic sorting**: All arrays are sorted alphabetically
- **Section headers**: All lowercase (technologies, links, projects)
- Content appears between title/subtitle and other sections
- Supports full MDX syntax

### Blog Posts (`content/posts/*.mdx`)

Create new posts as `.mdx` files in the `content/posts/` directory:

```mdx
---
title: "Your Post Title"
date: "2025-01-27"
excerpt: "Brief description for the posts index"
---

# Your Post Title

Your content here with full MDX support!

## Math Example
$$E = mc^2$$

## Code Example
```javascript
console.log("Hello, monospace world!");
```
```

**Rules:**
- Filename becomes the URL slug (e.g., `my-post.mdx` → `/posts/my-post`)
- Must have `title`, `date`, and `excerpt` in frontmatter
- Date format: `YYYY-MM-DD`
- Supports LaTeX math with KaTeX
- Supports syntax highlighting for code blocks
- Can embed React components

### Vault (`content/vault/*.mdx`)

Create curated collections as `.mdx` files in the `content/vault/` directory:

```mdx
---
title: "My Favorite Links"
excerpt: "A curated collection of interesting resources"
---

# My Favorite Links

Your curated content with MDX support.

## Resources
- [Example](https://example.com) - Description here
```

**Rules:**
- Filename becomes the URL slug (e.g., `favorite-links.mdx` → `/vault/favorite-links`)
- Must have `title` and `excerpt` in frontmatter
- No date required (unlike posts)
- Supports full MDX syntax
- Perfect for curated lists, bookmarks, or evergreen content

## Project Rules & Conventions

### Design Philosophy
- **Monospace Everything**: Uses Geist Mono font exclusively
- **Minimal & Functional**: Clean, terminal-inspired aesthetic
- **Content First**: Design serves the content, not the other way around

### File Structure Rules
```
content/
├── home.mdx           # Homepage content (required)
├── posts/             # Blog posts directory
│   └── *.mdx          # Individual posts (with dates)
└── vault/             # Curated collections directory
    └── *.mdx          # Evergreen content (no dates)

src/
├── app/               # Next.js app directory (App Router)
│   ├── posts/         # Blog posts routes
│   ├── vault/         # Vault routes
│   └── page.tsx       # Homepage
├── components/        # React components
│   └── ui/            # UI icon components
├── lib/               # Core utilities and logic
│   ├── mdx/           # MDX collection utilities
│   ├── pages/         # Page factory functions
│   ├── seo/           # SEO and structured data
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Error handling and utilities
└── test/              # Test setup
```

### Content Rules
1. **All content is MDX** - No plain HTML files
2. **Frontmatter is required** - Every MDX file needs YAML frontmatter
3. **Dates use ISO format** - `YYYY-MM-DD` for consistency
4. **Lowercase filenames** - Use kebab-case for post slugs
5. **No spaces in filenames** - Use hyphens instead

### Styling Rules
1. **Monospace only** - All text uses Geist Mono font
2. **Theme system** - Light theme (purple/beige), dark theme (black/orange)
3. **Theme toggle** - Click to switch: ☀ (light) ↔ 🌙 (dark), auto-detects system preference
4. **No custom fonts** - Stick to the monospace constraint
5. **Minimal colors** - Uses CSS custom properties for theming

### Development Rules
1. **Use Bun** - Runtime and package manager (replaces Node.js/npm)
2. **Use Biome** - For linting and formatting (replaces ESLint/Prettier)
3. **Use Turbopack** - Enabled for faster builds and dev server
4. **TypeScript strict** - All code must be properly typed with `@/` imports
5. **Test with Bun** - Co-locate tests with source files as `*.test.ts(x)`
6. **Error handling** - Use `tryCatch` and `tryCatchCallback` from `@/lib/utils/error-handler`
7. **DRY principle** - Use generic helpers from `@/lib/mdx/collection` instead of duplicating logic
8. **No runtime errors** - Build and tests should complete without warnings

## Tech Stack

- **Framework**: Next.js 15 with App Router and React Server Components
- **Runtime**: Bun (replaces Node.js/npm)
- **Content**: MDX with gray-matter for frontmatter
- **Styling**: Tailwind CSS with custom monospace theme
- **Typography**: Geist Mono font (Google Fonts)
- **Math**: KaTeX for LaTeX rendering
- **Code**: rehype-highlight for syntax highlighting
- **Linting & Formatting**: Biome (replaces ESLint + Prettier)
- **Testing**: Bun test with happy-dom
- **Build Tool**: Turbopack (Next.js built-in)
- **SEO**: Automatic sitemap, robots.txt, and structured data (JSON-LD)
