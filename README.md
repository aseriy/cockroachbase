# CockroachBase

The repository for the CockroachBase brand and the stub site at `https://aseriy.github.io/cockroachbase/`.

## Color palette

Values are the `--continuum-color-*` custom properties declared on `:root` in the cockroachlabs.com stylesheet under `/_next/static/css/`. The file name is a build hash that changes with each deploy; the values were identical in the 2026-11-16 and 2026-11-17 builds.

| Token | Hex | RGB | Role |
|---|---|---|---|
| `digital-black` | `#000` | 0, 0, 0 | page, header, and section backgrounds |
| `clarity-white` | `#fff` | 255, 255, 255 | headlines, body, nav links, logo, button outline start, capabilities item dividers |
| `deep-green` | `#101913` | 16, 25, 19 | footer background, image tiles and panels |
| `sci-fi-blue` | `#60ecff` | 96, 236, 255 | eyebrows, hero theme, footer link hover, capabilities link text |
| `sci-fi-blue-dark` | `#144f6b` | 20, 79, 107 | button hover in the blue theme |
| `sci-fi-blue-light` | `#dffbff` | 223, 251, 255 | declared, no use observed on the Continuum page |
| `bio-green` | `#aede54` | 174, 222, 84 | button hover fill, focus outline, nav hover, open FAQ question, headline accent words (`data-text-accent`), first capabilities divider |
| `bio-green-dark` | `#43541f` | 67, 84, 31 | button hover in the green theme, rich-text strong accent |
| `bio-green-light` | `#d7eea9` | 215, 238, 169 | rich-text muted text and link color (FAQ answers) |
| `data-purple` | `#9059ff` | 144, 89, 255 | primary button fill, h2 in `[data-text-content-b]` blocks |
| `data-purple-dark` | `#502482` | 80, 36, 130 | button hover in the purple theme |
| `data-purple-light` | `#c8acff` | 200, 172, 255 | declared, no use observed on the Continuum page |
| `timeless-taupe` | `#e5e4dc` | 229, 228, 220 | flexible content summary text, hairlines at low alpha |
| `timeless-taupe-light` | `#f9f8f3` | 249, 248, 243 | declared, no use observed on the Continuum page |
| `flexible-content-body` | `#888884` | 136, 136, 132 | proof stat summary, secondary body |
| `benchmark-muted` | `#4a4a46` | 74, 74, 70 | declared, no use observed on the Continuum page |
| `availability-unavailable-dot` | `#555` | 85, 85, 85 | declared, no use observed on the Continuum page |
| `table-row-border` | `#323232` | 50, 50, 50 | declared, no use observed on the Continuum page |
| `button-outline` | `#999` | 153, 153, 153 | default button outline end color |
| `pricing-bullet-text` | `#f2f2ee` | 242, 242, 238 | declared, no use observed on the Continuum page |

Hairlines are white or taupe at low alpha (`#ffffff42`, `#ffffff2e`, `#e5e4dc2e`), never solid gray. The footer legal row uses a 1px top border of white at 30 percent via `color-mix`.

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

