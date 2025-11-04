import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
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

  return <ListingPage title="posts" items={posts} basePath="posts" />;
}
