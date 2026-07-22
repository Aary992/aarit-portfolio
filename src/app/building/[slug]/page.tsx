import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ventures, ventureDetail } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { ScreenshotFrame } from "@/components/ui/screenshot-frame";
import { PhoneShowcase } from "@/components/ui/phone-showcase";

function hostFromUrl(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const v = ventures.find((x) => x.slug === slug);
  if (!v) return {};
  const canonical = `/building/${v.slug}`;
  return {
    title: v.name,
    description: v.description,
    alternates: { canonical },
    openGraph: {
      title: `Aarit Shah · ${v.name}`,
      description: v.description,
      url: canonical,
    },
  };
}

export default async function VenturePage({ params }: Params) {
  const { slug } = await params;
  const v = ventures.find((x) => x.slug === slug);
  if (!v) notFound();
  const detail = ventureDetail[slug];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.aaritshah.com" },
      { "@type": "ListItem", position: 2, name: "Building", item: "https://www.aaritshah.com/building" },
      {
        "@type": "ListItem",
        position: 3,
        name: v.name,
        item: `https://www.aaritshah.com/building/${v.slug}`,
      },
    ],
  };

  return (
    <article style={{ "--accent": v.accent } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <header className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 0%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 pt-40 pb-12 sm:pt-48">
          <Reveal>
            <Link
              href="/building"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" /> All ventures
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
                style={{
                  color: "var(--accent)",
                  background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                }}
              >
                {v.status}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                {v.role}
                {v.note ? ` · ${v.note}` : ""}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-5 flex items-center gap-4">
              {v.logo && (
                <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-edge-strong bg-night/70 backdrop-blur-md sm:h-20 sm:w-20">
                  <Image
                    src={v.logo}
                    alt={`${v.name} logo`}
                    width={56}
                    height={56}
                    className="h-11 w-11 object-contain sm:h-14 sm:w-14"
                  />
                </span>
              )}
              <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-[-0.03em]">
                {v.name}
              </h1>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p
              className="mt-4 font-serif text-2xl sm:text-3xl"
              style={{ color: "var(--accent)" }}
            >
              {v.tagline}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">
              {detail?.longDescription ?? v.description}
            </p>
          </Reveal>

          {detail?.features && (
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-edge bg-edge sm:grid-cols-3">
              {detail.features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.05}>
                  <div className="h-full bg-night p-6">
                    <h3 className="font-display text-lg font-bold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {detail?.breakdown && (
            <section className="mt-16">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                The breakdown
              </h2>

              <Reveal>
                <h3 className="mt-8 font-display text-xl font-bold tracking-tight">
                  The problem
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {detail.breakdown.problem}
                </p>
              </Reveal>

              <Reveal>
                <h3 className="mt-10 font-display text-xl font-bold tracking-tight">
                  The approach
                </h3>
                <p className="mt-3 leading-relaxed text-muted">
                  {detail.breakdown.approach}
                </p>
              </Reveal>

              <Reveal>
                <h3 className="mt-10 font-display text-xl font-bold tracking-tight">
                  How it is put together
                </h3>
                <dl className="mt-5 flex flex-col">
                  {detail.breakdown.architecture.map((a) => (
                    <div key={a.label} className="border-t border-edge py-4">
                      <dt className="font-medium text-ink">{a.label}</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                        {a.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal>
                <h3 className="mt-10 font-display text-xl font-bold tracking-tight">
                  Calls that could have gone the other way
                </h3>
                <div className="mt-5 flex flex-col gap-4">
                  {detail.breakdown.decisions.map((d) => (
                    <div
                      key={d.call}
                      className="rounded-2xl border border-edge bg-surface/30 p-5"
                    >
                      <p className="font-medium text-ink">{d.call}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {d.why}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>
          )}

          <Reveal>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold text-night"
                style={{ background: "var(--accent)" }}
              >
                Visit {v.name}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/work-with-me"
                className="tappable inline-flex items-center gap-2 rounded-full border border-edge-strong px-6 py-3.5 text-base font-medium text-ink transition-colors hover:bg-surface"
              >
                Want something like this built?
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          <Reveal>
            {v.gallery ? (
              <PhoneShowcase images={v.gallery} />
            ) : (
              <ScreenshotFrame
                src={v.image}
                alt={`${v.name} screenshot`}
                host={hostFromUrl(v.url)}
                logo={v.logo}
                priority
              />
            )}
          </Reveal>
          {v.metrics.length > 0 && (
            <Reveal delay={0.05}>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-edge bg-edge">
                {v.metrics.map((m) => (
                  <div key={m.label} className="bg-night p-5">
                    <Counter
                      value={m.value}
                      className="block font-display text-2xl font-bold"
                    />
                    <div className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-amber/80">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </article>
  );
}
