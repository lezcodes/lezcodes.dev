/**
 * Atomic file operations for MDX content.
 * Pure functions for reading, parsing, and transforming MDX files.
 */

import fs from "node:fs";
import matter from "gray-matter";
import type { ContentItem, FrontmatterData } from "@/lib/types/content";
import { calculateReadingTime } from "@/lib/utils";

/**
 * Reads an MDX file and returns its raw content
 */
export function readMdxFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

/**
 * Parses frontmatter from MDX content
 */
export function parseFrontmatter(fileContents: string): {
  data: FrontmatterData;
  content: string;
} {
  const { data, content } = matter(fileContents);
  return {
    data: data as FrontmatterData,
    content,
  };
}

/**
 * Transforms parsed frontmatter and content into a ContentItem
 */
export function transformToContentItem(
  data: FrontmatterData,
  content: string,
  slug: string,
): ContentItem {
  return {
    ...data,
    slug,
    content,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    readingTime: calculateReadingTime(content),
  };
}

/**
 * Reads and parses a single MDX file into a ContentItem
 */
export function readContentItem(filePath: string, slug: string): ContentItem {
  const fileContents = readMdxFile(filePath);
  const { data, content } = parseFrontmatter(fileContents);
  return transformToContentItem(data, content, slug);
}

/**
 * Extracts slug from filename
 */
export function extractSlug(fileName: string): string {
  return fileName.replace(/\.mdx$/, "");
}

/**
 * Checks if a file is an MDX file
 */
export function isMdxFile(fileName: string): boolean {
  return fileName.endsWith(".mdx");
}

/**
 * Lists all MDX files in a directory
 */
export function listMdxFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs.readdirSync(directory).filter(isMdxFile);
}

/**
 * Sorts content items by date (newest first)
 */
export function sortByDate<T extends { date: string }>(items: T[]): T[] {
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}
