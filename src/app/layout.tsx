import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Carlos Lezama - ML & Software Engineer | lezcodes.dev",
    template: "%s | lezcodes.dev",
  },
  description:
    "Carlos Lezama (lez) - ML and Software Engineer with expertise in Python, Go, TypeScript, and AI/ML. Platform team lead at Monopolio. Economics graduate from ITAM.",
  keywords: [
    "Carlos Lezama",
    "lez",
    "lezcodes",
    "machine learning engineer",
    "software engineer",
    "ML engineer",
    "Python developer",
    "Go developer",
    "TypeScript developer",
    "AI engineer",
    "platform engineering",
    "Monopolio",
    "RappiCard",
    "Didi Food",
    "ITAM",
    "economics",
    "software development",
    "artificial intelligence",
    "backend development",
    "full stack developer",
  ],
  authors: [{ name: "Carlos Lezama", url: "https://lezcodes.dev" }],
  creator: "Carlos Lezama",
  publisher: "Carlos Lezama",
  metadataBase: new URL("https://lezcodes.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lezcodes.dev",
    siteName: "lezcodes.dev",
    title: "Carlos Lezama - ML & Software Engineer",
    description:
      "Carlos Lezama (lez) - ML and Software Engineer with expertise in Python, Go, TypeScript, and AI/ML. Platform team lead at Monopolio.",
    images: [
      {
        url: "/cookie.PNG",
        width: 1200,
        height: 630,
        alt: "Carlos Lezama - lezcodes.dev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Lezama - ML & Software Engineer",
    description:
      "ML and Software Engineer with expertise in Python, Go, TypeScript, and AI/ML. Platform team lead at Monopolio.",
    site: "@lezcodes",
    creator: "@lezcodes",
    images: ["/cookie.PNG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // TODO: Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Carlos Lezama",
    alternateName: "lez",
    url: "https://lezcodes.dev",
    image: "https://lezcodes.dev/cookie.PNG",
    jobTitle: "ML & Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Monopolio",
      url: "https://monopolio.com.mx/",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Instituto Tecnológico Autónomo de México",
      alternateName: "ITAM",
      url: "https://www.itam.mx/",
    },
    knowsAbout: [
      "Machine Learning",
      "Software Engineering",
      "Python",
      "Go",
      "TypeScript",
      "Artificial Intelligence",
      "Platform Engineering",
      "Backend Development",
    ],
    sameAs: [
      "https://github.com/lezcodes",
      "https://instagram.com/lezcodes",
      "https://linkedin.com/in/lezcodes",
      "https://x.com/lezcodes",
      "https://open.spotify.com/user/lezcodes",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is safe
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
      </body>
    </html>
  );
}
