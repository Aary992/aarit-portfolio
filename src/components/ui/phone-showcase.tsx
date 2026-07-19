import Image from "next/image";
import { cn } from "@/lib/utils";

export function PhoneShowcase({
  images,
  className,
}: {
  images: { src: string; alt: string }[];
  className?: string;
}) {
  return (
    <div className={cn("flex justify-center gap-3 sm:gap-4", className)}>
      {images.map((img, i) => (
        <div
          key={img.src}
          className={cn(
            "w-1/3 shrink-0 overflow-hidden rounded-2xl border border-edge-strong bg-night shadow-2xl shadow-black/40 transition-transform duration-500",
            i === 1 ? "translate-y-0" : "translate-y-4",
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={560}
            height={1218}
            sizes="(max-width: 768px) 33vw, 220px"
            priority={i === 1}
            className="block h-auto w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
