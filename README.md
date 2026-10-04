# CockroachBase

The repository for the CockroachBase brand and the stub site at `https://aseriy.github.io/cockroachbase/`.

## Color palette

Values come from two sources: the Cockroach Labs 2026 template (`rebrand.pdf`) and picks from the rendered cockroachlabs.com pages (`home.png`, `products.png`).

| Token | Hex | RGB | Role | Source |
|---|---|---|---|---|
| digital black | `#000000` | 0, 0, 0 | page canvas | deck |
| clarity white | `#ffffff` | 255, 255, 255 | headlines, body, nav links | deck |
| data purple | `#885cf6` | 136, 92, 246 | announcement band, filled primary button, themed sections | deck |
| bio green | `#b8dd69` | 184, 221, 105 | eyebrows, active nav, button outline, headline accent word | browser |
| sci-fi blue | `#88e9fc` | 136, 233, 252 | footer column titles, blue-themed eyebrows | browser and deck |
| muted text on dark | `#939188` | 147, 145, 136 | descriptions, secondary body | browser |
| divider on dark | `#424242` | 66, 66, 66 | hairline rules | browser |
| footer background | `#121913` | 18, 25, 19 | footer block | browser |
| bio green light | `#dbedb0` | 219, 237, 176 | green card background | browser |
| data purple light | `#c3adf9` | 195, 173, 249 | purple card background | browser |
| sci-fi blue light | `#e4fafe` | 228, 250, 254 | blue card background | browser |

Card text colors (the `-dark` variants) are not recorded; pick them from the card titles on the homepage if cards are used.

## Fonts

Geist and Geist Mono are self-hosted; nothing loads from Google Fonts. Both are licensed under the SIL Open Font License 1.1 with no Reserved Font Name, so converting the format and serving the files is permitted as long as the license text ships with them.

Files under `docs/fonts/`:

| File | Source |
|---|---|
| `geist.woff2` | `assets/fonts/Geist[wght].ttf`, variable, weight 100–900 |
| `geist-mono.woff2` | `assets/fonts/GeistMono[wght].ttf`, variable, weight 100–900 |
| `OFL-Geist.txt` | `https://raw.githubusercontent.com/google/fonts/main/ofl/geist/OFL.txt` |
| `OFL-GeistMono.txt` | `https://raw.githubusercontent.com/google/fonts/main/ofl/geistmono/OFL.txt` |

To regenerate them, from the repository root with the MkDocs virtualenv present:

```
mkdir -p docs/fonts
.venv/bin/pip install fonttools brotli
.venv/bin/python -m fontTools.ttLib.woff2 compress -o docs/fonts/geist.woff2 'assets/fonts/Geist[wght].ttf'
.venv/bin/python -m fontTools.ttLib.woff2 compress -o docs/fonts/geist-mono.woff2 'assets/fonts/GeistMono[wght].ttf'
curl -sfo docs/fonts/OFL-Geist.txt https://raw.githubusercontent.com/google/fonts/main/ofl/geist/OFL.txt
curl -sfo docs/fonts/OFL-GeistMono.txt https://raw.githubusercontent.com/google/fonts/main/ofl/geistmono/OFL.txt
```

`fontTools.ttLib.woff2 compress` wraps the TTF data unchanged apart from compression.

How the site uses them, all in `docs/stylesheets/extra.css`:

- `@font-face` for `Geist` and `Geist Mono`: same-origin `src`, `font-weight: 100 900`, `font-display: swap`.
- `@font-face` for `Geist Fallback`: `local("Arial")` with `ascent-override: 94.56%`, `descent-override: 27.76%`, `line-gap-override: 0%`, `size-adjust: 106.28%`. These are the values cockroachlabs.com ships for Geist. When Geist is unavailable, Arial renders at Geist's widths and line metrics so the layout does not move.
- `--md-text-font: "Geist", "Geist Fallback"`; Material appends its system stack.
- Headline `font-size: clamp(44px, 7.3333vw, 88px)` with `line-height: 1`, so it scales instead of overflowing narrow viewports.

`overrides/main.html` preloads `fonts/geist.woff2` from the `extrahead` block with `as="font" type="font/woff2" crossorigin`. Geist Mono is not preloaded; the landing page uses no code font.

This mirrors cockroachlabs.com, which self-hosts Geist as woff2 through Next.js `next/font`, declares the same Arial fallback face, preloads the files, and sizes its hero headline with `clamp()`.

