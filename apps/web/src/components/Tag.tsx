import type { ReactNode } from 'react';

// Stack chips (design.md §10): mono caption in a hairline chip, never colored
// per technology — they're data, not decoration.
export const Tag = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center rounded-sm border border-border px-2 py-0.5 font-mono text-caption text-muted">
    {children}
  </span>
);
