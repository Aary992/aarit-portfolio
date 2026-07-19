import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { sideProjects, forFun } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Side projects",
  description:
    "The tools Aarit Shah builds for himself: a self-improving Obsidian second brain, an AI trade journal, research-analyst bots, financial models and a content engine, plus the things he does purely for fun.",
  alternates: { canonical: "/side-projects" },
};

export default function SideProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The lab"
        title={
          <>
            Things I build{" "}
            <span className="font-serif text-amber">for myself.</span>
          </>
        }
        intro="I build the tools I can't buy: bots, automations and systems that save me time or teach me faster. This is what runs in the background."
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2">
          {sideProjects.map((p, i) => {
            const cardBody = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                    {p.category}
                  </span>
                  {p.href && (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber" />
                  )}
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{p.desc}</p>
              </>
            );
            return (
              <Reveal key={p.name} delay={(i % 2) * 0.05}>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col bg-night p-8"
                  >
                    {cardBody}
                  </a>
                ) : (
                  <div className="group flex h-full flex-col bg-night p-8">{cardBody}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* For fun */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <SectionHeading
          label="For fun"
          title={
            <>
              And plenty I do{" "}
              <span className="font-serif text-amber">just because.</span>
            </>
          }
          intro="Not everything has to ship or scale. A lot of what I do is pure curiosity, and it quietly makes everything else better."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
          {forFun.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 0.05}>
              <div className="h-full bg-night p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                  {p.category}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
