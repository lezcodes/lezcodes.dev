/**
 * Unit tests for MDX file operations
 */

import { describe, expect, test } from "bun:test";
import {
  extractSlug,
  isMdxFile,
  parseFrontmatter,
  sortByDate,
  transformToContentItem,
} from "./file-operations";

describe("extractSlug", () => {
  test("extracts slug from .mdx filename", () => {
    expect(extractSlug("my-post.mdx")).toBe("my-post");
    expect(extractSlug("another-file.mdx")).toBe("another-file");
  });

  test("handles complex filenames", () => {
    expect(extractSlug("my-complex-post-name.mdx")).toBe(
      "my-complex-post-name",
    );
  });
});

describe("isMdxFile", () => {
  test("returns true for .mdx files", () => {
    expect(isMdxFile("post.mdx")).toBe(true);
    expect(isMdxFile("file.mdx")).toBe(true);
  });

  test("returns false for non-.mdx files", () => {
    expect(isMdxFile("post.md")).toBe(false);
    expect(isMdxFile("post.txt")).toBe(false);
    expect(isMdxFile("post")).toBe(false);
    expect(isMdxFile("post.mdx.backup")).toBe(false);
  });
});

describe("parseFrontmatter", () => {
  test("parses frontmatter and content", () => {
    const content = `---
title: Test Post
date: "2024-01-01"
excerpt: A test excerpt
---

This is the content.`;

    const result = parseFrontmatter(content);

    expect(result.data.title).toBe("Test Post");
    expect(result.data.date).toBe("2024-01-01");
    expect(result.data.excerpt).toBe("A test excerpt");
    expect(result.content).toContain("This is the content.");
  });

  test("handles content without frontmatter", () => {
    const content = "Just some content without frontmatter.";
    const result = parseFrontmatter(content);

    expect(result.content).toBe(content);
  });
});

describe("transformToContentItem", () => {
  test("transforms frontmatter data to ContentItem", () => {
    const data = {
      title: "Test Post",
      date: "2024-01-01",
      excerpt: "Test excerpt",
    };
    const content = "Test content with some words for reading time.";
    const slug = "test-post";

    const result = transformToContentItem(data, content, slug);

    expect(result.slug).toBe("test-post");
    expect(result.title).toBe("Test Post");
    expect(result.date).toBe("2024-01-01");
    expect(result.excerpt).toBe("Test excerpt");
    expect(result.content).toBe(content);
    expect(result.readingTime).toBeDefined();
  });

  test("handles optional fields", () => {
    const data = {
      title: "Test Post",
      date: "2024-01-01",
    };
    const content = "Test content.";
    const slug = "test-post";

    const result = transformToContentItem(data, content, slug);

    expect(result.excerpt).toBeUndefined();
    expect(result.title).toBe("Test Post");
  });
});

describe("sortByDate", () => {
  test("sorts items by date (newest first)", () => {
    const items = [
      { date: "2024-01-01", title: "Old" },
      { date: "2024-12-01", title: "New" },
      { date: "2024-06-01", title: "Middle" },
    ];

    const sorted = sortByDate(items);

    expect(sorted[0].title).toBe("New");
    expect(sorted[1].title).toBe("Middle");
    expect(sorted[2].title).toBe("Old");
  });

  test("handles same dates", () => {
    const items = [
      { date: "2024-01-01", title: "A" },
      { date: "2024-01-01", title: "B" },
    ];

    const sorted = sortByDate(items);

    expect(sorted.length).toBe(2);
  });

  test("handles empty array", () => {
    const sorted = sortByDate([]);
    expect(sorted).toEqual([]);
  });
});
