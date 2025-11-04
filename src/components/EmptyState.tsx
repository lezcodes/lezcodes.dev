interface EmptyStateProps {
  type: "posts" | "vault";
}

export function EmptyState({ type }: EmptyStateProps) {
  const links =
    type === "posts"
      ? [
          { href: "/", label: "go home" },
          { href: "/vault", label: "view vault" },
        ]
      : [
          { href: "/", label: "go home" },
          { href: "/posts", label: "browse posts" },
        ];

  return (
    <>
      <p>
        ¯\_(ツ)_/¯ no {type === "posts" ? "posts" : "vault items"} yet. check
        back later!
      </p>
      <section className="section">
        <h3>what you can do</h3>
        <ul className="links-list">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
