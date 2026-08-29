"use client";

import { useEffect, useState } from "react";

/**
 * Homepage-only opening curtain. The exit is a clip-path wipe rather than a
 * transform so the hero underneath is never moved or repainted by it, and the
 * whole thing unmounts once the wipe finishes instead of sitting over the page
 * as an inert fixed layer.
 */
export default function IntroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("intro-locked");

    const timer = window.setTimeout(
      () => {
        document.body.classList.remove("intro-locked");
        setVisible(false);
      },
      reducedMotion ? 20 : 4020,
    );

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("intro-locked");
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="site-intro" aria-hidden="true">
      <div className="site-intro__wordmark">
        <span>AARIT</span>
        <span>SHAH</span>
      </div>
      <p className="site-intro__roles">FOUNDER · TRADER · CREATOR</p>
    </div>
  );
}
