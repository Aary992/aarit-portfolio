"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  DUR,
  EASE_OUT_EXPO,
  VIEWPORT,
  lineVariants,
  riseVariants,
  staggerVariants,
} from "@/lib/motion";

/**
 * Rise. The workhorse: a block of content lifting into place.
 * Same API as before, so every existing call site keeps working.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.slow, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
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
