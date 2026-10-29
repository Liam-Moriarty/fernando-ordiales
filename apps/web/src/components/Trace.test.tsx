import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Trace, traceScale } from './Trace';

describe('traceScale', () => {
  it('maps the drawn range so the last node lands at exactly 1', () => {
    const at = traceScale(100, 1100);
    expect(at(1100)).toBe(1);
    expect(at(600)).toBe(0.5);
    expect(at(0)).toBe(0);
  });
});

describe('Trace', () => {
  it('renders a static, fully drawn rail under reduced motion', () => {
    // The vitest setup stubs matchMedia to report reduced motion, so the
    // trace must take its static path: no GSAP, everything already drawn.
    render(
      <div style={{ position: 'relative' }}>
        <section data-trace-node="selected work">
          <h2>Selected work</h2>
        </section>
        <section data-trace-node="contact">
          <h2>Contact</h2>
        </section>
        <Trace />
      </div>
    );

    const svg = document.querySelector('svg[data-static]');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.querySelectorAll('[data-trace-node-dot]')).toHaveLength(2);
  });
});
