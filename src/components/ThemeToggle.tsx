"use client";

import { useCallback, useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: "light" | "dark") => {
    const root = document.documentElement;
    root.setAttribute("data-theme", newTheme);
  }, []);

  const detectSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  }, []);

  useEffect(() => {
    setMounted(true);

    // Always start with system theme
    const systemTheme = detectSystemTheme();
    setTheme(systemTheme);
    applyTheme(systemTheme);

    // Always listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setTheme(newSystemTheme);
      applyTheme(newSystemTheme);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [applyTheme, detectSystemTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return (
      <button type="button" className="mono-theme-toggle">
        ☀
      </button>
    );
  }

  const getIcon = () => {
    return theme === "light" ? "☀" : "◐";
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="mono-theme-toggle"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {getIcon()}
    </button>
  );
}
