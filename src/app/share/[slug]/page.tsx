import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { generatePageMetadata } from "@/lib/seo";
import { getAllShareSlugs, getShareBySlug } from "@/lib/share";

export async function generateStaticParams() {
  const slugs = getAllShareSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const share = getShareBySlug(slug);

  return generatePageMetadata({
    title: share.title,
    description: share.excerpt || `${share.title} - Shared by Carlos Lezama`,
    path: `/share/${slug}`,
  });
}

export default async function SharePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const share = getShareBySlug(slug);

    return (
      <article className="article-content">
        <header className="article-header">
          <h1 className="article-title">{share.title}</h1>
        </header>
        <div className="article-grid">
          <aside className="article-aside">
            <div className="meta-panel">
              <div className="meta-section">
                <div className="meta-label">DATE:</div>
                <div className="meta-value">
                  <time dateTime={share.date}>{share.date}</time>
                </div>
              </div>
              {share.readingTime && (
                <div className="meta-section">
                  <div className="meta-label">READING TIME:</div>
                  <div className="meta-value">{share.readingTime}</div>
                </div>
              )}
              <div className="meta-section">
                <div className="meta-label">SHARE:</div>
                <div className="share-buttons">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(share.title)}&url=${encodeURIComponent(`https://lezcodes.dev/share/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-button"
                  >
                    Twitter/X
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://lezcodes.dev/share/${slug}`)}`}
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
              source={share.content}
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
    );
  } catch {
    notFound();
  }
}
