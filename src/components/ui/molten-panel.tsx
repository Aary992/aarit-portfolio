"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

/**
 * Heat behind the type instead of on it: the amber gradient is the surface and
 * the letterforms are cut out of it in near-black.
 *
 * This is the loudest element on the site, so it is used exactly once, on the
 * one block where the goal is to make someone act. As a hero it eats the whole
 * screen on a phone; as a CTA it earns the space.
 */
export function MoltenPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      className={`relative overflow-hidden rounded-3xl ${className ?? ""}`}
    >
      {/* The gradient is painted once onto a layer 2.2x the panel and the
          layer itself drifts under a transform. Animating background-position
          repainted the whole oversized background every frame; a translate is
          composited on the GPU. */}
      <div
        className="absolute left-0 top-[-60%] h-[220%] w-[220%] will-change-transform animate-[molten_11s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(115deg,#7c2d12 0%,#ff6b1a 28%,#fbbf24 46%,#ff6b1a 64%,#7c2d12 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.10]" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
