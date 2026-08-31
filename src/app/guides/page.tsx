import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { getPublishedGuides } from "@/lib/guides";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Clear answers to common money questions, including how to start, how much is needed, what order to follow and what it costs.",
  alternates: { canonical: "/guides" },
};

export default async function GuidesPage() {
  const guides = await getPublishedGuides();
  const categories = [...new Set(guides.map((g) => g.category))].sort();

  // ItemList tells search engines this is a hub of question pages rather than
  // a blog index, which is what it is.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guides",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.question,
      url: `https://www.aaritshah.com/guides/${g.slug}`,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="Guides"
        title={
          <>
            Questions about <span className="text-amber">money.</span>
          </>
        }
        intro="Each guide answers one question in plain language, starting with the answer in the first paragraph."
      />

      <div className="mx-auto max-w-6xl px-6 pb-28">
        {guides.length === 0 ? (
          <Reveal>
            <p className="rounded-2xl border border-edge bg-surface/30 p-6 text-muted">
              Nothing published yet.
            </p>
          </Reveal>
        ) : (
          categories.map((category) => (
            <section key={category} className="mt-14 first:mt-0">
              <Reveal>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                  {category}
                </h2>
              </Reveal>
              <div className="mt-4 flex flex-col">
                {guides
                  .filter((g) => g.category === category)
                  .map((g) => (
                    <Reveal key={g.slug}>
                      <Link
                        href={`/guides/${g.slug}`}
                        className="group flex flex-col gap-2 border-b border-edge py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                      >
                        <div className="min-w-0">
                          {/* The literal search query leads, because that is
                              what a visitor arriving from Google typed. */}
                          <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-amber sm:text-2xl">
                            {g.question}
                          </h3>
                          {g.dek && (
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                              {g.dek}
                            </p>
                          )}
                        </div>
                        <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
                          {g.readTime}
                          <ArrowUpRight className="h-4 w-4 transition-colors group-hover:text-amber" />
                        </span>
                      </Link>
                    </Reveal>
                  ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
