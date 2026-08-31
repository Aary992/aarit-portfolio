import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Aarit Shah writes about the software he builds, the way he approaches trading and what he teaches in daily webinars for a 1,500-person community.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title={
          <>
            Notes on software{" "}
            <span className="font-serif text-amber">and markets.</span>
          </>
        }
        intro="Longer notes on the tools I build, the trades I study and what I learn from teaching a community each day. No tips or signals."
      />

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.05}>
              <Link
                href={`/writing/${p.slug}`}
                className="group flex h-full flex-col bg-night p-8"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                    {p.category}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{p.dek}</p>
                <span className="mt-6 font-mono text-[11px] uppercase tracking-wider text-faint">
                  {new Date(p.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  · {p.readTime}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
