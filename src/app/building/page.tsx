import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import Work from "@/components/site/work";

export const metadata: Metadata = {
  title: "Building",
  description:
    "The startups Aarit Shah is building: MarketPlay (gamified financial literacy), GetAITrade (AI trading infrastructure) and 10x Founders (an invite-only founders' club).",
  alternates: { canonical: "/building" },
};

export default function BuildingPage() {
  return (
    <>
      <PageHeader
        eyebrow="What I'm building"
        title={
          <>
            Three startups,{" "}
            <span className="font-serif text-amber">one pattern.</span>
          </>
        }
        intro="Find something broken, and rebuild it."
      />
      <Work />
    </>
  );
}
