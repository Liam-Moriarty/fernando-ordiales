import { LAYERS, type Layer } from '../content/projects';

// The four stacked segments next to a project row: filled = a layer Fernando
// owned on that project (design.md §10). Information, not decoration.
export const LayerIndicator = ({ layers }: { layers: Layer[] }) => (
  <div
    role="img"
    aria-label={`Layers owned: ${layers.join(', ')}`}
    className="flex flex-col gap-1"
  >
    {LAYERS.map(({ key, label }) => (
      <span
        key={key}
        title={label}
        className={`h-1.5 w-10 rounded-xs border ${
          layers.includes(key)
            ? 'border-transparent bg-accent-quiet transition-colors duration-150 group-hover:bg-accent'
            : 'border-border'
        }`}
      />
    ))}
  </div>
);
