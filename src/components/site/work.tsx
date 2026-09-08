import type { CSSProperties } from "react";
import { SpinningBorderLink } from "@/components/ui/spinning-border-button";

import { ventures, type Venture } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { ShineBorder } from "@/components/ui/shine-border";
import { ScreenshotFrame } from "@/components/ui/screenshot-frame";
import { PhoneShowcase } from "@/components/ui/phone-showcase";

function hostFromUrl(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}

export default function Work() {
  return (
    <section id="ventures" className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="flex flex-col gap-8">
        {ventures.map((v, i) => (
          <VentureCard key={v.slug} v={v} index={i} />
        ))}
      </div>
    </section>
  );
}

function VentureCard({ v, index }: { v: Venture; index: number }) {
  const flip = index % 2 === 1;

  return (
    <Reveal>
      <article
        style={{ "--accent": v.accent } as CSSProperties}
        className="group relative grid gap-px overflow-hidden rounded-3xl border border-edge bg-edge transition-colors duration-500 hover:border-edge-strong md:grid-cols-2"
      >
        <div
          className={cn(
            "relative flex items-center justify-center overflow-hidden bg-surface/20 p-6 sm:p-8",
            flip && "md:order-2",
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(120% 120% at 30% 15%, color-mix(in oklab, var(--accent) 34%, transparent), transparent 62%)",
            }}
          />
          {v.gallery ? (
            <PhoneShowcase
              className="relative transition-transform duration-500 group-hover:-translate-y-1"
              images={v.gallery}
            />
          ) : (
            <ScreenshotFrame
              className="relative w-full transition-transform duration-500 group-hover:-translate-y-1"
              src={v.image}
              alt={`${v.name} screenshot`}
              host={hostFromUrl(v.url)}
              logo={v.logo}
              badge={`${String(index + 1).padStart(2, "0")} / ${String(ventures.length).padStart(2, "0")}`}
            />
          )}
        </div>

        <div className={cn("flex flex-col bg-night p-8 sm:p-10", flip && "md:order-1")}>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
              style={{
                color: "var(--accent)",
                background: "color-mix(in oklab, var(--accent) 14%, transparent)",
              }}
            >
              {v.status}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
              {v.role}
              {v.note ? ` · ${v.note}` : ""}
            </span>
          </div>

          <h3 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {v.name}
          </h3>
          <p className="mt-2 text-xl font-medium" style={{ color: "var(--accent)" }}>
            {v.tagline}
          </p>
          <p className="mt-4 leading-relaxed text-muted">{v.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {v.highlights.map((h, highlightIndex) => (
              <span
                key={h}
                className="rounded-full border border-edge px-3 py-1 text-xs text-muted"
              >
                {v.slug !== "getaitrade" || highlightIndex === 0 ? <span className="underline decoration-[var(--accent)] decoration-2 underline-offset-4">{h}</span> : h}
              </span>
            ))}
          </div>

          {v.metrics.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
              {v.metrics.map((m) => (
                <div key={m.label}>
                  <Counter
                    value={m.value}
                    className="block font-display text-2xl font-bold"
                  />
                  <div className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-amber/80">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <SpinningBorderLink href={`/building/${v.slug}`}>Explore {v.name}</SpinningBorderLink>
            <SpinningBorderLink href={v.url} target="_blank" rel="noopener noreferrer">Visit live</SpinningBorderLink>
            {v.storeUrl && (
              <SpinningBorderLink href={v.storeUrl} target="_blank" rel="noopener noreferrer">Google Play</SpinningBorderLink>
            )}
          </div>
        </div>

        <ShineBorder borderRadius={24} color={[v.accent, "#f59e0b"]} />
      </article>
    </Reveal>
  );
}
