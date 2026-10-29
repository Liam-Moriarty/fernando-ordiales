import { describe, expect, it } from 'vitest';
import { loadParticleField } from './loadParticleField';

describe('loadParticleField', () => {
  it('falls back to an empty component when the chunk fails to load', async () => {
    // A redeploy or a flaky network can 404 the lazy chunk after first
    // paint; the hero must keep its static field instead of crashing React.
    const module = await loadParticleField(() =>
      Promise.reject(new Error('chunk 404'))
    );
    expect(module.default({ count: 1 })).toBeNull();
  });

  it('passes the real module through on success', async () => {
    const real = { default: () => null };
    const module = await loadParticleField(() => Promise.resolve(real));
    expect(module).toBe(real);
  });
});
