"use client";

/**
 * Scroll-driven timeline for /timeline, adapted from the Hyperiux Vault
 * timeline.
 *
 * Desktop (lg+): the section pins and a horizontal track slides past. An
 * amber rail draws itself with a glowing tip; each milestone lights up (stem,
 * dot, masked text) the moment the tip reaches it, and the latest one reached
 * holds the spotlight while the rest dim. A giant outlined backdrop drifts at
 * a third of the track's speed for depth, and a HUD counts milestones.
 *
 * Below lg, and for anyone with reduced motion, it is a vertical list: the
 * sideways version needs ~8 screens of scrolling on a phone.
 *
 * Both layouts are in the DOM and CSS picks one, so there is no layout flash
 * and no hydration mismatch. gsap.matchMedia only animates the visible one.
 * Everything per-frame is written straight to the DOM from one onUpdate, never
 * through React state.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { Milestone } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

type Props = {
  items: Milestone[];
  eyebrow?: string;
  title: ReactNode;
  periodLabel?: string;
  /** Giant outlined text drifting behind the track (desktop only). */
  backdrop?: string;
  imageSrc: string;
  imageAlt: string;
  cta?: { label: string; href: string };
};

const pad = (n: number) => String(n).padStart(2, "0");

export function JourneyTimeline({
  items,
  eyebrow = "Timeline",
  title,
  periodLabel,
  backdrop,
  imageSrc,
  imageAlt,
  cta,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let mm: gsap.MatchMedia | null = null;
    let cancelled = false;

    // SplitText measures line breaks, so wait for Switzer/Zodiak to land or
    // the masks wrap the fallback font's lines.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      mm = gsap.matchMedia(section);

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const q = <T extends Element = HTMLElement>(sel: string) =>
            section.querySelector<T>(sel);
          const track = q("[data-track]");
          const rail = q("[data-rail]");
          const progress = q("[data-progress]");
          const tip = q("[data-tip]");
          const bg = q("[data-bg]");
          const photo = q("[data-photo]");
          const photoInner = q("[data-photo-inner]");
          const hudBar = q("[data-hud-bar]");
          const hudCount = q("[data-hud-count]");
          const hudDate = q("[data-hud-date]");
          const intro = section.querySelectorAll("[data-intro]");
          const nodes = Array.from(
            section.querySelectorAll<HTMLElement>("[data-h-item]"),
          );
          if (!track || !rail || !progress || !tip) return;

          const distance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          // The pinned panel is sticky, so the section's height IS the
          // scroll length. Set it before every refresh measures anything.
          const setHeight = () => {
            section.style.height = `${distance() + window.innerHeight}px`;
          };
          setHeight();
          ScrollTrigger.addEventListener("refreshInit", setHeight);

          // Rail geometry, re-measured on every refresh. The tip starts at
          // mid-screen and lands on the rail's end exactly when the slide
          // ends, so the whole rail fills and the last milestone is reached.
          let railW = 0;
          let startFill = 0;
          let itemX: number[] = [];
          const measure = () => {
            railW = rail.offsetWidth;
            startFill = gsap.utils.clamp(
              0,
              1,
              (window.innerWidth / 2 - rail.offsetLeft - track.offsetLeft) /
                railW,
            );
            itemX = nodes.map((n) => n.offsetLeft);
          };
          measure();

          // One paused reveal per milestone, played when the tip reaches it
          // and reversed if you scroll back past it.
          const splits: SplitText[] = [];
          const reveals = nodes.map((node) => {
            const split = new SplitText(node.querySelectorAll("[data-split]"), {
              type: "lines",
              mask: "lines",
            });
            splits.push(split);
            return gsap
              .timeline({ paused: true })
              .fromTo(
                node.querySelector("[data-stem]"),
                { scaleY: 0 },
                { scaleY: 1, duration: 0.55, ease: "power3.inOut" },
              )
              .fromTo(
                node.querySelector("[data-dot]"),
                { scale: 0 },
                { scale: 1, duration: 0.4, ease: "back.out(2.4)" },
                "-=0.2",
              )
              .fromTo(
                split.lines,
                { yPercent: 115 },
                { yPercent: 0, duration: 0.8, stagger: 0.06, ease: "expo.out" },
                "-=0.35",
              );
          });
          const reached = nodes.map(() => false);
          let active = -1;

          const render = (p: number) => {
            const fill = startFill + (1 - startFill) * p;
            const tipX = fill * railW;
            progress.style.transform = `scaleX(${fill})`;
            tip.style.transform = `translate3d(${tipX}px, -50%, 0)`;
            if (bg) bg.style.transform = `translate3d(${-distance() * 0.32 * p}px, 0, 0)`;
            if (photoInner) photoInner.style.transform = `scale(${1.18 - 0.18 * p})`;
            if (hudBar) hudBar.style.transform = `scaleX(${p})`;

            let next = -1;
            itemX.forEach((x, i) => {
              const hit = tipX >= x - 2;
              if (hit) next = i;
              if (hit !== reached[i]) {
                reached[i] = hit;
                if (hit) reveals[i].play();
                else reveals[i].reverse();
              }
            });
            if (next !== active) {
              active = next;
              nodes.forEach((n, i) => {
                n.dataset.state =
                  i === active ? "active" : i < active ? "past" : "future";
              });
              if (hudCount) hudCount.textContent = pad(Math.max(active + 1, 0));
              if (hudDate)
                hudDate.textContent = active >= 0 ? items[active].date : "";
            }
          };

          const slide = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${distance()}`,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onRefresh: (self) => {
                measure();
                render(self.progress);
              },
              onUpdate: (self) => render(self.progress),
            },
          });

          // Entrance: photo wipes up, headline rises, rail draws to its start.
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .fromTo(
              photo,
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
            )
            .fromTo(intro, { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.08 }, "-=0.7")
            .fromTo(q("[data-base]"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, "-=1");

          render(slide.scrollTrigger?.progress ?? 0);

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", setHeight);
            splits.forEach((s) => s.revert());
            nodes.forEach((n) => delete n.dataset.state);
            section.style.height = "";
          };
        },
      );

      mm.add(
        "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        () => {
          const list = section.querySelector<HTMLElement>("[data-v-list]");
          const progress = section.querySelector<HTMLElement>("[data-v-progress]");
          if (!list || !progress) return;

          gsap.fromTo(
            progress,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: list,
                start: "top 60%",
                end: "bottom 60%",
                scrub: true,
              },
            },
          );

          section
            .querySelectorAll<HTMLElement>("[data-v-item]")
            .forEach((item) => {
              gsap.fromTo(
                item,
                { autoAlpha: 0, y: 28 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "expo.out",
                  scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                  },
                },
              );
            });
        },
      );
    });

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [items]);

  const total = pad(items.length);

  return (
    <section ref={sectionRef} className="relative bg-night text-ink">
      {/* Horizontal, pinned (desktop with motion). h-full: the sticky panel
          can only pin within its parent, so the parent has to span the whole
          (JS-sized) section. */}
      <div className="hidden h-full lg:block lg:motion-reduce:hidden">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Ambient molten light */}
          <div className="pointer-events-none absolute -left-[10vw] top-[10%] size-[45vw] rounded-full bg-ember/[0.07] blur-[120px]" />
          <div className="pointer-events-none absolute -right-[10vw] bottom-0 size-[35vw] rounded-full bg-amber/[0.05] blur-[120px]" />

          {backdrop && (
            <div
              data-bg
              aria-hidden
              className="pointer-events-none absolute bottom-[4vh] left-[4vw] select-none whitespace-nowrap font-display text-[19vw] font-bold leading-none tracking-[-0.04em] text-transparent will-change-transform [-webkit-text-stroke:1px_rgba(250,250,249,0.07)]"
            >
              {backdrop}
            </div>
          )}

          <div
            data-track
            className="relative flex w-max items-center gap-[5vw] pl-[6vw] pr-[8vw] will-change-transform"
          >
            <div
              data-photo
              className="relative aspect-[4/5] w-[22vw] shrink-0 overflow-hidden rounded-[1.25rem] border border-edge shadow-[0_40px_120px_-40px_rgba(255,107,26,0.35)]"
            >
              <div data-photo-inner className="absolute inset-0 will-change-transform">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="22vw"
                  className="object-cover"
                  draggable={false}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
              {periodLabel && (
                <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/80">
                  {periodLabel}
                </span>
              )}
            </div>

            <div
              data-rail
              className="relative h-[min(36vw,74vh)] shrink-0"
              style={{ width: `calc(22vw + ${items.length - 1} * 17vw + 26vw)` }}
            >
              <div className="absolute left-0 top-0 w-[19vw]">
                <span
                  data-intro
                  className="block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber/80"
                >
                  {eyebrow}
                </span>
                <h1
                  data-intro
                  className="mt-4 font-display text-[clamp(2.4rem,4.2vw,5rem)] font-bold leading-[0.9] tracking-[-0.03em]"
                >
                  {title}
                </h1>
                <p
                  data-intro
                  className="mt-5 max-w-[16vw] text-[clamp(0.85rem,0.95vw,1rem)] leading-relaxed text-muted"
                >
                  Keep scrolling.
                </p>
              </div>

              {/* Rail: faint base, amber fill, glowing tip */}
              <div
                data-base
                className="absolute left-0 right-0 top-1/2 h-px origin-left bg-edge-strong"
              />
              <div
                data-progress
                className="absolute left-0 right-0 top-1/2 h-px origin-left bg-gradient-to-r from-ember/40 via-ember to-amber"
                style={{ transform: "scaleX(0)" }}
              />
              <div data-tip className="pointer-events-none absolute left-0 top-1/2 will-change-transform">
                <span className="absolute left-0 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/25 blur-3xl" />
                <span className="absolute left-0 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_12px_3px_rgba(245,158,11,0.9)]" />
              </div>

              {items.map((item, i) => {
                const top = i % 2 === 0;
                return (
                  <div
                    key={`${item.date}-${item.title}`}
                    data-h-item
                    data-state="future"
                    className={`group absolute flex h-1/2 w-[24vw] transition-opacity duration-700 data-[state=future]:opacity-100 data-[state=past]:opacity-45 ${top ? "top-0 items-start" : "bottom-0 items-end"}`}
                    style={{ left: `calc(22vw + ${i} * 17vw)` }}
                  >
                    <span
                      data-stem
                      className={`absolute left-0 w-px bg-gradient-to-b ${top ? "bottom-0 top-[0.35vw] origin-bottom from-amber/80 to-ember/30" : "top-0 bottom-[0.35vw] origin-top from-ember/30 to-amber/80"}`}
                    />
                    <span
                      data-dot
                      className={`absolute left-0 grid size-[max(0.75vw,10px)] -translate-x-1/2 place-items-center ${top ? "top-0" : "bottom-0"}`}
                    >
                      <span className="absolute inset-0 rounded-full bg-amber shadow-[0_0_18px_rgba(245,158,11,0.7)]" />
                      <span className="absolute -inset-[0.6vw] hidden rounded-full border border-amber/60 animate-ping group-data-[state=active]:block" />
                    </span>
                    <div className="pl-[1.7vw]">
                      <p data-split className="leading-none">
                        <span className="mr-3 font-serif text-[clamp(1rem,1.3vw,1.5rem)] text-amber">
                          {pad(i + 1)}
                        </span>
                        <span className="font-mono text-[max(0.72vw,11px)] font-medium uppercase tracking-[0.18em] text-muted">
                          {item.date}
                        </span>
                      </p>
                      <h3
                        data-split
                        className="mt-[0.8vw] font-display text-[clamp(1.2rem,1.85vw,2.2rem)] font-bold leading-[1.02] tracking-[-0.02em]"
                      >
                        {item.title}
                      </h3>
                      <p
                        data-split
                        className="mt-[0.7vw] max-w-[20vw] text-[clamp(0.85rem,1vw,1.1rem)] leading-snug text-muted"
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {cta && (
              <div className="flex w-[24vw] shrink-0 flex-col items-start">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber/80">
                  What&apos;s next
                </span>
                <p className="mt-4 font-display text-[clamp(2.4rem,4.2vw,5rem)] font-bold leading-[0.9] tracking-[-0.03em]">
                  Still <span className="font-serif font-normal text-amber">going.</span>
                </p>
                <Link
                  href={cta.href}
                  className="group/cta mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3 font-display text-sm font-bold text-night transition-transform duration-300 hover:scale-[1.04]"
                >
                  {cta.label}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                </Link>
              </div>
            )}
          </div>

          {/* HUD */}
          <div className="pointer-events-none absolute inset-x-[6vw] bottom-[5vh] flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="tabular-nums">
              <span data-hud-count className="text-ink">00</span> / {total}
            </span>
            <span className="relative h-px flex-1 overflow-hidden bg-edge">
              <span
                data-hud-bar
                className="absolute inset-0 origin-left bg-amber/70"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
            <span data-hud-date className="min-w-[8ch] text-right text-amber" />
          </div>
        </div>
      </div>

      {/* Vertical (phones, tablets, reduced motion) */}
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 lg:hidden lg:motion-reduce:block">
        <div className="pointer-events-none absolute left-1/2 top-0 size-[80vw] -translate-x-1/2 rounded-full bg-ember/[0.08] blur-[100px]" />
        <div className="relative flex items-end gap-5">
          <div className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden rounded-xl border border-edge shadow-[0_30px_80px_-30px_rgba(255,107,26,0.4)] sm:w-36">
            <Image src={imageSrc} alt={imageAlt} fill priority sizes="144px" className="object-cover" />
          </div>
          <div>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber/80">
              {eyebrow}
            </span>
            <h1 className="mt-2 font-display text-5xl font-bold leading-[0.9] tracking-[-0.03em] sm:text-6xl">
              {title}
            </h1>
            {periodLabel && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {periodLabel}
              </p>
            )}
          </div>
        </div>

        <ol data-v-list className="relative mt-16 space-y-14 pl-10">
          <span className="absolute bottom-2 left-[6px] top-2 w-px bg-edge-strong" />
          <span
            data-v-progress
            className="absolute bottom-2 left-[6px] top-2 w-px origin-top bg-gradient-to-b from-ember to-amber shadow-[0_0_10px_rgba(245,158,11,0.6)]"
          />
          {items.map((item, i) => (
            <li key={`${item.date}-${item.title}`} data-v-item className="relative">
              <span className="absolute -left-10 top-1 size-[13px] rounded-full bg-amber shadow-[0_0_14px_rgba(245,158,11,0.7)]" />
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-lg leading-none text-amber">{pad(i + 1)}</span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  {item.date}
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>

        {cta && (
          <div data-v-item className="mt-20 border-t border-edge pt-10">
            <p className="font-display text-4xl font-bold tracking-[-0.03em]">
              Still <span className="font-serif font-normal text-amber">going.</span>
            </p>
            <Link
              href={cta.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3 font-display text-sm font-bold text-night"
            >
              {cta.label}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
