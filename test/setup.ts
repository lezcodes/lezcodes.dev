/**
 * Test setup for Bun test runner
 * Configures happy-dom for DOM testing
 */

import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Register happy-dom globally for all tests
GlobalRegistrator.register();

// Cleanup after all tests
process.on("exit", () => {
  GlobalRegistrator.unregister();
});
