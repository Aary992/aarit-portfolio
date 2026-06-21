import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

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
            "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-6 bg-amber/60" />
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
