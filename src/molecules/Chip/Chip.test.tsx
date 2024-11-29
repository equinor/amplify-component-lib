import { save } from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { Chip } from 'src/molecules/Chip/Chip';
import { page, render, screen, userEvent } from 'src/tests/browsertest-utils';

test('Shows readonly chip with leading icon', () => {
  const someText = faker.animal.crocodilia();
  render(<Chip leadingIconData={save}>{someText}</Chip>);

  //Accesses the span element, finds it parent and finds the first element, which in this case should alwasys be leading
  expect(
    page.getByText(someText).element().parentElement?.firstElementChild
      ?.className
  ).toBe('leading');
});

test('Works with just string/number', () => {
  const text = faker.animal.bear();
  const { rerender } = render(<Chip>{text}</Chip>);

  const chip = screen.getByText(text);
  expect(chip).toBeVisible();

  const randomNumb = faker.number.int();
  rerender(<Chip>{randomNumb}</Chip>);

  const otherChip = screen.getByText(randomNumb.toString());
  expect(otherChip).toBeVisible();
});

test('Works with multiple children', () => {
  const first = faker.animal.bear();
  const second = faker.animal.lion();
  const third = faker.animal.cow();
  const fourth = faker.animal.crocodilia();
  const fifth = faker.animal.fish();
  const sixth = faker.animal.dog();

  render(
    <Chip>
      <div>{first}</div>
      {second}
      <p>{third}</p>
      <>
        <p>{fifth}</p>
        {fourth}
        <div>
          <p>{sixth}</p>
        </div>
      </>
    </Chip>
  );

  for (const child of [first, second, third, fourth, fifth, sixth]) {
    const childElement = page.getByText(child).element();
    expect(childElement).toBeVisible();
  }
});

test('Shows interactive chip with delete icon', () => {
  const someText = faker.animal.crocodilia();
  const handleOnClick = vi.fn();

  render(<Chip onDelete={handleOnClick}>{someText}</Chip>);

  const icon = page.getByRole('img').element();
  expect(icon).toBeInTheDocument();
});

test('Handles delete event on interactive chip', async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  const handleDelete = vi.fn();
  const someText = faker.animal.crocodilia();

  render(<Chip onDelete={handleDelete}>{someText}</Chip>);
  const user = userEvent.setup();
  const chip = screen.getByText(someText);

  await user.click(chip);

  expect(handleDelete).toHaveBeenCalled();
});

test('Handles click event on interactive chip', async () => {
  const handleOnClick = vi.fn();

  const someText = faker.animal.crocodilia();

  render(<Chip onClick={handleOnClick}>{someText}</Chip>);
  const user = userEvent.setup();
  const chip = screen.getByText(someText);

  await user.click(chip);

  // Assert that handleOnClick has been called
  expect(handleOnClick).toHaveBeenCalled();
});

test('Interactive chip renders icon', () => {
  const handleOnClick = vi.fn();

  const someText = faker.animal.crocodilia();

  render(
    <Chip onClick={handleOnClick} leadingIconData={save}>
      {someText}
    </Chip>
  );

  expect(screen.getByTestId('eds-icon-path')).toHaveAttribute(
    'd',
    save.svgPathData
  );
});

test('Handles keyboard event on delete interactive chip', async () => {
  const handleOnDelete = vi.fn();

  const someText = faker.animal.crocodilia();

  render(<Chip onDelete={handleOnDelete}>{someText}</Chip>);
  const user = userEvent.setup();

  await user.tab();
  await user.keyboard('[Enter]');

  expect(handleOnDelete).toHaveBeenCalled();
});

test('Handles keyboard event on click interactive chip', async () => {
  const handleOnClick = vi.fn();

  const someText = faker.animal.crocodilia();

  render(<Chip onClick={handleOnClick}>{someText}</Chip>);
  const user = userEvent.setup();

  await user.tab();
  await user.keyboard('[Enter]');

  expect(handleOnClick).toHaveBeenCalled();
});

test('Disabled interactive chip works as expected', async () => {
  const handleOnClick = vi.fn();

  const someText = faker.animal.crocodilia();

  render(
    <Chip onClick={handleOnClick} disabled>
      {someText}
    </Chip>
  );
  const user = userEvent.setup();
  const chip = screen.getByText(someText);

  await user.click(chip);
  // Assert that handleOnClick has been called
  expect(handleOnClick).not.toHaveBeenCalled();
});
