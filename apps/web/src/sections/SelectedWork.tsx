import { Link } from 'react-router';
import { LayerIndicator } from '../components/LayerIndicator';
import { projects } from '../content/projects';

export const SelectedWork = () => (
  <section
    id="work"
    data-trace-node="selected work"
    className="scroll-mt-24 py-16 lg:py-24"
  >
    <h2 className="text-h2">Selected work</h2>
    <ul className="mt-8 border-y border-border">
      {projects.map((project) => (
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
  </section>
);
