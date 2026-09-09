import { act, Fragment, useRef } from 'react';

import { Button } from '@equinor/eds-core-react';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import { renderHook } from '@testing-library/react';

import { environment, highlightTutorialElementID } from 'src/atoms';
import { TutorialHighlightingProvider } from 'src/providers';
import { useTutorialHighlighting } from 'src/providers/TutorialHighlightingProvider/TutorialHighlightingProvider';
import {
  renderWithRouter,
  screen,
  test,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';
import { FAKE_TUTORIALS, fakeTutorial } from 'src/tests/mockHandlers';

import { http, HttpResponse } from 'msw';
import styled from 'styled-components';

const CUSTOM_CONTENT = {
  ['custom-step-id']: <p>custom content here</p>,
};

const TutorialWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: calc(100% - 1rem);
  box-sizing: border-box;
  > button {
    width: fit-content;
    &:nth-child(3n - 1) {
      justify-self: center;
    }
    &:nth-child(3n) {
      justify-self: flex-end;
    }
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      align-self: center;
    }
    &:nth-child(7),
    &:nth-child(8),
    &:nth-child(9) {
      align-self: flex-end;
    }
  }
`;

const COLUMNS = ['left', 'center', 'right'];
const ROWS = ['top', 'center', 'bottom'];

const CELLS = COLUMNS.flatMap((col) => ROWS.map((row) => `${col} ${row}`));

const TestComponent = ({
  renderTutorials = FAKE_TUTORIALS,
  withCustomContent = false,
  setTutorialIds = true,
  onCellClick,
  interactiveElementSelectors,
  allowScrolling,
}: {
  renderTutorials?: typeof FAKE_TUTORIALS;
  withCustomContent?: boolean;
  setTutorialIds?: boolean;
  onCellClick?: () => void;
  interactiveElementSelectors?: string[];
  allowScrolling?: boolean;
}) => {
  const queryClient = new QueryClient();
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        ref={contentRef}
        style={{
          maxWidth: '100vw',
          height: '100vh',
          overflowX: 'hidden',
        }}
        id="content"
      >
        <TutorialHighlightingProvider
          contentRef={contentRef}
          customStepContent={withCustomContent ? CUSTOM_CONTENT : undefined}
          interactiveElementSelectors={interactiveElementSelectors}
          allowScrolling={allowScrolling}
        >
          {renderTutorials.map((tutorial) => (
            <Fragment key={tutorial.id}>
              <TutorialWrapper>
                {CELLS.map((cell, index) => (
                  <Button
                    key={index}
                    id={
                      setTutorialIds || (!setTutorialIds && index === 0)
                        ? highlightTutorialElementID(tutorial.id, index)
                        : undefined
                    }
                    variant="outlined"
                    onClick={onCellClick}
                  >
                    {cell}
                  </Button>
                ))}
              </TutorialWrapper>
            </Fragment>
          ))}
        </TutorialHighlightingProvider>
      </div>
    </QueryClientProvider>
  );
};

beforeEach(() => {
  window.localStorage.clear();
});

test('Shows unseen tutorial as expected', async () => {
  await renderWithRouter(<TestComponent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });

  const highlightTutorial = FAKE_TUTORIALS[0];

  expect(await screen.findByText(highlightTutorial.name)).toBeInTheDocument();
});

test('Able to skip tutorial as expected', async () => {
  await renderWithRouter(<TestComponent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
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

test('Blocks clicks on other interactive elements while tutorial is showing', async () => {
  const highlightTutorial = FAKE_TUTORIALS[0];
  const handleCellClick = vi.fn();

  await renderWithRouter(
    <TestComponent
      renderTutorials={[highlightTutorial]}
      onCellClick={handleCellClick}
    />,
    { initialEntries: ['/tutorial'], routes: ['/tutorial'] }
  );
  const user = userEvent.setup();

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 1000,
    })
  ).toBeInTheDocument();

  await expect(
    user.click(screen.getByRole('button', { name: 'left center' }))
  ).rejects.toThrowError(/pointer-events: none/);

  expect(handleCellClick).not.toHaveBeenCalled();

  await user.click(screen.getByRole('button', { name: /skip/i }));

  await user.click(screen.getByRole('button', { name: 'left center' }));

  expect(handleCellClick).toHaveBeenCalledTimes(1);
});

test('Disables hover and other pointer effects while tutorial is showing', async () => {
  const highlightTutorial = FAKE_TUTORIALS[0];

  await renderWithRouter(
    <TestComponent
      renderTutorials={[highlightTutorial]}
      interactiveElementSelectors={[
        `#${highlightTutorialElementID(highlightTutorial.id, 4)}`,
      ]}
    />,
    { initialEntries: ['/tutorial'], routes: ['/tutorial'] }
  );

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 1000,
    })
  ).toBeInTheDocument();

  const blocked = screen.getByRole('button', { name: 'left center' });
  const allowed = screen.getByRole('button', { name: 'center center' });

  expect(getComputedStyle(blocked).pointerEvents).toBe('none');
  expect(getComputedStyle(allowed).pointerEvents).toBe('auto');

  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /skip/i }));

  expect(
    getComputedStyle(screen.getByRole('button', { name: 'left center' }))
      .pointerEvents
  ).toBe('auto');
});

