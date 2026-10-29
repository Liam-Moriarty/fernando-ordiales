import { describe, expect, it } from 'vitest';
import { generateFieldPoints } from './fieldPoints';

describe('generateFieldPoints', () => {
  it('is deterministic for the same seed', () => {
    expect(generateFieldPoints(50, 7)).toEqual(generateFieldPoints(50, 7));
  });

  it('differs for a different seed', () => {
    expect(generateFieldPoints(50, 7)).not.toEqual(generateFieldPoints(50, 8));
  });

  it('honors the requested count and stays within bounds', () => {
    const points = generateFieldPoints(300, 1);
    expect(points).toHaveLength(300);
    for (const point of points) {
      expect(Math.abs(point.x)).toBeLessThanOrEqual(1);
      expect(Math.abs(point.y)).toBeLessThanOrEqual(1);
      expect(Math.abs(point.z)).toBeLessThanOrEqual(1);
    }
  });

  it('marks roughly seven percent of points as accent', () => {
    const points = generateFieldPoints(1800, 7);
    const accents = points.filter((point) => point.accent).length / 1800;
    expect(accents).toBeGreaterThan(0.04);
    expect(accents).toBeLessThan(0.1);
  });
});
