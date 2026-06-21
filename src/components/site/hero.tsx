"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, AtSign } from "lucide-react";
import { Portrait } from "@/components/ui/portrait";
import { Counter } from "@/components/ui/counter";
import HeroShader from "@/components/site/hero-shader";

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
  { value: "2.7M", label: "monthly views" },
  { value: "23K", label: "followers / 30 days" },
  { value: "52%", label: "CAGR on stock portfolio*" },
  { value: "3", label: "ventures building" },
];

const roles = ["Founder", "Trader", "Creator"];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden px-6 pt-32 pb-16"
    >
      <HeroShader />
      <div className="pointer-events-none absolute inset-0 amber-glow opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div
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

          <motion.h1
            variants={item}
            className="group cursor-default select-none font-display text-[clamp(3.75rem,13vw,12rem)] font-black uppercase leading-[0.8] tracking-[-0.04em]"
          >
            <span className="name-sheen block">Aarit</span>
            <span className="name-outline block transition-colors duration-500">
              Shah
            </span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-7 flex items-center gap-3 font-mono text-sm uppercase tracking-[0.18em] text-muted"
          >
            {roles.map((r, i) => (
              <span key={r} className="flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-amber" />}
                {r}
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            I build what I wish existed: an{" "}
            <span className="text-ink">AI trading engine</span>, a{" "}
            <span className="text-ink">
              finance game for <span className="whitespace-nowrap">Gen-Z</span>
            </span>
            , a <span className="text-ink">founders&apos; club</span>. Then I break
            it all down for 1,500 people, every day.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02]"
            >
              Book a call
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-edge-strong px-6 py-3.5 text-base font-medium text-ink transition-colors duration-200 hover:bg-surface"
            >
              View the work
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
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
            animate={{ y: [0, -9, 0] }}
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
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 bottom-20 flex items-center gap-2 rounded-2xl border border-edge bg-night/70 px-3.5 py-2.5 backdrop-blur-md transition-colors hover:border-edge-strong"
          >
            <AtSign className="h-4 w-4 text-amber" />
            <span className="font-mono text-xs text-muted">@withaarit</span>
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto mt-16 w-full max-w-6xl"
      >
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
      </motion.div>
    </section>
  );
}
