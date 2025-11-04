/**
 * Integration tests for vault collection
 */

import { describe, expect, test } from "bun:test";
import {
  getAllVaultItems,
  getAllVaultSlugs,
  getVaultItemBySlug,
} from "./vault";

describe("Vault Integration", () => {
  test("getAllVaultItems returns array of vault items", () => {
    const items = getAllVaultItems();

    expect(Array.isArray(items)).toBe(true);

    if (items.length > 0) {
      const item = items[0];
      expect(item).toHaveProperty("slug");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("date");
      expect(item).toHaveProperty("content");
      expect(item).toHaveProperty("readingTime");
    }
  });

  test("vault items are sorted by date (newest first)", () => {
    const items = getAllVaultItems();

    if (items.length > 1) {
      for (let i = 0; i < items.length - 1; i++) {
        expect(items[i].date >= items[i + 1].date).toBe(true);
      }
    }
  });

  test("getAllVaultSlugs returns array of slugs", () => {
    const slugs = getAllVaultSlugs();

    expect(Array.isArray(slugs)).toBe(true);

    slugs.forEach((slug) => {
      expect(typeof slug).toBe("string");
      expect(slug.length).toBeGreaterThan(0);
    });
  });

  test("getVaultItemBySlug returns correct item", () => {
    const slugs = getAllVaultSlugs();

    if (slugs.length > 0) {
      const slug = slugs[0];
      const item = getVaultItemBySlug(slug);

      expect(item.slug).toBe(slug);
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("date");
      expect(item).toHaveProperty("content");
    }
  });

  test("vault slugs match getAllVaultItems results", () => {
    const items = getAllVaultItems();
    const slugs = getAllVaultSlugs();

    expect(items.length).toBe(slugs.length);

    items.forEach((item) => {
      expect(slugs).toContain(item.slug);
    });
  });
});
