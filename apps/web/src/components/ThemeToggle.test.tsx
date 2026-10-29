import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme;
    localStorage.clear();
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
