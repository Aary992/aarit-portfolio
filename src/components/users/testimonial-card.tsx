"use client";

// Adapted from the supplied Opensource UI component. See THIRD_PARTY_NOTICES.md.
import { forwardRef, useEffect, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export type TestimonialItem = { quote: string; name: string; role: string; rating?: number; avatar?: string };
export type TestimonialCardProps = Omit<ComponentPropsWithoutRef<"div">, "onChange"> & {
  testimonials?: readonly TestimonialItem[];
  quote?: string; name?: string; role?: string; rating?: number; avatar?: string;
  avatarAlt?: string; quoteIcon?: ReactNode; autoPlayMs?: number;
  onChange?: (index: number) => void;
};

export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ testimonials, quote, name, role = "", rating, avatar, avatarAlt, quoteIcon, autoPlayMs = 0, onChange, className, ...props }, ref) => {
    const items = testimonials ?? (quote && name ? [{ quote, name, role, rating, avatar }] : []);
    const [index, setIndex] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [paused, setPaused] = useState(false);
    const reducedMotion = useReducedMotion();
    const currentIndex = index % Math.max(items.length, 1);
    const playing = autoPlayMs > 0 && items.length > 1 && !paused && !hovered && !focused && !reducedMotion;
    useEffect(() => {
      if (!playing) return;
      const timer = window.setInterval(() => {
        if (document.visibilityState !== "visible") return;
        const next = (currentIndex + 1) % items.length;
        setIndex(next);
        onChange?.(next);
      }, Math.max(autoPlayMs, 3000));
      return () => window.clearInterval(timer);
    }, [playing, autoPlayMs, currentIndex, items.length, onChange]);
    if (!items.length) return null;
    const current = items[currentIndex];
    function goTo(next: number) {
      const target = (next + items.length) % items.length;
      if (target === currentIndex) return;
      setIndex(target);
      onChange?.(target);
    }
    return <div ref={ref} data-slot="testimonial-card" role="region" aria-roledescription={items.length > 1 ? "carousel" : undefined} aria-label="Testimonials" {...props}
      onMouseEnter={(event) => { setHovered(true); props.onMouseEnter?.(event); }}
      onMouseLeave={(event) => { setHovered(false); props.onMouseLeave?.(event); }}
      onFocusCapture={(event) => { setFocused(true); props.onFocusCapture?.(event); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); props.onBlurCapture?.(event); }}
      className={cn("relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-900 shadow-lg", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute right-5 top-5 text-neutral-200">{quoteIcon ?? <Quote size={28} />}</div>
      <div aria-live={playing ? "off" : "polite"} aria-atomic="true">
        <div key={`${currentIndex}-${current.name}`} className="testimonial-card__content">
          {typeof current.rating === "number" && Number.isFinite(current.rating) && <div aria-label={`${Math.max(0, Math.min(5, Math.round(current.rating)))} out of 5 stars`} className="mb-4 flex gap-1">{Array.from({ length: Math.max(0, Math.min(5, Math.round(current.rating))) }, (_, i) => <Star aria-hidden="true" key={i} size={14} className="fill-amber-400 text-amber-500" />)}</div>}
          <blockquote className="relative mb-6 pr-3 text-base leading-relaxed">{current.quote}</blockquote>
          <div className="flex items-center gap-3 border-t border-neutral-200 pt-4">
            {current.avatar ? <Image unoptimized src={current.avatar} alt={avatarAlt ?? current.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" /> : <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-neutral-100 text-sm font-semibold">{current.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("")}</span>}
            <div><p className="text-sm font-semibold">{current.name}</p><p className="text-xs text-neutral-500">{current.role}</p></div>
          </div>
        </div>
      </div>
      {items.length > 1 && <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs text-neutral-500">{currentIndex + 1} / {items.length}</span>
        <div className="flex gap-1">
          {autoPlayMs > 0 && !reducedMotion && <button type="button" aria-label={paused ? "Play testimonials" : "Pause testimonials"} onClick={() => setPaused(!paused)} className="grid h-11 w-11 place-items-center rounded-full border border-neutral-200 hover:bg-neutral-100">{paused ? <Play aria-hidden="true" size={15} /> : <Pause aria-hidden="true" size={15} />}</button>}
          <button type="button" aria-label="Previous testimonial" onClick={() => goTo(currentIndex - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-neutral-200 hover:bg-neutral-100"><ChevronLeft aria-hidden="true" size={17} /></button>
          <button type="button" aria-label="Next testimonial" onClick={() => goTo(currentIndex + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-neutral-200 hover:bg-neutral-100"><ChevronRight aria-hidden="true" size={17} /></button>
        </div>
      </div>}
    </div>;
  },
);
TestimonialCard.displayName = "TestimonialCard";
