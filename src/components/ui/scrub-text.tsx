"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useScrollContainer } from "./scroll-scene";

/**
 * Scroll-scrubbed reading. Text starts dim and each word lights up in turn.
 *
 * - trigger="scroll": the scroll is the playhead, so the text never
 *   runs ahead of the reader.
 * - trigger="load": for copy already on screen when the page opens (the hero).
 *   It plays once, after the homepage intro curtain lifts.
 * - trigger="auto" (default): "load" if the text is already in view on first paint,
 *   otherwise "scroll". Right for anything whose position depends on screen
 *   height, such as page intros and the hero stats.
 *
 * Takes plain `text` or rich `children` (inline elements such as the hero's
 * annotated names keep working; only their words are wrapped). Words listed in
 * `accents` land in amber. Transform and opacity only, per lib/motion.
 *
 * Screen readers get the plain sentence; the per-word spans are hidden from
 * them so it is not read one word at a time.
 */

const SCROLL_OFFSET = ["start 88%", "end 62%"] as const;
const LOAD_DURATION = 1.6;

/** Resolves once the homepage intro curtain has lifted (immediately elsewhere). */
function whenIntroDone(cb: () => void) {
  if (!document.body.classList.contains("intro-locked")) {
    cb();
    return () => {};
  }
  const observer = new MutationObserver(() => {
    if (!document.body.classList.contains("intro-locked")) {
      observer.disconnect();
      cb();
    }
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

type Trigger = "scroll" | "load" | "auto";

/** A 0→1 playhead driven either by scroll position or by a one-off timeline. */
function usePlayhead(ref: React.RefObject<HTMLElement | null>, trigger: Trigger, delay = 0) {
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ target: ref, container, offset: [...SCROLL_OFFSET] });
  const timeline = useMotionValue(0);
  const inView = useInView(ref, { once: true });
  const [mode, setMode] = useState<"scroll" | "load">(trigger === "load" ? "load" : "scroll");

  useLayoutEffect(() => {
    if (trigger !== "auto" || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const view = container?.current?.getBoundingClientRect();
    const bottom = view ? view.top + view.height : window.innerHeight;
    if (box.top < (view?.top ?? 0) + (bottom - (view?.top ?? 0)) * 0.88) setMode("load");
  }, [trigger, ref, container]);

  useEffect(() => {
    if (mode !== "load" || !inView) return;
    let controls: ReturnType<typeof animate> | undefined;
    const stop = whenIntroDone(() => {
      controls = animate(timeline, 1, { duration: LOAD_DURATION, delay, ease: "linear" });
    });
    return () => {
      stop();
      controls?.stop();
    };
  }, [mode, inView, delay, timeline]);

  return mode === "load" ? timeline : scrollYProgress;
}

function plainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return plainText(node.props.children);
  return "";
}

function countWords(node: ReactNode): number {
  return plainText(node).split(/\s+/).filter(Boolean).length;
}

export function ScrubText({
  text,
  children,
  accents = [],
  className,
  trigger = "auto",
  delay = 0,
  as: Tag = "p",
}: {
  text?: string;
  children?: ReactNode;
  accents?: string[];
  className?: string;
  trigger?: Trigger;
  delay?: number;
  as?: "p" | "span" | "div";
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const playhead = usePlayhead(ref, trigger, delay);
  const lit = useMotionValue(1);
  // Reduced motion keeps the exact same markup and simply holds the playhead
  // at "fully lit". Rendering a different tree (or dropping the style) would
  // mismatch the server HTML, which cannot know the visitor's preference, and
  // React does not repair style attributes when hydrating.
  const progress = reduced ? lit : playhead;
  const content = children ?? text ?? "";
  const accentSet = new Set(accents);
  const total = Math.max(1, countWords(content));

  let index = 0;
  const split = (node: ReactNode): ReactNode => {
    if (typeof node === "string") {
      return node.split(/(\s+)/).map((part, k) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) return part;
        const i = index++;
        return (
          <ScrubWord
            key={`w${i}-${k}`}
            word={part}
            progress={progress}
            range={[i / total, (i + 1) / total]}
            accent={accentSet.has(part.replace(/[.,;:!?]/g, ""))}
          />
        );
      });
    }
    if (Array.isArray(node)) return Children.map(node, split);
    if (isValidElement<{ children?: ReactNode }>(node)) {
      return cloneElement(node as ReactElement<{ children?: ReactNode }>, undefined, split(node.props.children));
    }
    return node;
  };

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{plainText(content)}</span>
      <span aria-hidden="true">{split(content)}</span>
    </Tag>
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

/* ── Blocks (stat tiles, metric cards) ────────────────────────────────────
   The same light-up for a row of blocks: wrap the row in <ScrubGroup> and the
   content of each block in <ScrubItem index={i}>. Put ScrubItem inside the
   tile, not around it, so the tile's own background never dims. */

const GroupCtx = createContext<{ progress: MotionValue<number>; count: number } | null>(null);

export function ScrubGroup({
  children,
  count,
  className,
  trigger = "auto",
}: {
  children: ReactNode;
  count: number;
  className?: string;
  trigger?: Trigger;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = usePlayhead(ref, trigger);
  return (
    <div ref={ref} className={className}>
      <GroupCtx.Provider value={{ progress, count }}>{children}</GroupCtx.Provider>
    </div>
  );
}

export function ScrubItem({ index, children, className }: { index: number; children: ReactNode; className?: string }) {
  const ctx = useContext(GroupCtx);
  const reduced = useReducedMotion();
  const lit = useMotionValue(1);
  const progress = reduced || !ctx ? lit : ctx.progress;
  const count = ctx?.count ?? 1;
  // Slight overlap so the row lights as a wave rather than one tile at a time.
  // It also finishes early (by 85%), so the last tile is lit while the row is
  // still mid-screen rather than only as it leaves.
  const start = count > 1 ? (index / (count - 1)) * 0.45 : 0;
  const end = start + 0.4;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);
  return (
    <motion.div className={className} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
