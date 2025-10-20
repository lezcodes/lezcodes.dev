import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { StructuredData } from "@/components/StructuredData";
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
            <div className="meta-panel">
              <div className="meta-section">
                <div className="meta-label">DATE:</div>
                <div className="meta-value">
                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </div>
              {post.readingTime && (
                <div className="meta-section">
                  <div className="meta-label">READING TIME:</div>
                  <div className="meta-value">{post.readingTime}</div>
                </div>
              )}
              <div className="meta-section">
                <div className="meta-label">SHARE:</div>
                <div className="share-buttons">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://lezcodes.dev/posts/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-button"
                  >
                    Twitter/X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://lezcodes.dev/posts/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-button"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </aside>
          <div className="article-body">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    rehypeKatex,
                    rehypeHighlight,
                  ],
                },
              }}
            />
          </div>
        </div>
      </article>
    </>
  );
}
