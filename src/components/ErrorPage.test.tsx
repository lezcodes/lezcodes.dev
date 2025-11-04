/**
 * Component tests for ErrorPage
 */

import { afterEach, describe, expect, test } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { ErrorPage, STANDARD_ERROR_ACTIONS } from "./ErrorPage";

describe("ErrorPage", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders error status code", () => {
    render(
      <ErrorPage
        statusCode={404}
        title="404 - page not found"
        description="test description"
        actions={[]}
      />,
    );

    expect(screen.getByText("404")).toBeDefined();
  });

  test("renders error description", () => {
    render(
      <ErrorPage
        statusCode={404}
        title="404 - page not found"
        description="the page doesn't exist"
        actions={[]}
      />,
    );

    expect(screen.getByText("the page doesn't exist")).toBeDefined();
  });

  test("renders action links", () => {
    render(
      <ErrorPage
        statusCode={404}
        title="404 - page not found"
        description="test description"
        actions={[
          { label: "go home", href: "/" },
          { label: "browse posts", href: "/posts" },
        ]}
      />,
    );

    const homeLink = screen.getByText("go home");
    const postsLink = screen.getByText("browse posts");

    expect(homeLink).toBeDefined();
    expect(postsLink).toBeDefined();
  });

  test("renders button for onClick actions", () => {
    const mockOnClick = () => {};

    render(
      <ErrorPage
        statusCode={500}
        title="500 - server error"
        description="test description"
        actions={[{ label: "try again", onClick: mockOnClick }]}
      />,
    );

    const button = screen.getByRole("button", { name: "try again" });
    expect(button).toBeDefined();
  });

  test("doesn't render actions section when no actions provided", () => {
    const { container } = render(
      <ErrorPage
        statusCode={404}
        title="404 - page not found"
        description="test description"
      />,
    );

    const section = container.querySelector("section");
    expect(section).toBeNull();
  });

  test("STANDARD_ERROR_ACTIONS contains expected links", () => {
    expect(STANDARD_ERROR_ACTIONS).toHaveLength(3);
    expect(STANDARD_ERROR_ACTIONS[0]).toEqual({
      label: "go home",
      href: "/",
    });
    expect(STANDARD_ERROR_ACTIONS[1]).toEqual({
      label: "browse posts",
      href: "/posts",
    });
    expect(STANDARD_ERROR_ACTIONS[2]).toEqual({
      label: "view vault",
      href: "/vault",
    });
  });
});
