import { AnimatedCheckmark } from './AnimatedCheckmark';
import { sizeToPx } from './AnimatedCheckmark.utils';
import { render, screen } from 'src/tests/jsdomtest-utils';

test('Default size matches medium', () => {
  render(<AnimatedCheckmark />);

  expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
});

test('Medium size is as expected', () => {
  render(<AnimatedCheckmark size="medium" />);

  const svg = screen.getByTestId('svg-icon');

  expect(svg).toHaveStyle(`width: ${sizeToPx('medium')}`);
  expect(svg).toHaveStyle(`height: ${sizeToPx('medium')}`);
});

test('Small size is as expected', () => {
  render(<AnimatedCheckmark size="small" />);

  const svg = screen.getByTestId('svg-icon');

  expect(svg).toHaveStyle(`width: ${sizeToPx('small')}`);
  expect(svg).toHaveStyle(`height: ${sizeToPx('small')}`);
});
