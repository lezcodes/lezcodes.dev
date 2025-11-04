import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/mdx";
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
            <div className="meta-info">
              <time dateTime={share.date}>{share.date}</time>
              {share.readingTime && (
                <>
                  <span className="meta-separator"> ・ </span>
                  <span>{share.readingTime}</span>
                </>
              )}
            </div>
          </aside>
          <div className="article-body">
            <MDXRemote source={share.content} options={mdxOptions} />
          </div>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
