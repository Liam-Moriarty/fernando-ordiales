import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { BufferAttribute, Color, type Points } from 'three';
import { generateFieldPoints } from './fieldPoints';

const readToken = (name: string): string => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || '#888888';
};

const MAX_TILT = 0.035; // ±2° in radians — a lean toward the cursor, not a chase.

type Palette = { gray: string; accent: string };

const readPalette = (): Palette => ({
  gray: readToken('--theme-muted'),
  accent: readToken('--theme-accent'),
});

type DragRotation = { x: number; y: number };

const Cloud = ({
  count,
  palette,
  dragRotation,
}: {
  count: number;
  palette: Palette;
  dragRotation: React.RefObject<DragRotation>;
}) => {
  const ref = useRef<Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const drift = useRef(0);
  const colorAttribute = useRef<BufferAttribute>(null);
  // Colors chase the palette over ~250ms in useFrame instead of snapping on
  // theme change, matching the page's crossfade (design.md §9).
  const currentColors = useRef({
    gray: new Color(palette.gray),
    accent: new Color(palette.accent),
  });
  const targetColors = useRef({
    gray: new Color(palette.gray),
    accent: new Color(palette.accent),
  });

  useEffect(() => {
    targetColors.current.gray.set(palette.gray);
    targetColors.current.accent.set(palette.accent);
  }, [palette]);

  const points = useMemo(() => generateFieldPoints(count, 7), [count]);

  // The first palette seeds the buffers; later palettes arrive via the
  // useFrame lerp, never by rebuilding the geometry.
  const [initialPalette] = useState(palette);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(points.length * 3);
    const colors = new Float32Array(points.length * 3);
    const gray = new Color(initialPalette.gray);
    const accent = new Color(initialPalette.accent);
    points.forEach((point, i) => {
      positions.set([point.x, point.y, point.z], i * 3);
      (point.accent ? accent : gray).toArray(colors, i * 3);
    });
    return { positions, colors };
  }, [points, initialPalette]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, delta) => {
    const cloud = ref.current;
    if (!cloud) return;
    // The drift never stops; dragging adds an offset on top of it, and the
    // cursor tilt stays a gentle lean (design.md §9 + draggable cloud).
    drift.current += delta * 0.02;
    const drag = dragRotation.current;
    cloud.rotation.y += (drift.current + drag.y - cloud.rotation.y) * 0.08;
    cloud.rotation.x +=
      (pointer.current.y * MAX_TILT + drag.x - cloud.rotation.x) * 0.08;
    cloud.rotation.z +=
      (pointer.current.x * MAX_TILT - cloud.rotation.z) * 0.05;

    const current = currentColors.current;
    const target = targetColors.current;
    const distance =
      Math.abs(current.gray.r - target.gray.r) +
      Math.abs(current.gray.g - target.gray.g) +
      Math.abs(current.gray.b - target.gray.b) +
      Math.abs(current.accent.r - target.accent.r) +
      Math.abs(current.accent.g - target.accent.g) +
      Math.abs(current.accent.b - target.accent.b);
    if (distance > 0) {
      if (distance < 0.01) {
        current.gray.copy(target.gray);
        current.accent.copy(target.accent);
      } else {
        const step = Math.min(delta / 0.25, 1);
        current.gray.lerp(target.gray, step);
        current.accent.lerp(target.accent, step);
      }
      const attribute = colorAttribute.current;
      if (attribute) {
        points.forEach((point, i) => {
          (point.accent ? current.accent : current.gray).toArray(
            attribute.array,
            i * 3
          );
        });
        attribute.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <primitive
          attach="attributes-position"
          object={new BufferAttribute(positions, 3)}
        />
        <primitive
          ref={colorAttribute}
          attach="attributes-color"
          object={new BufferAttribute(colors, 3)}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// Lazy-loaded (React.lazy needs a default export). Pauses whenever the hero
// is off-screen or the tab is hidden; dpr capped at 1.5 (design.md §9).
const ParticleField = ({ count }: { count: number }) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [palette, setPalette] = useState<Palette>(readPalette);
  const dragRotation = useRef<DragRotation>({ x: 0, y: 0 });
  const grab = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = wrapper.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setOnScreen(entry?.isIntersecting ?? true);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    // Re-tint the cloud when the theme toggle rewrites data-theme.
    const observer = new MutationObserver(() => {
      setPalette(readPalette());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  // Mouse-only drag: spin the cloud with the cursor without ever pausing the
  // drift. Touch stays free for page scrolling.
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    grab.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const from = grab.current;
    if (!from) return;
    dragRotation.current = {
      x: Math.min(
        Math.max(
          dragRotation.current.x + (event.clientY - from.y) * 0.004,
          -0.7
        ),
        0.7
      ),
      y: dragRotation.current.y + (event.clientX - from.x) * 0.004,
    };
    grab.current = { x: event.clientX, y: event.clientY };
  };

  const releaseGrab = () => {
    grab.current = null;
  };

  return (
    <div
      ref={wrapper}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={releaseGrab}
      onPointerCancel={releaseGrab}
      onPointerLeave={releaseGrab}
      className="h-full w-full cursor-grab active:cursor-grabbing"
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={onScreen && tabVisible ? 'always' : 'never'}
        camera={{ position: [0, 0, 2.1], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <Cloud count={count} palette={palette} dragRotation={dragRotation} />
      </Canvas>
    </div>
  );
};

export default ParticleField;
