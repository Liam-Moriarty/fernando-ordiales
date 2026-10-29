# 02 · Technical requirements

**Status:** Draft · **Owner:** Fernando Ordiales · **Approved by:** pending ·
**Date:** 2026-10-29

What the app is built on, where it runs, and which systems it connects to.

## Platform

| Area              | Choice                                                  | Notes                                                       |
| ----------------- | ------------------------------------------------------- | ----------------------------------------------------------- |
| Frontend          | React 19, Vite 8, TypeScript 7                          | Single-page app in `apps/web`                               |
| Styling           | Tailwind CSS 4                                          | Tokens in `apps/web/src/style.css` `@theme`; no config file |
| Routing           | react-router 7                                          | `/`, `/work/:slug`, `/about`, catch-all                     |
| Motion            | framer-motion (UI), GSAP ScrollTrigger (the trace only) | Division of labour per `design.md` §9                       |
| 3D                | three + @react-three/fiber                              | One lazy hero scene with a static SVG fallback              |
| Fonts             | Fontsource (Instrument Sans Variable, Spline Sans Mono) | Self-hosted, no runtime Google Fonts                        |
| Icons             | @phosphor-icons/react                                   | Functional icons only                                       |
| Monorepo          | pnpm 10 workspaces, Turborepo 2                         |                                                             |
| Runtime           | Node.js 26                                              | Pinned in `.nvmrc`                                          |
| Testing           | Vitest 5, Testing Library                               |                                                             |
| Database and auth | Not needed                                              | No user data is stored; contact is a mailto                 |
| Hosting           | Vercel (PR previews wired)                              | Production deploy not enabled yet; domain TBD               |
| Server code       | None                                                    | Nothing needs a secret or a webhook                         |

## Project stage

**Prototype.** Static personal site, no user data, no uptime promise. The same
value is in the stage line of [`CLAUDE.md`](../CLAUDE.md).

## Environments

| Environment | URL                   | Git branch | Notes                |
| ----------- | --------------------- | ---------- | -------------------- |
| Local       | http://localhost:5173 | any        |                      |
| PR preview  | per-PR Vercel URL     | PRs        | needs Vercel secrets |

## Decision log

- **Pure SPA, no prerender/SSG.** Per-route social previews would need a
  build-time prerender; at Prototype stage the site ships site-wide OG meta in
  `index.html` instead. Revisit if link previews per case study start to
  matter.
- **Bundle budgets (gzip, measured 2026-10-29):** initial JS 137.5 KB
  (budget 180), gsap + ScrollTrigger 44.5 KB (lazy, homepage only),
  ParticleField 239.6 KB (lazy, idle-loaded, never render-blocking).
- **`@repo/ui` removed from `web`'s dependencies** — the portfolio doesn't
  import it. The package remains in the repo for future shared components.
