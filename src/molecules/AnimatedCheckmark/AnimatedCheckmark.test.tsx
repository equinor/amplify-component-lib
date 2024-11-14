import { AnimatedCheckmark } from './AnimatedCheckmark';
import { sizeToPx } from './AnimatedCheckmark.utils';
import { render, screen } from 'src/tests/browsertest-utils';

test('Default size is as expected', () => {
  render(<AnimatedCheckmark />);

  const svg = screen.getByTestId('svg-icon');

  expect(svg).toHaveStyleRule('width', sizeToPx('medium'));
  expect(svg).toHaveStyleRule('height', sizeToPx('medium'));
});

test('Medium size is as expected', () => {
  render(<AnimatedCheckmark size="medium" />);

  const svg = screen.getByTestId('svg-icon');

  expect(svg).toHaveStyleRule('width', sizeToPx('medium'));
  expect(svg).toHaveStyleRule('height', sizeToPx('medium'));
});

test('Small size is as expected', () => {
  render(<AnimatedCheckmark size="small" />);

  const svg = screen.getByTestId('svg-icon');

  expect(svg).toHaveStyleRule('width', sizeToPx('small'));
  expect(svg).toHaveStyleRule('height', sizeToPx('small'));
});
