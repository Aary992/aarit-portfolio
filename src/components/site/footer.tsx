import Link from "next/link";
import { profile, socials, nav, newsletter } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Link
          href="/"
          className="block font-display text-[clamp(2.75rem,12vw,9rem)] font-black leading-[0.85] tracking-[-0.03em] text-ink/90 transition-colors hover:text-amber"
        >
          Aarit Shah
        </Link>

        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/" className="text-sm text-muted transition-colors hover:text-ink">
              Home
            </Link>
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Contact
            </Link>
            <a
              href={newsletter.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Newsletter
            </a>
            <Link href="/press" className="text-sm text-muted transition-colors hover:text-ink">
              Press kit
            </Link>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-edge pt-8 font-mono text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {profile.name} · South Bombay
          </span>
          <span>Educational only · Not SEBI registered · No tips or signals</span>
        </div>
      </div>
    </footer>
  );
}
