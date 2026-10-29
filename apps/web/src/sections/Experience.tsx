import { experience } from '../content/experience';

export const Experience = () => (
  <section
    id="experience"
    data-trace-node="experience"
    className="scroll-mt-24 py-16 lg:py-24"
  >
    <h2 className="text-h2">Experience</h2>
    <ol className="mt-8 space-y-10">
      {experience.map((entry) => (
        <li
          key={entry.org}
          className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4"
        >
          <span className="font-mono text-caption text-muted">
            {entry.years}
          </span>
          <div>
            <h3 className="text-h4">
              {entry.role}, {entry.org}
            </h3>
            <p className="mt-1 max-w-[60ch] text-sm text-muted">
              {entry.summary}
            </p>
          </div>
        </li>
      ))}
    </ol>
  </section>
);
