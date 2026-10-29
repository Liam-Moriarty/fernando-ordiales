# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the template landing page in `apps/web` with Fernando Ordiales' portfolio exactly as specified in `design.md`.

**Architecture:** A Vite React SPA. Theme = CSS custom properties on `:root` / `[data-theme='dark']` mapped into Tailwind 4 via `@theme inline`; an inline head script prevents wrong-theme flash. Routes (`/`, `/work/:slug`, `/about`) via react-router with Framer Motion transitions. The homepage carries the two showpieces: a lazy Three.js particle field (static SVG fallback) and the GSAP scroll-drawn "trace".

**Tech Stack:** React 19, Vite, TypeScript strict, Tailwind CSS 4 (CSS-config), framer-motion, gsap/ScrollTrigger, three + @react-three/fiber + @react-three/drei, react-router v7, @phosphor-icons/react, Fontsource (Instrument Sans Variable, Spline Sans Mono), Vitest + Testing Library.

**Spec:** `design.md` (repo root) — approved by Fernando 2026-10-29. Token values, type scale, motion specs, copy rules, and Don'ts live there; this plan does not repeat them.

## Global Constraints

- All colors/fonts/radii/durations come from tokens (`@theme` in `apps/web/src/style.css`, `src/lib/motion.ts`); no hardcoded values, no Tailwind arbitrary colors.
- Animate only `transform` and `opacity`; every animation has a `prefers-reduced-motion` path per design.md §9.
- Token names follow the template convention: `--color-background`, `--color-surface`, `--color-elevated`, `--color-text`, `--color-muted`, `--color-border`, `--color-accent`, `--color-accent-quiet`, `--color-error`.
- TypeScript strict, no `any`; named exports; tests beside code as `*.test.tsx?`; Prettier/ESLint via repo configs (`--max-warnings=0` on commit).
- pnpm only; new deps go in `apps/web/package.json` (no second consumer → not in the catalog). `web` is excluded from changesets.
- Three.js chunk lazy + idle-loaded, `dpr ≤ 1.5`, paused off-screen/hidden; initial route JS ≤ 180KB gz, three chunk excluded from that budget.
- Copy rules + banned words per design.md §12; headline option 1: "I take AI products from prompt to production."
- Commits: conventional type, 1–2 sentence message, no attribution trailers, never push.
- Stage is Prototype: no Supabase, no server, no analytics. Baseline still applies (no secrets, no `dangerouslySetInnerHTML`, errors generic).

## Review Focus

Failure modes the spec implies but didn't spell out; each gets a test in the owning task:

1. Clipboard API missing or permission denied → Copy-email click must not crash and must not claim "Copied"; the email stays visible/mailto works. (Task 4)
2. `localStorage` blocked (private mode) → theme init and toggle fall back to system preference without throwing. (Task 1)
3. `window.matchMedia` absent (old embeds, jsdom) → theme init defaults to light, motion helpers default to reduced. (Task 1)
4. Unknown `/work/:slug` → NotFound page, not a crash or blank screen. (Task 2)
5. WebGL unavailable / low memory / reduced motion → hero renders the static SVG field, never a broken canvas. (Task 5)

---

### Task 1: Reset the shell — tokens, fonts, theme

**Files:**

- Delete: `apps/web/src/landing/` (all), `apps/web/src/App.test.tsx`
- Modify: `apps/web/src/App.tsx` (placeholder `<main>` with the h1 headline), `apps/web/src/style.css` (full rewrite), `apps/web/index.html`, `apps/web/src/main.tsx`, `apps/web/src/vitest.setup.ts`, `apps/web/package.json`
- Create: `apps/web/src/lib/theme.ts`, `apps/web/src/lib/theme.test.ts`, `apps/web/public/favicon.svg`
- Delete: `apps/web/public/vite.svg`

**Interfaces (produces):**

- `type Theme = 'light' | 'dark'`
- `getInitialTheme(): Theme` — localStorage `'theme'` → system `prefers-color-scheme` → `'light'`; never throws.
- `applyTheme(t: Theme): void` — sets `document.documentElement.dataset.theme`, persists to localStorage inside try/catch.
- CSS: `@theme inline` maps the 9 color tokens to vars defined on `:root` (light) and `[data-theme='dark']`; `--font-sans` = Instrument Sans Variable, `--font-mono` = Spline Sans Mono; base layer sets body bg/text, `::selection` (accent-quiet bg), global `:focus-visible` 2px accent ring with 2px offset, `color-scheme` per theme.

