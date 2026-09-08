"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useScrollContainer } from "./scroll-scene";
import { VIEWPORT, lineVariants, riseVariants, staggerVariants } from "@/lib/motion";

/** Zoom forward on entry, hold at reading size, then drift past the viewer. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const anchor = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ target: anchor, container, offset: ["start 100%", "start 48%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: .25 });
  const { scrollYProgress: exitProgress } = useScroll({ target: anchor, container, offset: ["end 35%", "end start"] });
  const exit = useSpring(exitProgress, { stiffness: 180, damping: 32, mass: .25 });
  const start = Math.min(delay, .15);
  const entrance = useTransform(progress, [start, 1], [0, 1]);
  const scale = useTransform(() => .72 + .28 * entrance.get() + .04 * exit.get());
  const x = useTransform(() => 18 * (1 - entrance.get()) - 12 * exit.get());
  const y = useTransform(() => 72 * (1 - entrance.get()) - 36 * exit.get());
  const opacity = useTransform(progress, [start, .85], [.5, 1]);
  return <div ref={anchor} className={className} data-scroll-reveal="">
    <motion.div className="h-full" style={reduced ? undefined : { x, y, scale, opacity, transformOrigin: "50% 50%" }}>{children}</motion.div>
  </div>;
}

/**
 * Masked line reveal. Each child slides up out of its own clip box, so the
 * text appears to be uncovered rather than faded in. Headings only.
 *
 * Pass one string per line; the caller decides where lines break, because
 * automatic line splitting is unreliable across the fluid type scale.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={staggerVariants(stagger, delay)}
      style={{ display: "block" }}
    >
      {lines.map((line, i) => (
        // The clip box. overflow-hidden here is what makes this a reveal.
        <span key={i} className="block overflow-hidden">
          <motion.span
            variants={lineVariants}
            className={lineClassName}
            style={{ display: "block", willChange: "transform" }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Staggered children. Wrap a list/grid, and each direct child rises in
 * sequence. Children must be wrapped in <RevealItem>.
 */
export function RevealStagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={staggerVariants(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={riseVariants}>
      {children}
    </motion.div>
  );
}
