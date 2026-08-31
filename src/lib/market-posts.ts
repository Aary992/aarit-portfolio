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

// Published posts are managed in Supabase. Exact-match replacements keep the
// current archive plain-spoken without masking future edits made in /admin.
const TEXT_REVISIONS: Record<string, string> = {
  "Why Smart Money Sold Gold Right Before The War Started.":
    "Why institutional investors sold gold right before the war started.",
  "This can go on for months. Even years. While everyone is chasing trending stocks, smart money is quietly building positions where nobody is looking.":
    "This can go on for months or even years. While attention is elsewhere, large investors can build positions gradually.",
  "The lesson? Retail traders trade the news. Smart money trades the anticipation of the news.":
    "The lesson is that retail traders often react to published news, while larger investors may have positioned before it became public.",
  "Expansion: They build new stores without paying bank interest.\nInvesting: They can put that cash into short-term markets to earn their own interest.\nLiquidity: They have a constant, massive stream of cash that never leaves their ecosystem.":
    "Expansion: They can build new stores without paying bank interest.\nInvesting: They can put the cash into short-term markets and earn interest.\nLiquidity: They keep a steady pool of cash within the business.",
  "The Reality Check: That’s $196M of pure margin with zero labor, zero milk costs, and zero overhead. It’s the ultimate \"Smart Money\" play.":
    "That is $196M with no labour, milk or store overhead attached to those unused balances.",
  "For years, India was the \"TINA\" (There Is No Alternative) destination. But as we move through 2026, global fund managers are increasingly giving India the cold shoulder. Here’s a breakdown of why the tide is turning and what it means for the ecosystem.":
    "For years, India was the \"TINA\" (There Is No Alternative) destination. But as we move through 2026, global fund managers are increasingly looking elsewhere. Here is why that changed and what it means for the wider market.",
  "1. The Valuation Gap\nIndia has always commanded a \"premium valuation,\" and for a long time, investors were happy to pay it because our earnings growth justified the cost. However, that growth engine started to sputter in 2024. When growth slows but prices stay high, global capital starts looking for the exit.":
    "1. The valuation gap\nIndia has long traded at a premium, and investors were willing to pay it while earnings growth justified the price. Earnings growth slowed in 2024, but valuations stayed high, so global investors began looking elsewhere.",
  "2. The AI Migration\nCapital is currently flowing toward North Asian markets like South Korea and Taiwan. Why?":
    "2. Capital moved toward semiconductors\nMoney has been flowing toward North Asian markets such as South Korea and Taiwan. Why?",
  "The AI Factor: These markets are home to the semiconductor giants powering the global AI revolution.\nSpecialization vs. Diversification: While India’s economy is beautifully diversified across banks and consumption, global managers are currently chasing the high-momentum \"AI supply chain\" trade.":
    "South Korea and Taiwan are home to major semiconductor companies, and global managers have been concentrating money in that trade. India’s economy is spread more widely across banks and consumer businesses, so it attracted less of that capital.",
};

function reviseText(value: string): string {
  return TEXT_REVISIONS[value] ?? value;
}

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
    title: reviseText(r.title),
    dek: reviseText(r.dek),
    body: toParagraphs(r.body).map(reviseText),
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
