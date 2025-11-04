/**
 * Shared type definitions for content items across the application.
 * Single source of truth for all MDX-based content structures.
 */

/**
 * Base interface for all content items (posts, vault items, etc.)
 */
export interface ContentItem {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  readingTime?: string;
  [key: string]: unknown;
}

/**
 * Blog post type (alias for ContentItem for semantic clarity)
 */
export type Post = ContentItem;

/**
 * Vault item type (alias for ContentItem for semantic clarity)
 */
export type VaultItem = ContentItem;

/**
 * Content collection type discriminator
 */
export type ContentType = "posts" | "vault";

/**
 * Raw frontmatter data from MDX files
 */
export interface FrontmatterData {
  title: string;
  date: string;
  excerpt?: string;
  [key: string]: unknown;
}

/**
 * Configuration for a content collection
 */
export interface CollectionConfig {
  type: ContentType;
  directory: string;
}
