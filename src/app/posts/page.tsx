import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog Posts",
  description:
    "Technical blog posts about machine learning, software engineering, and technology by Carlos Lezama (lez). Insights on Python, Go, TypeScript, AI/ML, and platform engineering.",
  path: "/posts",
});

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="content">
      <h1>posts</h1>

      {posts.length === 0 ? (
        <p>No posts yet. Check back soon!</p>
      ) : (
        <div className="card-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="card">
              <div className="card-title">{post.title}</div>
              <div className="card-date">{post.date}</div>
              {post.excerpt && <p className="card-excerpt">{post.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
