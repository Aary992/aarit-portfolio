"use client";

/**
 * Scratch lab: 10 name-lockup directions. Not linked from nav, not in sitemap.
 * Delete this folder once a direction is picked.
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionTemplate,
  useInView,
} from "framer-motion";

function Slide({
  n,
  title,
  note,
  children,
}: {
  n: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-screen flex-col justify-center border-b border-edge px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-mono text-xs tracking-[0.2em] text-amber">
            {n}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {title}
          </span>
        </div>
        {children}
        <p className="mt-10 max-w-md font-mono text-[11px] leading-relaxed text-faint">
          {note}
        </p>
      </div>
    </section>
  );
}

/* 01 ─ kinetic mass */
function KineticMass() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 260, damping: 40 });
  const weight = useTransform(smooth, [-2600, 0, 2600], [100, 900, 100], {
    clamp: true,
  });
  const track = useTransform(smooth, [-2600, 0, 2600], [0.06, -0.04, 0.06], {
    clamp: true,
  });
  const tracking = useMotionTemplate`${track}em`;

  return (
    <motion.h2
      style={{ fontWeight: weight, letterSpacing: tracking }}
      className="select-none font-display text-[clamp(3rem,11vw,10rem)] uppercase leading-[0.85] text-ink"
    >
      Aarit Shah
    </motion.h2>
  );
}

/* 02 ─ the ledger */
function Ledger() {
  const pts = [4, 9, 7, 14, 12, 20, 17, 26, 31, 28, 38, 44, 41, 53, 60, 57, 68, 76];
  const w = 260;
  const h = 56;
  const max = Math.max(...pts);
  const d = pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - (p / max) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        NSE · LIVE
      </div>
      <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-4">
        <h2 className="font-mono text-[clamp(2.25rem,7vw,5.5rem)] font-medium uppercase leading-none tracking-[-0.02em] text-ink">
          AARIT<span className="text-faint">.</span>SHAH
        </h2>
        <div className="flex items-end gap-4 pb-2">
          <span className="font-mono text-3xl text-ink">1,247.80</span>
          <span className="font-mono text-sm text-emerald-400">+52.0%</span>
        </div>
      </div>
      <div className="mt-6 border-t border-edge pt-6">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
          <path d={d} fill="none" stroke="var(--color-amber)" strokeWidth="1.5" />
          <circle
            cx={w}
            cy={h - (pts[pts.length - 1] / max) * h}
            r="3"
            fill="var(--color-ember)"
          />
        </svg>
        <div className="mt-5 flex flex-wrap gap-x-10 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          <span>OPEN · FOUNDER</span>
          <span>HIGH · TRADER</span>
          <span>VOL · 2.7M</span>
          <span>MUMBAI</span>
        </div>
      </div>
    </div>
  );
}

/* 03 ─ molten cast */
function MoltenCast() {
  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div
        className="absolute inset-0 animate-[molten_9s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(115deg,#7c2d12 0%,#ff6b1a 28%,#fbbf24 46%,#ff6b1a 64%,#7c2d12 100%)",
          backgroundSize: "220% 220%",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.12]" />
      <h2 className="relative px-8 py-16 text-center font-display text-[clamp(3rem,12vw,11rem)] font-black uppercase leading-[0.82] tracking-[-0.045em] text-night">
        Aarit
        <br />
        Shah
      </h2>
    </div>
  );
}

/* 04 ─ split identity */
const ROLES = ["FOUNDER", "TRADER", "CREATOR", "BUILDER"];
function SplitIdentity() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="select-none">
      <h2 className="font-display text-[clamp(3rem,12vw,11rem)] font-black uppercase leading-[0.8] tracking-[-0.045em] text-ink">
        Aarit
      </h2>
      <div className="my-2 flex h-[clamp(2rem,5vw,4rem)] items-center overflow-hidden bg-amber px-[0.08em]">
        <motion.span
          key={ROLES[i]}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[clamp(0.8rem,2.2vw,1.6rem)] font-medium uppercase tracking-[0.4em] text-night"
        >
          {ROLES[i]}
        </motion.span>
      </div>
      <h2 className="font-display text-[clamp(3rem,12vw,11rem)] font-black uppercase leading-[0.8] tracking-[-0.045em] text-ink">
        Shah
      </h2>
    </div>
  );
}

