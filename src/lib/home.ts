import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const homeFile = path.join(process.cwd(), "content/home.mdx");

export interface HomeData {
  title: string;
  subtitle: string;
  content: string;
}

export function getHomeData(): HomeData {
  const fileContents = fs.readFileSync(homeFile, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    subtitle: data.subtitle,
    content,
  };
}
