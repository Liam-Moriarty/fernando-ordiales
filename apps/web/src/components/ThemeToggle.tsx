import { useState } from 'react';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { applyTheme, getInitialTheme, type Theme } from '../lib/theme';

const other = (theme: Theme): Theme => (theme === 'dark' ? 'light' : 'dark');

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggle = () => {
    const next = other(theme);
    // Gate the 250ms color crossfade to the swap itself so hovers stay fast.
    document.documentElement.setAttribute('data-theme-transition', '');
    applyTheme(next);
    setTheme(next);
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
