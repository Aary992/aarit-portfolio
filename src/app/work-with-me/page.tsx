import type { Metadata } from "next";
import { ArrowUpRight, CalendarClock, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { services, profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "Hire Aarit Shah for AI consultation, AI tool and website builds, paid promotions to a 22K-follower finance audience, and content work. Currently taking on projects. No investment advice, education, software and media only.",
  alternates: { canonical: "/work-with-me" },
};

const steps = [
  {
    label: "Enquire",
    text: "The form below, or a direct email. Either works, both get read.",
  },
  {
    label: "Call",
    text: "30 minutes, free. Your idea, your stack, and whether I can actually move the needle.",
  },
  {
    label: "Scope",
    text: "A written proposal with fixed scope. You know what you get before anything starts.",
  },
  {
    label: "Ship",
    text: "I build, you review, we iterate. You end up owning the result.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aarit Shah",
  url: "https://www.aaritshah.com/work-with-me",
  areaServed: "Worldwide",
  provider: {
    "@type": "Person",
    name: "Aarit Shah",
    url: "https://www.aaritshah.com",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, description: s.pitch },
    })),
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.aaritshah.com" },
    { "@type": "ListItem", position: 2, name: "Work with me", item: "https://www.aaritshah.com/work-with-me" },
  ],
};

export default function WorkWithMePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHeader
        eyebrow="Work with me · Open for 2026"
        title={
          <>
            Four ways we can <span className="text-amber">build together.</span>
          </>
        }
        intro="Currently taking on work. No pricing pages, no minimum budget: tell me what you need, and if I can move the needle I'll say so on a free 30-minute call. If I can't, I'll tell you that too."
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={0.05 * i}>
              <article className="flex h-full flex-col rounded-2xl border border-edge bg-surface/30 p-7 transition-colors hover:border-edge-strong sm:p-8">
                <span className="font-mono text-xs tracking-[0.2em] text-amber">
                  0{i + 1}
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
                  {s.name}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{s.pitch}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {s.engagement.map((line) => (
                    <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[0.55em] h-[2px] w-4 shrink-0 bg-gradient-to-r from-ember to-amber" />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-edge pt-5 text-sm leading-relaxed">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                    You walk away with{" "}
                  </span>
                  <span className="mt-1.5 block text-ink">{s.outcome}</span>
                </p>
                {s.note && (
                  <p className="mt-4 rounded-xl bg-night/60 px-4 py-3 font-mono text-[11px] leading-relaxed text-amber/90">
                    {s.note}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-muted">
            Building something at the intersection of AI, markets or content
            that doesn&apos;t fit a box above? Send it anyway. The interesting
            ones never fit.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <SectionHeading
          label="How it works"
          title="No mystery, no retainers by default."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.label} delay={0.05 * i} className="h-full">
              <div className="flex h-full flex-col gap-2 bg-night px-6 py-7">
                <span className="font-mono text-xs tracking-[0.2em] text-amber">
                  0{i + 1}
                </span>
                <h3 className="font-display text-lg font-bold text-ink">{step.label}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <Reveal>
          <div className="rounded-2xl border border-amber/25 bg-amber/[0.04] p-7 sm:p-8">
            <h2 className="font-display text-lg font-bold text-ink">
              The line I don&apos;t cross
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-muted">
              I&apos;m not SEBI registered. Nothing I do is investment advice,
              and I don&apos;t take engagements that need it to be: no tips, no
              calls, no signals, no managing anyone&apos;s money. What I sell is
              education, software and media. If your project needs a registered
              adviser, you need a registered adviser, not me.
            </p>
          </div>
        </Reveal>
      </section>

      <section id="enquire" className="mx-auto max-w-6xl px-6 pb-28">
        <SectionHeading
          label="Start here"
          title={
            <>
              Tell me what you&apos;re{" "}
              <span className="text-amber">building.</span>
            </>
          }
          intro="Short is fine. I reply within 24 hours, usually faster."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <EnquiryForm />
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-3">
              <a
                href={profile.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-edge bg-surface/30 p-5 transition-colors hover:border-edge-strong"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-edge bg-night text-amber">
                  <CalendarClock className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                    Prefer to talk first?
                  </span>
                  <span className="flex items-center gap-1.5 text-ink">
                    Book the 30 minutes directly
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-edge bg-surface/30 p-5 transition-colors hover:border-edge-strong"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-edge bg-night text-amber">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                    Or just email
                  </span>
                  <span className="text-ink">{profile.email}</span>
                </span>
              </a>
              <p className="mt-2 px-1 font-mono text-[11px] leading-relaxed text-faint">
                Educational only · Not SEBI registered · No tips, calls or
                signals
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
