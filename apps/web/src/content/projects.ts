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
  // Featured projects are the homepage's Selected work; the rest sit in the
  // More projects list but get the same case-study page.
  featured: boolean;
  meta: { role: string; stack: string[]; year: string };
  layers: Layer[];
  problem: string;
  built: string[];
  decisions: { what: string; why: string }[];
  results: string[];
  links: { live?: string; repo?: string };
  images: { src: string; alt: string; width: number; height: number }[];
};

const switchboardShot = (
  n: number,
  height: number,
  alt: string
): Project['images'][number] => ({
  src: `/projects/switchboard/${n}.jpg`,
  alt,
  width: 2048,
  height,
});

const flinkiShot = (n: number, alt: string): Project['images'][number] => ({
  src: `/projects/flinki/${n}.jpg`,
  alt,
  width: 860,
  height: 1864,
});

export const projects: Project[] = [
  {
    slug: 'switchboard',
    name: 'Switchboard',
    oneLiner:
      'Project management where the AI does the heavy lifting: it plans projects, manages tickets and reports on sprints.',
    featured: true,
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
      switchboardShot(
        4,
        1127,
        'The AI Project Planner: describe a project idea and get a full Agile plan, with starting points like feature breakdown and release plan.'
      ),
      switchboardShot(
        5,
        1125,
        "A sprint board where the AI's suggested stories wait behind accept and reject actions."
      ),
      switchboardShot(
        3,
        1121,
        'AI Observability: total runs, latency and token cost for one project, with activity charts over time.'
      ),
      switchboardShot(
        1,
        1120,
        'AI Evaluation: two prompt versions compared on a dataset, with exact-match and correctness scores per example.'
      ),
      switchboardShot(
        2,
        1122,
        'The AI Playground: chat with a single model, with system message, temperature and token controls.'
      ),
      switchboardShot(
        6,
        1122,
        'Workspace overview: pinned projects, teams and recent tickets.'
      ),
    ],
  },
  {
    slug: 'flinki',
    name: 'Flinki',
    oneLiner:
      'A social app where athletes keep a verified record of their races, medals and training.',
    featured: true,
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
      flinkiShot(
        1,
        "A verified Flinki profile with the athlete's achievements list and an Add Achievement action."
      ),
      flinkiShot(
        6,
        'Flinki recognising a half marathon from a Garmin activity and offering to add it to the profile.'
      ),
      flinkiShot(
        8,
        'Live tracking during a run: the route drawing in real time with distance and duration.'
      ),
      flinkiShot(
        3,
        'A verified hike post — Mt Apo foothills, 14.8 km with elevation — the route drawn over satellite imagery.'
      ),
      flinkiShot(
        2,
        'The feed: verified walk and Garmin-tracked ride posts, each with a route map and stats.'
      ),
      flinkiShot(
        7,
        'Activity detail with a 3D satellite flythrough of a running circuit.'
      ),
      flinkiShot(
        4,
        'The map tab: achievement pins clustered on a 3D globe over Southeast Asia.'
      ),
      flinkiShot(
        5,
        'The map tab zoomed to the Philippines, achievements clustered by city.'
      ),
    ],
  },
  {
    slug: 'fgp-migration',
    name: 'FGP platform migration',
    oneLiner:
      'Moved a company site off WordPress onto a modern stack with real APIs, containers and CI/CD.',
    featured: true,
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
        src: '/projects/fgp-migration/placeholder.svg',
        alt: 'Placeholder for a screenshot of the migrated FGP site.',
        width: 1200,
        height: 760,
      },
    ],
  },
  {
    slug: 'custom-playlist-website',
    name: 'Multipage website with custom playlist',
    oneLiner:
      'A multi-page One Ok Rock fan site with a custom playlist, search and pagination.',
    featured: false,
    meta: {
      role: 'Design & frontend',
      stack: ['React', 'Tailwind CSS', 'Vite'],
      year: '2024',
    },
    layers: ['interface'],
    problem:
      'A static fan page is easy; one with a browsable discography is not. The goal was a multi-page site with a custom playlist you can search and page through, fully responsive on mobile and desktop.',
    built: [
      'A multi-page React site with album and track-list pages',
      'A custom playlist with search and pagination',
      'Links out to every major streaming platform',
    ],
    decisions: [
      {
        what: 'Plain React and Vite over a framework',
        why: 'A fan site needs fast static hosting and nothing server-side.',
      },
    ],
    results: ['Deployed and live on Vercel'],
    links: {
      live: 'https://one-ok-rock.vercel.app',
      repo: 'https://github.com/Liam-Moriarty/OOR-Website',
    },
    images: [
      {
        src: '/projects/custom-playlist-website/1.jpg',
        alt: 'The fan-site hero: album artwork over a collage background, with view-release and listen-on-Spotify actions.',
        width: 1892,
        height: 985,
      },
      {
        src: '/projects/custom-playlist-website/2.jpg',
        alt: 'The track list with per-track play buttons, durations and streaming-platform links.',
        width: 1899,
        height: 989,
      },
    ],
  },
  {
    slug: 'personal-task-monitoring',
    name: 'Personal task monitoring',
    oneLiner:
      'A MERN task tracker with full CRUD, built to learn the stack end to end.',
    featured: false,
    meta: {
      role: 'Full-stack developer',
      stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux Toolkit'],
      year: '2024',
    },
    layers: ['interface', 'data'],
    problem:
      'A first full-stack build: track personal tasks with start dates, due dates and statuses, with state management kept honest by Redux Toolkit and RTK Query.',
    built: [
      'A MERN app with create, update, complete and delete for tasks',
      'Redux Toolkit and RTK Query for state and data fetching',
      'A responsive layout for mobile and desktop',
    ],
    decisions: [
      {
        what: 'RTK Query over hand-rolled fetching',
        why: 'Cache invalidation and loading states come for free, which is the hard part of a CRUD UI.',
      },
    ],
    results: ['The complete CRUD flow works end to end against MongoDB'],
    links: {},
    images: [
      {
        src: '/projects/personal-task-monitoring/1.png',
        alt: 'The task list: each task with start date, due date, status, and mark-as-done, update and delete actions.',
        width: 1169,
        height: 948,
      },
      {
        src: '/projects/personal-task-monitoring/2.png',
        alt: 'The task list beside the create-activity form with its date pickers.',
        width: 1536,
        height: 948,
      },
    ],
  },
  {
    slug: 'budget-tracker',
    name: 'Budget tracker',
    oneLiner:
      'A MERN budget tracker: income, expenses and simple balance analytics.',
    featured: false,
    meta: {
      role: 'Full-stack developer',
      stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux Toolkit'],
      year: '2024',
    },
    layers: ['interface', 'data'],
    problem:
      'Track where money actually goes: incomes and expenses with categories, and a running balance with enough analytics to see the shape of a month.',
    built: [
      'Income and expense tracking with categorized entries',
      'An income-versus-expenses chart and running totals',
      'Redux Toolkit and RTK Query over a MongoDB-backed API',
    ],
    decisions: [
      {
        what: 'One transactions model with signed amounts',
        why: 'Income and expenses share every behaviour except their sign; two models would duplicate the whole API.',
      },
    ],
    results: ['Income, expenses and balance analytics working end to end'],
    links: {},
    images: [
      {
        src: '/projects/budget-tracker/1.png',
        alt: 'All transactions: an income-versus-expenses chart, totals and recent history with salary and expense ranges.',
        width: 1486,
        height: 958,
      },
      {
        src: '/projects/budget-tracker/2.png',
        alt: 'The budget tracker dashboard with its sidebar navigation.',
        width: 1902,
        height: 987,
      },
      {
        src: '/projects/budget-tracker/3.png',
        alt: 'The incomes view: total income with categorized entries and an add-income form.',
        width: 1485,
        height: 951,
      },
    ],
  },
  {
    slug: 'sales-dashboard',
    name: 'Sales dashboard',
    oneLiner:
      'A MERN dashboard charting daily and monthly sales, transactions and category performance.',
    featured: false,
    meta: {
      role: 'Full-stack developer',
      stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux Toolkit'],
      year: '2025',
    },
    layers: ['interface', 'data'],
    problem:
      'Sales data is only useful when someone can read it at a glance: the dashboard had to show real-time totals, trends over time and a transaction history without drowning the reader in tables.',
    built: [
      'A dashboard with customer, daily, monthly and yearly sales totals',
      'Trend charts for daily and monthly sales and a sales-by-category breakdown',
      'A transaction history backed by MongoDB through RTK Query',
    ],
    decisions: [
      {
        what: 'Charts first, tables second',
        why: 'The questions are "how are we doing" and "what changed" — a trend line answers both before a table row does.',
      },
    ],
    results: [
      'Totals, trends and category breakdowns rendering from live data',
    ],
    links: {},
    images: [
      {
        src: '/projects/sales-dashboard/1.png',
        alt: 'The dashboard: customer and sales totals, a yearly trend chart and a sales-by-category donut.',
        width: 1644,
        height: 986,
      },
      {
        src: '/projects/sales-dashboard/2.png',
        alt: 'The dashboard overview with its transaction table.',
        width: 1901,
        height: 986,
      },
      {
        src: '/projects/sales-dashboard/3.png',
        alt: 'The daily sales chart across a month, plotting units and sales.',
        width: 1664,
        height: 984,
      },
      {
        src: '/projects/sales-dashboard/4.png',
        alt: 'The monthly sales chart.',
        width: 1656,
        height: 988,
      },
    ],
  },
];
