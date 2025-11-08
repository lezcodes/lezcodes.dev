import type { ReactNode } from "react";
import "./theorem-blocks.css";

interface TheoremBlockProps {
  type:
    | "theorem"
    | "lemma"
    | "corollary"
    | "proposition"
    | "definition"
    | "example"
    | "remark"
    | "notation"
    | "axiom"
    | "conjecture"
    | "claim"
    | "observation";
  title?: string;
  children: ReactNode;
}

export function TheoremBlock({ type, title, children }: TheoremBlockProps) {
  const typeLabels = {
    theorem: "theorem",
    lemma: "lemma",
    corollary: "corollary",
    proposition: "proposition",
    definition: "definition",
    example: "example",
    remark: "remark",
    notation: "notation",
    axiom: "axiom",
    conjecture: "conjecture",
    claim: "claim",
    observation: "observation",
  };

  const label = typeLabels[type];
  const hasTitle = title && title.trim() !== "";

  return (
    <div className={`theorem-block theorem-${type}`}>
      <div className="theorem-header">
        <span className="theorem-label">{label}</span>
        {hasTitle && <span className="theorem-title">{title}</span>}
      </div>
      <div className="theorem-content">{children}</div>
    </div>
  );
}
