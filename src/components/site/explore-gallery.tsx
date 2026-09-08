import ExploreNav from "./explore-nav";
import BuildingPage from "@/app/building/page";
import InvestingPage from "@/app/investing/page";
import SideProjectsPage from "@/app/side-projects/page";
import AboutPage from "@/app/about/page";
import JourneyPage from "@/app/journey/page";
import CertificationsPage from "@/app/certifications/page";

// The gallery reveals the same content as the dedicated pages. No second set
// of credentials, venture claims or personal details to keep in sync.
export default function ExploreGallery() {
  return <ExploreNav panels={{
    building: <BuildingPage />,
    investing: <InvestingPage />,
    "side-projects": <SideProjectsPage />,
    about: <AboutPage />,
    journey: <JourneyPage />,
    certifications: <CertificationsPage />,
  }} />;
}
