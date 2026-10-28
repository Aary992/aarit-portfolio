import ExploreNav from "./explore-nav";
import BuildingPage from "@/app/building/page";
import InvestingPage from "@/app/investing/page";
import SideProjectsPage from "@/app/side-projects/page";
import AboutPage from "@/app/about/page";
import CertificationsPage from "@/app/certifications/page";
import { PageHeader } from "@/components/ui/page-header";
import Education from "./education";
import Vision from "./vision";

// The gallery reveals the same content as the dedicated pages. No second set
// of credentials, venture claims or personal details to keep in sync.
export default function ExploreGallery() {
  return <ExploreNav panels={{
    building: <BuildingPage />,
    investing: <InvestingPage />,
    "side-projects": <SideProjectsPage />,
    about: <AboutPage />,
    // The pinned scroll timeline cannot run inside the dialog, so the chapter
    // shows the rest of /timeline: education and what comes next.
    timeline: (
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
    ),
    certifications: <CertificationsPage />,
  }} />;
}
