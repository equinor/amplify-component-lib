import { Fragment } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { Button, Card, Divider, Typography } from '@equinor/eds-core-react';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';

import { environment, highlightTutorialElementID } from 'src/atoms';
import { TutorialHighlightingProvider } from 'src/providers';
import { useTutorialHighlighting } from 'src/providers/TutorialHighlightingProvider/TutorialHighlightingProvider';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';
import {
  FAKE_TUTORIALS,
  fakeTutorial,
  getTutorialImageHandler,
  tokenHandler,
} from 'src/tests/mockHandlers';
import { worker } from 'src/tests/setupBrowserTests';

import { http, HttpResponse } from 'msw';

const CUSTOM_CONTENT = {
  ['custom-step-id']: <p>custom content here</p>,
};

const TestComponent = ({
  withCustomContent = false,
}: {
  withCustomContent?: boolean;
}) => {
  const queryClient = new QueryClient();
  return (
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            path: '/tutorial',
            element: (
              <QueryClientProvider client={queryClient}>
                <div
                  style={{
                    maxWidth: '100vw',
                    maxHeight: '10vh',
                    overflow: 'auto',
                  }}
                  id="content"
                >
                  <TutorialHighlightingProvider
                    customStepContent={
                      withCustomContent ? CUSTOM_CONTENT : undefined
                    }
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '10rem',
                        gap: '1rem',
                      }}
                    >
                      <Fragment>
                        <Card
                          style={{ padding: '1rem' }}
                          id={highlightTutorialElementID(
                            FAKE_TUTORIALS[0].id,
                            0
                          )}
                        >
                          <Card.HeaderTitle>
                            <Typography variant="h2">
                              {faker.airline.airport().name +
                                ' ' +
                                faker.airline.airport().iataCode}
                            </Typography>
                          </Card.HeaderTitle>
                          <Card.Actions>
                            <Button variant="outlined">Stop</Button>
                            <Button
                              id={highlightTutorialElementID(
                                FAKE_TUTORIALS[0].id,
                                1
                              )}
                            >
                              Start
                            </Button>
                          </Card.Actions>
                        </Card>
                        <Card
                          style={{ padding: '1rem' }}
                          id={highlightTutorialElementID(
                            FAKE_TUTORIALS[0].id,
                            2
                          )}
                        >
                          <Card.HeaderTitle>
                            <Typography variant="h2">
                              {faker.airline.airplane().name +
                                ' ' +
                                faker.airline.airplane().iataTypeCode}
                            </Typography>
                          </Card.HeaderTitle>
                        </Card>
                        <Divider />
                      </Fragment>
                      <Typography
                        id={highlightTutorialElementID(FAKE_TUTORIALS[0].id, 3)}
                        style={{ marginTop: '80vh' }}
                      >
                        This is some text really far away
                      </Typography>
                    </div>
                  </TutorialHighlightingProvider>
                </div>
              </QueryClientProvider>
            ),
          },
        ],
        { initialEntries: ['/tutorial'] }
      )}
    />
  );
};

beforeEach(() => {
  window.localStorage.clear();
});

test('Shows unseen tutorial as expected', async () => {
  render(<TestComponent />);

  const highlightTutorial = FAKE_TUTORIALS[0];

  expect(await screen.findByText(highlightTutorial.name)).toBeInTheDocument();
});

test('Able to skip tutorial as expected', async () => {
  render(<TestComponent />);
  const user = userEvent.setup();

  const highlightTutorial = FAKE_TUTORIALS[0];

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 1000,
    })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /skip/i }));

  expect(screen.queryByText(highlightTutorial.name)).not.toBeInTheDocument();
});

test('Able to click through tutorial as expected', async () => {
  render(<TestComponent />);
  const user = userEvent.setup();

  const highlightTutorial = FAKE_TUTORIALS[0];

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 1000,
    })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  for (const [index, step] of highlightTutorial.steps.entries()) {
    expect(screen.getByText(step.title!)).toBeInTheDocument();
    expect(screen.getByText(step.body!)).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name:
          index !== highlightTutorial.steps.length - 1 ? /next/i : /finish/i,
      })
    );

    await waitFor(() =>
      expect(screen.queryByText(step.title!)).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByText(step.body!)).not.toBeInTheDocument()
    );
  }
});

