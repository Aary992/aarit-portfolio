import { getPublishedPosts } from "@/lib/market-posts";

const BASE = "https://www.aaritshah.com";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const revalidate = 300;

export async function GET() {
  const posts = await getPublishedPosts();

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(`Day ${p.day}: ${p.title}`)}</title>
      <link>${BASE}/markets-explained/${p.slug}</link>
      <guid isPermaLink="true">${BASE}/markets-explained/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escape(p.dek)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Markets, Explained · Aarit Shah</title>
    <link>${BASE}/markets-explained</link>
    <atom:link href="${BASE}/markets-explained/rss.xml" rel="self" type="application/rss+xml" />
    <description>Why markets did what they did, explained down to the mechanism. Educational only, not investment advice, not SEBI registered.</description>
    <language>en-IN</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