test('Blocks events that are not targeting an element', async () => {
  const highlightTutorial = FAKE_TUTORIALS[0];

  await renderWithRouter(
    <TestComponent renderTutorials={[highlightTutorial]} />,
    { initialEntries: ['/tutorial'], routes: ['/tutorial'] }
  );

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 1000,
    })
  ).toBeInTheDocument();

  const wheelEvent = new WheelEvent('wheel', { cancelable: true });
  document.dispatchEvent(wheelEvent);

  expect(wheelEvent.target).not.toBeInstanceOf(Element);
  expect(wheelEvent.defaultPrevented).toBe(true);
});

test('Blocks key presses but allows tabbing while tutorial is showing', async () => {
  const highlightTutorial = FAKE_TUTORIALS[0];

  await renderWithRouter(
    <TestComponent renderTutorials={[highlightTutorial]} />,
    { initialEntries: ['/tutorial'], routes: ['/tutorial'] }
  );

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 1000,
    })
  ).toBeInTheDocument();

  const cell = screen.getByRole('button', { name: 'left center' });

  const tabEvent = new KeyboardEvent('keydown', {
    key: 'Tab',
    cancelable: true,
    bubbles: true,
  });
  cell.dispatchEvent(tabEvent);

  expect(tabEvent.defaultPrevented).toBe(false);

  const enterEvent = new KeyboardEvent('keydown', {
    key: 'Enter',
    cancelable: true,
    bubbles: true,
  });
  cell.dispatchEvent(enterEvent);

  expect(enterEvent.defaultPrevented).toBe(true);
});

test('Keeps elements matching interactiveElementSelectors clickable', async () => {
  const highlightTutorial = FAKE_TUTORIALS[0];
  const handleCellClick = vi.fn();

  await renderWithRouter(
    <TestComponent
      renderTutorials={[highlightTutorial]}
      onCellClick={handleCellClick}
      interactiveElementSelectors={[
        `#${highlightTutorialElementID(highlightTutorial.id, 4)}`,
      ]}
    />,
    { initialEntries: ['/tutorial'], routes: ['/tutorial'] }
  );
  const user = userEvent.setup();

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 1000,
    })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'center center' }));

  expect(handleCellClick).toHaveBeenCalledTimes(1);

  await expect(
    user.click(screen.getByRole('button', { name: 'left center' }))
  ).rejects.toThrowError(/pointer-events: none/);

  expect(handleCellClick).toHaveBeenCalledTimes(1);
});

test('Keeps highlighted element clickable in an interactive tutorial', async ({
  worker,
}) => {
  const interactiveTutorial = {
    ...fakeTutorial({
      id: FAKE_TUTORIALS[0].id,
      willPopUp: true,
      highlightElement: true,
    }),
    isInteractive: true,
  };
  worker.use(
    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json([interactiveTutorial]);
    })
  );
  const handleCellClick = vi.fn();

  await renderWithRouter(
    <TestComponent
      renderTutorials={[FAKE_TUTORIALS[0]]}
      onCellClick={handleCellClick}
    />,
    { initialEntries: ['/tutorial'], routes: ['/tutorial'] }
  );
  const user = userEvent.setup();

  expect(
    await screen.findByText(interactiveTutorial.name, undefined, {
      timeout: 2000,
    })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  await user.click(screen.getByRole('button', { name: 'left top' }));

  expect(handleCellClick).toHaveBeenCalledTimes(1);

  await expect(
    user.click(screen.getByRole('button', { name: 'left center' }))
  ).rejects.toThrowError(/pointer-events: none/);

  expect(handleCellClick).toHaveBeenCalledTimes(1);
});

