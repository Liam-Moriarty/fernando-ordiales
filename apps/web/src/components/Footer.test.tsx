import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('links email, resume and GitHub, hiding links that are not set', () => {
    render(<Footer />);

    expect(
      screen.getByRole('link', { name: 'Email' }).getAttribute('href')
    ).toBe('mailto:fernando.ordiales23@gmail.com');
    const resume = screen.getByRole('link', { name: 'Resume (PDF)' });
    expect(resume.getAttribute('href')).toBe(
      '/docs/Ordiales-Fernando-Resume.pdf'
    );
    expect(resume.getAttribute('target')).toBe('_blank');
    expect(
      screen.getByRole('link', { name: 'GitHub' }).getAttribute('href')
    ).toBe('https://github.com/Liam-Moriarty');
    // linkedin is '' in profile until Fernando fills it in.
    expect(screen.queryByRole('link', { name: 'LinkedIn' })).toBeNull();
  });
});
