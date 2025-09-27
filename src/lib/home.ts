import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const homeFile = path.join(process.cwd(), "content/home.mdx");

export interface Link {
  title: string;
  url: string;
}

export interface Project {
  title: string;
  url?: string;
}

export interface HomeData {
  title: string;
  subtitle: string;
  technologies?: string[];
  links?: Link[];
  projects?: Project[];
  content: string;
}

export function getHomeData(): HomeData {
  const fileContents = fs.readFileSync(homeFile, "utf8");
  const { data, content } = matter(fileContents);

  // Sort arrays alphabetically
  const technologies = data.technologies?.sort((a: string, b: string) =>
    a.localeCompare(b)
  );
  const links = data.links?.sort((a: Link, b: Link) =>
    a.title.localeCompare(b.title)
  );
  const projects = data.projects?.sort((a: Project, b: Project) =>
    a.title.localeCompare(b.title)
  );

  return {
    title: data.title,
    subtitle: data.subtitle,
    technologies,
    links,
    projects,
    content,
  };
}