test('Blocks scrolling on content while tutorial is showing', async () => {
  const highlightTutorial = FAKE_TUTORIALS[0];

  await renderWithRouter(
    <TestComponent renderTutorials={[highlightTutorial]} />,
    { initialEntries: ['/tutorial'], routes: ['/tutorial'] }
  );

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 1000,
    })
  ).toBeInTheDocument();

  const content = document.getElementById('content')!;
  const blockedWheelEvent = new WheelEvent('wheel', { cancelable: true });
  content.dispatchEvent(blockedWheelEvent);

  expect(blockedWheelEvent.defaultPrevented).toBe(true);

  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /skip/i }));

  const allowedWheelEvent = new WheelEvent('wheel', { cancelable: true });
  content.dispatchEvent(allowedWheelEvent);

  expect(allowedWheelEvent.defaultPrevented).toBe(false);
});

test('Keeps scrolling enabled when allowScrolling is set', async () => {
  const highlightTutorial = FAKE_TUTORIALS[0];

  await renderWithRouter(
    <TestComponent renderTutorials={[highlightTutorial]} allowScrolling />,
    { initialEntries: ['/tutorial'], routes: ['/tutorial'] }
  );

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 1000,
    })
  ).toBeInTheDocument();

  const wheelEvent = new WheelEvent('wheel', { cancelable: true });
  document.getElementById('content')!.dispatchEvent(wheelEvent);

  expect(wheelEvent.defaultPrevented).toBe(false);
});

test('Able to click through tutorial as expected', async () => {
  const highlightTutorial = FAKE_TUTORIALS[0];

  await renderWithRouter(
    <TestComponent renderTutorials={[highlightTutorial]} />,
    { initialEntries: ['/tutorial'], routes: ['/tutorial'] }
  );
  const user = userEvent.setup();

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

test('Highlighted tutorial shows as centered if it doesnt find the element', async ({
  worker,
}) => {
  const highlightTutorial = {
    ...fakeTutorial({
      id: FAKE_TUTORIALS[0].id,
      willPopUp: true,
      highlightElement: true,
    }),
  };
  worker.use(
    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json([highlightTutorial]);
    })
  );
  await renderWithRouter(<TestComponent setTutorialIds={false} />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
  const user = userEvent.setup();

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 4000,
    })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  const highlightMask = screen.getByTestId(
    `tutorial-mask-${highlightTutorial.id}`
  );
  expect(highlightMask).toBeInTheDocument();

  await user.click(
    screen.getByRole('button', {
      name: /next/i,
    })
  );

  await waitForElementToBeRemoved(highlightMask);

  expect(
    screen.queryByTestId(`tutorial-mask-${highlightTutorial.id}`)
  ).not.toBeInTheDocument();
});

test('Resizing works', async ({ worker }) => {
  const highlightTutorial = FAKE_TUTORIALS[0];
  worker.use(
    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json([highlightTutorial]);
    })
  );
  await renderWithRouter(<TestComponent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
  const randomWidth = faker.number.int({ min: 100, max: 1920 });
  const randomHeight = faker.number.int({ min: 100, max: 1080 });

  await act(async () => {
    window['innerWidth'] = randomWidth;
    window['innerHeight'] = randomHeight;
    window.dispatchEvent(new Event('resize'));
  });

  expect(
    await screen.findByText(highlightTutorial.name, undefined, {
      timeout: 1000,
    })
  ).toBeInTheDocument();
});

test('Able to click through tutorial with centered steps', async ({
  worker,
}) => {
  const highlightTutorial = {
    ...fakeTutorial({
      id: FAKE_TUTORIALS[0].id,
      willPopUp: true,
      highlightElement: false,
    }),
  };
  worker.use(
    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json([highlightTutorial]);
    })
  );

  await renderWithRouter(<TestComponent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
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

test('Highlighted tutorial shows first', async ({ worker }) => {
  const tutorials = FAKE_TUTORIALS.map((tutorial, index) =>
    fakeTutorial({
      id: tutorial.id,
      willPopUp: true,
      highlightElement: index === 0,
    })
  );
  worker.use(
    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json(tutorials);
    })
  );

  const highlightTutorial = tutorials[0];

  await renderWithRouter(<TestComponent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
  const user = userEvent.setup();

  await waitFor(
    () => expect(screen.getByText(highlightTutorial.name)).toBeInTheDocument(),
    { timeout: 2000 }
  );

  expect(screen.queryByText(tutorials[1].name)).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /skip/i }));

  expect(screen.getByText(tutorials[1].name)).toBeInTheDocument();
});

