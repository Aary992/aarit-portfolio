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
    text: "Aarit Shah is a Mumbai-based founder and AI builder running MarketPlay, GetAITrade and 10x Founders, and teaching AI and trading to a 1,500-person community every day.",
  },
  {
    label: "Short bio",
    text: "Aarit Shah is a founder, AI builder and trader from Mumbai building three ventures at once: MarketPlay, a gamified financial literacy app for Indian Gen Z powered by a 10-agent AI backend; GetAITrade, AI trading infrastructure with human-verified execution; and 10x Founders, an invite-only community for young Mumbai builders. He runs daily webinars on AI and markets for a 1,500-person community and posts content reaching 2.7M views a month, without ever giving a tip or a signal.",
  },
  {
    label: "Long bio",
    text: "Aarit Shah is a founder, AI builder and trader from South Bombay, currently pursuing commerce at KC College while running three companies. MarketPlay is his solo-built flagship: a Duolingo-style financial literacy game for Indian Gen Z, with a real market event, one irreversible decision, and an AI-run backend of 10 scoped agents gated behind human approval. GetAITrade is AI-powered trading command infrastructure, live and tested with real funds, with a human-verification gate on every order. 10x Founders is an invite-only room for young Mumbai founders actually building. Alongside the ventures, Aarit runs daily webinars for a 1,500-person community teaching AI, markets and trading in plain language, always making clear he's not SEBI registered and never gives a tip or a signal. His personal investing track record runs a value-investing approach to equities and a systematic, risk-first approach to crypto CFDs.",
  },
];

export default function PressPage() {
  return (
    <>
      <PageHeader
        eyebrow="Press kit"
        title={
          <>
            Everything you need{" "}
            <span className="font-serif text-amber">to cover me.</span>
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
              three Mumbai-based ventures at the intersection of AI and finance.
              He teaches AI, markets and trading to a 1,500-person community
              daily, with no tips or signals, just how the systems actually work.
              More at{" "}
              <a href="https://aaritshah.com" className="text-amber underline-offset-4 hover:underline">
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
