"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { SpinningBorderLink } from "@/components/ui/spinning-border-button";
import { newsletter } from "@/lib/data";

export default function Newsletter() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: .25 });
  const y = useTransform(progress, [0, .45, 1], [80, 0, 0]);
  const scale = useTransform(progress, [0, .45, 1], [.94, 1, 1]);
  const copyY = useTransform(progress, [.08, .48, 1], [36, 0, 0]);
  const lightY = useTransform(progress, [0, 1], [100, -100]);
  const line = useTransform(progress, [.08, .55], [0, 1]);

  return (
    <section ref={ref} id="newsletter" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <motion.div data-scroll-layer="newsletter-panel" style={reduced ? undefined : { y, scale }} className="relative isolate overflow-hidden rounded-3xl border border-amber/20 bg-[#14100e] p-8 shadow-[0_30px_90px_-45px_#000] sm:p-14">
        <motion.div aria-hidden="true" style={reduced ? undefined : { y: lightY }} className="pointer-events-none absolute -inset-y-32 inset-x-0 -z-10 bg-[radial-gradient(ellipse_at_85%_40%,rgba(210,100,36,0.18),transparent_65%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-grain opacity-[0.08]" />
        <motion.div aria-hidden="true" style={reduced ? undefined : { scaleX: line }} className="absolute inset-x-8 top-0 h-px origin-left bg-gradient-to-r from-transparent via-orange-300/60 to-transparent sm:inset-x-14" />
        <motion.div style={reduced ? undefined : { y: copyY }} className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">Newsletter</span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl">{newsletter.title}</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-muted">{newsletter.desc}</p>
          </div>
          <SpinningBorderLink href={newsletter.href} target="_blank" rel="noopener noreferrer" tone="orange" className="shrink-0">{newsletter.cta}</SpinningBorderLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
