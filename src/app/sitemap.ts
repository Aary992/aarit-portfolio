import type { MetadataRoute } from "next";
import { ventures, posts } from "@/lib/data";

const base = "https://aaritshah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/journey",
    "/building",
    "/investing",
    "/side-projects",
    "/writing",
    "/press",
    "/certifications",
  ];
  const ventureRoutes = ventures.map((v) => `/building/${v.slug}`);
  const writingRoutes = posts.map((p) => `/writing/${p.slug}`);

  return [...staticRoutes, ...ventureRoutes, ...writingRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
