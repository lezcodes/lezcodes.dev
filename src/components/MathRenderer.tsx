"use client";

import { useEffect } from "react";

/**
 * Client-side math renderer using KaTeX with lazy loading via Intersection Observer.
 *
 * This component initializes a global observer that watches for .lazy-katex elements
 * and renders them with KaTeX when they enter the viewport.
 *
 * Performance optimizations:
 * - Lazy imports KaTeX only when first math element is visible
 * - Uses single IntersectionObserver for all math elements
 * - Renders math only when visible (100px margin for smooth UX)
 * - Disconnects observer after all elements are rendered
 */
export function MathRenderer() {
  useEffect(() => {
    let katexModule: typeof import("katex") | null = null;
    const pendingElements = new Set<Element>();

    const renderMath = async (element: Element) => {
      const mathContent = element.getAttribute("data-math");
      const displayMode = element.getAttribute("data-display-mode") === "true";

      if (!mathContent) return;

      // Lazy import KaTeX on first use
      if (!katexModule) {
        katexModule = await import("katex");
      }

      try {
        const html = katexModule.default.renderToString(mathContent, {
          displayMode,
          throwOnError: false,
          trust: true,
        });
        element.innerHTML = html;
        element.classList.add("rendered");
      } catch (error) {
        console.error("KaTeX rendering error:", error);
        element.textContent = displayMode
          ? `$$${mathContent}$$`
          : `$${mathContent}$`;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            renderMath(element);
            observer.unobserve(element);
            pendingElements.delete(element);
          }
        });

        // Clean up observer if all elements are rendered
        if (pendingElements.size === 0) {
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Start rendering 100px before viewport
      },
    );

    // Find all lazy-katex elements and observe them
    const elements = document.querySelectorAll(".lazy-katex:not(.rendered)");
    elements.forEach((el) => {
      pendingElements.add(el);
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      pendingElements.clear();
    };
  }, []);

  return null; // This component doesn't render anything
}
