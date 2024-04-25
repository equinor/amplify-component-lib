import { tokens } from '@equinor/eds-tokens';
const { colors } = tokens;

import { Badge } from './Badge';
import { render, screen } from 'src/tests/test-utils';

test('Badge renders with expected variants', () => {
  const { rerender } = render(<Badge value={1} />);

  expect(screen.getByText(1)).toBeInTheDocument();

  const badge = screen.getByTestId('badge-container');

  expect(badge).toHaveStyleRule(
    'background',
    `${colors.text.static_icons__tertiary.rgba}`
  );

  rerender(<Badge value={1} variant="danger" />);

  expect(badge).toHaveStyleRule(
    'background',
    `${colors.interactive.danger__resting.rgba}`
  );

  rerender(<Badge value={1} variant="light" />);

  expect(badge).toHaveStyleRule('background', `rgba(235, 235, 235, 1)`);

  rerender(<Badge value={1} variant="empty" />);

  expect(badge).toHaveStyleRule(
    'background',
    `${colors.interactive.disabled__fill.rgba}`
  );
});
