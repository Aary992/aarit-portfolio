"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, AlertTriangle, Wand2 } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

export type EditablePost = {
  id: string | null;
  day: number;
  slug: string;
  title: string;
  dek: string;
  body: string;
  read_time: string;
  published: boolean;
};

const inputClass =
  "w-full rounded-xl border border-edge bg-surface/40 px-4 py-3 text-base text-ink placeholder:text-faint transition-colors focus:border-amber/60 focus:outline-none focus:ring-1 focus:ring-amber/40";

const labelClass =
  "font-mono text-[11px] uppercase tracking-[0.2em] text-faint";

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
}

/** Roughly 200 words a minute, rounded up, floored at 1. */
function readTimeFor(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

/**
 * Pre-publish checks. These are warnings rather than blocks: the editor knows
 * things the regex does not, and a false positive that refuses to save is
 * worse than one that can be read and ignored.
 */
type Check = { level: "stop" | "warn"; message: string };

function runChecks(body: string, title: string): Check[] {
  const text = `${title}\n${body}`;
  const out: Check[] = [];

  // The site-wide rule is no age anywhere. The LinkedIn originals carry it in
  // the byline, so it arrives with almost every paste.
  if (/\b(?:at\s+)?1[0-9]\s*(?:years?\s*old|yo|y\/o)\b/i.test(text) ||
      /\bat\s+1[0-9]\b/i.test(text) ||
      /\b(?:aged|age)\s+1[0-9]\b/i.test(text)) {
    out.push({
      level: "stop",
      message:
        "Looks like an age is mentioned. The site rule is no age anywhere, so strip it before publishing.",
    });
  }

  // These posts name real instruments, so anything that reads as a call is
  // the thing that turns education into advice.
  if (/\b(buy|sell|short)\s+(?:at|above|below|near)\b/i.test(text) ||
      /\b(?:entry|target|stop\s*loss|sl)\s*(?:price)?\s*[:@]?\s*(?:₹|rs\.?|inr)?\s*\d/i.test(text)) {
    out.push({
      level: "stop",
      message:
        "Reads like an entry, target or stop price. Naming levels turns this into a call, which you are not registered to make.",
    });
  }

  if (/\b(will|going to)\s+(?:rally|crash|fall|rise|moon|double)\b/i.test(text) ||
      /\b(?:multibagger|sure\s*shot|guaranteed)\b/i.test(text)) {
    out.push({
      level: "warn",
      message:
        "Contains a prediction. The series explains what already happened; forecasts are the part that ages badly.",
    });
  }

  if (body.trim().split(/\n\s*\n/).filter(Boolean).length < 3) {
    out.push({
      level: "warn",
      message:
        "Fewer than three paragraphs. Expanded posts rank better than the LinkedIn original, so this is worth fleshing out.",
    });
  }

  return out;
}

export function PostEditor({
  post,
  existingSlugs,
  onClose,
  onSaved,
}: {
  post: EditablePost;
  existingSlugs: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState<EditablePost>(post);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checks = useMemo(
    () => runChecks(draft.body, draft.title),
    [draft.body, draft.title],
  );
  const paragraphs = useMemo(
    () => draft.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    [draft.body],
  );
  const slugClash = existingSlugs.includes(draft.slug);

  function set<K extends keyof EditablePost>(k: K, v: EditablePost[K]) {
    setDraft((d) => ({ ...d, [k]: v }));
  }

  /**
   * The paste-and-go path. A LinkedIn post arrives as a title-ish first line
   * followed by the body, so this fills in everything derivable and leaves
   * the editor to sharpen it.
   */
  function autoFill() {
    const lines = draft.body.split("\n").map((l) => l.trim()).filter(Boolean);
    const first = (lines[0] ?? "").replace(/^day\s*\d+\s*[:.-]\s*/i, "");
    const title = draft.title || first.slice(0, 80);
    setDraft((d) => ({
      ...d,
      title,
      slug: d.slug || slugify(title),
      dek: d.dek || (lines[1] ?? "").slice(0, 200),
      read_time: readTimeFor(d.body),
    }));
  }

  async function save(publish: boolean) {
    setBusy(true);
    setError(null);

    const row = {
      day: draft.day,
      slug: draft.slug || slugify(draft.title),
      title: draft.title,
      dek: draft.dek,
      body: draft.body,
      read_time: draft.read_time || readTimeFor(draft.body),
      published: publish,
      published_at: publish ? new Date().toISOString() : null,
    };

    const res = draft.id
      ? await supabase.from("market_posts").update(row).eq("id", draft.id)
      : await supabase.from("market_posts").insert(row);

    setBusy(false);
    if (res.error) {
      setError(res.error.message);
      return;
    }
    onSaved();
  }

  const blocking = checks.some((c) => c.level === "stop");

  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-28 sm:pt-40">
      <button
        onClick={onClose}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> All posts
      </button>

      <h1 className="mt-8 font-display text-3xl font-black tracking-[-0.03em]">
        {draft.id ? "Edit post" : "New post"}
      </h1>

      <div className="mt-10 flex flex-col gap-5">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Paste the LinkedIn post</span>
          <textarea
            rows={14}
            value={draft.body}
            onChange={(e) => set("body", e.target.value)}
            placeholder="Paste the whole post here. Leave a blank line between paragraphs."
            className={`${inputClass} font-sans leading-relaxed`}
          />
          <span className="text-xs text-faint">
            {paragraphs.length} paragraph{paragraphs.length === 1 ? "" : "s"} ·{" "}
            {draft.body.trim().split(/\s+/).filter(Boolean).length} words
          </span>
        </label>

        <button
          onClick={autoFill}
          type="button"
          className="tappable inline-flex items-center gap-2 self-start rounded-full border border-edge-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
        >
          <Wand2 className="h-4 w-4" />
          Fill in the rest from the paste
        </button>

        {checks.length > 0 && (
          <div className="flex flex-col gap-2">
            {checks.map((c) => (
              <p
                key={c.message}
                className={`flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${
                  c.level === "stop"
                    ? "border-amber/40 bg-amber/[0.07] text-ink"
                    : "border-edge bg-surface/30 text-muted"
                }`}
              >
                <AlertTriangle
                  className={`mt-0.5 h-4 w-4 shrink-0 ${
                    c.level === "stop" ? "text-amber" : "text-faint"
                  }`}
                />
                {c.message}
              </p>
            ))}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-[100px_1fr]">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Day</span>
            <input
              type="number"
              value={draft.day}
              onChange={(e) => set("day", e.target.valueAsNumber || 1)}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Title</span>
            <input
              value={draft.title}
              onChange={(e) => set("title", e.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Slug</span>
          <input
            value={draft.slug}
            onChange={(e) => set("slug", slugify(e.target.value))}
            placeholder="auto-generated-from-title"
            className={inputClass}
          />
          <span className="text-xs text-faint">
            /markets-explained/{draft.slug || slugify(draft.title) || "…"}
            {slugClash && (
              <span className="ml-2 text-amber">
                Another post already uses this slug.
              </span>
            )}
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Standfirst</span>
          <textarea
            rows={2}
            value={draft.dek}
            onChange={(e) => set("dek", e.target.value)}
            placeholder="One or two sentences. This is what shows in the archive list and in search results."
            className={inputClass}
          />
        </label>

        <label className="flex max-w-[160px] flex-col gap-1.5">
          <span className={labelClass}>Read time</span>
          <input
            value={draft.read_time}
            onChange={(e) => set("read_time", e.target.value)}
            className={inputClass}
          />
        </label>

        {error && (
          <p className="rounded-xl border border-amber/30 bg-amber/[0.05] px-4 py-3 text-sm text-muted">
            {error}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => save(false)}
            disabled={busy || !draft.title || slugClash}
            className="tappable rounded-full border border-edge-strong px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save as draft"}
          </button>
          <button
            onClick={() => save(true)}
            disabled={busy || !draft.title || slugClash || blocking}
            title={
              blocking
                ? "Resolve the flagged issues above before publishing"
                : undefined
            }
            className="tappable rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3 text-sm font-semibold text-night transition-transform duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            Publish
          </button>
          {blocking && (
            <span className="text-sm text-muted">
              Publishing is blocked until the flagged issues are resolved.
            </span>
          )}
        </div>

        {paragraphs.length > 0 && (
          <section className="mt-10 border-t border-edge pt-8">
            <h2 className={labelClass}>Preview</h2>
            <div className="mt-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mt-5 whitespace-pre-line text-lg leading-[1.75] text-muted first:mt-0"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
