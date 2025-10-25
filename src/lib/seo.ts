// SEO Configuration for lezcodes.dev
// This file contains all SEO-related constants and configurations

import type { Metadata } from "next";

export const seoConfig = {
  // Basic site information
  siteName: "lezcodes.dev",
  siteUrl: "https://lezcodes.dev",

  // Personal information
  author: {
    name: "Carlos Lezama",
    nickname: "lez",
    email: "carloselezamaj@gmail.com",
    twitter: "@lezcodes",
    github: "https://github.com/lezcodes",
    linkedin: "https://linkedin.com/in/lezcodes",
  },

  // Default metadata
  defaultTitle: "Carlos Lezama - ML & Software Engineer | lezcodes.dev",
  defaultDescription:
    "Carlos Lezama (lez) - ML and Software Engineer with expertise in Python, Go, TypeScript, and AI/ML. Platform team lead at Monopolio. Economics graduate from ITAM.",

  // Open Graph default image
  defaultOgImage: "/cookie.png",

  // Keywords for the site
  keywords: [
    "Carlos Lezama",
    "lez",
    "lezcodes",
    "machine learning engineer",
    "software engineer",
    "ML engineer",
    "Python developer",
    "Go developer",
    "TypeScript developer",
    "AI engineer",
    "platform engineering",
    "Monopolio",
    "RappiCard",
    "Didi Food",
    "ITAM",
    "economics",
    "software development",
    "artificial intelligence",
    "backend development",
    "full stack developer",
    "retrieval-augmented generation",
    "model context protocol",
    "tensorflow",
    "pytorch",
    "postgresql",
    "redis",
    "docker",
    "terraform",
    "aws",
    "gcp",
  ],

  // Social media links
  socialLinks: [
    "https://github.com/lezcodes",
    "https://instagram.com/lezcodes",
    "https://linkedin.com/in/lezcodes",
    "https://x.com/lezcodes",
    "https://open.spotify.com/user/lezcodes",
  ],

  // Google Analytics / Verification codes
  analytics: {
    googleVerification: "your-google-verification-code", // TODO: Replace with actual Google Search Console verification code
    googleAnalyticsId: "G-XXXXXXXXXX", // TODO: Replace with your actual GA4 ID
  },
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
export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seoConfig.author.name,
    alternateName: seoConfig.author.nickname,
    url: seoConfig.siteUrl,
    image: `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`,
    jobTitle: "ML & Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Monopolio",
      url: "https://monopolio.com.mx/",
    },
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
  };
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
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description:
      description ||
      `Technical blog post by ${seoConfig.author.name} about ${title}`,
    image: `${seoConfig.siteUrl}${seoConfig.defaultOgImage}`,
    author: {
      "@type": "Person",
      name: seoConfig.author.name,
      alternateName: seoConfig.author.nickname,
      url: seoConfig.siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: seoConfig.author.name,
      url: seoConfig.siteUrl,
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${seoConfig.siteUrl}/posts/${slug}`,
    },
    url: `${seoConfig.siteUrl}/posts/${slug}`,
  };
}
