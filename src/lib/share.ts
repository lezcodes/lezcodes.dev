import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const shareDirectory = path.join(process.cwd(), "content/share");

export interface Share {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  readingTime?: string;
  [key: string]: unknown;
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllShares(): Share[] {
  // Check if directory exists
  if (!fs.existsSync(shareDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(shareDirectory);
  const allSharesData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(shareDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        readingTime: calculateReadingTime(content),
        ...data,
      } as Share;
    });

  return allSharesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getShareBySlug(slug: string): Share {
  const fullPath = path.join(shareDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    readingTime: calculateReadingTime(content),
    ...data,
  } as Share;
}

export function getAllShareSlugs(): string[] {
  // Check if directory exists
  if (!fs.existsSync(shareDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(shareDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
