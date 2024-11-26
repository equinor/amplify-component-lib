import { faker } from '@faker-js/faker';

import { Colorbox } from './Colorbox';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('Renders Colorbox correctly', () => {
  const color = faker.color.rgb();
  render(<Colorbox data-testid="colorbox" $color={color} />);

  expect(screen.getByTestId('colorbox')).toHaveStyle(
    `background-color: ${color}`
  );
});
