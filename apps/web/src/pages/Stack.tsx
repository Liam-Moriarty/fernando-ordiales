import { Link } from 'react-router';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { PageTransition } from '../components/PageTransition';
import { StackGroups } from '../components/StackGroups';
import { stack, stackCount } from '../content/stack';
import { usePageMeta } from '../lib/meta';

export const Stack = () => {
  usePageMeta(
    'Tech stack — Fernando Ordiales',
    'Every technology Fernando works with, grouped: frontend, backend, databases, devops & cloud, and tools.'
  );

  return (
    <PageTransition>
      <section className="mx-auto max-w-page px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <Link
          to="/#stack"
          aria-label="Back to the homepage stack section"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-text"
        >
          <ArrowLeftIcon size={16} />
          Home
        </Link>
        <h1 className="mt-8 text-h1">Tech stack</h1>
        <p className="mt-3 max-w-[68ch] text-muted">
          All {stackCount} tools in rotation, grouped like the resume.
        </p>
        <div className="mt-10">
          <StackGroups groups={stack} />
        </div>
      </section>
    </PageTransition>
  );
};
