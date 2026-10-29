import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { easeGlide } from '../lib/motion';
import { Button } from './Button';

export type SwipeDirection = 'left' | 'right';

// Tinder's release rule: a card leaves once dragged past a distance or
// flicked past a velocity; anything less settles back. Swiping (either side)
// only browses photos — there is no accept/reject meaning here.
export const swipeVerdict = (
  offsetX: number,
  velocityX: number
): SwipeDirection | null => {
  const past = Math.abs(offsetX) > 100;
  const flick = Math.abs(velocityX) > 500;
  if (!past && !flick) return null;
  return (past ? offsetX : velocityX) < 0 ? 'left' : 'right';
};

type DeckImage = { src: string; alt: string; width: number; height: number };

const cardVariants = {
  enter: { scale: 0.96, y: 10, opacity: 0 },
  center: { scale: 1, y: 0, x: 0, rotate: 0, opacity: 1 },
  exit: (direction: SwipeDirection) => ({
    x: direction === 'left' ? -480 : 480,
    rotate: direction === 'left' ? -10 : 10,
    opacity: 0,
    transition: { duration: 0.32, ease: easeGlide },
  }),
};

export const SwipeDeck = ({ images }: { images: DeckImage[] }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<SwipeDirection>('left');
  const reduced = useReducedMotion();

  const count = images.length;
  const top = images[index];
  const peek = images[(index + 1) % count];
  if (!top || !peek) return null;

  const go = (step: 1 | -1, exitTo: SwipeDirection) => {
    setDirection(exitTo);
    setIndex((current) => (current + step + count) % count);
  };

  return (
    <div>
      <div
        className="relative mx-auto w-full"
        style={{
          aspectRatio: `${top.width} / ${top.height}`,
          maxWidth: `min(100%, calc(68vh * ${top.width / top.height}))`,
        }}
      >
        {count > 1 && (
          <div
            aria-hidden
            className="absolute inset-0 translate-y-2 scale-[0.96] overflow-hidden rounded-lg border border-border bg-surface"
          >
            <img
              src={peek.src}
              alt=""
              width={peek.width}
              height={peek.height}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
        )}
        <AnimatePresence initial={false} custom={direction}>
          <motion.figure
            key={top.src}
            custom={direction}
            variants={cardVariants}
            initial={reduced ? { opacity: 0 } : 'enter'}
            animate={reduced ? { opacity: 1 } : 'center'}
            exit={reduced ? { opacity: 0 } : 'exit'}
            transition={{ duration: 0.32, ease: easeGlide }}
            drag={reduced || count < 2 ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, info) => {
              const verdict = swipeVerdict(info.offset.x, info.velocity.x);
              if (verdict) go(1, verdict);
            }}
            style={{ touchAction: 'pan-y' }}
            className="absolute inset-0 cursor-grab overflow-hidden rounded-lg border border-border bg-surface active:cursor-grabbing"
          >
            <img
              src={top.src}
              alt={top.alt}
              width={top.width}
              height={top.height}
              draggable={false}
              className="pointer-events-none h-full w-full object-contain"
            />
          </motion.figure>
        </AnimatePresence>
      </div>
      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Previous image"
            onClick={() => go(-1, 'right')}
          >
            <CaretLeftIcon size={18} />
          </Button>
          <p aria-live="polite" className="font-mono text-caption text-muted">
            {index + 1} / {count}
          </p>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Next image"
            onClick={() => go(1, 'left')}
          >
            <CaretRightIcon size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};
