/**
 * Free resources. Each one is a file (or an outbound link) with its own
 * root-level short URL, so a reel can say "aaritshah.com/quantresource" out
 * loud instead of sending everyone to the homepage and hoping they browse.
 *
 * This module is the only public read path. Uploading happens in /admin.
 *
 * Root-level slugs share a namespace with the site's real routes, and Next
 * resolves static segments before the [slug] catch-all, so a resource named
 * "about" would never render. The database rejects reserved slugs outright
 * (see the resources_slug_not_reserved constraint) rather than leaving that
 * to be discovered as a dead link.
 */

const SUPABASE_URL = "https://upknvaoegkagbrktkufd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_GIx724d3FXf3h7GqQccIGw_z9l9sEqA";

const BUCKET = "resources";

export type ResourceRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  file_path: string | null;
  file_name: string | null;
  file_size: number | null;
  mime_type: string | null;
  external_url: string | null;
  category: string;
  published: boolean;
  created_at: string;
};

export type Resource = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Where the download button points: storage CDN URL or the outbound link. */
  url: string;
  fileName: string | null;
  /** Human-readable size, null for outbound links. */
  size: string | null;
  isExternal: boolean;
  date: string;
};

export function publicFileUrl(filePath: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}`;
}

export function formatBytes(bytes: number | null): string | null {
  if (!bytes || bytes <= 0) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function toResource(r: ResourceRow): Resource {
  const isExternal = !r.file_path && !!r.external_url;
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    category: r.category,
    url: r.file_path ? publicFileUrl(r.file_path) : (r.external_url ?? "#"),
    fileName: r.file_name,
    size: isExternal ? null : formatBytes(r.file_size),
    isExternal,
    date: r.created_at.slice(0, 10),
  };
}

async function query(path: string): Promise<ResourceRow[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/resources${path}`, {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
      // Short window: a resource uploaded mid-reel-launch should be live
      // almost immediately, without every visitor costing a round trip.
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return (await res.json()) as ResourceRow[];
  } catch {
    // A database blip must not fail the build or take the site down.
    return [];
  }
}

export async function getPublishedResources(): Promise<Resource[]> {
  const rows = await query("?published=eq.true&order=created_at.desc&select=*");
  return rows.map(toResource);
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const rows = await query(
    `?published=eq.true&slug=eq.${encodeURIComponent(slug)}&limit=1&select=*`,
  );
  return rows[0] ? toResource(rows[0]) : null;
}
