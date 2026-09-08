"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import type { GalleryId } from "./gallery-art";
import { ScrollContainerProvider } from "@/components/ui/scroll-scene";
import { SpinningBorderLink } from "@/components/ui/spinning-border-button";

const destinations: { id: GalleryId; label: string; line: string; accent: string }[] = [
  { id: "building", label: "Building", line: "The three ventures I'm building.", accent: "255 139 70" },
  { id: "investing", label: "Investing", line: "How I approach risk.", accent: "225 183 94" },
  { id: "side-projects", label: "Side projects", line: "Tools, research and experiments.", accent: "95 184 192" },
  { id: "about", label: "About", line: "I build what I need.", accent: "196 158 203" },
  { id: "journey", label: "Journey", line: "Where I've been, and where I'm going.", accent: "137 184 143" },
  { id: "certifications", label: "Certifications", line: "Courses and job simulations.", accent: "201 162 75" },
];
type Selection = { id: GalleryId; rect: { top: number; left: number; width: number; height: number }; trigger: HTMLAnchorElement; pageY: number };

function CardFace({ item, index }: { item: typeof destinations[number]; index: number }) {
  return <><div className="chapter-card__top"><span>CHAPTER {String(index + 1).padStart(2, "0")}</span><ArrowUpRight size={21} aria-hidden="true" /></div><span aria-hidden="true" className="chapter-card__number">{String(index + 1).padStart(2, "0")}</span><div className="chapter-card__caption"><h3>{item.label}</h3><p>{item.line}</p><span className="chapter-card__enter">Explore chapter <ArrowUpRight size={14} aria-hidden="true" /></span></div></>;
}

