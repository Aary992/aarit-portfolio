import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-6 pt-40 pb-10 sm:pt-48 sm:pb-14">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,9vw,7rem)] font-black leading-[0.9] tracking-[-0.03em]">
          {title}
        </h1>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
