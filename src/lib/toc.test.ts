import { describe, expect, test } from "bun:test";
import { extractHeadings } from "./toc";

describe("extractHeadings", () => {
  test("should extract h2 and h3 headings from MDX content", () => {
    const content = `
# Main Title

## Getting Started

This is some content.

### Install chezmoi

More content here.

## My Setup

Another section.

### Terminal: ghostty

Details about ghostty.
    `;

    const headings = extractHeadings(content);

    expect(headings).toHaveLength(4);
    expect(headings[0]).toEqual({
      id: "getting-started",
      text: "Getting Started",
      level: 2,
    });
    expect(headings[1]).toEqual({
      id: "install-chezmoi",
      text: "Install chezmoi",
      level: 3,
    });
    expect(headings[2]).toEqual({
      id: "my-setup",
      text: "My Setup",
      level: 2,
    });
    expect(headings[3]).toEqual({
      id: "terminal-ghostty",
      text: "Terminal: ghostty",
      level: 3,
    });
  });

  test("should handle headings with special characters", () => {
    const content = `
## What's this?

### Setup: node.js & npm

## Building custom functions

### \`dotfiles()\` - interactive dotfile editor
    `;

    const headings = extractHeadings(content);

    expect(headings).toHaveLength(4);
    expect(headings[0].id).toBe("whats-this");
    expect(headings[1].id).toBe("setup-nodejs-npm");
    expect(headings[2].id).toBe("building-custom-functions");
    expect(headings[3].id).toBe("dotfiles-interactive-dotfile-editor");
  });

  test("should return empty array for content without headings", () => {
    const content = `
This is just some paragraph text.

No headings here.
    `;

    const headings = extractHeadings(content);

    expect(headings).toHaveLength(0);
  });

  test("should ignore h1 headings", () => {
    const content = `
# Main Title

## Section One

### Subsection

# Another H1

## Section Two
    `;

    const headings = extractHeadings(content);

    expect(headings).toHaveLength(3);
    expect(headings[0].text).toBe("Section One");
    expect(headings[1].text).toBe("Subsection");
    expect(headings[2].text).toBe("Section Two");
  });
});
