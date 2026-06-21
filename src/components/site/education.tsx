import { education } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-28 sm:py-32">
      <SectionHeading
        label="Education"
        title={
          <>
            Where it <span className="font-serif text-amber">started.</span>
          </>
        }
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.institution} delay={(i % 2) * 0.05}>
            <div className="h-full bg-night p-8">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-amber/80">
                {e.period}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                {e.institution}
              </h3>
              <p className="mt-1 text-amber">{e.detail}</p>
              <p className="mt-3 leading-relaxed text-muted">{e.note}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-edge px-3 py-1 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
