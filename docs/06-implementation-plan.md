# 06 · Implementation plan

**Status:** Draft · **Owner:** Fernando Ordiales · **Approved by:** pending ·
**Date:** 2026-10-29

What gets built in what order. The detailed task-by-task plan (with tests and
commits per task) is
[`docs/superpowers/plans/2026-10-29-portfolio-site.md`](superpowers/plans/2026-10-29-portfolio-site.md),
executed 2026-10-29 against the approved [`design.md`](../design.md).

## Build order (all complete)

| #   | Task                                                     | Landed in commit(s) |
| --- | -------------------------------------------------------- | ------------------- |
| 1   | Tokens, fonts, theme switching; template landing removed | `41d19ab`           |
| 2   | Routing, nav, footer, theme toggle, page transitions     | `5dbc693`           |
| 3   | Content data + placeholder assets (images, resume)       | `2f3d6f2`           |
| 4   | Homepage sections                                        | `c96629b`           |
| 5   | Lazy Three.js field + static fallback                    | `0386e73`           |
| 6   | GSAP scroll-drawn trace                                  | `e434531`           |
| 7   | Case studies, About, 404                                 | `6ea5ad2`           |
| 8   | SEO meta, OG image, robots, sitemap                      | `4a6c219`           |
| 9   | Docs sync, README                                        | this change         |

Verified: 28 Vitest tests green, `pnpm precheck` green, visual pass in
headless Chromium (both themes, trace scrub, case study, 390px mobile, no
console errors). Bundle sizes are logged in
[02](02-technical-requirements.md).

## Still open (needs Fernando)

- [ ] GitHub and LinkedIn URLs in `apps/web/src/content/profile.ts` (empty
      links are hidden until filled).
- [ ] Real screenshots for Switchboard and FGP over the placeholders in
      `apps/web/public/projects/` (same filenames, or edit `images[].src` in
      `apps/web/src/content/projects.ts`). Flinki's eight screenshots are in
      (from `project-photos/`, resized to `/projects/flinki-N.jpg`; the raw
      drops folder is git-ignored). Check employer/client approval for
      Switchboard and Flinki imagery before publishing.
- [ ] The real resume at `apps/web/public/resume.pdf`.
- [ ] Project links/metrics in `projects.ts` (`links.live`, `links.repo`).
- [ ] Production domain: replace `REPLACE-WITH-DOMAIN` in
      `public/sitemap.xml`, un-comment the sitemap line in
      `public/robots.txt`, and make `og:image` absolute in `index.html`.
- [ ] Enable a deploy (the CD workflows stay inert until chosen).
- [ ] Approve docs 01–06 and flip their status lines.

## Named gaps (deliberate, later-stage)

- Per-route social previews need prerender/SSG — out of scope at Prototype
  (decision log in 02).
- Lighthouse was not run in CI; budgets were enforced by measured bundle
  sizes instead.
