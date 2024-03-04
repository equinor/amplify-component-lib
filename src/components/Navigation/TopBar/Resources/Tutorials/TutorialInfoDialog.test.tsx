import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TutorialInfoDialog, {
  tutorialOptions,
} from 'src/components/Navigation/TopBar/Resources/Tutorials/TutorialInfoDialog';

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

const user = userEvent.setup();
const onClose = vi.fn();

const router = createMemoryRouter(
  [
    {
      path: '/current',
      element: (
        <TutorialInfoDialog
          options={fakeTutorialOptions}
          open={true}
          onClose={onClose}
        />
      ),
    },
  ],
  {
    initialEntries: ['/current'],
    initialIndex: 0,
  }
);

test('Tutorials dialog is open', () => {
  render(<RouterProvider router={router} />);
  const heading = screen.getByText('Tutorials');
  expect(heading).toBeInTheDocument();
});

test('Check if on Current page', () => {
  render(<RouterProvider router={router} />);

  const tutorialPath = fakeTutorialOptions[0].pathName;
  const routePath = window.location.pathname;

  expect(tutorialPath).not.toBe(routePath);
});

test('Check if on other pages', async () => {
  render(<RouterProvider router={router} />);

  const backButton = screen.getByText('Back');
  await user.click(backButton);
  expect(onClose).toHaveBeenCalled();
});
