import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { generatePageMetadata } from "@/lib/seo";
import { getAllVaultItems } from "@/lib/vault";

export const metadata: Metadata = generatePageMetadata({
  title: "vault",
  description:
    "curated list of favorite reads, links, and anime reviews by carlos lezama (lez).",
  path: "/vault",
});

export default function VaultPage() {
  const vaultItems = getAllVaultItems();

  return <ListingPage title="vault" items={vaultItems} basePath="vault" />;
}
