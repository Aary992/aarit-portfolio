# Writing drafts

Drafts for `/writing`, not published. Each one is built only from facts already
on the site (sources are noted at the top of each file). Gaps that need your
own experience are marked `[ADD: …]`. Fill those in rather than publishing
around them.

| Draft | Angle | Gaps to fill |
|---|---|---|
| `one-irreversible-decision.md` | Why MarketPlay has no undo button | 2 |
| `rules-before-trades.md` | Your investing and CFD process | 2 |
| `why-10x-founders-is-small.md` | Why 10x Founders stays invite-only | 3 |

## Publishing one

Writing posts live in `src/lib/data.ts` in the `posts` array. Add an entry
with the frontmatter fields (`slug`, `title`, `dek`, `category`, `readTime`),
today's `date`, and the body as an array of paragraph strings. The sitemap,
share card and page are generated automatically from that entry.

Before publishing `rules-before-trades.md`: it contains no returns figures on
purpose. If you add any, include the full disclaimer from `/investing`.
