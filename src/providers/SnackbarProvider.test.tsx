import { faker } from '@faker-js/faker';

import { renderHook, screen, userEvent, waitFor } from '../tests/test-utils';
import SnackbarProvider, { useSnackbar } from './SnackbarProvider';

test("'useSnackbar' hook throws error if using outside of context", () => {
  // Hides console errors since this test explicitly tests for thrown errors
  console.error = vi.fn();
  expect(() => renderHook(() => useSnackbar())).toThrow(
    'useSnackbar must be used within a SnackbarContextProvider'
  );
});

test("'useSnackbar' showSnackbar function works as expected", () => {
  const { result } = renderHook(() => useSnackbar(), {
    wrapper: SnackbarProvider,
  });

  const snackBarText = faker.animal.dog();

  result.current.showSnackbar(snackBarText);
  expect(result.current.showSnackbar).toBeDefined();
});

test("'useSnackbar' showSnackbar function works as expected with custom props", async () => {
  const { result } = renderHook(() => useSnackbar(), {
    wrapper: SnackbarProvider,
  });

  const snackBarText = faker.animal.dog();

  const customOnClose = vi.fn();

  result.current.showSnackbar(snackBarText, {
    customProps: {
      autoHideDuration: 500,
      onClose: customOnClose,
    },
  });
  expect(result.current.showSnackbar).toBeDefined();
  await waitFor(() => expect(customOnClose).toHaveBeenCalledTimes(1), {
    timeout: 1000,
  });
});

test("'useSnackbar' showSnackbar function works as expected with action", async () => {
  const { result } = renderHook(() => useSnackbar(), {
    wrapper: SnackbarProvider,
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
