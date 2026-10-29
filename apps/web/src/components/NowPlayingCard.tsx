import { useState } from 'react';
import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from '@phosphor-icons/react';

// A Spotify-style "now playing" card (Fernando's request, after a reference
// site with an identity card in the hero). The track is the career: the
// progress bar runs 2021 → now. Play only animates the EQ bars — decoration
// that admits it.
export const NowPlayingCard = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-elevated p-4">
      <img
        src="/cover.jpg"
        alt="Fernando walking under string lights at night"
        width={320}
        height={320}
        className="h-14 w-14 rounded-sm object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">Idea to Production</p>
          {playing && (
            <span aria-hidden className="eq flex items-end gap-0.5">
              <i className="h-2.5 w-0.5 origin-bottom bg-accent" />
              <i className="h-2.5 w-0.5 origin-bottom bg-accent" />
              <i className="h-2.5 w-0.5 origin-bottom bg-accent" />
            </span>
          )}
        </div>
        <p className="truncate text-sm text-muted">Fernando Ordiales</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-mono text-caption text-muted">2021</span>
          <span className="relative h-1 flex-1 overflow-hidden rounded-xs bg-accent-quiet">
            <span className="absolute inset-0 origin-left scale-x-[0.85] bg-accent" />
          </span>
          <span className="font-mono text-caption text-muted">now</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <SkipBackIcon aria-hidden size={14} className="text-muted" />
        <button
          type="button"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={() => setPlaying((value) => !value)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-background transition-colors duration-150 hover:bg-accent-hover"
        >
          {playing ? (
            <PauseIcon size={14} weight="fill" />
          ) : (
            <PlayIcon size={14} weight="fill" />
          )}
        </button>
        <SkipForwardIcon aria-hidden size={14} className="text-muted" />
      </div>
    </div>
  );
};
