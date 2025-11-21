import {
  MyTutorialDto,
  TutorialProvider,
} from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { waitFor } from '@testing-library/react';

import { Tutorials } from './Tutorials';
import { environment } from 'src/atoms';
import {
  Providers,
  renderWithRouter,
  screen,
  test,
  userEvent,
} from 'src/tests/browsertest-utils';
import { fakeTutorial } from 'src/tests/mockHandlers';

import { http, HttpResponse } from 'msw';

const tutorials: MyTutorialDto[] = new Array(
  faker.number.int({ min: 3, max: 8 })
)
  .fill(0)
  .map((_, index) =>
    fakeTutorial({
      id: faker.string.uuid(),
      willPopUp: index !== 0,
      highlightElement: true,
      path: index === 0 ? '/' : undefined,
    })
  );

const tutorialHandler = http.get(
  `*/api/v1/Tutorial/draft/:appName`,
  async () => {
    return HttpResponse.json(tutorials);
  }
);

test('Renders expected items when opening the tutorials menu', async ({
  worker,
}) => {
  worker.use(tutorialHandler);
  await renderWithRouter(
    <TutorialProvider>
      <Tutorials />
    </TutorialProvider>,
    {
      routes: ['/'],
      initialEntries: ['/'],
    },
    { wrapper: Providers }
  );
  const user = userEvent.setup();

  await user.click(await screen.findByRole('button'));

  await waitFor(() =>
    expect(screen.getByText(`Available Tutorials (1)`)).toBeInTheDocument()
  );

  expect(screen.getByText('For current page')).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: tutorials[0].name })
  ).toBeInTheDocument();
});

test('Hides expected tutorials when providing filter fn', async ({
  worker,
}) => {
  worker.use(tutorialHandler);
  const filterFunction = (tutorial: MyTutorialDto) => tutorial.willPopUp;
  await renderWithRouter(
    <TutorialProvider>
      <Tutorials filterTutorials={filterFunction} />
    </TutorialProvider>,
    {
      routes: ['/tutorial'],
      initialEntries: ['/tutorial'],
    },
    { wrapper: Providers }
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  await waitFor(() =>
    expect(
      screen.getByText(
        `Available Tutorials (${tutorials.filter(filterFunction).length})`
      )
    ).toBeInTheDocument()
  );

  for (const tutorial of tutorials) {
    if (tutorial.willPopUp) {
      expect(
        screen.getByRole('button', { name: tutorial.name })
      ).toBeInTheDocument();
    } else {
      expect(
        screen.queryByRole('button', { name: tutorial.name })
      ).not.toBeInTheDocument();
    }
  }
});

test('Clicking TutorialItem triggers callback, so we can navigate / do whatever we need', async ({
  worker,
}) => {
  worker.use(tutorialHandler);
  const callback = vi.fn();

  await renderWithRouter(
    <TutorialProvider>
      <Tutorials onTutorialStart={callback} />
    </TutorialProvider>,
    {
      routes: ['/tutorial'],
      initialEntries: ['/tutorial'],
    },
    { wrapper: Providers }
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  await waitFor(() =>
    expect(
      screen.getByText(`Available Tutorials (${tutorials.length})`)
    ).toBeInTheDocument()
  );

  const randomTutorial = faker.helpers.arrayElement(tutorials);
  const tutorialItem = screen.getByRole('button', {
    name: randomTutorial.name,
  });

  await user.click(tutorialItem);

  expect(callback).toHaveBeenCalledWith(randomTutorial.id);
});

test('Shows "completed" if tutorial has been seen', async ({ worker }) => {
  worker.use(tutorialHandler);
  const randomTutorial = faker.helpers.arrayElement(tutorials);
  window.localStorage.setItem(
    `sam-seen-tutorials-${environment.getAppName(import.meta.env.VITE_NAME)}`,
    JSON.stringify([randomTutorial.id])
  );
  const callback = vi.fn();
  await renderWithRouter(
    <TutorialProvider>
      <Tutorials onTutorialStart={callback} />
    </TutorialProvider>,
    {
      routes: ['/tutorial'],
      initialEntries: ['/tutorial'],
    },
    { wrapper: Providers }
  );
  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  await waitFor(() =>
    expect(
      screen.getByText(`Available Tutorials (${tutorials.length})`)
    ).toBeInTheDocument()
  );

  expect(
    screen.getByRole('button', {
      name: `COMPLETED ${randomTutorial.name}`,
    })
  ).toBeInTheDocument();
});

test('Able to add html attributes to tutorial button', async ({ worker }) => {
  worker.use(tutorialHandler);
  const randomTestId = faker.animal.dog();
  const randomId = faker.animal.snake();
  await renderWithRouter(
    <TutorialProvider>
      <Tutorials data-testid={randomTestId} id={randomId} />
    </TutorialProvider>,
    {
      routes: ['/tutorial'],
      initialEntries: ['/tutorial'],
    },
    { wrapper: Providers }
  );

  const button = screen.getByTestId(randomTestId);
  expect(button).toBeInTheDocument();
  expect(button).toHaveAttribute('id', randomId);
});
