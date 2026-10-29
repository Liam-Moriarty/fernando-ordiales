# 04 · Design brief

**Status:** Draft · **Owner:** Fernando Ordiales · **Approved by:** visual
spec approved by Fernando in chat · **Date:** 2026-10-29

**The source of truth is [`design.md`](../design.md)** — concept ("the
trace"), both theme palettes with computed contrast ratios, type scale,
spacing, layout wireframes, radii, shadows, the full motion spec, component
states, voice rules and the don'ts list. This file records where those
decisions live in code.

## Brand

- **Logo:** none; the wordmark is the name set in Instrument Sans. Favicon is
  a trace node (`apps/web/public/favicon.svg`).
- **Voice:** first person, plain verbs, specific over impressive. Banned
  words and CTA wording: `design.md` §12.

## Colours

Defined once in the `@theme inline` block of `apps/web/src/style.css`. Light
values sit on `:root`, dark on `[data-theme='dark']`; an inline script in
`index.html` sets the attribute before first paint. Tailwind's stock palette
is wiped (`--color-*: initial`), so only these tokens exist:

| Token                  | Light          | Dark           | Used for                         |
| ---------------------- | -------------- | -------------- | -------------------------------- |
| `--color-background`   | `#fbfbfd`      | `#131316`      | Page background                  |
| `--color-surface`      | `#f4f4f7`      | `#1a1a1e`      | Panels, code, screenshot frames  |
| `--color-elevated`     | `#ffffff`      | `#232329`      | Modals, menus                    |
| `--color-text`         | `#1c1c21`      | `#e9e9ee`      | Headings and body                |
| `--color-muted`        | `#595964`      | `#a3a3af`      | Secondary text, meta             |
| `--color-border`       | `#e4e4eb`      | `#2e2e36`      | Hairlines, dividers              |
| `--color-accent`       | `#6650a8`      | `#b4a5e8`      | Trace, links, focus, primary CTA |
| `--color-accent-hover` | mix 88% + text | mix 88% + text | Primary button hover             |
| `--color-accent-quiet` | `#ece8f7`      | `#2e2a42`      | Trace track, selection, tints    |
| `--color-error`        | `#c62a2f`      | `#e5484d`      | Errors only                      |

Every pair passes WCAG AA (most AAA); the computed ratios are in `design.md`
§2. No success green: a quiet site confirms with the accent.

## Typography

| Use                | Font                      | Size and weight                                                  |
| ------------------ | ------------------------- | ---------------------------------------------------------------- |
| Headings & body    | Instrument Sans Variable  | type scale tokens `--text-display` … `--text-h4`, body 1rem/1.65 |
| Code, meta, labels | Spline Sans Mono Variable | `--text-caption` 13px, code 14px                                 |

Fonts are self-hosted Fontsource packages imported in `main.tsx`. Full scale
with clamp values: `design.md` §4. Body max line length 68ch.

## Components

Shared primitives live in `apps/web/src/components/` (Button/ButtonLink
variants, ThemeToggle, CopyEmailButton, LayerIndicator, Trace, PageTransition,
ArchDiagram). States per `design.md` §10; no component uses a color outside
the tokens above.

## Layout

- Container `--container-page` = 70rem (1120px); Tailwind default breakpoints.
- Everything left-aligned; the homepage reserves a left rail for the trace
  (`lg:pl-16` on content).
- Section padding-y: 64 / 96 / 128 px (mobile / tablet / desktop).

## Accessibility

- All text pairs AA or better (table above).
- Global 2px accent `:focus-visible` ring, skip link, semantic landmarks,
  one `h1` per page.
- `prefers-reduced-motion` honored everywhere (`design.md` §9); the Three.js
  canvas is `aria-hidden` with a static SVG fallback.
