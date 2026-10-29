import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { durEnter, durFast, easeGlide } from '../lib/motion';

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: reduced ? durFast : durEnter, ease: easeGlide },
      }}
      exit={{ opacity: 0, transition: { duration: durFast, ease: easeGlide } }}
    >
      {children}
    </motion.div>
  );
};
