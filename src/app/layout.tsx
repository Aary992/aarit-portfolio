import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = "https://aaritshah.com";
const defaultTitle = "Aarit Shah · AI Builder, Trader & Founder";
const titleTemplate = "Aarit Shah · %s";
const description =
  "Aarit Shah is an AI builder, trader, founder and educator from Mumbai building MarketPlay, GetAITrade and 10x Founders, and training a 1,500-person community on AI, markets and trading.";

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
    <html lang="en" className={`${geistMono.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800,900&f[]=zodiak@400,500,700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-night text-ink">
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[55] hidden bg-grain opacity-[0.06] mix-blend-soft-light sm:block"
        />
      </body>
    </html>
  );
}
