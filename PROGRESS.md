# aarit-portfolio — Progress

## SHIPPED 2026-07-23 — everything below is live

Commit `c02c5fd` on `main`, pushed to GitHub, deployed to production via `vercel deploy --prod` (`dpl_BaBG2rctSFfzYsTvNfhbcZYxJEJK`), aliased to https://www.aaritshah.com.

**Verified against the live site**, not just locally: every route returns 200; `/calculators`, `/lab/name` and unknown routes return 404; CSP is present and allows both Supabase and Vercel Analytics; HSTS set; RSS emits 3 items; sitemap has 22 URLs with no calculator or admin entries; robots disallows `/lab/` and `/admin`; the hero shows 4M and 22K with no trace of the old 2.7M figure or the placeholder testimonials.

**Deploy notes.** The Vercel project (`aarit-portfolio`, Node 24.x) is **not connected to GitHub**, so `git push` does not deploy; production ships only via `vercel deploy --prod`. `vercel link` writes `.vercel/repo.json` rather than `project.json` because the directory is a git repo, which is normal and works.

### Follow-up deploy, same day (`31d9141`)

- **Per-post OG share cards** for Markets, Explained. They had **no `og:image` at all**, so sharing a post on LinkedIn rendered a bare link with no card, on the one channel the series exists to feed. Each post now generates a 1200x630 card with the day stamp, headline and the not-SEBI line, pre-generated for published posts and on demand for anything published later from `/admin`.
- **Search Console and Bing verification** read from `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION`, so tokens go in the Vercel dashboard with no code change. Absent vars render no tag rather than an empty one.

### Outstanding, needs Aarit

