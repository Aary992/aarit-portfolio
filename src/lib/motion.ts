import type { Variants, Transition } from "framer-motion";

/**
 * One motion vocabulary for the whole site.
 *
 * Rules this file encodes, all of them mobile-first:
 * - transform and opacity only (no animated blur/shadow/filter, those are the
 *   real jank sources on mid-range Android)
 * - everything fires once on entry via IntersectionObserver, nothing is
 *   scroll-linked and continuous
 * - one easing curve family, so unrelated sections still feel related
 */

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT_QUINT = [0.83, 0, 0.17, 1] as const;

export const DUR = {
  fast: 0.18,
  base: 0.42,
  slow: 0.7,
} as const;

/** Shared viewport config: fire once, slightly before the element is centred. */
export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

export const ease: Transition = {
  duration: DUR.slow,
  ease: EASE_OUT_EXPO,
};

/* ── Variants ─────────────────────────────────────────────────────────────── */

/** Plain rise. The default for blocks of content. */
export const riseVariants: Variants = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: ease },
};

/** Parent that staggers its children. Pair with `riseVariants` on each child. */
export const staggerVariants = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/**
 * A line of text sliding up out of its own clip box. The parent must have
 * `overflow: hidden`; that is what makes it read as a reveal rather than a
 * fade. Used for headings only, never body copy, where it hurts readability.
 */
export const lineVariants: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: DUR.slow, ease: EASE_OUT_EXPO },
  },
};

/** The band wiping across, then out. Transform-only. */
export const bandVariants: Variants = {
  hidden: { scaleX: 0, transformOrigin: "left" },
  show: {
    scaleX: 1,
    transformOrigin: "left",
    transition: { duration: DUR.base, ease: EASE_IN_OUT_QUINT },
  },
};
