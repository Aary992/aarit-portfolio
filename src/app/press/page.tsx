import type { Metadata } from "next";
import { Download, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Portrait } from "@/components/ui/portrait";
import { profile, ventures, heroStats, community } from "@/lib/data";

export const metadata: Metadata = {
  title: "Press kit",
  description:
    "Media kit for Aarit Shah: bio copy, fact sheet, headshot and boilerplate for journalists, podcast bookers and press.",
  alternates: { canonical: "/press" },
};

const bios = [
  {
    label: "One-liner",
    text: "Aarit Shah is a Mumbai-based founder and trader running MarketPlay, GetAITrade and 10x Founders, and teaching software and trading to a 1,500-person community every day.",
  },
  {
    label: "Short bio",
    text: "Aarit Shah is a founder and trader from Mumbai building three ventures: MarketPlay, a financial literacy game for Indian Gen Z with ten automated backend roles that require human approval; GetAITrade, a trading tool that requires confirmation before every order; and 10x Founders, an invite-only group for young Mumbai founders. He runs daily webinars on software and markets for a 1,500-person community and posts content that reached 4M views in the last 90 days. He does not give tips or signals.",
  },
  {
    label: "Long bio",
    text: "Aarit Shah is a founder and trader from South Bombay who is pursuing commerce at KC College while running three ventures. MarketPlay is a financial literacy game he built for Indian Gen Z. It uses real market events, asks the player to make one irreversible decision and relies on ten task-specific backend tools whose work requires human approval. GetAITrade is a trading tool that has been tested with real funds and requires confirmation before every order. 10x Founders is an invite-only group for young Mumbai founders. Aarit also runs daily webinars on software, markets and trading for a 1,500-person community. He is not SEBI registered and does not give tips or signals. He uses a value-investing approach for equities and written risk rules for crypto CFD trades.",
  },
];

export default function PressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Press kit"
        title={
          <>
            Bio, facts and{" "}
            <span className="font-serif text-amber">a headshot.</span>
          </>
        }
        intro="Bio copy, fact sheet and a headshot, ready to paste. If you need anything else, email me directly."
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <div className="flex flex-col gap-4">
              <Portrait
                src="/portrait.png"
                alt="Aarit Shah headshot"
                className="aspect-[4/5]"
                objectPosition="center 20%"
                sizes="(max-width: 1024px) 90vw, 420px"
                placeholderLabel="Add your portrait"
                placeholderHint="Save it to public/portrait.png"
              />
              <a
                href="/portrait.png"
                download
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-edge-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
              >
                <Download className="h-4 w-4" />
                Download headshot
              </a>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            {bios.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.05}>
                <div className="rounded-2xl border border-edge bg-surface/30 p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                    {b.label}
                  </span>
                  <p className="mt-3 leading-relaxed text-muted">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <SectionHeading label="Fact sheet" title="The numbers, current as of today." />
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="bg-night p-6">
              <div className="font-display text-3xl font-extrabold tracking-tight">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-amber/80">
                {s.label}
              </div>
            </div>
          ))}
          <div className="bg-night p-6">
            <div className="font-display text-3xl font-extrabold tracking-tight">
              {community.size}
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-amber/80">
              community members taught daily
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-3">
          {ventures.map((v) => (
            <div key={v.slug} className="bg-night p-6">
              <h3 className="font-display text-lg font-bold">{v.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.tagline}</p>
              <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-wider text-faint">
                {v.role} · {v.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <SectionHeading label="Boilerplate" title="For the 'about' line at the end of a piece." />
        <Reveal>
          <div className="mt-8 rounded-2xl border border-edge bg-surface/30 p-6">
            <p className="leading-relaxed text-muted">
              Aarit Shah is the founder of MarketPlay, GetAITrade and 10x Founders,
              three Mumbai-based ventures focused on financial education, trading
              software and founder gatherings. He teaches software, markets and
              trading to a 1,500-person community each day and does not give tips
              or signals.
              More at{" "}
              <a href="https://www.aaritshah.com" className="text-amber underline-offset-4 hover:underline">
                aaritshah.com
              </a>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <a
            href={`mailto:${profile.email}?subject=Press inquiry`}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02]"
          >
            <Mail className="h-4 w-4" />
            Get in touch for press
          </a>
        </Reveal>
      </section>
    </>
  );
}
