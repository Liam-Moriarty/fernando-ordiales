import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Contact } from './Contact';

describe('Contact', () => {
  it('hosts the particle field with its static fallback', () => {
    // jsdom has no WebGL and the setup forces reduced motion, so the field
    // must render its static SVG and never a canvas.
    const { container } = render(<Contact />);
    expect(container.querySelector('[data-static-field]')).not.toBeNull();
    expect(container.querySelector('canvas')).toBeNull();
  });
});
