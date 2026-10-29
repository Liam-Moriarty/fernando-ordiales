import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NowPlayingCard } from './NowPlayingCard';

describe('NowPlayingCard', () => {
  it('shows the track, artist and cover art', () => {
    render(<NowPlayingCard />);
    expect(screen.getByText('Idea to Production')).not.toBeNull();
    expect(screen.getByText(/Fernando Ordiales/)).not.toBeNull();
    expect(screen.getByAltText(/walking/i).getAttribute('src')).toBe(
      '/cover.jpg'
    );
  });

  it('play toggles to pause and back', async () => {
    const user = userEvent.setup();
    render(<NowPlayingCard />);

    const play = screen.getByRole('button', { name: 'Play' });
    await user.click(play);
    expect(screen.getByRole('button', { name: 'Pause' })).not.toBeNull();
    await user.click(screen.getByRole('button', { name: 'Pause' }));
    expect(screen.getByRole('button', { name: 'Play' })).not.toBeNull();
  });
});
