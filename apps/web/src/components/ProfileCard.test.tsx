import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
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
    // The spotify strip was removed (card follows the reference exactly).
    expect(screen.queryByText('Idea to Production')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Play' })).toBeNull();
  });
});
