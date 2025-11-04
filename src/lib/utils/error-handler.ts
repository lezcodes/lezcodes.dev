/**
 * Error handling utilities.
 * Provides consistent error handling patterns across the application.
 */

/**
 * Safe function executor with error handling
 */
export async function tryCatch<T>(
  fn: () => T | Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

/**
 * Safe function executor with error callback
 */
export async function tryCatchCallback<T>(
  fn: () => T | Promise<T>,
  onError: (error: unknown) => T,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    return onError(error);
  }
}

/**
 * Checks if a value exists (not null or undefined)
 */
export function exists<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard for checking if an error is an instance of Error
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Extracts error message from unknown error type
 */
export function getErrorMessage(error: unknown): string {
  if (isError(error)) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred";
}

/**
 * Logs error in development, silent in production
 */
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === "development") {
    const message = context ? `[${context}]` : "";
    console.error(message, error);
  }
}
