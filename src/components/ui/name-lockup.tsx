"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { DUR, EASE_IN_OUT_QUINT, EASE_OUT_EXPO } from "@/lib/motion";

const ROLES = ["FOUNDER", "TRADER", "BUILDER", "CREATOR"];

/** How long each role holds before the next one rolls up. */
const ROLE_INTERVAL_MS = 2400;

/**
 * These are declared as variants rather than inline initial/animate objects on
 * purpose. The hero wraps this component in its own variant tree, and framer
 * propagates the parent's "hidden"/"show" labels down through plain DOM nodes
 * via context; a child animating on inline objects gets stranded at its
 * initial value (the band sat at scaleX(0) and rendered as a zero-width line).
 * Owning the variant context here makes the sequence deterministic.
 */
const lockupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: DUR.slow, ease: EASE_OUT_EXPO } },
};

const bandEnterVariants: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: DUR.base, ease: EASE_IN_OUT_QUINT },
  },
};

/**
 * The split-identity lockup: AARIT / role band / SHAH.
 *
 * The roles used to sit under the name as a caption. Here they live inside the
 * mark, so the thing that says what he does is part of the identity rather
 * than an annotation on it.
 *
 * Mobile behaviour is the point of the design, not a fallback: on a narrow
 * screen the three parts stack into a phone's natural vertical column, and the
 * band shrink-wraps the role word instead of stretching into a wide empty
 * amber slab.
 */
export function NameLockup({ className }: { className?: string }) {
  const [i, setI] = useState(0);

  // Rotates continuously. It used to pause on hover, which meant a cursor
  // resting anywhere over the hero froze the one element that is supposed to
  // prove the page is alive.
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const t = setInterval(
      () => setI((p) => (p + 1) % ROLES.length),
      ROLE_INTERVAL_MS,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className={className}>
      <span className="sr-only">Aarit Shah, founder, trader and builder</span>

      <motion.div
        aria-hidden
        className="select-none"
        variants={lockupVariants}
        initial="hidden"
        animate="show"
      >
        <span className="block overflow-hidden">
          <motion.span
            variants={lineVariants}
            className="name-molten block font-display text-name font-black uppercase"
          >
            Aarit
          </motion.span>
        </span>

        {/* The band. A chip that hugs the role word at every breakpoint, so
            it reads as a stamp inside the mark rather than an amber slab
            splitting the name. Height is driven by the role word. */}
        <motion.div
          variants={bandEnterVariants}
          style={{ transformOrigin: "left" }}
          className="my-1.5 flex w-fit items-center overflow-hidden bg-gradient-to-r from-ember to-amber px-3 py-1.5 sm:my-2 sm:px-4"
        >
          <div className="relative h-[1.15em] overflow-hidden text-base sm:text-lg">
            {/* Invisible sizer. The roles themselves are absolutely
                positioned so they can slide past each other, which leaves the
                band with no intrinsic width; the band is w-fit, so without
                this it collapses to zero. Sized to the longest role so the
                band does not resize on every swap. */}
            <span
              aria-hidden
              className="invisible block font-sans font-medium uppercase leading-none tracking-[0.32em]"
            >
              CREATOR
            </span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={ROLES[i]}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.42, ease: EASE_OUT_EXPO }}
                className="absolute inset-0 flex items-center font-sans font-medium uppercase leading-none tracking-[0.32em] text-night"
              >
                {ROLES[i]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <span className="block overflow-hidden">
          <motion.span
            variants={lineVariants}
            className="name-molten block font-display text-name font-black uppercase"
          >
            Shah
          </motion.span>
        </span>
      </motion.div>
    </div>
  );
}
