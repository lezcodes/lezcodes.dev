import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { getHomeData } from "@/lib/home";

export default function Home() {
  const homeData = getHomeData();

  return (
    <div className="mono-content">
      <h1>{homeData.title}</h1>
      <p className="mono-subtitle">{homeData.subtitle}</p>

      <MDXRemote
        source={homeData.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [rehypeKatex, rehypeHighlight],
          },
        }}
      />
    </div>
  );
}
