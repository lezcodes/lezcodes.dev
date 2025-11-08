import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { generatePageMetadata, viewport as seoViewport } from "@/lib/seo";
import { getAllVaultItems } from "@/lib/vault";

export const metadata: Metadata = generatePageMetadata({
  title: "vault",
  description:
    "curated list of favorite reads, links, and anime reviews by carlos lezama (lez).",
  path: "/vault",
});

export const viewport = seoViewport;

export default function VaultPage() {
  const vaultItems = getAllVaultItems();

  return <ListingPage title="vault" items={vaultItems} basePath="vault" />;
}
