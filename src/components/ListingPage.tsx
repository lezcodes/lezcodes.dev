import { ContentCard } from "@/components/ContentCard";
import { EmptyState } from "@/components/EmptyState";
import { YouCanAlso } from "@/components/YouCanAlso";

interface ListingItem {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
}

interface ListingPageProps {
  title: string;
  items: ListingItem[];
  basePath: "posts" | "vault";
}

export function ListingPage({ title, items, basePath }: ListingPageProps) {
  return (
    <div className="content">
      <h1>{title}</h1>

      {items.length === 0 ? (
        <EmptyState type={basePath} />
      ) : (
        <>
          <div className="card-grid">
            {items.map((item) => (
              <ContentCard
                key={item.slug}
                slug={item.slug}
                title={item.title}
                date={item.date}
                excerpt={item.excerpt}
                basePath={basePath}
              />
            ))}
          </div>
          <YouCanAlso exclude={basePath} />
        </>
      )}
    </div>
  );
}
