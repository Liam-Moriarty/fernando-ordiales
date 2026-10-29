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
    expect(
      screen
        .getByRole('link', { name: 'Download resume (PDF)' })
        .getAttribute('href')
    ).toBe('/resume.pdf');
  });
});
