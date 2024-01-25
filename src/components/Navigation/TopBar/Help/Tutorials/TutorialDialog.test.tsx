import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TutorialDialog, { tutorialOptions } from './TutorialDialog';

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
        <TutorialDialog
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

test('Tutorials dialog is open', async () => {
  render(<RouterProvider router={router} />);

  const heading = screen.getByText('Tutorials');
  expect(heading).toBeInTheDocument();
});

test('Check if on Current page', async () => {
  render(<RouterProvider router={router} />);

  const onCurrentPageHeading = screen.queryByText('ON CURRENT PAGE');
  expect(onCurrentPageHeading).toBeInTheDocument();

  const currentPathTutorialItem = screen.queryByText(
    fakeTutorialOptions[0].description
  );
  expect(currentPathTutorialItem).toBeInTheDocument();
});

test('Check if on other pages', async () => {
  render(<RouterProvider router={router} />);
  const onOtherPagesHeading = screen.queryByText('ON OTHER PAGES');
  expect(onOtherPagesHeading).not.toBeInTheDocument();

  fakeTutorialOptions.slice(1).forEach((option) => {
    const otherPathTutorialItem = screen.queryByText(option.description);
    expect(otherPathTutorialItem).toBeInTheDocument();
  });
});

test('Check if on other pages', async () => {
  render(<RouterProvider router={router} />);

  const backButton = screen.getByText('Back');
  await user.click(backButton);
  expect(onClose).toHaveBeenCalled();
});
