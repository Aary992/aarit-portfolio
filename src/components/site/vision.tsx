import { vision } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Vision() {
  return (
    <section id="vision" className="mx-auto max-w-6xl px-6 py-28 sm:py-32">
      <SectionHeading
        label="What's next"
        title={
          <>
            Where I&apos;m <span className="font-serif text-amber">headed.</span>
          </>
        }
        intro={vision.intro}
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-3">
        {vision.goals.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 0.05}>
            <div className="h-full bg-night p-7">
              <span className="font-mono text-sm text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight">
                {g.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{g.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
