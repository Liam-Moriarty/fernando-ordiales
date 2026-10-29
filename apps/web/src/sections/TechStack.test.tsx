import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { stack } from '../content/stack';
import { TechStack } from './TechStack';

describe('stack content', () => {
  it('groups every resume skill with a unique name', () => {
    const names = stack.flatMap((group) => group.items.map((i) => i.name));
    expect(new Set(names).size).toBe(names.length);
    for (const group of stack) {
      expect(group.items.length).toBeGreaterThan(0);
    }
    // Spot-check the resume's columns are all represented.
    expect(names).toEqual(
      expect.arrayContaining([
        'React',
        'Node.js',
        'PostgreSQL',
        'Docker',
        'Flutter',
        'Claude Code',
      ])
    );
  });
});

describe('TechStack', () => {
  it('shows the featured picks per group with a see-more link to the full page', () => {
    render(
      <MemoryRouter>
        <TechStack />
      </MemoryRouter>
    );
    for (const group of stack) {
      expect(screen.getByText(group.label)).not.toBeNull();
    }
    expect(screen.getByText('Vertex AI')).not.toBeNull();
    // Non-featured items stay on the /stack page only.
    expect(screen.queryByText('Fastify')).toBeNull();
    expect(screen.queryByText('Pinia')).toBeNull();
    expect(
      screen.getByRole('link', { name: /See more/ }).getAttribute('href')
    ).toBe('/stack');
  });
});
