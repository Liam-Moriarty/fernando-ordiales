import { afterEach, describe, expect, it, vi } from 'vitest';
import { prefersReducedMotion } from './motion';

describe('prefersReducedMotion', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('defaults to reduced when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    expect(prefersReducedMotion()).toBe(true);
  });

  it('reports the media query when available', () => {
    vi.stubGlobal(
      'matchMedia',
      (query: string) =>
        ({ matches: query.includes('reduce') }) as unknown as MediaQueryList
    );
    expect(prefersReducedMotion()).toBe(true);

    vi.stubGlobal(
      'matchMedia',
      () => ({ matches: false }) as unknown as MediaQueryList
    );
    expect(prefersReducedMotion()).toBe(false);
  });
});
