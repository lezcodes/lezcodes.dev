import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
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

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
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
            rehypePlugins: [rehypeKatex, rehypeHighlight],
          },
        }}
      />
    </article>
  );
}
