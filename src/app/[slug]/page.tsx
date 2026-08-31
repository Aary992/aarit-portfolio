import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { getPublishedResources, getResourceBySlug } from "@/lib/resources";

/**
 * Root-level resource landing pages, e.g. aaritshah.com/quantresource.
 *
 * This is the site's catch-all, so it is the last route Next tries: every
 * real page (/about, /investing, /markets-explained/...) is a static segment
 * and wins over this dynamic one. Anything that matches neither a page nor a
 * published resource falls through to notFound(), which renders the normal
 * 404, so adding this file does not swallow bad URLs.
 */

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 60;
// A resource uploaded from a phone must be live without a redeploy.
export const dynamicParams = true;

export async function generateStaticParams() {
  const resources = await getPublishedResources();
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  if (!r) return {};
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: `/${r.slug}` },
    openGraph: {
      type: "website",
      title: `Aarit Shah · ${r.title}`,
      description: r.description,
      url: `/${r.slug}`,
    },
  };
}

export default async function ResourcePage({ params }: Params) {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  if (!r) notFound();

  const others = (await getPublishedResources())
    .filter((o) => o.slug !== r.slug)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl px-6 pt-36 pb-28 sm:pt-44">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber">
          Free resource
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="mt-6 font-wide text-[clamp(2rem,7vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.02em]"
          style={{ fontStretch: "125%" }}
        >
          {r.title}
        </h1>
      </Reveal>

      {r.description && (
        <Reveal delay={0.12}>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {r.description}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.18}>
        <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-edge bg-surface/30 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-center gap-3">
            <FileText className="h-5 w-5 shrink-0 text-amber" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">
                {r.fileName ?? "Open link"}
              </p>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
                {r.size ?? "External"}
              </p>
            </div>
          </div>

          {/* Files download in place; links open in a new tab so the visitor
              keeps the page they arrived on. */}
          <a
            href={r.url}
            {...(r.isExternal
              ? { target: "_blank", rel: "noreferrer noopener" }
              : { download: r.fileName ?? true })}
            className="tappable inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02]"
          >
            {r.isExternal ? (
              <>
                Open <ArrowUpRight className="h-4 w-4" />
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Download
              </>
            )}
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.24}>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          This resource is free and does not require an email address. You can
          share it with someone else who may find it useful.
        </p>
      </Reveal>

      {others.length > 0 && (
        <Reveal delay={0.3}>
          <section className="mt-16 border-t border-edge pt-10">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
              More free resources
            </h2>
            <div className="mt-6 flex flex-col">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/${o.slug}`}
                  className="group flex items-baseline justify-between gap-4 border-b border-edge py-4"
                >
                  <span className="font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-amber">
                    {o.title}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-amber" />
                </Link>
              ))}
            </div>
            <Link
              href="/resources"
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-amber"
            >
              See everything <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>
        </Reveal>
      )}
    </main>
  );
}
