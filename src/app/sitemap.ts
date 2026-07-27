import type { MetadataRoute } from "next";
import { ventures, posts } from "@/lib/data";
import { getPublishedPosts } from "@/lib/market-posts";
import { getPublishedGuides } from "@/lib/guides";
import { getPublishedResources } from "@/lib/resources";

const base = "https://www.aaritshah.com";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Priority reflects what the site is for: hiring first, then the writing
  // that brings people in, then the biography pages.
  const primary = ["", "/work-with-me"];
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
  const guideRoutes = (await getPublishedGuides()).map(
    (g) => `/guides/${g.slug}`,
  );
  // Resource landing pages live at the site root, e.g. /quantresource.
  const resourceRoutes = (await getPublishedResources()).map((r) => `/${r.slug}`);

  // Guides sit with the other things that bring strangers in, because they
  // are the only pages written to be found cold from a search result.
  //
  // An index with nothing on it is thin content, so /guides and /resources
  // stay out of the sitemap until they actually hold something. They are
  // still reachable and still render; they are simply not advertised empty.
  const secondary = [
    "/markets-explained",
    "/writing",
    "/building",
    "/faq",
    ...(guideRoutes.length ? ["/guides"] : []),
    ...(resourceRoutes.length ? ["/resources"] : []),
  ];

  const priorityFor = (route: string) => {
    if (route === "") return 1;
    if (primary.includes(route)) return 0.95;
    // Guide pages outrank the rest of the archive in priority because they
    // are the pages actually competing for search traffic.
    if (guideRoutes.includes(route)) return 0.9;
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
    ...guideRoutes,
    ...resourceRoutes,
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: priorityFor(route),
  }));
}
