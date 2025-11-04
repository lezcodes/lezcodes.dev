/**
 * Vault collection API.
 * Simplified using generic collection module - following DRY principle.
 */

import { createCollectionHelpers } from "@/lib/mdx/collection";
import type { VaultItem } from "@/lib/types/content";

// Create collection helpers for vault
const vaultCollection = createCollectionHelpers<VaultItem>("vault");

/**
 * Get all vault items, sorted by date (newest first)
 */
export function getAllVaultItems(): VaultItem[] {
  return vaultCollection.getAll();
}

/**
 * Get a single vault item by slug
 */
export function getVaultItemBySlug(slug: string): VaultItem {
  return vaultCollection.getBySlug(slug);
}

/**
 * Get all vault slugs for static generation
 */
export function getAllVaultSlugs(): string[] {
  return vaultCollection.getSlugs();
}

// Re-export VaultItem type for backward compatibility
export type { VaultItem } from "@/lib/types/content";
