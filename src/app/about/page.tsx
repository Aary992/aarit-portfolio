import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import About from "@/components/site/about";
import Experience from "@/components/site/experience";
import Skills from "@/components/site/skills";
import Community from "@/components/site/community";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aarit Shah is a founder, trader and student from South Bombay building MarketPlay, GetAITrade and 10x Founders, and teaching a 1,500-person community.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who I am"
        title={
          <>
            I build what <span className="font-serif text-amber">I need.</span>
          </>
        }
        intro="I'm a founder, trader, creator and student from South Bombay. I build tools for problems I have, trade with my own money and explain my process to a community of more than 1,500 people. I don't give signals; I focus on how the decisions work."
      />
      <About />
      <Experience />
      <Skills />
      <Community />
    </>
  );
}
