import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Testing Library only cleans up on its own when Vitest globals are enabled.
afterEach(cleanup);

// jsdom lacks these browser APIs. The stubs send components down their
// static/reduced-motion paths, which is what the tests assert against.
const mediaQueryList = (query: string) =>
  ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;

vi.stubGlobal('matchMedia', mediaQueryList);

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
}

vi.stubGlobal('IntersectionObserver', ObserverStub);
vi.stubGlobal('ResizeObserver', ObserverStub);
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
