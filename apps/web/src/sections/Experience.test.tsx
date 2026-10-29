import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';

describe('Experience', () => {
  it('lists jobs and the training and internship entries', () => {
    render(<Experience />);
    expect(screen.getByText('AI Engineer, Hytel')).not.toBeNull();
    expect(screen.getByText('Training & internships')).not.toBeNull();
    expect(screen.getByText('Frontend Web Developer Intern')).not.toBeNull();
    expect(screen.getByText('Software Engineering Bootcamp')).not.toBeNull();
    expect(screen.getByText('AI Enablement Bootcamp')).not.toBeNull();
  });
});
