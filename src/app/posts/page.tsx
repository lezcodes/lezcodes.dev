import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { getAllPosts } from "@/lib/posts";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "blog posts",
  description:
    "technical blog posts about machine learning, software engineering, and technology by carlos lezama (lez). insights on python, go, typescript, ai/ml, and platform engineering.",
  path: "/posts",
});

export default function PostsPage() {
  const posts = getAllPosts();

  return <ListingPage title="posts" items={posts} basePath="posts" />;
}
