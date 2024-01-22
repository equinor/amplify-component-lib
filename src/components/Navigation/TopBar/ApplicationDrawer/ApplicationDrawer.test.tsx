import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  act,
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  AuthProvider,
  ReleaseNotesProvider,
  SnackbarProvider,
} from '../../../../providers';
import ChangingApplication from '../Help/ApplicationTransit/ChangingApplication';
import ApplicationDrawer from './ApplicationDrawer';

import { expect } from 'vitest';
import { as } from 'vitest/dist/reporters-5f784f42';

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
  const fakeAppName = faker.animal.dog();

  render(
    <Wrappers>
      <ApplicationDrawer />
    </Wrappers>
  );

  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);

  // await waitFor(() => {
  //   expect(
  //     screen.getByText((content, element) => {
  //       return content.includes('Your available applications');
  //     })
  //   ).toBeInTheDocument();
  // });
  //
  // const applicationButton = screen.getByText(fakeAppName);
  // expect(applicationButton).toBeInTheDocument();
  // userEvent.click(applicationButton);
  //
  // await waitFor(() => {
  //   expect(
  //     screen.queryByText('Your available applications')
  //   ).not.toBeInTheDocument();
  // });
});

//TODO: Fix to get data in.
// test('No applications is shown ', async () => {
//   render(
//     <Wrappers>
//       <ApplicationDrawer />
//     </Wrappers>
//   );
//   const user = userEvent.setup();
//
//   const menuButton = await screen.findByRole('button');
//
//   await user.click(menuButton);
//
//   const noApplications = await screen.findByText(
//     'You don´t have access to other applications'
//   );
//   expect(noApplications).toBeInTheDocument();
// });

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
  render(
    <Wrappers>
      <ApplicationDrawer />
    </Wrappers>
  );

  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);

  const applicationButton = await screen.findByTestId('ApplicationButton-Orca');
  await user.click(applicationButton);
  const transitToApplication = await screen.findByTestId('DialogHeadertest');

  expect(transitToApplication).toBeInTheDocument();

  screen.logTestingPlaygroundURL();
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
  const transitToApplication = await screen.findByTestId('DialogHeadertest');
  expect(transitToApplication).toBeInTheDocument();

  screen.logTestingPlaygroundURL();
});

//Todo: Fix how to use data instead of hard coded applications & noapplications.

test('Loading to application', async () => {
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

  const findTransferText = await screen.findByTestId('transfer');
  expect(findTransferText).toBeInTheDocument();
});

test('When loading is done, transfer to application', async () => {
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

  await waitFor(() => screen.getByTestId('finish'), { timeout: 10000 });
});
