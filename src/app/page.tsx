import IntroLoader from "@/components/site/intro-loader";
import Hero from "@/components/site/hero";
import ExploreNav from "@/components/site/explore-nav";
import Marquee from "@/components/site/marquee";
import BuildingTeaser from "@/components/site/building-teaser";
import Newsletter from "@/components/site/newsletter";
import Contact from "@/components/site/contact";
import { ventures, socials } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aarit Shah",
  url: "https://www.aaritshah.com",
  image: "https://www.aaritshah.com/portrait.png",
  jobTitle: "Founder, Builder & Trader",
  description:
    "Founder and trader from South Bombay building MarketPlay, GetAITrade and 10x Founders, and running daily webinars on software, markets and trading for a 1,500-person community.",
  knowsAbout: [
    "Artificial Intelligence",
    "AI agents",
    "AI trading systems",
    "Algorithmic trading",
    "Financial markets",
    "Value investing",
    "Cryptocurrency",
    "Financial literacy",
  ],
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

/**
 * The practice, as distinct from the person. Search engines resolve "who is
 * X" from the Person entity and "can I hire X" from this one; without it,
 * the services have no organisation to attach to.
 */
const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.aaritshah.com/#organization",
  name: "Aarit Shah",
  url: "https://www.aaritshah.com",
  logo: "https://www.aaritshah.com/icon.png",
  founder: { "@type": "Person", name: "Aarit Shah" },
  areaServed: "Worldwide",
  knowsLanguage: ["en", "hi"],
  sameAs: socials.filter((s) => s.label !== "Email").map((s) => s.href),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  description:
    "Workflow consultation, custom tools and websites, paid promotions and content work. Education, software and media only. Not SEBI registered and not an investment adviser.",
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://www.aaritshah.com",
  name: "Aarit Shah",
  inLanguage: "en-IN",
  publisher: { "@id": "https://www.aaritshah.com/#organization" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <IntroLoader />
      <Hero />
      <ExploreNav />
      <Marquee />
      <BuildingTeaser />
      <Newsletter />
      <Contact />
    </>
  );
}
