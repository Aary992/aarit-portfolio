import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImagePlaceholder({
  label = "Your photo here",
  hint,
  className,
}: {
  label?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-edge bg-surface/40",
        className,
      )}
    >
      <div className="amber-glow pointer-events-none absolute inset-0 opacity-70" />

      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-edge-strong bg-night/60 text-amber transition-transform duration-300 group-hover:scale-110">
            <ImageIcon className="h-5 w-5" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            {label}
          </span>
          {hint && <span className="max-w-[14rem] text-xs text-faint/80">{hint}</span>}
        </div>
      </div>

      <span className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-edge-strong" />
      <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r border-t border-edge-strong" />
      <span className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-edge-strong" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-edge-strong" />
    </div>
  );
}
