import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { projects } from '../content/projects';
import { Work } from './Work';

const renderSlug = (slug: string) =>
  render(
    <MemoryRouter initialEntries={[`/work/${slug}`]}>
      <Routes>
        <Route path="/work/:slug" element={<Work />} />
      </Routes>
    </MemoryRouter>
  );

describe('Work', () => {
  it('renders a case study for every project', () => {
    for (const project of projects) {
      const { unmount } = renderSlug(project.slug);
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
        project.name
      );
      expect(
        screen.getByRole('heading', { name: 'The problem' })
      ).not.toBeNull();
      unmount();
    }
  });

  it('shows the not-found message for an unknown slug', () => {
    renderSlug('does-not-exist');
    expect(
      screen.getByText(/doesn't match anything on this site/i)
    ).not.toBeNull();
  });

  it('shows live-site and source-code actions when a project has them', () => {
    renderSlug('custom-playlist-website');
    expect(
      screen.getByRole('link', { name: 'Visit live site' }).getAttribute('href')
    ).toBe('https://one-ok-rock.vercel.app');
    expect(
      screen.getByRole('link', { name: 'Source code' }).getAttribute('href')
    ).toBe('https://github.com/Liam-Moriarty/OOR-Website');
  });

  it('renders the stack as tags and a swipeable gallery for multiple images', () => {
    renderSlug('switchboard');
    expect(screen.getByText('Vertex AI')).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Next image' })).not.toBeNull();
  });

  it('shows honest placeholders when a project has no public links', () => {
    // Like the old portfolio's meta rail: muted rows, never dead links.
    renderSlug('sales-dashboard');
    expect(screen.getByText('Not deployed yet')).not.toBeNull();
    expect(screen.getByText('Not public yet')).not.toBeNull();
  });

  it('links the repository row for projects with a public repo', () => {
    renderSlug('budget-tracker');
    expect(
      screen
        .getByRole('link', { name: /budget-trackerv2/ })
        .getAttribute('href')
    ).toBe('https://github.com/Liam-Moriarty/budget-trackerv2');
  });

  it('cycles the next-project link from the last back to the first', () => {
    renderSlug(projects[projects.length - 1].slug);
    const next = screen.getByRole('link', {
      name: new RegExp(`Next: ${projects[0].name}`),
    });
    expect(next.getAttribute('href')).toBe(`/work/${projects[0].slug}`);
  });
});
