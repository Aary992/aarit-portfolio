import { ventures } from "@/lib/data";
import { shareCard, shareCardSize } from "@/lib/share-card";

export const alt = "A venture by Aarit Shah";
export const size = shareCardSize;
export const contentType = "image/png";

/**
 * Per-venture share card. The page sets its own openGraph block, which
 * replaces the root's, so without this route a shared venture link had no
 * preview image.
 */
export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export default async function VentureOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = ventures.find((x) => x.slug === slug);
  return shareCard({
    eyebrow: v ? `${v.name} · ${v.role}` : "Building",
    title: v?.tagline ?? "The ventures I'm building",
  });
}
