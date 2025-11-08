import { MDXRemote } from "next-mdx-remote/rsc";
import { MathRenderer } from "@/components/MathRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { YouCanAlso } from "@/components/YouCanAlso";
import { mdxComponents, mdxOptions } from "@/lib/mdx";
import { extractHeadings } from "@/lib/toc";

interface ArticleLayoutProps {
  title: string;
  date: string;
  content: string;
  readingTime?: string;
  structuredData?: React.ReactNode;
}

export function ArticleLayout({
  title,
  date,
  content,
  readingTime,
  structuredData,
}: ArticleLayoutProps) {
  const headings = extractHeadings(content);

  return (
    <>
      {structuredData}
      <MathRenderer />
      <article className="article-content">
        <header className="article-header">
          <h1 className="article-title">{title}</h1>
        </header>
        <div className="article-grid">
          <aside className="article-aside">
            <div className="meta-info">
              <time dateTime={date}>{date}</time>
              {readingTime && (
                <>
                  <span className="meta-separator"> ・ </span>
                  <span>{readingTime}</span>
                </>
              )}
            </div>
            <TableOfContents headings={headings} />
          </aside>
          <div className="article-body">
            <MDXRemote
              source={content}
              options={mdxOptions}
              components={mdxComponents}
            />
          </div>
        </div>
        <YouCanAlso />
      </article>
    </>
  );
}
