import type { Metadata } from "next";
import { ContentCard } from "@/components/ContentCard";
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
            <ContentCard
              key={share.slug}
              slug={share.slug}
              title={share.title}
              date={share.date}
              excerpt={share.excerpt}
              basePath="share"
            />
          ))}
        </div>
      )}
    </div>
  );
}