/* 05 ─ aperture reveal */
function Aperture() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  return (
    <div ref={ref} className="relative">
      <h2
        className="select-none text-center font-display text-[clamp(3rem,13vw,12rem)] font-black uppercase leading-[0.82] tracking-[-0.045em]"
        style={{
          backgroundImage: "url(/portrait.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 18%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Aarit Shah
      </h2>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={inView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        style={{ originY: 0 }}
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-night"
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={inView ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        style={{ originY: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-night"
      />
    </div>
  );
}

/* 06 ─ monogram, 3 constructions */
function Monogram() {
  const marks = [
    {
      label: "candle A",
      svg: (
        <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square">
          <path d="M14 82 L50 16 L86 82" />
          <path d="M28 58 L72 58" />
          <path d="M50 4 L50 16" strokeWidth="4" />
          <path d="M50 82 L50 94" strokeWidth="4" />
        </g>
      ),
    },
    {
      label: "bracket AS",
      svg: (
        <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="square">
          <path d="M18 88 L50 12 L82 88" />
          <path d="M32 60 L68 60" />
          <path d="M78 26 Q50 26 50 44 Q50 60 68 60" strokeWidth="6" opacity="0.55" />
        </g>
      ),
    },
    {
      label: "aperture A",
      svg: (
        <g fill="none" stroke="currentColor" strokeWidth="6">
          <circle cx="50" cy="50" r="42" />
          <path d="M26 74 L50 22 L74 74" strokeLinecap="square" />
          <path d="M37 55 L63 55" strokeLinecap="square" />
        </g>
      ),
    },
  ];
  return (
    <div className="flex flex-wrap items-end gap-12">
      {marks.map((m) => (
        <div key={m.label} className="flex flex-col items-center gap-6">
          <div className="flex items-end gap-6">
            <svg viewBox="0 0 100 100" className="h-32 w-32 text-amber">
              {m.svg}
            </svg>
            <svg viewBox="0 0 100 100" className="h-12 w-12 text-ink">
              {m.svg}
            </svg>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink">
              <svg viewBox="0 0 100 100" className="h-6 w-6 text-night">
                {m.svg}
              </svg>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* 07 ─ chromatic offset */
function Chromatic() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const ex = useTransform(sx, (v) => v * -1.1);
  const ey = useTransform(sy, (v) => v * -1.1);

  const base =
    "col-start-1 row-start-1 select-none font-display text-[clamp(3rem,12vw,11rem)] font-black uppercase leading-[0.82] tracking-[-0.045em]";

  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 26);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="grid cursor-crosshair"
    >
      <motion.h2 style={{ x: sx, y: sy }} className={`${base} text-ember`}>
        Aarit Shah
      </motion.h2>
      <motion.h2 style={{ x: ex, y: ey }} className={`${base} text-amber`}>
        Aarit Shah
      </motion.h2>
      <h2 className={`${base} text-ink`}>Aarit Shah</h2>
    </div>
  );
}

/* 08 ─ editorial slab */
function Editorial() {
  return (
    <div className="select-none">
      <div className="flex items-baseline justify-between border-b border-edge-strong pb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
        <span>Mumbai · India</span>
        <span>MMXXVI</span>
      </div>
      <h2 className="mt-10 font-serif text-[clamp(3.5rem,13vw,11rem)] leading-[0.86] tracking-[-0.03em] text-ink">
        Aarit
        <br />
        <span className="pl-[0.12em] italic text-amber">Shah</span>
      </h2>
      <div className="mt-10 flex items-baseline justify-between border-t border-edge pt-5 font-mono text-[11px] uppercase tracking-[0.24em] text-faint">
        <span>Founder · Trader · Creator</span>
        <span>001</span>
      </div>
    </div>
  );
}

/* 09 ─ terminal typing */
const FULL = "aarit shah";
function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });
  const [typed, setTyped] = useState("");
  const [snapped, setSnapped] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(FULL.slice(0, i));
      if (i >= FULL.length) {
        clearInterval(t);
        setTimeout(() => setSnapped(true), 380);
      }
    }, 62);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className="select-none">
      <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
        ~ /whois
      </div>
      <motion.h2
        animate={
          snapped
            ? { letterSpacing: "-0.045em", scale: 1 }
            : { letterSpacing: "0em", scale: 1 }
        }
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={
          snapped
            ? "font-display text-[clamp(3rem,12vw,11rem)] font-black uppercase leading-[0.82] text-ink"
            : "font-mono text-[clamp(2rem,8vw,7rem)] font-normal uppercase leading-[0.9] text-amber"
        }
      >
        {snapped ? FULL : typed}
        {!snapped && (
          <span className="ml-1 inline-block h-[0.8em] w-[0.5em] translate-y-[0.05em] bg-amber align-middle" />
        )}
      </motion.h2>
    </div>
  );
}

/* 10 ─ weight stack */
function WeightStack() {
  const rows = [
    { w: 200, o: "opacity-[0.10]", s: "text-[clamp(1.6rem,5vw,4rem)]" },
    { w: 400, o: "opacity-[0.22]", s: "text-[clamp(2.1rem,6.5vw,5.5rem)]" },
    { w: 900, o: "opacity-100", s: "text-[clamp(2.8rem,9vw,8rem)]" },
    { w: 400, o: "opacity-[0.22]", s: "text-[clamp(2.1rem,6.5vw,5.5rem)]" },
    { w: 200, o: "opacity-[0.10]", s: "text-[clamp(1.6rem,5vw,4rem)]" },
  ];
  return (
    <div className="select-none text-center">
      {rows.map((r, i) => (
        <div
          key={i}
          style={{ fontWeight: r.w }}
          className={`font-display uppercase leading-[1.02] tracking-[-0.02em] text-ink ${r.o} ${r.s}`}
        >
          Aarit Shah
        </div>
      ))}
    </div>
  );
}

export default function NameLab() {
  return (
    <>
      {/* Fonts and the molten keyframes are global now (src/lib/fonts.ts and
          globals.css), so this page no longer declares its own. */}
      <div className="px-6 pt-32 pb-8">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
            scratch · not linked
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink">
            Name lockups · 10 directions
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Scroll through. 01 reacts to scroll speed, 07 to your cursor, 05 and
            09 fire once on entry.
          </p>
        </div>
      </div>

      <Slide n="01" title="Kinetic mass" note="Weight and tracking are driven by scroll velocity. Scroll hard, the name thins out and opens up; stop, it settles back to Black. Needs the variable axis.">
        <KineticMass />
      </Slide>
      <Slide n="02" title="The ledger" note="Identity and credential fused. Numbers here are placeholder shaped like your real curve; the 52% would carry the existing disclaimer.">
        <Ledger />
      </Slide>
      <Slide n="03" title="Molten cast" note="Inverts the current logic: heat sits behind the type, letters are cut out of it. Gradient drifts on a 9s loop.">
        <MoltenCast />
      </Slide>
      <Slide n="04" title="Split identity" note="The roles row becomes part of the mark instead of a caption under it. Band swaps every 2.2s.">
        <SplitIdentity />
      </Slide>
      <Slide n="05" title="Aperture reveal" note="Portrait shows through the letterforms, shutter opens once on entry. Legibility depends on the crop behind it.">
        <Aperture />
      </Slide>
      <Slide n="06" title="Monogram" note="Three constructions, each shown at hero size, nav size and favicon size. This is the only one that gives you a reusable asset.">
        <Monogram />
      </Slide>
      <Slide n="07" title="Chromatic offset" note="Three passes converge into registration at rest and separate toward your cursor. Move the mouse across it.">
        <Chromatic />
      </Slide>
      <Slide n="08" title="Editorial slab" note="Zero effects. Zodiak serif, hairline rules, folio. The Cartier / law-firm reference taken all the way.">
        <Editorial />
      </Slide>
      <Slide n="09" title="Terminal typing" note="Mono with a block cursor, then a snap into Switzer Black. Two typefaces, one moment.">
        <Terminal />
      </Slide>
      <Slide n="10" title="Weight stack" note="Specimen sheet. No motion at all, reads as a type foundry page.">
        <WeightStack />
      </Slide>

      <div className="px-6 py-24 text-center font-mono text-xs uppercase tracking-[0.2em] text-faint">
        end · nothing here is wired into the site
      </div>
    </>
  );
}
