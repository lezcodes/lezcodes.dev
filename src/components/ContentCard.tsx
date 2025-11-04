import Link from "next/link";

interface ContentCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  basePath: "posts" | "vault";
}

export function ContentCard({
  slug,
  title,
  date,
  excerpt,
  basePath,
}: ContentCardProps) {
  return (
    <Link href={`/${basePath}/${slug}`} className="card">
      <div className="card-date">{date}</div>
      <div>
        <div className="card-title">{title}</div>
        {excerpt && <p className="card-excerpt">{excerpt}</p>}
      </div>
    </Link>
  );
}