test('Able to click through tutorial with centered steps', async () => {
  const highlightTutorial = {
    ...fakeTutorial(FAKE_TUTORIALS[0].id, true, false),
  };
  worker.resetHandlers(
    tokenHandler,

    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json([highlightTutorial]);
    })
  );

  render(<TestComponent />);
  const user = userEvent.setup();

  await waitFor(
    () => expect(screen.getByText(highlightTutorial.name)).toBeInTheDocument(),
    { timeout: 2000 }
  );

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  for (const [index, step] of highlightTutorial.steps.entries()) {
    expect(screen.getByText(step.title!)).toBeInTheDocument();
    expect(screen.getByText(step.body!)).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name:
          index !== highlightTutorial.steps.length - 1 ? /next/i : /finish/i,
      })
    );

    expect(screen.queryByText(step.title!)).not.toBeInTheDocument();
    expect(screen.queryByText(step.body!)).not.toBeInTheDocument();
  }
});

test('Highlighted tutorial shows first', async () => {
  const tutorials = FAKE_TUTORIALS.map((tutorial, index) =>
    fakeTutorial(tutorial.id, true, index === 0)
  );
  worker.resetHandlers(
    tokenHandler,

    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json(tutorials);
    })
  );

  const highlightTutorial = tutorials[0];

  render(<TestComponent />);
  const user = userEvent.setup();

  await waitFor(
    () => expect(screen.getByText(highlightTutorial.name)).toBeInTheDocument(),
    { timeout: 2000 }
  );

  expect(screen.queryByText(tutorials[1].name)).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /skip/i }));

  expect(screen.getByText(tutorials[1].name)).toBeInTheDocument();
});

test('Able to click through tutorial with mixed center/highlight steps', async () => {
  const highlightedTutorial = {
    id: FAKE_TUTORIALS[0].id,
    name: FAKE_TUTORIALS[0].name,
    path: '/tutorial',
    willPopUp: true,
    application: environment.getEnvironmentName(import.meta.env.VITE_NAME),
    steps: [
      {
        id: '1',
        title: faker.vehicle.vehicle(),
        body: faker.music.artist(),
        highlightElement: false,
      },
      {
        id: '2',
        title: faker.vehicle.vehicle(),
        body: faker.music.artist(),
        highlightElement: true,
      },
      {
        id: '3',
        title: faker.vehicle.vehicle(),
        body: faker.music.artist(),
        highlightElement: false,
      },
    ],
  };
  worker.resetHandlers(
    tokenHandler,

    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json([highlightedTutorial]);
    })
  );

  render(<TestComponent />);
  const user = userEvent.setup();

  await waitFor(
    () =>
      expect(screen.getByText(highlightedTutorial.name)).toBeInTheDocument(),
    { timeout: 2000 }
  );

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  for (const [index, step] of highlightedTutorial.steps.entries()) {
    expect(screen.getByText(step.title!)).toBeInTheDocument();
    expect(screen.getByText(step.body!)).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name:
          index !== highlightedTutorial.steps.length - 1 ? /next/i : /finish/i,
      })
    );

    expect(screen.queryByText(step.title!)).not.toBeInTheDocument();
    expect(screen.queryByText(step.body!)).not.toBeInTheDocument();
  }
});

test('Throws error if step is custom but custom content is not found', async () => {
  worker.resetHandlers(
    tokenHandler,

    http.get(`*/api/v1/Tutorial/draft/:appName`, async () => {
      return HttpResponse.json([
        {
          id: FAKE_TUTORIALS[0].id,
          name: FAKE_TUTORIALS[0].name,
          path: '/tutorial',
          willPopUp: true,
          application: environment.getEnvironmentName(
            import.meta.env.VITE_NAME
          ),
          steps: [
            {
              id: '1',
              title: faker.vehicle.vehicle(),
              highlightElement: true,
              custom: true,
            },
            {
              id: '2',
              title: faker.vehicle.vehicle(),
              body: faker.music.artist(),
              highlightElement: true,
            },
            {
              id: '3',
              title: faker.vehicle.vehicle(),
              body: faker.music.artist(),
              highlightElement: false,
            },
          ],
        },
      ]);
    })
  );

  const spy = vi.spyOn(console, 'error');

  render(<TestComponent />);
  const user = userEvent.setup();

  const highlightTutorial = FAKE_TUTORIALS[0];

  await waitFor(
    () => expect(screen.getByText(highlightTutorial.name)).toBeInTheDocument(),
    { timeout: 2000 }
  );

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  expect(spy).toHaveBeenCalled();
});

