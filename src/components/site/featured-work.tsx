import Image from "next/image";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { SpinningBorderLink } from "@/components/ui/spinning-border-button";
import { ventures } from "@/lib/data";

export default function FeaturedWork() {
  const venture = ventures.find((item) => item.slug === "marketplay")!;
  return <section id="work" aria-label="Featured work" className="scroll-mt-20">
    <ScrollExpandMedia mediaSrc={venture.image} title={venture.name} date="Inside the work · 01" mediaAlt="MarketPlay financial decision scenario" mediaContent={
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,#40226866,transparent_75%)]">
        <div className="flex w-[1000px] shrink-0 items-center justify-center gap-8 px-8 pt-14">
          {[venture.gallery![0], venture.gallery![1], venture.gallery![2]].map((shot, index) => (
            <div key={shot.src} className={`relative h-[min(56svh,530px)] w-[min(25vw,244px)] min-w-[210px] shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-night shadow-2xl ${index === 1 ? "z-10" : "translate-y-7 opacity-75"}`}>
              <Image src={shot.src} alt={shot.alt} fill sizes="244px" className="object-cover object-top" />
            </div>
          ))}
        </div>
      </div>
    }>
      <div className="grid items-start gap-8 md:grid-cols-[1fr_auto]">
        <div className="max-w-xl"><p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">{venture.role} · {venture.year}</p><p className="mt-4 text-2xl leading-snug text-ink sm:text-3xl">{venture.tagline}</p><p className="mt-4 text-sm leading-relaxed text-muted">A financial literacy game. Simulated decisions, with no real money at risk.</p></div>
        <SpinningBorderLink href={`/building/${venture.slug}`} className="justify-self-start md:mt-8">Explore MarketPlay</SpinningBorderLink>
      </div>
    </ScrollExpandMedia>
  </section>;
}
