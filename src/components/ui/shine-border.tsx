"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type TColorProp = string | string[];

/**
 * Animated glowing border overlay. Drop it inside any `relative` element
 * with matching corner radius; it renders an animated gradient ring on top.
 */
export function ShineBorder({
  borderRadius = 24,
  borderWidth = 1,
  duration = 14,
  color = "#f59e0b",
  className,
}: {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
}) {
  return (
    <div
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--border-radius": `${borderRadius}px`,
          "--duration": `${duration}s`,
          "--mask-linear-gradient":
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          "--background-radial-gradient": `radial-gradient(transparent, transparent, ${
            Array.isArray(color) ? color.join(",") : color
          }, transparent, transparent)`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[var(--border-radius)]",
        "before:absolute before:inset-0 before:size-full before:rounded-[var(--border-radius)] before:p-[var(--border-width)] before:content-['']",
        "before:![-webkit-mask-composite:xor] before:[mask-composite:exclude]",
        "before:[background-image:var(--background-radial-gradient)] before:[background-size:300%_300%]",
        "before:[mask:var(--mask-linear-gradient)] before:will-change-[background-position]",
        "motion-safe:before:animate-shine",
        className,
      )}
    />
  );
}
