# lezcodes.dev

A monospace-themed website built with Next.js and MDX, inspired by [The Monospace Web](https://github.com/owickstrom/the-monospace-web).

## Features

- **Monospace Everything**: Uses Geist Mono font exclusively throughout the site
- **MDX Blog**: Write blog posts with embedded React components
- **Math Support**: LaTeX math expressions via KaTeX
- **Code Highlighting**: Syntax highlighting for code blocks
- **Links Page**: Linktree-style page editable via MDX
- **Minimalist Design**: Clean, focused aesthetic inspired by Swiss typography
- **Dark/Light Mode**: Automatic theme switching based on system preference

## Getting Started

1. Install dependencies:
```bash
bun install
```

2. Run the development server:
```bash
bun run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Main layout with navigation
│   │   ├── page.tsx            # Landing page
│   │   ├── posts/
│   │   │   ├── page.tsx        # Blog posts index
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Individual post pages
│   │   └── links/
│   │       └── page.tsx        # Links page
│   ├── lib/
│   │   ├── posts.ts            # Blog post utilities
│   │   └── links.ts            # Links page utilities
│   └── globals.css             # Monospace-themed styles
├── content/
│   ├── posts/                  # Blog posts (.mdx files)
│   ├── home.mdx                # Homepage content
│   └── links.mdx               # Links page content
└── public/                     # Static assets
```

## Writing Content

### Homepage

Edit `content/home.mdx` to customize the homepage:

```mdx
---
title: "Your Site Title"
subtitle: "Your site description"
---

# Your Content

Write your homepage content here with full MDX support!

## Features
- Math: $E = mc^2$
- Code blocks with syntax highlighting
- And much more...
```

### Blog Posts

Create new blog posts in `content/posts/` as `.mdx` files:

```mdx
---
title: "Your Post Title"
date: "2025-01-27"
excerpt: "A brief description of your post"
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

### Links Page

Edit `content/links.mdx` to customize your links:

```mdx
---
title: "Links"
description: "Find me around the web"
links:
  - title: "GitHub"
    url: "https://github.com/yourusername"
  - title: "Twitter"
    url: "https://twitter.com/yourusername"
---

# Links

Additional content here...
```

## Customization

### Styling

The monospace theme is defined in `src/app/globals.css`. Key CSS custom properties:

- `--background`: Background color
- `--foreground`: Text color  
- `--border`: Border color
- `--muted`: Muted text color

### Typography

The site uses Geist Mono exclusively, loaded via `next/font/google` in the layout.

### Colors

The theme automatically switches between light and dark modes based on the user's system preference.

## Deployment

Build the site:

```bash
bun run build
```

The site generates static files and can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## Inspiration

This project is inspired by:

- [The Monospace Web](https://github.com/owickstrom/the-monospace-web) by Oskar Wickström
- [Geist Font](https://vercel.com/font) by Vercel
- Swiss design principles and terminal aesthetics

## License

MIT License - feel free to use this as a template for your own monospace website!