- [ ] Remove `@repo/ui` dep and the `@source '../../../packages/ui'` line (web no longer imports it); `pnpm --filter web add @fontsource-variable/instrument-sans @fontsource/spline-sans-mono`
- [ ] Write failing tests in `theme.test.ts`: `getInitialTheme` returns stored value; returns `'light'` when `matchMedia` is undefined; does not throw and falls back to system when localStorage getter throws; `applyTheme('dark')` sets `data-theme` and survives a throwing setter.
- [ ] Run: `pnpm --filter web exec vitest run src/lib/theme.test.ts` — expect FAIL (module missing).
- [ ] Implement `theme.ts`; make tests pass.
- [ ] Rewrite `style.css` with design.md §2 values (both themes), §4 fonts, type utilities relying on Tailwind defaults + tokens; delete all landing CSS (`.drawn`, `.room`, graph paper, keyframes…).
- [ ] `index.html`: title "Fernando Ordiales — AI Engineer", meta description, `favicon.svg` link, remove Google Fonts links and `class="scheme-dark"`, add inline theme script (reads localStorage ?? system inside try/catch, sets `data-theme` before paint).
- [ ] `main.tsx`: import the two Fontsource CSS entries (`@fontsource-variable/instrument-sans`, `@fontsource/spline-sans-mono/400.css`, `/500.css`).
- [ ] `vitest.setup.ts`: add stubs — `matchMedia` (matches `true` only for `prefers-reduced-motion: reduce`), `IntersectionObserver`, `window.scrollTo` noop.
- [ ] Replace `App.tsx` with a minimal `<main><h1>` headline placeholder; delete `src/landing` and old `App.test.tsx`; `favicon.svg`: 32px rounded square, accent trace-node dot on background color.
- [ ] Verify: `pnpm turbo run lint typecheck test --filter=web` passes; `pnpm turbo run build --filter=web` passes.
- [ ] Commit 1: `chore(web): remove template landing page`; Commit 2: `feat(web): design tokens, fonts and theme switching foundation`.

### Task 2: Router, layout chrome, page transitions

**Files:**

- Create: `apps/web/src/lib/motion.ts`, `apps/web/src/lib/meta.ts`, `apps/web/src/components/Nav.tsx`, `apps/web/src/components/Footer.tsx`, `apps/web/src/components/ThemeToggle.tsx`, `apps/web/src/components/ThemeToggle.test.tsx`, `apps/web/src/components/PageTransition.tsx`, `apps/web/src/pages/Home.tsx`, `apps/web/src/pages/Work.tsx`, `apps/web/src/pages/About.tsx`, `apps/web/src/pages/NotFound.tsx`, `apps/web/src/App.tsx` (rewrite), `apps/web/src/App.test.tsx`
- Deps: `pnpm --filter web add react-router framer-motion @phosphor-icons/react`

**Interfaces (produces):**

