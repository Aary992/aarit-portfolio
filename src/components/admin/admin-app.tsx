"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { cn } from "@/lib/utils";
import { PostsPanel } from "./posts-panel";
import { GuidesPanel } from "./guides-panel";
import { ResourcesPanel } from "./resources-panel";

const inputClass =
  "w-full rounded-xl border border-edge bg-surface/40 px-4 py-3 text-base text-ink placeholder:text-faint transition-colors focus:border-amber/60 focus:outline-none focus:ring-1 focus:ring-amber/40";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) setError(error.message);
    setBusy(false);
  }

  /**
   * Self-serve reset. Supabase mails a recovery link back to /admin, where
   * the PASSWORD_RECOVERY event swaps the UI for the new-password form.
   *
   * The response is deliberately identical whether or not the address has an
   * account: this page is public, so confirming which emails exist would turn
   * it into an account-enumeration oracle.
   */
  async function onReset() {
    const target = email.trim();
    if (!target) {
      setError("Enter your email address first, then tap reset.");
      return;
    }
    setBusy(true);
    setError(null);
    await supabase.auth.resetPasswordForEmail(target, {
      redirectTo: `${window.location.origin}/admin`,
    });
    setBusy(false);
    setNotice(
      "If that address has an account, a reset link is on its way. The link opens straight back here.",
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6">
      <h1 className="font-display text-3xl font-black tracking-[-0.03em]">
        Admin
      </h1>
      <p className="mt-3 leading-relaxed text-muted">
        Sign in to publish posts, guides and resources.
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

        {notice && (
          <p className="rounded-xl border border-edge bg-surface/40 px-4 py-3 text-sm text-muted">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="tappable mt-2 rounded-full bg-gradient-to-r from-ember to-amber px-6 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={busy}
          className="tappable self-center py-2 text-sm text-faint underline-offset-4 transition-colors hover:text-amber hover:underline disabled:opacity-60"
        >
          Forgot password
        </button>
      </form>
    </div>
  );
}

/**
 * Shown only while the session came from a recovery link. Supabase puts the
 * browser into a temporary authenticated state for exactly this, so the form
 * can set a new password without knowing the old one.
 */
function SetPasswordScreen({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // This account can publish to a live site, so the floor is higher than
    // Supabase's 6-character default.
    if (password.length < 12) {
      setError("Use at least 12 characters. This login can publish to the live site.");
      return;
    }
    if (password !== confirm) {
      setError("The two passwords do not match.");
      return;
    }

    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    onDone();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6">
      <h1 className="font-display text-3xl font-black tracking-[-0.03em]">
        Set a new password
      </h1>
      <p className="mt-3 leading-relaxed text-muted">
        You are signed in from the recovery link. Choose a new password and it
        takes effect immediately.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            New password
          </span>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
            Confirm
          </span>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
          {busy ? "Saving…" : "Save password"}
        </button>
      </form>
    </div>
  );
}

const TABS = [
  { id: "resources", label: "Resources", heading: "Free resources" },
  { id: "guides", label: "Guides", heading: "Guides" },
  { id: "posts", label: "Markets", heading: "Markets, Explained" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  // Resources first: it is the one used from a phone mid-shoot, where the
  // fewest taps matter most.
  const [tab, setTab] = useState<TabId>("resources");
  const [recovering, setRecovering] = useState(false);

  useEffect(() => {
    let alive = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setSession(data.session);
      setReady(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (!alive) return;
      setSession(s);
      // Arriving from a recovery link authenticates the browser for the sole
      // purpose of setting a new password, so show that form rather than
      // dropping straight into the editor.
      if (event === "PASSWORD_RECOVERY") setRecovering(true);
    });

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (!ready) {
    return (
      <div className="mx-auto max-w-md px-6 py-40 text-center text-muted">
        Loading…
      </div>
    );
  }

  if (!session) return <LoginScreen />;
  if (recovering) return <SetPasswordScreen onDone={() => setRecovering(false)} />;

  const current = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-28 sm:pt-40">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-black tracking-[-0.035em]">
            {current.heading}
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

      {/* Full-width tap targets, because this gets used one-handed on a phone. */}
      <div className="mt-8 flex gap-2 rounded-full border border-edge bg-surface/30 p-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "tappable flex-1 rounded-full px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors",
              tab === t.id
                ? "bg-gradient-to-r from-ember to-amber text-night"
                : "text-muted hover:text-ink",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === "resources" && <ResourcesPanel />}
        {tab === "guides" && <GuidesPanel />}
        {tab === "posts" && <PostsPanel />}
      </div>
    </div>
  );
}
