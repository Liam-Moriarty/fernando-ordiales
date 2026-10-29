import { useState } from 'react';
import { flushSync } from 'react-dom';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { applyTheme, getInitialTheme, type Theme } from '../lib/theme';
import { prefersReducedMotion } from '../lib/motion';

const other = (theme: Theme): Theme => (theme === 'dark' ? 'light' : 'dark');

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggle = () => {
    const next = other(theme);
    // flushSync so the DOM is fully re-themed inside the snapshot callback.
    const swap = () => {
      applyTheme(next);
      flushSync(() => setTheme(next));
    };

    // One atomic crossfade of the whole page keeps every element — canvas
    // and scrollbars included — in lockstep. Browsers without the View
    // Transitions API fall back to the gated CSS color transition.
    if (
      typeof document.startViewTransition === 'function' &&
      !prefersReducedMotion()
    ) {
      document.startViewTransition(swap);
      return;
    }

    document.documentElement.setAttribute('data-theme-transition', '');
    swap();
    window.setTimeout(() => {
      document.documentElement.removeAttribute('data-theme-transition');
    }, 300);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${other(theme)} theme`}
      className="rounded-sm p-2 text-muted transition-colors duration-150 hover:text-text"
    >
      {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  );
};
