import { IconData } from '@equinor/eds-icons';
import { save } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { Chip } from './Chip';
import { fireEvent, render, screen } from 'src/tests/test-utils';

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
  const handleOnClick = vi.fn();

  render(<Chip onDelete={handleOnClick}>{someText}</Chip>);

  expect(screen.queryByRole('img')).toBeInTheDocument();
});

test('Handles delete event on interactive chip', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const handleDelete = vi.fn();
  const someText = faker.animal.crocodilia();

  render(<Chip onDelete={handleDelete}>{someText}</Chip>);

  const chip = screen.getByText(someText).parentElement;
  if (chip) {
    fireEvent.click(chip);
  }
  // Assert that mockOnClick has been called

  expect(handleDelete).toHaveBeenCalled();
});

test('Handles click event on interactive chip', () => {
  const handleOnClick = vi.fn();

  const someText = faker.animal.crocodilia();

  render(<Chip onClick={handleOnClick}>{someText}</Chip>);

  const chip = screen.getByText(someText).parentElement;
  if (chip) {
    fireEvent.click(chip);
  }
  // Assert that handleOnClick has been called
  expect(handleOnClick).toHaveBeenCalled();
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
  // Assert that handleOnDelete has been called
  // Assert that handleOnClick has NOT been called

  expect(handleDelete).toHaveBeenCalled();
  expect(handleOnClick).not.toHaveBeenCalled();
});
