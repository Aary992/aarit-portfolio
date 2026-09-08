"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { AtSign } from "lucide-react";
import { SpinningBorderLink } from "@/components/ui/spinning-border-button";
import { Portrait } from "@/components/ui/portrait";
import { Counter } from "@/components/ui/counter";
import { NameLockup } from "@/components/ui/name-lockup";
import { Reveal } from "@/components/ui/reveal";
import { DarkAuroraBackground } from "@/components/background-gradient/dark-aurora-background";
import { AnnotatedText } from "@/components/underlines/annotated-text";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { value: "4M", label: "views / last 90 days" },
  { value: "22K", label: "followers" },
  { value: "52%", label: "CAGR on stock portfolio*" },
  { value: "3", label: "ventures building" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end 35%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.35,
  });
  const backdropY = useTransform(progress, [0, 1], [0, 200]);
  const backdropScale = useTransform(progress, [0, 1], [1, 1.12]);
  const copyY = useTransform(progress, [0, 1], [0, -60]);
  const copyScale = useTransform(progress, [0, 1], [1, 1.035]);
  const portraitX = useTransform(progress, [0, 1], [0, -24]);
  const portraitY = useTransform(progress, [0, 1], [0, -90]);
  const portraitScale = useTransform(progress, [0, 1], [1, 1.18]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative w-full overflow-hidden px-6 pt-32 pb-4"
    >
      <motion.div className="pointer-events-none absolute -inset-y-32 inset-x-0" style={reduceMotion ? undefined : { y: backdropY, scale: backdropScale }}>
      <DarkAuroraBackground
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12"
      >
        <motion.div
          data-scroll-layer="hero-copy"
          style={reduceMotion ? undefined : { y: copyY, scale: copyScale, transformOrigin: "left center" }}
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start text-left"
        >
          <motion.div
            variants={item}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-edge bg-surface/40 px-4 py-1.5 font-mono text-xs tracking-wide text-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            South Bombay, IN · open to collaborations
          </motion.div>

          <motion.h1 variants={item} className="w-full">
            <NameLockup />
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            I build tools for problems I have run into: <AnnotatedText variant="underline" color="text-amber/75" className="text-ink">GetAITrade</AnnotatedText>{" "}
            for preparing trades, <AnnotatedText variant="wavy" color="text-orange-300/75" className="text-ink">MarketPlay</AnnotatedText> for learning
            finance, and <AnnotatedText variant="underline" color="text-amber/75" className="text-ink">10x Founders</AnnotatedText> for small founder
            gatherings. I also explain software, markets and trading to a community of
            1,500 people.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <SpinningBorderLink href="#contact" tone="orange">Book a call
              </SpinningBorderLink>
            <SpinningBorderLink href="#work">
              View the work
            </SpinningBorderLink>
          </motion.div>
        </motion.div>

        <motion.div
          data-scroll-layer="hero-portrait"
          style={reduceMotion ? undefined : { x: portraitX, y: portraitY, scale: portraitScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <Portrait
            src="/portrait.png"
            alt="Aarit Shah"
            className="aspect-[4/5]"
            objectPosition="center 20%"
            sizes="(max-width: 1024px) 90vw, 460px"
            priority
            placeholderLabel="Add your portrait"
            placeholderHint="Save it to public/portrait.png"
          />

          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-10 flex items-center gap-2 rounded-2xl border border-edge bg-night/70 px-3.5 py-2.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-xs text-muted">Available for work</span>
          </motion.div>

          <motion.a
            href="https://instagram.com/withaarit"
            target="_blank"
            rel="noopener noreferrer"
            animate={reduceMotion ? undefined : { y: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 bottom-20 flex items-center gap-2 rounded-2xl border border-edge bg-night/70 px-3.5 py-2.5 backdrop-blur-md transition-colors hover:border-edge-strong"
          >
            <AtSign className="h-4 w-4 text-amber" />
            <span className="font-mono text-xs text-muted">@withaarit</span>
          </motion.a>
        </motion.div>
      </motion.div>

      <Reveal className="relative z-10 mx-auto mt-16 w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group/stat flex flex-col gap-1.5 bg-night px-5 py-6 transition-colors duration-300 hover:bg-surface/40"
            >
              <Counter
                value={s.value}
                className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl"
              />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-amber/80">
                {s.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-faint">
          *Personal track record, educational only. Not SEBI registered. No
          tips, calls or signals.
        </p>
      </Reveal>
    </section>
  );
}
