import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../content/profile';
import { ButtonLink } from '../components/Button';
import { easeSettle } from '../lib/motion';
import { loadParticleField } from '../three/loadParticleField';
import { StaticField } from '../three/StaticField';
import { useSceneGate } from '../three/useSceneGate';

const ParticleField = lazy(loadParticleField);

// Mount the heavy scene only on idle, after the page is interactive.
const useIdleReady = (wanted: boolean): boolean => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!wanted) return;
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(() => setReady(true));
      return () => window.cancelIdleCallback(handle);
    }
    const handle = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(handle);
  }, [wanted]);

  return ready;
};

// Page-load sequence per design.md §9: headline, support line, CTAs, each a
// gentle settle; the Three.js field (Task 5) joins late in the right-hand box.
const enter = (delay: number, duration: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration, ease: easeSettle },
});

export const Hero = () => {
  const reduced = useReducedMotion();
  const mode = useSceneGate();
  const sceneReady = useIdleReady(mode === 'webgl');
  // Reduced motion: one quick fade, nothing translates (design.md §9).
  const at = (delay: number, duration: number) =>
    reduced
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.2 },
        }
      : enter(delay, duration);

  return (
    <section className="grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:py-32">
      <div>
        <motion.h1
          {...at(0, 0.5)}
          data-trace-start
          className="max-w-[18ch] text-display"
        >
          {profile.headline}
        </motion.h1>
        <motion.p {...at(0.12, 0.45)} className="mt-6 max-w-[52ch] text-muted">
          {profile.support}
        </motion.p>
        <motion.div {...at(0.24, 0.4)} className="mt-9 flex flex-wrap gap-3">
          <ButtonLink variant="primary" href={`mailto:${profile.email}`}>
            Email me
          </ButtonLink>
          <ButtonLink variant="secondary" href={profile.links.resume}>
            Download resume (PDF)
          </ButtonLink>
          <ButtonLink variant="ghost" href="#work">
            View work
          </ButtonLink>
        </motion.div>
      </div>
      {/* The box is reserved up front so nothing shifts when the lazy canvas
          arrives; the static SVG is the first and fallback frame. */}
      <div aria-hidden className="relative mt-4 h-56 sm:h-72 lg:mt-0 lg:h-105">
        <div className="absolute inset-0">
          <StaticField />
        </div>
        {sceneReady && (
          <Suspense fallback={null}>
            <motion.div
              className="absolute inset-0 bg-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <ParticleField count={window.innerWidth < 768 ? 700 : 1800} />
            </motion.div>
          </Suspense>
        )}
      </div>
    </section>
  );
};
