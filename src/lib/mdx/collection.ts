/**
 * Generic content collection manager.
 * Replaces duplicated logic in posts.ts and vault.ts.
 * Follows Open/Closed Principle - open for extension, closed for modification.
 */

import path from "node:path";
import type { ContentItem, ContentType } from "@/lib/types/content";
import {
  extractSlug,
  listMdxFiles,
  readContentItem,
  sortByDate,
} from "./file-operations";

/**
 * Configuration for content collections
 */
const COLLECTION_CONFIG: Record<
  ContentType,
  { directory: string; basePath: string }
> = {
  posts: {
    directory: path.join(process.cwd(), "content/posts"),
    basePath: "/posts",
  },
  vault: {
    directory: path.join(process.cwd(), "content/vault"),
    basePath: "/vault",
  },
};

/**
 * Generic function to get all items from a content collection
 */
export function getCollectionItems<T extends ContentItem = ContentItem>(
  collectionType: ContentType,
): T[] {
  const config = COLLECTION_CONFIG[collectionType];
  const fileNames = listMdxFiles(config.directory);

  const items = fileNames
    .map((fileName) => {
      const slug = extractSlug(fileName);
      const fullPath = path.join(config.directory, fileName);
      return readContentItem(fullPath, slug) as T;
    })
    .filter((item) => item.date && item.title); // Filter out items without required frontmatter

  return sortByDate(items);
}

/**
 * Generic function to get a single item by slug from a collection
 */
export function getCollectionItemBySlug<T extends ContentItem = ContentItem>(
  collectionType: ContentType,
  slug: string,
): T {
  const config = COLLECTION_CONFIG[collectionType];
  const fullPath = path.join(config.directory, `${slug}.mdx`);
  return readContentItem(fullPath, slug) as T;
}

/**
 * Generic function to get all slugs from a collection
 * Only returns slugs for items with valid frontmatter
 */
export function getCollectionSlugs(collectionType: ContentType): string[] {
  const items = getCollectionItems(collectionType);
  return items.map((item) => item.slug);
}

/**
 * Factory function to create collection-specific helpers
 */
export function createCollectionHelpers<T extends ContentItem = ContentItem>(
  collectionType: ContentType,
) {
  return {
    getAll: () => getCollectionItems<T>(collectionType),
    getBySlug: (slug: string) =>
      getCollectionItemBySlug<T>(collectionType, slug),
    getSlugs: () => getCollectionSlugs(collectionType),
  };
}
