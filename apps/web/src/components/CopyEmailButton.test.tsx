import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { CopyEmailButton } from './CopyEmailButton';

const setClipboard = (clipboard: unknown) =>
  Object.defineProperty(window.navigator, 'clipboard', {
    value: clipboard,
    configurable: true,
  });

describe('CopyEmailButton', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('confirms with Copied, then reverts', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });

    render(<CopyEmailButton email="a@b.c" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy email' }));
    await act(async () => {});

    expect(writeText).toHaveBeenCalledWith('a@b.c');
    expect(screen.getByRole('button', { name: 'Copied' })).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(1700);
    });
    expect(screen.getByRole('button', { name: 'Copy email' })).not.toBeNull();
  });

  it('stays quiet when the clipboard is unavailable', async () => {
    setClipboard(undefined);

    render(<CopyEmailButton email="a@b.c" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy email' }));
    await act(async () => {});

    expect(screen.getByRole('button', { name: 'Copy email' })).not.toBeNull();
    expect(screen.queryByText('Copied')).toBeNull();
  });

  it('keeps its label when the copy is denied', async () => {
    setClipboard({ writeText: vi.fn().mockRejectedValue(new Error('denied')) });

    render(<CopyEmailButton email="a@b.c" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy email' }));
    await act(async () => {});

    expect(screen.getByRole('button', { name: 'Copy email' })).not.toBeNull();
  });
});
