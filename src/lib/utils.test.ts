/**
 * Unit tests for utility functions
 */

import { describe, expect, test } from "bun:test";
import { calculateReadingTime, cn } from "./utils";

describe("calculateReadingTime", () => {
  test("calculates reading time for short content", () => {
    const content = "This is a short test content.";
    const result = calculateReadingTime(content);
    expect(result).toBe("1 min read");
  });

  test("calculates reading time for medium content", () => {
    const content = Array(300).fill("word").join(" ");
    const result = calculateReadingTime(content);
    expect(result).toBe("2 min read");
  });

  test("calculates reading time for long content", () => {
    const content = Array(1000).fill("word").join(" ");
    const result = calculateReadingTime(content);
    expect(result).toBe("5 min read");
  });

  test("handles empty content", () => {
    const result = calculateReadingTime("");
    expect(result).toBe("1 min read");
  });

  test("handles content with multiple spaces", () => {
    const content = "word    word    word";
    const result = calculateReadingTime(content);
    expect(result).toBe("1 min read");
  });
});

describe("cn", () => {
  test("merges class names", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  test("handles conditional classes", () => {
    const result = cn("class1", false && "class2", "class3");
    expect(result).toBe("class1 class3");
  });

  test("handles undefined and null", () => {
    const result = cn("class1", undefined, null, "class2");
    expect(result).toBe("class1 class2");
  });

  test("handles empty strings", () => {
    const result = cn("class1", "", "class2");
    expect(result).toBe("class1 class2");
  });

  test("merges tailwind classes correctly", () => {
    const result = cn("px-2 py-1", "px-4");
    expect(result).toContain("px-4");
    expect(result).not.toContain("px-2");
  });
});
