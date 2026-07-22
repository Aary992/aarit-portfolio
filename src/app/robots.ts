import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /lab is scratch design exploration and 404s in production anyway;
        // /admin is the authenticated editor. Neither should be crawled.
        disallow: ["/lab/", "/admin"],
      },
    ],
    sitemap: "https://www.aaritshah.com/sitemap.xml",
    host: "https://www.aaritshah.com",
  };
}
