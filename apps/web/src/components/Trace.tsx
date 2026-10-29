import { useLayoutEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

// The signature element (design.md §1, §9): one lavender line drawn down the
// homepage's left rail by scroll, a node per section, short branches into the
// capability rows. The only scroll-driven motion on the site. Under reduced
// motion (or without matchMedia) it renders fully drawn and GSAP never loads.

// Maps a rail y-coordinate onto the scrubbed timeline [0, 1], where 1 is the
// moment the drawn line reaches the LAST NODE (the line ends there, so dots
// and branches must be scaled to the same end or they fire early).
export const traceScale =
  (start: number, end: number) =>
  (y: number): number =>
    Math.min(Math.max((y - start) / Math.max(end - start, 1), 0), 1);

type Geometry = {
  height: number;
  lineX: number;
  railWidth: number;
  start: number;
  nodes: { y: number; label: string }[];
  branches: { y: number }[];
};

const measure = (wrapper: HTMLDivElement): Geometry | null => {
  const wrapperRect = wrapper.getBoundingClientRect();
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('[data-trace-node]')
  );
  if (sections.length === 0) return null;

  const centerOf = (element: HTMLElement) => {
    const anchor = element.querySelector('h2') ?? element;
    const rect = anchor.getBoundingClientRect();
    return rect.top - wrapperRect.top + rect.height / 2;
  };

  const startEl = document.querySelector<HTMLElement>('[data-trace-start]');
  const startRect = startEl?.getBoundingClientRect();
  const firstNodeY = centerOf(sections[0]);
  const start = startRect
    ? Math.min(startRect.bottom - wrapperRect.top + 24, firstNodeY)
    : Math.max(firstNodeY - 160, 0);

  return {
    height: wrapper.clientHeight,
    lineX: Math.min(Math.max(wrapper.clientWidth * 0.3, 8), 14),
    railWidth: wrapper.clientWidth,
    start,
    nodes: sections.map((section) => ({
      y: centerOf(section),
      label: section.dataset.traceNode ?? '',
    })),
    branches: Array.from(
      document.querySelectorAll<HTMLElement>('[data-trace-branch]')
    ).map((row) => {
      const rect = row.getBoundingClientRect();
      return { y: rect.top - wrapperRect.top + rect.height / 2 };
    }),
  };
};

export const Trace = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [staticMode] = useState(() => prefersReducedMotion());

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let frame = 0;
    const remeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setGeometry(measure(wrapper)));
    };

    // First measure is synchronous so the rail is present on first paint.
    setGeometry(measure(wrapper));
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (staticMode || !geometry || !wrapper) return;

    let cancelled = false;
    let context: { revert: () => void } | undefined;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        const main = wrapper.querySelector<SVGPathElement>('[data-trace-path]');
        if (!main) return;
        const length = main.getTotalLength();
        const lastNodeY = geometry.nodes.at(-1)?.y ?? geometry.height;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 65%',
            end: 'bottom 85%',
            scrub: 0.5,
          },
        });

        timeline.fromTo(
          main,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1, ease: 'none' },
          0
        );

        const at = traceScale(geometry.start, lastNodeY);

        for (const dot of wrapper.querySelectorAll<SVGCircleElement>(
          '[data-trace-node-dot]'
        )) {
          timeline.to(
            dot,
            { opacity: 1, duration: 0.02, ease: 'none' },
            at(Number(dot.dataset.y))
          );
        }

        for (const branch of wrapper.querySelectorAll<SVGPathElement>(
          '[data-trace-branch-path]'
        )) {
          const branchLength = branch.getTotalLength();
          timeline.fromTo(
            branch,
            { strokeDasharray: branchLength, strokeDashoffset: branchLength },
            { strokeDashoffset: 0, duration: 0.03, ease: 'none' },
            at(Number(branch.dataset.y))
          );
        }
      }, wrapper);
    })();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, [staticMode, geometry]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-5 sm:w-8 lg:left-12 lg:w-16"
    >
      {geometry && (
        <svg
          aria-hidden="true"
          width="100%"
          height={geometry.height}
          data-static={staticMode ? 'true' : undefined}
          className="overflow-visible"
        >
          {/* Track: the undrawn path, always visible. */}
          <path
            d={`M ${geometry.lineX} ${geometry.start} V ${geometry.nodes.at(-1)?.y ?? geometry.height}`}
            fill="none"
            stroke="var(--color-accent-quiet)"
            strokeWidth="1.5"
          />
          {/* Drawn line, scrubbed by scroll (or complete in static mode). */}
          <path
            data-trace-path
            d={`M ${geometry.lineX} ${geometry.start} V ${geometry.nodes.at(-1)?.y ?? geometry.height}`}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
          />
          {geometry.branches.map((branch) => (
            <path
              key={branch.y}
              data-trace-branch-path
              data-y={branch.y}
              d={`M ${geometry.lineX} ${branch.y} H ${geometry.railWidth - 6}`}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
            />
          ))}
          {geometry.nodes.map((node, index) => {
            const terminal = index === geometry.nodes.length - 1;
            return (
              <g key={node.label || node.y}>
                <circle
                  cx={geometry.lineX}
                  cy={node.y}
                  r={terminal ? 4 : 3}
                  fill="var(--color-background)"
                  stroke="var(--color-accent-quiet)"
                  strokeWidth="1.5"
                />
                <circle
                  data-trace-node-dot
                  data-y={node.y}
                  cx={geometry.lineX}
                  cy={node.y}
                  r={terminal ? 4 : 3}
                  fill="var(--color-accent)"
                  opacity={staticMode ? 1 : 0}
                />
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
};
