import { BadgeCheck } from "lucide-react";
import { certifications } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 pb-28">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.05}>
            <div className="h-full bg-night p-6">
              <div className="flex items-start justify-between gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                  {c.date}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-medium leading-snug">
                {c.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{c.issuer}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
