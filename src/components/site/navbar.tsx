"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav } from "@/lib/data";
import { cn } from "@/lib/utils";
import { DUR, EASE_OUT_EXPO } from "@/lib/motion";

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

/**
 * Home is the top of the hierarchy, so going there is "back" and everything
 * else is "forward". This drives the direction of the route slide.
 */
function transitionType(href: string): string[] {
  return href === "/" ? ["nav-back"] : ["nav-forward"];
}

/* â”€â”€ Entrance â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   The header drops in as a unit, then its pills resolve one by one: wordmark,
   each nav link, CTA last. One cascade on load, never again. */

const headerVariants: Variants = {
  out: { y: -24, opacity: 0 },
  in: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DUR.slow,
      ease: EASE_OUT_EXPO,
      staggerChildren: 0.045,
      delayChildren: 0.15,
    },
  },
  away: {
    y: -72,
    opacity: 0,
    transition: { duration: DUR.base, ease: EASE_OUT_EXPO },
  },
};

const pillVariants: Variants = {
  out: { y: -14, opacity: 0 },
  in: {
    y: 0,
    opacity: 1,
    transition: { duration: DUR.base, ease: EASE_OUT_EXPO },
  },
};

/**
 * Desktop hover: the label rolls up out of the pill and a duplicate rises
 * into its place. Pure CSS transforms, so it costs nothing when idle and
 * never fires on touch, where hover is dead anyway.
 */
function RollUpLabel({ children }: { children: string }) {
  return (
    <span className="relative z-10 block overflow-hidden">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  // The menu stores *where* it was opened rather than a boolean. Any
  // navigation then closes it for free, including the back button, with no
  // effect syncing state back to the route.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;
  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const lastY = useRef(0);

  // Smart hide: scrolling down past the hero tucks the header away, the first
  // upward nudge brings it back. The 8px deadband stops it flickering on
  // touchpad momentum noise.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY.current) > 8) {
        setHidden(y > lastY.current && y > 160);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The overlay replaces the page; the page must not scroll behind it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reduced motion opts out of the whole choreography: no entrance cascade,
  // and the header never tucks away, because a nav that moves on its own is
  // exactly what that preference is asking us not to do.
  const state = reduceMotion ? "in" : open || !hidden ? "in" : "away";

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial={reduceMotion ? "in" : "out"}
        animate={state}
        // A tucked-away header is still in the tab order, so keyboard focus
        // pulls it back rather than leaving someone typing into something
        // they cannot see.
        onFocusCapture={() => setHidden(false)}
        // Pinned during route slides so the user keeps one fixed spatial anchor.
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 px-4 transition-[padding] duration-300 sm:px-6",
          scrolled ? "pt-2" : "pt-4",
        )}
      >
        <motion.div variants={pillVariants}>
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className={cn(
              "nav-surface tappable block rounded-full border border-edge px-4 font-display text-base font-bold tracking-[-0.02em] transition-[padding] duration-300",
              scrolled ? "py-1.5" : "py-2",
            )}
          >
            <span className="band-link">Aarit Shah</span>
          </Link>
        </motion.div>

        <motion.nav
          variants={pillVariants}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "nav-surface hidden items-center gap-0.5 rounded-full border border-edge transition-[padding] duration-300 xl:flex",
            scrolled ? "p-0.5" : "p-1",
          )}
        >
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                transitionTypes={transitionType(item.href)}
                onMouseEnter={() => setHovered(item.href)}
                className={cn(
                  // Tight padding and 13px type: nine links have to share one
                  // row, and the alternative is a bar that wraps.
                  "group/link relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors duration-300",
                  active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {/* Spotlight: one shared pill springs between whichever link
                    the cursor is on. */}
                {hovered === item.href && (
                  <motion.span
                    layoutId="nav-spotlight"
                    className="absolute inset-0 rounded-full bg-surface-2"
                    transition={{ type: "spring", bounce: 0.22, duration: 0.5 }}
                  />
                )}
                <RollUpLabel>{item.label}</RollUpLabel>
                {/* The band, same device as the hero role bar. */}
                {active && (
                  <motion.span
                    layoutId="nav-band"
                    className="absolute inset-x-2.5 bottom-1 z-10 h-[2px] bg-gradient-to-r from-ember to-amber"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </motion.nav>

        <motion.div variants={pillVariants} className="hidden xl:block">
          <Link
            href="/#contact"
            className={cn(
              "group tappable inline-flex items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-night transition-[padding,transform] duration-200 hover:scale-[1.03]",
              scrolled ? "py-2" : "py-2.5",
            )}
          >
            Book a call
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <motion.div variants={pillVariants} className="xl:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="nav-surface tappable grid h-10 w-10 place-items-center rounded-full border border-edge text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>
      </motion.header>

      {/* Full-screen mobile menu. Lives outside the header because the
          header animates under a transform, and a transformed ancestor
          becomes the containing block for fixed descendants. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-40 flex flex-col bg-night xl:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.05]" />
            {/* Nine links at display size overflow a short phone (measured:
                they collided with the CTA at 360x600), so the list scrolls
                inside itself and the CTA stays pinned below it. */}
            <nav className="relative flex flex-1 flex-col justify-center gap-0.5 overflow-y-auto px-8 pt-24 pb-4">
              {nav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: {
                        delay: 0.06 + i * 0.05,
                        duration: 0.5,
                        ease: EASE_OUT_EXPO,
                      },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  >
                    <Link
                      href={item.href}
                      transitionTypes={transitionType(item.href)}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "tappable flex items-baseline gap-4 py-1.5 font-display text-[clamp(1.75rem,8vw,3rem)] font-black uppercase leading-[1.15] tracking-[-0.03em]",
                        active ? "text-amber" : "text-ink",
                      )}
                    >
                      <span className="font-mono text-xs font-medium tracking-[0.2em] text-faint">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.06 + nav.length * 0.05,
                  duration: 0.5,
                  ease: EASE_OUT_EXPO,
                },
              }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="relative shrink-0 px-8 pb-8 pt-2"
            >
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="tappable flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-4 text-base font-semibold text-night"
              >
                Book a call
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
