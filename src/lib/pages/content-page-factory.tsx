/**
 * Generic content page factory.
 * Eliminates duplication between posts/[slug]/page.tsx and vault/[slug]/page.tsx.
 * Follows Factory Pattern and DRY principles.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { StructuredData } from "@/components/StructuredData";
import { generateContentMetadata } from "@/lib/content";
import { generateBlogPostStructuredData } from "@/lib/seo";
import type { ContentItem, ContentType } from "@/lib/types/content";

/**
 * Configuration for content page generation
 */
interface ContentPageConfig {
  collectionType: ContentType;
  getItemBySlug: (slug: string) => ContentItem;
  getAllSlugs: () => string[];
  defaultDescription?: (item: ContentItem) => string;
  includeStructuredData?: boolean;
}

/**
 * Factory function to create page handlers for a content collection
 */
export function createContentPageHandlers(config: ContentPageConfig) {
  const {
    collectionType,
    getItemBySlug,
    getAllSlugs,
    defaultDescription,
    includeStructuredData = false,
  } = config;

  /**
   * Generates static params for all items in the collection
   */
  async function generateStaticParams() {
    const slugs = getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  }

  /**
   * Generates metadata for a content page
   */
  async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }): Promise<Metadata> {
    const { slug } = await params;

    try {
      const item = getItemBySlug(slug);
      return generateContentMetadata({
        slug,
        content: item,
        basePath: collectionType,
        defaultDescription: defaultDescription?.(item),
      });
    } catch {
      return generateContentMetadata({
        slug,
        content: null,
        basePath: collectionType,
      });
    }
  }

  /**
   * Default page component for a content item
   */
  async function PageComponent({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {
    const { slug } = await params;

    try {
      const item = getItemBySlug(slug);

      const structuredData =
        includeStructuredData && collectionType === "posts"
          ? generateBlogPostStructuredData({
              title: item.title,
              description: item.excerpt,
              slug,
              publishedDate: item.date,
            })
          : undefined;

      return (
        <ArticleLayout
          title={item.title}
          date={item.date}
          content={item.content}
          readingTime={item.readingTime}
          structuredData={
            structuredData ? (
              <StructuredData data={structuredData} />
            ) : undefined
          }
        />
      );
    } catch {
      notFound();
    }
  }

  return {
    generateStaticParams,
    generateMetadata,
    PageComponent,
  };
}
