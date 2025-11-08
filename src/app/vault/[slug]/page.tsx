/**
 * Vault item dynamic route.
 * Simplified using generic content page factory - following DRY principle.
 */

import { createContentPageHandlers } from "@/lib/pages/content-page-factory";
import { viewport as seoViewport } from "@/lib/seo";
import { getAllVaultSlugs, getVaultItemBySlug } from "@/lib/vault";

// Create page handlers for vault collection
const handlers = createContentPageHandlers({
  collectionType: "vault",
  getItemBySlug: getVaultItemBySlug,
  getAllSlugs: getAllVaultSlugs,
  includeStructuredData: false,
});

export const generateStaticParams = handlers.generateStaticParams;
export const generateMetadata = handlers.generateMetadata;
export const viewport = seoViewport;
export default handlers.PageComponent;