test('Able to click through tutorial with mixed center/highlight steps', async ({
  worker,
}) => {
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
  worker.use(
    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json([highlightedTutorial]);
    })
  );

  await renderWithRouter(<TestComponent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
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

test('Throws error if step is custom but custom content is not found', async ({
  worker,
}) => {
  worker.use(
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

  await renderWithRouter(<TestComponent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
  const user = userEvent.setup();

  const highlightTutorial = FAKE_TUTORIALS[0];

  await waitFor(
    () => expect(screen.getByText(highlightTutorial.name)).toBeInTheDocument(),
    { timeout: 2000 }
  );

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  expect(spy).toHaveBeenCalled();
});

test('Using hook outside of context throws error', () => {
  expect(() => renderHook(() => useTutorialHighlighting())).toThrowError();
});

test('Custom content works as expected', async ({ worker }) => {
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
  worker.use(
    http.get(`*/api/v1/Tutorial/*`, async () => {
      return HttpResponse.json([highlightedTutorial]);
    })
  );

  await renderWithRouter(<TestComponent withCustomContent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
  const user = userEvent.setup();

  await waitFor(
    () =>
      expect(screen.getByText(highlightedTutorial.name)).toBeInTheDocument(),
    { timeout: 2000 }
  );

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  expect(screen.getByText('custom content here')).toBeInTheDocument();
});

test('Image content works as expected', async ({ worker }) => {
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
  worker.use(
    http.get(`*/api/v1/Tutorial/draft/:appName`, async () => {
      return HttpResponse.json([highlightedTutorial]);
    })
  );

  await renderWithRouter(<TestComponent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
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

test('Image with URL scheme is used directly as src', async ({ worker }) => {
  const imageUrl = 'https://example.com/image.png';
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
        imgUrl: 'some-image-path',
        highlightElement: true,
      },
    ],
  };
  worker.use(
    http.get(`*/api/v1/Tutorial/draft/:appName`, async () => {
      return HttpResponse.json([highlightedTutorial]);
    }),
    http.get(`*/api/v1/Tutorial/gettutorialimage/:path`, async () => {
      return HttpResponse.text(imageUrl);
    })
  );

  await renderWithRouter(<TestComponent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
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

  expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl);
});

test('Image without URL scheme gets base64 prefix', async ({ worker }) => {
  const base64String =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk';
  const highlightedTutorial = {
    id: FAKE_TUTORIALS[0].id,
    name: FAKE_TUTORIALS[0].name,
    path: '/tutorial',
    willPopUp: true,
    application: environment.getEnvironmentName(import.meta.env.VITE_NAME),
    steps: [
      {
        id: '1',
        body: faker.music.artist(),
        imgUrl: 'some-image-path',
        highlightElement: true,
      },
    ],
  };
  worker.use(
    http.get(`*/api/v1/Tutorial/draft/:appName`, async () => {
      return HttpResponse.json([highlightedTutorial]);
    }),
    http.get(`*/api/v1/Tutorial/gettutorialimage/:path`, async () => {
      return HttpResponse.text(base64String);
    })
  );

  const { container } = await renderWithRouter(<TestComponent />, {
    initialEntries: ['/tutorial'],
    routes: ['/tutorial'],
  });
  const user = userEvent.setup();

  await waitFor(
    () =>
      expect(screen.getByText(highlightedTutorial.name)).toBeInTheDocument(),
    { timeout: 2000 }
  );

  await user.click(screen.getByRole('button', { name: /start tour/i }));

  await waitFor(
    () => expect(container.querySelector('img')).toBeInTheDocument(),
    { timeout: 2000 }
  );

  const img = container.querySelector('img')!;
  expect(img).toHaveAttribute('src', `data:image/png;base64,${base64String}`);
  expect(img).toHaveAttribute('alt', '');
});
