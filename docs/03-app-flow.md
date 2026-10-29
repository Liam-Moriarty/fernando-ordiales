# 03 · App flow

**Status:** Draft · **Owner:** Fernando Ordiales · **Approved by:** pending ·
**Date:** 2026-10-29

What happens when someone clicks. Wireframes live in `design.md` §6.

## Screens

| Screen     | URL           | Who can see it | What it's for                                          |
| ---------- | ------------- | -------------- | ------------------------------------------------------ |
| Home       | `/`           | Everyone       | Hero, selected work, capabilities, experience, contact |
| Case study | `/work/:slug` | Everyone       | One project: problem, build, decisions, results        |
| About      | `/about`      | Everyone       | Short bio, education, resume download                  |
| Not found  | anything else | Everyone       | Plain message + link home                              |

## Flows

### Flow 1 · Contact by email (the primary goal)

- **Who:** Visitor
- **Starts at:** anywhere — the nav's "Email me" is on every screen
- **Steps:** click any "Email me" (nav, hero, contact) → a compose dialog
  opens with Subject and Message; Send relays the message to Fernando's
  inbox through FormSubmit and confirms "Sent" in the dialog (Cancel, Escape
  or the backdrop closes it). The contact section's big address stays a
  plain mailto, and "Copy email" confirms "Copied" for 1.6s.
- **On failure:** the relay unreachable → the dialog keeps the draft and
  offers a prefilled "open in your mail app" mailto link. Clipboard
  unavailable or denied → the button stays "Copy email", nothing breaks; the
  address is visible as text.
- **One-time setup:** the first message ever sent makes FormSubmit email
  Fernando an activation link; delivery starts once he confirms it.

### Flow 2 · Read a case study

- **Who:** Visitor
- **Steps:** home → a "Selected work" row or a "More projects" link →
  `/work/:slug` → "← Work" returns to `/#work`; "Next: <project>" cycles
  through all projects.
- **Gallery:** drag or flick the top card (Tinder-style) to see the next
  screenshot; Previous/Next buttons and a counter cover keyboard and
  reduced-motion users. Swiping never means accept/reject.
- **Live links:** "Visit live site" / "Source code" buttons appear when the
  project has them.
- **Unknown slug:** the not-found page with a link home (no crash, no blank).

### Flow 3 · Theme

- **Steps:** first visit follows the system theme with no flash (inline head
  script); the toggle flips it and persists in `localStorage`; blocked
  storage falls back to the system preference for the visit.

### Flow 4 · Motion fallbacks

- `prefers-reduced-motion`, no WebGL, or low device memory → static SVG field
  instead of the Three.js canvas, trace rendered fully drawn, transitions
  become plain fades. Nothing requires motion to be usable.
