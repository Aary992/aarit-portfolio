import { SpinningBorderLink } from "@/components/ui/spinning-border-button";

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
                I&apos;m Aarit. My team and I built GetAITrade because I wanted a
                better way to prepare and review trades. I built MarketPlay to
                help people my age learn about finance and markets by making
                decisions. We started 10x Founders because I wanted smaller,
                more considered gatherings for young founders in Mumbai.
              </p>
              <p>
                I&apos;m a founder, trader, creator, student and developer from
                South Bombay. I trade with my own money and explain the
                reasoning behind my process. Away from the market, I work on my
                ventures and maintain the research tools I use to learn and
                organise information.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SpinningBorderLink href={profile.cv} download tone="orange">Download CV
              </SpinningBorderLink>
              {socials.map((s) => (
                <SpinningBorderLink key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" tone="dark">{s.label}</SpinningBorderLink>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
