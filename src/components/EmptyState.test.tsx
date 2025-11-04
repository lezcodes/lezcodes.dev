/**
 * Component tests for EmptyState
 */

import { afterEach, describe, expect, test } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  afterEach(() => {
    cleanup();
  });

  test("renders empty posts message", () => {
    render(<EmptyState type="posts" />);

    expect(screen.getByText(/no posts yet. check back later!/)).toBeDefined();
  });

  test("renders empty vault message", () => {
    render(<EmptyState type="vault" />);

    expect(
      screen.getByText(/no vault items yet. check back later!/),
    ).toBeDefined();
  });

  test("renders correct links for posts", () => {
    render(<EmptyState type="posts" />);

    const homeLink = screen.getByText("go home");
    const vaultLink = screen.getByText("view vault");

    expect(homeLink).toBeDefined();
    expect(vaultLink).toBeDefined();
  });

  test("renders correct links for vault", () => {
    render(<EmptyState type="vault" />);

    const homeLink = screen.getByText("go home");
    const postsLink = screen.getByText("browse posts");

    expect(homeLink).toBeDefined();
    expect(postsLink).toBeDefined();
  });

  test("renders what you can do section", () => {
    render(<EmptyState type="posts" />);

    expect(screen.getByText("what you can do")).toBeDefined();
  });
});
