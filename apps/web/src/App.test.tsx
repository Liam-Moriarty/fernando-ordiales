import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { AppRoutes } from './App';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>
  );

describe('AppRoutes', () => {
  it('renders the hero headline on the homepage', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'I take AI products from idea to production'
    );
  });

  it('keeps one email action on screen, in the identity card only', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    // Fernando trimmed the repetition: no Email me in the nav or hero CTA
    // row — the card carries the hero's single email action.
    expect(within(nav).queryByRole('button', { name: 'Email me' })).toBeNull();
    expect(screen.getAllByRole('button', { name: 'Email me' })).toHaveLength(
      2 // the identity card and the contact section
    );
  });

  it('lands on the work section when returning from a case study', async () => {
    // The hash target only exists after the old page has finished exiting,
    // so the scroll must retry until the new page is mounted.
    const scrolled = vi.spyOn(Element.prototype, 'scrollIntoView');
    const user = userEvent.setup();
    renderAt('/work/switchboard');

    await user.click(screen.getByRole('link', { name: 'Back to work' }));

    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Selected work' })
      ).toBeDefined()
    );
    await waitFor(() => expect(scrolled).toHaveBeenCalled());
    scrolled.mockRestore();
  });

  it('renders the not-found page for an unknown address', () => {
    renderAt('/nowhere');
    expect(
      screen.getByText(/doesn't match anything on this site/i)
    ).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Go to the homepage' })).not.toBe(
      null
    );
  });
});
