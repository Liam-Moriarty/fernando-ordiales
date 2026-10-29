import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

const setViewTransition = (value: unknown) =>
  Object.defineProperty(document, 'startViewTransition', {
    value,
    configurable: true,
    writable: true,
  });

describe('ThemeToggle', () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme;
    Reflect.deleteProperty(document, 'startViewTransition');
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('swaps themes inside a view transition when the browser has one', async () => {
    // One atomic crossfade keeps every color in lockstep (design.md §9).
    const viewTransition = vi.fn((callback: () => void) => callback());
    setViewTransition(viewTransition);
    vi.stubGlobal(
      'matchMedia',
      (query: string) =>
        ({ matches: false, media: query }) as unknown as MediaQueryList
    );
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button', { name: /Switch to/ }));

    expect(viewTransition).toHaveBeenCalledTimes(1);
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('skips the view transition under reduced motion', async () => {
    const viewTransition = vi.fn((callback: () => void) => callback());
    setViewTransition(viewTransition);
    // The test setup's matchMedia stub reports reduced motion.
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button', { name: /Switch to/ }));

    expect(viewTransition).not.toHaveBeenCalled();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('flips the document theme and its own label on click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    // jsdom's stubbed system preference is light, so the toggle offers dark.
    const button = screen.getByRole('button', { name: 'Switch to dark theme' });
    await user.click(button);

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(
      screen.getByRole('button', { name: 'Switch to light theme' })
    ).not.toBeNull();
  });
});
