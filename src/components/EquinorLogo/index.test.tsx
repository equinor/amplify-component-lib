import { render, screen } from '../../test-utils';

import EquinorLogo from '.';
import { tokens } from '@equinor/eds-tokens';

const { colors } = tokens;

test('EquinorLogo renders default red version', () => {
  render(<EquinorLogo />);
  const path = screen.getByTestId('path');
  expect(path).toHaveAttribute('fill', colors.logo.fill_positive.hex);
});

test('EquinorLogo renders black version when prop is set', () => {
  render(<EquinorLogo color="black" />);
  const path = screen.getByTestId('path');
  expect(path).toHaveAttribute('fill', '#000');
});

test('renders large version when prop is set', () => {
  render(<EquinorLogo large />);
  const svg = screen.getByTestId('logo');
  expect(svg).toHaveAttribute('viewBox', '0 0 75 30');
});
