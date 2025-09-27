import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lezcodes.dev",
  description: "A monospace web experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable}`}>
        <div className="mono-container">
          <header className="mono-header">
            <nav className="mono-nav">
              <Link href="/" className="mono-title">
                lezcodes.dev
              </Link>
              <Link href="/posts">posts</Link>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mono-footer">
            <p>© 2025 lezcodes.dev</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
