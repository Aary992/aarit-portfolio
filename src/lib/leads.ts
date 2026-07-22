/**
 * Lead capture: a plain PostgREST insert into the dedicated `aarit-portfolio`
 * Supabase project (upknvaoegkagbrktkufd), no client library needed.
 *
 * The publishable key is safe to ship in a public repo: it identifies the
 * project, and RLS only lets the anon role INSERT into `leads`. Reading,
 * updating and deleting need the dashboard or a service-role key.
 *
 * next.config.ts must keep the project URL in connect-src or the browser
 * will block the request.
 */

const SUPABASE_URL = "https://upknvaoegkagbrktkufd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_GIx724d3FXf3h7GqQccIGw_z9l9sEqA";

export type LeadInput = {
  email: string;
  name?: string;
  /** e.g. "work-with-me-form", "calculator-sip" */
  source: string;
  service?: string;
  message?: string;
  meta?: Record<string, unknown>;
};

export async function submitLead(lead: LeadInput): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) {
    throw new Error(`Lead submit failed: ${res.status}`);
  }
}
