/**
 * Integration tests for posts collection
 */

import { describe, expect, test } from "bun:test";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "./posts";

describe("Posts Integration", () => {
  test("getAllPosts returns array of posts", () => {
    const posts = getAllPosts();

    expect(Array.isArray(posts)).toBe(true);

    if (posts.length > 0) {
      const post = posts[0];
      expect(post).toHaveProperty("slug");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("readingTime");
    }
  });

  test("posts are sorted by date (newest first)", () => {
    const posts = getAllPosts();

    if (posts.length > 1) {
      for (let i = 0; i < posts.length - 1; i++) {
        expect(posts[i].date >= posts[i + 1].date).toBe(true);
      }
    }
  });

  test("getAllPostSlugs returns array of slugs", () => {
    const slugs = getAllPostSlugs();

    expect(Array.isArray(slugs)).toBe(true);

    slugs.forEach((slug) => {
      expect(typeof slug).toBe("string");
      expect(slug.length).toBeGreaterThan(0);
    });
  });

  test("getPostBySlug returns correct post", () => {
    const slugs = getAllPostSlugs();

    if (slugs.length > 0) {
      const slug = slugs[0];
      const post = getPostBySlug(slug);

      expect(post.slug).toBe(slug);
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("content");
    }
  });

  test("post slugs match getAllPosts results", () => {
    const posts = getAllPosts();
    const slugs = getAllPostSlugs();

    expect(posts.length).toBe(slugs.length);

    posts.forEach((post) => {
      expect(slugs).toContain(post.slug);
    });
  });
});
