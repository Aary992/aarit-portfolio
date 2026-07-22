"use client";

import { useSyncExternalStore } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

// A static CSS gradient that mimics the mesh — used on phones, low-power
// devices and when reduced motion is requested, so we never spin up WebGL there.
function StaticGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(70% 60% at 70% 12%, #ff6b1a 0%, transparent 55%), radial-gradient(60% 55% at 25% 30%, #f59e0b 0%, transparent 60%), radial-gradient(80% 70% at 50% 0%, #5a2a00 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/30 to-night" />
    </div>
  );
}

// Only run the GPU shader on larger, fine-pointer devices that aren't asking
// for reduced motion. Phones get the cheap static gradient.
const QUERY =
  "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Read as an external store rather than setting state in an effect: the
 * server has no matchMedia, so the value cannot be computed during render,
 * and useSyncExternalStore is the API built for exactly that split. It also
 * keeps the gate live, so rotating a tablet or plugging in a mouse
 * re-evaluates instead of being stuck at the first-paint answer.
 */
function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export default function HeroShader() {
  const enableWebGL = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false, // server and first paint: assume the cheap path
  );

  if (!enableWebGL) return <StaticGradient />;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-60"
        colors={["#0a0a0b", "#180d01", "#5a2a00", "#f59e0b", "#ff6b1a"]}
        speed={0.3}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/30 to-night" />
    </div>
  );
}
