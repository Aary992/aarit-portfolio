import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

/**
 * Switzer is declared as plain @font-face rules in globals.css, served from
 * /public/fonts. next/font/local preloads every file in a call (13 files,
 * ~223KB of blocking font requests), and its `preload` flag is per-call, not
 * per-file. Manual @font-face lets the browser fetch only the weights a page
 * actually renders, while the two critical weights (400 body, 900 display)
 * get explicit <link rel="preload"> hints in the root layout.
 *
 * Fontshare CDN stays out: when api.fontshare.com refuses a request it still
 * returns 200 with a comment body and no font-face rules, silently dropping
 * the whole site to system sans.
 */

// next/font requires every value here to be an explicitly written literal: it
// reads this file statically at build time, so a helper that generates the
// entries fails with "Font loader values must be explicitly written literals".
export const zodiak = localFont({
  src: [
    { path: "../fonts/zodiak-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/zodiak-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/zodiak-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-zodiak",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});
