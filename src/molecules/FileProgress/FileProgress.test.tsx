import {
  clear,
  close_circle_outlined,
  delete_to_trash,
  error_outlined,
  library_pdf,
  refresh,
} from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';
import { waitFor } from '@testing-library/react';

import { FileProgress } from './FileProgress';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

import { expect } from 'vitest';

function fakeProps() {
  const file = new File(['32452134'], 'testfile.txt');

  return {
    file: file,
    onDelete: vi.fn(
      () => new Promise<void>((resolve) => setTimeout(() => resolve(), 400))
    ),
  };
}

test('Renders regular loading state', () => {
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
      indeterminate
    />
  );
  const user = userEvent.setup();

  const loadingText = screen.getByText(customLoadingText);

  expect(loadingText).toBeInTheDocument();

  const cancelButton = screen.getAllByTestId('eds-icon-path')[1];

  expect(cancelButton).toHaveAttribute('d', close_circle_outlined.svgPathData);

  await user.click(cancelButton);

  expect(mockOnCancel).toHaveBeenCalledTimes(1);
});

test('Renders regular complete state default text', () => {
  const { file, onDelete } = fakeProps();

  render(<FileProgress file={file} onDelete={onDelete} isDone />);

  const completeText = screen.getByText('File uploaded!');
  const allIcons = screen.getAllByTestId('eds-icon-path');

  expect(allIcons[1]).toHaveAttribute('d', delete_to_trash.svgPathData);
  expect(completeText).toBeInTheDocument();
});

test('Renders regular complete state custom text', () => {
  const { file, onDelete } = fakeProps();
  const customCompleteText = faker.animal.crocodilia();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      isDone
      customCompleteText={customCompleteText}
    />
  );

  const completeText = screen.getByText(customCompleteText);

  expect(completeText).toBeInTheDocument();
});

test('Renders regular error state retry button and error text', () => {
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

test('Renders regular error state with default error text', () => {
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

test('Clicking delete shows a progress bar and callsOnDelete', async () => {
  const { file, onDelete } = fakeProps();

  render(<FileProgress file={file} onDelete={onDelete} isDone />);

  const user = userEvent.setup();

  await user.click(screen.getByRole('button'));

  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  await waitFor(() => expect(onDelete).toHaveBeenCalledTimes(1));
});

test('Renders compact loading state with progress bar', () => {
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
    <FileProgress
      file={file}
      onDelete={mockOnDelete}
      isDone={false}
      compact
      indeterminate
    />
  );
  const user = userEvent.setup();

  const progressBar = screen.getByRole('progressbar');

  expect(progressBar).toBeInTheDocument();

  const deleteButton = screen.getByTestId('eds-icon-path');

  expect(deleteButton).toHaveAttribute('d', clear.svgPathData);

  await user.click(deleteButton);

  expect(mockOnDelete).toHaveBeenCalledTimes(1);
});

test('Renders compact complete state', () => {
  const { onDelete } = fakeProps();

  const imageFile = new File(['32452134'], 'testfile.png');
  render(<FileProgress file={imageFile} onDelete={onDelete} isDone compact />);

  const fileName = screen.getByText(imageFile.name);
  const progressBar = screen.queryByRole('progressbar');

  expect(fileName).toBeInTheDocument();
  expect(progressBar).not.toBeInTheDocument();
});

test('Renders compact complete state when isDone is undefined', () => {
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

test('Renders compact complete state with expected icon', () => {
  const { onDelete } = fakeProps();

  const file = new File(['32452134'], 'testfile.pdf');
  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      progressPercent={50}
      isDone={undefined}
      compact
    />
  );

  expect(screen.getAllByTestId('eds-icon-path')[0]).toHaveAttribute(
    'd',
    library_pdf.svgPathData
  );
});

test('Renders compact error state', () => {
  const { file, onDelete } = fakeProps();

  const fakeShortErrorText = faker.animal.rabbit();
  const fakeFullErrorText = faker.animal.cow();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      isDone
      isError
      shortErrorText={fakeShortErrorText}
      fullErrorText={fakeFullErrorText}
      compact
    />
  );

  const shortErrorText = screen.getByText(fakeShortErrorText);

  const allIcons = screen.getAllByTestId('eds-icon-path');

  expect(allIcons[0]).toHaveAttribute('d', error_outlined.svgPathData);

  expect(shortErrorText).toBeInTheDocument();
});

test('Renders compact default error messages', () => {
  const { file, onDelete } = fakeProps();

  render(
    <FileProgress
      file={file}
      onDelete={onDelete}
      isError
      compact
      indeterminate
    />
  );

  const shortDefaultErrorText = screen.getByText('Invalid file type');

  expect(shortDefaultErrorText).toBeInTheDocument();
});

test('Hides delete button if onDelete is not provided', () => {
  const { file } = fakeProps();

  const { rerender } = render(
    <FileProgress file={file} compact indeterminate />
  );

  expect(screen.queryByTestId('delete-file')).not.toBeInTheDocument();

  rerender(<FileProgress file={file} indeterminate />);

  expect(screen.queryByTestId('delete-file')).not.toBeInTheDocument();
});
