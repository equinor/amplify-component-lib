import { Fragment } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { Button, Card, Divider, Typography } from '@equinor/eds-core-react';
import { MyTutorialDto } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { TopBar } from '..';
import { Tutorials } from './Tutorials';
import { environment, highlightTutorialElementID } from 'src/atoms';
import { Template } from 'src/organisms';
import { TutorialHighlightingProvider } from 'src/providers/TutorialHighlightingProvider/TutorialHighlightingProvider';
import { fakeTutorial, tokenHandler } from 'src/tests/mockHandlers';

import { delay, http, HttpResponse } from 'msw';

const TUTORIAL_IDS = [
  faker.string.uuid(),
  faker.string.uuid(),
  faker.string.uuid(),
];

const meta: Meta = {
  title: 'Organisms/TopBar/Tutorials',
  component: () => (
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            index: true,
            path: '/',
            element: (
              <TutorialHighlightingProvider>
                <Template>
                  <TopBar
                    applicationIcon="SAM"
                    applicationName="Subsurface app management"
                  >
                    <TopBar.Actions>
                      <Tutorials />
                    </TopBar.Actions>
                  </TopBar>
                  <div
                    id="content"
                    style={{
                      display: 'grid',
                      alignItems: 'center',
                      padding: '4rem',
                      gap: '1rem',
                      maxHeight: 'calc(100vh - 64px)',
                      overflow: 'auto',
                    }}
                  >
                    {TUTORIAL_IDS.map((id, index) => (
                      <Fragment key={id}>
                        {index !== 0 && <Divider />}
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
                            <Button id={highlightTutorialElementID(id, 1)}>
                              Start
                            </Button>
                          </Card.Actions>
                        </Card>
                        <Card
                          style={{ padding: '1rem' }}
                          id={highlightTutorialElementID(id, 2)}
                        >
                          <Card.HeaderTitle>
                            <Typography variant="h2">
                              {faker.airline.airplane().name +
                                ' ' +
                                faker.airline.airplane().iataTypeCode}
                            </Typography>
                          </Card.HeaderTitle>
                        </Card>
                      </Fragment>
                    ))}
                    <Typography
                      id={highlightTutorialElementID(TUTORIAL_IDS[0], 3)}
                      style={{ marginTop: '80vh', marginBottom: '10vh' }}
                    >
                      This is some text really far away
                    </Typography>
                  </div>
                </Template>
              </TutorialHighlightingProvider>
            ),
          },
        ],
        { initialEntries: ['/'] }
      )}
    />
  ),
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: '',
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
type Story = StoryObj<typeof Tutorials>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        tokenHandler,
        http.get(`*/api/v1/Tutorial/draft/:appName`, async () => {
          await delay('real');

          const tutorials: MyTutorialDto[] = TUTORIAL_IDS.map((id, index) =>
            fakeTutorial(id, index !== 0, true, index === 0 ? '/' : undefined)
          );

          return HttpResponse.json(tutorials);
        }),
      ],
    },
  },
};
