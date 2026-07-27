"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Wand2,
} from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { slugify } from "./post-editor";

const inputClass =
  "w-full rounded-xl border border-edge bg-surface/40 px-4 py-3 text-base text-ink placeholder:text-faint transition-colors focus:border-amber/60 focus:outline-none focus:ring-1 focus:ring-amber/40";
const labelClass = "font-mono text-[11px] uppercase tracking-[0.2em] text-faint";

function fetchGuides() {
  return supabase
    .from("guides")
    .select("*")
    .order("updated_at", { ascending: false });
}

type EditableGuide = {
  id: string | null;
  slug: string;
  question: string;
  title: string;
  dek: string;
  body: string;
  category: string;
  read_time: string;
  published: boolean;
};

const blank = (): EditableGuide => ({
  id: null,
  slug: "",
  question: "",
  title: "",
  dek: "",
  body: "",
  category: "investing",
  read_time: "6 min",
  published: false,
});

function readTimeFor(body: string) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
}

/**
 * Guide-specific checks. Different from the market-post checks: a guide is
 * written for a stranger arriving from a search result, so the failure modes
 * are about search intent rather than about compliance alone.
 */
function runChecks(g: EditableGuide): { level: "stop" | "warn"; message: string }[] {
  const out: { level: "stop" | "warn"; message: string }[] = [];
  const words = g.body.trim().split(/\s+/).filter(Boolean).length;

  if (!g.question.trim().includes(" ")) {
    out.push({
      level: "stop",
      message:
        "The question should be a real phrase someone types, not a keyword. Write it the way it gets searched.",
    });
  }

  if (/^(how|what|why|when|where|should|can|is|are|do|does)\b/i.test(g.question.trim()) === false) {
    out.push({
      level: "warn",
      message:
        "Most searched phrases start with how, what, why or should. This one does not, which usually means it is a title rather than a query.",
    });
  }

  if (words > 0 && words < 400) {
    out.push({
      level: "warn",
      message: `Around ${words} words. Query pages that rank are usually longer than a LinkedIn post, because they have to answer follow-up questions too.`,
    });
  }

  const first = g.body.split(/\n\s*\n/)[0] ?? "";
  if (first && first.trim().split(/\s+/).length > 90) {
    out.push({
      level: "warn",
      message:
        "The opening paragraph is long. It doubles as the FAQ answer in search results, so answer the question in the first two or three sentences.",
    });
  }

  // Same compliance line the rest of the site holds.
  if (/\b(?:entry|target|stop\s*loss|sl)\s*(?:price)?\s*[:@]?\s*(?:₹|rs\.?|inr)?\s*\d/i.test(g.body) ||
      /\b(buy|sell|short)\s+(?:at|above|below|near)\b/i.test(g.body)) {
    out.push({
      level: "stop",
      message:
        "Reads like an entry, target or stop price. That turns a guide into a call, which you are not registered to make.",
    });
  }

  if (/\b(?:at\s+)?1[0-9]\s*(?:years?\s*old|yo|y\/o)\b/i.test(g.body) ||
      /\b(?:aged|age)\s+1[0-9]\b/i.test(g.body)) {
    out.push({
      level: "stop",
      message: "Looks like an age is mentioned. The site rule is no age anywhere.",
    });
  }

  return out;
}

