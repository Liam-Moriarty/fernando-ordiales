# 05 · Database schema

**Status:** Draft · **Owner:** Fernando Ordiales · **Approved by:** pending ·
**Date:** 2026-10-29

What data the app stores, where it lives, and who can see each part of it.

## Data we keep

**None.** The portfolio stores no user data at all:

- No sign-in, no accounts, no sessions, no cookies.
- No contact form — contact is a `mailto:` link and a clipboard copy, so no
  message ever passes through or rests in this app.
- No analytics (none at Prototype stage; adding any later means revisiting
  this document first).
- Site content (projects, experience, profile) is static TypeScript in
  `apps/web/src/content/`, compiled into the public bundle. All of it is
  public by design.
- The only browser storage is `localStorage['theme']` — a UI preference on
  the visitor's own device, never transmitted.

## Where it lives

- **Database:** none. Supabase is not installed; nothing needs it.
- If a feature ever needs storage (a contact form, analytics, a CMS), this
  document gets filled in first, with RLS per the Baseline in
  [`CLAUDE.md`](../CLAUDE.md), and the stage likely moves past Prototype.

## Access rules

Not applicable — there is no stored data to protect. The IDOR/RLS checklist
in `CLAUDE.md` applies from the first table that ever gets created.
