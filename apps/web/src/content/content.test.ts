import { describe, expect, it } from 'vitest';
import { experience } from './experience';
import { profile } from './profile';
import { LAYERS, projects } from './projects';

const layerKeys = LAYERS.map((layer) => layer.key);

describe('projects', () => {
  it('has unique slugs', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('owns at least one known layer per project', () => {
    for (const project of projects) {
      expect(project.layers.length).toBeGreaterThan(0);
      for (const layer of project.layers) {
        expect(layerKeys).toContain(layer);
      }
    }
  });

  it('ships at least one described image per project, in its own folder', () => {
    for (const project of projects) {
      expect(project.images.length).toBeGreaterThan(0);
      for (const image of project.images) {
        // Every project keeps its images in /projects/<slug>/.
        expect(image.src.startsWith(`/projects/${project.slug}/`)).toBe(true);
        expect(image.alt.length).toBeGreaterThan(0);
        // Dimensions reserve layout space so late images can't shift the page.
        expect(image.width).toBeGreaterThan(0);
        expect(image.height).toBeGreaterThan(0);
      }
    }
  });

  it('features exactly the three flagship projects on the homepage', () => {
    expect(projects.filter((project) => project.featured)).toHaveLength(3);
    expect(projects.length).toBeGreaterThanOrEqual(7);
  });
});

describe('experience', () => {
  it('is sorted newest first', () => {
    const starts = experience.map((entry) => entry.start);
    expect([...starts].sort((a, b) => b - a)).toEqual(starts);
  });
});

describe('profile', () => {
  it('uses the personal email from the resume', () => {
    expect(profile.email).toBe('fernando.ordiales23@gmail.com');
  });

  it('links the real resume PDF and GitHub account', () => {
    expect(profile.links.resume).toBe('/docs/Ordiales-Fernando-Resume.pdf');
    expect(profile.links.github).toBe('https://github.com/Liam-Moriarty');
  });
});
