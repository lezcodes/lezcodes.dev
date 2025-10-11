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
      <article className="mono-content">
        <h1>{share.title}</h1>
        <div className="mono-post-meta">
          <time dateTime={share.date}>{share.date}</time>
        </div>
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
      </article>
    );
  } catch {
    notFound();
  }
}
