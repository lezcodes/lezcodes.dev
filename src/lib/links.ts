import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const linksFile = path.join(process.cwd(), "content/links.mdx");

export interface LinkItem {
  title: string;
  url: string;
}

export interface LinksData {
  title: string;
  links: LinkItem[];
  content: string;
}

export function getLinksData(): LinksData {
  const fileContents = fs.readFileSync(linksFile, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    links: data.links,
    content,
  };
}
