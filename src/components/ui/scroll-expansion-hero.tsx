"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

export interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  mediaAlt?: string;
  mediaContent?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Scroll-linked expansion scoped to this section; never captures wheel/touch. */
export default function ScrollExpandMedia({ mediaType = "image", mediaSrc, posterSrc, bgImageSrc, title, date, scrollToExpand = "Scroll to explore", textBlend, mediaAlt = title ?? "Project preview", mediaContent, children, className }: ScrollExpandMediaProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const width = useTransform(scrollYProgress, [0, 0.85], ["32%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.85], ["62%", "84%"]);
  const radius = useTransform(scrollYProgress, [0, 0.85], [32, 16]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -40]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45, 0.85], [1, 1, 0]);

  return <div className={cn("scroll-expansion", className)}>
    <div ref={sectionRef} className="scroll-expansion__track relative h-[150svh] motion-reduce:h-auto">
      <div className="scroll-expansion__stage sticky top-0 flex h-svh min-h-[540px] items-center justify-center overflow-hidden motion-reduce:relative motion-reduce:h-[80svh]">
        {bgImageSrc && <Image src={bgImageSrc} alt="" fill sizes="100vw" className="object-cover opacity-15" />}
        <motion.div className="pointer-events-none absolute inset-x-6 top-24 z-20 text-center" style={reducedMotion ? undefined : { y: textY, opacity: textOpacity }}>
          {date && <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-amber">{date}</p>}
          {title && <h2 className={cn("font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-none tracking-tight text-ink", textBlend && "mix-blend-difference")}>{title}</h2>}
        </motion.div>
        <motion.div data-slot="expanding-media" className="scroll-expansion__media relative mt-12 min-w-[min(82vw,340px)] overflow-hidden border border-white/10 bg-[#100d1c] shadow-[0_20px_90px_#0008]" style={{ width: reducedMotion ? "100%" : width, height: reducedMotion ? "84%" : height, borderRadius: reducedMotion ? 16 : radius }}>
          {mediaContent ?? (mediaType === "video"
            ? <video src={mediaSrc} poster={posterSrc} aria-label={mediaAlt} autoPlay={false} controls playsInline preload="none" className="h-full w-full object-contain" />
            : <Image src={mediaSrc} alt={mediaAlt} fill sizes="(max-width: 768px) 100vw, 90vw" className="object-contain" />)}
        </motion.div>
        <motion.p aria-hidden="true" className="pointer-events-none absolute bottom-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted motion-reduce:hidden" style={{ opacity: textOpacity }}>{scrollToExpand} ↓</motion.p>
      </div>
    </div>
    {children && <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-20">{children}</div>}
  </div>;
}
