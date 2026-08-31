import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { investing } from "@/lib/data";

export const metadata: Metadata = {
  title: "Investing",
  description:
    "How Aarit Shah approaches equities through value investing and trades crypto CFDs with written rules and fixed risk limits.",
  alternates: { canonical: "/investing" },
};

export default function InvestingPage() {
  const { equity, crypto } = investing;

  return (
    <>
      <PageHeader
        eyebrow="How I invest"
        title={
          <>
            How I approach <span className="font-serif text-amber">risk.</span>
          </>
        }
        intro={investing.intro}
      />

      {/* Equity — value investing */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <SectionHeading label={equity.label} title={equity.title} intro={equity.intro} />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
          {equity.process.map((p, i) => (
            <Reveal key={p.step} delay={(i % 4) * 0.05}>
              <div className="h-full bg-night p-7">
                <span className="font-mono text-sm text-amber">{p.step}</span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge bg-edge lg:grid-cols-4">
            {equity.stats.map((s) => (
              <div
                key={s.label}
                className="bg-night px-5 py-7 transition-colors duration-300 hover:bg-surface/40"
              >
                <Counter
                  value={s.value}
                  className="block font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl"
                />
                <div className="mt-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-amber/80">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Crypto — CFDs */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionHeading label={crypto.label} title={crypto.title} intro={crypto.intro} />

        <Reveal>
          <ul className="mt-12 flex flex-col gap-3">
            {crypto.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-4 rounded-2xl border border-edge bg-surface/30 px-6 py-5"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                <span className="text-lg leading-relaxed text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <Reveal>
          <p className="max-w-3xl border-l-2 border-amber/40 pl-5 font-mono text-[11px] leading-relaxed text-faint">
            {investing.disclaimer}
          </p>
        </Reveal>
      </section>
    </>
  );
}
