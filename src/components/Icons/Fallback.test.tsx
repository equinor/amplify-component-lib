import { render, screen } from '@testing-library/react';

import Fallback from './Fallback';
import { SvgIconProps } from './index';

const sizeOptions: SvgIconProps['size'][] = [undefined, 16, 24, 32, 40, 48];

test('renders as expected width default size', () => {
  render(<Fallback />);

  const svg = screen.getByTestId('fallback-icon');
  expect(svg).toBeInTheDocument();
});

test('renders with correct size', () => {
  const { rerender } = render(<Fallback />);
  for (const size of sizeOptions) {
    rerender(<Fallback size={size} />);
    const icon = screen.getByTestId('fallback-icon');
    expect(icon).toHaveAttribute('width', size?.toString());
  }
});
