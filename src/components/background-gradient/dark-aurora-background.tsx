"use client";

// Adapted from Opensource UI, Copyright (c) 2026 Bidyut Kundu.
// MIT license: see THIRD_PARTY_NOTICES.md.

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface DarkAuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DarkAuroraBackground = forwardRef<HTMLDivElement, DarkAuroraBackgroundProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dark-aurora-background"
        className={cn("relative isolate overflow-hidden bg-[#100d0b]", className)}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#21160f_0%,#100d0b_55%,#0a0908_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 -z-10 blur-xl"
        >
          <div className="absolute inset-0 bg-[#100d0b]" />

          <div className="absolute -left-[12%] -top-[18%] h-[68%] w-[68%] rounded-full bg-[#d4813e] opacity-20 blur-3xl" />

          <div className="absolute top-[8%] -right-[10%] h-[62%] w-[62%] rounded-full bg-[#b94d1f] opacity-10 blur-3xl" />

          <div className="absolute bottom-[-28%] left-[18%] h-[70%] w-[70%] rounded-full bg-[#a46f39] opacity-12 blur-3xl" />

          <div className="absolute right-[8%] bottom-[-16%] h-[56%] w-[56%] rounded-full bg-[#e6a85f] opacity-10 blur-3xl" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.018] [background-image:radial-gradient(circle_at_center,#FFFFFF_1px,transparent_1px)] [background-size:4px_4px]"
        />

        {children}
      </div>
    );
  },
);

DarkAuroraBackground.displayName = "DarkAuroraBackground";

export { DarkAuroraBackground };
