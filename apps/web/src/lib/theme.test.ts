import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { applyTheme, getInitialTheme } from './theme';

const matchMediaDarkSystem = (query: string) =>
  ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;

describe('getInitialTheme', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns the stored theme when one is saved', () => {
    localStorage.setItem('theme', 'dark');
    expect(getInitialTheme()).toBe('dark');
  });

  it('ignores an unknown stored value and falls back to the system', () => {
    localStorage.setItem('theme', 'banana');
    vi.stubGlobal('matchMedia', matchMediaDarkSystem);
    expect(getInitialTheme()).toBe('dark');
  });

  it('returns light when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    expect(getInitialTheme()).toBe('light');
  });

  it('falls back to the system preference when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.stubGlobal('matchMedia', matchMediaDarkSystem);
    expect(getInitialTheme()).toBe('dark');
  });
});

describe('applyTheme', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete document.documentElement.dataset.theme;
    localStorage.clear();
  });

  it('sets data-theme on the root element and persists the choice', () => {
    applyTheme('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('still applies the theme when storage writes are blocked', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => applyTheme('light')).not.toThrow();
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
