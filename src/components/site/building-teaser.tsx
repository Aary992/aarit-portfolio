import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ventures } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export default function BuildingTeaser() {
  return (
    <section id="building" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <SectionHeading
        label="What I'm building"
        title={
          <>
            The three ventures{" "}
            <span className="font-serif text-amber">I&apos;m building.</span>
          </>
        }
        intro="Each started with a problem I wanted to solve for myself or the people around me."
      />

      <div className="mt-14 flex flex-col border-y border-edge">
        {ventures.map((v, i) => (
          <Reveal key={v.slug} delay={i * 0.05}>
            <Link
              href={`/building/${v.slug}`}
              style={{ "--accent": v.accent } as CSSProperties}
              className="group flex flex-col gap-3 border-b border-edge py-8 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-edge bg-night">
                  {v.logo ? (
                    <Image
                      src={v.logo}
                      alt={`${v.name} logo`}
                      width={40}
                      height={40}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <span
                      className="font-display text-lg font-bold"
                      style={{ color: "var(--accent)" }}
                    >
                      {v.name.charAt(0)}
                    </span>
                  )}
                </span>
                <h3 className="bg-gradient-to-br from-ink via-ink to-[var(--accent)] bg-clip-text font-display text-3xl font-bold tracking-tight text-transparent transition-[filter] duration-300 group-hover:brightness-125 sm:text-5xl">
                  {v.name}
                </h3>
              </div>
              <div className="flex items-center gap-6 pl-10 sm:gap-10 sm:pl-0">
                <p className="max-w-xs text-sm text-muted">{v.tagline}</p>
                <span
                  className="hidden font-mono text-[11px] font-medium uppercase tracking-wider lg:inline"
                  style={{ color: "var(--accent)" }}
                >
                  {v.status}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
