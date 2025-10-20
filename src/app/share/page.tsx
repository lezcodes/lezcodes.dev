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
    <div className="content">
      <h1>share</h1>

      {shares.length === 0 ? (
        <p>No shares yet. Check back soon!</p>
      ) : (
        <div className="card-grid">
          {shares.map((share) => (
            <Link
              key={share.slug}
              href={`/share/${share.slug}`}
              className="card"
            >
              <div className="card-title">{share.title}</div>
              <div className="card-date">{share.date}</div>
              {share.excerpt && <p className="card-excerpt">{share.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
