import { notFound } from "next/navigation";
import type { ReactNode } from "react";

// /lab is scratch space for design exploration. It must never ship: in a
// production build every lab route 404s, and even in dev it carries noindex
// in case a tunnel or preview URL leaks.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return children;
}
