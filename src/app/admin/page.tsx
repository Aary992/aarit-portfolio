import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/admin-app";

export const metadata: Metadata = {
  title: "Admin",
  // Never in search results, never in the sitemap. The route is protected by
  // Supabase auth and RLS, but there is no reason for it to be discoverable.
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return <AdminApp />;
}
