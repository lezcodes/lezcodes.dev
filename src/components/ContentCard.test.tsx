/**
 * Component tests for ContentCard
 */

import { afterEach, describe, expect, test } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { ContentCard } from "./ContentCard";

describe("ContentCard", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders post title and link", () => {
    render(
      <ContentCard
        slug="test-post"
        title="Test Post Title"
        date="2024-01-01"
        basePath="posts"
      />,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/posts/test-post");
    expect(screen.getByText("Test Post Title")).toBeDefined();
  });

  test("renders date", () => {
    render(
      <ContentCard
        slug="test-post"
        title="Test Post"
        date="2024-01-01"
        basePath="posts"
      />,
    );

    expect(screen.getByText("2024-01-01")).toBeDefined();
  });

  test("renders excerpt when provided", () => {
    render(
      <ContentCard
        slug="test-post"
        title="Test Post"
        date="2024-01-01"
        excerpt="This is a test excerpt"
        basePath="posts"
      />,
    );

    expect(screen.getByText("This is a test excerpt")).toBeDefined();
  });

  test("doesn't render excerpt when not provided", () => {
    const { container } = render(
      <ContentCard
        slug="test-post"
        title="Test Post"
        date="2024-01-01"
        basePath="posts"
      />,
    );

    // Check that there's no excerpt element
    const excerpts = container.querySelectorAll(".excerpt");
    expect(excerpts.length).toBe(0);
  });

  test("works with vault basePath", () => {
    render(
      <ContentCard
        slug="test-vault"
        title="Vault Item"
        date="2024-01-01"
        basePath="vault"
      />,
    );

    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/vault/test-vault");
  });
});
