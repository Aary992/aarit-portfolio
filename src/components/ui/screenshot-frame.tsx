import Image from "next/image";
import { cn } from "@/lib/utils";

export function ScreenshotFrame({
  src,
  alt,
  host,
  logo,
  badge,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  host?: string;
  logo?: string;
  badge?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-edge-strong bg-night shadow-2xl shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-edge bg-surface/50 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-faint/40" />
        {(logo || host) && (
          <span className="ml-2 flex min-w-0 items-center gap-1.5">
            {logo && (
              <Image
                src={logo}
                alt=""
                width={16}
                height={16}
                className="h-3.5 w-3.5 shrink-0 rounded-sm object-contain"
              />
            )}
            {host && (
              <span className="truncate font-mono text-[10px] text-faint">{host}</span>
            )}
          </span>
        )}
        {badge && (
          <span className="ml-auto shrink-0 font-mono text-[10px] text-faint">{badge}</span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={750}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
        className="block h-auto w-full object-contain"
      />
    </div>
  );
}