test('Logs warning if step element is not found', async () => {
  const fakeId = faker.string.uuid();
  const fakeTitle = faker.book.title();

  worker.resetHandlers(
    tokenHandler,

    http.get(`*/api/v1/Tutorial/draft/:appName`, async () => {
      return HttpResponse.json([
        {
          id: fakeId,
          name: fakeTitle,
          path: '/tutorial',
          willPopUp: true,
          application: environment.getEnvironmentName(
            import.meta.env.VITE_NAME
          ),
          steps: [
            {
              id: '1',
              title: faker.vehicle.vehicle(),
              body: faker.music.artist(),
              highlightElement: true,
            },
            {
              id: '2',
              title: faker.vehicle.vehicle(),
              body: faker.music.artist(),
              highlightElement: true,
            },
            {
              id: '3',
              title: faker.vehicle.vehicle(),
              body: faker.music.artist(),
              highlightElement: false,
            },
          ],
        },
      ]);
    })
  );

  const spy = vi.spyOn(console, 'warn');

  render(<TestComponent />);
  const user = userEvent.setup();

  await waitFor(() => expect(screen.getByText(fakeTitle)).toBeInTheDocument(), {
    timeout: 2000,
  });

  expect(spy).toHaveBeenCalledWith(
    `[TutorialHighlightingProvider]: Element with ID sam-tutorial-${fakeId}-0 not found`
  );
  expect(
    screen.queryByTestId(`tutorial-mask-${fakeId}`)
  ).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  expect(spy).toHaveBeenCalledWith(
    `[TutorialHighlightingProvider]: Element with ID sam-tutorial-${fakeId}-0 not found`
  );
  expect(
    screen.queryByTestId(`tutorial-mask-${fakeId}`)
  ).not.toBeInTheDocument();
});

test('Using hook outside of context throws error', () => {
  expect(() => renderHook(() => useTutorialHighlighting())).toThrowError();
});

test('Custom content works as expected', async () => {
  const highlightedTutorial = {
    id: FAKE_TUTORIALS[0].id,
    name: FAKE_TUTORIALS[0].name,
    path: '/tutorial',
    willPopUp: true,
    application: environment.getEnvironmentName(import.meta.env.VITE_NAME),
    steps: [
      {
        id: 'custom-step-id',
        title: faker.vehicle.vehicle(),
        body: faker.music.artist(),
        custom: true,
      },
      {
        id: '2',
        title: faker.vehicle.vehicle(),
        body: faker.music.artist(),
        highlightElement: true,
      },
      {
        id: '3',
        title: faker.vehicle.vehicle(),
        body: faker.music.artist(),
        highlightElement: false,
      },
    ],
  };
  worker.resetHandlers(
    tokenHandler,

    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json([highlightedTutorial]);
    })
  );

  render(<TestComponent withCustomContent />);
  const user = userEvent.setup();

  await waitFor(
    () =>
      expect(screen.getByText(highlightedTutorial.name)).toBeInTheDocument(),
    { timeout: 2000 }
  );

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  expect(screen.getByText('custom content here')).toBeInTheDocument();
});

test('Image content works as expected', async () => {
  const highlightedTutorial = {
    id: FAKE_TUTORIALS[0].id,
    name: FAKE_TUTORIALS[0].name,
    path: '/tutorial',
    willPopUp: true,
    application: environment.getEnvironmentName(import.meta.env.VITE_NAME),
    steps: [
      {
        id: '1',
        title: faker.vehicle.vehicle(),
        body: faker.music.artist(),
        imgUrl: faker.animal.dog(),
        highlightElement: true,
      },
      {
        id: '2',
        title: faker.vehicle.vehicle(),
        body: faker.music.artist(),
        highlightElement: true,
      },
      {
        id: '3',
        title: faker.vehicle.vehicle(),
        body: faker.music.artist(),
        highlightElement: false,
      },
    ],
  };
  worker.resetHandlers(
    tokenHandler,
    getTutorialImageHandler,
    http.get(`*/api/v1/Tutorial/draft/:appName`, async () => {
      return HttpResponse.json([highlightedTutorial]);
    })
  );

  render(<TestComponent />);
  const user = userEvent.setup();

  await waitFor(
    () =>
      expect(screen.getByText(highlightedTutorial.name)).toBeInTheDocument(),
    { timeout: 2000 }
  );

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument(), {
    timeout: 2000,
  });
});
