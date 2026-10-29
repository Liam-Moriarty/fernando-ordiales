export type FieldPoint = { x: number; y: number; z: number; accent: boolean };

// mulberry32: a tiny deterministic PRNG, so the WebGL field and its static
// SVG fallback draw the same cloud and a swap between them reads as a pause.
const mulberry32 = (seed: number) => {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const generateFieldPoints = (
  count: number,
  seed: number
): FieldPoint[] => {
  const random = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    x: random() * 2 - 1,
    y: random() * 2 - 1,
    z: random() * 2 - 1,
    accent: random() < 0.07,
  }));
};
