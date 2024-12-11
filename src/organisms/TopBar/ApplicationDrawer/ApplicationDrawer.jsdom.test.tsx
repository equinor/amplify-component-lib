import React, { ReactNode } from 'react';

import { tokens } from '@equinor/eds-tokens';
import {
  AmplifyApplication,
  ApplicationCategory,
  CancelablePromise,
} from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitForElementToBeRemoved } from '@testing-library/dom';

import { ApplicationDrawer } from './ApplicationDrawer';
import { AuthProvider, SnackbarProvider } from 'src/providers';
import { render, screen, userEvent } from 'src/tests/jsdomtest-utils';

const { colors } = tokens;

function fakeApplication(): AmplifyApplication {
  return {
    id: faker.string.uuid(),
    name: faker.animal.dog() + faker.animal.fish(),
    adGroups: [faker.animal.cat()],
    url: faker.animal.bird(),
    accessRoles: [
      { role: faker.lorem.word(), description: faker.airline.seat() },
    ],
    description: faker.lorem.sentence(),
    longDescription: faker.animal.crocodilia(),
    contentTabs: [],
    partnerAccess: faker.datatype.boolean(),
    sponsors: [],
    category: faker.helpers.arrayElement(
      Object.values(ApplicationCategory)
    ) as ApplicationCategory,
    version: faker.string.numeric(),
    applicationInsightAPI: faker.animal.insect(),
    apI_Id: faker.animal.lion(),
    apiurl: faker.animal.snake(),
    monitored: true,
    productOwners: [faker.animal.cow()],
  };
}

const fakeApps = new Array(faker.number.int({ min: 4, max: 8 }))
  .fill(0)
  .map(() => fakeApplication());

let rejectPromise = false;

vi.mock('@equinor/subsurface-app-management', async () => {
  class AmplifyApplicationService {
    public static userApplications(): CancelablePromise<AmplifyApplication[]> {
      return new CancelablePromise((resolve) => {
        setTimeout(() => {
          if (rejectPromise) {
            resolve([]);
          } else {
            resolve(fakeApps);
          }
        }, 1000);
      });
    }
  }
  const actual = await vi.importActual('@equinor/subsurface-app-management');
  return { ...actual, AmplifyApplicationService };
});

function Wrappers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
test('background color is shown for the app you are in', async () => {
  rejectPromise = false;
  vi.stubEnv('VITE_NAME', fakeApps[0].name);
  render(<ApplicationDrawer />, { wrapper: Wrappers });

  const user = userEvent.setup();

  const menuButton = screen.getByRole('button');

  await user.click(menuButton);

  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 4000,
  });
  const firstAppContainer = screen.getByTestId(
    `application-box-${fakeApps[0].name}`
  );
  expect(firstAppContainer).toHaveStyle(
    `background: ${colors.interactive.primary__selected_highlight.rgba}`
  );
});
