import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="mono-content">
      <h1>posts</h1>

      {posts.length === 0 ? (
        <p>No posts yet. Check back soon!</p>
      ) : (
        <ul className="mono-post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="mono-post-card">
                <div className="mono-post-title">{post.title}</div>
                <div className="mono-post-date">{post.date}</div>
                {post.excerpt && (
                  <p className="mono-post-excerpt">{post.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
