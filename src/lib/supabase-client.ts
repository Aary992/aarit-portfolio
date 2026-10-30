"use client";

import { createClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client, used only by /admin.
 *
 * Imported from client components under /admin so the auth bundle is
 * code-split into that route and never reaches a public page.
 *
 * The publishable key is safe in a public repo: it identifies the project and
 * nothing more. Read access to drafts and every write are gated by RLS to
 * accounts listed in `private.admins` (checked by `private.is_admin()`), not
 * merely to any signed-in user: sign-ups may be open, so being authenticated
 * proves nothing. Without an admin session this key gets you exactly the
 * published content the site already shows.
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
