import { ImageResponse } from "next/og";

export const shareCardSize = { width: 1200, height: 630 };

/**
 * The branded 1200x630 share card used by per-page opengraph-image routes:
 * an eyebrow with the site's amber band, the page title, and a sign-off row.
 * One layout for Markets, Explained posts, writing posts and venture pages.
 */
export function shareCard({
  eyebrow,
  title,
  footnote = "Educational only · Not SEBI registered",
}: {
  eyebrow: string;
  title: string;
  footnote?: string;
}) {
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
              "radial-gradient(circle, rgba(255,107,26,0.45) 0%, rgba(245,158,11,0.18) 27%, rgba(10,10,11,0) 50%)",
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
            {eyebrow}
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
          <div style={{ display: "flex", fontSize: 22, color: "#82828b" }}>
            {footnote}
          </div>
        </div>
      </div>
    ),
    { ...shareCardSize },
  );
}