- `src/lib/motion.ts`: `export const easeSettle = [0.25, 1, 0.5, 1]`, `easeGlide = [0.65, 0, 0.35, 1]` (as cubic-bezier tuples) + CSS strings, `durFast = 0.15`, `durBase = 0.22`, `durSlow = 0.42`, `prefersReducedMotion(): boolean`.
- `usePageMeta(title: string, description: string): void` — sets `document.title` and the description meta tag on mount/route change.
- `App` renders `BrowserRouter` → skip link → `Nav` → `AnimatePresence mode="wait"` keyed on pathname wrapping routes `/`, `/work/:slug`, `/about`, `*` → `Footer`.
- `PageTransition` wraps each page: exit fade 150ms, enter fade+6px 280ms, instant under reduced motion; scrolls to top on enter.
- `Nav`: wordmark link "Fernando Ordiales", links Work (`/#work`-aware: on home scrolls, elsewhere routes to `/` — builder's call: plain link to `/#work`), About, `ThemeToggle`, primary `Email me` (`mailto:` from profile content, Task 3 — until then a constant).
- `ThemeToggle`: ghost icon button using `theme.ts`, `aria-label` "Switch to light/dark theme".

- [ ] Write failing `App.test.tsx`: renders h1 headline on `/`; renders NotFound text at `/work/does-not-exist` (use `MemoryRouter`-style entry — export an `AppRoutes` component taking no router for testability, `App` wraps it in `BrowserRouter`).
- [ ] Write failing `ThemeToggle.test.tsx`: starts from `data-theme`, click flips `document.documentElement.dataset.theme` and the `aria-label`.
- [ ] Run both — expect FAIL.
- [ ] Add deps; implement `motion.ts`, `meta.ts`, `PageTransition`, `Nav`, `Footer`, `ThemeToggle`, page skeletons (each calls `usePageMeta`), new `App.tsx`/`AppRoutes`.
- [ ] Run web tests — PASS. Verify dev server renders both themes (`pnpm turbo run build --filter=web`).
- [ ] Commit: `feat(web): routing, nav, footer, theme toggle and page transitions`.

### Task 3: Content data and placeholder assets

**Files:**

- Create: `apps/web/src/content/profile.ts`, `apps/web/src/content/projects.ts`, `apps/web/src/content/experience.ts`, `apps/web/src/content/content.test.ts`, `apps/web/public/projects/switchboard-1.svg` (+ flinki-1, fgp-1), `apps/web/public/resume.pdf` (minimal valid placeholder PDF saying "Placeholder — replace with the real resume")

**Interfaces (produces):**

- `profile.ts`: `export const profile = { name, role, email: 'fernando.ordiales23@gmail.com', location: 'Manila, PH', timezone: 'GMT+8', availability, links: { github: 'TODO', linkedin: 'TODO', resume: '/resume.pdf' } } as const` (TODO links render disabled-with-title until filled).
- `projects.ts`: `export type Layer = 'interface' | 'ai' | 'data' | 'infra'`; `export type Project = { slug; name; oneLiner; meta: { role; stack: string[]; year }; layers: Layer[]; problem: string; built: string[]; decisions: { what: string; why: string }[]; results: string[]; links: { live?: string; repo?: string }; images: { src: string; alt: string }[] }`; `export const projects: Project[]` — Switchboard, Flinki, FGP migration, content from design.md appendix + resume.
- `experience.ts`: `export const experience: { years: string; role: string; org: string; place: string; summary: string }[]` — Hytel, FGP.
- `export const LAYERS: { key: Layer; label: string; tools: string }[]` (order: interface, ai, data, infra) in `projects.ts` — the capabilities section and layer indicators both read it.

- [ ] Write failing `content.test.ts`: slugs unique; every project's `layers` non-empty and ⊆ LAYERS keys; every project has ≥1 image whose `src` starts `/projects/`; every image has non-empty `alt`; experience sorted newest-first.
- [ ] Run — FAIL; implement the three content files; run — PASS.
- [ ] Create the three placeholder SVGs (1200×760, surface bg, hairline border, mono caption "placeholder — drop a real screenshot at apps/web/public/projects/<name>"; neutral tokens hardcoded per file since SVGs can't read CSS vars — the one allowed exception, noted in the file).
- [ ] Hand-write the minimal placeholder `resume.pdf`.
- [ ] Commit: `feat(web): portfolio content data and placeholder assets`.

### Task 4: Homepage sections

**Files:**

- Create: `apps/web/src/sections/Hero.tsx`, `apps/web/src/sections/SelectedWork.tsx`, `apps/web/src/sections/Capabilities.tsx`, `apps/web/src/sections/Experience.tsx`, `apps/web/src/sections/Contact.tsx`, `apps/web/src/components/LayerIndicator.tsx`, `apps/web/src/components/CopyEmailButton.tsx`, `apps/web/src/components/CopyEmailButton.test.tsx`, `apps/web/src/components/Button.tsx` (primary/secondary/ghost variants as props)
- Modify: `apps/web/src/pages/Home.tsx` (compose sections, section ids: `work`, `capabilities`, `experience`, `contact`), `apps/web/src/sections/Hero.test.tsx`

**Interfaces:**

- Consumes Task 3 content and Task 2 motion tokens.
- `LayerIndicator({ layers }: { layers: Layer[] })` — 4 stacked segments per design.md §10, `title` per segment.
- `CopyEmailButton({ email }: { email: string })` — ghost button; on success swaps to "Copied" + check for 1.6s with 220ms crossfade and a polite `aria-live` region; on clipboard failure keeps label, no crash.
- Hero: load sequence per design.md §9 timeline (Framer Motion, `easeSettle`, reduced-motion → single 200ms fade); right half reserves the scene box (Task 5 fills it).

- [ ] Write failing `CopyEmailButton.test.tsx`: click with mocked `navigator.clipboard.writeText` resolving → shows "Copied" and announces; with `clipboard` undefined → click does not throw, still says "Copy email". (user-event; fake timers for the 1.6s revert.)
- [ ] Write failing `Hero.test.tsx`: renders the h1 headline text from design.md; "Email me" link has `href="mailto:fernando.ordiales23@gmail.com"`; "Download resume (PDF)" link points at `/resume.pdf`.
- [ ] Run — FAIL. Implement `Button`, sections, wire Home. Layout per design.md §6 wireframe: trace rail space on the left (the rail itself is Task 6), content left-aligned, contact email as the display-size element.
- [ ] Run web tests — PASS; `pnpm turbo run build --filter=web` passes.
- [ ] Commit: `feat(web): homepage sections — hero, work, capabilities, experience, contact`.

### Task 5: Three.js hero field with static fallback

**Files:**

- Create: `apps/web/src/three/fieldPoints.ts`, `apps/web/src/three/fieldPoints.test.ts`, `apps/web/src/three/ParticleField.tsx` (default export for `React.lazy`), `apps/web/src/three/StaticField.tsx`, `apps/web/src/three/useSceneGate.ts`
- Modify: `apps/web/src/sections/Hero.tsx`
- Deps: `pnpm --filter web add three @react-three/fiber @react-three/drei && pnpm --filter web add -D @types/three`

**Interfaces (produces):**

- `generateFieldPoints(count: number, seed: number): { x: number; y: number; z: number; accent: boolean }[]` — deterministic (mulberry32-style PRNG), positions in [-1,1]³, ~7% accent.
- `useSceneGate(): 'webgl' | 'static'` — `'static'` when reduced motion, `navigator.deviceMemory < 4`, no WebGL context, or no `window.matchMedia`.
- `StaticField` renders the same points as an inline SVG (circles, theme tokens via `currentColor`/CSS vars), `aria-hidden`.
- Hero mounts `StaticField` immediately; when gate is `'webgl'`, lazy-imports `ParticleField` on idle (`requestIdleCallback` fallback `setTimeout`) and crossfades it in over 600ms.

- [ ] Write failing `fieldPoints.test.ts`: same seed → identical output; count honored; all coords within bounds; accent fraction between 4% and 10% for count 1800.
- [ ] Run — FAIL; implement `fieldPoints.ts`; PASS.
- [ ] Add a Hero test case: under jsdom (reduced-motion stub, no WebGL) the static SVG field is in the document and no canvas is.
- [ ] Implement `useSceneGate`, `StaticField`, `ParticleField` (r3f `Canvas` with `dpr={[1, 1.5]}`, drei `Points`/`PointMaterial`, drift + ±2° cursor lerp 0.05 per design.md §9, colors read from computed CSS tokens, re-read on theme change via `MutationObserver` on `data-theme`; `frameloop="never"` + manual invalidate loop paused via IntersectionObserver and `visibilitychange`), wire Hero (700 points <768px, else 1800).
- [ ] Run web tests — PASS; `pnpm turbo run build --filter=web`; check `dist/assets`: three chunk is a separate lazy file.
- [ ] Commit: `feat(web): lazy three.js hero particle field with static SVG fallback`.

### Task 6: The GSAP trace

**Files:**

- Create: `apps/web/src/components/Trace.tsx`, `apps/web/src/components/Trace.test.tsx`
- Modify: `apps/web/src/pages/Home.tsx` (render `<Trace />` in the rail; sections expose `data-trace-node` + label)
- Deps: `pnpm --filter web add gsap`

**Interfaces:**

- `Trace()` reads node positions from `[data-trace-node]` elements (ResizeObserver re-measures), renders one SVG: track path (`--color-accent-quiet`), drawn path (`--color-accent`, 1.5px, `stroke-dashoffset` scrubbed by ScrollTrigger `scrub: 0.5` from hero bottom to contact), a 6px node per section that fills when passed, short branch paths to the four capability rows (each scrubbed as the line reaches them), terminal node at contact. Mono labels next to nodes fade muted→text.
- Reduced motion or no `matchMedia`: render everything fully drawn, no GSAP registration at all.
- Mobile (<1024px): rail sits 12px from viewport edge, labels hidden (the sections carry their own headings).

- [ ] Write failing `Trace.test.tsx`: under the reduced-motion stub, renders an `aria-hidden` SVG with one node per `data-trace-node` section and no ScrollTrigger registered (spy on `gsap.registerPlugin` not called / module not imported — simplest: assert the static variant marker attribute `data-static` is set).
- [ ] Run — FAIL; implement; PASS.
- [ ] Manual check in dev: scrub follows scroll exactly, branch draws through capabilities, ends at contact; nothing else on the page moves on scroll.
- [ ] Commit: `feat(web): scroll-drawn trace with section nodes and capability branches`.

### Task 7: Case study pages, About, 404

**Files:**

- Modify: `apps/web/src/pages/Work.tsx`, `apps/web/src/pages/About.tsx`, `apps/web/src/pages/NotFound.tsx`
- Create: `apps/web/src/components/ArchDiagram.tsx`, `apps/web/src/pages/Work.test.tsx`

**Interfaces:**

- `Work` reads `useParams().slug`, looks up `projects`; unknown slug renders `NotFound` content (route stays, 200 — SPA). Layout per design.md §6 case-study wireframe: title, mono meta line, problem/built/decisions/results prose at 68ch, screenshots in bordered panels, links, single "Next: <project> →" link cycling through `projects`.
- `ArchDiagram({ project })` — themed SVG: one box per owned layer (from `LAYERS`), hairline strokes, accent arrows, mono labels; serves as the architecture-diagram area until real diagrams replace it.
- `About`: short human paragraph (from resume facts, copy rules §12), education + bootcamps list, resume download button, email CTA.

- [ ] Write failing `Work.test.tsx`: renders name + "The problem" heading for each slug in `projects`; unknown slug shows the not-found message; next-link from last project points at first.
- [ ] Run — FAIL; implement pages + diagram; PASS.
- [ ] Commit: `feat(web): project case studies, about page and not-found`.

### Task 8: SEO, OG, sitemap, size check

**Files:**

- Modify: `apps/web/index.html` (OG/twitter meta), `apps/web/src/lib/meta.ts` (per-route og:title/description sync)
- Create: `apps/web/public/og.svg` (1200×630, dark variant, name + headline), `apps/web/public/robots.txt`, `apps/web/public/sitemap.xml` (the 5 routes, TODO-domain noted), attempt `apps/web/public/og.png` via `sips`/`qlmanage` from og.svg — if the conversion tool is unavailable, keep og.svg referenced and note the TODO in docs 06.

- [ ] Add meta tags; generate assets; `pnpm turbo run build --filter=web`.
- [ ] Verify budget: gzip sizes of `dist/assets/*.js` — initial (non-three) chunks ≤ 180KB gz total; record actuals in the commit message? No — record in docs 06 status table.
- [ ] Commit: `feat(web): seo meta, open graph assets, robots and sitemap`.

### Task 9: Docs sync, README, precheck

**Files:**

- Modify: `docs/01-product-requirements.md`, `02-technical-requirements.md`, `03-app-flow.md`, `04-design-brief.md` (point at design.md + fill token/typography tables), `05-database-schema.md` (N/A — no data stored), `06-implementation-plan.md` (link this plan + status), `README.md` (project is now the portfolio; remove landing-page guide references), `CLAUDE.md` repo-map line about `src/landing`.

- [ ] Fill each doc briefly (Prototype length), status `Draft`, owner Fernando; note design.md approval date.
- [ ] Update README + CLAUDE.md repo map (landing page gone; portfolio structure in its place).
- [ ] Run `pnpm precheck` from the root; fix anything it raises; re-run until green.
- [ ] Commit: `docs: fill planning docs and align README with the portfolio app`.
