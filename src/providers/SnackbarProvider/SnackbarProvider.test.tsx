import { ReactNode } from 'react';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  ShowSnackbar,
  SnackbarProvider,
  useSnackbar,
} from 'src/providers/SnackbarProvider/SnackbarProvider';
import { snackbarIcon } from 'src/providers/SnackbarProvider/SnackbarProvider.utils';
import {
  renderHook,
  screen,
  userEvent,
  waitFor,
} from 'src/tests/browsertest-utils';

function TestProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </QueryClientProvider>
  );
}

test("'useSnackbar' hook throws error if using outside of context", () => {
  // Hides console errors since this test explicitly tests for thrown errors
  console.error = vi.fn();
  expect(() => renderHook(() => useSnackbar())).toThrow(
    'useSnackbar must be used within a SnackbarContextProvider'
  );
});

test("'useSnackbar' showSnackbar function works as expected", () => {
  const { result } = renderHook(() => useSnackbar(), {
    wrapper: TestProviders,
  });

  const snackBarText = faker.animal.dog();

  result.current.showSnackbar(snackBarText);
  expect(result.current.showSnackbar).toBeDefined();
});

describe('Works as expected with variants', () => {
  const variants: ShowSnackbar['variant'][] = ['info', 'warning', 'error'];

  for (const variant of variants) {
    test(variant, async () => {
      const { result } = renderHook(() => useSnackbar(), {
        wrapper: TestProviders,
      });

      const snackBarText = faker.animal.dog();

      result.current.showSnackbar({ text: snackBarText, variant });

      const text = await screen.findByText(snackBarText, undefined, {
        timeout: 2000,
      });

      expect(text).toBeInTheDocument();

      const variantIcon = screen.getAllByTestId('eds-icon-path')[0];

      expect(variantIcon).toHaveAttribute(
        'd',
        snackbarIcon(variant).svgPathData
      );
    });
  }
});

test("'useSnackbar' showSnackbar function works as expected with custom props", async () => {
  const { result } = renderHook(() => useSnackbar(), {
    wrapper: TestProviders,
  });

  const snackBarText = faker.animal.dog();

  const customOnClose = vi.fn();

  result.current.showSnackbar(snackBarText, {
    customProps: {
      autoHideDuration: 500,
      onClose: customOnClose,
    },
  });
  await waitFor(() => expect(customOnClose).toHaveBeenCalledTimes(1), {
    timeout: 1000,
  });
});

test("'useSnackbar' showSnackbar function works as expected with action", async () => {
  const { result } = renderHook(() => useSnackbar(), {
    wrapper: TestProviders,
  });

  const actionText = faker.animal.cat();
  const customActionHandler = vi.fn();
  const user = userEvent.setup();

  result.current.showSnackbar(faker.animal.dog(), {
    action: {
      text: actionText,
      handler: customActionHandler,
    },
  });

  const actionBtn = await waitFor(() => screen.getByText(actionText), {
    timeout: 1000,
  });

  await user.click(actionBtn);
  expect(customActionHandler).toHaveBeenCalledTimes(1);
});

test("'useSnackbar' setActionDisabledState function works as expected with action", async () => {
  const { result } = renderHook(() => useSnackbar(), {
    wrapper: TestProviders,
  });

  // Calling this should do nothing since there is no snackbar
  result.current.setActionDisabledState(true);

  const actionText = faker.animal.cat();
  const customActionHandler = vi.fn();
  const user = userEvent.setup();

  result.current.showSnackbar(faker.animal.dog(), {
    action: {
      text: actionText,
      handler: customActionHandler,
    },
  });

  const actionBtn = await waitFor(() => screen.getByText(actionText), {
    timeout: 1000,
  });

  result.current.setActionDisabledState(true);

  await user.click(actionBtn);
  expect(customActionHandler).toHaveBeenCalledTimes(0);

  result.current.setActionDisabledState(false);

  await user.click(actionBtn);
  expect(customActionHandler).toHaveBeenCalledTimes(1);
});

test("'useSnackbar' action is not visible and setActionDisabledState does nothing in that case", async () => {
  const { result } = renderHook(() => useSnackbar(), {
    wrapper: TestProviders,
  });

  const actionText = faker.animal.cat();

  result.current.showSnackbar(faker.animal.dog());

  const actionBtn = await waitFor(() => screen.queryByText(actionText), {
    timeout: 1000,
  });

  result.current.setActionDisabledState(true);
  expect(actionBtn).not.toBeInTheDocument();
});

test("'useSnackbar' hideSnackbar works as expected", async () => {
  const { result } = renderHook(() => useSnackbar(), {
    wrapper: TestProviders,
  });

  const snackbarText = faker.animal.cat();
  result.current.showSnackbar(snackbarText, {
    customProps: { autoHideDuration: 5000 },
  });
  const snackbar = await screen.findByText(snackbarText, undefined, {
    timeout: 1000,
  });

  expect(snackbar).toBeInTheDocument();

  result.current.hideSnackbar();

  await waitFor(() =>
    expect(screen.queryByText(snackbarText)).not.toBeInTheDocument()
  );
});
