import { stack } from '../content/stack';

// The full inventory behind the capabilities summary, grouped like the
// resume's skill columns. Icons sit grayscale until hovered, when the brand
// color comes through — information first, logo wall second.
export const TechStack = () => (
  <section
    id="stack"
    data-trace-node="tech stack"
    className="scroll-mt-24 py-16 lg:py-24"
  >
    <h2 className="text-h2">Tech stack</h2>
    <p className="mt-3 max-w-[68ch] text-muted">
      Everything in rotation, from the resume: the capabilities above are the
      shape, this is the toolbox.
    </p>
    <div className="mt-10 space-y-6">
      {stack.map((group) => (
        <div
          key={group.label}
          className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4 sm:grid-cols-[10rem_minmax(0,1fr)]"
        >
          <span className="font-mono text-caption text-text">
            {group.label}
          </span>
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
  </section>
);
