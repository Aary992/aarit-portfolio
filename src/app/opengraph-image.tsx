import { ImageResponse } from "next/og";

export const alt = "Aarit Shah — Founder, Trader & Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        {/* amber glow */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -180,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(255,107,26,0.45) 0%, rgba(245,158,11,0.18) 38%, rgba(10,10,11,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #ff6b1a, #f59e0b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0a0b",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#a1a1aa",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            South Bombay, India
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 168,
              fontWeight: 800,
              color: "#fafaf9",
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            Aarit Shah
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 40,
              color: "#f59e0b",
              letterSpacing: 1,
            }}
          >
            Founder · Trader · Creator
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a1a1aa",
            maxWidth: 900,
          }}
        >
          Building MarketPlay, GetAITrade and 10x Founders.
        </div>
      </div>
    ),
    { ...size },
  );
}
