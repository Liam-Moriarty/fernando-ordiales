import { Link, useParams } from 'react-router';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { ArchDiagram } from '../components/ArchDiagram';
import { PageTransition } from '../components/PageTransition';
import { projects } from '../content/projects';
import { usePageMeta } from '../lib/meta';
import { NotFound } from './NotFound';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mt-12">
    <h2 className="text-h3">{title}</h2>
    {children}
  </section>
);

export const Work = () => {
  const { slug } = useParams();
  const index = projects.findIndex((project) => project.slug === slug);
  const project = index === -1 ? undefined : projects[index];
  const next = project ? projects[(index + 1) % projects.length] : undefined;

  usePageMeta(
    project
      ? `${project.name} — Fernando Ordiales`
      : 'Page not found — Fernando Ordiales',
    project?.oneLiner ?? "There's no page at this address."
  );

  if (!project || !next) return <NotFound />;

  return (
    <PageTransition>
      <article className="mx-auto max-w-page px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <Link
          to="/#work"
          aria-label="Back to work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-text"
        >
          <ArrowLeftIcon size={16} />
          Work
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <h1 className="text-h1">{project.name}</h1>
          <p className="mt-4 max-w-[68ch] text-muted">{project.oneLiner}</p>
          <p className="mt-4 font-mono text-caption text-muted">
            {project.meta.role} · {project.meta.stack.join(', ')} ·{' '}
            {project.meta.year}
          </p>
        </header>

        <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
          <div>
            <Section title="The problem">
              <p className="mt-4 max-w-[68ch] text-muted">{project.problem}</p>
            </Section>

            <Section title="What I built">
              <ul className="mt-4 max-w-[68ch] space-y-3 text-muted">
                {project.built.map((item) => (
                  <li key={item} className="border-l-2 border-border pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Key decisions">
              <dl className="mt-4 max-w-[68ch] space-y-5">
                {project.decisions.map((decision) => (
                  <div key={decision.what}>
                    <dt className="font-medium">{decision.what}</dt>
                    <dd className="mt-1 text-sm text-muted">{decision.why}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section title="Results">
              <ul className="mt-4 max-w-[68ch] space-y-2 text-muted">
                {project.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </Section>

            {(project.links.live ?? project.links.repo) && (
              <Section title="Links">
                <p className="mt-4 flex gap-5">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      className="text-accent underline decoration-accent-quiet underline-offset-4 hover:decoration-accent"
                    >
                      Live site
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      className="text-accent underline decoration-accent-quiet underline-offset-4 hover:decoration-accent"
                    >
                      Repository
                    </a>
                  )}
                </p>
              </Section>
            )}
          </div>

          <aside className="lg:pt-12">
            <h2 className="font-mono text-caption text-muted">architecture</h2>
            <div className="mt-4">
              <ArchDiagram project={project} />
            </div>
          </aside>
        </div>

        <div className="mt-14 space-y-6">
          {project.images.map((image) => (
            <figure
              key={image.src}
              className="overflow-hidden rounded-lg border border-border bg-surface"
            >
              <img src={image.src} alt={image.alt} className="block w-full" />
            </figure>
          ))}
        </div>

        <p className="mt-16 border-t border-border pt-8 text-right">
          <Link
            to={`/work/${next.slug}`}
            className="text-sm text-muted transition-colors duration-150 hover:text-text"
          >
            Next: {next.name} →
          </Link>
        </p>
      </article>
    </PageTransition>
  );
};
