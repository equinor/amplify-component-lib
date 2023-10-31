import {
  check_circle_outlined,
  close_circle_outlined,
} from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { render, screen, userEvent } from '../../../tests/test-utils';
import FileProgress, { FileProgressProps } from './FileProgress';

test('Shows progress bar loading as expected', async () => {
  const props: FileProgressProps = {
    name: faker.animal.fish(),
    onDelete: vi.fn(),
    onAbort: vi.fn(),
    loading: true,
  };
  render(<FileProgress {...props} />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    close_circle_outlined.svgPathData
  );
  expect(screen.getByText(props.name)).toBeInTheDocument();
});

test('Calls onAbort when aborting in progress upload', async () => {
  const user = userEvent.setup();
  const props: FileProgressProps = {
    name: faker.animal.fish(),
    onDelete: vi.fn(),
    onAbort: vi.fn(),
    loading: true,
  };
  render(<FileProgress {...props} />);

  const button = screen.getByRole('button');
  await user.click(button);

  expect(props.onAbort).toHaveBeenCalledTimes(1);
});

test('Shows progress bar loading as expected when giving progress number', async () => {
  const props: FileProgressProps = {
    name: faker.animal.fish(),
    onDelete: vi.fn(),
    onAbort: vi.fn(),
    loading: true,
    progress: faker.number.int({ min: 1, max: 99 }),
  };
  render(<FileProgress {...props} />);

  expect(screen.getByRole('progressbar')).toHaveAttribute(
    'aria-valuenow',
    props.progress?.toString()
  );
});

test('Shows error message', async () => {
  const props: FileProgressProps = {
    name: faker.animal.fish(),
    onDelete: vi.fn(),
    onAbort: vi.fn(),
    loading: false,
    error: true,
    errorMsg: faker.lorem.sentence(),
  };
  render(<FileProgress {...props} />);

  expect(screen.getByText(props.errorMsg ?? 'failed')).toBeInTheDocument();
});

test('Shows correct content when successful', async () => {
  const props: FileProgressProps = {
    name: faker.animal.fish(),
    onDelete: vi.fn(),
    onAbort: vi.fn(),
    loading: false,
  };
  render(<FileProgress {...props} />);

  const successIcon = screen.getAllByTestId('eds-icon-path')[0];
  expect(successIcon).toHaveAttribute('d', check_circle_outlined.svgPathData);
});

test('Calls onDelete correctly', async () => {
  const user = userEvent.setup();
  const props: FileProgressProps = {
    name: faker.animal.fish(),
    onDelete: vi.fn(),
    onAbort: vi.fn(),
    loading: false,
  };
  render(<FileProgress {...props} />);
  const deleteButton = screen.getByRole('button');
  await user.click(deleteButton);

  expect(props.onDelete).toHaveBeenCalledTimes(1);
});
