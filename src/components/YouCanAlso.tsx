import Link from "next/link";

interface YouCanAlsoProps {
  exclude?: "home" | "posts" | "vault";
}

export function YouCanAlso({ exclude }: YouCanAlsoProps) {
  const links = [
    { href: "/", label: "go home", key: "home" },
    { href: "/posts", label: "browse posts", key: "posts" },
    { href: "/vault", label: "view vault", key: "vault" },
  ].filter((link) => link.key !== exclude);

  return (
    <section className="section" style={{ marginTop: "3rem" }}>
      <h3>you can also...</h3>
      <ul className="links-list">
        {links.map((link) => (
          <li key={link.key}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
