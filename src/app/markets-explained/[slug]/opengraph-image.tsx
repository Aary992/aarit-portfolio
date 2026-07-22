import { ImageResponse } from "next/og";
import { getPostBySlug, getPublishedPosts } from "@/lib/market-posts";

export const alt = "Markets, Explained — Aarit Shah";
export const size = { width: 1200, height: 630 };
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

  const title = post?.title ?? "Markets, Explained";
  // The display face shrinks as the headline grows, so a long title stays on
  // the card instead of overflowing it.
  const titleSize = title.length > 52 ? 68 : title.length > 34 ? 84 : 104;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -280,
            right: -200,
            width: 800,
            height: 800,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,107,26,0.45) 0%, rgba(245,158,11,0.18) 38%, rgba(10,10,11,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* The band, the same device the site uses everywhere else. */}
          <div
            style={{
              width: 72,
              height: 8,
              background: "linear-gradient(90deg, #ff6b1a, #f59e0b)",
            }}
          />
          <div
            style={{
              fontSize: 24,
              color: "#f59e0b",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {post ? `Markets, Explained · Day ${post.day}` : "Markets, Explained"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 800,
            color: "#fafaf9",
            lineHeight: 1.03,
            letterSpacing: -3,
            maxWidth: 1010,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, color: "#fafaf9" }}>
            Aarit Shah
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#71717a" }}>
            Educational only · Not SEBI registered
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
