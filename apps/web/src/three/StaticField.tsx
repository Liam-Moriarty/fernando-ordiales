import { generateFieldPoints } from './fieldPoints';

// The reduced-motion / no-WebGL hero visual: the same cloud the live scene
// draws (same PRNG seed), rendered once as SVG so it reads as a paused frame.
const points = generateFieldPoints(240, 7);

export const StaticField = () => (
  <svg
    aria-hidden
    data-static-field
    viewBox="0 0 100 100"
    className="h-full w-full text-muted"
  >
    {points.map((point, index) => (
      <circle
        key={index}
        cx={(point.x + 1) * 50}
        cy={(point.y + 1) * 50}
        r={0.25 + (point.z + 1) * 0.3}
        fill={point.accent ? 'var(--color-accent)' : 'currentColor'}
        opacity={0.2 + (point.z + 1) * 0.2}
      />
    ))}
  </svg>
);
