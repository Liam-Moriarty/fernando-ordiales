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

## Added after the first build (2026-10-29, Fernando's requests)

- Images live in per-project folders: `public/projects/<slug>/…`. Raw drops
  go in `public/project-photos/<project>/` (git-ignored); resized copies are
  served. Flinki (8) and Switchboard (6) real screenshots are in.
- Case-study galleries are a Tinder-style swipe deck (`SwipeDeck`): drag or
  flick a card to browse, buttons and a counter for keyboard users; swiping
  carries no accept/reject meaning.
- Four earlier projects from the old portfolio (custom playlist site, task
  monitoring, budget tracker, sales dashboard) have case studies and sit in
  a "More projects" list under Selected work; images copied from
  `original-portfolio` into their own folders.
- Case studies show the stack as chips plus "Visit live site" / "Source
  code" buttons when links exist (per the old site's pattern).
- The hero particle field is mouse-draggable; the auto-drift never stops.
- A Tech stack section (resume's full skills inventory, grouped, with brand
  icons via react-icons that stay grayscale until hovered) and a Training &
  internships list under Experience (Digiplus internship, both Hytel
  bootcamps; the resume gives them no dates, so none are shown). Initial JS
  rose to 163.9 KB gz — still under the 180 KB budget.
- "Email me" opens a compose dialog (Subject/Message, Cancel/Send); Send
  prefills the visitor's mail app via mailto. True in-page sending needs a
  form service or server — named, not built (Prototype).
- Case studies carry the old portfolio's links rail: Live URL / Repository
  rows with honest muted placeholders when nothing is public. Repo links
  added from Fernando's GitHub: fgp-official-website (FGP),
  budget-trackerv2 (budget tracker), Todo-List (task monitoring — the MERN +
  RTK Query description matches; **Fernando: confirm this is the right
  repo**). Sales dashboard has no identifiable public repo yet.
- Resume downloads point at `/docs/Ordiales-Fernando-Resume.pdf` (the real
  PDF); the placeholder was removed. GitHub URL is set in `profile.ts`.

## Still open (needs Fernando)

- [ ] Confirm the Todo-List repo really is the task-monitoring project; add
      a repo for the sales dashboard and live URLs once deployed (`links` in
      `projects.ts`).
- [ ] Confirm employer/client approval for Switchboard and Flinki imagery
      before publishing.
- [ ] Production domain: replace `REPLACE-WITH-DOMAIN` in
      `public/sitemap.xml`, un-comment the sitemap line in
      `public/robots.txt`, and make `og:image` absolute in `index.html`
      (add the four legacy case-study URLs to the sitemap too).
- [ ] Enable a deploy (the CD workflows stay inert until chosen).
- [ ] Approve docs 01–06 and flip their status lines.

## Named gaps (deliberate, later-stage)

- Per-route social previews need prerender/SSG — out of scope at Prototype
  (decision log in 02).
- Lighthouse was not run in CI; budgets were enforced by measured bundle
  sizes instead.
