# Agent Guidelines for lezcodes.dev

## Commands
- **Build**: `bun run build` (uses Turbopack)
- **Test**: `bun test` (run all tests)
- **Test single file**: `bun test <path/to/file.test.ts>`
- **Lint**: `bun run lint` (uses Biome)
- **Format**: `bun run format` (auto-fix with Biome)
- **Dev**: `bun run dev` (uses Turbopack)

## Code Style
- **Formatter**: Biome (2 spaces, organize imports enabled)
- **TypeScript**: Strict mode enabled, use `@/` for src imports
- **Imports**: Organize imports automatically (Biome source actions). Use `@/` path alias for src files
- **Types**: Prefer interfaces for props, use type for unions/intersections. Define types in `@/lib/types/`
- **Components**: React Server Components by default. Use "use client" only when needed
- **Naming**: camelCase for variables/functions, PascalCase for components/types, kebab-case for files
- **Error handling**: Use `tryCatch` and `tryCatchCallback` from `@/lib/utils/error-handler` for consistent error handling
- **Comments**: JSDoc for public APIs, inline comments for complex logic only
- **Testing**: Bun test with happy-dom. Co-locate tests with source files as `*.test.ts(x)`

## Architecture
- Next.js 15 app router, MDX content in `content/`, utilities in `@/lib/`
- Follow DRY: use generic helpers (see `@/lib/mdx/collection`) instead of duplicating logic
