"use client";

import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonAppearance = { tone?: "dark" | "orange" | "accent"; arrow?: boolean; compact?: boolean };
const frame = "spinning-border group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full p-px align-middle transition-transform duration-300 motion-safe:hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50";

function Surface({ children, tone = "dark", arrow = true, compact }: ButtonAppearance & { children: ReactNode }) {
  return <>
    <span aria-hidden="true" className="spinning-border__beam pointer-events-none absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#fff4d6_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0 rounded-full transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0", tone === "dark" ? "bg-zinc-600" : "bg-[#ffca82]/80")} />
    <span className={cn("relative flex h-full min-h-11 w-full items-center justify-center gap-2.5 rounded-full py-3 text-xs font-semibold tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_4px_#0002]", compact ? "px-4" : "px-6", tone === "orange" ? "bg-gradient-to-br from-[#ffb347] via-[#ff8a28] to-[#f56a1c] text-[#241307]" : tone === "accent" ? "bg-[var(--accent)] text-night" : "bg-gradient-to-b from-zinc-800 to-zinc-950 text-zinc-200 group-hover:text-white")}>
      {children}{arrow && <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5" />}
    </span>
  </>;
}

export type SpinningBorderButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonAppearance;
export const SpinningBorderButton = forwardRef<HTMLButtonElement, SpinningBorderButtonProps>(
  ({ children, className, type = "button", tone, arrow, compact, ...props }, ref) => (
    <button ref={ref} type={type} className={cn(frame, className)} {...props}><Surface tone={tone} arrow={arrow} compact={compact}>{children}</Surface></button>
  ),
);
SpinningBorderButton.displayName = "SpinningBorderButton";

export const SpinningBorderLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & ButtonAppearance>(
  ({ children, className, tone, arrow, compact, ...props }, ref) => (
    <a ref={ref} className={cn(frame, className)} {...props}><Surface tone={tone} arrow={arrow} compact={compact}>{children}</Surface></a>
  ),
);
SpinningBorderLink.displayName = "SpinningBorderLink";
export default SpinningBorderButton;
