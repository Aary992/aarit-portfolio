import { experience } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-28 sm:py-32">
      <SectionHeading
        label="Experience"
        title={
          <>
            Roles and <span className="text-amber">projects.</span>
          </>
        }
      />

      <div className="mt-14">
        {experience.map((e, i) => (
          <Reveal key={`${e.org}-${e.role}`} delay={i * 0.05}>
            <div className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7">
              <div className="flex flex-col items-center">
                <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-amber" />
                <span className="mt-2 w-px flex-1 bg-edge" />
              </div>
              <div className="pb-12">
                <span className="font-mono text-xs uppercase tracking-wider text-faint">
                  {e.period}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  {e.role}
                </h3>
                <p className="mt-0.5 text-amber">{e.org}</p>
                <p className="mt-3 leading-relaxed text-muted">{e.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
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
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
