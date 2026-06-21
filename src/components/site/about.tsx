import { ArrowUpRight, Download } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Portrait } from "@/components/ui/portrait";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 sm:py-32">
      <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1fr] md:gap-16">
        <Reveal>
          <Portrait
            src="/silhouette.png"
            alt="Aarit Shah"
            className="aspect-[4/5]"
            objectPosition="center"
            sizes="(max-width: 768px) 90vw, 420px"
            placeholderLabel="Add your photo"
            placeholderHint="Save it to public/silhouette.png"
          />
        </Reveal>

        <div>
          <SectionHeading
            label="About"
            title={
              <>
                I&apos;d rather build it than{" "}
                <span className="text-amber">buy it.</span>
              </>
            }
          />
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m Aarit. I build the things I can&apos;t buy. When I
                wanted to automate my trading, my team and I built GetAITrade.
                When I watched my generation waste time and not know anything
                about finance or the markets, I built MarketPlay. When
                Mumbai&apos;s founder scene felt hollow, we started 10x Founders.
              </p>
              <p>
                Founder, trader, influencer, student and developer from South
                Bombay. I build the tools I can&apos;t buy and trade real markets
                daily. My focus is on technical transparency: sharing the logic
                behind my process. Off-market, I&apos;m obsessed with building
                AI-driven infrastructure, working on my startups and
                knowledge-management systems to sharpen my edge.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={profile.cv}
                download
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-5 py-2 text-sm font-semibold text-night transition-transform duration-200 hover:scale-[1.03]"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-edge px-4 py-2 text-sm text-muted transition-colors hover:border-edge-strong hover:text-ink"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
