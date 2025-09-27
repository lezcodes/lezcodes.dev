import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { getHomeData } from "@/lib/home";

export default function Home() {
  const homeData = getHomeData();

  return (
    <div className="mono-content">
      <h1>{homeData.title}</h1>
      <p className="mono-subtitle">{homeData.subtitle}</p>

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
          <h2>links</h2>
          <div className="mono-tags">
            {homeData.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-tag mono-tag-link"
              >
                {link.title}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {homeData.projects && homeData.projects.length > 0 && (
        <section className="mono-section">
          <h2>projects</h2>
          <div className="mono-tags">
            {homeData.projects.map((project, index) =>
              project.url
                ? (
                  <a
                    key={index}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-tag mono-tag-link"
                  >
                    {project.title}
                  </a>
                )
                : (
                  <span
                    key={index}
                    className="mono-tag mono-tag-hover"
                  >
                    {project.title} 🚧
                  </span>
                )
            )}
          </div>
        </section>
      )}

      {/* Technologies Section */}
      {homeData.technologies && homeData.technologies.length > 0 && (
        <section className="mono-section">
          <h2>technologies</h2>
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
