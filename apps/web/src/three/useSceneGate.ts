import { useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

export type SceneMode = 'static' | 'webgl';

const canUseWebgl = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

const decide = (): SceneMode => {
  if (typeof window.matchMedia !== 'function' || prefersReducedMotion()) {
    return 'static';
  }
  const memory = (navigator as { deviceMemory?: number }).deviceMemory;
  if (memory !== undefined && memory < 4) return 'static';
  return canUseWebgl() ? 'webgl' : 'static';
};

// Static unless the device can clearly afford the live scene (design.md §9):
// reduced motion, low memory, no WebGL and no matchMedia all stay static.
export const useSceneGate = (): SceneMode => {
  const [mode] = useState<SceneMode>(decide);
  return mode;
};
