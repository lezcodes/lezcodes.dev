import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { StructuredData } from "@/components/StructuredData";
import { mdxOptions } from "@/lib/mdx";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import {
  generateBlogPostStructuredData,
  generatePageMetadata,
} from "@/lib/seo";

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
  const post = getPostBySlug(slug);

  const description =
    post.excerpt ||
    `Read "${post.title}" by Carlos Lezama (lez) - ML and Software Engineer. Technical insights on machine learning, software engineering, and technology.`;

  return generatePageMetadata({
    title: post.title,
    description,
    path: `/posts/${slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const structuredData = generateBlogPostStructuredData({
    title: post.title,
    description: post.excerpt,
    slug,
    publishedDate: post.date,
  });

  return (
    <>
      <StructuredData data={structuredData} />
      <article className="article-content">
        <header className="article-header">
          <h1 className="article-title">{post.title}</h1>
        </header>
        <div className="article-grid">
          <aside className="article-aside">
            <div className="meta-info">
              <time dateTime={post.date}>{post.date}</time>
              {post.readingTime && (
                <>
                  <span className="meta-separator"> ・ </span>
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>
          </aside>
          <div className="article-body">
            <MDXRemote source={post.content} options={mdxOptions} />
          </div>
        </div>
      </article>
    </>
  );
}
