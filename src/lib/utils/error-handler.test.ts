/**
 * Unit tests for error handling utilities
 */

import { describe, expect, test } from "bun:test";
import {
  exists,
  getErrorMessage,
  isError,
  tryCatch,
  tryCatchCallback,
} from "./error-handler";

describe("tryCatch", () => {
  test("returns result when function succeeds", async () => {
    const result = await tryCatch(() => "success", "fallback");
    expect(result).toBe("success");
  });

  test("returns fallback when function throws", async () => {
    const result = await tryCatch(() => {
      throw new Error("oops");
    }, "fallback");
    expect(result).toBe("fallback");
  });

  test("works with async functions", async () => {
    const result = await tryCatch(
      async () => Promise.resolve("async success"),
      "fallback",
    );
    expect(result).toBe("async success");
  });
});

describe("tryCatchCallback", () => {
  test("returns result when function succeeds", async () => {
    const result = await tryCatchCallback(
      () => "success",
      () => "error",
    );
    expect(result).toBe("success");
  });

  test("calls error callback when function throws", async () => {
    const result = await tryCatchCallback(
      () => {
        throw new Error("test error");
      },
      (error) => `caught: ${(error as Error).message}`,
    );
    expect(result).toBe("caught: test error");
  });
});

describe("exists", () => {
  test("returns true for defined values", () => {
    expect(exists("value")).toBe(true);
    expect(exists(0)).toBe(true);
    expect(exists(false)).toBe(true);
    expect(exists({})).toBe(true);
    expect(exists([])).toBe(true);
  });

  test("returns false for null or undefined", () => {
    expect(exists(null)).toBe(false);
    expect(exists(undefined)).toBe(false);
  });
});

describe("isError", () => {
  test("returns true for Error instances", () => {
    expect(isError(new Error("test"))).toBe(true);
    expect(isError(new TypeError("test"))).toBe(true);
    expect(isError(new RangeError("test"))).toBe(true);
  });

  test("returns false for non-Error values", () => {
    expect(isError("error")).toBe(false);
    expect(isError({ message: "error" })).toBe(false);
    expect(isError(null)).toBe(false);
    expect(isError(undefined)).toBe(false);
  });
});

describe("getErrorMessage", () => {
  test("extracts message from Error instances", () => {
    const error = new Error("test message");
    expect(getErrorMessage(error)).toBe("test message");
  });

  test("returns string errors as-is", () => {
    expect(getErrorMessage("string error")).toBe("string error");
  });

  test("returns default message for unknown errors", () => {
    expect(getErrorMessage(123)).toBe("An unknown error occurred");
    expect(getErrorMessage(null)).toBe("An unknown error occurred");
    expect(getErrorMessage({})).toBe("An unknown error occurred");
  });
});
