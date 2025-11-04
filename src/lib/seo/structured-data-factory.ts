/**
 * Structured data factory helpers.
 * Provides reusable builders for common structured data patterns.
 */

import { seoConfig } from "@/lib/seo/config";

/**
 * Base schema context
 */
const SCHEMA_CONTEXT = "https://schema.org";

/**
 * Creates a Person schema object
 */
export function createPersonSchema(overrides?: {
  name?: string;
  alternateName?: string;
  url?: string;
  image?: string;
}) {
  return {
    "@type": "Person",
    name: overrides?.name || seoConfig.author.name,
    alternateName: overrides?.alternateName || seoConfig.author.nickname,
    url: overrides?.url || seoConfig.siteUrl,
    ...(overrides?.image && { image: overrides.image }),
  };
}

/**
 * Creates a WebPage schema object
 */
export function createWebPageSchema(params: { id: string; url?: string }) {
  return {
    "@type": "WebPage",
    "@id": params.id,
    ...(params.url && { url: params.url }),
  };
}

/**
 * Creates an Organization schema object
 */
export function createOrganizationSchema(params: {
  name: string;
  url: string;
}) {
  return {
    "@type": "Organization",
    name: params.name,
    url: params.url,
  };
}

/**
 * Generic structured data wrapper
 */
export function createStructuredData<T extends Record<string, unknown>>(
  type: string,
  data: T,
) {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": type,
    ...data,
  };
}

/**
 * Factory for creating article/blog post structured data
 */
export function createArticleStructuredData(params: {
  type?: "Article" | "BlogPosting" | "NewsArticle";
  headline: string;
  description?: string;
  image: string;
  author: ReturnType<typeof createPersonSchema>;
  publisher:
    | ReturnType<typeof createPersonSchema>
    | ReturnType<typeof createOrganizationSchema>;
  datePublished: string;
  dateModified?: string;
  mainEntityOfPage: ReturnType<typeof createWebPageSchema>;
  url: string;
}) {
  return createStructuredData(params.type || "BlogPosting", {
    headline: params.headline,
    description: params.description,
    image: params.image,
    author: params.author,
    publisher: params.publisher,
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    mainEntityOfPage: params.mainEntityOfPage,
    url: params.url,
  });
}

/**
 * Reusable author person schema
 */
export const defaultAuthorSchema = createPersonSchema();

/**
 * Reusable publisher schema (same as author for personal site)
 */
export const defaultPublisherSchema = createPersonSchema();
