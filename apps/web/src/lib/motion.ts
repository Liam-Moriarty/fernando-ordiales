// JS mirrors of the motion tokens in style.css (design.md §9).
export type EaseCurve = [number, number, number, number];

export const easeSettle: EaseCurve = [0.25, 1, 0.5, 1];
export const easeGlide: EaseCurve = [0.65, 0, 0.35, 1];

export const durFast = 0.15;
export const durBase = 0.22;
export const durEnter = 0.28;
export const durSlow = 0.42;

export const prefersReducedMotion = (): boolean =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
