# 01 · Product requirements

**Status:** Draft · **Owner:** Fernando Ordiales · **Approved by:** pending ·
**Date:** 2026-10-29

What the app does, feature by feature. If a feature isn't in this document, it
isn't in the build.

## Summary

A personal portfolio for Fernando Ordiales, AI engineer. It shows recruiters,
hiring managers and founders what he builds — AI products end to end — and
funnels every visit toward one action: emailing him. The full design rationale
lives in [`design.md`](../design.md) (approved 2026-10-29).

## Goals

- A visitor understands who Fernando is, what he builds, and how to contact
  him within the first screen.
- The email action is reachable in one click from anywhere on the site.
- Each featured project shows which layers of the stack he owned.

## Users

| Role    | Who they are                                  | What they're trying to do              |
| ------- | --------------------------------------------- | -------------------------------------- |
| Visitor | Recruiters, hiring managers, founders/clients | Judge his work quickly and contact him |

One anonymous role; there is no sign-in and no stored user data.

## Features

### F1 · Hero with contact actions

- **Used by:** Visitor
- **Priority:** Must
- **Done when:**
  - [x] Headline, support line, "Email me" (mailto), "Download resume (PDF)"
        and "View work" render before any script-heavy visual loads.

### F2 · Selected work rows with layer indicators

- **Used by:** Visitor
- **Priority:** Must
- **Done when:**
  - [x] The three featured projects render as full-width rows; each shows a
        4-segment layer indicator of the stack layers Fernando owned; the
        whole row links to the case study.
  - [x] A compact "More projects" list links the four earlier projects to
        their case studies.

### F3 · Case study pages (`/work/:slug`)

- **Used by:** Visitor
- **Priority:** Must
- **Done when:**
  - [x] Problem, what I built, key decisions, results, architecture diagram
        and screenshots render per project; unknown slugs show the
        not-found page.
  - [x] The stack renders as chips, with "Visit live site" and "Source
        code" buttons when a project has those links.
  - [x] Multi-image galleries browse as a Tinder-style swipe deck (drag or
        flick to move on, buttons + counter as the keyboard path), with no
        accept/reject semantics.

### F4 · Capabilities as one connected system

- **Used by:** Visitor
- **Priority:** Must
- **Done when:**
  - [x] The four stack layers render as rows joined by the trace, not as
        separate cards.

### F5 · Experience timeline and About page

- **Used by:** Visitor
- **Priority:** Should
- **Done when:**
  - [x] Experience lists roles newest first; `/about` has a short bio,
        education and the resume download.

### F6 · Contact section

- **Used by:** Visitor
- **Priority:** Must
- **Done when:**
  - [x] Email shown in display size, mailto button, copy-email button with a
        "Copied" confirmation that fails quietly when the clipboard is
        unavailable, availability line.

### F7 · Theme toggle and signature motion

- **Used by:** Visitor
- **Priority:** Should
- **Done when:**
  - [x] Light/dark themes follow the system, persist the choice and never
        flash; the scroll-drawn trace and the lazy Three.js field degrade to
        static variants under reduced motion or weak devices.
