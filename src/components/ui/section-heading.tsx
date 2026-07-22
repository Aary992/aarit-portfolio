"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { DUR, EASE_IN_OUT_QUINT, VIEWPORT } from "@/lib/motion";

export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
}: {
  label: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-amber",
            align === "center" && "justify-center",
          )}
        >
          {/* The band again, at its smallest: a rule that draws itself in. */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: EASE_IN_OUT_QUINT }}
            style={{ transformOrigin: "left" }}
            className="h-[2px] w-8 bg-gradient-to-r from-ember to-amber"
          />
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-heading mt-4 font-display font-semibold">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
