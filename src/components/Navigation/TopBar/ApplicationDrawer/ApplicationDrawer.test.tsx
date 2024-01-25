import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import { button } from '@equinor/eds-core-react/dist/types/components/Button/tokens/button';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CancelablePromise } from '../../../../api';
import { AmplifyApplication } from '../../../../api/models/Applications';
import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from '../../../../providers';
import ChangingApplication from '../Help/ApplicationTransit/ChangingApplication';
import ApplicationDrawer from './ApplicationDrawer';

import { expect } from 'vitest';

function fakeApplication(): AmplifyApplication {
  return {
    id: faker.string.uuid(),
    name: faker.animal.dog(),
    adGroups: [faker.animal.cat()],
    url: faker.animal.bird(),
    accessRoles: [
      { role: faker.lorem.word(), description: faker.airline.seat() },
    ],
    description: faker.lorem.sentence(),
    longDescription: faker.animal.crocodilia(),
    category: faker.animal.fish(),
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
vi.mock('src/api/services/PortalService', () => {
  class PortalService {
    public static userApplications(): CancelablePromise<
      Array<AmplifyApplication>
    > {
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
  return { PortalService };
});

function Wrappers({ children }: { children: any }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider isMock>
        <ReleaseNotesProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ReleaseNotesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

test('Should toggle menu and handle application click', async () => {
  render(
    <Wrappers>
      <ApplicationDrawer />
    </Wrappers>
  );

  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);

  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 1200,
  });

  for (const app of fakeApps) {
    expect(screen.getByText(app.name)).toBeInTheDocument();
  }
});

test('No applications is shown ', async () => {
  rejectPromise = true;
  render(
    <Wrappers>
      <ApplicationDrawer />
    </Wrappers>
  );
  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);

  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 1200,
  });

  const noApplications = await waitFor(
    () => screen.queryByText('You don´t have access to other applications'),
    {
      timeout: 1200,
    }
  );

  expect(noApplications).toBeInTheDocument();
});

test('Close application drawer  ', async () => {
  render(
    <Wrappers>
      <ApplicationDrawer />
    </Wrappers>
  );
  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);
  const closeButton = screen.getByTestId('close-button');
  await user.click(closeButton);

  expect(closeButton).not.toBeInTheDocument();
});

test('Click and go to an application', async () => {
  rejectPromise = false;
  render(
    <Wrappers>
      <ApplicationDrawer />
    </Wrappers>
  );

  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);

  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 1200,
  });

  for (const app of fakeApps) {
    const button = await screen.findByTestId(app.name);
    await user.click(button);
    const portalTransit = screen.getByText(app.name);
    expect(portalTransit).toBeInTheDocument();
  }
});

test('Click on more access button', async () => {
  render(
    <Wrappers>
      <ApplicationDrawer />
    </Wrappers>
  );

  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);
  const accessItButton = await screen.findByTestId('access-it-link');
  await user.click(accessItButton);
  const transitToApplication = await screen.queryByText('Open link');
  expect(transitToApplication).toBeInTheDocument();
});

test('Loading to application', async () => {
  rejectPromise = false;
  const applicationsFaker = faker.animal.dog();
  const finishText = faker.lorem.sentence();
  const onChangedField = vi.fn();

  render(
    <ChangingApplication
      applicationName={applicationsFaker}
      portal={false}
      finishedText={finishText}
      onChangedApplication={onChangedField}
    />
  );

  const findTransferText = await waitFor(
    () => screen.getByText('Transferring you to application.'),
    {
      timeout: 1000,
    }
  );

  expect(findTransferText).toBeVisible();
});

test('When loading is done, transfer to application', async () => {
  rejectPromise = false;
  const applicationsFaker = faker.animal.dog();
  const finishText = faker.lorem.sentence();
  const onChangedField = vi.fn();

  render(
    <ChangingApplication
      applicationName={applicationsFaker}
      portal={false}
      finishedText={finishText}
      onChangedApplication={onChangedField}
    />
  );

  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 5000,
  });

  const finishedText = await screen.findByText(finishText);

  expect(finishedText).toBeInTheDocument();
});

vi.spyOn(global, 'setTimeout');

test('Click and set window location to portal or application url', async () => {
  rejectPromise = false;
  const applicationsFaker = faker.animal.dog();
  const finishText = faker.lorem.sentence();
  const onChangedField = vi.fn();

  const fakeUrl = 'https://faker-url.com';

  render(
    <ChangingApplication
      applicationName={applicationsFaker}
      portal={true}
      finishedText={finishText}
      onChangedApplication={onChangedField}
    />
  );

  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 4000,
  });

  const finishedText = await screen.findByText(finishText);

  expect(finishedText).toBeInTheDocument();

  await act(async () => {
    await new Promise((relsove) => setTimeout(relsove, 1500));
  });
  expect(window.location.href).not.toBe(fakeUrl);

  screen.logTestingPlaygroundURL();
});
