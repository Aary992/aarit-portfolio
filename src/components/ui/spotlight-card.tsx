"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  glowColor?: "blue" | "purple" | "green" | "red" | "orange";
  size?: "sm" | "md" | "lg";
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  customSize?: boolean;
}
const colors = { blue: "#83baff", purple: "#be9cff", green: "#9ed5ad", red: "#f79d91", orange: "#efac77" };
const sizes = { sm: "w-48 h-64", md: "w-64 h-80", lg: "w-80 h-96" };

/** Adapted from the supplied GlowCard. Local pointer coordinates also work
 * inside transformed rails; normal touch scrolling is deliberately preserved. */
export function GlowCard({ children, className, glowColor = "orange", size = "md", width, height, customSize = false, style, onPointerMove, onPointerLeave, ...props }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number>(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return <div {...props} ref={ref} data-glow className={cn("spotlight-card", !customSize && sizes[size], className)}
    style={{ "--spotlight-color": colors[glowColor], width, height, ...style } as CSSProperties}
    onPointerMove={(event) => {
      onPointerMove?.(event);
      if (event.pointerType === "touch") return;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) * element.offsetWidth / rect.width;
      const y = (event.clientY - rect.top) * element.offsetHeight / rect.height;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        element.style.setProperty("--spot-x", `${x}px`);
        element.style.setProperty("--spot-y", `${y}px`);
        element.dataset.active = "true";
      });
    }}
    onPointerLeave={(event) => {
      onPointerLeave?.(event);
      cancelAnimationFrame(frame.current);
      if (ref.current) ref.current.dataset.active = "false";
    }}>
    <span className="spotlight-card__wash" aria-hidden="true" />
    {children}
  </div>;
}
