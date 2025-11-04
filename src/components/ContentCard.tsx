import Link from "next/link";

interface ContentCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  basePath: "posts" | "share";
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
      <div className="card-title">{title}</div>
      <div className="card-date">{date}</div>
      {excerpt && <p className="card-excerpt">{excerpt}</p>}
    </Link>
  );
}
