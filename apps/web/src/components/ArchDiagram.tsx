import { LAYERS, type Project } from '../content/projects';

// A layer-level architecture sketch drawn from the project's owned layers.
// It uses the page's CSS tokens, so it re-themes with the toggle (design.md
// §11). Replace with a real per-project diagram when one exists.
const ROW = 56;
const WIDTH = 280;

export const ArchDiagram = ({ project }: { project: Project }) => {
  const owned = LAYERS.filter((layer) => project.layers.includes(layer.key));
  const height = owned.length * ROW + 8;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      role="img"
      aria-label={`Architecture layers ${project.name} covered: ${owned
        .map((layer) => layer.label)
        .join(', ')}`}
      className="w-full max-w-70"
    >
      {owned.map((layer, index) => {
        const y = index * ROW + 4;
        return (
          <g key={layer.key}>
            <rect
              x="4"
              y={y}
              width={WIDTH - 8}
              height="36"
              rx="6"
              fill="var(--color-surface)"
              stroke="var(--color-border)"
              strokeWidth="1.5"
            />
            <text
              x="20"
              y={y + 23}
              fill="var(--color-text)"
              style={{ font: '12px var(--font-mono)' }}
            >
              {layer.label}
            </text>
            {index < owned.length - 1 && (
              <g stroke="var(--color-accent)" strokeWidth="1.5">
                <line x1={WIDTH / 2} y1={y + 40} x2={WIDTH / 2} y2={y + ROW} />
                <path
                  d={`M ${WIDTH / 2 - 3.5} ${y + ROW - 5} L ${WIDTH / 2} ${y + ROW} L ${WIDTH / 2 + 3.5} ${y + ROW - 5}`}
                  fill="none"
                />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};
