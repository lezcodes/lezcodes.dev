import type { TocHeading } from "@/lib/toc";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="toc">
      <div className="toc-title">contents</div>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`toc-item toc-level-${heading.level}`}
          >
            <a href={`#${heading.id}`} className="toc-link">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
