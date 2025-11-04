import type { Metadata } from "next";
import { ErrorPage, STANDARD_ERROR_ACTIONS } from "@/components/ErrorPage";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "404 - page not found",
  description: "the page you're looking for doesn't exist. whoops!",
});

export default function NotFound() {
  return (
    <ErrorPage
      statusCode={404}
      title="404 - page not found"
      description="the page you're looking for doesn't exist. it might have been moved, deleted, or perhaps it never existed in the first place. (spooky!)"
      actions={STANDARD_ERROR_ACTIONS}
    />
  );
}
