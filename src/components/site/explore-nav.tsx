"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  User,
  GraduationCap,
  Layers,
  TrendingUp,
  FlaskConical,
  Award,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

type Destination = {
  label: string;
  href: string;
  icon: LucideIcon;
  blurb: string;
  /** Space-separated sRGB channels, so alpha variants are plain `rgb(x / a)`.
   *  Not color-mix(): 49% of traffic is Android, and on the older Chrome and
   *  WebView builds in that mix an unsupported color-mix() drops the whole
   *  declaration, which would leave these doors flat grey. */
  accent: string;
};

const destinations: Destination[] = [
  {
    label: "Building",
    href: "/building",
    icon: Layers,
    blurb: "Three startups, one pattern: MarketPlay, GetAITrade and 10x Founders.",
    accent: "255 107 26",
  },
  {
    label: "Investing",
    href: "/investing",
    icon: TrendingUp,
    blurb: "How I invest: value investing in equities and systematic crypto CFDs.",
    accent: "245 158 11",
  },
  {
    label: "Side projects",
    href: "/side-projects",
    icon: FlaskConical,
    blurb: "The bots, tools and for-fun builds that run in the background.",
    accent: "34 211 238",
  },
  {
    label: "About",
    href: "/about",
    icon: User,
    blurb: "Founder, trader and creator from South Bombay. The whole story.",
    accent: "139 92 246",
  },
  {
    label: "Journey",
    href: "/journey",
    icon: GraduationCap,
    blurb: "Where I've been and where I'm headed: education and goals.",
    accent: "52 211 153",
  },
  {
    label: "Certifications",
    href: "/certifications",
    icon: Award,
    blurb: "Citi, J.P. Morgan, Goldman Sachs. The receipts.",
    accent: "201 162 75",
  },
];

// Plain CSS transitions rather than framer-motion: framer's `animate` prop
// silently refused to apply to these children, and a hinge is one property on
// one element, which the compositor handles for free.
const SWING = "620ms cubic-bezier(0.22, 1, 0.36, 1)";

function Door({ d, index }: { d: Destination; index: number }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Resting angle is slightly ajar rather than flush: it reads as a door before
  // you touch it, and it is the only cue touch devices get, since they never
  // fire hover and would otherwise see six flat rectangles.
  const angle = reduceMotion ? 0 : open ? -74 : -10;
  const Icon = d.icon;

  return (
    <Link
      href={d.href}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      style={{ "--accent": d.accent } as CSSProperties}
      className="group block outline-none"
      aria-label={`${d.label}. ${d.blurb}`}
    >
      {/* contain:layout+style keeps a swinging door from invalidating layout for
          the whole grid. No paint containment: that would clip the open leaf. */}
      <div className="relative aspect-[3/4] [contain:layout_style] [perspective:1200px] [transform-style:preserve-3d] sm:aspect-[3/5]">
        {/* The room behind the door: dark until the leaf swings, then it throws
            this destination's colour out of the gap. */}
        <div className="absolute inset-0 overflow-hidden rounded-[4px] bg-night ring-1 ring-inset ring-edge">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 0% 50%, rgb(var(--accent) / 0.55) 0%, rgb(var(--accent) / 0.12) 38%, transparent 72%)",
              opacity: open ? 1 : 0,
              transition: reduceMotion ? "none" : `opacity ${SWING}`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/60" />

          <div
            className="absolute inset-x-0 bottom-0 p-4"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(8px)",
              transition: reduceMotion
                ? "none"
                : `opacity 340ms ease ${open ? "160ms" : "0ms"}, transform 340ms ease ${open ? "160ms" : "0ms"}`,
            }}
          >
            <p className="text-[13px] leading-snug text-ink/85">{d.blurb}</p>
            <span className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgb(var(--accent))]">
              Enter <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* The leaf. Hinged left, so it swings toward the viewer and the light
            spills from the hinge side outward.
            will-change only from sm up: touch devices never open these, and
            promoting six layers on a mid-range Android buys nothing but memory.
            Same reasoning for the drop shadow, which is a large blur radius
            repainting on every scroll frame. */}
        <div
          className="absolute inset-0 rounded-[4px] [backface-visibility:hidden] [transform-origin:left_center] [transform-style:preserve-3d] sm:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.85)] sm:will-change-transform"
          style={{
            // Colour at rest, not only on hover: the tint and the accent border
            // are what make six closed doors read as six different places.
            background:
              "linear-gradient(158deg, rgb(var(--accent) / 0.16) 0%, rgb(var(--accent) / 0.05) 42%, var(--color-surface) 82%)",
            border: "1px solid rgb(var(--accent) / 0.24)",
            transform: `rotateY(${angle}deg)`,
            transition: reduceMotion ? "none" : `transform ${SWING}`,
          }}
        >
          {/* Recessed panels are what make a rectangle read as a door. No knob,
              no arch, no hinge plates: that is where this tips into clipart. */}
          <div className="absolute inset-[10px] rounded-[2px] border border-[rgb(var(--accent)/0.18)]" />
          <div className="absolute inset-x-[10px] top-[10px] bottom-[46%] rounded-[2px] border border-[rgb(var(--accent)/0.12)]" />

          {/* Top edge catching the light, like a painted door frame. */}
          <div className="absolute inset-x-0 top-0 h-px bg-[rgb(var(--accent)/0.5)]" />

          {/* Handle: a hairline bar on the swing edge, not a doorknob. */}
          <div className="absolute right-[7px] top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-full bg-[rgb(var(--accent)/0.55)] transition-colors duration-500 group-hover:bg-[rgb(var(--accent))]" />

          <span className="absolute left-[16px] top-[14px] font-mono text-[10px] tracking-[0.2em] text-[rgb(var(--accent)/0.7)]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <Icon className="absolute left-[16px] top-1/2 h-5 w-5 -translate-y-1/2 text-[rgb(var(--accent))] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Light leaking down the hinge edge as the leaf starts to move. */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-px"
            style={{
              background: "rgb(var(--accent))",
              opacity: open ? 0.9 : 0,
              transition: reduceMotion ? "none" : `opacity ${SWING}`,
            }}
          />
        </div>
      </div>

      <span className="mt-3 block font-display text-[15px] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-[rgb(var(--accent))]">
        {d.label}
      </span>
    </Link>
  );
}

export default function ExploreNav() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <Reveal>
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber">
          <span className="h-px w-6 bg-amber/60" />
          Where to next
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        {/* Anybody Expanded 800. font-stretch is required for the expanded
            width: without it the variable font renders at normal width. */}
        <h2
          className="mt-5 max-w-3xl font-wide text-[2rem] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]"
          style={{ fontStretch: "125%" }}
        >
          Pick a door.{" "}
          <span className="text-amber">Then walk through it.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
          {destinations.map((d, i) => (
            <Door key={d.href} d={d} index={i} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
