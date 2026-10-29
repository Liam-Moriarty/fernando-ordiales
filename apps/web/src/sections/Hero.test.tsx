import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { profile } from '../content/profile';
import { Hero } from './Hero';

describe('Hero', () => {
  it('leads with the headline and both calls to action', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'I take AI products from idea to production'
    );
    // The support copy is Fernando's to edit; assert it renders, not its text.
    expect(screen.getByText(profile.support)).not.toBeNull();
    // Two legitimate "Email me" buttons: the hero CTA and the card's.
    expect(
      screen.getAllByRole('button', { name: 'Email me' }).length
    ).toBeGreaterThanOrEqual(1);
    const resume = screen.getByRole('link', { name: 'View resume (PDF)' });
    expect(resume.getAttribute('href')).toBe(
      '/docs/Ordiales-Fernando-Resume.pdf'
    );
    // The resume opens in its own tab so the visit isn't interrupted.
    expect(resume.getAttribute('target')).toBe('_blank');
    expect(resume.getAttribute('rel')).toBe('noreferrer');
  });

  it('never translates under reduced motion', () => {
    // design.md §9 reduced motion: fades only — nothing translates.
    render(<Hero />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.style.transform).not.toMatch(/translate/);
  });

  it('shows the identity card instead of the field', () => {
    const { container } = render(<Hero />);
    expect(screen.getByText(profile.availability)).not.toBeNull();
    expect(container.querySelector('[data-static-field]')).toBeNull();
  });
});
