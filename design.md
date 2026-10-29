# design.md — Fernando Ordiales, portfolio

**Status:** Draft, awaiting Fernando's approval · **Date:** 2026-10-29
Single source of truth for the portfolio's design. Nothing gets built until
this is approved. Token values here are the canonical ones; in the build they
live in the `@theme` block of `apps/web/src/style.css` (this repo uses
Tailwind CSS 4, configured in CSS — there is no `tailwind.config.js`).

---

## 1. Concept — "the trace"

Fernando builds AI products end to end and has literally built observability
tooling for them (Switchboard's AI Observability package). The site borrows
that idea: the homepage is an instrumented system, and the visitor's scroll is
a request travelling through it. One thin lavender line — the trace — starts
under the hero headline and runs down the left rail of the page, drawn by
scroll, passing through a node at each section: selected work, capabilities,
experience, contact. At the capabilities section the trace briefly branches
into the four layers of the stack he works across, then rejoins and terminates
at the contact section — the whole page quietly funnels to "email me".

Everything else stays still and quiet: generous whitespace, grays doing the
hierarchy work, no decorative motion. The trace is the single signature
element; lavender appears only there, in links, in focus rings, and on the
primary email button. It fits a calm, precise engineer because the one
flourish on the page is itself an engineering diagram, not decoration.

## 2. Color tokens

Grays are cool with a barely-there violet cast so both themes feel related to
the accent without using it. All ratios below are computed WCAG contrast
ratios, not estimates.

### Dark theme

| Token            | Value     | Role                                |
| ---------------- | --------- | ----------------------------------- |
| `--background`   | `#131316` | Page background                     |
| `--surface`      | `#1A1A1E` | Panels, project rows, code blocks   |
| `--elevated`     | `#232329` | Modals, menus, hover surface        |
| `--text`         | `#E9E9EE` | Headings and body                   |
| `--text-muted`   | `#A3A3AF` | Secondary text, meta, timestamps    |
| `--border`       | `#2E2E36` | Hairlines, dividers, input outlines |
| `--accent`       | `#B4A5E8` | The trace, links, focus rings       |
| `--accent-quiet` | `#2E2A42` | Trace track (undrawn), accent tints |

### Light theme

| Token            | Value     | Role                                |
| ---------------- | --------- | ----------------------------------- |
| `--background`   | `#FBFBFD` | Page background                     |
| `--surface`      | `#F4F4F7` | Panels, project rows, code blocks   |
| `--elevated`     | `#FFFFFF` | Modals, menus, hover surface        |
| `--text`         | `#1C1C21` | Headings and body                   |
| `--text-muted`   | `#595964` | Secondary text, meta, timestamps    |
| `--border`       | `#E4E4EB` | Hairlines, dividers, input outlines |
| `--accent`       | `#6650A8` | The trace, links, focus rings       |
| `--accent-quiet` | `#ECE8F7` | Trace track (undrawn), accent tints |

Light mode is not an inversion: it gets the deeper, inkier lavender
(`#6650A8`) because the pale one fails contrast on white, and its surfaces
separate by darkening rather than lightening. Each theme is tuned on its own.

### Approved text/background pairs (computed)

| Pair                        | Dark  | Light | Requirement    |
| --------------------------- | ----- | ----- | -------------- |
| text / background           | 15.33 | 16.42 | AA 4.5 — AAA ✓ |
| text / surface              | 14.34 | 15.46 | AA 4.5 — AAA ✓ |
| text / elevated             | 12.91 | 14.70 | AA 4.5 — AAA ✓ |
| muted / background          | 7.43  | 6.69  | AA 4.5 — AAA ✓ |
| muted / surface             | 6.95  | 6.30  | AA 4.5 ✓       |
| accent / background (links) | 8.38  | 6.20  | AA 4.5 ✓       |
| button text on accent       | 8.38¹ | 6.41² | AA 4.5 ✓       |

¹ dark theme: `#131316` text on `#B4A5E8` button. ² light theme: `#FFFFFF`
text on `#6650A8` button. No other text/background combinations are allowed.
Semantic colors (only where needed — form errors, copy confirmation):
error `#E5484D` dark / `#C62A2F` light; success reuses `--accent` (a quieter
site has no green).

## 3. Gradients

None. Zero. Hierarchy comes from spacing, type, and the two surface steps.
The only soft edge anywhere is the Three.js field fading at its boundary via
point opacity, which is scene behavior, not CSS.

## 4. Typography

Two families, loaded as self-hosted Fontsource packages (no Google Fonts
request at runtime; woff2 preloaded, `font-display: swap`):

- **Instrument Sans** (variable, 400–700) — display, headings, body. A
  contemporary grotesque that reads neutral and calm at text sizes but has a
  recognizable voice at display weight (the leaning `t`, the open `a`). Chosen
  over Inter/Roboto (invisible defaults) and Space Grotesk (the current
  AI-portfolio default).
- **Spline Sans Mono** (400, 500) — code, trace node labels, meta data
  (dates, stacks, "GMT+8"). Designed as a companion mono to a UI grotesque;
  quieter than JetBrains Mono and far less common. Mono is earned here: this
  is an engineering portfolio and the trace metaphor is a span waterfall,
  where mono labels are native.

### Type scale

Base 16px. Body max line length **68ch**.

| Style   | Size                                      | Line-height | Tracking | Weight |
| ------- | ----------------------------------------- | ----------- | -------- | ------ |
| Display | `clamp(2.5rem, 1.6rem + 4vw, 4.25rem)`    | 1.05        | -0.02em  | 600    |
| H1      | `clamp(2rem, 1.5rem + 2vw, 3rem)`         | 1.1         | -0.015em | 600    |
| H2      | `clamp(1.5rem, 1.3rem + 1vw, 2rem)`       | 1.2         | -0.01em  | 600    |
| H3      | `clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)` | 1.3         | -0.005em | 500    |
| H4      | `1.125rem`                                | 1.4         | 0        | 500    |
| Body    | `1rem`                                    | 1.65        | 0        | 400    |
| Small   | `0.875rem`                                | 1.5         | 0        | 400    |
| Caption | `0.8125rem` (mono)                        | 1.4         | 0.01em   | 400    |
| Code    | `0.875rem` (mono)                         | 1.6         | 0        | 400    |

No all-caps anywhere, labels included — caps-and-tracked eyebrow labels are
banned (see Don'ts). Mono + muted color is how meta text distinguishes itself.

## 5. Spacing

Scale (px): `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

| Context            | Mobile (<768) | Tablet | Desktop (≥1024) |
| ------------------ | ------------- | ------ | --------------- |
| Section padding-y  | 64            | 96     | 128             |
| Container gutter-x | 20            | 32     | 48              |
| Heading → content  | 24            | 32     | 32              |
| Between projects   | 48            | 64     | 64              |

Whitespace is the main luxury signal; when in doubt, take the larger step.

## 6. Layout

- Container max-width **1120px**, centered; 12-column grid, 24px gap.
- Breakpoints: Tailwind defaults (640 / 768 / 1024 / 1280).
- **Left-aligned everything.** No centered sections; the hero, headings, and
  contact block all sit on the left edge of the content column. The one
  exception: the contact email, which spans the full column width in display
  size.
- Desktop: the trace occupies a 48px rail at the container's left edge;
  content starts on column 2 of 12. Mobile: the trace moves to the far-left
  viewport edge (12px in) and content uses the full container.
- Text content (body copy, case study prose) is capped at 68ch ≈ 8 columns;
  the right side of wide sections is deliberately left empty except where a
  project's layer diagram sits.

### Homepage wireframe

```
┌──────────────────────────────────────────────────────────────┐
│ Fernando Ordiales        Work   About      [◐] [Email me]    │  nav (sticky)
├──────────────────────────────────────────────────────────────┤
│ │                                                            │
│ │  I take AI products from                 · · · · · · ·     │  hero
│ │  prompt to production.                  · three.js   ·     │
│ │                                          · particle   ·    │
│ │  One sentence of support copy.          ·  field     ·     │
│ │  [Email me]  [Resume]                    · · · · · · ·     │
│ ●  selected work                                             │  trace node
│ │  Switchboard ───────────────────────────── ▪▪▪▫ layers    │
│ │  one line on what it is / what I built                     │
│ │  Flinki ──────────────────────────────────  ▪▪▫▪ layers   │
│ │  FGP platform migration ─────────────────── ▫▪▪▪ layers   │
│ ●  capabilities                                              │
│ ├──● interface      React, Next, Flutter, Tailwind           │
│ ├──● ai layer       Vertex AI, Genkit, RAG, evals            │  trace branches
│ ├──● apis & data    Node, FastAPI, Postgres, Redis           │
│ ├──● infrastructure GCP, Docker, K8s, GitHub Actions         │
│ ●  experience                                                │
│ │  2026— AI Engineer, Hytel          (two-line summary)      │
│ │  2025  Web Developer, FGP          (two-line summary)      │
│ ●  contact                                                   │
│ ▼  fernando.ordiales23@gmail.com            [copy] [mailto]  │  trace ends here
│    Available for full-time and freelance · Manila · GMT+8    │
├──────────────────────────────────────────────────────────────┤
│ GitHub · LinkedIn · Resume                       © 2026      │  footer
└──────────────────────────────────────────────────────────────┘
```

`▪▪▪▫` is each project's **layer indicator**: a 4-segment vertical mini-stack
(interface / ai / data / infra), filled segments = layers Fernando owned.
Hovering a segment names the layer. This is how six disciplines read as one
engineer at a glance.

### Case study wireframe (`/work/:slug`)

```
┌──────────────────────────────────────────────────────────────┐
│ ← Work                                     [◐] [Email me]    │
├──────────────────────────────────────────────────────────────┤
│  Switchboard                                                 │
│  role · stack · year   (mono meta line)                      │
│                                                              │
│  The problem                 ┌────────────────────────┐      │
│  prose, 68ch                 │  architecture diagram  │      │
│                              │  (SVG, theme-aware)    │      │
│  What I built                └────────────────────────┘      │
│  prose + screenshots                                         │
│  Key decisions (plain list, each with the why)               │
│  Results (concrete: "29 tools", "published as npm pkg")      │
│  Links: live · repo                                          │
│                                                              │
│  Next: Flinki →── (single directional link, allowed here)    │
└──────────────────────────────────────────────────────────────┘
```

Case studies have no trace (it's the homepage's signature) — they get a
static hairline under the title instead.

## 7. Border radius

Radius grows with surface size; small interactive elements stay near-square
because sharpness reads as precision.

| Component                 | Radius | Reasoning                        |
| ------------------------- | ------ | -------------------------------- |
| Buttons, inputs           | 4px    | Crisp, engineered, not pill-soft |
| Tags (stack chips)        | 4px    | Match buttons; they're data      |
| Cards / panels / code     | 8px    | Larger surface, slightly softer  |
| Images, screenshots       | 8px    | Match their containing panel     |
| Modals, command menu      | 12px   | Largest floating surface         |
| Theme toggle, copy button | 4px    | They're buttons                  |

## 8. Shadows, borders & elevation

Borders do the elevation work; shadows exist only under things that truly
float (modal, dropdown, toast).

| Layer            | Dark theme                                            | Light theme                                               |
| ---------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| Hairline/divider | `1px solid #2E2E36`                                   | `1px solid #E4E4EB`                                       |
| Panel            | surface bg + hairline border, **no shadow**           | same                                                      |
| Dropdown/toast   | elevated bg + border + `0 4px 16px rgb(0 0 0 / 0.4)`  | elevated bg + border + `0 4px 16px rgb(28 28 33 / 0.08)`  |
| Modal            | elevated bg + border + `0 16px 48px rgb(0 0 0 / 0.5)` | elevated bg + border + `0 16px 48px rgb(28 28 33 / 0.12)` |

No glow effects, no colored shadows, no inset highlights.

## 9. Motion

### Easing & duration tokens (`src/lib/motion.ts`)

| Token         | Value                            | Used for                                   |
| ------------- | -------------------------------- | ------------------------------------------ |
| `ease-settle` | `cubic-bezier(0.25, 1, 0.5, 1)`  | Entrances; fast start, long gentle landing |
| `ease-glide`  | `cubic-bezier(0.65, 0, 0.35, 1)` | Crossfades, theme change, page transitions |
| `dur-fast`    | 150ms                            | Hover, press, focus                        |
| `dur-base`    | 220ms                            | Menus, toggle, copy confirmation           |
| `dur-slow`    | 420ms                            | Page transitions, section-level fades      |

No springs, no bounce, no overshoot anywhere.

### Page-load sequence (homepage, once per visit, total ≈ 1.05s)

| t (ms) | Element             | Animation                                                                                                   |
| ------ | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| 0      | Headline            | opacity 0→1, translateY 8px→0, 500ms `ease-settle`                                                          |
| 120    | Supporting sentence | same, 450ms                                                                                                 |
| 240    | CTA pair            | same, 400ms                                                                                                 |
| 360    | Nav                 | opacity 0→1, 300ms                                                                                          |
| ~500+  | Three.js field      | opacity 0→1 over 600ms, **only when its lazy chunk is ready** — it joins late rather than delaying anything |

Headline and "Email me" are plain DOM, render in the first paint, and are
interactive before any animation finishes (animations are opacity/transform
only, content never blocked).

### Page transitions (Framer Motion, `AnimatePresence`)

Exit: opacity 1→0, 150ms `ease-glide`. Enter: opacity 0→1 + translateY
6px→0, 280ms `ease-glide`. Total ≈ 430ms. Scroll restored to top on enter.

### The GSAP signature: drawing the trace

The only scroll-driven motion on the site.

- SVG path pinned in the left rail, `stroke-dashoffset` scrubbed directly to
  scroll position (`scrub: 0.5`), so it moves exactly as fast as the reader.
- The undrawn track is `--accent-quiet`; the drawn line is `--accent`,
  1.5px wide.
- Each section node (6px circle) fills and its mono label (`selected work`,
  `capabilities`…) fades from muted to text color as the line reaches it.
- In capabilities, the path forks into four short branches, one per layer
  row, then rejoins — drawn in the same single scrub.
- The trace ends in a small terminal node at the contact section.
- Sections themselves do **not** fade or slide on scroll. Ever.

### Three.js scene (hero)

- A sparse particle field (~1,800 points desktop, ~700 mobile) drifting
  slowly, like a point cloud settling: max drift 0.02 units/s, full loop
  period ≈ 60s. Points are theme gray at 40–70% opacity; a random ~7% are
  `--accent`. Colors read from CSS tokens, so the theme toggle re-tints it.
- Cursor parallax: the whole field tilts max ±2° toward the pointer with
  heavy damping (lerp 0.05) — a lean, not a chase. No reaction on touch.
- `dpr = Math.min(devicePixelRatio, 1.5)`, `frameloop` paused when the hero
  is off-screen (IntersectionObserver) or the tab is hidden
  (`visibilitychange`).
- Lazy: `React.lazy` + dynamic import after first paint on idle. The hero
  reserves its box; nothing shifts when the canvas arrives.
- Fallback (reduced motion, `navigator.deviceMemory < 4`, WebGL failure):
  a static inline SVG of the same field, generated once from the same point
  distribution so it looks like a paused frame, not a different design.

### Interaction motion (Framer Motion)

- Hover (links, buttons): color/border shift only, 150ms. **No lift, no
  scale, no shadow growth.** Project rows underline the title and fill the
  layer indicator's owned segments to full accent.
- Press: scale 0.98, 100ms.
- Focus-visible: 2px `--accent` ring, 2px offset, instant (no animation).
- Copy email: icon swaps to check + label "Copied" for 1.6s, crossfade 220ms.
- Theme toggle: all color tokens transition 250ms `ease-glide`
  (`transition: background-color, color, border-color, fill, stroke`). No
  flash, no circular reveal. Three.js re-tints over the same 250ms.

### Reduced motion (`prefers-reduced-motion: reduce`)

Load sequence → single 200ms fade of the whole hero. Page transitions →
instant swap with 150ms opacity fade. Trace → fully drawn, static. Three.js →
static SVG fallback. Hover/press/focus states change instantly. Nothing
translates, scales, or scrubs.

## 10. Components

All states = default / hover / active / focus-visible / disabled.

- **Nav:** sticky, background-blur-free — solid `--background` with bottom
  hairline that appears after 16px of scroll. Left: name as wordmark (body
  size, weight 500). Center-left: Work, About. Right: theme toggle + primary
  **Email me** button — the always-one-click contact action on every page and
  scroll position. Mobile: identical, no hamburger (two links fit).
- **Primary button (Email me):** filled `--accent`, text per contrast table
  §2; hover darkens/lightens accent 8%; disabled: surface bg, muted text.
- **Secondary button (Resume, View work):** transparent, 1px `--border`,
  text color; hover: border becomes `--accent`, text unchanged.
- **Ghost button (nav links, copy):** text only, muted; hover: full text
  color. No underline (underlines belong to prose links).
- **Prose links:** text color + 1px underline in `--accent-quiet`; hover:
  underline becomes `--accent`. No arrows appended.
- **Theme toggle:** ghost icon button, sun/moon crossfade 220ms; announces
  state via `aria-label` ("Switch to light theme").
- **Project row:** full-width; title (H3) + one-line description + mono meta
  (stack · year) + layer indicator right-aligned. Hover: title underline +
  indicator fills. Entire row is the link.
- **Layer indicator:** 4 stacked 20×6px segments; owned = accent-quiet fill
  (accent on hover), not-owned = border-only. Tooltip/title names the layer.
- **Tags (case study stack):** mono caption text in a 4px-radius
  border-only chip, muted; never colored per-technology.
- **Copy-email button:** ghost with copy icon; after copy shows "Copied" +
  check, reverts after 1.6s; also fires a polite `aria-live` announcement.
- **Swipe deck (case-study galleries, added 2026-10-29 at Fernando's
  request):** a Tinder-style card stack — drag or flick the top screenshot
  past a distance/velocity threshold and it flies off with a slight rotation
  while the next card settles in; below the threshold it springs back.
  Browsing only, no accept/reject meaning. Previous/Next ghost buttons and a
  mono counter ("2 / 6") are the keyboard path; under reduced motion cards
  crossfade and dragging is off. The hero particle field is likewise
  mouse-draggable (grab cursor) while its drift continues underneath.
- **Inputs (if a contact form ever exists — none planned):** surface bg,
  border, 4px radius; focus: accent border + ring; error: error border +
  caption message below. Documented so a future addition doesn't improvise.
- **Footer:** hairline top border; GitHub, LinkedIn, resume PDF, email again,
  location + timezone in mono caption. No sitemap theater.

## 11. Iconography & imagery

- **Icons:** Phosphor, regular weight (1.5px optical stroke), 20px default.
  Only functional icons: theme toggle, copy, check, external-link, arrow-left
  (back to work). No decorative icons next to headings or capabilities.
  Exception (2026-10-29, Fernando's request): the Tech stack section's chips
  carry brand logos (react-icons Simple Icons, 14px) — rendered grayscale at
  70% opacity so the wall stays calm, releasing the brand color only on
  hover, matching the old portfolio. Brand hexes live in the content data,
  not the token system; white-logo brands take no color and inherit text.
- **Imagery:** product screenshots only — no stock, no 3D illustrations, no
  abstract blobs. Screenshots sit in a `--surface` panel with hairline border,
  8px radius, actual app chrome cropped unless it matters. Architecture
  diagrams are hand-authored SVGs using the same tokens (mono labels, hairline
  strokes, accent only on the data-flow arrows) so they re-theme with the
  toggle.

## 12. Voice & copy

- First person, plain verbs, short sentences. Specific over impressive:
  "a chat agent with 29 tools", never "cutting-edge AI solutions".
- Banned words: passionate, craft, journey, digital experiences, wizard,
  ninja, guru, solutions, leverage (verb).
- Buttons say what happens: **Email me**, **Copy email**, **View resume
  (PDF)** (opens the PDF in a new tab), **View work**. A copied email
  confirms with **Copied**.
- Meta text (dates, stacks, timezone) is mono, lowercase where natural.
- Hero headline options (one sentence, no highlighted word):
  1. **"I take AI products from prompt to production."**
  2. "I build AI products end to end — the model wiring, the interface, and
     the infrastructure they run on."
  3. "AI features, the APIs behind them, and the infrastructure underneath —
     built by one engineer."
- Supporting line: "AI engineer at Hytel. Recently: an AI project-management
  copilot with a 29-tool agent, and a Vertex AI layer for a sports app used
  by athletes." (adjust to taste)
- Availability line (contact + footer): "Available for full-time and
  freelance · Manila, PH · GMT+8" — **TODO: Fernando confirms wording.**

## 13. Accessibility & performance budget

- Semantic landmarks (`header`, `main`, `nav`, `footer`), one `h1` per page,
  skip-to-content link, keyboard path through every interactive element,
  2px accent focus ring everywhere (§9).
- All text pairs from the §2 table only; icons get labels; screenshots get
  real alt text describing what the screen shows; the Three.js canvas is
  `aria-hidden` with the headline carrying the meaning.
- `prefers-reduced-motion` honored per §9; theme respects system preference,
  persists choice in `localStorage`, inline `<head>` script prevents
  wrong-theme flash.
- Lighthouse ≥ 90 all categories. LCP < 2.5s on mid-tier mobile (the LCP
  element is the headline — plain text, zero dependencies). CLS < 0.05
  (canvas box reserved, fonts preloaded with `swap` + size-adjusted
  fallback).
- JS budget: initial route chunk ≤ 180KB gzipped (React + router + Framer
  Motion + page code). GSAP (~30KB) loads with the homepage only. Three.js
  chunk (~160KB) is lazy, idle-loaded, and never render-blocking. Fonts:
  2 families ≤ 4 woff2 files ≤ 120KB total.
- SEO: per-route `title` + meta description, Open Graph image (static,
  pre-rendered, dark variant), favicon, `sitemap.xml`, canonical URLs.

## 14. Don'ts

Never, in any iteration of this site:

- No gradients, glassmorphism, blurred blobs, or glow effects.
- No neon purple; the accent stays muted lavender and appears only in the
  trace, links, focus rings, and the primary button.
- No caps-and-tracked eyebrow labels; no "01 / 02 / 03" numbering (the only
  sequence on the site is the experience timeline, which uses years).
- No "→" appended to links or buttons (single exception: the one "Next
  project" link at the end of a case study).
- No stats row, no skill bars, no percentage ratings, no logo wall.
- No fade-up-on-scroll sections; the trace is the only scroll-driven motion.
- No card lift/scale/shadow on hover.
- No identical-card grids; capabilities stay a connected diagram, projects
  stay full-width rows.
- No copy of the form "I craft digital experiences" / "passionate developer".
- No second accent color, no per-technology tag colors.
- No hardcoded colors/sizes/durations in components — tokens only.
- No layout-animating properties; transform and opacity only.

---

## Appendix: content inventory & gaps

Facts sourced from the resume (2026-10-29):

- **Name:** Fernando Jose Ordiales · **Location:** Parañaque / Metro Manila,
  PH (GMT+8) · **Email:** fernando.ordiales23@gmail.com
- **Experience:** AI Engineer, Hytel (Feb 2026–present, Cavite PH); Web
  Developer, FGP FortuneGod Philippines (Sep 2025–Jan 2026, Pasay PH) —
  resume prints "09/2026–01/2026", assumed typo.
- **Featured projects (3):**
  1. **Switchboard** — AI-first project management: global AI chat agent
     (29 tools), AI project planner, AI observability published as an npm
     package, AI evaluation + playground. Layers: interface, ai, data, infra.
  2. **Flinki** — athletes' verified achievement record, Flutter iOS/Android,
     AI layer on Vertex AI (Gemini + Genkit): "Find Me Online" web search,
     speech-to-text onboarding, AI bios and post images. Layers: interface
     (mobile), ai, data.
  3. **FGP platform migration** — WordPress → modern stack: REST APIs,
     Docker, GitHub Actions CI/CD. Layers: interface, data, infra. _(My call
     to include as the third project — swap it out if there's a better one.)_

**TODO — Fernando to supply:** GitHub URL, LinkedIn URL, resume PDF (final
version for the download link), live/repo links per project, any metrics he
can claim publicly, availability wording, and whether remote-only roles are
in scope. The site uses the personal email above, not the work one.

## Appendix: self-review — generic choices caught and replaced

Per the brief: for every choice I asked "would I have produced this for any
developer portfolio?" These failed and were replaced:

1. **Space Grotesk / Inter + JetBrains Mono** (first instinct) → Instrument
   Sans + Spline Sans Mono. The former trio is the current default of
   AI-generated dev portfolios.
2. **Capabilities as a 2×3 card grid** → the trace branches into a four-layer
   system diagram, which is also the literal content claim ("one engineer
   across the stack") drawn as a picture.
3. **Fade-up sections + a generic "line draws as you scroll" divider** → one
   trace, tied to the observability work he actually shipped, carrying the
   section anchors and the funnel to contact. Sections themselves don't move.
4. **Uniform 12px radius** → graded 4/8/12 by surface size, near-square
   interactive elements.
5. **Dark bg + accent sprinkled on headings, tags, and hovers** → accent
   confined to four jobs (trace, links, focus, primary CTA); grays carry
   everything else. Tags are deliberately colorless.
6. **Hero with headline + stats row** → headline + one supporting sentence +
   two buttons. The proof lives in the project rows, not in counters.
7. **Circular theme-toggle reveal** (trendy default) → plain 250ms token
   crossfade, which matches the calm brief better anyway.
8. **Identical project cards with cover images** → full-width rows whose
   distinguishing visual is the layer indicator, i.e. information, not
   decoration.
9. **Lorem-ish copy ("I craft…")** → copy rules with banned words and
   headline options grounded in his actual shipped work.
