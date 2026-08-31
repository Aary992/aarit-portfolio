import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { MoltenPanel } from "@/components/ui/molten-panel";
import CalendlyEmbed from "./calendly-embed";

const contactItems = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phoneRaw}` },
  { icon: MapPin, label: "Based in", value: profile.location, href: undefined as string | undefined },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28 sm:py-32">
      <MoltenPanel className="mb-16">
        <div className="grid gap-10 px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-night/70">
              Open for 2026
            </p>
            <h2 className="text-display mt-4 font-display font-black uppercase text-night">
              Tell me
              <br />
              what you need
            </h2>
            <a
              href="#calendly"
              className="tappable mt-8 inline-flex items-center gap-2 rounded-full bg-night px-6 py-3.5 text-base font-semibold text-ink transition-transform duration-200 hover:scale-[1.02]"
            >
              Book a 30-minute call
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Proof column. Fills the right two-thirds that used to be empty
              amber, and answers the three questions people have before they
              book: how fast, what happens on the call, is it for me. */}
          <ul className="flex flex-col divide-y divide-night/15">
            {[
              {
                label: "Response time",
                line: "I reply within 24 hours. Usually faster.",
              },
              {
                label: "The 30 minutes",
                line: "Your idea, your stack, and what I would build first.",
              },
              {
                label: "Who it's for",
                line: "Founders, creators and teams with a specific software or content project.",
              },
            ].map((p) => (
              <li key={p.label} className="py-4 first:pt-0 last:pb-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-night/60">
                  {p.label}
                </p>
                <p className="mt-1 text-base font-medium leading-snug text-night sm:text-lg">
                  {p.line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </MoltenPanel>

      <SectionHeading
        label="Contact"
        title={
          <>
            Tell me what you <span className="text-amber">need.</span>
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

        <Reveal delay={0.1} className="scroll-mt-24">
          <div id="calendly">
            <CalendlyEmbed />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
