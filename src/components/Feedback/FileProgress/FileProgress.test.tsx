import {
  clear,
  close_circle_outlined,
  delete_to_trash,
  error_outlined,
  refresh,
} from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import FileProgress, {
  CompactFileProgressBaseProps,
  RegularFileProgressBaseProps,
} from './FileProgress';
import { render, screen, userEvent } from 'src/tests/test-utils';

import { expect } from 'vitest';

function fakeProps():
  | RegularFileProgressBaseProps
  | CompactFileProgressBaseProps {
  const file = new File(['32452134'], 'testfile.png');

  return {
    file: file,
    onDelete: () => null,
  };
}

test('Renders regular loading state', async () => {
  const { file, onDelete } = fakeProps();
  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      progressPercent={50}
      isDone={false}
    />
  );

  const loadingText = screen.getByText('loading...');
  const progressBar = screen.getByRole('progressbar');
  const cancelIcons = screen.getAllByTestId('eds-icon-path');

  expect(loadingText).toBeInTheDocument();
  expect(progressBar).toBeInTheDocument();
  expect(cancelIcons[1]).toHaveAttribute(
    'd',
    close_circle_outlined.svgPathData
  );
});

test('Renders regular custom loading text without progressValue, and click cancel', async () => {
  const { file, onDelete } = fakeProps();
  const customLoadingText = faker.animal.crocodilia();

  const mockOnCancel = vi.fn();
  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      onCancel={mockOnCancel}
      isDone={false}
      customLoadingText={customLoadingText}
    />
  );

  const loadingText = screen.getByText(customLoadingText);

  expect(loadingText).toBeInTheDocument();

  const cancelButton = screen.getAllByTestId('eds-icon-path')[1];

  expect(cancelButton).toHaveAttribute('d', close_circle_outlined.svgPathData);
  const user = userEvent.setup();

  await user.click(cancelButton);

  expect(mockOnCancel).toHaveBeenCalledTimes(1);
});

test('Renders regular complete state default text', async () => {
  const { file, onDelete } = fakeProps();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      progressPercent={50}
      isDone={true}
    />
  );

  const completeText = screen.getByText('File uploaded!');
  const allIcons = screen.getAllByTestId('eds-icon-path');

  expect(allIcons[1]).toHaveAttribute('d', delete_to_trash.svgPathData);
  expect(completeText).toBeInTheDocument();
});

test('Renders regular complete state custom text', async () => {
  const { file, onDelete } = fakeProps();
  const customCompleteText = faker.animal.crocodilia();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      progressPercent={50}
      isDone={true}
      customCompleteText={customCompleteText}
    />
  );

  const completeText = screen.getByText(customCompleteText);

  expect(completeText).toBeInTheDocument();
});

test('Renders regular error state retry button and error text', async () => {
  const { file, onDelete } = fakeProps();
  const fakeErrorText = faker.animal.cetacean();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      progressPercent={50}
      isDone={false}
      isError={true}
      fullErrorText={fakeErrorText}
      onRetry={() => null}
    />
  );
  const allIcons = screen.getAllByTestId('eds-icon-path');

  expect(allIcons[2]).toHaveAttribute('d', refresh.svgPathData);

  const errorText = screen.getByText(fakeErrorText);

  expect(errorText).toBeInTheDocument();
});

test('Renders regular error state with default error text', async () => {
  const { file, onDelete } = fakeProps();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      progressPercent={50}
      isDone={false}
      isError={true}
      onRetry={() => null}
    />
  );

  const errorText = screen.getByText('An error has occurred');

  expect(errorText).toBeInTheDocument();
});

test('Renders compact loading state with progress bar', async () => {
  const { file, onDelete } = fakeProps();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      progressPercent={50}
      isDone={false}
      compact
    />
  );

  const progressBar = screen.getByRole('progressbar');

  expect(progressBar).toBeInTheDocument();
});
test('Renders compact loading state without progress precent, and click onDelete call', async () => {
  const { file } = fakeProps();
  const mockOnDelete = vi.fn();
  render(
    <FileProgress file={file} onDelete={mockOnDelete} isDone={false} compact />
  );

  const progressBar = screen.getByRole('progressbar');

  expect(progressBar).toBeInTheDocument();
  screen.logTestingPlaygroundURL();

  const deleteButton = screen.getByTestId('eds-icon-path');

  expect(deleteButton).toHaveAttribute('d', clear.svgPathData);
  const user = userEvent.setup();

  await user.click(deleteButton);

  expect(mockOnDelete).toHaveBeenCalledTimes(1);
});

test('Renders compact complete state', async () => {
  const { file, onDelete } = fakeProps();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      progressPercent={50}
      isDone={true}
      compact
    />
  );

  const fileName = screen.getByText(file.name);
  const progressBar = screen.queryByRole('progressbar');

  expect(fileName).toBeInTheDocument();
  expect(progressBar).not.toBeInTheDocument();
});

test('Renders compact complete state when isDone is undefined', async () => {
  const { file, onDelete } = fakeProps();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      progressPercent={50}
      isDone={undefined}
      compact
    />
  );

  const fileName = screen.getByText(file.name);
  const progressBar = screen.queryByRole('progressbar');

  expect(fileName).toBeInTheDocument();
  expect(progressBar).not.toBeInTheDocument();
});

test('Renders compact error state', async () => {
  const { file, onDelete } = fakeProps();

  const fakeShortErrorText = faker.animal.rabbit();
  const fakeFullErrorText = faker.animal.cow();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      progressPercent={50}
      isDone={true}
      isError={true}
      shortErrorText={fakeShortErrorText}
      fullErrorText={fakeFullErrorText}
      compact
    />
  );

  const shortErrorText = screen.getByText(fakeShortErrorText);

  const allIcons = screen.getAllByTestId('eds-icon-path');

  expect(allIcons[0]).toHaveAttribute('d', error_outlined.svgPathData);

  expect(shortErrorText).toBeInTheDocument();

  const user = userEvent.setup();
  await user.hover(shortErrorText);
  await new Promise((r) => setTimeout(r, 1000));
  // const tooltipErrorText = screen.getByText(fakeFullErrorText);
  //
  // expect(tooltipErrorText).toBeInTheDocument();
});
test('Renders compact default error messages', async () => {
  const { file, onDelete } = fakeProps();

  render(
    <FileProgress file={file} onDelete={onDelete} isError={true} compact />
  );

  const shortDefaultErrorText = screen.getByText('Error occurred');

  expect(shortDefaultErrorText).toBeInTheDocument();

  // const longDefaultErrorText = screen.getByText(
  //   'An error has occurred with the file'
  // );

  // const user = userEvent.setup();
});
