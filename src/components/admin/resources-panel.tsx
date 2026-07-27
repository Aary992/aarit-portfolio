"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Link2,
  Trash2,
  Upload,
} from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { slugify } from "./post-editor";

const inputClass =
  "w-full rounded-xl border border-edge bg-surface/40 px-4 py-3 text-base text-ink placeholder:text-faint transition-colors focus:border-amber/60 focus:outline-none focus:ring-1 focus:ring-amber/40";
const labelClass = "font-mono text-[11px] uppercase tracking-[0.2em] text-faint";

/** Mirrors the resources_slug_not_reserved constraint. Checked here too so the
 *  failure is a sentence rather than a Postgres error string. */
const RESERVED = new Set([
  "about", "admin", "building", "certifications", "faq", "investing", "journey",
  "lab", "press", "speaking", "writing", "resources", "guides", "work-with-me",
  "markets-explained", "sitemap", "robots", "api", "_next", "llms",
  "opengraph-image", "manifest", "favicon", "icon", "apple-icon", "not-found", "404",
]);

function fetchResources() {
  return supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });
}

type ResourceRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  file_path: string | null;
  file_name: string | null;
  file_size: number | null;
  external_url: string | null;
  category: string;
  published: boolean;
};

function CopyLink({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.aaritshah.com/${slug}`;
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          // Clipboard access can be refused (insecure context, permissions).
          // Selecting the text by hand still works, so fail quietly.
        }
      }}
      title="Copy link"
      aria-label={`Copy link for ${slug}`}
      className="tappable grid h-9 w-9 place-items-center rounded-full border border-edge text-muted transition-colors hover:border-edge-strong hover:text-ink"
    >
      {copied ? (
        <Check className="h-4 w-4 text-amber" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}

export function ResourcesPanel() {
  const [rows, setRows] = useState<ResourceRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [mode, setMode] = useState<"file" | "link">("file");
  const [externalUrl, setExternalUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justCreated, setJustCreated] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const apply = useCallback(
    (res: { data: unknown; error: { message: string } | null }) => {
      if (res.error) {
        setLoadError(res.error.message);
        return;
      }
      setLoadError(null);
      setRows((res.data ?? []) as ResourceRow[]);
    },
    [],
  );

  const load = useCallback(async () => {
    apply(await fetchResources());
  }, [apply]);

  // The database is the external system this syncs with, so the state update
  // happens in the response callback rather than in the effect body.
  useEffect(() => {
    let alive = true;
    fetchResources().then((res) => {
      if (alive) apply(res);
    });
    return () => {
      alive = false;
    };
  }, [apply]);

  const effectiveSlug = slugTouched ? slug : slugify(title);

  function reset() {
    setTitle("");
    setSlug("");
    setSlugTouched(false);
    setDescription("");
    setCategory("general");
    setExternalUrl("");
    setFile(null);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const s = effectiveSlug;
    if (!s) return setError("Give it a title so there is something to build a link from.");
    if (!/^[a-z0-9][a-z0-9-]{1,60}$/.test(s)) {
      return setError("Link can only use lowercase letters, numbers and hyphens.");
    }
    if (RESERVED.has(s)) {
      return setError(`"${s}" is already a page on the site. Pick a different link.`);
    }
    if (rows.some((r) => r.slug === s)) {
      return setError(`"${s}" is already used by another resource.`);
    }
    if (mode === "file" && !file) return setError("Choose a file to upload.");
    if (mode === "link" && !/^https?:\/\/.+/.test(externalUrl.trim())) {
      return setError("Enter a full link starting with https://");
    }

    setBusy(true);
    try {
      let filePath: string | null = null;
      let fileName: string | null = null;
      let fileSize: number | null = null;
      let mimeType: string | null = null;

      if (mode === "file" && file) {
        // Namespaced by slug so re-uploading for the same resource cannot
        // collide with another one's file.
        const path = `${s}/${file.name.replace(/[^\w.\-]+/g, "_")}`;
        const { error: upErr } = await supabase.storage
          .from("resources")
          .upload(path, file, { upsert: true, contentType: file.type || undefined });
        if (upErr) throw upErr;
        filePath = path;
        fileName = file.name;
        fileSize = file.size;
        mimeType = file.type || null;
      }

      const { error: insErr } = await supabase.from("resources").insert({
        slug: s,
        title: title.trim(),
        description: description.trim(),
        category: category.trim() || "general",
        file_path: filePath,
        file_name: fileName,
        file_size: fileSize,
        mime_type: mimeType,
        external_url: mode === "link" ? externalUrl.trim() : null,
        published: true,
      });
      if (insErr) throw insErr;

      setJustCreated(s);
      reset();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 rounded-3xl border border-edge bg-surface/30 p-5 sm:p-6"
      >
        <div className="flex gap-2">
          {(["file", "link"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                "tappable flex-1 rounded-full px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors",
                mode === m
                  ? "bg-amber/15 text-amber"
                  : "border border-edge text-muted hover:text-ink",
              )}
            >
              {m === "file" ? "Upload a file" : "Point at a link"}
            </button>
          ))}
        </div>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Title</span>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Quant starter pack"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Link</span>
          <div className="flex items-center gap-2 rounded-xl border border-edge bg-surface/40 px-4 focus-within:border-amber/60">
            <span className="shrink-0 font-mono text-sm text-faint">
              aaritshah.com/
            </span>
            <input
              value={effectiveSlug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              placeholder="quantresource"
              className="w-full bg-transparent py-3 text-base text-ink placeholder:text-faint focus:outline-none"
            />
          </div>
          <span className="text-xs text-faint">
            This is what you say out loud in the reel. Keep it short.
          </span>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Description</span>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What it is and who it is for."
            className={cn(inputClass, "resize-y")}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Category</span>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="general"
            className={inputClass}
          />
        </label>

        {mode === "file" ? (
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>File</span>
            <input
              ref={fileInput}
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full rounded-xl border border-edge bg-surface/40 px-4 py-3 text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-amber/15 file:px-4 file:py-2 file:font-mono file:text-[11px] file:uppercase file:tracking-[0.15em] file:text-amber"
            />
            <span className="text-xs text-faint">
              PDF, CSV, ZIP, images, Office docs. 25MB max.
            </span>
          </label>
        ) : (
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Destination</span>
            <input
              type="url"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="https://notion.so/..."
              className={inputClass}
            />
          </label>
        )}

        {error && (
          <p className="rounded-xl border border-amber/30 bg-amber/[0.05] px-4 py-3 text-sm text-muted">
            {error}
          </p>
        )}

        {justCreated && (
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-amber/30 bg-amber/[0.05] px-4 py-3">
            <p className="text-sm text-ink">
              Live at{" "}
              <span className="font-mono text-amber">
                aaritshah.com/{justCreated}
              </span>
            </p>
            <CopyLink slug={justCreated} />
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="tappable inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
        >
          {mode === "file" ? (
            <Upload className="h-4 w-4" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
          {busy ? "Publishing…" : "Publish resource"}
        </button>
      </form>

      {loadError && (
        <p className="mt-6 rounded-xl border border-amber/30 bg-amber/[0.05] px-4 py-3 text-sm text-muted">
          {loadError}
        </p>
      )}

      <div className="mt-10 flex flex-col">
        {rows.length === 0 && !loadError && (
          <p className="rounded-2xl border border-edge bg-surface/30 p-6 text-muted">
            Nothing uploaded yet.
          </p>
        )}

        {rows.map((r) => (
          <div
            key={r.id}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-edge py-5"
          >
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                {r.category}
              </span>
              <span className="mt-1 block font-display text-lg font-bold text-ink">
                {r.title}
              </span>
              <span className="mt-0.5 block truncate font-mono text-sm text-muted">
                aaritshah.com/{r.slug}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em]",
                  r.published ? "bg-amber/15 text-amber" : "bg-surface-2 text-faint",
                )}
              >
                {r.published ? "Live" : "Draft"}
              </span>

              <CopyLink slug={r.slug} />

              <button
                title={r.published ? "Unpublish" : "Publish"}
                aria-label={r.published ? "Unpublish" : "Publish"}
                onClick={async () => {
                  await supabase
                    .from("resources")
                    .update({ published: !r.published, updated_at: new Date().toISOString() })
                    .eq("id", r.id);
                  load();
                }}
                className="tappable grid h-9 w-9 place-items-center rounded-full border border-edge text-muted transition-colors hover:border-edge-strong hover:text-ink"
              >
                {r.published ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>

              {r.published && (
                <a
                  href={`/${r.slug}`}
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
                  if (!confirm(`Delete "${r.title}"? This cannot be undone.`)) return;
                  // Storage first: a deleted row with an orphaned file is
                  // harder to notice than a failed delete.
                  if (r.file_path) {
                    await supabase.storage.from("resources").remove([r.file_path]);
                  }
                  await supabase.from("resources").delete().eq("id", r.id);
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
