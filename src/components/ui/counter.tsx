"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const m = value.match(/^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/);
    if (!m) {
      el.textContent = value;
      return;
    }
    const prefix = m[1] ?? "";
    const rawStr = m[2];
    const target = parseFloat(rawStr.replace(/,/g, ""));
    const suffix = m[3] ?? "";
    const decimals = rawStr.includes(".") ? rawStr.split(".")[1].length : 0;
    const useComma = rawStr.includes(",");

    const fmt = (n: number) => {
      let s = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
      if (useComma) {
        const p = s.split(".");
        p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        s = p.join(".");
      }
      return prefix + s + suffix;
    };

    if (reduce) {
      el.textContent = fmt(target);
      return;
    }
    if (!inView) {
      el.textContent = fmt(0);
      return;
    }

    const controls = animate(mv, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = fmt(latest);
      },
    });
    return () => controls.stop();
  }, [inView, value, reduce, mv]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
