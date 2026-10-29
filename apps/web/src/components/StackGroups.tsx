import type { StackItem } from '../content/stack';

// The grouped chip rows shared by the homepage section and the /stack page.
// On phones the label sits above full-width chip rows instead of squeezing
// them into a narrow column.
export const StackGroups = ({
  groups,
}: {
  groups: { label: string; items: StackItem[] }[];
}) => (
  <div className="space-y-8 sm:space-y-6">
    {groups.map((group) => (
      <div
        key={group.label}
        className="grid gap-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-4"
      >
        <span className="font-mono text-caption text-text">{group.label}</span>
        <ul className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item.name}
              className="group/chip inline-flex items-center gap-1.5 rounded-sm border border-border px-2 py-1 font-mono text-caption text-muted transition-colors duration-150 hover:border-accent hover:text-text"
            >
              {item.icon && (
                <item.icon
                  aria-hidden
                  size={14}
                  style={item.color ? { color: item.color } : undefined}
                  className="opacity-70 grayscale transition-[filter,opacity] duration-150 group-hover/chip:opacity-100 group-hover/chip:grayscale-0"
                />
              )}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
