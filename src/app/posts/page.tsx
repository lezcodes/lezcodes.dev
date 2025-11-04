import type { Metadata } from "next";
import { ContentCard } from "@/components/ContentCard";
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
            <ContentCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              basePath="posts"
            />
          ))}
        </div>
      )}
    </div>
  );
}
