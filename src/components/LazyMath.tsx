"use client";

import { useEffect, useRef, useState } from "react";

interface LazyMathProps {
  math: string;
  displayMode?: boolean;
}

export function LazyMath({ math, displayMode = false }: LazyMathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !rendered) {
            setIsVisible(true);
          }
        });
      },
      {
        rootMargin: "100px", // Start rendering 100px before entering viewport
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rendered]);

  useEffect(() => {
    if (isVisible && !rendered) {
      import("katex").then((katex) => {
        if (containerRef.current) {
          try {
            containerRef.current.innerHTML = katex.default.renderToString(
              math,
              {
                displayMode,
                throwOnError: false,
                trust: true,
              },
            );
            setRendered(true);
          } catch (error) {
            console.error("KaTeX rendering error:", error);
            containerRef.current.textContent = math;
          }
        }
      });
    }
  }, [isVisible, math, displayMode, rendered]);

  return (
    <div
      ref={containerRef}
      className={displayMode ? "katex-display" : "katex-inline"}
      style={{
        minHeight: displayMode ? "2rem" : "1rem",
        opacity: rendered ? 1 : 0.3,
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      {!isVisible && (displayMode ? "$$" : "$")}
      {math}
      {!isVisible && (displayMode ? "$$" : "$")}
    </div>
  );
}
