import type { Metadata } from "next";
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
            <a href="/">go home</a>
          </li>
          <li>
            <a href="/posts">browse posts</a>
          </li>
          <li>
            <a href="/vault">view vault</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
