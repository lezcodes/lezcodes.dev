/**
 * Reusable error page component for all error states.
 * Follows DRY principle by consolidating error.tsx and not-found.tsx logic.
 */

interface ErrorAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface ErrorPageProps {
  statusCode: 404 | 500 | number;
  title: string;
  description: string;
  actions?: ErrorAction[];
}

/**
 * Generic error page layout with customizable actions
 */
export function ErrorPage({
  statusCode,
  description,
  actions,
}: ErrorPageProps) {
  return (
    <div className="content">
      <h1>{statusCode}</h1>
      <p>{description}</p>

      {actions && actions.length > 0 && (
        <section className="section">
          <h3>what you can do</h3>
          <ul className="links-list">
            {actions.map((action, index) => (
              <li key={`${action.label}-${index}`}>
                {action.onClick ? (
                  <button type="button" onClick={action.onClick}>
                    {action.label}
                  </button>
                ) : (
                  <a href={action.href}>{action.label}</a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

/**
 * Standard navigation actions for error pages
 */
export const STANDARD_ERROR_ACTIONS: ErrorAction[] = [
  { label: "go home", href: "/" },
  { label: "browse posts", href: "/posts" },
  { label: "view vault", href: "/vault" },
];
