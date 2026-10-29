export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

const isTheme = (value: unknown): value is Theme =>
  value === 'light' || value === 'dark';

export const getInitialTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // Storage can be blocked (private mode); fall through to the system.
  }
  if (typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
};

export const applyTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked — the theme still applies for this visit.
  }
};
