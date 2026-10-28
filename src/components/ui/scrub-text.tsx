"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useScrollContainer } from "./scroll-scene";

/**
 * Scroll-scrubbed reading. The paragraph starts dim and each word lights up as
 * the reader scrolls past it, so the scroll is the playhead and the text never
 * runs ahead of them. Words in `accents` land in amber. Transform and opacity
 * only, per lib/motion.
 *
 * Screen readers get the plain sentence; the per-word spans are hidden from
 * them so the text is not read one word at a time.
 */
export function ScrubText({
  text,
  accents = [],
  className,
}: {
  text: string;
  accents?: string[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const container = useScrollContainer();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, container, offset: ["start 88%", "end 62%"] });
  const words = text.split(" ");
  const accentSet = new Set(accents);

  if (reduced) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            <ScrubWord
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              accent={accentSet.has(word.replace(/[.,;:!?]/g, ""))}
            />
            {i < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </p>
  );
}

function ScrubWord({
  word,
  range,
  progress,
  accent,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className={accent ? "inline-block text-amber" : "inline-block"}>
      {word}
    </motion.span>
  );
}
