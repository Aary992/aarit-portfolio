"use client";

/**
 * Scratch lab: five text and scroll motion directions, built on the site's
 * real copy. Dev only (the lab layout 404s in production). Delete this folder
 * once directions are picked and moved into components/ui.
 */

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { ventures, marqueeItems } from "@/lib/data";
import { EASE_OUT_EXPO } from "@/lib/motion";

/* ── Frame ─────────────────────────────────────────────────────────────── */

function Idea({ n, title, where, children }: { n: string; title: string; where: string; children: ReactNode }) {
  return (
    <section data-idea={n} className="border-t border-edge">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Idea {n}</p>
        <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.03em] sm:text-4xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-faint">Where it goes: {where}</p>
      </div>
      {children}
    </section>
  );
}

/* ── 01. Scroll-scrubbed reading ───────────────────────────────────────────
   Body copy starts dim and each word lights up as the reader scrolls past it.
   Key words land in amber. The scroll is the playhead, so it never runs ahead
   of the reader. */

function ScrubWord({ word, range, progress, accent }: { word: string; range: [number, number]; progress: MotionValue<number>; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className={accent ? "inline-block text-amber" : "inline-block"}>
      {word}&nbsp;
    </motion.span>
  );
}

function ScrubParagraph({ text, accents }: { text: string; accents: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  if (reduced) return <p className="text-[clamp(1.6rem,3.6vw,2.9rem)] font-semibold leading-[1.18] tracking-[-0.02em]">{text}</p>;
  return (
    <p ref={ref} className="flex flex-wrap text-[clamp(1.6rem,3.6vw,2.9rem)] font-semibold leading-[1.18] tracking-[-0.02em]">
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <ScrubWord
            key={i}
            word={w}
            progress={scrollYProgress}
            range={[start, start + 1 / words.length]}
            accent={accents.includes(w.replace(/[.,]/g, ""))}
          />
        );
      })}
    </p>
  );
}

/* ── 02. Kinetic headline ──────────────────────────────────────────────────
   Every letter rises out of its own mask with a slight rotation, the serif
   accent tilts in after it, and a hand-drawn underline strokes itself under
   the accent. Replaces the whole-block zoom on headings. */

function KineticHeadline({ plain, accent }: { plain: string; accent: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });
  const reduced = useReducedMotion();
  const show = reduced || inView;
  let index = 0;
  const letters = (text: string, serif: boolean) =>
    text.split(" ").map((word, w) => (
      <span key={`${serif}-${w}`} className="inline-flex whitespace-nowrap">
        {word.split("").map((ch) => {
          const i = index++;
          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="inline-block"
                initial={false}
                animate={show ? { y: "0%", rotate: 0, opacity: 1 } : { y: "105%", rotate: serif ? -12 : 8, opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: show ? i * 0.028 : 0 }}
                style={{ transformOrigin: serif ? "0% 100%" : "50% 100%" }}
              >
                {ch}
              </motion.span>
            </span>
          );
        })}
        <span>&nbsp;</span>
      </span>
    ));
  const total = (plain + accent).replace(/ /g, "").length;
  return (
    <h3 ref={ref} className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-black leading-[0.95] tracking-[-0.035em]">
      {letters(plain, false)}
      <span className="relative inline-block font-serif font-normal italic text-amber">
        {letters(accent, true)}
        <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" className="absolute -bottom-[0.12em] left-0 h-[0.22em] w-[92%] overflow-visible">
          <motion.path
            d="M4 16 C 60 6, 120 4, 180 10 S 270 18, 296 8"
            fill="none"
            stroke="url(#kinetic-ul)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: show ? 1 : 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: show ? total * 0.028 + 0.1 : 0 }}
          />
          <defs>
            <linearGradient id="kinetic-ul" x1="0" x2="1">
              <stop offset="0" stopColor="#ff6b1a" />
              <stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </span>
    </h3>
  );
}

/* ── 03. Terminal decode + odometer numbers ────────────────────────────────
   Mono labels resolve out of random characters like a ticker coming online,
   and figures roll into place digit by digit like an exchange board. */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%/+-";

function Decode({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!inView || reduced) return;
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame++;
      const settled = Math.floor(frame / 2.2);
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " || i < settled ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join(""),
      );
      if (settled < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, text]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

