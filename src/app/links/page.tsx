import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { getLinksData } from "@/lib/links";

export default function LinksPage() {
  const linksData = getLinksData();

  return (
    <div className="mono-content">
      <h1>{linksData.title}</h1>

      {linksData.links.length > 0 && (
        <div className="mono-links-grid">
          {linksData.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-link-item"
            >
              <div className="mono-link-title">{link.title}</div>
            </a>
          ))}
        </div>
      )}

      <div className="mono-content">
        <MDXRemote
          source={linksData.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkMath],
              rehypePlugins: [rehypeKatex, rehypeHighlight],
            },
          }}
        />
      </div>
    </div>
  );
}
