import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";

// Direct iframe embed — react-calendly's InlineWidget renders blank under React 19,
// and the iframe approach needs no extra script.
const params = new URLSearchParams({
  embed_domain: "www.aaritshah.com",
  embed_type: "Inline",
  hide_gdpr_banner: "1",
  background_color: "0a0a0b",
  text_color: "fafaf9",
  primary_color: "f59e0b",
});

export default function CalendlyEmbed() {
  const src = `${profile.calendly}?${params.toString()}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-edge bg-surface/40">
      <iframe
        src={src}
        title="Book a call with Aarit Shah"
        loading="lazy"
        className="h-[680px] w-full"
        style={{ colorScheme: "dark" }}
      />
      <a
        href={profile.calendly}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 border-t border-edge px-4 py-3 text-sm text-muted transition-colors hover:text-ink"
      >
        Calendar not loading? Open it directly
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
