import Hero from "@/components/site/hero";
import ExploreNav from "@/components/site/explore-nav";
import Marquee from "@/components/site/marquee";
import BuildingTeaser from "@/components/site/building-teaser";
import Testimonials from "@/components/site/testimonials";
import Newsletter from "@/components/site/newsletter";
import Contact from "@/components/site/contact";
import { ventures, socials } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aarit Shah",
  url: "https://aaritshahportfolio.online",
  image: "https://aaritshahportfolio.online/portrait.png",
  jobTitle: "Founder, Trader & Creator",
  description:
    "Founder, trader, creator and student from South Bombay building MarketPlay, GetAITrade and 10x Founders, and leading a 1,500-person community.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: socials.filter((s) => s.label !== "Email").map((s) => s.href),
  worksFor: ventures.map((v) => ({ "@type": "Organization", name: v.name })),
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "KC College, Churchgate" },
    { "@type": "EducationalOrganization", name: "MET Rishikul Vidyalaya" },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ExploreNav />
      <Marquee />
      <BuildingTeaser />
      <Testimonials />
      <Newsletter />
      <Contact />
    </>
  );
}
