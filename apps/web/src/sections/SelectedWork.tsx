import { Link } from 'react-router';
import { LayerIndicator } from '../components/LayerIndicator';
import { projects } from '../content/projects';

const featured = projects.filter((project) => project.featured);
const more = projects.filter((project) => !project.featured);

export const SelectedWork = () => (
  <section
    id="work"
    data-trace-node="selected work"
    className="scroll-mt-24 py-16 lg:py-24"
  >
    <h2 className="text-h2">Selected work</h2>
    <ul className="mt-8 border-y border-border">
      {featured.map((project) => (
        <li
          key={project.slug}
          className="border-b border-border last:border-b-0"
        >
          <Link
            to={`/work/${project.slug}`}
            className="group grid gap-5 py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
          >
            <div>
              <h3 className="text-h3 decoration-accent underline-offset-4 group-hover:underline">
                {project.name}
              </h3>
              <p className="mt-2 max-w-[60ch] text-muted">{project.oneLiner}</p>
              <p className="mt-3 font-mono text-caption text-muted">
                {project.meta.stack.join(', ')} · {project.meta.year}
              </p>
            </div>
            <LayerIndicator layers={project.layers} />
          </Link>
        </li>
      ))}
    </ul>
    {more.length > 0 && (
      <div className="mt-12">
        <h3 className="text-h4 text-muted">More projects</h3>
        <ul className="mt-4">
          {more.map((project) => (
            <li key={project.slug}>
              <Link
                to={`/work/${project.slug}`}
                className="group grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
              >
                <span className="decoration-accent underline-offset-4 group-hover:underline">
                  {project.name}
                </span>
                <span className="font-mono text-caption text-muted">
                  {project.meta.stack.slice(0, 3).join(', ')} ·{' '}
                  {project.meta.year}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>
);
