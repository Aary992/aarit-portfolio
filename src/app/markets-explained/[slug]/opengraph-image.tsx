import { getPostBySlug, getPublishedPosts } from "@/lib/market-posts";
import { shareCard, shareCardSize } from "@/lib/share-card";

export const alt = "Markets, Explained — Aarit Shah";
export const size = shareCardSize;
export const contentType = "image/png";

/**
 * Per-post share card. These posts get shared on LinkedIn, which is the whole
 * distribution channel for the series, and without this they rendered as a
 * bare link with no image at all.
 *
 * Pre-generated for published posts; anything newer falls through to on-demand
 * generation, so a post published in /admin still gets a card immediately.
 */
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return shareCard({
    eyebrow: post ? `Markets, Explained · Day ${post.day}` : "Markets, Explained",
    title: post?.title ?? "Markets, Explained",
  });
}
