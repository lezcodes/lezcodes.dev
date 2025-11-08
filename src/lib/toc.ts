/**
 * Table of Contents utilities
 * Extracts headings from MDX content for navigation
 */

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Extracts headings (h2, h3) from MDX content
 */
export function extractHeadings(content: string): TocHeading[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm;
  const headings: TocHeading[] = [];

  for (const match of content.matchAll(headingRegex)) {
    const level = match[0].indexOf(" ");
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    headings.push({ id, text, level });
  }

  return headings;
}
