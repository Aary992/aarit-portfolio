"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Transition } from "framer-motion";
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
import { cn } from "@/lib/utils";

type Destination = {
  label: string;
  href: string;
  icon: LucideIcon;
  blurb: string;
  accent: string;
};

const destinations: Destination[] = [
  {
    label: "Building",
    href: "/building",
    icon: Layers,
    blurb: "Three startups, one pattern: MarketPlay, GetAITrade and 10x Founders.",
    accent: "#ff6b1a",
  },
  {
    label: "Investing",
    href: "/investing",
    icon: TrendingUp,
    blurb: "How I invest: value investing in equities and systematic crypto CFDs.",
    accent: "#f59e0b",
  },
  {
    label: "Side projects",
    href: "/side-projects",
    icon: FlaskConical,
    blurb: "The bots, tools and for-fun builds that run in the background.",
    accent: "#22d3ee",
  },
  {
    label: "About",
    href: "/about",
    icon: User,
    blurb: "Founder, trader and creator from South Bombay. The whole story.",
    accent: "#8b5cf6",
  },
  {
    label: "Journey",
    href: "/journey",
    icon: GraduationCap,
    blurb: "Where I've been and where I'm headed: education and goals.",
    accent: "#34d399",
  },
  {
    label: "Certifications",
    href: "/certifications",
    icon: Award,
    blurb: "Citi, J.P. Morgan, Goldman Sachs. The receipts.",
    accent: "#c9a24b",
  },
];

const spring: Transition = { type: "spring", bounce: 0.18, duration: 0.55 };

export default function ExploreNav() {
  const [active, setActive] = useState(0);
  const current = destinations[active];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <Reveal>
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber">
          <span className="h-px w-6 bg-amber/60" />
          Where to next
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          Pick a door.{" "}
          <span className="font-serif text-amber">Then walk through it.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          onMouseLeave={() => setActive(0)}
          className="mt-12 flex flex-col gap-2.5 rounded-3xl border border-edge bg-surface/30 p-3 sm:flex-row sm:flex-wrap sm:items-center"
        >
          {destinations.map((d, i) => {
            const Icon = d.icon;
            const isActive = active === i;
            return (
              <Link
                key={d.href}
                href={d.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                style={{ "--dot": d.accent } as CSSProperties}
                className={cn(
                  "group relative flex flex-1 items-center gap-3 overflow-hidden rounded-2xl px-5 py-4 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-amber sm:flex-none",
                  isActive ? "text-night" : "text-muted hover:text-ink",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="explore-pill"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-ember to-amber"
                    transition={spring}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="font-display text-lg font-semibold tracking-tight">
                    {d.label}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0",
                    )}
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-6 flex min-h-[2.5rem] items-center gap-3 pl-1">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: current.accent }}
          />
          <AnimatePresence mode="wait">
            <motion.p
              key={current.href}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-base text-muted"
            >
              {current.blurb}
            </motion.p>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
