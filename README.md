# CockroachBase

The repository for the CockroachBase brand and the stub site at `https://aseriy.github.io/cockroachbase/`.

## Color palette

Values are the `--continuum-color-*` custom properties declared on `:root` in the cockroachlabs.com stylesheet `/_next/static/css/13875950e9d94eb3.css`, read on 2026-11-16.

| Token | Hex | RGB | Role |
|---|---|---|---|
| `digital-black` | `#000` | 0, 0, 0 | page, header, and section backgrounds |
| `clarity-white` | `#fff` | 255, 255, 255 | headlines, body, nav links, logo, button outline start |
| `deep-green` | `#101913` | 16, 25, 19 | image tiles and panels |
| `sci-fi-blue` | `#60ecff` | 96, 236, 255 | eyebrows, hero theme, footer link hover, capabilities link text |
| `sci-fi-blue-dark` | `#144f6b` | 20, 79, 107 | button hover in the blue theme |
| `sci-fi-blue-light` | `#dffbff` | 223, 251, 255 | declared, no use observed on the Continuum page |
| `bio-green` | `#aede54` | 174, 222, 84 | button hover fill, focus outline, nav hover, open FAQ question |
| `bio-green-dark` | `#43541f` | 67, 84, 31 | button hover in the green theme |
| `bio-green-light` | `#d7eea9` | 215, 238, 169 | declared, no use observed on the Continuum page |
| `data-purple` | `#9059ff` | 144, 89, 255 | primary button fill, rich-text h2 |
| `data-purple-dark` | `#502482` | 80, 36, 130 | button hover in the purple theme |
| `data-purple-light` | `#c8acff` | 200, 172, 255 | declared, no use observed on the Continuum page |
| `timeless-taupe` | `#e5e4dc` | 229, 228, 220 | flexible content summary text, hairlines at low alpha |
| `timeless-taupe-light` | `#f9f8f3` | 249, 248, 243 | declared, no use observed on the Continuum page |
| `flexible-content-body` | `#888884` | 136, 136, 132 | proof stat summary, secondary body |
| `benchmark-muted` | `#4a4a46` | 74, 74, 70 | declared, no use observed on the Continuum page |
| `table-row-border` | `#323232` | 50, 50, 50 | declared, no use observed on the Continuum page |
| `button-outline` | `#999` | 153, 153, 153 | default button outline end color |
| `pricing-bullet-text` | `#f2f2ee` | 242, 242, 238 | declared, no use observed on the Continuum page |

Hairlines are white or taupe at low alpha (`#ffffff42`, `#ffffff2e`, `#e5e4dc2e`), never solid gray.

## Type scale

The stylesheet has no bare `html`, `body`, heading, `p`, or `a` rules. Type is applied through `--continuum-font-*` tokens and scoped selectors such as `[data-rich-text] h1`.

| Role | Family | Weight | Size / line-height | Tracking |
|---|---|---|---|---|
| `hero-headline` | Geist | 200 | 80px / 80px | 0 |
| `hero-headline-sml` | Geist | 200 | 44px / 48px | 0 |
| `h1` | Geist | 200 | 40px / 50px | 0 |
| `body-xl` (used as h2) | Geist | 400 | 40px / 51px | 0 |
| `h3` | Geist | 400 | 20px / 26px | 0 |
| `body-l` | Geist | 400 | 20px / 31px | 0 |
| `body` | Geist | 400 | 16px / 27px | 0 |
| `body-sml` | Geist | 400 | 12px / 19px | 0 |
| `eyebrows` | Geist Mono | 400 | 16px / 24px | 2px |
| `mono-sml` | Geist Mono | 400 | 12px / 16px | 1.2px |
| `mono-xs` | Geist Mono | 400 | 8px / 12px | 0 |
| `footer-navigation-link` | Geist | 200 | 14px / 20px | 0 |

- The hero title is `clamp(44px, 5.5556vw, 80px)` with `line-height: 1.1`.
- Eyebrows are uppercase Geist Mono with 2px tracking.

