import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { calculateReadingTime } from "./utils";

const vaultDirectory = path.join(process.cwd(), "content/vault");

export interface VaultItem {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  readingTime?: string;
  [key: string]: unknown;
}

export function getAllVaultItems(): VaultItem[] {
  // Check if directory exists
  if (!fs.existsSync(vaultDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(vaultDirectory);
  const allVaultData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(vaultDirectory, fileName);
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
      } as VaultItem;
    });

  return allVaultData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getVaultItemBySlug(slug: string): VaultItem {
  const fullPath = path.join(vaultDirectory, `${slug}.mdx`);
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
  } as VaultItem;
}

export function getAllVaultSlugs(): string[] {
  // Check if directory exists
  if (!fs.existsSync(vaultDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(vaultDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}
