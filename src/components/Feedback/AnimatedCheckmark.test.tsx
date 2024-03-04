import { render, screen } from '../../tests/test-utils';
import AnimatedCheckmark from './AnimatedCheckmark';

test('Renders as it should', () => {
  render(<AnimatedCheckmark />);

  const svg = screen.getByTestId('svg-icon');

  expect(svg).toHaveAttribute('width', '43');
  expect(svg).toHaveAttribute('height', '43');
});
