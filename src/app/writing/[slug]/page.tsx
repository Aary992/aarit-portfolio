import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  const canonical = `/writing/${p.slug}`;
  return {
    title: p.title,
    description: p.dek,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: `Aarit Shah · ${p.title}`,
      description: p.dek,
      url: canonical,
      publishedTime: p.date,
    },
  };
}

export default async function WritingPostPage({ params }: Params) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.dek,
    datePublished: p.date,
    author: { "@type": "Person", name: "Aarit Shah", url: "https://www.aaritshah.com" },
    publisher: { "@type": "Person", name: "Aarit Shah" },
    mainEntityOfPage: `https://www.aaritshah.com/writing/${p.slug}`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mx-auto max-w-3xl px-6 pt-40 pb-10 sm:pt-48">
        <Reveal>
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> All writing
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <span className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
            {p.category}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-[clamp(2.25rem,6vw,4rem)] font-black leading-[1.02] tracking-[-0.03em]">
            {p.title}
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 font-serif text-xl leading-relaxed text-muted">{p.dek}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <span className="mt-6 block font-mono text-[11px] uppercase tracking-wider text-faint">
            {new Date(p.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · {p.readTime} · Aarit Shah
          </span>
        </Reveal>
      </header>

      <div className="mx-auto max-w-3xl px-6 pb-20">
        <Reveal>
          <div className="flex flex-col gap-6">
            {p.body.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      {more.length > 0 && (
        <div className="mx-auto max-w-3xl border-t border-edge px-6 py-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
            Keep reading
          </span>
          <div className="mt-6 flex flex-col gap-4">
            {more.map((m) => (
              <Link
                key={m.slug}
                href={`/writing/${m.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-edge bg-surface/30 p-5 transition-colors hover:border-edge-strong"
              >
                <span className="font-display text-lg font-bold tracking-tight">
                  {m.title}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
