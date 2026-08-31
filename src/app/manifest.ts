import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aarit Shah — Founder, Trader & Creator",
    short_name: "Aarit Shah",
    description:
      "Aarit Shah is a founder, trader, creator and student from South Bombay. He is building MarketPlay, GetAITrade and 10x Founders.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