- Header: absolute over the hero, 100px tall, white text, with no inline styles of its own. The fixed bar has `backdrop-filter: blur(12px)` and 1px `#ffffff42` top and bottom borders, and turns solid black when the menu is open. Nav links are 15px weight 300 and turn bio-green on hover. The wordmark is the file `cockroach-labs-BEtUiLDr.2f41b309.svg` at 223 by 25px, inverted to white. The symbol is an inline white SVG data URI.
- Buttons (`.continuum-button`): a 40px-tall flex row with 8px gap, `padding: 12px var(--continuum-button-padding-inline)`, and `border-radius: 35px`. The fill is transparent. The outline is a separate absolutely positioned span with 1px padding and a 90-degree gradient from the outline start color (white) to the outline color (`#999`), masked with `mask-composite: exclude` so only a 1px ring shows. The label uses the mono-sml tokens in the button text color. The icon is an inline `arrow-right` SVG, viewBox 0 0 10 10, in the same color. Text-appearance buttons (`data-button-appearance="text"`), used for the capabilities links, omit the outline span. The arrow slides 4px on hover. The standard hover fills bio-green with black text. The primary hero button and forms fill data-purple. Transitions are 0.18s ease-out. Hero action buttons are 48px tall with 24px inline padding and a label at 1.1 times mono-sml, set by the stylesheet with `!important` over the inline 40px.
- Hero (`hero-subpage`, theme `sci-fi-blue`, background `theme-artwork`): the artwork is `hero-subpage-sci-fi-blue-SsQ9uRg4.6068dfa9.jpg`, cover-fit and centered, with no background color of its own. Eyebrow in sci-fi-blue, copy in white at body size plus 2px and weight 300. The breadcrumb block uses `mix-blend-mode: difference`. The video frame has a 24px radius on black.
- Headline accents: spans marked `data-text-accent` inside eyebrows and section headlines are bio-green.
- Rich text (`rich-text`, theme `bio-green`, presentation `nested`): `section` elements that set six inline variables. Surface is digital-black, text is clarity-white, muted is bio-green-light, accent is bio-green, accent-soft is bio-green-light, accent-strong is bio-green-dark. With the stylesheet rules this gives white text on black, bio-green-light links underlined in bio-green, bio-green headings, a 4px bio-green blockquote border, and a 1px bio-green `hr`. On this page the rich-text blocks are the ten FAQ answers.
- Capabilities overview: flat rows on black with no card surface. One-column list items have a fixed 70% copy column. Two-column grid items are 530px wide at source. Each item opens with a 1px full-width `span` divider (`data-capabilities-overview-divider`), bio-green on the first item and white on the rest, with 20px padding above and below. The item title uses the h1 tokens at 610px source width, the description uses the body tokens at 700px, and the link is a text-appearance button. Link text is sci-fi-blue.
- Proof stat block: intro row aligned to the baseline with a 96px split gap, white h1 headline with `text-wrap: balance` and `hyphens: manual`, summary in `#888884` (the inline style sets white; the stylesheet overrides it with `!important`).
- Flexible content block: transparent background. Media is 320px tall, rising to 520px at 768px. The image radius is 32px on the inner edge. Copy is padded 160px at the top. The summary is timeless-taupe at 17px with a 1px sci-fi-blue `hr`.
- FAQ: a single 1px bio-green lead divider sits above the list inside a lane with 48px padding top and bottom. Entries stack with a 20px gap and nothing separates them. The trigger is a reset button laid out as a flex row with 40px gap and 20px bottom padding at 1080px source width. The question uses the body-l tokens at 771px, is white, and turns bio-green when open. The icon is a 20px plus made of two 1px bio-green strokes that collapse to a minus. The panel animates `grid-template-rows` from 0fr to 1fr over 0.24s.
- CTA ending: headline in digital black at hero-headline size over the sci-fi-blue artwork. The primary button is filled data-purple, the secondary is outlined black. Max width is 1200px.
- Footer: background deep-green, 64px root gap, 500px source height. The top row is a five-column grid at 157px minimum height, with the brand as an inline white SVG mask at 113 by 116px in column 1 and the navigation spanning columns 2 to 5. At 1280px the vertical padding is 100px. Links are 14px weight 200, sci-fi-blue on hover. The legal row has 41px top padding, 55px height, and a 1px top border of white at 30 percent.
- Focus: 2px solid bio-green outline, offset 4 to 8px.
- Client logo strip: sci-fi-blue eyebrow, then a 48s linear marquee. The logos are Contentful PNGs with no CSS filter or opacity; any color treatment is in the image files.

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

## Method

The two stylesheets linked from the page were fetched and read in 100K-character windows. Surface styling, meaning section padding and the hero and card boxes, is carried by inline `style` attributes on the markup and was confirmed from curl output of the page. The markup was probed with curl for the inline styles on each component root and its children, and the stylesheet was re-read after a redeploy to confirm the tokens.

No items from the Continuum page remain unread.

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

cockroachlabs.com declares seven font faces in total. Six are in the main stylesheet and one in the component stylesheet.

| Family | Weight | File | Role |
|---|---|---|---|
| `__GeistSans_8adcd2` | 100–900, variable | `0b78ff376f6b9734-s.p.woff2` | `next/font` build of Geist, preloaded |
| `__GeistSans_Fallback_8adcd2` | any | `local("Arial")` with the metric overrides above | fallback for Geist |
| `__GeistMono_46451f` | 100–900, variable | `723e11e5093b8e80.p.woff2` | `next/font` build of Geist Mono, preloaded |
| `Geist` | 200 | `Geist-ExtraLight-CeFMCKLp.39d1179c.woff2` | static face behind the `--continuum-font-family-*` tokens |
| `Geist` | 400 | `Geist-Regular-BRy7AJLk.7f3839a2.woff2` | static face behind the tokens |
| `Geist Mono` | 400 | `GeistMono-Regular-DHWdxaF_.a4abc190.woff2` | static face behind the tokens |
| `slick` | 400 | `slick.*.eot`, `.woff`, `.ttf`, `.svg` | carousel icon font, component stylesheet only |

Font versions, read from the `name` table of the site's files and the repository's:

| Font | Site | Local |
|---|---|---|
| Geist | Version 1.800, 35,472-byte reduced file | Version 1.800, full variable file |
| Geist Mono | Version 1.700 | Version 1.701 |

The repository's two variable files cover every weight the site declares. The `slick` icon font is not present in the repository.

