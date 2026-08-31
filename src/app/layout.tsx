import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { PageTransition } from "@/components/ui/page-transition";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { zodiak, geistMono } from "@/lib/fonts";

// The apex 308-redirects to www on Vercel, so www is the canonical origin.
const siteUrl = "https://www.aaritshah.com";
const defaultTitle = "Aarit Shah · Founder, Trader & Builder";
const titleTemplate = "Aarit Shah · %s";
const description =
  "Aarit Shah is a founder and trader from Mumbai. He is building MarketPlay, GetAITrade and 10x Founders, and teaches software, markets and trading to a 1,500-person community.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: titleTemplate },
  description,
  keywords: [
    "Aarit Shah",
    "MarketPlay",
    "GetAITrade",
    "10x Founders",
    "AI trading",
    "AI agents",
    "AI training",
    "AI builder",
    "AI projects",
    "trading bots",
    "value investing",
    "crypto CFDs",
    "trading",
    "financial literacy",
    "South Bombay",
    "Mumbai",
  ],
  authors: [{ name: "Aarit Shah", url: siteUrl }],
  creator: "Aarit Shah",
  // Search Console and Bing ownership tags. Read from env so the tokens can be
  // pasted into the Vercel dashboard and shipped with a redeploy, with no code
  // change. Absent env vars render no tag at all, which is the correct
  // behaviour rather than an empty one.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Aarit Shah",
    locale: "en_IN",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@withaarit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${zodiak.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-night text-ink">
        {/* Only the two critical Switzer weights block first paint: 400 for
            body text, 900 for the display faces. Everything else loads on
            demand via the @font-face rules in globals.css. */}
        <link
          rel="preload"
          href="/fonts/switzer-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/switzer-900-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Keyboard users land here first; it stays invisible until focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-night"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[55] hidden bg-grain opacity-[0.06] mix-blend-soft-light sm:block"
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
