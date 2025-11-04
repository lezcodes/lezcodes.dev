import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist.",
});

export default function NotFound() {
  return (
    <div className="content">
      <h1>404</h1>
      <p>
        the page you're looking for doesn't exist. it might have been moved,
        deleted, or perhaps it never existed in the first place.
      </p>

      <section className="section">
        <h3>what you can do</h3>
        <ul className="links-list">
          <li>
            <Link href="/">go home</Link>
          </li>
          <li>
            <Link href="/posts">browse posts</Link>
          </li>
          <li>
            <Link href="/share">view shares</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
