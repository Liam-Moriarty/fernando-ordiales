import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../content/profile';
import { ButtonLink } from '../components/Button';
import { easeSettle } from '../lib/motion';

// Page-load sequence per design.md §9: headline, support line, CTAs, each a
// gentle settle; the Three.js field (Task 5) joins late in the right-hand box.
const enter = (delay: number, duration: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration, ease: easeSettle },
});

export const Hero = () => {
  const reduced = useReducedMotion();
  const at = (delay: number, duration: number) =>
    reduced ? enter(0, 0.2) : enter(delay, duration);

  return (
    <section className="grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:py-32">
      <div>
        <motion.h1 {...at(0, 0.5)} className="max-w-[18ch] text-display">
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
      {/* The scene box is reserved so nothing shifts when the lazy canvas
          arrives (Task 5 fills it). */}
      <div aria-hidden className="hidden h-105 lg:block" data-scene-box />
    </section>
  );
};
