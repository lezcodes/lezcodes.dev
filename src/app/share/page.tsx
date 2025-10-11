import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { getAllShares } from "@/lib/share";

export const metadata: Metadata = generatePageMetadata({
  title: "Share",
  description:
    "Curated list of favorite reads, links, and anime reviews by Carlos Lezama (lez).",
  path: "/share",
});

export default function SharePage() {
  const shares = getAllShares();

  return (
    <div className="mono-content">
      <h1>share</h1>

      {shares.length === 0 ? (
        <p>No shares yet. Check back soon!</p>
      ) : (
        <ul className="mono-post-list">
          {shares.map((share) => (
            <li key={share.slug}>
              <Link href={`/share/${share.slug}`} className="mono-post-card">
                <div className="mono-post-title">{share.title}</div>
                <div className="mono-post-date">{share.date}</div>
                {share.excerpt && (
                  <p className="mono-post-excerpt">{share.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
