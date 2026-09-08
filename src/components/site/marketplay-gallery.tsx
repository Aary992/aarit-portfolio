import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const captions = [
  "The opening call",
  "A path through money",
  "Three choices. One decision.",
  "Your starting point",
  "Learn by doing",
  "See the reasoning",
  "See what follows",
  "The simulated trading desk",
];

export function MarketPlayGallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <section aria-labelledby="marketplay-screens" className="mx-auto max-w-6xl px-6 pt-12 pb-24 sm:pt-20">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-t border-edge pt-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-violet-300">Inside MarketPlay</p>
            <h2 id="marketplay-screens" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">From the first call to the next decision.</h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-faint">08 screens · Select to view full size</p>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 items-start gap-x-4 gap-y-10 sm:gap-x-7 lg:grid-cols-4">
        {images.map((image, index) => (
          <Reveal key={image.src} delay={(index % 4) * .035}>
            <figure className="group">
              <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`View full screenshot: ${captions[index]}`} className="block overflow-hidden rounded-[1.3rem] border border-white/15 bg-[#0c0816] shadow-[0_18px_45px_-20px_#000] transition-[transform,border-color] duration-500 hover:-translate-y-2 hover:border-violet-300/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 motion-reduce:transform-none">
                <Image src={image.src} alt={image.alt} width={780} height={1688} sizes="(max-width: 640px) 44vw, (max-width: 1024px) 45vw, 260px" className="h-auto w-full" />
              </a>
              <figcaption className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted sm:text-sm">
                <span className="font-mono text-[10px] text-violet-300/70">{String(index + 1).padStart(2, "0")}</span>
                <span className="flex-1">{captions[index]}</span>
                <ArrowUpRight aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0 text-faint" />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
