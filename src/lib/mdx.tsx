import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { TheoremBlock } from "@/components/TheoremBlock";
import { rehypeLazyKatex } from "./rehype-lazy-katex";

export const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      rehypeLazyKatex, // Custom plugin for lazy math rendering
      rehypeHighlight,
    ],
  },
};

interface TheoremProps {
  title?: string;
  children: ReactNode;
}

export const mdxComponents = {
  Theorem: (props: TheoremProps) => <TheoremBlock type="theorem" {...props} />,
  Lemma: (props: TheoremProps) => <TheoremBlock type="lemma" {...props} />,
  Corollary: (props: TheoremProps) => (
    <TheoremBlock type="corollary" {...props} />
  ),
  Proposition: (props: TheoremProps) => (
    <TheoremBlock type="proposition" {...props} />
  ),
  Definition: (props: TheoremProps) => (
    <TheoremBlock type="definition" {...props} />
  ),
  Example: (props: TheoremProps) => <TheoremBlock type="example" {...props} />,
  Remark: (props: TheoremProps) => <TheoremBlock type="remark" {...props} />,
  Notation: (props: TheoremProps) => (
    <TheoremBlock type="notation" {...props} />
  ),
  Axiom: (props: TheoremProps) => <TheoremBlock type="axiom" {...props} />,
  Conjecture: (props: TheoremProps) => (
    <TheoremBlock type="conjecture" {...props} />
  ),
  Claim: (props: TheoremProps) => <TheoremBlock type="claim" {...props} />,
  Observation: (props: TheoremProps) => (
    <TheoremBlock type="observation" {...props} />
  ),
};
