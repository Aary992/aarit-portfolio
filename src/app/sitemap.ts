import type { MetadataRoute } from "next";
import { ventures } from "@/lib/data";

const base = "https://aaritshah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/journey",
    "/building",
    "/investing",
    "/side-projects",
    "/certifications",
  ];
  const ventureRoutes = ventures.map((v) => `/building/${v.slug}`);

  return [...staticRoutes, ...ventureRoutes].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
