import React from 'react';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from '../../../../providers';
import ApplicationDrawer, { PORTAL_URL } from './ApplicationDrawer';
import { CancelablePromise } from 'src/api';
import { AmplifyApplication } from 'src/api/models/Applications';
import PortalTransit from 'src/components/Navigation/TopBar/Resources/ApplicationTransit/PortalTransit';
import { EnvironmentType } from 'src/components/Navigation/TopBar/TopBar';
import { waitFor } from 'src/tests/test-utils';

import { assignWith } from 'lodash-es';
import { beforeAll, beforeEach, describe, expect, vi } from 'vitest';

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
    timeout: 4000,
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
    timeout: 3000,
  });

  const text = screen.getByText(/access to more applications\?/i);
  expect(text).toBeInTheDocument();
});

test('Close application drawer  ', async () => {
  rejectPromise = false;
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

test('Click on a application', async () => {
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
    timeout: 4000,
  });

  const appIndex = faker.number.int({ min: 0, max: fakeApps.length - 1 });

  const firstApp = screen.getAllByRole('button')[appIndex];

  await user.click(firstApp);

  const transitText = screen.getByText(/Transferring you to application/i);
  expect(transitText).toBeInTheDocument();

  await waitForElementToBeRemoved(
    () => screen.getByText(/Transferring you to application/i),
    {
      timeout: 5000,
    }
  );
  window.open = vi.fn();

  const clickedApplication = fakeApps[appIndex];

  expect(window.open).toHaveBeenCalledWith(clickedApplication.apiurl, '_self');
  screen.logTestingPlaygroundURL();
});

test('Click on more access button', async () => {
  rejectPromise = false;
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
  const transitToApplication = screen.queryByText('Open link');
  expect(transitToApplication).toBeInTheDocument();
});

test('Loading to application', async () => {
  rejectPromise = false;
  const applicationsFaker = faker.animal.dog();
  const url = faker.animal.cow();

  const onclose = vi.fn();

  render(
    <PortalTransit
      applicationName={applicationsFaker}
      portal={false}
      onClose={onclose}
      url={url}
    />
  );

  const findTransferText = screen.getByText(/Transferring you to application/i);
  expect(findTransferText).toBeInTheDocument();

  await waitForElementToBeRemoved(
    () => screen.getByText(/Transferring you to application/i),
    {
      timeout: 4000,
    }
  );

  const applicationName = screen.getByText(applicationsFaker);
  expect(applicationName).toBeInTheDocument();
  screen.logTestingPlaygroundURL();
});

test('When loading is done, transfer to Portal', async () => {
  rejectPromise = false;
  const applicationsFaker = faker.animal.dog();

  const portalUrl = faker.animal.cetacean();

  const onClose = vi.fn();
  render(
    <PortalTransit
      applicationName={applicationsFaker}
      portal
      onClose={onClose}
      url={portalUrl}
    />
  );

  const findTransferText = screen.getByText(/Transferring you to application/i);
  expect(findTransferText).toBeInTheDocument();

  await waitForElementToBeRemoved(
    () => screen.getByText(/Transferring you to application/i),
    {
      timeout: 4000,
    }
  );

  const applicationName = screen.getByText('Portal');
  expect(applicationName).toBeInTheDocument();
});