## Spacing and layout

- `--continuum-space-N` is a pixel scale: 8, 12, 16, 20, 24, 32, 40, 48, 60, 64, 72, 80, 100, 108, 120, 160, 180, 200, 240, 300, 400.
- Page margins are 24px on mobile, 80px on tablet, 160px on desktop. The layout boundary is 1440px.
- Section vertical padding is 72px, the divider gap is 48px, the column gap is 96px, and the pill radius is 9999px.
- Every section root on the Continuum page is a flex column with the 72px vertical padding and the layout margin as horizontal padding, set as inline `style` attributes on the markup.

## Components

- Header: absolute over the hero, 100px tall, white text. The fixed bar has `backdrop-filter: blur(12px)` and 1px `#ffffff42` top and bottom borders, and turns solid black when the menu is open. Nav links are 15px weight 300 and turn bio-green on hover. The wordmark is 223 by 25px, inverted to white.
- Buttons (`.continuum-button`): transparent fill, pill radius, gradient outline from white to `#999`, white Geist Mono label, 20px inline padding, 48px tall in the hero. The arrow slides 4px on hover. The standard hover fills bio-green with black text. The primary hero button and forms fill data-purple. Transitions are 0.18s ease-out.
- Hero (`hero-subpage`, theme `sci-fi-blue`, background `theme-artwork`): cover-fit artwork with no background color of its own. Eyebrow in sci-fi-blue, copy in white at body size plus 2px and weight 300. The breadcrumb block uses `mix-blend-mode: difference`. The video frame has a 24px radius on black.
- Capabilities overview: flat rows on black with no card surface. One-column list items have a fixed 70% copy column. Two-column grid items are 530px wide at source. A full-width SVG rule separates items. Link text is sci-fi-blue.
- Proof stat block: intro row aligned to the baseline with a 96px split gap, white h1 headline, summary in `#888884`.
- Flexible content block: transparent background. Media is 320px tall, rising to 520px at 768px. The image radius is 32px on the inner edge. Copy is padded 160px at the top. The summary is timeless-taupe at 17px with a 1px sci-fi-blue `hr`.
- FAQ: the trigger is a reset button. The question is white and turns bio-green when open. The icon is a 20px plus made of two 1px bio-green strokes that collapse to a minus. The panel animates `grid-template-rows` from 0fr to 1fr over 0.24s.
- CTA ending: headline in digital black at hero-headline size over the sci-fi-blue artwork. The primary button is filled data-purple, the secondary is outlined black. Max width is 1200px.
- Footer: white logo mask 113 by 116px, five columns at 1280px, 100px vertical padding, links at 14px weight 200, sci-fi-blue on hover.
- Focus: 2px solid bio-green outline, offset 4 to 8px.
- Client logo strip: sci-fi-blue eyebrow, then a 48s linear marquee.

## Continuum page structure

Section owners of `https://www.cockroachlabs.com/product/continuum/` in page order:

1. Header (`global-header-transparent`)
2. Hero (`hero-subpage`)
3. Proof stat block (`proof-stat-block`)
4. Capabilities overview, one column (`capabilities-overview`)
5. Flexible content block (`flexible-content-block`)
6. Client logo strip (`client-logo-strip`)
7. Flexible content block (`flexible-content-block`)
8. Capabilities overview, two columns (`capabilities-overview`)
9. Flexible content block (`flexible-content-block`)
10. Rich text (`rich-text`)
11. FAQ module with ten entries (`faqmodule`, `faqmodule-entry`)
12. CTA ending (`ctaending`)
13. Footer (`footer`)

## Method and open items

The two stylesheets linked from the page were fetched and read in 100K-character windows. Surface styling, meaning section padding and the hero and card boxes, is carried by inline `style` attributes on the markup and was confirmed from curl output of the page.

Open item: the color and thickness of the `data-capabilities-overview-item-rule` divider have not been read.

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

