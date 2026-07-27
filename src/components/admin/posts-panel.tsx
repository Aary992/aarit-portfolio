"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Eye, EyeOff, Trash2, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { PostEditor, type EditablePost } from "./post-editor";

function fetchPosts() {
  return supabase
    .from("market_posts")
    .select("*")
    .order("day", { ascending: false });
}

const blankPost = (nextDay: number): EditablePost => ({
  id: null,
  day: nextDay,
  slug: "",
  title: "",
  dek: "",
  body: "",
  read_time: "5 min",
  published: false,
});

/** Markets, Explained. Unchanged behaviour, lifted out of AdminApp so the
 *  shell can host three sections instead of one. */
export function PostsPanel() {
  const [posts, setPosts] = useState<EditablePost[]>([]);
  const [editing, setEditing] = useState<EditablePost | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const apply = useCallback(
    (res: { data: unknown; error: { message: string } | null }) => {
      if (res.error) {
        setLoadError(res.error.message);
        return;
      }
      setLoadError(null);
      setPosts((res.data ?? []) as EditablePost[]);
    },
    [],
  );

  const load = useCallback(async () => {
    apply(await fetchPosts());
  }, [apply]);

  // The database is the external system this syncs with, so the state update
  // happens in the response callback rather than in the effect body.
  useEffect(() => {
    let alive = true;
    fetchPosts().then((res) => {
      if (alive) apply(res);
    });
    return () => {
      alive = false;
    };
  }, [apply]);

  const nextDay = posts.length ? Math.max(...posts.map((p) => p.day)) + 1 : 1;

  if (editing) {
    return (
      <PostEditor
        post={editing}
        existingSlugs={posts
          .filter((p) => p.id !== editing.id)
          .map((p) => p.slug)}
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
        onClick={() => setEditing(blankPost(nextDay))}
        className="tappable inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02]"
      >
        <Plus className="h-4 w-4" />
        New post
      </button>

      {loadError && (
        <p className="mt-6 rounded-xl border border-amber/30 bg-amber/[0.05] px-4 py-3 text-sm text-muted">
          {loadError}
        </p>
      )}

      <div className="mt-10 flex flex-col">
        {posts.length === 0 && !loadError && (
          <p className="rounded-2xl border border-edge bg-surface/30 p-6 text-muted">
            Nothing written yet. Paste your first LinkedIn post above.
          </p>
        )}

        {posts.map((p) => (
          <div
            key={p.id ?? p.slug}
            className="flex flex-wrap items-center justify-between gap-4 border-t border-edge py-5"
          >
            <button onClick={() => setEditing(p)} className="flex-1 text-left">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                Day {p.day}
              </span>
              <span className="mt-1 block font-display text-lg font-bold text-ink">
                {p.title || "Untitled"}
              </span>
              <span className="mt-0.5 block text-sm text-muted">/{p.slug}</span>
            </button>

            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em]",
                  p.published
                    ? "bg-amber/15 text-amber"
                    : "bg-surface-2 text-faint",
                )}
              >
                {p.published ? "Live" : "Draft"}
              </span>

              <button
                title={p.published ? "Unpublish" : "Publish"}
                aria-label={p.published ? "Unpublish" : "Publish"}
                onClick={async () => {
                  await supabase
                    .from("market_posts")
                    .update({
                      published: !p.published,
                      published_at: p.published ? null : new Date().toISOString(),
                    })
                    .eq("id", p.id);
                  load();
                }}
                className="tappable grid h-9 w-9 place-items-center rounded-full border border-edge text-muted transition-colors hover:border-edge-strong hover:text-ink"
              >
                {p.published ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>

              {p.published && (
                <a
                  href={`/markets-explained/${p.slug}`}
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
                  if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) {
                    return;
                  }
                  await supabase.from("market_posts").delete().eq("id", p.id);
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
