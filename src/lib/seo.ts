// SEO Configuration for lezcodes.dev
// This file contains all SEO-related constants and configurations

import type { Metadata, Viewport } from "next";
import { seoConfig } from "@/lib/seo/config";

// Re-export config for backward compatibility
export { seoConfig };

// Viewport configuration (Next.js 15+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Helper function to generate page metadata
export function generatePageMetadata({
  title,
  description,
  path = "/",
  image = seoConfig.defaultOgImage,
  type = "website",
  publishedTime,
  keywords,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = title
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;
  const fullDescription = description || seoConfig.defaultDescription;
  const fullUrl = `${seoConfig.siteUrl}${path}`;
  const fullImageUrl = image.startsWith("http")
    ? image
    : `${seoConfig.siteUrl}${image}`;

  return {
    title: {
      default: fullTitle,
      template: `%s | ${seoConfig.siteName}`,
    },
    description: fullDescription,
    keywords: keywords || seoConfig.keywords,
    authors: [{ name: seoConfig.author.name, url: seoConfig.siteUrl }],
    creator: seoConfig.author.name,
    publisher: seoConfig.author.name,
    metadataBase: new URL(seoConfig.siteUrl),
    openGraph: {
      title: title || seoConfig.defaultTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title
            ? `${title} - ${seoConfig.author.name}`
            : seoConfig.author.name,
        },
      ],
      locale: "en_US",
      type,
      ...(publishedTime && { publishedTime }),
      ...(type === "article" && { authors: [seoConfig.author.name] }),
    },
    twitter: {
      card: "summary_large_image",
      title: title || seoConfig.defaultTitle,
      description: fullDescription,
      images: [fullImageUrl],
      site: seoConfig.author.twitter,
      creator: seoConfig.author.twitter,
    },
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: seoConfig.analytics.googleVerification,
    },
    ...(type === "article" && {
      authors: [{ name: seoConfig.author.name, url: seoConfig.siteUrl }],
    }),
  };
}

// Structured data generators
import {
  createArticleStructuredData,
  createOrganizationSchema,
  createPersonSchema,
  createStructuredData,
  createWebPageSchema,
  defaultAuthorSchema,
  defaultPublisherSchema,
} from "@/lib/seo/structured-data-factory";

export function generatePersonStructuredData() {
  return createStructuredData("Person", {
    ...createPersonSchema(),
    image: `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`,
    jobTitle: "ML & Software Engineer",
    worksFor: createOrganizationSchema({
      name: "Monopolio",
      url: "https://monopolio.com.mx/",
    }),
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Instituto Tecnológico Autónomo de México",
      alternateName: "ITAM",
      url: "https://www.itam.mx/",
    },
    knowsAbout: [
      "Machine Learning",
      "Software Engineering",
      "Python",
      "Go",
      "TypeScript",
      "Artificial Intelligence",
      "Platform Engineering",
      "Backend Development",
    ],
    sameAs: seoConfig.socialLinks,
  });
}

export function generateBlogPostStructuredData({
  title,
  description,
  slug,
  publishedDate,
}: {
  title: string;
  description?: string;
  slug: string;
  publishedDate: string;
}) {
  const postUrl = `${seoConfig.siteUrl}/posts/${slug}`;

  return createArticleStructuredData({
    type: "BlogPosting",
    headline: title,
    description:
      description ||
      `technical blog post by ${seoConfig.author.name} about ${title}`,
    image: `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`,
    author: defaultAuthorSchema,
    publisher: defaultPublisherSchema,
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: createWebPageSchema({
      id: postUrl,
      url: postUrl,
    }),
    url: postUrl,
  });
}
