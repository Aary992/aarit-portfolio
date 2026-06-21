import { community } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";

export default function Community() {
  return (
    <section id="community" className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-edge bg-surface/30 p-8 sm:p-14">
          <div className="amber-glow pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
              Leadership
            </span>
            <div className="mt-7 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Counter
                  value={community.size}
                  className="block font-display text-6xl font-semibold tracking-tight sm:text-7xl"
                />
                <div className="mt-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-amber/80">
                  community members led
                </div>
              </div>
              <div className="max-w-xl">
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {community.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted">{community.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
