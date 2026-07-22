import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const routes = [
  { label: "Work with me", href: "/work-with-me", desc: "What I can be hired for." },
  { label: "Markets, Explained", href: "/markets-explained", desc: "Why markets did what they did." },
  { label: "Writing", href: "/writing", desc: "Longer pieces on what I build." },
  { label: "Building", href: "/building", desc: "The ventures, broken down." },
];

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-6 py-32">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber">
        404
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,9vw,6rem)] font-black leading-[0.9] tracking-[-0.04em]">
        This page doesn&apos;t
        <br />
        exist.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Either it moved, or the link was wrong. Here is where most people were
        heading anyway.
      </p>

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        {routes.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-edge bg-surface/30 p-5 transition-colors hover:border-edge-strong"
          >
            <span>
              <span className="block font-medium text-ink">{r.label}</span>
              <span className="mt-1 block text-sm text-muted">{r.desc}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="band-link mt-10 self-start text-sm text-muted transition-colors hover:text-ink"
      >
        Or go back home
      </Link>
    </section>
  );
}
