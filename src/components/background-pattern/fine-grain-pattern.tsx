"use client";

// Adapted from Opensource UI, Copyright (c) 2026 Bidyut Kundu.
// MIT license: see THIRD_PARTY_NOTICES.md.

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface FineGrainPatternProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  tone?: "light" | "dark";
}

const FineGrainPattern = forwardRef<HTMLDivElement, FineGrainPatternProps>(
  ({ children, className, tone = "light", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="fine-grain-pattern"
        className={cn(
          "relative isolate overflow-hidden",
          tone === "dark" ? "bg-night" : "bg-[#FAFAFA]",
          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10",
            tone === "dark"
              ? "bg-grain [background-size:180px_180px] opacity-[0.045]"
              : "[background-image:radial-gradient(circle,#d4d4d4_1px,transparent_1px)] [background-size:3px_3px] opacity-55",
          )}
        />

        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10",
            tone === "dark"
              ? "bg-[radial-gradient(ellipse_at_50%_30%,rgba(120,75,35,0.035),transparent_70%)]"
              : "[background-image:radial-gradient(circle,#e5e5e5_1px,transparent_1px)] [background-size:5px_5px] opacity-40",
          )}
        />

        {children}
      </div>
    );
  },
);

FineGrainPattern.displayName = "FineGrainPattern";

export { FineGrainPattern };
