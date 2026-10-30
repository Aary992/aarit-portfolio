import { posts } from "@/lib/data";
import { shareCard, shareCardSize } from "@/lib/share-card";

export const alt = "Writing by Aarit Shah";
export const size = shareCardSize;
export const contentType = "image/png";

/**
 * Per-post share card. The page sets its own openGraph block, which replaces
 * the root's, so without this route a shared post had no preview image.
 */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function WritingOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return shareCard({
    eyebrow: p ? `Writing · ${p.category}` : "Writing",
    title: p?.title ?? "Notes on software and markets",
  });
}
