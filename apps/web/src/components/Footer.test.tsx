import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('links email and resume, and hides profile links that are not set', () => {
    render(<Footer />);

    expect(
      screen.getByRole('link', { name: 'Email' }).getAttribute('href')
    ).toBe('mailto:fernando.ordiales23@gmail.com');
    expect(
      screen.getByRole('link', { name: 'Resume (PDF)' }).getAttribute('href')
    ).toBe('/resume.pdf');
    // github/linkedin are '' in profile until Fernando fills them in.
    expect(screen.queryByRole('link', { name: 'GitHub' })).toBeNull();
    expect(screen.queryByRole('link', { name: 'LinkedIn' })).toBeNull();
  });
});
