import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { generateContentMetadata } from "@/lib/content";
import { getAllVaultSlugs, getVaultItemBySlug } from "@/lib/vault";

export async function generateStaticParams() {
  const slugs = getAllVaultSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const vaultItem = getVaultItemBySlug(slug);
    return generateContentMetadata({
      slug,
      content: vaultItem,
      basePath: "vault",
    });
  } catch {
    return generateContentMetadata({
      slug,
      content: null,
      basePath: "vault",
    });
  }
}

export default async function VaultItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const vaultItem = getVaultItemBySlug(slug);

    return (
      <ArticleLayout
        title={vaultItem.title}
        date={vaultItem.date}
        content={vaultItem.content}
        readingTime={vaultItem.readingTime}
      />
    );
  } catch {
    notFound();
  }
}
