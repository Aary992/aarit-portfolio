import { Geist_Mono } from "next/font/google";

/**
 * Switzer and Zodiak are declared as plain @font-face rules in globals.css,
 * served from /public/fonts. next/font/local preloads every file in a call
 * (13 files, ~223KB of blocking font requests), and its `preload` flag is
 * per-call, not per-file. Manual @font-face lets the browser fetch only the
 * weights a page actually renders, while the critical weights (Switzer 400
 * and 900, Zodiak 700) get explicit <link rel="preload"> hints in the root
 * layout.
 *
 * Fontshare CDN stays out: when api.fontshare.com refuses a request it still
 * returns 200 with a comment body and no font-face rules, silently dropping
 * the whole site to system sans.
 */

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});
