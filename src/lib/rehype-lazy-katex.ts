import type { Element, Parent, Root, Text } from "hast";
import { SKIP, visit } from "unist-util-visit";

/**
 * Rehype plugin that wraps math nodes for client-side lazy rendering
 * instead of pre-rendering them with rehype-katex at build time.
 *
 * This significantly reduces HTML payload size (from 4MB to ~400KB)
 * and improves initial page load performance.
 */
export function rehypeLazyKatex() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent: Parent | null) => {
      // Handle display math: <pre><code class="language-math math-display">
      if (node.tagName === "pre") {
        const codeChild = node.children.find(
          (child): child is Element =>
            child.type === "element" && child.tagName === "code",
        );
        if (codeChild) {
          const classes = codeChild.properties?.className;
          if (
            Array.isArray(classes) &&
            classes.includes("language-math") &&
            classes.includes("math-display")
          ) {
            const textNode = codeChild.children.find(
              (child): child is Text => child.type === "text",
            );
            if (textNode && parent && index !== null && index !== undefined) {
              // Replace <pre><code> with div for lazy loading
              parent.children[index] = {
                type: "element",
                tagName: "div",
                properties: {
                  "data-math": textNode.value,
                  "data-display-mode": "true",
                  className: ["lazy-katex"],
                },
                children: [],
              };
              return SKIP;
            }
          }
        }
      }

      // Handle inline math: <code class="language-math math-inline">
      if (node.tagName === "code") {
        const classes = node.properties?.className;
        if (
          Array.isArray(classes) &&
          classes.includes("language-math") &&
          classes.includes("math-inline")
        ) {
          const textNode = node.children.find(
            (child): child is Text => child.type === "text",
          );
          if (textNode && parent && index !== null && index !== undefined) {
            // Replace <code> with span for lazy loading
            parent.children[index] = {
              type: "element",
              tagName: "span",
              properties: {
                "data-math": textNode.value,
                "data-display-mode": "false",
                className: ["lazy-katex"],
              },
              children: [],
            };
            return SKIP;
          }
        }
      }
    });
  };
}
