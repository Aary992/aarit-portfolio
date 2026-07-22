import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy. Allows exactly what the site uses:
// - the Calendly booking iframe
// - inline styles (framer-motion / styled-jsx / next-font) and the JSON-LD + Next inline scripts
// Fonts are self-hosted via next/font/local, so no third-party font origins are
// allowed any more.
// In dev we also allow eval + websockets so Turbopack HMR keeps working.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  // va.vercel-scripts.com serves the Analytics and Speed Insights scripts.
  `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com${isDev ? " 'unsafe-eval'" : ""}`,
  // Supabase: the work-with-me enquiry form and calculator email capture
  // insert rows into the dedicated aarit-portfolio project.
  // vitals.vercel-insights.com receives the Core Web Vitals beacons.
  `connect-src 'self' https://upknvaoegkagbrktkufd.supabase.co https://va.vercel-scripts.com https://vitals.vercel-insights.com${isDev ? " ws: wss:" : ""}`,
  "frame-src https://calendly.com https://*.calendly.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  experimental: {
    viewTransition: true,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Fonts in /public are content-stable (a new weight gets a new file
      // name), so they can cache forever. Without this, /public assets ship
      // with no cache header at all.
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
