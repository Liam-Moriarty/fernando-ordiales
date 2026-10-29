import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { loadParticleField } from './loadParticleField';
import { StaticField } from './StaticField';
import { useSceneGate } from './useSceneGate';

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

// The particle field with all its guarantees in one place: box reserved up
// front, static SVG as first and fallback frame, canvas lazy and idle-loaded
// only when the device can afford it (design.md §9).
export const FieldScene = ({ className = '' }: { className?: string }) => {
  const mode = useSceneGate();
  const sceneReady = useIdleReady(mode === 'webgl');

  return (
    <div aria-hidden className={`relative ${className}`}>
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
  );
};
