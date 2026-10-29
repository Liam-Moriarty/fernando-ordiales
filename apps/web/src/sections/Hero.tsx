import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../content/profile';
import { ButtonLink } from '../components/Button';
import { ProfileCard } from '../components/ProfileCard';
import { easeSettle } from '../lib/motion';

// Page-load sequence per design.md §9: headline, support line, CTAs, then
// the identity card settles in on the right.
const enter = (delay: number, duration: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration, ease: easeSettle },
});

export const Hero = () => {
  const reduced = useReducedMotion();
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
    <section className="grid items-start gap-10 pt-14 pb-8 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:py-32">
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
          <ButtonLink
            variant="secondary"
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
          >
            View resume (PDF)
          </ButtonLink>
          <ButtonLink variant="ghost" href="#work">
            View work
          </ButtonLink>
        </motion.div>
      </div>
      <motion.div {...at(0.36, 0.45)}>
        <ProfileCard />
      </motion.div>
    </section>
  );
};
