import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AppRoutes } from '../App';
import { stack } from '../content/stack';

describe('Stack page', () => {
  it('lists the complete stack at /stack', () => {
    render(
      <MemoryRouter initialEntries={['/stack']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Tech stack'
    );
    // Every item, including ones the homepage trims away.
    expect(screen.getByText('Fastify')).not.toBeNull();
    expect(screen.getByText('Pinia')).not.toBeNull();
    for (const group of stack) {
      expect(screen.getByText(group.label)).not.toBeNull();
    }
  });
});
