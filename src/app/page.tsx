import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { getHomeData } from "@/lib/home";
import { getAllPosts } from "@/lib/posts";
import { generatePageMetadata } from "@/lib/seo";
import { getAllShares } from "@/lib/share";

export const metadata: Metadata = generatePageMetadata({
  title: "Carlos Lezama - ML & Software Engineer",
  description:
    "Hola! I'm lez, ML and software engineer. Economics graduate from ITAM. Currently leading the platform team at Monopolio. Previously at RappiCard and Didi Food.",
});

export default function Home() {
  const homeData = getHomeData();
  const posts = getAllPosts();
  const shares = getAllShares();

  return (
    <div className="mono-content">
      {/* Content between title and technologies */}
      <MDXRemote
        source={homeData.content}
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

      {/* Posts Section */}
      {posts && posts.length > 0 && (
        <section className="mono-section">
          <h3 className="mono-section-header-left">posts</h3>
          {posts.map((post) => (
            <p key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                <span className="post-date">{post.date}</span>
                <span className="post-separator"> ✦ </span>
                <span className="post-title">{post.title}</span>
              </Link>
            </p>
          ))}
        </section>
      )}

      {/* Share Section */}
      {shares && shares.length > 0 && (
        <section className="mono-section">
          <h3 className="mono-section-header-left">share</h3>
          {shares.map((share) => (
            <p key={share.slug}>
              <Link href={`/share/${share.slug}`}>
                <span className="post-date">{share.date}</span>
                <span className="post-separator"> ✦ </span>
                <span className="post-title">{share.title}</span>
              </Link>
            </p>
          ))}
        </section>
      )}

      {/* Links Section */}
      {homeData.links && homeData.links.length > 0 && (
        <section className="mono-section">
          <h3 className="mono-section-header-left">links</h3>
          <p>
            {homeData.links.map((link, index, array) => {
              const isExternal = link.url.startsWith("http");
              return (
                <span key={link.url}>
                  <a
                    href={link.url}
                    {...(isExternal && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {link.label}
                  </a>
                  {index < array.length - 1 && " ✦ "}
                </span>
              );
            })}
          </p>
        </section>
      )}
    </div>
  );
}
