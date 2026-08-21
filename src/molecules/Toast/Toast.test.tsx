import { users_circle } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { Toast } from './Toast';
import { TOAST_COLORS } from './Toast.utils';
import { fireEvent, render, waitFor } from 'src/tests/browsertest-utils';

test('throws when duration is not positive', () => {
  const duration = faker.number.int({ min: Number.MIN_SAFE_INTEGER, max: 0 });
  expect(() =>
    render(<Toast title="Something" duration={duration} onClose={vi.fn()} />)
  ).toThrow('Duration must be a positive number');
});

test('renders optional content and closes from both available controls', () => {
  const onClose = vi.fn();
  const onActionClick = vi.fn();
  const { container, getByText } = render(
    <Toast
      title="Changes saved"
      description="Your preferences have been updated"
      icon={users_circle}
      variant="success"
      onClose={onClose}
      action={{ text: 'Undo', onClick: onActionClick }}
    />
  );

  expect(getByText('Changes saved')).toBeInTheDocument();
  expect(getByText('Your preferences have been updated')).toBeInTheDocument();
  expect(container.querySelector('svg')).toBeInTheDocument();

  fireEvent.click(getByText('Undo'));
  expect(onActionClick).toHaveBeenCalledOnce();
  expect(onClose).toHaveBeenCalledOnce();

  fireEvent.click(container.querySelector('header button')!);
  expect(onClose).toHaveBeenCalledTimes(2);
});

test('renders a duration bar and closes after the configured duration', async () => {
  const onClose = vi.fn();
  const { getByRole } = render(
    <Toast title="Changes saved" duration={0.01} onClose={onClose} />
  );

  expect(getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => expect(onClose).toHaveBeenCalledOnce());
});

test.each(Object.entries(TOAST_COLORS))(
  'uses %s colors for container, controls, and duration bar',
  (variant, colors) => {
    const { container, getByRole, getByText } = render(
      <Toast
        title="Changes saved"
        variant={variant as keyof typeof TOAST_COLORS}
        duration={1}
        onClose={vi.fn()}
        action={{ text: 'Undo', onClick: vi.fn() }}
      />
    );

    expect(container.firstElementChild).toHaveStyle({
      background: colors.containerBackground,
    });
    expect(getByText('Undo')).toHaveStyle({
      color: colors.controlForeground,
      borderColor: colors.controlForeground,
    });
    expect(container.querySelector('header button')).toHaveStyle({
      color: colors.controlForeground,
    });
    expect(getByRole('progressbar')).toHaveStyle({
      background: 'rgb(255, 255, 255)',
    });
  }
);
