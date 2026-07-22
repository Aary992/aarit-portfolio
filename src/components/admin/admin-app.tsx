"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { LogOut, Plus, Eye, EyeOff, Trash2, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { PostEditor, type EditablePost } from "./post-editor";

const inputClass =
  "w-full rounded-xl border border-edge bg-surface/40 px-4 py-3 text-base text-ink placeholder:text-faint transition-colors focus:border-amber/60 focus:outline-none focus:ring-1 focus:ring-amber/40";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) setError(error.message);
    setBusy(false);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6">
      <h1 className="font-display text-3xl font-black tracking-[-0.03em]">
        Admin
      </h1>
      <p className="mt-3 leading-relaxed text-muted">
        Sign in to write and publish Markets, Explained posts.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            Email
          </span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            Password
          </span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </label>

        {error && (
          <p className="rounded-xl border border-amber/30 bg-amber/[0.05] px-4 py-3 text-sm text-muted">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="tappable mt-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
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

export function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState<EditablePost[]>([]);
  const [editing, setEditing] = useState<EditablePost | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("market_posts")
      .select("*")
      .order("day", { ascending: false });
    if (error) {
      setLoadError(error.message);
      return;
    }
    setLoadError(null);
    setPosts((data ?? []) as EditablePost[]);
  }, []);

  // Auth is the external system this component syncs with: the session
  // arrives from Supabase, and posts are fetched from whichever callback
  // delivered it, rather than by reacting to session state afterwards.
  useEffect(() => {
    let alive = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      setReady(true);
      if (data.session) load();
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!alive) return;
      setSession(s);
      if (s) load();
      else setPosts([]);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, [load]);

  if (!ready) {
    return (
      <div className="mx-auto max-w-md px-6 py-40 text-center text-muted">
        Loading…
      </div>
    );
  }

  if (!session) return <LoginScreen />;

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
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-28 sm:pt-40">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-black tracking-[-0.035em]">
            Markets, Explained
          </h1>
          <p className="mt-2 text-sm text-muted">
            Signed in as {session.user.email}
          </p>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="tappable inline-flex items-center gap-2 rounded-full border border-edge px-4 py-2 text-sm text-muted transition-colors hover:border-edge-strong hover:text-ink"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      <button
        onClick={() => setEditing(blankPost(nextDay))}
        className="tappable mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02]"
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
            <button
              onClick={() => setEditing(p)}
              className="flex-1 text-left"
            >
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
                      published_at: p.published
                        ? null
                        : new Date().toISOString(),
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
                  if (
                    !confirm(
                      `Delete "${p.title}"? This cannot be undone.`,
                    )
                  ) {
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
    </div>
  );
}
