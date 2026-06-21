import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import About from "@/components/site/about";
import Experience from "@/components/site/experience";
import Skills from "@/components/site/skills";
import Community from "@/components/site/community";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who is Aarit Shah: a founder, trader, creator and student from South Bombay building MarketPlay, GetAITrade and 10x Founders, and leading a 1,500-person community.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who I am"
        title={
          <>
            Builder first. <span className="font-serif text-amber">Always.</span>
          </>
        }
        intro="Founder, trader, creator and student from South Bombay. I build the things I can't buy, trade real markets, and document my journey to help others learn how to think, analyze, and trade for themselves. No signals, just the mechanics, to my community of over 1,500+ people."
      />
      <About />
      <Experience />
      <Skills />
      <Community />
    </>
  );
}
