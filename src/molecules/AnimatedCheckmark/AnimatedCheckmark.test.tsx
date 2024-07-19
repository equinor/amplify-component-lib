import { AnimatedCheckmark } from './AnimatedCheckmark';
import { render, screen } from 'src/tests/test-utils';

test('Renders as it should', () => {
  render(<AnimatedCheckmark />);

  const svg = screen.getByTestId('svg-icon');

  expect(svg).toHaveAttribute('width', '43');
  expect(svg).toHaveAttribute('height', '43');
});