export default function ExploreNav({ panels }: { panels: Record<GalleryId, ReactNode> }) {
  const sectionRef = useRef<HTMLElement>(null);
  const restoringFocus = useRef(false);
  const railRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [travel, setTravel] = useState(1800);
  const [detailWidth, setDetailWidth] = useState(0);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [closing, setClosing] = useState(false);
  const [returnRect, setReturnRect] = useState<Selection["rect"] | null>(null);
  const pendingContact = useRef(false);
  const [ready, setReady] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [chapter, setChapter] = useState(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  // A derived spring keeps all phases on one timeline, including browsers that
  // otherwise offload opacity and transforms to different native scroll ranges.
  const progress = useSpring(scrollYProgress, { stiffness: 250, damping: 40, mass: .3 });
  const titleOpacity = useTransform(progress, [0, .06, .17], [1, 1, 0]);
  const titleScale = useTransform(progress, [0, .17], [1, .96]);
  const titleY = useTransform(progress, [0, .17], [0, -36]);
  const railOpacity = useTransform(progress, [.06, .18], [0, 1]);

  const railScale = useTransform(progress, [.06, .20], [.72, 1]);
  const ambientScale = useTransform(progress, [0, 1], [1, 1.2]);
  const railY = useTransform(progress, [.06, .20], [48, 0]);
  const x = useTransform(progress, [.22, .94], [0, -travel]);
  const ambientY = useTransform(progress, [0, 1], [60, -60]);
  const selected = destinations.find((item) => item.id === selection?.id);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setGalleryVisible(value > .14);
    setChapter(Math.round(Math.max(0, Math.min(1, (value - .22) / .72)) * 5));
  });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      const viewportWidth = document.documentElement.clientWidth;
      setDetailWidth(viewportWidth - 2);
      setTravel(Math.max(0, rail.scrollWidth - viewportWidth));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    observer.observe(document.documentElement);
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selection) return;
    const dialog = dialogRef.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog?.close();
      document.body.style.overflow = oldOverflow;
      restoringFocus.current = true;
      if (selection.trigger.isConnected) selection.trigger.focus({ preventScroll: true });
      window.scrollTo({ top: selection.pageY, behavior: "instant" });
      requestAnimationFrame(() => { restoringFocus.current = false; });
    };
  }, [selection]);

  function open(event: MouseEvent<HTMLAnchorElement>, id: GalleryId) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: window.scrollY, behavior: "instant" });
    const surface = event.currentTarget.querySelector(".chapter-card__surface") || event.currentTarget;
    const { top, left, width, height } = surface.getBoundingClientRect();
    setClosing(false); setReady(false); setReturnRect(null); pendingContact.current = false;
    setSelection({ id, rect: { top, left, width, height }, trigger: event.currentTarget, pageY: window.scrollY });
  }
  function close() {
    if (reducedMotion) { setSelection(null); return; }
    if (closing) return;
    const surface = selection?.trigger.querySelector(".chapter-card__surface");
    if (surface) { const { top, left, width, height } = surface.getBoundingClientRect(); setReturnRect({ top, left, width, height }); }
    setClosing(true); setReady(false);
  }
  function goToChapter(index: number) {
    const section = sectionRef.current;
    if (!section || selection || restoringFocus.current) return;
    if (reducedMotion) {
      railRef.current?.children[index]?.scrollIntoView({ block: "nearest", inline: "center" });
      setChapter(index);
      return;
    }
    const progress = .22 + (index / 5) * .72;
    window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top + progress * (section.offsetHeight - window.innerHeight), behavior: "smooth" });
  }

  return <section ref={sectionRef} id="work" aria-label="Explore Aarit's world" className="cinema-gallery" style={{ "--rail-travel": `${travel}px` } as CSSProperties}>
    <div className="cinema-gallery__stage">
      <button type="button" className="cinema-gallery__skip" onClick={() => goToChapter(0)}>Explore the six chapters</button>
      <motion.div aria-hidden="true" className="cinema-gallery__ambient" style={reducedMotion ? undefined : { y: ambientY, scale: ambientScale }} />
      <motion.div className="cinema-gallery__title" style={reducedMotion ? undefined : { opacity: titleOpacity, scale: titleScale, y: titleY }}>
        <div className="work-index__eyebrow"><span>THE WORK, AND EVERYTHING AROUND IT</span><span>01 — 06</span></div>
        <h2>Explore Aarit&apos;s <span>work.</span></h2>
        <div className="work-index__rule"><span>Six chapters. Pick your starting point.</span><ArrowRight size={20} aria-hidden="true" /></div>
      </motion.div>
      <motion.div className="cinema-gallery__collection" inert={!reducedMotion && !galleryVisible} style={reducedMotion ? undefined : { opacity: railOpacity, y: railY, scale: railScale }}>
        <div className="cinema-gallery__meta"><span>EXPLORE / SIX CHAPTERS</span><span>Scroll to explore · Click to enter</span></div>
        <motion.div ref={railRef} className="cinema-gallery__rail" style={reducedMotion ? undefined : { x }}>
          {destinations.map((item, index) => <a key={item.id} href={`/${item.id}`} onClick={(event) => open(event, item.id)} onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) goToChapter(index); }} className="chapter-card" style={{ "--gallery-accent": item.accent, opacity: selection?.id === item.id ? 0 : 1 } as CSSProperties} aria-label={`Explore ${item.label}`} aria-haspopup="dialog">
            <GlowCard customSize className="chapter-card__surface" style={{ "--spotlight-color": "rgb(var(--gallery-accent))" } as CSSProperties}><CardFace item={item} index={index} /></GlowCard>
          </a>)}
        </motion.div>
        <div className="cinema-gallery__controls"><span>{String(chapter + 1).padStart(2, "0")} <span>/ 06</span></span><div className="cinema-gallery__dots">{destinations.map((item,index) => <button type="button" key={item.id} aria-label={`Show ${item.label}`} aria-current={index === chapter ? "step" : undefined} onClick={() => goToChapter(index)}><span /></button>)}</div><div><button type="button" aria-label="Previous chapter" disabled={chapter === 0} onClick={() => goToChapter(chapter - 1)}><ArrowLeft size={18} /></button><button type="button" aria-label="Next chapter" disabled={chapter === 5} onClick={() => goToChapter(chapter + 1)}><ArrowRight size={18} /></button></div></div>
      </motion.div>
    </div>
    {selection && selected && createPortal(
      <dialog ref={dialogRef} className="gallery-dialog" style={{ "--detail-width": `${detailWidth}px` } as CSSProperties} aria-label={`${selected.label} details`} onCancel={(event) => { event.preventDefault(); close(); }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]')).filter((element) => element.getClientRects().length > 0 && element.tabIndex >= 0 && !element.closest('[inert]'));
          const first = controls[0], last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}>
        <motion.div className="gallery-dialog__scrim" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: closing ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : .65, delay: closing && !reducedMotion ? .15 : 0 }} />
        <motion.div className="gallery-dialog__frame" data-settled={ready || reducedMotion} style={{ "--gallery-accent": selected.accent } as CSSProperties}
          initial={reducedMotion ? false : { ...selection.rect, borderRadius: 12 }}
          animate={closing ? { ...(returnRect || selection.rect), borderRadius: 12 } : { top: 0, left: 0, width: "100%", height: "100%", borderRadius: 0 }}
          transition={{ duration: reducedMotion ? 0 : closing ? .7 : .82, delay: closing && !reducedMotion ? .16 : 0, ease: closing ? [.65, 0, .35, 1] : [.22, .68, 0, 1] }}
          onAnimationComplete={() => {
            if (closing) {
              setSelection(null);
              if (pendingContact.current) requestAnimationFrame(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }));
            } else setReady(true);
          }}>
          <motion.div className="chapter-flight" aria-hidden="true" initial={{ opacity: reducedMotion ? 0 : 1 }} animate={{ opacity: closing ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : .24, delay: closing ? .05 : .12 }}>
            <div className="chapter-flight__card"><CardFace item={selected} index={destinations.indexOf(selected)} /></div>
          </motion.div>
          <motion.div className="gallery-dialog__toolbar" initial={{ opacity: 0 }} animate={{ opacity: closing ? 0 : 1 }} transition={{ duration: reducedMotion ? 0 : .25, delay: closing || reducedMotion ? 0 : .24 }}><button ref={closeRef} type="button" className="gallery-back" onClick={close}><ArrowLeft aria-hidden="true" size={16} /> Back to gallery</button><span>{selected.label}</span><button type="button" className="gallery-close" aria-label="Close details" onClick={close}><X aria-hidden="true" size={20} /></button></motion.div>
          <motion.div ref={scrollRef} className="gallery-dialog__scroll" data-ready={ready || reducedMotion} inert={!ready && !reducedMotion}
            initial={reducedMotion ? false : { opacity: 0, y: 22, scale: 1.025 }} animate={{ opacity: closing ? 0 : 1, y: closing ? 14 : 0, scale: closing ? .99 : 1 }}
            transition={{ duration: reducedMotion ? 0 : closing ? .18 : .58, delay: closing || reducedMotion ? 0 : .22, ease: [.22, 1, .36, 1] }}>
            <ScrollContainerProvider value={scrollRef}>
              <div className="gallery-dialog__content">{panels[selection.id]}</div>
            </ScrollContainerProvider>
            <div className="gallery-dialog__footer"><SpinningBorderLink href={`/${selection.id}`}>Open {selected.label} page</SpinningBorderLink><SpinningBorderLink href="/#contact" tone="orange" onClick={(event) => { event.preventDefault(); pendingContact.current = true; if (reducedMotion) { setSelection(null); requestAnimationFrame(() => document.getElementById("contact")?.scrollIntoView()); } else close(); }}>Book a call</SpinningBorderLink></div>
          </motion.div>
        </motion.div>
      </dialog>, document.body,
    )}
  </section>;
}
