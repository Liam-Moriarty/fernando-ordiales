# Fernando Ordiales — portfolio

The personal portfolio of Fernando Ordiales, AI engineer: a React SPA in
`apps/web` with light/dark themes, a scroll-drawn "trace" (GSAP), a lazy
Three.js hero field, and case-study pages. The visual spec is
[`design.md`](design.md); the planning docs in [`docs/`](docs/README.md)
record what was built and what's still open.

The repo is built on a pnpm + Turborepo template: React 19, Vite 8,
TypeScript 7, Tailwind CSS 4, Vitest 5, shared lint/TS configs, git hooks
that enforce conventional commits, Changesets, and GitHub Actions for CI and
PR previews. [`CLAUDE.md`](CLAUDE.md) keeps AI-assisted work sized to the
project stage.

## Finishing the site (content still owned by Fernando)

- Images live one folder per project under `public/projects/<slug>/`; drop
  raw originals in `apps/web/public/project-photos/` (git-ignored) and serve
  resized copies.
- Live/repo links for the three MERN projects in `projects.ts`; production
  domain in `public/sitemap.xml`, `public/robots.txt` and the `og:image` tag
  in `apps/web/index.html`.

The full list with checkboxes:
[`docs/06-implementation-plan.md`](docs/06-implementation-plan.md).

## Requirements

- **Node.js 26**, pinned in [`.nvmrc`](.nvmrc). With nvm: `nvm install` then
  `nvm use`.
- **pnpm 10**, pinned to 10.34.9 in the `packageManager` field of
  `package.json`. Node 25 and later no longer ship Corepack, so install it with
  `npm install -g pnpm@10.34.9`. If you already have pnpm 10, it switches to
  the pinned version by itself.

## Quick start

```sh
git clone <your-repo-url> my-app
cd my-app
nvm use
pnpm install   # also installs the git hooks
pnpm dev       # web app on http://localhost:5173
```

The page it opens is the portfolio itself.

## Remaining repo setup

