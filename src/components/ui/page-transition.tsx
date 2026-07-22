"use client";

import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Wraps page content so route changes animate as a directional slide.
 *
 * `default: "none"` matters: without it every ViewTransition on the page fires
 * on every unrelated transition, and initial page loads animate too, which
 * reads as a bug rather than a flourish. Only navigations that carry an
 * explicit transition type from <Link transitionTypes> animate.
 *
 * Browsers without the View Transitions API just navigate normally.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
