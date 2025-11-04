import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getHomeData } from "@/lib/home";
import { mdxOptions } from "@/lib/mdx";
import { getAllPosts } from "@/lib/posts";
import { generatePageMetadata } from "@/lib/seo";
import { getAllVaultItems } from "@/lib/vault";

export const metadata: Metadata = generatePageMetadata({
  title: "Carlos Lezama - ML & Software Engineer",
  description:
    "Hola! I'm lez, ML and software engineer. Economics graduate from ITAM. Currently leading the platform team at Monopolio. Previously at RappiCard and Didi Food.",
});

export default function Home() {
  const homeData = getHomeData();
  const posts = getAllPosts();
  const vaultItems = getAllVaultItems();

  return (
    <div className="content">
      {/* Main content */}
      <MDXRemote source={homeData.content} options={mdxOptions} />

      {/* Posts Section */}
      <section className="section">
        <h3>
          <Link href="/posts">posts</Link>
        </h3>
        {posts && posts.length > 0 ? (
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.slug} className="post-item">
                <Link href={`/posts/${post.slug}`}>
                  <span className="post-title">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>¯\_(ツ)_/¯ no posts yet</p>
        )}
      </section>

      {/* Vault Section */}
      <section className="section">
        <h3>
          <Link href="/vault">vault</Link>
        </h3>
        {vaultItems && vaultItems.length > 0 ? (
          <ul className="posts-list">
            {vaultItems.map((item) => (
              <li key={item.slug} className="post-item">
                <Link href={`/vault/${item.slug}`}>
                  <span className="post-title">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>¯\_(ツ)_/¯ no vault items yet</p>
        )}
      </section>

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
