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
  relays through FormSubmit (formsubmit.co/ajax, no account or key — the
  address is already public on the page) straight to Fernando's inbox, with
  a prefilled mailto as the in-dialog fallback when the relay is
  unreachable. Chosen over mailto alone after it dead-ended on machines
  with no configured mail app. Sends as FormData in `no-cors` mode: a JSON
  body hit a CORS preflight FormSubmit can't answer, and even plain
  responses carry no CORS headers — the false "Couldn't send" came from the
  browser blocking the response read on messages that had been delivered.
- Hero copy finalized: headline "I take AI products from idea to
  production" (no period); the support line is Fernando's own text in
  `profile.ts` (tests assert it renders, not its wording). OG image
  regenerated to match the headline.
- Fernando's studio portrait (`public/pfp.jpg`, served resized as
  `public/portrait.jpg`): round avatar above the hero headline, full
  portrait beside the About bio.
- The hero's right column is an identity card modeled on Fernando's
  reference: availability pill, large lavender-duotone photo (`pfp-2.jpg`),
  Spotify strip (play/EQ bars, "Idea to Production", 2021→now), email,
  location, social buttons, full-width Email me CTA. The round avatar above
  the headline was removed at his request, and the particle field moved to
  the right of the Contact section (`FieldScene`, same gating/fallbacks).
- "Visit live site" / "Source code" buttons open in a new tab; About's
  "Email me" now opens the compose modal like everywhere else.
- The theme toggle crossfades through the View Transitions API (CSS
  transition fallback hardened with !important; Three.js palette lerped in
  useFrame) after Fernando's recording showed the nav, body and canvas
  changing out of step.
- Case studies carry the old portfolio's links rail: Live URL / Repository
  rows with honest muted placeholders when nothing is public. Repo links
  added from Fernando's GitHub: fgp-official-website (FGP),
  budget-trackerv2 (budget tracker), Todo-List (task monitoring — the MERN +
  RTK Query description matches; **Fernando: confirm this is the right
  repo**). Sales dashboard has no identifiable public repo yet.
- Resume downloads point at `/docs/Ordiales-Fernando-Resume.pdf` (the real
  PDF); the placeholder was removed. GitHub URL is set in `profile.ts`.

## Still open (needs Fernando)

- [ ] **Consider swapping the email relay to Web3Forms.** FormSubmit's
      responses carry no CORS headers, so the form sends in `no-cors` mode
      and cannot see the relay's answer — and the service returned HTTP 521
      repeatedly during live checks (2026-10-29 evening), meaning a "Sent"
      can silently go undelivered while it's down. Web3Forms
      (web3forms.com, free) has a proper CORS API with readable success:
      get an access key with your email and it's a one-line endpoint/payload
      swap in `EmailButton.tsx`. Until then, test the form occasionally.
- [ ] Confirm the Todo-List repo really is the task-monitoring project; add
      a repo for the sales dashboard and live URLs once deployed (`links` in
      `projects.ts`).
- [ ] Confirm employer/client approval for Switchboard and Flinki imagery
      before publishing.
- [ ] Production domain: replace `REPLACE-WITH-DOMAIN` in
      `public/sitemap.xml`, un-comment the sitemap line in
      `public/robots.txt`, and make `og:image` absolute in `index.html`
      (add the four legacy case-study URLs to the sitemap too).
- [x] Enable a deploy — Fernando deployed to Vercel himself
      (ordiales.vercel.app, 2026-10-29); the CD workflows stay inert.
      `apps/web/vercel.json` rewrites every path to `index.html` so client
      routes survive a refresh; the Vercel project's Root Directory must be
      `apps/web` for that file to be read.
- [ ] Approve docs 01–06 and flip their status lines.

## Named gaps (deliberate, later-stage)

- Per-route social previews need prerender/SSG — out of scope at Prototype
  (decision log in 02).
- Lighthouse was not run in CI; budgets were enforced by measured bundle
  sizes instead.
