import { ShieldAlert } from "lucide-react";

/**
 * Sits at the top of every Markets, Explained post, above the body, never in
 * the footer. These posts discuss real instruments, so the disclosure has to
 * be somewhere a reader cannot miss it on the way in.
 */
export function MarketDisclaimer() {
  return (
    <aside className="flex gap-3 rounded-2xl border border-amber/30 bg-amber/[0.05] p-4 sm:p-5">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
      <p className="text-sm leading-relaxed text-muted">
        <span className="font-medium text-ink">
          Not investment advice. I am not SEBI registered.
        </span>{" "}
        This explains why something already happened. It is not a buy call, a
        sell call, a tip or a signal, and nothing here is a recommendation to
        act. Any instrument mentioned is an example used to explain a
        mechanism. Do your own work, or speak to a registered adviser.
      </p>
    </aside>
  );
}
