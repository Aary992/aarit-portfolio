"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { services, profile } from "@/lib/data";
import { submitLead } from "@/lib/leads";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-edge bg-surface/30 px-4 py-3 text-base text-ink placeholder:text-faint transition-colors focus:border-amber/60 focus:outline-none focus:ring-1 focus:ring-amber/40";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [service, setService] = useState(services[0].name);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: humans never see this field, bots fill it.
    if (data.get("company")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await submitLead({
        email: String(data.get("email") ?? "").trim(),
        name: String(data.get("name") ?? "").trim() || undefined,
        source: "work-with-me-form",
        service,
        message: String(data.get("message") ?? "").trim() || undefined,
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-start justify-center rounded-2xl border border-edge bg-surface/30 p-8">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-r from-ember to-amber text-night">
          <Check className="h-5 w-5" />
        </span>
        <p className="mt-4 text-xl font-semibold text-ink">Got it.</p>
        <p className="mt-2 leading-relaxed text-muted">
          I read everything and reply within 24 hours. If it&apos;s a fit, the
          next step is a free 30-minute call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            Name
          </span>
          <input name="name" autoComplete="name" className={inputClass} placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            Email *
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
          />
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          What do you need?
        </span>
        <div className="flex flex-wrap gap-2">
          {[...services.map((s) => s.name), "Something else"].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setService(name)}
              aria-pressed={service === name}
              className={cn(
                "tappable rounded-full border px-4 py-2 text-sm transition-colors",
                service === name
                  ? "border-amber/60 bg-amber/10 text-ink"
                  : "border-edge text-muted hover:border-edge-strong hover:text-ink",
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          The project *
        </span>
        <textarea
          name="message"
          required
          rows={4}
          className={inputClass}
          placeholder="What are you building, and what do you need from me?"
        />
      </label>

      {/* Honeypot, hidden from humans and screen readers. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="group tappable mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send the enquiry"}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      {status === "error" && (
        <p className="text-sm text-muted">
          That didn&apos;t go through. Email me directly instead:{" "}
          <a href={`mailto:${profile.email}`} className="text-amber underline-offset-4 hover:underline">
            {profile.email}
          </a>
        </p>
      )}
    </form>
  );
}
