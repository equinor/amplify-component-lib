import React, { ReactNode } from 'react';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitForElementToBeRemoved } from '@testing-library/dom';

import { ApplicationDrawer } from './ApplicationDrawer';
import { AuthProvider, SnackbarProvider } from 'src/providers';
import {
  render,
  screen,
  test,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';
import { FAKE_APPS } from 'src/tests/mockHandlers';

import { delay, http, HttpResponse } from 'msw';
import { beforeEach } from 'vitest';

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

beforeEach(() => {
  window.open = vi.fn();
});

test('Should toggle menu and handle application click', async () => {
  render(<ApplicationDrawer />, { wrapper: Wrappers });

  const user = userEvent.setup();

  const menuButton = screen.getByRole('button');

  await user.click(menuButton);

  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 4000,
  });

  for (const app of FAKE_APPS) {
    expect(screen.getByText(app.name)).toBeInTheDocument();
  }
});

test('No applications is shown ', async () => {
  render(<ApplicationDrawer />, { wrapper: Wrappers });
  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);

  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 3000,
  });

  const text = screen.getByText(/access to more applications\?/i);
  expect(text).toBeInTheDocument();
});

test('Close when user click outside  ', async () => {
  render(<ApplicationDrawer />, { wrapper: Wrappers });
  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);
  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
    timeout: 4000,
  });
  const text = screen.getByText(/switch between apps/i);
  expect(text).toBeInTheDocument();

  await user.click(document.body);

  expect(screen.queryByText(/switch between apps/i)).not.toBeInTheDocument();
});

test(
  'Click on a application ',
  async () => {
    render(<ApplicationDrawer />, { wrapper: Wrappers });

    const user = userEvent.setup();

    const menuButton = await screen.findByRole('button');

    await user.click(menuButton);

    await waitForElementToBeRemoved(() => screen.getByRole('progressbar'), {
      timeout: 4000,
    });

    const appIndex = faker.number.int({ min: 0, max: FAKE_APPS.length - 1 });

    const firstApp = screen.getByRole('button', {
      name: new RegExp(FAKE_APPS[appIndex].name),
    });

    await user.click(firstApp);

    const openLink = screen.getByText(/open link/i);
    expect(openLink).toBeInTheDocument();

    await waitFor(
      () =>
        expect(
          screen.getByText(/Transferring you to application/i)
        ).toBeInTheDocument(),
      {
        timeout: 8000,
      }
    );

    await waitFor(
      () =>
        expect(window.open).toHaveBeenCalledWith(
          FAKE_APPS[appIndex].url,
          '_self'
        ),
      {
        timeout: 10000,
      }
    );
  },
  { timeout: 60000 }
);

test('Click on more access button', async () => {
  render(<ApplicationDrawer />, { wrapper: Wrappers });

  const user = userEvent.setup();

  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);
  const accessItButton = await screen.findByTestId('access-it-link');
  await user.click(accessItButton);
  const transitToApplication = screen.queryByText('Open link');
  expect(transitToApplication).toBeInTheDocument();
});

test('No other apps to show', async ({ worker }) => {
  worker.use(
    http.get('*/api/v1/Token/AmplifyPortal/*', async () => {
      await delay('real');
      return HttpResponse.text(faker.string.nanoid());
    }),
    http.get('*/api/v1/Application/userapplications', async () => {
      return HttpResponse.json([]);
    })
  );

  render(<ApplicationDrawer />, { wrapper: Wrappers });
  const user = userEvent.setup();
  const menuButton = await screen.findByRole('button');

  await user.click(menuButton);

  await waitForElementToBeRemoved(() => screen.getByRole('progressbar'));

  const text = screen.getByText(`You don't have access to other applications`);
  expect(text).toBeInTheDocument();
});
