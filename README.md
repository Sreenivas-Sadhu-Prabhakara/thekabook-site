# ThekaBook — explainer site

A standalone marketing / explainer page for **ThekaBook**, the per-site P&L app for
small Indian civil and interior contractors.

> **Every site's P&L, in your pocket.** — subscription · pricing on discovery

This is **not** the app UI. It is a self-contained static site whose only job is to make
the product idea instantly clear to (a) a non-technical contractor and (b) an investor
skimming for 30 seconds.

## What the product does

Contractors juggle 3–5 sites out of a paper diary with zero per-site P&L. ThekaBook tracks
labour muster, material in, and advances against the quoted budget:

- **Per-site running cost** = labour payout (muster units × rate) + material amount + advances
- **Overspend alert** when running cost crosses the quoted budget
- **Labour payout sheet** per worker
- **Site P&L view** — quoted vs spent vs margin left
- **Advance ledger** per worker and site
- **All-sites dashboard** — spend vs budget per site, sites over budget, this-week labour cost

## Files

| File | Purpose |
|------|---------|
| `index.html` | All page markup (9 sections) |
| `styles.css` | Entire design system — "measured ledger" identity |
| `app.js` | Sticky-nav shadow, smooth scroll, and an INR count-up on the hero card |
| `favicon.svg` | Inline ledger-book mark |

## Design notes

- **Identity:** a field diary that finally does the maths. Ledger spine, ruled dividers,
  tabular rupee numerals, a tactile tilted "site card".
- **Palette (around the brief accent `#2563EB`):** blue accent, near-black ledger ink
  `#12161C`, off-white paper `#F6F4EE`, muted kraft tint `#EAE6DB`, and a single amber
  `#C2410C` reserved only for the overspend/over-budget state.
- **Numbers use Indian grouping** (12,34,567), computed in `app.js`.

## Running it

Fully self-contained — no build step, no CDN, no external fonts or scripts.

```bash
open index.html          # macOS
# or serve statically
python3 -m http.server 8080
```

Deploys to any static host (Netlify, Cloudflare Pages, GitHub Pages) unchanged.

## Accessibility & quality floor

- Responsive to mobile with no horizontal page scroll; the wide dashboard scrolls inside
  its own container.
- Visible keyboard focus, skip link, `prefers-reduced-motion` respected (count-up and
  smooth scroll disable).

---

A **KARYA** studio build · sreeni.nintendo@gmail.com