function Digit({ d, show, delay }: { d: number; show: boolean; delay: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden leading-none">
      <motion.span
        className="flex flex-col"
        initial={false}
        animate={{ y: show ? `${-d * 10}%` : "0%" }}
        transition={{ type: "spring", stiffness: 70, damping: 16, mass: 1, delay }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="block h-[1em]">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function Odometer({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const show = reduced || inView;
  let digitIndex = 0;
  return (
    <span ref={ref} aria-label={value} className="inline-flex font-display font-black tabular-nums tracking-[-0.04em]">
      {value.split("").map((c, i) =>
        /\d/.test(c) ? (
          <Digit key={i} d={Number(c)} show={show} delay={digitIndex++ * 0.08} />
        ) : (
          <motion.span
            key={i}
            aria-hidden="true"
            className="inline-block text-amber"
            initial={false}
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {c}
          </motion.span>
        ),
      )}
    </span>
  );
}

/* ── 04. Stacked venture cards ─────────────────────────────────────────────
   Cards pin and pile up. Each new card slides over the last, which steps back,
   shrinks and dims, and the screenshot inside opens out of a clip mask. */

function StackCard({ i, total, progress, v }: { i: number; total: number; progress: MotionValue<number>; v: (typeof ventures)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 30%"] });
  const clip = useTransform(enter, [0, 1], [18, 0]);
  const clipPath = useTransform(clip, (c) => `inset(${c}% ${c}% ${c}% ${c}% round 18px)`);
  const imgScale = useTransform(enter, [0, 1], [1.25, 1]);
  const target = 1 - (total - 1 - i) * 0.06;
  const scale = useTransform(progress, [i / total, 1], [1, target]);
  const dim = useTransform(progress, [i / total, 1], [0, i === total - 1 ? 0 : 0.55]);
  return (
    <div ref={ref} className="sticky flex h-[88svh] items-start justify-center" style={{ top: `calc(9svh + ${i * 22}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: "50% 0%" }}
        className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-edge bg-surface md:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="flex flex-col justify-between gap-8 p-8 sm:p-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: v.accent }}>
              {String(i + 1).padStart(2, "0")} · {v.role}
            </p>
            <h3 className="mt-4 font-display text-4xl font-black tracking-[-0.035em] sm:text-5xl">{v.name}</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">{v.tagline}</p>
          </div>
          <p className="font-mono text-xs text-faint">{v.status.replace("Â", "")}</p>
        </div>
        <div className="relative min-h-[260px] p-4 sm:min-h-[380px]">
          <motion.div className="absolute inset-4 overflow-hidden" style={{ clipPath }}>
            <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
              <Image src={v.image} alt="" fill sizes="(max-width: 768px) 90vw, 560px" className="object-cover object-top" />
            </motion.div>
          </motion.div>
        </div>
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-night" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

function StackedVentures() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative mx-auto mt-10 max-w-6xl px-6 pb-[20svh]">
      {ventures.map((v, i) => (
        <StackCard key={v.slug} i={i} total={ventures.length} progress={scrollYProgress} v={v} />
      ))}
    </div>
  );
}

/* ── 05. Velocity marquee ──────────────────────────────────────────────────
   Two oversized rows drift in opposite directions. Scrolling speeds them up
   and leans them into the motion; scrolling up flips their direction. */

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

function VelocityRow({ items, base, outline }: { items: string[]; base: number; outline?: boolean }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const skew = useTransform(velocity, [-2000, 0, 2000], [8, 0, -8]);
  const direction = useRef(1);
  const tx = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);
  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    x.set(x.get() + direction.current * base * (delta / 1000) * (1 + Math.abs(f)));
  });
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap py-2">
      <motion.div className="flex w-max" style={{ x: tx, skewX: skew }}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center font-display text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-none tracking-[-0.04em]">
            <span
              className={outline ? "text-transparent" : "bg-gradient-to-r from-ink via-[#ffd6a0] to-ember bg-clip-text text-transparent"}
              style={outline ? { WebkitTextStroke: "1.5px rgba(250,250,249,.4)" } : undefined}
            >
              {t}
            </span>
            <span className="mx-[0.35em] text-[0.4em] text-amber">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function MotionLab() {
  return (
    <main className="bg-night pb-40">
      <header className="mx-auto max-w-6xl px-6 pt-40 pb-16">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber">Lab · motion</p>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,9vw,7rem)] font-black leading-[0.9] tracking-[-0.03em]">
          Five ways to <span className="font-serif font-normal italic text-amber">move.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
          Scroll slowly. Every demo uses the site&apos;s real copy, colours and type. Today every block zooms in the same way; each idea below replaces that for one kind of content.
        </p>
      </header>

      <Idea n="01" title="Scroll-scrubbed reading" where="About copy, the homepage intro, venture descriptions and long intros">
        <div className="mx-auto max-w-5xl px-6 py-[30svh]">
          <ScrubParagraph
            accents={["GetAITrade", "MarketPlay", "10x", "Founders"]}
            text="My team and I built GetAITrade because I wanted a better way to prepare and review trades. I built MarketPlay to help people my age learn about finance by making decisions. We started 10x Founders for smaller, more considered gatherings."
          />
        </div>
      </Idea>

      <Idea n="02" title="Kinetic headlines" where="Every SectionHeading and PageHeader title, site-wide">
        <div className="mx-auto flex max-w-6xl flex-col gap-[22svh] px-6 py-[22svh]">
          <KineticHeadline plain="I'd rather build it than" accent="buy it." />
          <KineticHeadline plain="Where it" accent="started." />
          <KineticHeadline plain="How I got" accent="here." />
        </div>
      </Idea>

      <Idea n="03" title="Terminal decode and odometer numbers" where="Eyebrow labels, the hero stats, venture metrics and the timeline HUD">
        <div className="mx-auto max-w-6xl px-6 py-[22svh]">
          <Decode text="EXPLORE / SIX CHAPTERS · SOUTH BOMBAY, IN" className="font-mono text-sm tracking-[0.2em] text-amber" />
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-4">
            {[
              { value: "4M", label: "views / last 90 days" },
              { value: "22K", label: "followers" },
              { value: "52%", label: "CAGR on stock portfolio*" },
              { value: "1,500", label: "community members" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2 bg-night px-5 py-7">
                <span className="text-5xl sm:text-6xl">
                  <Odometer value={s.value} />
                </span>
                <Decode text={s.label.toUpperCase()} className="font-mono text-[11px] tracking-[0.12em] text-amber/80" />
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] text-faint">*Personal track record, educational only. Not SEBI registered. No tips, calls or signals.</p>
        </div>
      </Idea>

      <Idea n="04" title="Stacked venture cards" where="The Building page, the homepage ventures teaser and Work with me services">
        <StackedVentures />
      </Idea>

      <Idea n="05" title="Velocity marquee" where="Replaces the current homepage marquee; also works as a footer sign-off">
        <div className="py-[18svh]">
          <VelocityRow items={marqueeItems.slice(0, 6)} base={-3} />
          <VelocityRow items={marqueeItems.slice(6)} base={3} outline />
        </div>
        <div className="h-[60svh]" />
      </Idea>
    </main>
  );
}
