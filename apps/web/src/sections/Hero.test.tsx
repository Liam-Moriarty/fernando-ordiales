import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('leads with the headline and both calls to action', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'I take AI products from prompt to production.'
    );
    expect(
      screen.getByRole('link', { name: 'Email me' }).getAttribute('href')
    ).toBe('mailto:fernando.ordiales23@gmail.com');
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

  it('falls back to the static field when the scene is gated off', () => {
    // jsdom has no WebGL and the test setup forces reduced motion, so the
    // gate must choose the static SVG and never mount a canvas.
    const { container } = render(<Hero />);
    expect(container.querySelector('[data-static-field]')).not.toBeNull();
    expect(container.querySelector('canvas')).toBeNull();
  });
});
