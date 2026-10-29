import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { profile } from '../content/profile';
import { ProfileCard } from './ProfileCard';

describe('ProfileCard', () => {
  it('carries the identity-card anatomy: availability, photo, email, location, socials, CTA', () => {
    render(<ProfileCard />);

    expect(screen.getByText(profile.availability)).not.toBeNull();
    expect(screen.getByAltText(/walking under string lights/i)).not.toBeNull();
    expect(
      screen.getByRole('link', { name: profile.email }).getAttribute('href')
    ).toBe(`mailto:${profile.email}`);
    expect(screen.getByText(/Based in Manila, PH/)).not.toBeNull();
    expect(
      screen.getByRole('link', { name: 'GitHub' }).getAttribute('href')
    ).toBe(profile.links.github);
    expect(screen.getByRole('button', { name: 'Email me' })).not.toBeNull();
  });

  it('keeps the spotify strip: track, career progress, play toggling to pause', async () => {
    const user = userEvent.setup();
    render(<ProfileCard />);

    expect(screen.getByText('Idea to Production')).not.toBeNull();
    expect(screen.getByText('2021')).not.toBeNull();
    expect(screen.getByText('now')).not.toBeNull();

    await user.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Pause' })).not.toBeNull();
  });
});
