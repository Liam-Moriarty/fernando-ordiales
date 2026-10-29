import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  it('renders every group label and its technologies', () => {
    render(<TechStack />);
    for (const group of stack) {
      expect(screen.getByText(group.label)).not.toBeNull();
    }
    expect(screen.getByText('Vertex AI')).not.toBeNull();
    expect(screen.getByText('GitHub Actions')).not.toBeNull();
  });
});
