import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { StructuredData } from "@/components/StructuredData";
import { generateContentMetadata } from "@/lib/content";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { generateBlogPostStructuredData } from "@/lib/seo";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug);
    return generateContentMetadata({
      slug,
      content: post,
      basePath: "posts",
      defaultDescription: `Read "${post.title}" by Carlos Lezama (lez) - ML and Software Engineer. Technical insights on machine learning, software engineering, and technology.`,
    });
  } catch {
    return generateContentMetadata({
      slug,
      content: null,
      basePath: "posts",
    });
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug);

    const structuredData = generateBlogPostStructuredData({
      title: post.title,
      description: post.excerpt,
      slug,
      publishedDate: post.date,
    });

    return (
      <ArticleLayout
        title={post.title}
        date={post.date}
        content={post.content}
        readingTime={post.readingTime}
        structuredData={<StructuredData data={structuredData} />}
      />
    );
  } catch {
    notFound();
  }
}
