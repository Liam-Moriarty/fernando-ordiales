import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { buildMailto, EmailButton } from './EmailButton';

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

describe('EmailButton', () => {
  it('opens a compose dialog whose Send link carries the message', async () => {
    const user = userEvent.setup();
    render(<EmailButton />);

    await user.click(screen.getByRole('button', { name: 'Email me' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toBeNull();

    await user.type(screen.getByLabelText('Subject'), 'Job offer');
    await user.type(screen.getByLabelText('Message'), 'Hello Fernando');

    expect(
      screen.getByRole('link', { name: 'Send' }).getAttribute('href')
    ).toBe(
      'mailto:fernando.ordiales23@gmail.com?subject=Job%20offer&body=Hello%20Fernando'
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
