"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

/**
 * Type-specimen signoff. Five weights of the same name, the middle one solid.
 *
 * Opacities are deliberately higher than they look like they should be on a
 * desktop monitor: at 0.10 the outer rows are invisible on a phone screen in
 * daylight, which collapses five rows into three and kills the effect.
 */
const ROWS = [
  { weight: 200, opacity: 0.18, size: "clamp(1.5rem,5.5vw,3.5rem)" },
  { weight: 400, opacity: 0.35, size: "clamp(2rem,7vw,4.75rem)" },
  { weight: 900, opacity: 1, size: "clamp(2.6rem,9.5vw,6.5rem)" },
  { weight: 400, opacity: 0.35, size: "clamp(2rem,7vw,4.75rem)" },
  { weight: 200, opacity: 0.18, size: "clamp(1.5rem,5.5vw,3.5rem)" },
];

export function WeightStack({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      {ROWS.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: r.opacity, y: 0 }}
          viewport={VIEWPORT}
          transition={{
            duration: 0.6,
            ease: EASE_OUT_EXPO,
            // Rows resolve outward from the solid centre row.
            delay: Math.abs(2 - i) * 0.07,
          }}
          style={{ fontWeight: r.weight, fontSize: r.size }}
          className="select-none text-center font-display uppercase leading-[1.02] tracking-[-0.02em] text-ink"
        >
          Aarit Shah
        </motion.div>
      ))}
    </div>
  );
}
