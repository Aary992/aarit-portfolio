import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import Work from "@/components/site/work";

export const metadata: Metadata = {
  title: "Building",
  description:
    "The three ventures Aarit Shah is building: MarketPlay, GetAITrade and 10x Founders.",
  alternates: { canonical: "/building" },
};

export default function BuildingPage() {
  return (
    <>
      <PageHeader
        eyebrow="What I'm building"
        title={
          <>
            The three ventures{" "}
            <span className="font-serif text-amber">I&apos;m building.</span>
          </>
        }
        intro="Each started with a problem I wanted to solve for myself or the people around me."
      />
      <Work />
    </>
  );
}
