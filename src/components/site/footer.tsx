import Link from "next/link";
import { profile, socials, footerNav, newsletter } from "@/lib/data";
import { WeightStack } from "@/components/ui/weight-stack";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          aria-label="Aarit Shah, home"
          className="block py-4"
        >
          <WeightStack />
        </Link>

        {/* The full map of the site. The top nav carries six links; every
            other route is reachable from here, which is also what gives the
            deeper pages internal links pointing at them. */}
        <nav
          aria-label="Footer"
          className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {footerNav.map((group) => (
            <div key={group.heading}>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
                {group.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="band-link text-sm text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              Elsewhere
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <Link
                  href="/#contact"
                  className="band-link text-sm text-muted transition-colors hover:text-ink"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={newsletter.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="band-link text-sm text-muted transition-colors hover:text-ink"
                >
                  Newsletter
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="band-link text-sm text-muted transition-colors hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

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
