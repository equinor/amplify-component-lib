import { Fragment, useRef } from 'react';

import { Button, Card, Divider, Typography } from '@equinor/eds-core-react';
import { MyTutorialDto } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { TutorialHighlightingProvider } from './TutorialHighlightingProvider';
import page from './TutorialHighlightingProvider.docs.mdx';
import { highlightTutorialElementID } from 'src/atoms';
import { environment } from 'src/atoms/utils/auth_environment';
import {
  fakeTutorial,
  getTutorialImageHandler,
  tokenHandler,
} from 'src/tests/mockHandlers';

import { http, HttpResponse } from 'msw';
import { expect, userEvent } from 'storybook/test';

const TUTORIAL_IDS = [faker.string.uuid(), faker.string.uuid()];

function RouteComponent() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={contentRef}
      style={{
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'auto',
      }}
      id="content"
    >
      <TutorialHighlightingProvider contentRef={contentRef}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10rem 0',
            gap: '1rem',
          }}
        >
          {TUTORIAL_IDS.map((id) => (
            <Fragment key={id}>
              <Card
                style={{ padding: '1rem' }}
                id={highlightTutorialElementID(id, 0)}
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
                  <Button id={highlightTutorialElementID(id, 1)}>Start</Button>
                </Card.Actions>
              </Card>
              <Card style={{ padding: '1rem' }}>
                <Card.HeaderTitle>
                  <Typography variant="h2">
                    {faker.airline.airplane().name +
                      ' ' +
                      faker.airline.airplane().iataTypeCode}
                  </Typography>
                </Card.HeaderTitle>
                <Button
                  id={highlightTutorialElementID(id, 2)}
                  variant="outlined"
                  style={{ marginLeft: 'auto' }}
                >
                  Stop
                </Button>
              </Card>
              <Divider />
            </Fragment>
          ))}
          <Typography
            id={highlightTutorialElementID(TUTORIAL_IDS[0], 3)}
            style={{ marginTop: '80vh' }}
          >
            This is some text really far away
          </Typography>
        </div>
      </TutorialHighlightingProvider>
    </div>
  );
}

const meta: Meta = {
  title: 'Providers/TutorialHighlightingProvider',
  component: RouteComponent,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    router: {
      initialEntries: ['/tutorial'],
      routes: ['/tutorial'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xRWyfJ7Ee4CjcUs91RA0sx/%E2%9A%99%EF%B8%8F-SAM---Design?node-id=942-49931&m=dev',
    },
  },
  loaders: [
    () => {
      localStorage.removeItem(
        `sam-seen-tutorials-${environment.getAppName(import.meta.env.VITE_NAME)}`
      );
    },
  ],
};

export default meta;

export const HowToUse: StoryObj = {
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        dark: true,
      },
    },
  },
  render: page,
};

const highlightElementTutorials = TUTORIAL_IDS.map((id, index) =>
  fakeTutorial({
    id,
    willPopUp: index === 0,
    highlightElement: true,
    stepAmount: 4,
  })
);

export const Default: StoryObj = {
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get(`*/api/v1/Tutorial/*`, async () => {
          return HttpResponse.json(highlightElementTutorials);
        }),
      ],
    },
  },
};

export const HighlightingElement: StoryObj = {
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get(`*/api/v1/Tutorial/*`, async () => {
          return HttpResponse.json(highlightElementTutorials);
        }),
      ],
    },
  },
  play: async ({ canvas }) => {
    const highlightTutorial = highlightElementTutorials[0];

    await expect(
      await canvas.findByText(highlightTutorial.name)
    ).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: /start tour/i }));
  },
};

export const MultipleHighlightingElement: StoryObj = {
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get(`*/api/v1/Tutorial/*`, async () => {
          const tutorials: MyTutorialDto[] = TUTORIAL_IDS.map((id) =>
            fakeTutorial({
              id,
              willPopUp: true,
              highlightElement: true,
              stepAmount: 4,
            })
          );

          return HttpResponse.json(tutorials);
        }),
      ],
    },
  },
};

export const CenterTutorial: StoryObj = {
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get(`*/api/v1/Tutorial/*`, async () => {
          const tutorials: MyTutorialDto[] = TUTORIAL_IDS.map((id, index) =>
            fakeTutorial({
              id,
              willPopUp: index === 0,
              highlightElement: false,
            })
          );

          return HttpResponse.json(tutorials);
        }),
      ],
    },
  },
};

export const MultipleCenterTutorial: StoryObj = {
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get(`*/api/v1/Tutorial/*`, async () => {
          const tutorials: MyTutorialDto[] = TUTORIAL_IDS.map((id) =>
            fakeTutorial({ id, willPopUp: true, highlightElement: false })
          );

          return HttpResponse.json(tutorials);
        }),
      ],
    },
  },
};

export const MixedTutorial: StoryObj = {
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get(`*/api/v1/Tutorial/*`, async () => {
          const tutorials: MyTutorialDto[] = [
            {
              id: TUTORIAL_IDS[0],
              name: faker.book.title(),
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
                  highlightElement: false,
                },
                {
                  id: '3',
                  title: faker.vehicle.vehicle(),
                  body: faker.music.artist(),
                  highlightElement: true,
                },
              ],
            },
          ];

          return HttpResponse.json(tutorials);
        }),
      ],
    },
  },
};

export const ScrollToElement: StoryObj = {
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get(`*/api/v1/Tutorial/*`, async () => {
          const tutorials: MyTutorialDto[] = [
            {
              id: TUTORIAL_IDS[0],
              name: faker.book.title(),
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
                  highlightElement: true,
                },
                {
                  id: '4',
                  title: faker.vehicle.vehicle(),
                  body: faker.music.artist(),
                  highlightElement: true,
                },
              ],
            },
          ];

          return HttpResponse.json(tutorials);
        }),
      ],
    },
  },
};

export const TutorialWithImage: StoryObj = {
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        getTutorialImageHandler,
        http.get(`*/api/v1/Tutorial/draft/:applicationName`, async () => {
          const tutorials: MyTutorialDto[] = [
            {
              id: TUTORIAL_IDS[0],
              name: faker.book.title(),
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
                  imgUrl: faker.animal.dog(),
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
                  highlightElement: true,
                },
              ],
            },
          ];

          return HttpResponse.json(tutorials);
        }),
      ],
    },
  },
};
