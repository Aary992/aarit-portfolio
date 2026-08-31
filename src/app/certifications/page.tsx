import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import Certifications from "@/components/site/certifications";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Aarit Shah's credentials: job simulations from Citi, J.P. Morgan, Goldman Sachs and JPMorgan Chase (via Forage), plus trading courses.",
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Credentials"
        title={
          <>
            Courses and <span className="font-serif text-amber">job simulations.</span>
          </>
        }
        intro="Job simulations and courses from Citi, J.P. Morgan, Goldman Sachs and other organisations."
      />
      <Certifications />
    </>
  );
}
