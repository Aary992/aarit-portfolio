import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { getPublishedResources } from "@/lib/resources";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Free resources",
  description:
    "Free templates, checklists and teardowns mentioned in Aarit Shah's reels, collected in one place with no email required.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesPage() {
  const resources = await getPublishedResources();

  // Grouped by category so the page still reads well at 30 items, which is
  // where a flat list of giveaways stops being scannable.
  const categories = [...new Set(resources.map((r) => r.category))].sort();

  return (
    <main>
      <PageHeader
        eyebrow="Free resources"
        title={
          <>
            Everything I give <span className="text-amber">away.</span>
          </>
        }
        intro="The templates, checklists and teardowns I mention in my reels are collected here. They are free and do not require an email address."
      />

      <div className="mx-auto max-w-6xl px-6 pb-28">
        {resources.length === 0 ? (
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
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {resources
                  .filter((r) => r.category === category)
                  .map((r, i) => (
                    <Reveal key={r.slug} delay={Math.min(i * 0.04, 0.2)}>
                      <Link
                        href={`/${r.slug}`}
                        className="group flex h-full flex-col rounded-3xl border border-edge bg-surface/30 p-6 transition-colors hover:border-amber/40"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-amber">
                            {r.title}
                          </h3>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-amber" />
                        </div>
                        {r.description && (
                          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                            {r.description}
                          </p>
                        )}
                        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
                          aaritshah.com/{r.slug}
                          {r.size ? ` · ${r.size}` : ""}
                        </p>
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
