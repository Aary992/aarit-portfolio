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
            Proof of <span className="font-serif text-amber">work.</span>
          </>
        }
        intro="Job simulations and courses from the desks I learn from: Citi, J.P. Morgan, Goldman Sachs and more."
      />
      <Certifications />
    </>
  );
}
