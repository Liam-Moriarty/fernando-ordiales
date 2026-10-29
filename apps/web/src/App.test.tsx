import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
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
      'I take AI products from prompt to production.'
    );
  });

  it('keeps the email action one click away in the nav', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    const email = within(nav).getByRole('link', { name: 'Email me' });
    expect(email.getAttribute('href')).toBe(
      'mailto:fernando.ordiales23@gmail.com'
    );
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
