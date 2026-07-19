# aarit-portfolio — Progress

## Completed (2026-07-19)

**SEO: name-first titles**
- `src/app/layout.tsx`: title template flipped from `"%s · Aarit Shah"` to `"Aarit Shah · %s"`. Since every page just sets `title: "About"` / `"Building"` / etc. and lets the template compose it, this one change fixed every route (About, Journey, Building, Investing, Side projects, Certifications, each `/building/[slug]`) plus the tab title.
- `src/app/building/[slug]/page.tsx`: openGraph title flipped the same way (`Aarit Shah · ${v.name}`).
- Homepage JSON-LD (`Person` schema in `src/app/page.tsx`) already had the name as the primary entity — untouched.

**MarketPlay overhaul** (`src/lib/data.ts`)
- Rewrote `ventures[0]` (marketplay) description, highlights, metrics, and dropped the stale "launches in 3 weeks" status claim (now just "Pre-launch · waitlist open" — confirm real timeline before re-adding a countdown).
- Rewrote `ventureDetail.marketplay` with 6 feature tiles (was 3) covering the scenario engine, 21-module reel curriculum, 30+ interactive calculators, life simulator, paper trading, and the founder control room / agent control plane.
- Real product screenshots replace the old landing-page screenshot: copied `home.webp` / `learn.webp` / `scenario.webp` from `C:\Users\Admin\Projects\MarketPlay\marketplay\public\screenshots\` into this repo's `public/` as `marketplay-app-{home,learn,scenario}.webp`. Logo swapped from the old wordmark to the actual square mark (`brand/mark-gradient.png` from the same source repo → `public/marketplay-logo.png`).
- Deleted the now-unused `public/marketplay-ss.png`.
- New `Venture.gallery?: { src, alt }[]` field + new `src/components/ui/phone-showcase.tsx` component: when a venture has a `gallery`, `Work.tsx` and `building/[slug]/page.tsx` render the portrait app screenshots as a 3-phone row instead of forcing them into the landscape browser-chrome `ScreenshotFrame` (which only makes sense for GetAITrade/10x Founders, actual websites).

**Side projects overhaul** (`src/lib/data.ts`, `src/app/side-projects/page.tsx`)
- `sideProjects` now has an explicit `SideProject` type (`name, category, desc, href?`) so optional links type-check cleanly.
- 6 entries: **Self-improving second brain** (Obsidian OS — auto-scrape + nightly synthesis + active-recall quizzing), **AI Trade Journal** (new — Telegram screenshot → auto-logged trade, Tradezella-style dashboard, links out to `ai-trade-journal-delta.vercel.app`), Research-analyst bots (unchanged), **Financial models & research** (new), The content engine (unchanged), **Vibecoded, shipped, forgotten** (new, catch-all for one-off tools).
- Cards with an `href` now render as a real external link with a hover arrow icon; the rest stay plain divs.

**Verification**
- `npx tsc --noEmit` clean, `npm run build` green (19 routes, all static/SSG).
- Visually verified via Playwright screenshots (had to scroll through the page first — `Reveal` uses `whileInView`/`once: true`, so a screenshot taken immediately after `goto` shows lower sections still at their pre-animation opacity-0 state; not a bug).

## Open / for next session
- **MarketPlay launch timeline**: confirm the real status (still "waitlist, pre-launch"? actual date?) — the old "launches in 3 weeks" line was dropped rather than left stale.
- **Life simulator avatar/wardrobe feature**: user mentioned redoing this (avatar/clothing changes with net worth) — not shipped yet, currently phrased as "Next up" in the features copy. Revisit copy once it ships.
- **AI Trade Journal / Obsidian vault visuals**: no image assets exist for these yet (the side-project card design doesn't use images currently anyway). If the user wants a screenshot on the AI Trade Journal card, or wants either of these promoted to a full `/building/[slug]`-style case study, that's a follow-up.
- No git commit has been made for this session's changes — working tree has the edits above, uncommitted, pending user review.

## Session summary
See `docs/session_summary.md`.