- [ ] Approve the six docs in [`docs/`](docs/README.md) (drafted 2026-10-29).
- [ ] Put local settings in `apps/web/.env.local` (git-ignored). See
      [Environment variables](#environment-variables).
- [ ] For pull request previews, add the repository secrets `VERCEL_TOKEN`,
      `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`. Without them the preview job
      builds and skips the deploy. Dependabot PRs always skip it.
- [ ] For the CD workflows, create the GitHub environments `development`,
      `staging` and `production`. Add the repository variables `DEV_URL`,
      `STAGE_URL`, `PROD_URL` and the repository secrets `DEV_API_URL`,
      `STAGE_API_URL`, `PROD_API_URL`. Give `production` required reviewers.
- [ ] Pick a deploy target in each `cd-*.yml` workflow. Until you uncomment
      one of the options, they build and print success but deploy nothing.
- [ ] Let the release workflow open pull requests: Settings → Actions →
      General → Workflow permissions → allow GitHub Actions to create and
      approve pull requests.
- [ ] Protect `main` and require the CI check to pass. Create `dev` and
      `stage` branches if you use them.
- [ ] Turn on secret scanning and push protection in the repository's
      security settings.

## What's inside

```text
.
├── apps/
│   ├── web/                 the portfolio: React 19 + Vite 8 + Tailwind CSS 4 SPA
│   └── server/              placeholder, not a workspace package yet
├── packages/
│   ├── ui/                  @repo/ui: shared React components
│   ├── eslint-config/       @repo/eslint-config: shared ESLint rules
│   └── typescript-config/   @repo/typescript-config: shared tsconfigs
├── docs/                    the six planning docs and a commit cheat sheet
├── .changeset/              Changesets config
├── .github/                 workflows, shared setup action, Dependabot
├── .husky/                  git hooks
├── CLAUDE.md                rules for AI-assisted work in this repo
├── .nvmrc                   Node version, read by every workflow
└── turbo.json               task pipeline
```

| Area         | Tools                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------ |
| Monorepo     | pnpm 10 workspaces with a version catalog, Turborepo 2                                           |
| Frontend     | React 19, Vite 8, `@vitejs/plugin-react` 6                                                       |
| Styling      | Tailwind CSS 4 with `@tailwindcss/vite`, configured in CSS (no `tailwind.config.js`)             |
| Language     | TypeScript 7                                                                                     |
| Testing      | Vitest 5, Testing Library, jsdom                                                                 |
| Code quality | ESLint 10 (flat config) with typescript-eslint 8 and react-hooks rules, Prettier 3, EditorConfig |
| Git          | Husky 9, lint-staged, commitlint                                                                 |
| Releases     | Changesets                                                                                       |
| CI/CD        | GitHub Actions, Vercel previews                                                                  |
| Database     | Supabase (planned; added when the first feature needs it)                                        |

## Scripts

Run these from the repository root.

| Command                 | What it does                                                 |
| ----------------------- | ------------------------------------------------------------ |
| `pnpm dev`              | Starts every app in dev mode                                 |
| `pnpm build`            | Builds everything; typecheck and tests run first             |
| `pnpm lint`             | Lints every package                                          |
| `pnpm typecheck`        | Type-checks every package                                    |
| `pnpm test`             | Runs every package's tests                                   |
| `pnpm precheck`         | Lint, typecheck, test and build. Run it before opening a PR. |
| `pnpm format`           | Formats the whole repo with Prettier                         |
| `pnpm changeset`        | Records a version bump for a package in `packages/`          |
| `pnpm version-packages` | Applies changesets (the release workflow normally does this) |

One package or one test file:

```sh
pnpm turbo run test --filter=web
pnpm --filter web exec vitest run src/App.test.tsx
```

Tests sit next to the code as `*.test.ts` or `*.test.tsx` and run in jsdom
with [Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

## Day-to-day workflow

### Branches and deploys

| Event                              | What runs                                                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Pull request into `main`           | CI (install, lint, typecheck, build, test) and a Vercel preview                                                  |
| Pull request into `dev` or `stage` | Vercel preview                                                                                                   |
| Push to `dev`                      | CD — Dev: checks, build, deploy step                                                                             |
| Push to `stage`                    | CD — Stage: checks, then deploy step                                                                             |
| Push to `main`                     | CI; CD — Production (checks, then deploy after approval); Release (opens the version PR if there are changesets) |
| Every week                         | Dependabot: one PR for minor and patch updates, one per major, one for GitHub Actions                            |

### Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org)
and commitlint rejects anything else:

```text
type(optional-scope): subject in lowercase
```

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
  `ci`, `chore`, `revert`, `wip`.
- Start the subject with a lowercase word, acronyms included:
  `ci: fix the release step`, not `fix: CI release step`.
- Header up to 100 characters, no full stop at the end.

### Git hooks

| Hook            | What it does                                                         |
| --------------- | -------------------------------------------------------------------- |
| `pre-commit`    | lint-staged: ESLint and Prettier on staged files                     |
| `commit-msg`    | commitlint checks the message                                        |
| `pre-push`      | Tests and typecheck for everything not yet pushed, plus dependents   |
| `pre-rebase`    | Blocks rebasing while on `main`                                      |
| `post-merge`    | Reinstalls dependencies if `pnpm-lock.yaml` changed                  |
| `post-checkout` | Reinstalls dependencies if `pnpm-lock.yaml` changed between branches |

### Versioning packages

Packages in `packages/` are versioned with Changesets; `web` isn't. After
changing a package, run `pnpm changeset`, describe the change, and commit the
generated file. When it reaches `main`, the release workflow opens a
`chore: release packages` pull request that bumps the versions.

## Environment variables

- Local values go in `apps/web/.env.local`, which git ignores. Read them in
  code with `import.meta.env.VITE_*`.
- **Anything prefixed `VITE_` is built into the browser bundle and is
  public.** Never put a secret in one; secrets belong in server-side code.
- The CD workflows pass `VITE_APP_ENV` and `VITE_API_URL` to the build.
- Turborepo runs tasks in strict env mode. A variable that isn't `VITE_*` must
  be listed in `turbo.json` (`env` or `globalEnv`), or the build won't see it.

## Dependency versions

Any dependency used by more than one package has a single version, in the
`catalog` section of [`pnpm-workspace.yaml`](pnpm-workspace.yaml). Packages
refer to it as `"catalog:"` instead of a version range:

```json
"react": "catalog:"
```

To upgrade React, TypeScript, Vite, Vitest or ESLint everywhere, change the
version in the catalog and run `pnpm install`. Dependabot updates the catalog
the same way.

## Changing the shared UI package

`@repo/ui` ships as source. Its `exports` point at `.ts` and `.tsx` files,
`web` links it with `workspace:*`, and Vite compiles it as part of the app. So
there's no build step, and edits in `packages/ui` show up in `web` straight
away.

To add a component, create it in `packages/ui/components/` with a test next
to it, and export it from `components/index.ts`. A change there can break
`web`, which is why `pre-push` and CI check both.

Components are styled with Tailwind classes. Tailwind only generates the
classes it finds in the files it scans, and it skips `node_modules`, where
`web` links `@repo/ui`. So [`apps/web/src/style.css`](apps/web/src/style.css)
points it at the package source:

```css
@import 'tailwindcss';
@source '../../../packages/ui';
```

The portfolio doesn't import `@repo/ui` right now, so `apps/web/src/style.css`
has no `@source` line — add it back (with the dependency) the first time `web`
uses a shared component, or those components render unstyled. Colours, fonts
and the other design tokens live in that file's `@theme` block; see the
[design brief](docs/04-design-brief.md) and [`design.md`](design.md).

## Adding Supabase

Supabase is the planned database and auth provider. It isn't installed yet;
add it when the first feature needs it, following
[`docs/05-database-schema.md`](docs/05-database-schema.md):

- Install `@supabase/supabase-js` in `apps/web` and create the client in a
  single module.
- Put `VITE_SUPABASE_URL` and the publishable (anon) key in `.env.local`. The
  `service_role` / secret key never goes in a `VITE_` variable or in
  `apps/web`.
- Keep schema changes as SQL migrations in `supabase/migrations/`, with
  row-level security on every table.

[`CLAUDE.md`](CLAUDE.md) has the full list of rules.

## Working with Claude Code

[`CLAUDE.md`](CLAUDE.md) tells Claude how to work here. It covers the project
stage, simplicity rules (KISS, YAGNI, rule of three), a security baseline
that applies at every stage, and the extra checklists for MVP and Production.
Claude reads the planning docs before building a feature and stops to ask when
one is missing or unapproved. Keep the stage line current.

## Known limitations

- pnpm stays on 10 on purpose. pnpm 11 and 12 write a two-part
  `pnpm-lock.yaml` that GitHub's dependency graph can't read yet
  ([dependabot-core#15904](https://github.com/dependabot/dependabot-core/issues/15904)),
  which would stop Dependabot security alerts. pnpm 12 also has a reported
  install bug on Vercel. Revisit once both are fixed.
- `apps/server` is an empty placeholder.
