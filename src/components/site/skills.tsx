import { skills } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28 sm:py-32">
      <SectionHeading
        label="Toolbox"
        title={
          <>
            Areas I <span className="text-amber">work in.</span>
          </>
        }
        intro="I work across markets, software, automation and content, and I teach from projects I have built myself."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={i * 0.05}>
            <div className="h-full rounded-3xl border border-edge bg-surface/30 p-6 sm:p-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                {s.group}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-full border border-edge bg-night px-3 py-1.5 text-sm text-muted transition-colors hover:border-edge-strong hover:text-ink"
                  >
                    {it}
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
