/**
 * Guides: one page per question people actually type into Google.
 *
 * Deliberately a separate section from Markets, Explained. A market post is a
 * LinkedIn reprint keyed by its day number in a series; a guide is keyed by
 * the search query it answers, has no series position, and is written to be
 * found cold by a stranger rather than read by someone who already follows.
 *
 * The `question` field is stored apart from the title so the page can render
 * the literal query and feed it to FAQPage schema, which is what makes these
 * eligible for the question-shaped result in search.
 */

const SUPABASE_URL = "https://upknvaoegkagbrktkufd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_GIx724d3FXf3h7GqQccIGw_z9l9sEqA";

export type GuideRow = {
  id: string;
  slug: string;
  question: string;
  title: string;
  dek: string;
  body: string;
  category: string;
  read_time: string;
  published: boolean;
  published_at: string | null;
  updated_at: string;
};

export type Guide = {
  id: string;
  slug: string;
  question: string;
  title: string;
  dek: string;
  /** Paragraphs, split from the stored blank-line-separated text. */
  body: string[];
  category: string;
  readTime: string;
  date: string;
  updated: string;
};

/** Blank lines separate paragraphs, matching how the editor stores text. */
export function toParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+\n/g, "\n").trim())
    .filter(Boolean);
}

/**
 * The first paragraph doubles as the answer in FAQ schema, so a guide should
 * answer its own question immediately rather than warming up. Trimmed because
 * schema answers are truncated in search anyway.
 */
export function answerSnippet(body: string[]): string {
  const first = body[0] ?? "";
  return first.length > 300 ? `${first.slice(0, 297).trimEnd()}…` : first;
}

function toGuide(r: GuideRow): Guide {
  return {
    id: r.id,
    slug: r.slug,
    question: r.question,
    title: r.title,
    dek: r.dek,
    body: toParagraphs(r.body),
    category: r.category,
    readTime: r.read_time,
    date: (r.published_at ?? r.updated_at).slice(0, 10),
    updated: r.updated_at.slice(0, 10),
  };
}

async function query(path: string): Promise<GuideRow[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/guides${path}`, {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return (await res.json()) as GuideRow[];
  } catch {
    return [];
  }
}

export async function getPublishedGuides(): Promise<Guide[]> {
  const rows = await query(
    "?published=eq.true&order=published_at.desc&select=*",
  );
  return rows.map(toGuide);
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const rows = await query(
    `?published=eq.true&slug=eq.${encodeURIComponent(slug)}&limit=1&select=*`,
  );
  return rows[0] ? toGuide(rows[0]) : null;
}
