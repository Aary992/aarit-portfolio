import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import Education from "@/components/site/education";
import Vision from "@/components/site/vision";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Aarit Shah's education at KC College and MET Rishikul Vidyalaya, followed by his goals for the next five years.",
  alternates: { canonical: "/journey" },
};

export default function JourneyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Education & goals"
        title={
          <>
            Where I&apos;ve been,{" "}
            <span className="font-serif text-amber">and where I&apos;m going.</span>
          </>
        }
        intro="The schools I attended, what I learned there and the goals I'm working toward over the next five years."
      />
      <Education />
      <Vision />
    </>
  );
}
