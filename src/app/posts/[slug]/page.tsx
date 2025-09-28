import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

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

  const title = `${post.title} - Carlos Lezama`;
  const description =
    post.excerpt ||
    `Read "${post.title}" by Carlos Lezama (lez) - ML and Software Engineer. Technical insights on machine learning, software engineering, and technology.`;
  const url = `https://lezcodes.dev/posts/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: "lezcodes.dev",
      images: [
        {
          url: "/cookie.PNG",
          width: 1200,
          height: 630,
          alt: `${post.title} - Carlos Lezama`,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: ["Carlos Lezama"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: ["/cookie.PNG"],
    },
    alternates: {
      canonical: url,
    },
    authors: [{ name: "Carlos Lezama", url: "https://lezcodes.dev" }],
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description:
      post.excerpt ||
      `Technical blog post by Carlos Lezama about ${post.title}`,
    image: "https://lezcodes.dev/cookie.PNG",
    author: {
      "@type": "Person",
      name: "Carlos Lezama",
      alternateName: "lez",
      url: "https://lezcodes.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Carlos Lezama",
      url: "https://lezcodes.dev",
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://lezcodes.dev/posts/${slug}`,
    },
    url: `https://lezcodes.dev/posts/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="mono-content">
        <header className="mono-post-meta">
          <h1>{post.title}</h1>
          <time dateTime={post.date}>{post.date}</time>
        </header>

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
      </article>
    </>
  );
}
