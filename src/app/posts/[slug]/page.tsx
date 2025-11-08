/**
 * Blog post dynamic route.
 * Simplified using generic content page factory - following DRY principle.
 */

import { createContentPageHandlers } from "@/lib/pages/content-page-factory";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { viewport as seoViewport } from "@/lib/seo";

// Create page handlers for posts collection
const handlers = createContentPageHandlers({
  collectionType: "posts",
  getItemBySlug: getPostBySlug,
  getAllSlugs: getAllPostSlugs,
  defaultDescription: (post) =>
    `read "${post.title}" by carlos lezama (lez) - ml and software engineer. technical insights on machine learning, software engineering, and technology.`,
  includeStructuredData: true,
});

export const generateStaticParams = handlers.generateStaticParams;
export const generateMetadata = handlers.generateMetadata;
export const viewport = seoViewport;
export default handlers.PageComponent;
