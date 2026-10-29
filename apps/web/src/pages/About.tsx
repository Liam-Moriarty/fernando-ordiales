import { PageTransition } from '../components/PageTransition';
import { usePageMeta } from '../lib/meta';

// Filled in by Task 7 of the plan; the route exists so navigation works.
export const About = () => {
  usePageMeta('About — Fernando Ordiales', 'Who Fernando is and how he works.');

  return (
    <PageTransition>
      <section className="mx-auto max-w-page px-5 py-24 sm:px-8 lg:px-12">
        <h1 className="text-h1">About</h1>
      </section>
    </PageTransition>
  );
};
