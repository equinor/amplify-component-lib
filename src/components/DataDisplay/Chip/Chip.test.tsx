import { tokens } from '@equinor/eds-tokens';
import { faker } from '@faker-js/faker';

const { colors } = tokens;

import { Chip } from './Chip';
import { render, screen } from 'src/tests/test-utils';

test('Shows chip', () => {
  const someText = faker.animal.crocodilia();
  render(<Chip>{someText}</Chip>);

  expect(screen.getByText(someText)).toBeInTheDocument();
  expect(screen.getByText(someText)).toHaveStyleRule(
    'color',
    `${colors.infographic.primary__moss_green_100.rgba}!important`
  );

  const hoverOption = { modifier: ':hover' };

  expect(screen.getByText(someText)).toHaveStyleRule(
    'color',
    `${colors.interactive.primary__hover.rgba}!important`,
    hoverOption
  );

  expect(screen.getByText(someText)).toHaveStyleRule(
    'background',
    `${colors.interactive.primary__hover_alt.rgba}`,
    hoverOption
  );
});

test('Shows readonly chip', () => {
  const someText = faker.animal.crocodilia();
  render(<Chip readonly>{someText}</Chip>);

  expect(screen.queryByText(someText)).toHaveStyleRule(
    'color',
    `${colors.text.static_icons__default.rgba}!important`
  );
});
