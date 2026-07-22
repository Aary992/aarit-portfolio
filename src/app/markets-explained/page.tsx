import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { MarketDisclaimer } from "@/components/ui/market-disclaimer";
import { getPublishedPosts } from "@/lib/market-posts";

export const metadata: Metadata = {
  title: "Markets, Explained",
  description:
    "A written series on why markets did what they did. Mechanism, not prediction. Not investment advice, not SEBI registered, no tips or signals.",
  alternates: {
    canonical: "/markets-explained",
    types: { "application/rss+xml": "/markets-explained/rss.xml" },
  },
};

// Posts are published from /admin, so the archive refreshes without a deploy.
export const revalidate = 60;

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.aaritshah.com" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Markets, Explained",
      item: "https://www.aaritshah.com/markets-explained",
    },
  ],
};

export default async function MarketsExplainedIndex() {
  const posts = await getPublishedPosts();

  const seriesLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Markets, Explained",
    url: "https://www.aaritshah.com/markets-explained",
    description:
      "Explaining why markets did what they did. Mechanism over prediction. Educational only.",
    author: { "@type": "Person", name: "Aarit Shah", url: "https://www.aaritshah.com" },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: `https://www.aaritshah.com/markets-explained/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesLd) }}
      />

      <PageHeader
        eyebrow="Markets, Explained"
        title={
          <>
            Why it moved, <span className="text-amber">not what to buy.</span>
          </>
        }
        intro="One thing that happened in the market, explained down to the mechanism. Written after the fact, because explaining is honest and predicting mostly is not."
      />

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <Reveal>
          <MarketDisclaimer />
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-edge bg-surface/30 p-6 leading-relaxed text-muted">
            The archive is being written. New posts land here as they go out.
          </p>
        ) : (
          <ol className="mt-12 flex flex-col">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 6) * 0.04}>
                <li className="border-t border-edge">
                  <Link
                    href={`/markets-explained/${p.slug}`}
                    className="group flex flex-col gap-2 py-8"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                      Day {p.day} · {p.readTime}
                    </span>
                    <h2 className="flex items-start justify-between gap-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                      {p.title}
                      <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h2>
                    <p className="leading-relaxed text-muted">{p.dek}</p>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ol>
        )}

        <Reveal>
          <a
            href="/markets-explained/rss.xml"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-edge px-4 py-2 text-sm text-muted transition-colors hover:border-edge-strong hover:text-ink"
          >
            <Rss className="h-3.5 w-3.5" />
            RSS feed
          </a>
        </Reveal>
      </section>
    </>
  );
}
