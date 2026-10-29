import { useParams } from 'react-router';
import { PageTransition } from '../components/PageTransition';
import { usePageMeta } from '../lib/meta';

// Filled in by Task 7 of the plan; the route exists so navigation works.
export const Work = () => {
  const { slug } = useParams();
  usePageMeta('Work — Fernando Ordiales', 'Project case study.');

  return (
    <PageTransition>
      <section className="mx-auto max-w-page px-5 py-24 sm:px-8 lg:px-12">
        <h1 className="text-h1">Case study</h1>
        <p className="mt-4 font-mono text-caption text-muted">{slug}</p>
      </section>
    </PageTransition>
  );
};
