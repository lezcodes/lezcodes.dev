/**
 * Posts collection API.
 * Simplified using generic collection module - following DRY principle.
 */

import { createCollectionHelpers } from "@/lib/mdx/collection";
import type { Post } from "@/lib/types/content";

// Create collection helpers for posts
const postsCollection = createCollectionHelpers<Post>("posts");

/**
 * Get all blog posts, sorted by date (newest first)
 */
export function getAllPosts(): Post[] {
  return postsCollection.getAll();
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): Post {
  return postsCollection.getBySlug(slug);
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs(): string[] {
  return postsCollection.getSlugs();
}

// Re-export Post type for backward compatibility
export type { Post } from "@/lib/types/content";
