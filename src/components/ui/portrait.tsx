"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "./image-placeholder";

export function Portrait({
  src,
  alt,
  className,
  objectPosition,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  placeholderLabel,
  placeholderHint,
}: {
  src?: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  sizes?: string;
  priority?: boolean;
  placeholderLabel?: string;
  placeholderHint?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <ImagePlaceholder
        className={className}
        label={placeholderLabel}
        hint={placeholderHint}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-edge bg-surface",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setErrored(true)}
        className="object-cover"
        style={{ objectPosition }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/50 via-transparent to-transparent" />
    </div>
  );
}
