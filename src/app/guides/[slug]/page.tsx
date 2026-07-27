import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MarketDisclaimer } from "@/components/ui/market-disclaimer";
import { answerSnippet, getGuideBySlug, getPublishedGuides } from "@/lib/guides";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const guides = await getPublishedGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const g = await getGuideBySlug(slug);
  if (!g) return {};
  return {
    // The question is the title tag, because it is what gets matched against
    // the query. The prettier internal title is for the page itself.
    title: g.question,
    description: g.dek || answerSnippet(g.body),
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      type: "article",
      title: g.question,
      description: g.dek || answerSnippet(g.body),
      url: `/guides/${g.slug}`,
      publishedTime: g.date,
      modifiedTime: g.updated,
    },
  };
}

export default async function GuidePage({ params }: Params) {
  const { slug } = await params;
  const g = await getGuideBySlug(slug);
  if (!g) notFound();

  const related = (await getPublishedGuides())
    .filter((o) => o.slug !== g.slug && o.category === g.category)
    .slice(0, 2);

  const base = "https://www.aaritshah.com";

  // FAQPage is what makes a question page eligible for the question-shaped
  // result. The answer is the first paragraph, which is why guides are
  // written to answer immediately instead of warming up.
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: g.question,
        acceptedAnswer: { "@type": "Answer", text: answerSnippet(g.body) },
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    alternativeHeadline: g.question,
    description: g.dek || answerSnippet(g.body),
    datePublished: g.date,
    dateModified: g.updated,
    author: { "@type": "Person", name: "Aarit Shah", url: base },
    publisher: { "@type": "Person", name: "Aarit Shah" },
    mainEntityOfPage: `${base}/guides/${g.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${base}/guides` },
      {
        "@type": "ListItem",
        position: 3,
        name: g.question,
        item: `${base}/guides/${g.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-6 pt-36 pb-28 sm:pt-44">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Reveal>
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-amber"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Guides
        </Link>
      </Reveal>

      <Reveal delay={0.06}>
        {/* The H1 is the question itself, verbatim. A visitor who searched it
            should see their own words at the top and know instantly they are
            in the right place. */}
        <h1
          className="mt-6 font-wide text-[clamp(1.9rem,6vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.02em]"
          style={{ fontStretch: "125%" }}
        >
          {g.question}
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          {g.readTime} · Updated {g.updated}
        </p>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-8">
          <MarketDisclaimer />
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="mt-10 flex flex-col gap-6">
          {g.body.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-xl leading-relaxed text-ink"
                  : "text-lg leading-relaxed text-muted"
              }
            >
              {para}
            </p>
          ))}
        </div>
      </Reveal>

      {related.length > 0 && (
        <Reveal delay={0.24}>
          <section className="mt-16 border-t border-edge pt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
              Related
            </h2>
            <div className="mt-6 flex flex-col">
              {related.map((o) => (
                <Link
                  key={o.slug}
                  href={`/guides/${o.slug}`}
                  className="group flex items-baseline justify-between gap-4 border-b border-edge py-4"
                >
                  <span className="font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-amber">
                    {o.question}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-amber" />
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </main>
  );
}
