"use client";

import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRestStyle } from "@/lib/use-rest-style";

const ScrollRoot = createContext<RefObject<HTMLDivElement | null> | undefined>(undefined);
export const ScrollContainerProvider = ScrollRoot.Provider;
export function useScrollContainer() { return useContext(ScrollRoot); }

/** Keep the layout anchor still while the visual layer travels at a different speed. */
export function ParallaxSection({ children, distance = 100 }: { children: ReactNode; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const container = useScrollContainer();
  const reduced = useReducedMotion();
  const rest = useRestStyle();
  const { scrollYProgress } = useScroll({ target: ref, container, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return <div ref={ref} className="parallax-scene"><motion.div style={reduced ? rest : { y }}>{children}</motion.div></div>;
}
