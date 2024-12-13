import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';

import { TutorialInfoDialog, tutorialOptions } from './TutorialInfoDialog';

import { expect } from 'vitest';

const fakeTutorialOptions: tutorialOptions[] = [
  {
    description: faker.lorem.sentence(),
    steps: faker.animal.dog(),
    duration: faker.color.rgb(),
    pathName: '/current',
    onClick: vi.fn(),
  },
  {
    description: faker.lorem.sentence(),
    steps: faker.animal.dog(),
    duration: faker.color.rgb(),
    pathName: '/current',
    onClick: vi.fn(),
  },
  {
    description: faker.lorem.sentence(),
    steps: faker.animal.dog(),
    duration: faker.color.rgb(),
    pathName: '/other',
    onClick: vi.fn(),
  },
];

test('Tutorials dialog is open', () => {
  const onClose = vi.fn();
  render(
    <MemoryRouter initialEntries={['/current']}>
      <Routes>
        <Route
          path="/current"
          element={
            <TutorialInfoDialog
              options={fakeTutorialOptions}
              open
              onClose={onClose}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  const heading = screen.getByText('Tutorials');
  expect(heading).toBeInTheDocument();
});

test('Check if on Current page', () => {
  const onClose = vi.fn();
  render(
    <MemoryRouter initialEntries={['/current']}>
      <Routes>
        <Route
          path="/current"
          element={
            <TutorialInfoDialog
              options={fakeTutorialOptions}
              open
              onClose={onClose}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/on current page/i)).toBeInTheDocument();
});

test('Check if on other pages', async () => {
  const onClose = vi.fn();
  render(
    <MemoryRouter initialEntries={['/other']}>
      <Routes>
        <Route
          path="/other"
          element={
            <TutorialInfoDialog
              options={fakeTutorialOptions}
              open
              onClose={onClose}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(/on other pages/i)).toBeInTheDocument();
});
