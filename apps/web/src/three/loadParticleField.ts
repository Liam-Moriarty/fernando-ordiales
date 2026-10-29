import type { FunctionComponent } from 'react';

type FieldModule = { default: FunctionComponent<{ count: number }> };

const EmptyField = () => null;

// A redeploy or a flaky network can 404 the lazy chunk after first paint.
// The static field is already on screen, so a failed load just means the
// live scene never joins — never a crashed app.
export const loadParticleField = (
  importer: () => Promise<FieldModule> = () => import('./ParticleField')
): Promise<FieldModule> => importer().catch(() => ({ default: EmptyField }));
