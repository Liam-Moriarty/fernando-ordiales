import { Link } from 'react-router';
import { PageTransition } from '../components/PageTransition';
import { usePageMeta } from '../lib/meta';

export const NotFound = () => {
  usePageMeta(
    'Page not found — Fernando Ordiales',
    "There's no page at this address."
  );

  return (
    <PageTransition>
      <section className="mx-auto max-w-page px-5 py-24 sm:px-8 lg:px-12">
        <h1 className="text-h1">No page here</h1>
        <p className="mt-4 max-w-[68ch] text-muted">
          The address doesn't match anything on this site.
        </p>
        <p className="mt-8">
          <Link
            to="/"
            className="text-accent underline decoration-accent-quiet underline-offset-4 transition-colors duration-150 hover:decoration-accent"
          >
            Go to the homepage
          </Link>
        </p>
      </section>
    </PageTransition>
  );
};
