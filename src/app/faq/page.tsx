import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about who Aarit Shah is, what he can be hired for, the not-SEBI-registered position, MarketPlay, GetAITrade, the free calculators, and how to start working together.",
  alternates: { canonical: "/faq" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.aaritshah.com" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.aaritshah.com/faq" },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            The questions I <span className="text-amber">actually get.</span>
          </>
        }
        intro="Short answers, including the one about SEBI registration, which is the one that matters most."
      />

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <dl className="flex flex-col">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 6) * 0.04}>
              <div className="border-t border-edge py-8 first:border-t-0 first:pt-0">
                <dt className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  {f.q}
                </dt>
                <dd className="mt-3 leading-relaxed text-muted">{f.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal>
          <div className="mt-12 rounded-2xl border border-edge bg-surface/30 p-7">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Something not answered here?
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Ask it directly. I read everything and reply within 24 hours.
            </p>
            <Link
              href="/work-with-me#enquire"
              className="group tappable mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02]"
            >
              Send an enquiry
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