1. **Create the admin user**: Supabase dashboard → Authentication → Users → Add user. `/admin` is publicly reachable, so this password is the only thing between a stranger and publishing under his name. Use a generated password from a manager, not one typed into a chat window.
2. **Search Console**: add `https://www.aaritshah.com` as a URL-prefix property, pick the HTML tag method, put the token in Vercel as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, then verify and submit `/sitemap.xml`.
3. **Bing**: easiest path is Import from Google Search Console once step 2 is done; otherwise the `msvalidate.01` token goes in `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
4. **The ~30 LinkedIn posts** for the archive, via `/admin`.
5. Vercel Analytics declined; the packages remain installed but inert.

### Known gaps, deliberately not closed

- **No testimonials anywhere.** Still the biggest credibility gap for a page selling services. Real ones only: screenshots of community or LinkedIn praise with names, or quotes from webinar attendees.
- **10x Founders has no breakdown**; only MarketPlay and GetAITrade do.
- **Nothing drives traffic yet.** The site is built and indexable, but the Instagram bio, LinkedIn Featured section and community links still have to point at `/work-with-me` for any of the SEO work to convert.

## Session 5 detail (2026-07-22) — admin CMS, full nav, hero colour, calculators removed

**Uncommitted.** 35 routes. Build green, `tsc` clean, `eslint src` clean.

### Admin CMS at `/admin` (the big one)

Markets, Explained is no longer hardcoded. Posts live in Supabase and are written through a logged-in editor, so publishing a post is no longer a code change and a deploy.

- **New `market_posts` table** in the `aarit-portfolio` project (`upknvaoegkagbrktkufd`), RLS on: anon may read **published rows only**, `authenticated` has full access including drafts. `updated_at` trigger. The three existing posts were migrated in, then the static array was deleted from `data.ts`.
- **`src/lib/market-posts.ts`** is the only public read path, with `revalidate: 60` so a newly published post appears within a minute without a redeploy, and a try/catch so a database blip cannot fail the build.
- **`/admin`**: Supabase email+password login, post list with live/draft badges, one-click publish and unpublish, delete with confirm, and an editor built around **pasting a LinkedIn post**. "Fill in the rest from the paste" derives title, slug, standfirst and read time. Live paragraph preview.
- **Pre-publish checks, which is the part that matters for compliance.** The editor scans for and *blocks publishing* on: a mentioned age (the site-wide no-age rule, and the LinkedIn originals carry it in the byline), and anything that reads as an entry, target or stop price. It warns on predictions and on posts under three paragraphs. Warnings are readable and ignorable; the two blockers are not, because those are the ones that turn education into advice.
- `/admin` is `noindex, nofollow, nocache`, disallowed in robots.txt and absent from the sitemap.
- **Security verified against a live draft row, not assumed**: with a draft present, the public key returned only the three published posts, the draft did not leak, and an anonymous insert was rejected **401**. Probe rows deleted.
- **You need to create your own admin user.** Supabase dashboard → Authentication → Users → Add user, with your email and a password you choose. I did not create an account or set a password.

### Requested changes

- **Hero name is coloured**: new `.name-molten` utility, a warm-white-to-amber-to-ember gradient clipped to the letterforms with a highlight that sweeps across every 9 seconds. Both layers are one background so it stays a single paint. Includes an `@supports` fallback, because without `background-clip: text` the rule would render the name *invisible* rather than merely unstyled.
- **Role band rotates every 2.4s** and no longer pauses on hover; a cursor resting over the hero used to freeze the one element proving the page is alive.
- **Every section is back in the top nav**: nine links (About, Journey, Building, Investing, Side projects, Writing, Markets, Certifications, Work with me). Compact 13px type at `px-2.5`, and the desktop row moved to `xl` since nine links need the width. Measured at 1280: ends at 1254 of 1280.
- **Calculators removed entirely**: routes, components, `lib/calculators.ts`, nav and footer entries, the FAQ question, sitemap, llms.txt, the 404 links and the cross-link on market posts. `/calculators` now 404s. The `.calc-range` styles remain unused in `globals.css` and can go if the tools are not coming back.

### Bug found and fixed during verification

Nine links at display size **collided with the CTA on a 360x600 phone**. The mobile menu now scrolls internally with the CTA pinned below it, and the link type is fluid rather than fixed. Re-measured: no overlap at 360x600, and 375x812 still fits without scrolling.

Verified: every route 200s, `/calculators` 404s, the archive renders all three posts from the database, RSS still emits three items, the admin login gate shows no data when signed out.

**Still needs a real browser**: the role swap and the hero sweep. The preview pane's dead rAF means framer never completes an exit, so all four role words stay mounted at once. I confirmed the timer and state are advancing (all four mount in sequence), but the visual swap itself is unverifiable here.

## Previous session (2026-07-22, session 4) — Phases 2b to 3: calculators, FAQ, speaking, archive, full SEO pass

**Uncommitted.** 38 routes, all static. `npm run build` green, `tsc --noEmit` clean, **`eslint src` clean for the first time** (the pre-existing `hero-shader.tsx` error is fixed, see below).

### Free calculators (`/calculators`)

- `src/lib/calculators.ts`: pure maths, no React, so it is testable and reusable. **Verified against hand calculation in the browser**: ₹10,000/month at 12% for 15 years returns ₹50,45,760 with ₹18,00,000 invested; position sizer on a ₹5L account at 1% risk with a 1000/950 entry-stop returns exactly 100 units; allocation rebalancing amounts net to zero.
- Three tools, each its own route with `WebApplication` + `BreadcrumbList` JSON-LD: **SIP** (with annual step-up and a pure-CSS contributions-vs-value bar chart), **position sizer** (with a leverage warning when the position exceeds the account, and a losing-streak panel), **allocation checker**.
- The allocation tool asks the user for their own targets rather than suggesting a split. That is deliberate: recommending an allocation is the one thing on this site that would read as advice.
- **Lead magnet**: the result is always free and on screen. "Save this as a PDF" reveals an optional email field with a **skip link right underneath**, and the PDF is the browser's own print-to-PDF via new `@media print` styles rather than a ~250KB PDF library. A failed lead capture never costs the user their PDF.
- New `.calc-range` slider styling (both WebKit and Firefox pseudo-elements, 24px thumb for touch).

### Markets, Explained (`/markets-explained`)

- Full section: index, per-post routes, `BlogPosting` + `Blog` + `BreadcrumbList` JSON-LD, **a working RSS feed** (validated as XML in the browser), related-post cross-links, and the "Day N" stamp format.
- `MarketDisclaimer` component renders **above the post body**, never in the footer, verified positionally in the browser.
- **Only three posts are seeded, and they are mechanism explainers**: news as exit liquidity, why gold falls during a war, the float business in a coffee chain. **The owner's ~30 source posts have not been provided**, and I did not invent the Kalyan Jewellers swing trade, the FII outflow figures or any entry prices, because fabricating a trade record is not something that can be walked back. Send the LinkedIn posts and the archive fills out.
- Age is stripped by the data-model rule documented in `data.ts`. The source posts reportedly carry "at 17" in bylines; that gets removed on the way in, consistent with the no-age rule for the whole site.

### FAQ, speaking, project breakdowns

- `/faq`: nine questions with `FAQPage` JSON-LD, every answer drawn from something already stated elsewhere so there is one version of each fact. Doubles as the entity page AI answer engines quote.
- `/speaking`: lightweight, four standing topics, seven webinars, no fabricated recordings or decks.
- **Project breakdowns instead of case studies**: new `breakdown` field on `ventureDetail` (problem, approach, architecture, decisions), rendered on `/building/[slug]`. MarketPlay and GetAITrade are written up. No invented client numbers, no fake `Review` schema, no testimonials.

### Navigation restructure

The nav would have hit 12 items. It is now **six**: About, Building, Markets, Calculators, Writing, Work with me. Everything else moved to a new four-column footer nav, which also gives the deeper pages the internal links they were missing. Measured at 768px the full bar needs 707px of 720px available, which is too tight, so the desktop bar stays at `lg` and tablets get the full-screen menu.

### SEO, performance, accessibility

- **Vercel Analytics + Speed Insights** installed and wired, CSP updated for `va.vercel-scripts.com` and `vitals.vercel-insights.com`. This was the measurement gap: there was no analytics of any kind before.
- **`/llms.txt`** generated from the same data as the site, so it cannot go stale. States the entity, the services, the ventures, the tools and the FAQ, and explicitly asks not to be described as an adviser.
- **Real 404 page** routing to the four pages people actually want.
- `Organization` + `WebSite` schema alongside the existing `Person`. `BreadcrumbList` on every nested route. **Verified in the browser: every JSON-LD block on ten routes parses, every canonical points at www, exactly one `h1` per page.**
- Skip-to-content link, global `:focus-visible` ring, `robots.ts` disallowing `/lab/`, priority-weighted sitemap covering all new routes.
- **Fixed the pre-existing `hero-shader.tsx` lint error deliberately**: rewritten with `useSyncExternalStore` instead of setState-in-effect. The gate is also now live, so rotating a tablet or plugging in a mouse re-evaluates rather than being stuck on the first-paint answer.
- Fixed a `setState`-in-effect I had introduced in the navbar: the mobile menu now stores *where* it was opened rather than a boolean, so any navigation closes it for free with no effect.
- Fixed a JSX whitespace bug found in the browser: the leverage warning rendered "₹5,00,000in the account".

### Verified

Build green (38 routes), tsc clean, eslint clean, no console or server errors. Every route returns 200 and an unknown route returns 404. No horizontal overflow at 375px on any new page; the allocation table scrolls inside its own container. Mobile menu fits all six links plus the CTA. **Motion still needs a real-browser look** (the preview pane's frozen rAF pins framer at initial values), and the print-to-PDF output should be eyeballed once via a real Save-as-PDF.

## Previous session (2026-07-22, session 3) — Phase 2a: Work with me + navbar animation v2

**Uncommitted**, same as everything below. Nothing pushed, nothing deployed.

### `/work-with-me` (the conversion gap, now filled)

- New `services` array in `data.ts` (typed `Service`): AI consultation, AI tools & websites, paid promotions, content work. Each has a pitch, a 3-step "what the engagement looks like", and an explicit "you walk away with" outcome. No ranking between them, no pricing anywhere, enquiry-only, per the owner's answers.
- `src/app/work-with-me/page.tsx`: service cards, a 4-step how-it-works strip (Enquire → Call → Scope → Ship), a prominent **"The line I don't cross"** compliance panel (not SEBI registered, no tips/calls/signals, education-software-media only) and the enquiry section. Paid promotions carries its own inline note refusing anything that needs SEBI registration to sell. `ProfessionalService` + `OfferCatalog` JSON-LD and a `BreadcrumbList`. Added to `nav` and `sitemap.ts`.
- `src/components/site/enquiry-form.tsx`: name/email/service-chips/message, honeypot field, sending + success + error states, and a mailto fallback shown if the insert fails. `src/lib/leads.ts` does a plain PostgREST insert (no supabase-js dependency added).
- **Verified end to end**: submitted a real row from the browser, confirmed it landed in Supabase, deleted it. Then inserted a row server-side and confirmed the anon key reads back `[]` — RLS genuinely blocks reads, the insert-only policy works. Table is empty again. CSP `connect-src` now allows the project origin, otherwise the browser blocks the insert.

### Navbar animation v2

The owner said the previous version "doesn't look cool enough". Rebuilt around three ideas:

- **Entrance cascade**: the header drops in as a unit, then wordmark → each nav link → CTA resolve in sequence via `staggerChildren` on the header variants, instead of everything appearing at once.
- **Spotlight hover**: one shared `layoutId="nav-spotlight"` pill springs between whichever link the cursor is on. Kept the roll-up labels and the amber active band on top of it (band needs `z-10` now so the spotlight doesn't cover it).
- **Smart hide**: scrolling down past 160px tucks the header away (`y: -72`, fade), any upward scroll brings it back. 8px deadband so touchpad momentum doesn't make it flicker.
- **Breakpoint moved `md` → `lg`**: "Work with me" is an 8th link and the row needed the room. Measured at 1024px: wordmark + nav + CTA end at 990px of 1024, no overflow. Below `lg` it's the full-screen menu, which fits all 8 links plus the CTA even on a 375x667 screen (first link at y=76, CTA ends at 647).
- **Reduced motion** opts out of the entire choreography, including the hide-on-scroll: a nav that moves on its own is what that preference is asking us not to do. `onFocusCapture` pulls a hidden header back so keyboard users never tab into something invisible.

Verified: `npm run build` green (26 routes), `tsc --noEmit` clean, no console or server errors, one `h1` on the new page, no horizontal overflow at 375px, both JSON-LD blocks present. Motion itself still needs your eyes in a real browser (the preview pane's frozen rAF pins framer at initial values).

## Previous session (2026-07-22, session 2) — Phase 1 fixes: perf, navbar, CTA, trust cleanup

**Uncommitted.** Working tree only, nothing pushed, nothing deployed.

- **Font loading rebuilt.** next/font/local preloaded all 13 files (~223KB blocking) and its `preload` flag is per-call, not per-file. Switzer is now plain `@font-face` in `globals.css` served from `public/fonts/` (weights 200/400/500/600/700/800/900 — 100 and 300 deleted, nothing rendered them), with exactly two `<link rel="preload">` hints in the root layout (400 body, 900 display, ~31KB). Zodiak stays in next/font with `preload: false`; Geist Mono `preload: false`. `/fonts/*` gets an immutable cache header in `next.config.ts`.
- **Lenis removed entirely** (component deleted, package uninstalled). `lerp: 0.1` read as wheel lag on desktop. `html { scroll-behavior: smooth }` covers anchor jumps; reduced-motion override forces it back to auto.
- **Molten panel repaints fixed**: the gradient now paints once on a 220% oversized layer that drifts under `translate3d` (`@keyframes molten` rewritten), instead of animating `background-position` across a 220% background.
- **Role band is a chip**: Switzer Medium uppercase 16px/18px, 0.32em tracking, `w-fit` at every breakpoint (was 32px Geist Mono in a full-width amber slab on desktop).
- **Name tightened**: tracking -0.055em, leading 0.78, `clamp(5.5rem, 20vw, 13rem)` (208px desktop cap, 88px at 375px).
- **Navbar rebuilt**: "A" circle icon gone, wordmark "Aarit Shah" in Switzer 700 with `.band-link` hover underline; new `.nav-surface` utility (88% night + 12px blur, solid-night `@supports` fallback) fixes body text reading through the pill; header condenses on scroll (>24px); desktop labels roll up on hover with a duplicate rising in; mobile menu is now a full-screen overlay with numbered staggered links + gradient CTA, body scroll locked while open. Menu markup lives outside the `motion.header` because a transformed ancestor becomes the containing block for fixed descendants.
- **Molten CTA is two columns** from `lg` up: headline + button left, three proof lines right (response time / what the 30 minutes covers / who it's for) separated by `divide-night/15`.
- **Canonical domain corrected to `https://www.aaritshah.com`** everywhere (layout, data.ts, robots, sitemap, page.tsx JSON-LD, press boilerplate, writing JSON-LD, Calendly embed_domain). Evidence: apex `aaritshah.com` 308s to www on Vercel and www serves the live site; `aaritshahportfolio.online` has a broken cert and is dead.
- **Placeholder testimonials removed** (data block, both components, home-page section). They were "Community member" quotes marked EDIT ME, presented as genuine. Section returns only with real, attributable quotes.
- **`/lab` can no longer ship**: new `src/app/lab/layout.tsx` throws `notFound()` in production (verified: `.next/server/app/lab/name.html` prerenders as the 404 page) and carries noindex robots metadata for dev tunnels.
- **Stats reconciled with the owner** (his call, 2026-07-22): "4M views / last 90 days" + "22K followers" replaced "2.7M monthly views" + "23K followers / 30 days" in the hero, `data.ts` stats + marquee, both writing-post mentions, and the press short bio. 52% CAGR confirmed current and defensible, stays.
- **Leads infrastructure ready**: new dedicated Supabase project `aarit-portfolio` (id `upknvaoegkagbrktkufd`, ap-south-1, $0/month — owner chose a separate project over reusing MarketPlay's) with a `leads` table: id/created_at/email/name/source/service/message/meta jsonb/status, RLS on, anon insert-only policy, indexes on created_at + source. Nothing on the site writes to it yet; the Work-with-me form and calculators will. Decided lead magnet for calculators: in-browser personalised PDF of the result, unlocked by email (capture only, no sending infra).

Verified: `npm run build` green (25 routes), `tsc --noEmit` clean, exactly 2 font preloads in served HTML, nav surface + condense + full-screen menu + CTA columns + band chip all confirmed via computed styles at 1280px and 375px, no horizontal overflow at 375px, body scroll lock on menu open/close. **Motion still needs a real-browser look** — the preview pane does not fire rAF (screenshots time out, framer entry/exit animations freeze; also breaks `scroll-behavior: smooth` scrollTo in-pane). Chrome extension not connected this session either.

Gotcha confirmed again this session: running `npm run build` then starting `next dev` served stale CSS (`.nav-surface` missing until `.next` was cleared and the server restarted).

## Previous session (2026-07-22) — mobile-first identity + motion system

**Uncommitted.** Working tree only, nothing pushed, nothing deployed.

- **Fonts self-hosted.** `api.fontshare.com` was refusing requests, returning 200 with a comment body and no `@font-face` rules, so the whole site silently fell back to system sans with nothing in the console. All 12 woff2 files (Switzer 100-900, Zodiak 400/400i/700) now live in `src/fonts/` and load through `next/font/local` (`src/lib/fonts.ts`). CDN `<link>` removed from `layout.tsx`; Fontshare origins dropped from the CSP in `next.config.ts`. Side benefit: weights 100-300 are available now, the CDN link only pulled 400-900.
- **Mobile type scale.** Old clamps floored at `3rem`, so `12vw` never engaged below ~400px and the hero name rendered at 48px on a phone. New `--step-*` tokens in `:root`; the name is 80px at 375px wide.
- **Hero is now the split-identity lockup** (`src/components/ui/name-lockup.tsx`): AARIT / rotating role band / SHAH. Roles moved from a caption under the name into the mark itself. Band shrink-wraps the role on mobile, runs full width from `sm` up.
- **Motion primitives** (`src/lib/motion.ts`): shared easing/duration tokens and variants. `Reveal` split into `Reveal` / `RevealLines` / `RevealStagger` + `RevealItem` (was one generic fade-up used everywhere).
- **View transitions** enabled (`experimental.viewTransition`). `PageTransition` wraps `children` in the root layout; nav links carry `transitionTypes` (`nav-back` for home, `nav-forward` for everything else); header pinned via `viewTransitionName: "site-header"`.
- **The band as the site-wide device**: hero role bar, nav active indicator (replaced the gradient pill), section-heading rule that draws itself, `.band-link` underlines with `:active` fallback on touch, `.tappable` press states.
- **#10 weight stack** is the footer signoff (opacities raised from 0.10/0.22 to 0.18/0.35 — the originals are invisible on a phone). **#3 molten panel** is the contact CTA block.
- `/lab/name` still holds all 10 explored directions. Scratch, not linked, not in the sitemap. Delete when done.

Verified: `npm run build` green (25 routes), `tsc --noEmit` clean, no horizontal overflow at 375px, real Switzer rendering at 900 weight, no Fontshare references in the served HTML.

**Not verified: the animations actually running.** The preview pane's renderer was not firing `requestAnimationFrame`, which pinned every framer-motion entry animation at its initial value and made screenshots time out; the Chrome extension was not connected either. Needs a look in a real browser at `localhost:3100`.

Pre-existing lint error in `src/components/site/hero-shader.tsx:33` (`react-hooks/set-state-in-effect`), confirmed present on a clean tree, untouched by this work.

## Completed (2026-07-20) — SEO / "name + AI" publicity push

**Goal:** rank for "[Aarit Shah] + AI training / AI trading / AI projects", not just bare name (which already ranks fine via LinkedIn/Instagram/portfolio).

**Site changes** (all pushed to `main`, live via Vercel):
- `src/app/layout.tsx`: default title now "Aarit Shah · AI Builder, Trader & Founder"; `keywords` array gained AI trading/AI agents/AI training/AI builder/AI projects/trading bots.
- `src/app/page.tsx`: homepage `Person` JSON-LD `jobTitle`/`description` now lead with "AI builder"; added `knowsAbout` (AI, AI agents, AI trading systems, algorithmic trading, etc.); `sameAs` auto-picks up GitHub + X since both were added to `socials`.
- `src/lib/data.ts`: added GitHub (`github.com/Aary992`) and X (`x.com/withaarit`) to `socials` (renders automatically in footer/contact/about — no component changes needed, they're plain label pills). Added new `posts`/`Post` type + 3 grounded articles.
- **New `/writing` section** (`src/app/writing/page.tsx` + `src/app/writing/[slug]/page.tsx`): 3 articles, each with per-page metadata + `BlogPosting` JSON-LD, grounded entirely in real shipped facts (no invented content): "Inside MarketPlay's AI control room" (10-agent backend, human approval gate), "Why I built my own AI trade journal" (Telegram screenshot → logged trade), "What I actually teach in daily webinars to 1,500 people" (the AI-training-facing one — directly targets "AI training" + name searches). Added to `nav` and `sitemap.ts`.
- Verified: `tsc --noEmit` clean, `next build` green (23 routes incl. 3 static writing posts).

**GitHub (`Aary992`) changes:**
- Created public `github.com/Aary992/Aary992` profile-README repo (renders on the profile page): states name, AI-builder positioning, all 4 ventures/projects, links to site/writing/LinkedIn/X.
- Archived 10 near-duplicate/throwaway repos that were diluting the profile: `_Market-Play_`, `-Market-Play-`, `MPlay`, `MP`, `market-play_`, `Market-Play`, `Market_play`, `FocusFlow`, `Focus-Flow`, `Focus--Flow` (all 0 stars/no description/tiny, confirmed via `gh api` before touching — archiving is reversible from repo settings).
- **Not done — blocked on missing OAuth scope:** GitHub profile bio/location/blog/twitter fields need the `user` scope; current `gh` token only has `gist, read:org, repo`. User needs to run `gh auth refresh -h github.com -s user` (interactive browser approval) before this can be set via API. Intended values once unblocked: bio "Founder & AI builder. Building MarketPlay, GetAITrade and 10x Founders. Trading, AI agents, financial literacy.", location "Mumbai, India", blog "https://aaritshah.com", twitter "withaarit".
- **Not evaluated:** `cortex`, `cortex-os`, `AI-War-Room`, `doctor`, `portfolio-tracker`, `trade-journal`, `demo-concept`, `pop`, `waitlist` were left untouched — unlike the Market-Play/FocusFlow dupes these aren't obvious throwaways by name, could be real unlisted projects worth describing/pinning rather than archiving. Worth a deliberate pass with the user, not a blind archive.

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
