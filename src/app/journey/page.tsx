import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import Education from "@/components/site/education";
import Vision from "@/components/site/vision";

export const metadata: Metadata = {
  title: "Journey",
  description:
    "Aarit Shah's journey: education at KC College and MET Rishikul Vidyalaya, and where he's headed next, financial independence, building the ventures, and compounding hard.",
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
        intro="The schooling that shaped how I think, and the plan for the next five years."
      />
      <Education />
      <Vision />
    </>
  );
}
