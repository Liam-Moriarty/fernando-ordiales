import { Link } from 'react-router';
import { StackGroups } from '../components/StackGroups';
import { featuredCount, featuredStack, stackCount } from '../content/stack';

// The homepage shows each group's featured picks; /stack carries the lot
// (Fernando's request — the full wall overwhelmed small screens).
export const TechStack = () => (
  <section
    id="stack"
    data-trace-node="tech stack"
    className="scroll-mt-24 py-16 lg:py-24"
  >
    <h2 className="text-h2">Tech stack</h2>
    <p className="mt-3 max-w-[68ch] text-muted">
      Everything in rotation, from the resume: the capabilities above are the
      shape, this is the toolbox.
    </p>
    <div className="mt-10">
      <StackGroups groups={featuredStack} />
    </div>
    <p className="mt-8 font-mono text-caption text-muted">
      {featuredCount} of {stackCount} shown ·{' '}
      <Link
        to="/stack"
        className="text-accent underline decoration-accent-quiet underline-offset-4 hover:decoration-accent"
      >
        See more
      </Link>
    </p>
  </section>
);
