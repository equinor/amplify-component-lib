import { faker } from '@faker-js/faker';

import { colorSchemes } from './Chip.styles';
import { Chip } from 'src/molecules/Chip/Chip';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('White readonly chip has expected background', () => {
  const someText = faker.animal.crocodilia();

  render(<Chip variant="white">{someText}</Chip>);

  const chip = screen.getByText(someText).parentElement!.parentElement!;

  expect(chip).toHaveStyle(
    `background-color: ${colorSchemes.white.background}`
  );
});

test('White selected chip has expected styling from default', () => {
  const handleOnClick = vi.fn();

  const someText = faker.animal.crocodilia();
  const defaultStyling = colorSchemes.default;

  render(
    <Chip variant="white" selected onClick={handleOnClick}>
      {someText}
    </Chip>
  );

  const chip = screen.getByRole('button');

  expect(chip).toHaveStyleRule(
    'background-color',
    defaultStyling.selected?.background
  );
  expect(chip).toHaveStyleRule('color', defaultStyling.color);
  expect(chip).toHaveStyleRule(
    'outline',
    `1px solid ${defaultStyling.selected?.borderColor}`
  );
});

test('Green chip has expected resting colors', () => {
  const handleOnClick = vi.fn();
  const someText = faker.animal.crocodilia();

  render(
    <Chip variant="green" onClick={handleOnClick}>
      {someText}
    </Chip>
  );

  const chip = screen.getByRole('button');

  expect(chip).toHaveStyleRule('color', colorSchemes.green.color);
  expect(chip).toHaveStyleRule(
    'background-color',
    colorSchemes.green.background
  );
});

test('Error selected chip has expected background', () => {
  const handleOnClick = vi.fn();
  const someText = faker.animal.crocodilia();

  render(
    <Chip variant="error" selected onClick={handleOnClick}>
      {someText}
    </Chip>
  );

  const chip = screen.getByRole('button');

  expect(chip).toHaveStyleRule(
    'background-color',
    colorSchemes.error.selected?.background
  );
});
