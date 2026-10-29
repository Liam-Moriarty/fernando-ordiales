import { PageTransition } from '../components/PageTransition';
import { usePageMeta } from '../lib/meta';

export const Home = () => {
  usePageMeta(
    'Fernando Ordiales — AI Engineer',
    'AI engineer in Manila building AI products end to end — model integration, interfaces, APIs and the cloud infrastructure they run on.'
  );

  return (
    <PageTransition>
      <section className="mx-auto max-w-page px-5 py-24 sm:px-8 lg:px-12">
        <h1 className="max-w-[18ch] text-display">
          I take AI products from prompt to production.
        </h1>
      </section>
    </PageTransition>
  );
};
