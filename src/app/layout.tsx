import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import { StructuredData } from "@/components/StructuredData";
import { ThemeToggle } from "@/components/ThemeToggle";
import { generatePageMetadata, generatePersonStructuredData } from "@/lib/seo";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generatePageMetadata({});

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
      <body className={`${geistMono.variable}`}>
        <div className="mono-container">
          <header className="mono-header">
            <nav className="mono-nav">
              <div className="mono-nav-left">
                <Link href="/" className="mono-title">
                  lezcodes.dev
                </Link>
              </div>
              <div className="mono-nav-right">
                <Link href="/posts">posts</Link>
                <ThemeToggle />
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mono-footer">
            <p>© 2025 lezcodes.dev</p>
          </footer>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
