// Training and internships from the resume. The resume gives them no dates,
// so none are shown — nothing is invented.
export const training: { role: string; org: string }[] = [
  { role: 'AI Enablement Bootcamp', org: 'Hytel' },
  { role: 'Software Engineering Bootcamp', org: 'Hytel' },
  { role: 'Frontend Web Developer Intern', org: 'Digiplus Interactive Corp.' },
];

export const experience: {
  start: number;
  years: string;
  role: string;
  org: string;
  place: string;
  summary: string;
}[] = [
  {
    start: 2026,
    years: '2026 — now',
    role: 'AI Engineer',
    org: 'Hytel',
    place: 'Cavite, PH',
    summary:
      'RAG on Vertex AI over company knowledge bases, modernization of a legacy app with AI features, and GCP infrastructure — across five concurrent projects.',
  },
  {
    start: 2025,
    years: '2025 — 2026',
    role: 'Web Developer',
    org: 'FGP FortuneGod Philippines',
    place: 'Pasay, PH',
    summary:
      'Led the WordPress migration to a modern stack: REST APIs, Docker, and CI/CD on GitHub Actions.',
  },
];
