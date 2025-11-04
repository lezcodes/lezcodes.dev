/**
 * Unit tests for structured data factory
 */

import { describe, expect, test } from "bun:test";
import {
  createArticleStructuredData,
  createOrganizationSchema,
  createPersonSchema,
  createStructuredData,
  createWebPageSchema,
  defaultAuthorSchema,
  defaultPublisherSchema,
} from "./structured-data-factory";

describe("createPersonSchema", () => {
  test("creates person schema with default values", () => {
    const schema = createPersonSchema();

    expect(schema["@type"]).toBe("Person");
    expect(schema.name).toBeDefined();
    expect(schema.url).toBeDefined();
  });

  test("creates person schema with overrides", () => {
    const schema = createPersonSchema({
      name: "Test Person",
      url: "https://test.com",
    });

    expect(schema.name).toBe("Test Person");
    expect(schema.url).toBe("https://test.com");
  });
});

describe("createWebPageSchema", () => {
  test("creates webpage schema", () => {
    const schema = createWebPageSchema({
      id: "https://example.com/page",
      url: "https://example.com/page",
    });

    expect(schema["@type"]).toBe("WebPage");
    expect(schema["@id"]).toBe("https://example.com/page");
    expect(schema.url).toBe("https://example.com/page");
  });
});

describe("createOrganizationSchema", () => {
  test("creates organization schema", () => {
    const schema = createOrganizationSchema({
      name: "Test Org",
      url: "https://testorg.com",
    });

    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("Test Org");
    expect(schema.url).toBe("https://testorg.com");
  });
});

describe("createStructuredData", () => {
  test("creates structured data with context", () => {
    const data = createStructuredData("TestType", {
      property: "value",
    });

    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("TestType");
    expect(data.property).toBe("value");
  });
});

describe("createArticleStructuredData", () => {
  test("creates article structured data", () => {
    const article = createArticleStructuredData({
      type: "BlogPosting",
      headline: "Test Article",
      description: "test description",
      image: "https://example.com/image.jpg",
      author: createPersonSchema(),
      publisher: createPersonSchema(),
      datePublished: "2024-01-01",
      dateModified: "2024-01-02",
      mainEntityOfPage: createWebPageSchema({
        id: "https://example.com/article",
      }),
      url: "https://example.com/article",
    });

    expect(article["@context"]).toBe("https://schema.org");
    expect(article["@type"]).toBe("BlogPosting");
    expect(article.headline).toBe("Test Article");
    expect(article.description).toBe("test description");
    expect(article.datePublished).toBe("2024-01-01");
    expect(article.dateModified).toBe("2024-01-02");
  });
});

describe("default schemas", () => {
  test("defaultAuthorSchema is defined", () => {
    expect(defaultAuthorSchema).toBeDefined();
    expect(defaultAuthorSchema["@type"]).toBe("Person");
  });

  test("defaultPublisherSchema is defined", () => {
    expect(defaultPublisherSchema).toBeDefined();
    expect(defaultPublisherSchema["@type"]).toBe("Person");
  });
});
