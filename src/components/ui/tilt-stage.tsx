"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Tilts its children a few degrees toward the cursor and exposes the pointer
 * position as --sheen-x / --sheen-y for a light sheen inside. Children keep
 * their own layout; only a transform is applied, so nothing shifts. Touch and
 * reduced motion get no tilt.
 */
export function TiltStage({
  children,
  className,
  maxTilt = 7,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <div
      ref={ref}
      className={cn("tilt-stage", className)}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType === "touch") return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          el.style.transform = `perspective(1100px) rotateY(${nx * maxTilt * 2}deg) rotateX(${-ny * maxTilt * 1.7}deg)`;
          el.style.setProperty("--sheen-x", `${(nx + 0.5) * 100}%`);
          el.style.setProperty("--sheen-y", `${(ny + 0.5) * 100}%`);
        });
      }}
      onPointerLeave={() => {
        cancelAnimationFrame(frame.current);
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}
