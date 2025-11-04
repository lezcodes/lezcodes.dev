"use client";

import { ErrorPage, STANDARD_ERROR_ACTIONS } from "@/components/ErrorPage";

export default function ErrorBoundary({ reset }: { reset: () => void }) {
  return (
    <ErrorPage
      statusCode={500}
      title="500 - server error"
      description="oops! something went wrong on our end. this is definitely our fault, not yours. the error has been logged and we'll figure it out (probably)."
      actions={[
        { label: "try again", onClick: reset },
        ...STANDARD_ERROR_ACTIONS,
      ]}
    />
  );
}
