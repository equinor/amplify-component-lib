import { tokens } from '@equinor/eds-tokens';
import { render, screen } from '@testing-library/react';

import EquinorLogo, { EquinorLogoProps } from './EquinorLogo';

import '@testing-library/jest-dom';

const { colors } = tokens;

const colorOptions: EquinorLogoProps['color'][] = ['red', 'white', 'black'];
const sizeOptions: EquinorLogoProps['size'][] = [undefined, 16, 24, 32, 40, 48];
const largeOptions: EquinorLogoProps['large'][] = [undefined, true];

function expectedColors(color?: 'red' | 'white' | 'black') {
  switch (color) {
    case 'red':
      return colors.logo.fill_positive.hex;
    case 'white':
      return colors.logo.fill_negative.hex;
    case 'black':
      return '#000';
    default:
      return colors.logo.fill_positive.hex;
  }
}

test('EquinorLogo renders default red version', () => {
  render(<EquinorLogo />);
  const path = screen.getByTestId('path');
  expect(path).toHaveAttribute('fill', colors.logo.fill_positive.hex);
});

test('EquinorLogo renders expected colors when prop is given', () => {
  const { rerender } = render(<EquinorLogo />);
  for (const color of colorOptions) {
    rerender(<EquinorLogo color={color} />);
    const path = screen.getByTestId('path');
    expect(path).toHaveAttribute('fill', expectedColors(color));
  }
});

test('renders size correctly given large and size prop', () => {
  const { rerender } = render(<EquinorLogo large />);
  for (const size of sizeOptions) {
    for (const large of largeOptions) {
      rerender(<EquinorLogo large={large} size={size} />);
      const logo = screen.getByTestId('logo');
      const expectedSize = (large ? (size ?? 24) * 2 : size ?? 24).toString();
      expect(logo).toHaveAttribute('width', expectedSize);
      expect(logo).toHaveAttribute('width', expectedSize);
    }
  }
});
