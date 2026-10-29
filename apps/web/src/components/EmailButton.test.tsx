import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { buildMailto, EmailButton, SEND_ENDPOINT } from './EmailButton';

describe('buildMailto', () => {
  it('encodes subject and body as mailto params', () => {
    expect(buildMailto('a@b.c', 'Hi there', 'Line one & two')).toBe(
      'mailto:a@b.c?subject=Hi%20there&body=Line%20one%20%26%20two'
    );
  });

  it('omits empty fields', () => {
    expect(buildMailto('a@b.c', '', '')).toBe('mailto:a@b.c');
    expect(buildMailto('a@b.c', 'Hello', '')).toBe(
      'mailto:a@b.c?subject=Hello'
    );
  });
});

const openAndCompose = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: 'Email me' }));
  await user.type(screen.getByLabelText('Subject'), 'Job offer');
  await user.type(screen.getByLabelText('Message'), 'Hello Fernando');
};

describe('EmailButton', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('sends the message through the form relay and confirms', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    render(<EmailButton />);

    await openAndCompose(user);
    await user.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(screen.getByText(/sent/i)).not.toBeNull());
    // no-cors: FormSubmit omits CORS headers, so the response is opaque —
    // a resolved fetch means delivered, a rejected one means unreachable.
    expect(fetchMock).toHaveBeenCalledWith(
      SEND_ENDPOINT,
      expect.objectContaining({ method: 'POST', mode: 'no-cors' })
    );
    // FormData, not JSON: a JSON body forces a CORS preflight that
    // FormSubmit answers without CORS headers, so the browser blocks it.
    const payload = (fetchMock.mock.calls[0]?.[1] as { body: FormData }).body;
    expect(payload).toBeInstanceOf(FormData);
    expect(payload.get('_subject')).toBe('Job offer');
    expect(payload.get('message')).toBe('Hello Fernando');
  });

  it('disables Send until there is a message', async () => {
    vi.stubGlobal('fetch', vi.fn());
    const user = userEvent.setup();
    render(<EmailButton />);

    await user.click(screen.getByRole('button', { name: 'Email me' }));
    expect(
      screen.getByRole('button', { name: 'Send' }).getAttribute('disabled')
    ).not.toBeNull();
  });

  it('falls back to a mailto link when the relay fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    const user = userEvent.setup();
    render(<EmailButton />);

    await openAndCompose(user);
    await user.click(screen.getByRole('button', { name: 'Send' }));

    const fallback = await screen.findByRole('link', {
      name: /open in your mail app/i,
    });
    expect(fallback.getAttribute('href')).toBe(
      buildMailto(
        'fernando.ordiales23@gmail.com',
        'Job offer',
        'Hello Fernando'
      )
    );
  });

  it('closes on cancel', async () => {
    const user = userEvent.setup();
    render(<EmailButton />);

    await user.click(screen.getByRole('button', { name: 'Email me' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
