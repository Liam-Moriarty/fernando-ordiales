import { PageTransition } from '../components/PageTransition';
import { Trace } from '../components/Trace';
import { usePageMeta } from '../lib/meta';
import { Capabilities } from '../sections/Capabilities';
import { Contact } from '../sections/Contact';
import { Experience } from '../sections/Experience';
import { Hero } from '../sections/Hero';
import { SelectedWork } from '../sections/SelectedWork';

export const Home = () => {
  usePageMeta(
    'Fernando Ordiales — AI Engineer',
    'AI engineer in Manila building AI products end to end — model integration, interfaces, APIs and the cloud infrastructure they run on.'
  );

  return (
    <PageTransition>
      <div className="relative mx-auto max-w-page px-5 sm:px-8 lg:px-12">
        <Trace />
        <div className="lg:pl-16">
          <Hero />
          <SelectedWork />
          <Capabilities />
          <Experience />
          <Contact />
        </div>
      </div>
    </PageTransition>
  );
};
