import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

interface ContentItem {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  readingTime?: string;
}

interface GenerateContentMetadataParams {
  slug: string;
  content: ContentItem | null;
  basePath: "posts" | "vault";
  defaultDescription?: string;
}

export function generateContentMetadata({
  slug,
  content,
  basePath,
  defaultDescription,
}: GenerateContentMetadataParams): Metadata {
  if (!content) {
    return generatePageMetadata({
      title: `${basePath === "posts" ? "post" : "vault item"} not found`,
      description: `the ${basePath === "posts" ? "post" : "vault item"} you're looking for doesn't exist. maybe it wandered off?`,
      path: `/${basePath}/${slug}`,
    });
  }

  const description =
    content.excerpt ||
    defaultDescription ||
    `${content.title} - by carlos lezama`;

  return generatePageMetadata({
    title: content.title,
    description,
    path: `/${basePath}/${slug}`,
    type: basePath === "posts" ? "article" : undefined,
    publishedTime: basePath === "posts" ? content.date : undefined,
  });
}
