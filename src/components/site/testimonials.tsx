import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Testimonials() {
  return (
    <section id="voices" className="mx-auto max-w-6xl px-6 py-28 sm:py-32">
      <SectionHeading
        label="Voices"
        title={
          <>
            From the <span className="text-amber">community.</span>
          </>
        }
        intro="What the 1,500+ people I teach every day have to say."
      />
      <Reveal>
        <div className="mt-12 flex justify-center">
          <ScrollReelTestimonials testimonials={testimonials} />
        </div>
      </Reveal>
    </section>
  );
}
