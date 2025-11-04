import type { Metadata } from "next";
import { ListingPage } from "@/components/ListingPage";
import { generatePageMetadata } from "@/lib/seo";
import { getAllVaultItems } from "@/lib/vault";

export const metadata: Metadata = generatePageMetadata({
  title: "Vault",
  description:
    "Curated list of favorite reads, links, and anime reviews by Carlos Lezama (lez).",
  path: "/vault",
});

export default function VaultPage() {
  const vaultItems = getAllVaultItems();

  return <ListingPage title="vault" items={vaultItems} basePath="vault" />;
}
