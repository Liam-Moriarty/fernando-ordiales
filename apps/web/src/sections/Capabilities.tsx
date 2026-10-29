import { LAYERS } from '../content/projects';

// Not six cards: one connected system, the four layers the trace branches
// into (design.md §1, §6). Each row is a branch target for Task 6.
export const Capabilities = () => (
  <section
    id="capabilities"
    data-trace-node="capabilities"
    className="scroll-mt-24 py-10 sm:py-16 lg:py-24"
  >
    <h2 className="text-h2">Capabilities</h2>
    <p className="mt-3 max-w-[68ch] text-muted">
      Six job titles would be the wrong way to read it. It's one practice: ship
      the AI feature, the interface it lives in, the APIs and data behind it,
      and the infrastructure underneath — then keep it observable.
    </p>
    <div className="mt-10">
      {LAYERS.map((layer) => (
        <div
          key={layer.key}
          data-trace-branch={layer.key}
          className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4 py-4 sm:grid-cols-[10rem_minmax(0,1fr)]"
        >
          <span className="font-mono text-caption text-text">
            {layer.label}
          </span>
          <span className="text-sm text-muted">{layer.tools}</span>
        </div>
      ))}
    </div>
  </section>
);
