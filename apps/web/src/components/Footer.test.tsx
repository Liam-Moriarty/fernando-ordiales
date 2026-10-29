import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('links email, resume and every social profile', () => {
    render(<Footer />);

    expect(
      screen.getByRole('link', { name: 'Email' }).getAttribute('href')
    ).toBe('mailto:fernando.ordiales23@gmail.com');
    const resume = screen.getByRole('link', { name: 'Resume (PDF)' });
    expect(resume.getAttribute('href')).toBe(
      '/docs/Ordiales-Fernando-Resume.pdf'
    );
    expect(resume.getAttribute('target')).toBe('_blank');

    const socials: [string, string][] = [
      ['GitHub', 'https://github.com/Liam-Moriarty'],
      [
        'LinkedIn',
        'https://www.linkedin.com/in/fernando-jose-ordiales-0164802b7/',
      ],
      ['Instagram', 'https://www.instagram.com/panic.at_rebisco/'],
      ['Facebook', 'https://www.facebook.com/Izumi456'],
    ];
    for (const [name, href] of socials) {
      const link = screen.getByRole('link', { name });
      expect(link.getAttribute('href')).toBe(href);
      expect(link.getAttribute('target')).toBe('_blank');
    }
  });
});
