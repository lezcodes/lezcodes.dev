import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getHomeData } from "@/lib/home";
import { mdxOptions } from "@/lib/mdx";
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
    <div className="content">
      {/* Main content */}
      <MDXRemote source={homeData.content} options={mdxOptions} />

      {/* Posts Section */}
      {posts && posts.length > 0 && (
        <section className="section">
          <h3>posts</h3>
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.slug} className="post-item">
                <Link href={`/posts/${post.slug}`}>
                  <span className="post-title">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Share Section */}
      {shares && shares.length > 0 && (
        <section className="section">
          <h3>share</h3>
          <ul className="posts-list">
            {shares.map((share) => (
              <li key={share.slug} className="post-item">
                <Link href={`/share/${share.slug}`}>
                  <span className="post-title">{share.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Links Section */}
      {homeData.links && homeData.links.length > 0 && (
        <section className="section">
          <h3>links</h3>
          <ul className="links-list">
            {homeData.links.map((link) => {
              const isExternal = link.url.startsWith("http");
              return (
                <li key={link.url}>
                  <a
                    href={link.url}
                    {...(isExternal && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
