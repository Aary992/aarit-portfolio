import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/ui/journey-timeline";
import Education from "@/components/site/education";
import Vision from "@/components/site/vision";
import { timeline } from "@/lib/data";

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "Aarit Shah's timeline from 2025 to now: investing, writing, internships and founding three ventures, plus his education and goals for the next five years.",
  alternates: { canonical: "/timeline" },
};

export default function TimelinePage() {
  return (
    <>
      <JourneyTimeline
        items={timeline}
        title={
          <>
            How I got <span className="font-serif font-normal text-amber">here.</span>
          </>
        }
        periodLabel="2025 to now"
        backdrop="2025 → NOW"
        imageSrc="/portrait.png"
        imageAlt="Aarit Shah"
        cta={{ label: "Work with me", href: "/work-with-me" }}
      />
      <Education />
      <Vision />
    </>
  );
}
