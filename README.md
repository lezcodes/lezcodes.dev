# lezcodes.dev

A monospace-themed website built with Next.js and MDX, inspired by [The Monospace Web](https://github.com/owickstrom/the-monospace-web).

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
bun run dev        # Start dev server with turbopack (accessible on network)
bun run build      # Build for production with turbopack
bun run start      # Start production server

# Code Quality
bun run lint       # Check code with Biome
bun run format     # Format code with Biome
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

## Project Rules & Conventions

### Design Philosophy
- **Monospace Everything**: Uses Geist Mono font exclusively
- **Minimal & Functional**: Clean, terminal-inspired aesthetic
- **Content First**: Design serves the content, not the other way around

### File Structure Rules
```
content/
├── home.mdx           # Homepage content (required)
├── links.mdx          # Links page content (required)
└── posts/             # Blog posts directory
    └── *.mdx          # Individual posts

src/
├── app/               # Next.js app directory
├── lib/               # Utility functions
└── globals.css        # Monospace theme styles
```

### Content Rules
1. **All content is MDX** - No plain HTML files
2. **Frontmatter is required** - Every MDX file needs YAML frontmatter
3. **Dates use ISO format** - `YYYY-MM-DD` for consistency
4. **Lowercase filenames** - Use kebab-case for post slugs
5. **No spaces in filenames** - Use hyphens instead

### Styling Rules
1. **Monospace only** - All text uses Geist Mono font
2. **System theme** - Respects user's dark/light mode preference  
3. **No custom fonts** - Stick to the monospace constraint
4. **Minimal colors** - Uses CSS custom properties for theming

### Development Rules
1. **Use Biome** - For linting and formatting (not Prettier/ESLint)
2. **Use Turbopack** - Enabled for faster builds and dev server
3. **TypeScript strict** - All code should be properly typed
4. **No runtime errors** - Build should complete without warnings

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Content**: MDX with gray-matter for frontmatter
- **Styling**: Tailwind CSS with custom monospace theme
- **Math**: KaTeX for LaTeX rendering
- **Code**: rehype-highlight for syntax highlighting
- **Font**: Geist Mono (Google Fonts)
- **Linting**: Biome (replaces ESLint + Prettier)
- **Runtime**: Bun (Node.js alternative)
