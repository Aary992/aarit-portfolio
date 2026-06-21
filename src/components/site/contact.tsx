import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import CalendlyEmbed from "./calendly-embed";

const contactItems = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phoneRaw}` },
  { icon: MapPin, label: "Based in", value: profile.location, href: undefined as string | undefined },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28 sm:py-32">
      <SectionHeading
        label="Contact"
        title={
          <>
            Let&apos;s build <span className="text-amber">something.</span>
          </>
        }
        intro="Book a 30-minute call, or reach out directly. I read everything."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="flex h-full flex-col gap-3">
            {contactItems.map((c) => {
              const Icon = c.icon;
              const content = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-edge bg-night text-amber">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                      {c.label}
                    </span>
                    <span className="text-ink">{c.value}</span>
                  </span>
                </>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 rounded-2xl border border-edge bg-surface/30 p-4 transition-colors hover:border-edge-strong"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={c.label}
                  className="flex items-center gap-4 rounded-2xl border border-edge bg-surface/30 p-4"
                >
                  {content}
                </div>
              );
            })}

            <div className="mt-2 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-edge px-4 py-2 text-sm text-muted transition-colors hover:border-edge-strong hover:text-ink"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <CalendlyEmbed />
        </Reveal>
      </div>
    </section>
  );
}
