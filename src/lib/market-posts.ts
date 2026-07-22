/**
 * Markets, Explained. The archive now lives in Supabase and is written
 * through /admin, so publishing a post no longer means a code change and a
 * deploy. This module is the only read path.
 *
 * Two editorial rules still apply to anything published:
 * 1. Explain a mechanism that already happened. Never predict, never suggest
 *    an action, never name an entry price. The compliance disclaimer renders
 *    above the body of every post because these discuss real instruments.
 * 2. No age anywhere, matching the rest of the site. The LinkedIn originals
 *    carry it in the byline; the admin editor flags it before publishing.
 */

const SUPABASE_URL = "https://upknvaoegkagbrktkufd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_GIx724d3FXf3h7GqQccIGw_z9l9sEqA";

export type MarketPostRow = {
  id: string;
  day: number;
  slug: string;
  title: string;
  dek: string;
  body: string;
  read_time: string;
  published: boolean;
  published_at: string | null;
};

export type MarketPost = {
  id: string;
  day: number;
  slug: string;
  title: string;
  dek: string;
  /** Paragraphs, split from the stored blank-line-separated text. */
  body: string[];
  readTime: string;
  date: string;
};

/** Blank lines separate paragraphs, which is what pasting a post produces. */
export function toParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+\n/g, "\n").trim())
    .filter(Boolean);
}

function toPost(r: MarketPostRow): MarketPost {
  return {
    id: r.id,
    day: r.day,
    slug: r.slug,
    title: r.title,
    dek: r.dek,
    body: toParagraphs(r.body),
    readTime: r.read_time,
    date: (r.published_at ?? new Date().toISOString()).slice(0, 10),
  };
}

async function query(path: string): Promise<MarketPostRow[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/market_posts${path}`, {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
      // Revalidate rather than cache forever: a post published in /admin
      // should appear without a redeploy, but every visitor should not cost
      // a database round trip.
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return (await res.json()) as MarketPostRow[];
  } catch {
    // A database blip must not take the whole site down at build time.
    return [];
  }
}

export async function getPublishedPosts(): Promise<MarketPost[]> {
  const rows = await query("?published=eq.true&order=day.desc&select=*");
  return rows.map(toPost);
}

export async function getPostBySlug(slug: string): Promise<MarketPost | null> {
  const rows = await query(
    `?published=eq.true&slug=eq.${encodeURIComponent(slug)}&limit=1&select=*`,
  );
  return rows[0] ? toPost(rows[0]) : null;
}

/**
 * Neighbours in the series, used for the related links. Adjacent days are a
 * better default than a hand-maintained list: with 30-plus posts, curating
 * relations by hand is the thing that silently stops happening.
 */
export async function getRelatedPosts(
  post: MarketPost,
  all: MarketPost[],
): Promise<MarketPost[]> {
  return all
    .filter((p) => p.slug !== post.slug)
    .sort(
      (a, b) =>
        Math.abs(a.day - post.day) - Math.abs(b.day - post.day) || b.day - a.day,
    )
    .slice(0, 2);
}
