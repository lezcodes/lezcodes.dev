import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData } from "@/components/StructuredData";
import {
  generatePageMetadata,
  generatePersonStructuredData,
  viewport as seoViewport,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = generatePageMetadata({});
export const viewport = seoViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData data={generatePersonStructuredData()} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <div className="container">
          <header className="header">
            <nav className="nav">
              <Link href="/" className="logo">
                lezcodes.dev
              </Link>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="footer">
            <p>© 2025 lezcodes.dev</p>
          </footer>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
