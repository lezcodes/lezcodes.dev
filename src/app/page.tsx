import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { getHomeData } from "@/lib/home";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Carlos Lezama - ML & Software Engineer",
  description:
    "Hola! I'm lez, ML and software engineer. Economics graduate from ITAM. Currently leading the platform team at Monopolio. Previously at RappiCard and Didi Food.",
});

// Function to render icon by name
function renderIcon(iconName: string) {
  const IconComponent = (LucideIcons as Record<string, unknown>)[
    iconName
  ] as LucideIcon;
  if (!IconComponent) return null;
  return <IconComponent size={16} />;
}

export default function Home() {
  const homeData = getHomeData();

  return (
    <div className="mono-content">
      {/* Content between title and technologies */}
      <MDXRemote
        source={homeData.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap" }],
              rehypeKatex,
              rehypeHighlight,
            ],
          },
        }}
      />

      {/* Links Section */}
      {homeData.links && homeData.links.length > 0 && (
        <section className="mono-section">
          <h3 className="mono-section-header-left">links</h3>
          <div className="mono-tags">
            {homeData.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-tag mono-tag-link"
              >
                {renderIcon(link.icon)}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {homeData.projects && homeData.projects.length > 0 && (
        <section className="mono-section">
          <h3 className="mono-section-header-left">projects</h3>
          <div className="mono-tags">
            {homeData.projects.map((project) =>
              project.url ? (
                <a
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-tag mono-tag-link"
                >
                  {project.title}
                </a>
              ) : (
                <span key={project.title} className="mono-tag mono-tag-hover">
                  {project.title} 🚧
                </span>
              ),
            )}
          </div>
        </section>
      )}

      {/* Technologies Section */}
      {homeData.technologies && homeData.technologies.length > 0 && (
        <section className="mono-section">
          <h3 className="mono-section-header-left">technologies</h3>
          <div className="mono-tags">
            {homeData.technologies.map((tech) => (
              <span key={tech} className="mono-tag mono-tag-hover">
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
