import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SwipeDeck, swipeVerdict } from './SwipeDeck';

describe('swipeVerdict', () => {
  it('stays put below the distance and velocity thresholds', () => {
    expect(swipeVerdict(40, 100)).toBeNull();
    expect(swipeVerdict(-99, -499)).toBeNull();
  });

  it('swipes by drag distance', () => {
    expect(swipeVerdict(-140, 0)).toBe('left');
    expect(swipeVerdict(140, 0)).toBe('right');
  });

  it('swipes by flick velocity even on a short drag', () => {
    expect(swipeVerdict(-20, -800)).toBe('left');
    expect(swipeVerdict(20, 800)).toBe('right');
  });
});

const images = [
  { src: '/projects/x/1.jpg', alt: 'first screen', width: 10, height: 10 },
  { src: '/projects/x/2.jpg', alt: 'second screen', width: 10, height: 10 },
  { src: '/projects/x/3.jpg', alt: 'third screen', width: 10, height: 10 },
];

describe('SwipeDeck', () => {
  it('shows the first image and the position counter', () => {
    render(<SwipeDeck images={images} />);
    expect(screen.getByAltText('first screen')).not.toBeNull();
    expect(screen.getByText('1 / 3')).not.toBeNull();
  });

  it('cycles forward and backward with the buttons, wrapping around', async () => {
    const user = userEvent.setup();
    render(<SwipeDeck images={images} />);

    await user.click(screen.getByRole('button', { name: 'Next image' }));
    expect(await screen.findByAltText('second screen')).not.toBeNull();
    expect(screen.getByText('2 / 3')).not.toBeNull();

    await user.click(screen.getByRole('button', { name: 'Previous image' }));
    await user.click(screen.getByRole('button', { name: 'Previous image' }));
    expect(await screen.findByAltText('third screen')).not.toBeNull();
    expect(screen.getByText('3 / 3')).not.toBeNull();
  });
});
