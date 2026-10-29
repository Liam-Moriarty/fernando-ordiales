export type Layer = 'interface' | 'ai' | 'data' | 'infra';

// Order matters: it is the top-to-bottom order of the capabilities diagram
// and of every layer indicator (design.md §6).
export const LAYERS: { key: Layer; label: string; tools: string }[] = [
  {
    key: 'interface',
    label: 'interface',
    tools: 'React, Next.js, Flutter, Tailwind',
  },
  {
    key: 'ai',
    label: 'ai layer',
    tools: 'Vertex AI, Gemini, Genkit, RAG, evals',
  },
  {
    key: 'data',
    label: 'apis & data',
    tools: 'Node.js, FastAPI, PostgreSQL, Redis, Firestore',
  },
  {
    key: 'infra',
    label: 'infrastructure',
    tools: 'GCP, Docker, Kubernetes, GitHub Actions',
  },
];

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  meta: { role: string; stack: string[]; year: string };
  layers: Layer[];
  problem: string;
  built: string[];
  decisions: { what: string; why: string }[];
  results: string[];
  links: { live?: string; repo?: string };
  images: { src: string; alt: string; width: number; height: number }[];
};

export const projects: Project[] = [
  {
    slug: 'switchboard',
    name: 'Switchboard',
    oneLiner:
      'Project management where the AI does the heavy lifting: it plans projects, manages tickets and reports on sprints.',
    meta: {
      role: 'Led the AI modernization',
      stack: ['Vertex AI', 'React', 'Node.js', 'GCP'],
      year: '2026',
    },
    layers: ['interface', 'ai', 'data', 'infra'],
    problem:
      'Switchboard was a conventional project-management app. The goal was to rebuild it as an AI-first product — one where planning a project, grooming tickets and reporting on a sprint are things the AI does with you, not forms you fill in — without making the existing app harder to use.',
    built: [
      'A global AI chat agent wired to 29 tools, able to read and act on projects, tickets and sprints from anywhere in the product',
      'The AI Project Planner, which turns a goal into a structured breakdown of epics and tickets',
      'AI observability for every model call — latency, cost, traces — published as an npm package',
      'An AI evaluation suite and a playground for testing prompt changes before they ship',
    ],
    decisions: [
      {
        what: 'One global agent with many tools, not an assistant per feature',
        why: 'A single entry point keeps the mental model simple, and every new feature only has to expose a tool, not build a chat.',
      },
      {
        what: 'Observability before more AI features',
        why: 'Model calls you cannot trace are calls you cannot debug, evaluate or price. The npm package made that reusable beyond Switchboard.',
      },
    ],
    results: [
      '29 tools live in the global agent',
      'The observability layer shipped as its own npm package',
      'Prompt changes go through the evaluation suite instead of straight to users',
    ],
    links: {},
    images: [
      {
        src: '/projects/switchboard-1.svg',
        alt: 'Placeholder for a Switchboard screenshot: the global AI chat planning a sprint.',
        width: 1200,
        height: 760,
      },
    ],
  },
  {
    slug: 'flinki',
    name: 'Flinki',
    oneLiner:
      'A social app where athletes keep a verified record of their races, medals and training.',
    meta: {
      role: 'Led mobile development; built the AI layer',
      stack: ['Flutter', 'Vertex AI', 'Gemini', 'Genkit'],
      year: '2026',
    },
    layers: ['interface', 'ai', 'data'],
    problem:
      "An athlete's history lives scattered across race sites, wearables and photo rolls. Flinki gives it one verified home — and needed AI to take the typing out of building that record.",
    built: [
      'The Flutter app for iOS and Android, connected to wearables like Garmin and Apple Health',
      'The AI layer from scratch on Google Vertex AI, using Gemini through Genkit',
      '"Find Me Online" — an AI search that finds an athlete\'s past results on the web from their profile',
      'Speech-to-text and AI-written bios in onboarding, and AI-generated images for achievement posts',
    ],
    decisions: [
      {
        what: 'Genkit flows instead of hand-rolled model calls',
        why: 'Typed, traceable flows made each AI feature testable on its own and debuggable in production.',
      },
      {
        what: 'The AI drafts, the athlete approves',
        why: 'A verified record only stays trustworthy if a human signs off on everything that enters it.',
      },
    ],
    results: [
      'One Flutter codebase shipping to both app stores',
      'Four AI features across onboarding and posting',
      'Verified achievements backed by wearable data',
    ],
    links: {},
    images: [
      {
        src: '/projects/flinki-1.jpg',
        alt: "Fernando's verified Flinki profile with the achievements list and an Add Achievement action.",
        width: 860,
        height: 1864,
      },
      {
        src: '/projects/flinki-6.jpg',
        alt: 'Flinki recognising a half marathon from a Garmin activity and offering to add it to the profile.',
        width: 860,
        height: 1864,
      },
      {
        src: '/projects/flinki-8.jpg',
        alt: 'Live tracking during a run: the route drawing in real time with distance and duration.',
        width: 860,
        height: 1864,
      },
      {
        src: '/projects/flinki-3.jpg',
        alt: 'A verified hike post — Mt Apo foothills, 14.8 km with elevation — the route drawn over satellite imagery.',
        width: 860,
        height: 1864,
      },
      {
        src: '/projects/flinki-2.jpg',
        alt: 'The feed: verified walk and Garmin-tracked ride posts, each with a route map and stats.',
        width: 860,
        height: 1864,
      },
      {
        src: '/projects/flinki-7.jpg',
        alt: 'Activity detail with a 3D satellite flythrough of a running circuit.',
        width: 860,
        height: 1864,
      },
      {
        src: '/projects/flinki-4.jpg',
        alt: 'The map tab: achievement pins clustered on a 3D globe over Southeast Asia.',
        width: 860,
        height: 1864,
      },
      {
        src: '/projects/flinki-5.jpg',
        alt: 'The map tab zoomed to the Philippines, achievements clustered by city.',
        width: 860,
        height: 1864,
      },
    ],
  },
  {
    slug: 'fgp-migration',
    name: 'FGP platform migration',
    oneLiner:
      'Moved a company site off WordPress onto a modern stack with real APIs, containers and CI/CD.',
    meta: {
      role: 'Led the migration',
      stack: ['Node.js', 'Docker', 'GitHub Actions'],
      year: '2025',
    },
    layers: ['interface', 'data', 'infra'],
    problem:
      'The site had outgrown WordPress: every content change needed a developer, nothing was tested, and deployment meant copying files and hoping.',
    built: [
      'RESTful APIs for dynamic content, data management and frontend–backend communication',
      'Dockerized frontend and backend so development and production environments match',
      'CI/CD pipelines on GitHub Actions: build, unit tests and deployment on every push',
      'A Git and GitHub review workflow for the team',
    ],
    decisions: [
      {
        what: 'A boring, well-documented stack over a trendy one',
        why: 'The team maintaining the site after handover mattered more than novelty.',
      },
    ],
    results: [
      'The site runs fully off WordPress',
      'Deploys went from manual uploads to a push-triggered pipeline',
    ],
    links: {},
    images: [
      {
        src: '/projects/fgp-1.svg',
        alt: 'Placeholder for a screenshot of the migrated FGP site.',
        width: 1200,
        height: 760,
      },
    ],
  },
];
