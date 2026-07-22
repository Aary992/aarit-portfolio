import type { MetadataRoute } from "next";
import { ventures, posts } from "@/lib/data";
import { getPublishedPosts } from "@/lib/market-posts";

const base = "https://www.aaritshah.com";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Priority reflects what the site is for: hiring first, then the writing
  // that brings people in, then the biography pages.
  const primary = ["", "/work-with-me"];
  const secondary = ["/markets-explained", "/writing", "/building", "/faq"];
  const tertiary = [
    "/about",
    "/journey",
    "/investing",
    "/side-projects",
    "/speaking",
    "/certifications",
    "/press",
  ];

  const ventureRoutes = ventures.map((v) => `/building/${v.slug}`);
  const writingRoutes = posts.map((p) => `/writing/${p.slug}`);
  const marketRoutes = (await getPublishedPosts()).map(
    (p) => `/markets-explained/${p.slug}`,
  );

  const priorityFor = (route: string) => {
    if (route === "") return 1;
    if (primary.includes(route)) return 0.95;
    if (secondary.includes(route)) return 0.85;
    if (marketRoutes.includes(route) || ventureRoutes.includes(route)) return 0.8;
    return 0.6;
  };

  return [
    ...primary,
    ...secondary,
    ...tertiary,
    ...ventureRoutes,
    ...writingRoutes,
    ...marketRoutes,
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: priorityFor(route),
  }));
}
