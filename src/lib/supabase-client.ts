"use client";

import { createClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client, used only by /admin.
 *
 * Imported from client components under /admin so the auth bundle is
 * code-split into that route and never reaches a public page.
 *
 * The publishable key is safe in a public repo: it identifies the project and
 * nothing more. Read access to drafts and every write are gated by RLS on the
 * `authenticated` role, so possessing this key without a valid session gets
 * you exactly the published posts the site already shows.
 */
export const supabase = createClient(
  "https://upknvaoegkagbrktkufd.supabase.co",
  "sb_publishable_GIx724d3FXf3h7GqQccIGw_z9l9sEqA",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: "aarit-portfolio-admin",
    },
  },
);
