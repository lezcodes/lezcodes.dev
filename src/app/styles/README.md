# Styles Architecture

Modular CSS structure following clean code principles and separation of concerns.

## Directory Structure

```
styles/
├── base/                   # Foundation styles
│   ├── variables.css      # CSS variables & theme tokens
│   ├── reset.css          # CSS reset & normalization
│   └── typography.css     # Font styles & text formatting
├── layout/                 # Page layout components
│   ├── container.css      # Main container & content areas
│   ├── header.css         # Header & navigation
│   └── footer.css         # Footer styles
├── components/             # Reusable UI components
│   ├── article.css        # Blog post & article layout
│   ├── card.css           # Content cards
│   ├── links-list.css     # Social/external links
│   ├── posts-list.css     # Post listings
│   └── toc.css            # Table of contents
└── utilities/              # Helper classes & utilities
    ├── helpers.css        # Utility classes
    └── responsive.css     # Mobile-first breakpoints
```

## Import Order

All styles are imported in `globals.css` in the following order:

1. **External dependencies** (tailwindcss, katex)
2. **Base styles** (variables → reset → typography)
3. **Layout styles** (container → header → footer)
4. **Component styles** (alphabetically)
5. **Utilities** (helpers → responsive)

## Guidelines

- **Base**: Foundation-level styles, no component-specific rules
- **Layout**: Page structure, grid systems, major sections
- **Components**: Self-contained, reusable UI elements
- **Utilities**: Helper classes, responsive overrides

## Naming Conventions

- Use BEM-like naming: `.component-name`, `.component-name__element`, `.component-name--modifier`
- Prefix layout classes: `.container`, `.header`, `.footer`
- Keep component names descriptive: `.article-body`, `.toc-link`

## Maintenance

When adding new styles:
1. Determine category (base/layout/component/utility)
2. Create new file or add to existing module
3. Import in `globals.css` in appropriate section
4. Document complex patterns with comments