function GuideEditor({
  guide,
  existingSlugs,
  onClose,
  onSaved,
}: {
  guide: EditableGuide;
  existingSlugs: string[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [g, setG] = useState(guide);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checks = runChecks(g);
  const blocked = checks.some((c) => c.level === "stop");
  const set = <K extends keyof EditableGuide>(k: K, v: EditableGuide[K]) =>
    setG((prev) => ({ ...prev, [k]: v }));

  async function save(publish: boolean) {
    setError(null);
    const slug = g.slug || slugify(g.question);
    if (!slug) return setError("Needs a question so there is something to build a link from.");
    if (existingSlugs.includes(slug)) return setError(`"${slug}" is already used.`);
    if (publish && blocked) return setError("Fix the blocking checks before publishing.");

    setBusy(true);
    const payload = {
      slug,
      question: g.question.trim(),
      title: (g.title || g.question).trim(),
      dek: g.dek.trim(),
      body: g.body,
      category: g.category.trim() || "investing",
      read_time: readTimeFor(g.body),
      published: publish,
      published_at: publish ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    const { error } = g.id
      ? await supabase.from("guides").update(payload).eq("id", g.id)
      : await supabase.from("guides").insert(payload);

    setBusy(false);
    if (error) return setError(error.message);
    onSaved();
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={onClose}
        className="inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.2em] text-faint transition-colors hover:text-amber"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>The question people type</span>
        <input
          value={g.question}
          onChange={(e) => set("question", e.target.value)}
          placeholder="how to start investing in india at 18"
          className={inputClass}
        />
        <span className="text-xs text-faint">
          Verbatim, lowercase, the way it gets typed. This becomes the H1 and
          the title tag.
        </span>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Link</span>
        <div className="flex items-center gap-2 rounded-xl border border-edge bg-surface/40 px-4 focus-within:border-amber/60">
          <span className="shrink-0 font-mono text-sm text-faint">/guides/</span>
          <input
            value={g.slug || slugify(g.question)}
            onChange={(e) => set("slug", slugify(e.target.value))}
            className="w-full bg-transparent py-3 text-base text-ink focus:outline-none"
          />
        </div>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Short summary</span>
        <input
          value={g.dek}
          onChange={(e) => set("dek", e.target.value)}
          placeholder="One line shown in search results and on the index."
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>Category</span>
        <input
          value={g.category}
          onChange={(e) => set("category", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelClass}>
          Body · {g.body.trim().split(/\s+/).filter(Boolean).length} words ·{" "}
          {readTimeFor(g.body)}
        </span>
        <textarea
          rows={18}
          value={g.body}
          onChange={(e) => set("body", e.target.value)}
          placeholder={
            "Answer the question in the first two sentences.\n\nThen everything they will ask next."
          }
          className={cn(inputClass, "resize-y font-sans leading-relaxed")}
        />
      </label>

      {checks.length > 0 && (
        <div className="flex flex-col gap-2">
          {checks.map((c, i) => (
            <p
              key={i}
              className={cn(
                "flex gap-2 rounded-xl border px-4 py-3 text-sm",
                c.level === "stop"
                  ? "border-amber/40 bg-amber/[0.07] text-ink"
                  : "border-edge bg-surface/30 text-muted",
              )}
            >
              <Wand2 className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              {c.message}
            </p>
          ))}
        </div>
      )}

      {error && (
        <p className="rounded-xl border border-amber/30 bg-amber/[0.05] px-4 py-3 text-sm text-muted">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => save(false)}
          disabled={busy}
          className="tappable rounded-full border border-edge px-6 py-3.5 text-base text-muted transition-colors hover:border-edge-strong hover:text-ink disabled:opacity-60"
        >
          Save draft
        </button>
        <button
          onClick={() => save(true)}
          disabled={busy || blocked}
          className="tappable rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02] disabled:opacity-50"
        >
          {busy ? "Saving…" : "Publish"}
        </button>
      </div>
    </div>
  );
}

export function GuidesPanel() {
  const [guides, setGuides] = useState<EditableGuide[]>([]);
  const [editing, setEditing] = useState<EditableGuide | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const apply = useCallback(
    (res: { data: unknown; error: { message: string } | null }) => {
      if (res.error) {
        setLoadError(res.error.message);
        return;
      }
      setLoadError(null);
      setGuides((res.data ?? []) as EditableGuide[]);
    },
    [],
  );

  const load = useCallback(async () => {
    apply(await fetchGuides());
  }, [apply]);

  // The database is the external system this syncs with, so the state update
  // happens in the response callback rather than in the effect body.
  useEffect(() => {
    let alive = true;
    fetchGuides().then((res) => {
      if (alive) apply(res);
    });
    return () => {
      alive = false;
    };
  }, [apply]);

  if (editing) {
    return (
      <GuideEditor
        guide={editing}
        existingSlugs={guides
          .filter((x) => x.id !== editing.id)
          .map((x) => x.slug)}
        onClose={() => setEditing(null)}
        onSaved={async () => {
          await load();
          setEditing(null);
        }}
      />
    );
  }

  return (
    <>
      <button
        onClick={() => setEditing(blank())}
        className="tappable inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02]"
      >
        <Plus className="h-4 w-4" />
        New guide
      </button>

      {loadError && (
        <p className="mt-6 rounded-xl border border-amber/30 bg-amber/[0.05] px-4 py-3 text-sm text-muted">
          {loadError}
        </p>
      )}

      <div className="mt-10 flex flex-col">
        {guides.length === 0 && !loadError && (
          <p className="rounded-2xl border border-edge bg-surface/30 p-6 text-muted">
            No guides yet. Start with a question you get asked in DMs every week.
          </p>
        )}

        {guides.map((g) => (
          <div
            key={g.id ?? g.slug}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-edge py-5"
          >
            <button onClick={() => setEditing(g)} className="min-w-0 flex-1 text-left">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                {g.category}
              </span>
              <span className="mt-1 block font-display text-lg font-bold text-ink">
                {g.question || "Untitled"}
              </span>
              <span className="mt-0.5 block truncate text-sm text-muted">
                /guides/{g.slug}
              </span>
            </button>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em]",
                  g.published ? "bg-amber/15 text-amber" : "bg-surface-2 text-faint",
                )}
              >
                {g.published ? "Live" : "Draft"}
              </span>

              <button
                title={g.published ? "Unpublish" : "Publish"}
                aria-label={g.published ? "Unpublish" : "Publish"}
                onClick={async () => {
                  await supabase
                    .from("guides")
                    .update({
                      published: !g.published,
                      published_at: g.published ? null : new Date().toISOString(),
                      updated_at: new Date().toISOString(),
                    })
                    .eq("id", g.id);
                  load();
                }}
                className="tappable grid h-9 w-9 place-items-center rounded-full border border-edge text-muted transition-colors hover:border-edge-strong hover:text-ink"
              >
                {g.published ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>

              {g.published && (
                <a
                  href={`/guides/${g.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  title="View live"
                  aria-label="View live"
                  className="tappable grid h-9 w-9 place-items-center rounded-full border border-edge text-muted transition-colors hover:border-edge-strong hover:text-ink"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}

              <button
                title="Delete"
                aria-label="Delete"
                onClick={async () => {
                  if (!confirm(`Delete "${g.question}"? This cannot be undone.`)) return;
                  await supabase.from("guides").delete().eq("id", g.id);
                  load();
                }}
                className="tappable grid h-9 w-9 place-items-center rounded-full border border-edge text-muted transition-colors hover:border-amber/40 hover:text-amber"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
