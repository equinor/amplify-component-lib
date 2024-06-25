import { IconData } from '@equinor/eds-icons';
import { save } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { Chip } from './Chip';
import { fireEvent, render, screen } from 'src/tests/test-utils';

import { vi } from 'vitest';

// Mock function for onDelete

test('Shows readonly chip with leading icon', () => {
  const someText = faker.animal.crocodilia();
  const leadingIconData: IconData = save;
  render(<Chip leadingIconData={leadingIconData}>{someText}</Chip>);

  //Accesses the span element, finds it parent and finds the first element, which in this case should alwasys be leading
  expect(
    screen.getByText(someText).parentElement?.firstElementChild?.className
  ).toBe('leading');
});

test('Shows interactive chip with delete icon', () => {
  const someText = faker.animal.crocodilia();

  render(<Chip onDelete={mockOnDelete}>{someText}</Chip>);

  expect(screen.queryByRole('img')).toBeInTheDocument();
});

test('Handles delete event on interactive chip', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const handleDelete = vi.fn();
  const handleOnClick = vi.fn();
  const someText = faker.animal.crocodilia();

  render(
    <Chip onDelete={handleDelete} onClick={handleOnClick}>
      {someText}
    </Chip>
  );

  const chip = screen.getByText(someText).parentElement;
  if (chip) {
    fireEvent.click(chip);
  }
  // Assert that mockOnClick has been called

  expect(handleDelete).toHaveBeenCalled();
  expect(handleOnClick).not.toHaveBeenCalled();
});

test('Handles click event on interactive chip', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const someText = faker.animal.crocodilia();

  render(<Chip onClick={mockOnClick}>{someText}</Chip>);

  const chip = screen.getByText(someText).parentElement;
  if (chip) {
    fireEvent.click(chip);
  }
  // Assert that mockOnClick has been called

  expect(mockOnClick).toHaveBeenCalled();

  // Access the first call's return value from the mock and compare it with the expected value
  const returnedValue =
    (mockOnClick.mock?.results[0].value as string) || undefined;

  expect(returnedValue).toBe('onClick called');
});

test('Handles prioritized click event when delete is also defined on interactive chip', () => {
  const someText = faker.animal.crocodilia();
  const handleDelete = vi.fn();
  const handleOnClick = vi.fn();
  render(
    <Chip onClick={handleOnClick} onDelete={handleDelete}>
      {someText}
    </Chip>
  );

  const chip = screen.getByText(someText).parentElement;
  if (chip) {
    fireEvent.click(chip);
  }

  expect(handleDelete).toHaveBeenCalled();
  expect(handleOnClick).not.toHaveBeenCalled();
});
