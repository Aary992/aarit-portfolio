import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { MarketDisclaimer } from "@/components/ui/market-disclaimer";
import {
  getPostBySlug,
  getPublishedPosts,
  getRelatedPosts,
} from "@/lib/market-posts";

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;
// A post published in /admin must be reachable before the next rebuild.
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPostBySlug(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.dek,
    alternates: { canonical: `/markets-explained/${p.slug}` },
    openGraph: {
      type: "article",
      title: `Aarit Shah · ${p.title}`,
      description: p.dek,
      url: `/markets-explained/${p.slug}`,
      publishedTime: p.date,
    },
  };
}

export default async function MarketPostPage({ params }: Params) {
  const { slug } = await params;
  const p = await getPostBySlug(slug);
  if (!p) notFound();

  const all = await getPublishedPosts();
  const related = await getRelatedPosts(p, all);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.dek,
    datePublished: p.date,
    dateModified: p.date,
    author: { "@type": "Person", name: "Aarit Shah", url: "https://www.aaritshah.com" },
    publisher: { "@type": "Person", name: "Aarit Shah" },
    mainEntityOfPage: `https://www.aaritshah.com/markets-explained/${p.slug}`,
    isPartOf: {
      "@type": "Blog",
      name: "Markets, Explained",
      url: "https://www.aaritshah.com/markets-explained",
    },
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: p.title,
        item: `https://www.aaritshah.com/markets-explained/${p.slug}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-28 sm:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Reveal>
        <Link
          href="/markets-explained"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Markets, Explained
        </Link>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
          Day {p.day}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="mt-4 font-display text-[clamp(2.25rem,7vw,4rem)] font-black leading-[0.95] tracking-[-0.035em]">
          {p.title}
        </h1>
      </Reveal>

      {p.dek && (
        <Reveal delay={0.11}>
          <p className="mt-5 text-lg leading-relaxed text-muted">{p.dek}</p>
        </Reveal>
      )}

      <Reveal delay={0.14}>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
          <time dateTime={p.date}>
            {new Date(p.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>{" "}
          · {p.readTime} read
        </p>
      </Reveal>

      {/* Above the body, deliberately. */}
      <div className="mt-10">
        <MarketDisclaimer />
      </div>

      <div className="mt-10">
        {p.body.map((para, i) => (
          <Reveal key={i}>
            <p className="mt-6 whitespace-pre-line text-lg leading-[1.75] text-muted first:mt-0">
              {para}
            </p>
          </Reveal>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-edge pt-10">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            Related
          </h2>
          <div className="mt-5 flex flex-col gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/markets-explained/${r.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-edge bg-surface/30 p-5 transition-colors hover:border-edge-strong"
              >
                <span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
                    Day {r.day}
                  </span>
                  <span className="mt-1 block font-medium text-ink">{r.title}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14 rounded-2xl border border-edge bg-surface/30 p-7">
        <h2 className="font-display text-xl font-bold tracking-tight">
          Building something in this space?
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          I build AI tools and trading infrastructure, and write this series
          alongside it.
        </p>
        <Link
          href="/work-with-me"
          className="group tappable mt-6 inline-flex items-center gap-2 rounded-full border border-edge-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
        >
          Work with me
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </section>
    </article>
  );
}
