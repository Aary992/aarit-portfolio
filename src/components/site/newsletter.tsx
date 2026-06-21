import { ArrowUpRight } from "lucide-react";
import { newsletter } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

export default function Newsletter() {
  return (
    <section id="newsletter" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-edge bg-surface/30 p-8 sm:p-14">
          <div className="amber-glow pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                Newsletter
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {newsletter.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">{newsletter.desc}</p>
            </div>
            <a
              href={newsletter.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02]"
            >
              {newsletter.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
