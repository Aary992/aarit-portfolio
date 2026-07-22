import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Aarit Shah runs sessions on AI, trading, market basics and AI trading. Seven webinars delivered to a 1,500-person community. Available for communities, companies and campuses.",
  alternates: { canonical: "/speaking" },
};

const topics = [
  {
    title: "AI, without the hype",
    desc: "What these systems actually do, where they break, and which parts of a workflow are worth handing over. Live demos, not slides about the future.",
  },
  {
    title: "How markets actually work",
    desc: "Mechanism over prediction: who is on the other side of a trade, why prices move against the obvious narrative, what a balance sheet is really telling you.",
  },
  {
    title: "Market basics from zero",
    desc: "For rooms where most people have never placed a trade. Plain language, no jargon, and honest about what nobody can know.",
  },
  {
    title: "AI and trading together",
    desc: "What I built, what it gets right, and why every order still passes a human gate before it executes.",
  },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.aaritshah.com" },
    { "@type": "ListItem", position: 2, name: "Speaking", item: "https://www.aaritshah.com/speaking" },
  ],
};

export default function SpeakingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHeader
        eyebrow="Speaking"
        title={
          <>
            I teach this <span className="text-amber">every day.</span>
          </>
        }
        intro="Seven webinars delivered so far, mostly to my own 1,500-person community. The format is the same one I use daily: explain the mechanism, show it working, take the hard questions live."
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <SectionHeading label="Topics" title="What I speak about." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {topics.map((t, i) => (
            <Reveal key={t.title} delay={0.05 * i} className="h-full">
              <div className="h-full rounded-2xl border border-edge bg-surface/30 p-7">
                <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                  {t.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="rounded-2xl border border-edge bg-surface/30 p-7 sm:p-9">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Want a session?
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              Communities, companies and campuses. Tell me who is in the room
              and what they already know, and I will tell you which of these
              lands. Sessions are education only: I am not SEBI registered and
              give no tips, calls or signals, whatever the audience asks.
            </p>
            <Link
              href="/work-with-me#enquire"
              className="group tappable mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02]"
            >
              Enquire about a session
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
